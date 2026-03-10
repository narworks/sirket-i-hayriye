import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Şirket-i Hayriye | 1851 — Boğaz'ın İki Yakasını Birleştiren İlk Modern Ulaşım Sistemi",
  description:
    "Şirket-i Hayriye, 1851'de kurulan Osmanlı İmparatorluğu'nun ilk anonim şirketi ve İstanbul Boğazı'nda modern deniz ulaşımının öncüsü. Dünyanın ilk arabalı vapuru Suhulet 26'nın hikayesi.",
  keywords: [
    "Şirket-i Hayriye",
    "Osmanlı",
    "İstanbul",
    "Boğaziçi",
    "vapur",
    "Suhulet 26",
    "Hüseyin Haki Efendi",
    "deniz ulaşımı",
    "tarih",
  ],
  openGraph: {
    title: "Şirket-i Hayriye | 1851",
    description: "Boğaz'ın İki Yakasını Birleştiren İlk Modern Ulaşım Sistemi",
    url: "https://sirket-ihayriye.com",
    siteName: "Şirket-i Hayriye",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Şirket-i Hayriye | 1851",
    description: "Boğaz'ın İki Yakasını Birleştiren İlk Modern Ulaşım Sistemi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        {/* Google Fonts — loaded via link tags for build compatibility */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&family=Source+Serif+4:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
