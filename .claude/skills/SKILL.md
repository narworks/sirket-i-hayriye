---
name: sirket-i-hayriye-dev
description: |
  Şirket-i Hayriye web projesi geliştirme asistanı. Bu skill, sirket-ihayriye.com web sitesinin geliştirilmesi sırasında kullanılmalıdır. Proje Next.js 16 + TypeScript + Tailwind CSS v4 + Framer Motion + GSAP kullanmaktadır. Osmanlı denizcilik temalı vintage estetik tasarıma sahiptir. Bu skill ile yeni komponent ekleyebilir, mevcut bölümleri düzenleyebilir, Vercel deploy yapabilir, hata ayıklayabilir ve proje genişletmesi yapabilirsiniz.
---

# Şirket-i Hayriye Web Projesi — Geliştirme Kılavuzu

## Proje Özeti

- **Site:** sirket-ihayriye.com
- **Tema:** Osmanlı denizcilik tarihi, vintage/parşömen estetiği
- **Tech Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + GSAP
- **Deploy:** Vercel + GitHub
- **Tarih:** Şirket-i Hayriye (1851) — Osmanlı'nın ilk anonim şirketi, İstanbul Boğazı vapur taşımacılığı

## Renk Paleti

```
ottoman-navy:      #1a2744  (Birincil koyu)
ottoman-navy-light: #2a3d5c
ottoman-gold:      #c9a84c  (Birincil vurgu)
ottoman-gold-light: #dbc278
ottoman-gold-dark:  #a88a2e
ottoman-sepia:     #d4a574
ottoman-parchment: #f5efe0  (Arka plan)
ottoman-cream:     #faf6ed
ottoman-red:       #8b0000  (Aksan)
ottoman-sea:       #1e6fa0  (Deniz)
ottoman-ink:       #2c1810  (Metin)
```

## Font Sistemi

- **Başlıklar:** `font-[var(--font-playfair)]` — Playfair Display
- **Gövde metin:** `font-[var(--font-source-serif)]` — Source Serif 4
- **Aksan/tarih:** `font-[var(--font-cinzel)]` — Cinzel

## Dosya Yapısı

```
src/
├── app/
│   ├── globals.css      # Tailwind v4 tema + özel CSS
│   ├── layout.tsx       # Root layout, fontlar, metadata
│   └── page.tsx         # Ana sayfa — tüm bölümler
├── components/
│   ├── Navigation.tsx   # Sabit navbar, scroll efekti, mobil menü
│   ├── Hero.tsx         # Tam ekran hero, vapur SVG, animasyonlar
│   ├── Timeline.tsx     # Zaman çizelgesi (1851-1945)
│   ├── Suhulet.tsx      # Arabalı vapur bölümü, teknik çizim SVG
│   ├── Portrait.tsx     # Hüseyin Haki Efendi biyografisi
│   ├── Footer.tsx       # İskele listesi + alt bilgi
│   ├── OttomanBorder.tsx # Dekoratif SVG komponentleri
│   └── SteamshipSVG.tsx  # Animasyonlu vapur illüstrasyonu
├── lib/
│   └── constants.ts     # Site config, timeline verileri, iskele listeleri
└── hooks/
    └── useScrollReveal.ts # Intersection Observer hook
```

## Komponent Oluşturma Kuralları

Yeni komponent eklerken şu kalıplara uy:

1. Her komponent `"use client"` directive ile başlar (Framer Motion kullandığı için)
2. Animasyonlarda `motion` ve `useInView` kullan
3. Font class'ları inline olarak uygulanır: `font-[var(--font-playfair)]`
4. Renkler Tailwind tema class'ları ile: `text-ottoman-gold`, `bg-ottoman-navy`
5. Responsive tasarım: mobil-first yaklaşım, `md:` ve `lg:` breakpoint'ler

## Sık Kullanılan Komutlar

```bash
# Geliştirme
npm run dev

# Build test
npm run build

# Lint
npm run lint

# Deploy (commit + push + Vercel)
./scripts/deploy.sh "commit mesajı"

# İlk kurulum
./scripts/setup.sh
```

## Osmanlı Tasarım Elementleri

Yeni bölüm eklerken kullanılabilecek hazır komponentler:

- `<OttomanFrame>` — Altın köşeli dekoratif çerçeve
- `<OttomanDivider>` — Yıldızlı altın ayırıcı çizgi
- `<OttomanCorner>` — Köşe süslemesi (rotate ile 4 köşeye)
- `<SteamshipSVG>` — Animasyonlu vapur illüstrasyonu

## CSS Utility Class'ları

- `.text-gradient-gold` — Altın gradient metin efekti
- `.gold-shimmer` — Animasyonlu altın parıltı
- `.bg-parchment-texture` — Parşömen doku arka planı
- `.border-ottoman` — Altın gradient border
- `.ottoman-divider` — Pseudo-element ayırıcı
- `.scroll-reveal` + `.visible` — Scroll animasyonu
- `.parchment-edges` — Kenar fade efekti

## Görseller İçin Kurallar

- Görseller yapay zeka ile üretilecek, gerçek tarihî referanslardan modifiye edilecek
- Format: WebP tercih et, fallback olarak JPG
- Boyut: Mobil için max 800px genişlik, masaüstü için max 1920px
- İsimlendirme: `vapur-suhulet.webp`, `portre-huseyin-haki.webp` gibi anlamlı isimler
- Konum: `public/images/`

## Gelecek Geliştirmeler (Faz 2)

- Vercel Postgres veya Neon DB entegrasyonu
- Headless CMS (Sanity.io veya Payload)
- İnteraktif Boğaz haritası
- Vapur galerisi sayfası
- Çoklu dil desteği (i18n)
- E-ticaret modülü
