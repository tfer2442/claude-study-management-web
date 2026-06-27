#!/bin/sh

EVENT_TYPE="${1:-notification}"

# .claude/.env 파일에서 DISCORD_WEBHOOK_URL 읽기
# ENV_FILE="$(dirname "$0")/.env"
# WEBHOOK_URL=""
# if [ -f "$ENV_FILE" ]; then
#   WEBHOOK_URL=$(grep "^DISCORD_WEBHOOK_URL=" "$ENV_FILE" | cut -d'=' -f2-)
# fi

# if [ -z "$WEBHOOK_URL" ]; then
#   exit 0
# fi

# # stdin에서 이벤트 데이터 읽기
# STDIN_DATA=""
# if [ ! -t 0 ]; then
#   STDIN_DATA=$(cat)
# fi

EVENT_MESSAGE=""
if [ -n "$STDIN_DATA" ]; then
  EVENT_MESSAGE=$(echo "$STDIN_DATA" | jq -r '.message // empty' 2>/dev/null)
fi

case "$EVENT_TYPE" in
  notification)
    TITLE="⚠️ Claude Code 권한 요청"
    COLOR=16776960
    DESCRIPTION="${EVENT_MESSAGE:-Claude Code가 작업 수행을 위해 권한을 요청하고 있습니다. 터미널을 확인해주세요.}"
    ;;
  stop)
    TITLE="✅ Claude Code 작업 완료"
    COLOR=3066993
    DESCRIPTION="작업이 완료되었습니다."
    ;;
  *)
    TITLE="ℹ️ Claude Code 알림"
    COLOR=3447003
    DESCRIPTION="알림이 발생했습니다."
    ;;
esac

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

PAYLOAD=$(jq -n \
  --arg title "$TITLE" \
  --arg description "$DESCRIPTION" \
  --argjson color "$COLOR" \
  --arg timestamp "$TIMESTAMP" \
  '{
    embeds: [{
      title: $title,
      description: $description,
      color: $color,
      timestamp: $timestamp,
      footer: { text: "Claude Code" }
    }]
  }')

curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD" > /dev/null
