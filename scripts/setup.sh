#!/bin/bash
# Şirket-i Hayriye — Project Setup Script
# Vercel + GitHub integration setup

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo "========================================="
echo "  Şirket-i Hayriye — Proje Kurulumu"
echo "  1851 — sirket-ihayriye.com"
echo "========================================="
echo ""

# 1. Check prerequisites
echo "→ Gereksinimler kontrol ediliyor..."

command -v node >/dev/null 2>&1 || { echo "Node.js bulunamadı. Lütfen yükleyin."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm bulunamadı. Lütfen yükleyin."; exit 1; }
command -v git >/dev/null 2>&1 || { echo "git bulunamadı. Lütfen yükleyin."; exit 1; }

echo "  Node: $(node -v)"
echo "  npm:  $(npm -v)"
echo "  git:  $(git --version)"
echo ""

# 2. Check for gh CLI
if command -v gh >/dev/null 2>&1; then
  echo "  GitHub CLI: $(gh --version | head -1)"
  GH_AVAILABLE=true
else
  echo "  GitHub CLI: Yüklü değil (opsiyonel)"
  GH_AVAILABLE=false
fi

# 3. Check for Vercel CLI
if command -v vercel >/dev/null 2>&1; then
  echo "  Vercel CLI: $(vercel --version 2>/dev/null || echo 'installed')"
  VERCEL_AVAILABLE=true
else
  echo "  Vercel CLI: Yüklü değil"
  echo "  → npm install -g vercel ile yüklenebilir"
  VERCEL_AVAILABLE=false
fi

echo ""

# 4. Install dependencies
echo "→ Bağımlılıklar yükleniyor..."
npm install
echo ""

# 5. Git initialization (if not already)
if [ ! -d .git ]; then
  echo "→ Git repo oluşturuluyor..."
  git init
  git add -A
  git commit -m "feat: Şirket-i Hayriye ilk kurulum — 1851"
fi

echo ""
echo "========================================="
echo "  Kurulum tamamlandı!"
echo ""
echo "  Geliştirme:  npm run dev"
echo "  Build:       npm run build"
echo "  Lint:        npm run lint"
echo ""

if [ "$GH_AVAILABLE" = true ]; then
  echo "  GitHub repo oluştur:"
  echo "    gh repo create sirket-i-hayriye --public --source=."
  echo "    git push -u origin main"
fi

if [ "$VERCEL_AVAILABLE" = true ]; then
  echo ""
  echo "  Vercel deploy:"
  echo "    vercel --prod"
fi

echo "========================================="
