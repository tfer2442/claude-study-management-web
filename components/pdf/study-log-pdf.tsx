// PDF 문서 컴포넌트 — @react-pdf/renderer v4 기반, 서버/클라이언트 공용
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

import type { StudyLog, StudyLogBlock } from "@/lib/notion-types"

// 한글 폰트 등록 — Noto Sans KR Google Fonts CDN (woff2)
Font.register({
  family: "NotoSansKR",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.0.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.9.woff2",
      fontWeight: 700,
    },
  ],
})

// 전역 스타일 정의
const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansKR",
    fontSize: 11,
    paddingTop: 56,
    paddingBottom: 72,
    paddingHorizontal: 56,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
  },
  // 헤더
  header: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 16,
  },
  title: {
    fontFamily: "NotoSansKR",
    fontWeight: 700,
    fontSize: 24,
    marginBottom: 6,
    color: "#0f172a",
  },
  date: {
    fontSize: 10,
    color: "#64748b",
  },
  // 본문 블록
  paragraph: {
    marginBottom: 8,
    lineHeight: 1.7,
  },
  heading1: {
    fontFamily: "NotoSansKR",
    fontWeight: 700,
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    color: "#0f172a",
  },
  heading2: {
    fontFamily: "NotoSansKR",
    fontWeight: 700,
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    color: "#0f172a",
  },
  heading3: {
    fontFamily: "NotoSansKR",
    fontWeight: 700,
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    color: "#0f172a",
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 16,
  },
  bulletSymbol: {
    width: 16,
    lineHeight: 1.7,
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.7,
  },
  numberedItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 16,
  },
  numberedIndex: {
    width: 20,
    lineHeight: 1.7,
  },
  numberedText: {
    flex: 1,
    lineHeight: 1.7,
  },
  codeBlock: {
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },
  codeText: {
    fontFamily: "Courier",
    fontSize: 10,
    color: "#334155",
    lineHeight: 1.5,
  },
  quoteBlock: {
    borderLeftWidth: 4,
    borderLeftColor: "#94a3b8",
    paddingLeft: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  quoteText: {
    color: "#475569",
    lineHeight: 1.7,
    fontStyle: "italic",
  },
  calloutBlock: {
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },
  calloutText: {
    lineHeight: 1.7,
    color: "#334155",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginVertical: 12,
  },
  image: {
    maxWidth: "100%",
    marginBottom: 10,
    borderRadius: 4,
  },
  // 푸터
  footer: {
    position: "absolute",
    bottom: 32,
    left: 56,
    right: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 8,
  },
  footerText: {
    fontSize: 9,
    color: "#94a3b8",
  },
})

// 개별 블록을 PDF 요소로 변환하는 함수
function renderBlock(
  block: StudyLogBlock,
  index: number,
  numberedCounters: Map<string, number>
): React.ReactNode {
  switch (block.type) {
    case "paragraph":
      return (
        <Text key={block.id} style={styles.paragraph}>
          {block.content}
        </Text>
      )

    case "heading_1":
      return (
        <Text key={block.id} style={styles.heading1}>
          {block.content}
        </Text>
      )

    case "heading_2":
      return (
        <Text key={block.id} style={styles.heading2}>
          {block.content}
        </Text>
      )

    case "heading_3":
      return (
        <Text key={block.id} style={styles.heading3}>
          {block.content}
        </Text>
      )

    case "bulleted_list_item":
      return (
        <View key={block.id} style={styles.bulletItem}>
          <Text style={styles.bulletSymbol}>•</Text>
          <Text style={styles.bulletText}>{block.content}</Text>
        </View>
      )

    case "numbered_list_item": {
      // 부모 컨텍스트 내 numbered 블록 순번 추적
      const counter = (numberedCounters.get("numbered") ?? 0) + 1
      numberedCounters.set("numbered", counter)
      return (
        <View key={block.id} style={styles.numberedItem}>
          <Text style={styles.numberedIndex}>{counter}.</Text>
          <Text style={styles.numberedText}>{block.content}</Text>
        </View>
      )
    }

    case "code":
      return (
        <View key={block.id} style={styles.codeBlock}>
          <Text style={styles.codeText}>{block.content}</Text>
        </View>
      )

    case "quote":
      return (
        <View key={block.id} style={styles.quoteBlock}>
          <Text style={styles.quoteText}>{block.content}</Text>
        </View>
      )

    case "callout":
      return (
        <View key={block.id} style={styles.calloutBlock}>
          <Text style={styles.calloutText}>{block.content}</Text>
        </View>
      )

    case "divider":
      return <View key={block.id} style={styles.divider} />

    case "image":
      if (!block.url) return null
      // 이미지 로드 실패 시 무시 (try-catch 불가 → 빈 View로 처리)
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image key={block.id} src={block.url} style={styles.image} />
      )

    case "unsupported":
    default:
      return null
  }
}

// StudyLog PDF 문서 컴포넌트
export function StudyLogDocument({ log }: { log: StudyLog }) {
  // numbered_list_item 순번 카운터 (블록 목록 전체 공유)
  const numberedCounters = new Map<string, number>()

  const formattedDate = format(new Date(log.createdAt), "yyyy년 MM월 dd일 (EEE)", {
    locale: ko,
  })

  return (
    <Document title={log.title} author="스터디 일지 공유 서비스">
      <Page size="A4" style={styles.page}>
        {/* 헤더: 제목 + 날짜 */}
        <View style={styles.header} fixed>
          <Text style={styles.title}>{log.title}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>

        {/* 본문: 블록 목록 렌더링 */}
        {log.blocks.map((block, index) =>
          renderBlock(block, index, numberedCounters)
        )}

        {/* 푸터: 페이지 번호 */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{log.title}</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}
