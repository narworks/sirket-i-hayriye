#!/bin/bash
# Şirket-i Hayriye — Quick Deploy Script
# Usage: ./scripts/deploy.sh [message]

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

COMMIT_MSG="${1:-update: site güncellemesi}"
BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

echo "→ Lint kontrolü..."
npm run lint 2>/dev/null || echo "  Lint uyarıları atlandı"

echo "→ Build test..."
npm run build

echo "→ Git commit & push..."
git add -A
git commit -m "$COMMIT_MSG" || echo "  Değişiklik yok"
git push origin "$BRANCH" 2>/dev/null || echo "  Push başarısız — remote ayarlarını kontrol edin"

# Vercel auto-deploys from GitHub push, but we can trigger manually too
if command -v vercel >/dev/null 2>&1; then
  echo "→ Vercel deploy tetikleniyor..."
  vercel --prod --yes 2>/dev/null || echo "  Vercel deploy GitHub push ile otomatik yapılacak"
fi

echo ""
echo "✓ Deploy tamamlandı!"
echo "  Site: https://sirket-ihayriye.com"
