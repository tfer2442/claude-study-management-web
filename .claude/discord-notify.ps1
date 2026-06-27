# param(
#   [string]$EventType = "notification"
# )

# .claude/.env 파일에서 DISCORD_WEBHOOK_URL 읽기
# $EnvFile = Join-Path $PSScriptRoot ".env"
# $WebhookUrl = $null
# if (Test-Path $EnvFile) {
#   Get-Content $EnvFile | ForEach-Object {
#     if ($_ -match "^DISCORD_WEBHOOK_URL=(.+)$") {
#       $WebhookUrl = $Matches[1].Trim()
#     }
#   }
# }

if (-not $WebhookUrl) {
  exit 0
}

# stdin에서 이벤트 데이터 읽기
$EventData = @{}
if ([Console]::IsInputRedirected) {
  try {
    $StdinData = $input | Out-String
    if ($StdinData.Trim()) {
      $EventData = $StdinData | ConvertFrom-Json
    }
  } catch {}
}

switch ($EventType) {
  "notification" {
    $Title = "⚠️ Claude Code 권한 요청"
    $Color = 16776960
    $Description = if ($EventData.message) { $EventData.message } else { "Claude Code가 작업 수행을 위해 권한을 요청하고 있습니다. 터미널을 확인해주세요." }
  }
  "stop" {
    $Title = "✅ Claude Code 작업 완료"
    $Color = 3066993
    $Description = "작업이 완료되었습니다."
  }
  default {
    $Title = "ℹ️ Claude Code 알림"
    $Color = 3447003
    $Description = "알림이 발생했습니다."
  }
}

$Payload = @{
  embeds = @(
    @{
      title       = $Title
      description = $Description
      color       = $Color
      timestamp   = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
      footer      = @{ text = "Claude Code" }
    }
  )
} | ConvertTo-Json -Depth 10 -Compress

try {
  $Bytes = [System.Text.Encoding]::UTF8.GetBytes($Payload)
  $Req = [System.Net.WebRequest]::Create($WebhookUrl)
  $Req.Method = "POST"
  $Req.ContentType = "application/json; charset=utf-8"
  $Req.ContentLength = $Bytes.Length
  $Stream = $Req.GetRequestStream()
  $Stream.Write($Bytes, 0, $Bytes.Length)
  $Stream.Close()
  $Req.GetResponse().Close()
} catch {}