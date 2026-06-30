import { Client, isFullPage, isFullBlock } from "@notionhq/client"
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints/blocks"
import type { StudyLog, StudyLogBlock, StudyLogBlockType, StudyLogSummary } from "@/lib/notion-types"

// 환경변수 검증
if (!process.env.NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY 환경변수가 설정되지 않았습니다")
}

// Notion 클라이언트 싱글톤 (@notionhq/client v5: databases.query → dataSources.query)
const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
})

// Notion 페이지 → StudyLogSummary 변환
function mapPageToSummary(
  page: Parameters<typeof isFullPage>[0] extends infer T ? T : never
): StudyLogSummary | null {
  if (!isFullPage(page)) return null

  // title 타입 프로퍼티에서 plain text 추출
  const titleProp = Object.values(page.properties).find(
    (p) => p.type === "title"
  )

  const title =
    titleProp?.type === "title"
      ? titleProp.title.map((t) => t.plain_text).join("")
      : "제목 없음"

  const tagProp = page.properties["태그"]
  const tags =
    tagProp?.type === "multi_select"
      ? tagProp.multi_select.map((t: { name: string }) => t.name)
      : []

  return {
    id: page.id,
    title,
    createdAt: new Date(page.created_time),
    tags,
  }
}

// Notion 블록 → StudyLogBlock 변환 (최대 depth까지 재귀)
async function mapBlocksToStudyLogBlocks(
  blocks: BlockObjectResponse[],
  depth = 0
): Promise<StudyLogBlock[]> {
  const MAX_DEPTH = 2
  const result: StudyLogBlock[] = []

  for (const block of blocks) {
    if (!isFullBlock(block)) continue

    const supportedTypes = [
      "paragraph", "heading_1", "heading_2", "heading_3",
      "bulleted_list_item", "numbered_list_item",
      "code", "image", "divider", "quote", "callout",
    ]

    if (!supportedTypes.includes(block.type)) {
      result.push({ id: block.id, type: "unsupported", content: "" })
      continue
    }

    const type = block.type as StudyLogBlockType
    let content = ""
    let language: string | undefined
    let url: string | undefined

    // 블록 타입별 content 추출
    if (block.type === "paragraph") {
      content = block.paragraph.rich_text.map((t) => t.plain_text).join("")
    } else if (block.type === "heading_1") {
      content = block.heading_1.rich_text.map((t) => t.plain_text).join("")
    } else if (block.type === "heading_2") {
      content = block.heading_2.rich_text.map((t) => t.plain_text).join("")
    } else if (block.type === "heading_3") {
      content = block.heading_3.rich_text.map((t) => t.plain_text).join("")
    } else if (block.type === "bulleted_list_item") {
      content = block.bulleted_list_item.rich_text.map((t) => t.plain_text).join("")
    } else if (block.type === "numbered_list_item") {
      content = block.numbered_list_item.rich_text.map((t) => t.plain_text).join("")
    } else if (block.type === "quote") {
      content = block.quote.rich_text.map((t) => t.plain_text).join("")
    } else if (block.type === "callout") {
      content = block.callout.rich_text.map((t) => t.plain_text).join("")
    } else if (block.type === "code") {
      content = block.code.rich_text.map((t) => t.plain_text).join("")
      language = block.code.language
    } else if (block.type === "image") {
      url = block.image.type === "file" ? block.image.file.url : block.image.external.url
    }
    // divider는 content 없음

    let children: StudyLogBlock[] | undefined
    if (block.has_children && depth < MAX_DEPTH) {
      const childResponse = await notionClient.blocks.children.list({
        block_id: block.id,
      })
      const childBlocks = childResponse.results.filter(
        (b): b is BlockObjectResponse => isFullBlock(b)
      )
      children = await mapBlocksToStudyLogBlocks(childBlocks, depth + 1)
    }

    result.push({ id: block.id, type, content, language, url, children })
  }

  return result
}

// 스터디 일지 단건 조회
export async function getStudyLog(pageId: string): Promise<StudyLog> {
  try {
    const page = await notionClient.pages.retrieve({ page_id: pageId })
    if (!isFullPage(page)) throw new Error("페이지 정보를 가져올 수 없습니다")

    const titleProp = Object.values(page.properties).find((p) => p.type === "title")
    const title =
      titleProp?.type === "title"
        ? titleProp.title.map((t) => t.plain_text).join("")
        : "제목 없음"

    const tagProp = page.properties["태그"]
    const tags =
      tagProp?.type === "multi_select"
        ? tagProp.multi_select.map((t: { name: string }) => t.name)
        : []

    // 블록 전체 조회 (페이지네이션)
    const allBlocks: BlockObjectResponse[] = []
    let cursor: string | undefined
    do {
      const response = await notionClient.blocks.children.list({
        block_id: pageId,
        ...(cursor ? { start_cursor: cursor } : {}),
      })
      allBlocks.push(
        ...response.results.filter((b): b is BlockObjectResponse => isFullBlock(b))
      )
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
    } while (cursor)

    const blocks = await mapBlocksToStudyLogBlocks(allBlocks)

    return {
      id: page.id,
      title,
      createdAt: new Date(page.created_time),
      lastEditedAt: new Date(page.last_edited_time),
      tags,
      blocks,
    }
  } catch (error) {
    console.error("[Notion] 일지 단건 조회 실패:", error)
    throw error
  }
}

// Shared Links DB에 공유 링크 기록 저장 (F006)
export async function saveSharedLink(params: {
  title: string
  notionEntryId: string
  token: string
  expiresAt: Date
}): Promise<void> {
  const databaseId = process.env.NOTION_LINKS_DB_ID
  const apiKey = process.env.NOTION_API_KEY
  if (!databaseId || !apiKey) {
    console.warn("[Notion] NOTION_LINKS_DB_ID 또는 NOTION_API_KEY 미설정, 링크 저장 생략")
    return
  }

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        이름: { title: [{ text: { content: params.title } }] },
        일지ID: { rich_text: [{ text: { content: params.notionEntryId } }] },
        토큰: { rich_text: [{ text: { content: params.token } }] },
        만료일: { date: { start: params.expiresAt.toISOString().split("T")[0] } },
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message ?? "Shared Links DB 저장 실패")
  }
}

// 스터디 일지 목록 조회 (created_time DESC 정렬)
export async function getStudyLogList(pageSize = 100): Promise<StudyLogSummary[]> {
  const databaseId = process.env.NOTION_DB_ID
  const apiKey = process.env.NOTION_API_KEY
  if (!databaseId) throw new Error("NOTION_DB_ID 환경변수가 설정되지 않았습니다")
  if (!apiKey) throw new Error("NOTION_API_KEY 환경변수가 설정되지 않았습니다")

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [{ timestamp: "created_time", direction: "descending" }],
        page_size: pageSize,
      }),
      cache: "no-store",
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message ?? "Notion API 오류")
    }

    const data = await res.json()
    return (data.results as Parameters<typeof isFullPage>[0][])
      .map(mapPageToSummary)
      .filter((s): s is StudyLogSummary => s !== null)
  } catch (error) {
    console.warn("[Notion] 일지 목록 조회 실패:", error)
    throw error
  }
}
