# Şirket-i Hayriye Web Projesi — Detaylı Proje Raporu

**Hazırlayan:** Claude (Full Stack Developer)
**Tarih:** 10 Mart 2026
**Domain:** sirket-ihayriye.com
**Durum:** Acil tanıtım lansmanı + gelecekte genişletilecek altyapı

---

## 1. Şirket-i Hayriye — Tarihsel Özet

Şirket-i Hayriye, 17 Ocak 1851'de Padişah Abdülmecid'in onayıyla kurulan, Osmanlı İmparatorluğu'nun **ilk anonim şirketi** ve İstanbul Boğazı'nda modern deniz ulaşımının başlangıcıdır. 1854'ten 1945'e kadar faaliyet göstermiş, toplam **77 vapur** ile Boğaziçi'nin iki yakasını birleştirmiştir.

### Önemli Kilometre Taşları

- **1851:** Kuruluş (Reşid Paşa'nın desteğiyle)
- **1854:** İngiltere'den getirilen ilk 4 yandan çarklı vapur ile seferler başladı
- **1867-1894:** Hüseyin Haki Efendi müdürlük dönemi
- **1871-1872:** Dünyanın ilk arabalı vapuru **Suhulet 26** hizmete girdi (Üsküdar-Kabataş hattı)
- **1915:** Suhulet, Çanakkale Savaşı'nda top taşıyarak stratejik rol üstlendi
- **1944-1945:** Kamulaştırılarak Şehir Hatları İşletmesi'ne devredildi

### İskele Ağı

Avrupa yakasında Kabataş'tan Rumelikavağı'na, Anadolu yakasında Üsküdar'dan Anadolukavağı'na uzanan 30'dan fazla iskeleye hizmet vermiştir.

---

## 2. Paylaşılan Tasarım Konseptlerinin Analizi

Paylaşılan görseller net bir marka dili ortaya koyuyor:

### Renk Paleti
- **Birincil:** Koyu lacivert/navy (#1a2744), altın/gold (#c9a84c), sepia tonları (#d4a574)
- **İkincil:** Yaşlı kağıt beyazı (#f5efe0), Osmanlı kırmızısı (#8b0000), deniz mavisi (#1e6fa0)
- **Aksan:** Bakır kahve, antik bronz

### Tipografi Karakteri
- Osmanlıca tuğra/hat sanatı referansları
- Serif ağırlıklı, klasik ve asil fontlar
- "1851" tarihi sürekli vurgulanan bir element

### Görsel Motifler
- Yandan çarklı buharlı vapur illüstrasyonları
- Osmanlı süsleme bordürleri (köşe motifleri, arabesk desenler)
- Eski harita dokuları, mühür/mum damgası
- Hüseyin Haki Efendi portresi
- Altın çerçeveli vintage fotoğraf çerçeveleri
- Pusula, tüy kalem, mürekkep hokkası gibi dönem objeleri

### Ek Marka: Suda Salt
- "Salt Türk Kaynak Tuzu" — ayrı bir ürün markası
- Pi sayısı (π 3.14) ve beyin görseli ile bilimsel/felsefi yaklaşım
- Aynı vintage Osmanlı estetiğiyle entegre

---

## 3. Web Sitesi Vizyonu ve Öneriler

### 3.1 Faz 1: Tanıtım Lansmanı (ACİL — QR Kod İçin)

QR kod tarandığında kullanıcıyı karşılayacak **tek sayfalık etkileyici bir deneyim:**

**Konsept: "Dijital Osmanlı Fermanı"**

Sayfa açıldığında kullanıcı, yaşlı bir Osmanlı fermanının açılması gibi bir animasyonla karşılanır. Tuğra yukarıdan aşağı iner, metin yavaşça belirir, sayfa bir parşömen gibi açılır.

**İçerik Bölümleri:**

1. **Hero Alanı** — Tam ekran, parallax buharlı vapur silüeti + Boğaz silueti. "Şirket-i Hayriye • 1851" başlığı hat sanatı stilinde animasyonlu yazılır.

2. **Hikaye Şeridi** — Scroll ile aktive olan yatay bir zaman çizelgesi. Her kilometre taşında durak (1851, 1854, 1871, 1915, 1945). Vapur harita üzerinde ilerler gibi bir animasyon.

3. **Suhulet 26 Bölümü** — "Dünyanın İlk Arabalı Vapuru" başlığı ile interaktif bir bölüm. Vapurun teknik çizimi SVG olarak animasyonlu gösterilir.

4. **Hüseyin Haki Efendi** — Altın çerçeveli portrenin dijital versiyonu. Hover'da biyografi bilgisi açılır.

5. **Suda Salt Tanıtım** — Ürün markasının sofistike tanıtımı. Kutu tasarımının 3D döndürülebilir modeli veya parallax efektli görseli.

6. **İletişim / Sosyal Medya** — Minimal footer, QR kod'un tekrarı ve sosyal medya bağlantıları.

### 3.2 Faz 2: Genişletilmiş Site (İlerleyen Dönem)

- Tam tarihçe sayfası (interaktif harita ile iskeleler)
- Vapur galerisi (77 vapurun kataloğu)
- Suda Salt e-ticaret entegrasyonu
- Blog / Makaleler bölümü
- Çok dilli destek (TR/EN/AR)
- Admin paneli (içerik yönetimi)

---

## 4. Teknik Mimari Önerisi

### 4.1 Teknoloji Stack'i

| Katman | Teknoloji | Gerekçe |
|--------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | SSR/SSG, SEO, performans, kolay deploy |
| **Dil** | TypeScript | Tip güvenliği, bakım kolaylığı |
| **Stil** | Tailwind CSS v4 + Framer Motion | Utility-first CSS + güçlü animasyonlar |
| **Animasyon** | GSAP + Framer Motion | Scroll-triggered animasyonlar, SVG animasyonları |
| **3D** | Three.js (isteğe bağlı) | Vapur/kutu 3D modelleri için |
| **CMS** | Sanity.io veya Payload CMS | Headless CMS, Faz 2 için içerik yönetimi |
| **Deploy** | Vercel | Next.js native, global CDN, otomatik SSL |
| **Domain** | sirket-ihayriye.com → Vercel DNS | Kolay DNS yönetimi |

### 4.2 Proje Yapısı

```
sirket-i-hayriye/
├── public/
│   ├── fonts/          # Özel Osmanlı/serif fontlar
│   ├── images/         # Optimized görseller (WebP)
│   ├── svg/            # Vapur, motif SVG'leri
│   └── lottie/         # Animasyon dosyaları
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + font loading
│   │   ├── page.tsx            # Landing page (Faz 1)
│   │   ├── tarihce/page.tsx    # Faz 2
│   │   └── iletisim/page.tsx   # Faz 2
│   ├── components/
│   │   ├── Hero.tsx            # Ferman açılış animasyonu
│   │   ├── Timeline.tsx        # Scroll zaman çizelgesi
│   │   ├── Suhulet.tsx         # Arabalı vapur bölümü
│   │   ├── Portrait.tsx        # Hüseyin Haki Efendi
│   │   ├── SudaSalt.tsx        # Ürün tanıtımı
│   │   ├── OttomanBorder.tsx   # Osmanlı bordür komponenti
│   │   └── Navigation.tsx      # Minimal navigasyon
│   ├── styles/
│   │   └── globals.css         # Tailwind + özel stiller
│   ├── lib/
│   │   ├── animations.ts       # GSAP konfigürasyonları
│   │   └── constants.ts        # Renk paleti, metin sabitleri
│   └── hooks/
│       └── useScrollAnimation.ts
├── docs/                       # Proje dokümantasyonu
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 4.3 Performans Hedefleri

- Lighthouse skoru: 95+
- İlk yüklenme: < 2 saniye
- Toplam sayfa boyutu: < 3 MB (görseller dahil)
- Core Web Vitals: Tüm metriklerde "İyi" seviyesi

### 4.4 SEO Stratejisi

- Semantic HTML5 yapısı
- Open Graph + Twitter Card meta tagları
- Schema.org yapılandırılmış veri (Organization, HistoricalEvent)
- Türkçe lang attribute ve hreflang tagları
- sitemap.xml + robots.txt
- Görsel alt text'leri Türkçe ve İngilizce

---

## 5. Tasarım Detayları — Faz 1

### 5.1 Font Önerileri

- **Başlıklar:** "Playfair Display" veya "Cormorant Garamond" (serif, asil)
- **Gövde:** "Source Serif Pro" veya "Lora" (okunabilir serif)
- **Aksan/Tarih:** "Cinzel" (Roma/imparatorluk hissi)
- **Hat sanatı efekti:** SVG path animasyonu ile özel yazı

### 5.2 Animasyon Planı

```
Sayfa Açılış (0-2s):
  ├─ Yaşlı kağıt dokusu fade-in
  ├─ Tuğra/logo yukarıdan süzülür
  └─ "1851" tarihi soldan yazılır

Scroll Bölüm 1 — Hikaye (parallax):
  ├─ Eski İstanbul haritası arka planda kayar
  ├─ Vapur silueti sağdan sola yol alır
  └─ Zaman çizelgesi noktaları sırayla belirir

Scroll Bölüm 2 — Suhulet:
  ├─ Teknik çizim SVG çizgisel olarak çizilir
  └─ İstatistikler sayaçla yükselir

Scroll Bölüm 3 — Hüseyin Haki Efendi:
  ├─ Altın çerçeve ölçeklenerek belirir
  ├─ Portre fade-in
  └─ Alıntı metin daktiloyla yazılır

Scroll Bölüm 4 — Suda Salt:
  ├─ Kutu görseli 3D perspektifle döner
  └─ Tuz taneleri parçacık efekti
```

### 5.3 Responsive Strateji

- **Mobil (< 768px):** Tek sütun, basitleştirilmiş animasyonlar, dokunmatik jestler
- **Tablet (768-1024px):** İki sütun, orta seviye animasyonlar
- **Masaüstü (> 1024px):** Tam deneyim, tüm parallax ve 3D efektler
- **Geniş ekran (> 1440px):** İçerik genişliği sınırlanır, yan boşluklar artar

---

## 6. Uygulama Yol Haritası

### Faz 1 — Tanıtım Lansmanı (Tahmini: 3-5 gün geliştirme)

| Gün | Görev |
|-----|-------|
| 1 | Proje kurulumu, Next.js + Tailwind + GSAP altyapısı, font ve renk sistemi |
| 2 | Hero bölümü + Osmanlı bordür komponenti + zaman çizelgesi |
| 3 | Suhulet, Hüseyin Haki Efendi, Suda Salt bölümleri |
| 4 | Animasyonlar, responsive düzenlemeler, performans optimizasyonu |
| 5 | SEO, domain bağlantısı, Vercel deploy, test |

### Faz 2 — Genişletme (İlerleyen Dönem)

- Headless CMS entegrasyonu
- Ek sayfalar (tarihçe, galeri, iletişim)
- E-ticaret modülü
- Çoklu dil desteği
- Analytics entegrasyonu

---

## 7. Özel Fikirler ve Yaratıcı Öneriler

### 7.1 "Boğaz Yolculuğu" İnteraktif Deneyimi
Kullanıcı mouse/parmak ile sayfayı kaydırdıkça, Boğaz'ın bir yakasından diğerine geçen bir vapur animasyonu. İskeleler scroll noktaları olur, her iskelede bir bilgi balonu açılır.

### 7.2 Ses Tasarımı (Opsiyonel)
Arka planda hafif dalga sesi + vapur düdüğü efekti. Kullanıcı isteğiyle açılır/kapanır. Nostaljik atmosferi güçlendirir.

### 7.3 "Ferman" Paylaşım Özelliği
Kullanıcı kendi adına özelleştirilmiş bir Osmanlı fermanı görseli oluşturabilir ve sosyal medyada paylaşabilir. Viral potansiyeli yüksek.

### 7.4 Gece/Gündüz Modu
Gece modunda Boğaz'ın ay ışığı altındaki silueti ile koyu tema. Gündüz modunda sıcak sepia tonları. Saat dilimine göre otomatik geçiş.

### 7.5 QR Kod Entegrasyonu
QR kod tarandığında özel bir karşılama animasyonu. Doğrudan ziyaretçi ile QR'dan gelen ziyaretçi ayrı deneyim yaşar.

### 7.6 Koleksiyoner Kartları
Tarihi vapurların dijital koleksiyon kartları. Her ziyarette rastgele bir kart gösterilir. Tüm kartları toplamak için tekrar ziyaret teşviki.

---

## 8. Sonraki Adımlar

- [ ] Domain bağlantısı (sirket-ihayriye.com → Vercel)
- [ ] Suda Salt bölümü eklenmesi
- [ ] İnteraktif Boğaz haritası
- [ ] Vapur galerisi sayfası
- [ ] Çoklu dil desteği (i18n)
- [ ] E-ticaret modülü
- [ ] Headless CMS entegrasyonu

---

*Bu rapor, sirket-ihayriye.com projesi için bir başlangıç noktasıdır. Her bölüm onayınıza ve geri bildiriminize göre detaylandırılabilir.*
