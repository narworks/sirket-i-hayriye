export const SITE_CONFIG = {
  name: "Şirket-i Hayriye",
  year: "1851",
  tagline: "Boğaz'ın İki Yakasını Birleştiren İlk Modern Ulaşım Sistemi",
  domain: "sirket-ihayriye.com",
} as const;

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1851",
    title: "Kuruluş",
    description:
      "Padişah Abdülmecid'in onayıyla Osmanlı İmparatorluğu'nun ilk anonim şirketi olarak kuruldu. Kuruluş nizamnamesi Ahmet Cevdet Paşa tarafından hazırlandı.",
    highlight: true,
  },
  {
    year: "1854",
    title: "İlk Seferler",
    description:
      "İngiltere'den getirilen yandan çarklı dört vapur ile Boğaziçi'nde ilk düzenli seferler başladı. İlk sefer Eminönü-Üsküdar hattında yapıldı.",
  },
  {
    year: "1867",
    title: "Hüseyin Haki Efendi Dönemi",
    description:
      "Hüseyin Haki Efendi müdürlüğe atandı. Şirkete yenilikçi vizyonuyla 27 yıl boyunca liderlik etti.",
  },
  {
    year: "1872",
    title: "Dünyanın İlk Arabalı Vapuru",
    description:
      "Suhulet 26, Üsküdar-Kabataş hattında hizmete girdi. İki tarafında kıyıya indirilecek kapakları olan bu vapur, dünyanın bilinen ilk arabalı vapuru oldu.",
    highlight: true,
  },
  {
    year: "1894",
    title: "Filo Genişlemesi",
    description:
      "Şirket filosu 77 vapura ulaştı. 66'sı İngiltere'de, 6'sı Fransa'da, 2'si Almanya'da, 1'i Hollanda'da ve 2'si İstanbul Hasköy'de inşa edildi.",
  },
  {
    year: "1915",
    title: "Çanakkale Savaşı",
    description:
      "Şirket vapurları ordunun emrine verildi. Suhulet, Çanakkale cephesine top taşıyarak stratejik görev üstlendi.",
  },
  {
    year: "1945",
    title: "Devir ve Miras",
    description:
      "Kamulaştırılarak tüm varlıkları Şehir Hatları İşletmesi'ne devredildi. Mirası bugün hâlâ İstanbul'un deniz ulaşımında yaşıyor.",
  },
];

export const ISKELE_AVRUPA = [
  "Kabataş",
  "Beşiktaş",
  "Ortaköy",
  "Kuruçeşme",
  "Arnavutköy",
  "Bebek",
  "Rumelihisarı",
  "Emirgan",
  "İstinye",
  "Yeniköy",
  "Tarabya",
  "Sarıyer",
  "Rumelikavağı",
];

export const ISKELE_ANADOLU = [
  "Üsküdar",
  "Kuzguncuk",
  "Beylerbeyi",
  "Çengelköy",
  "Kandilli",
  "Anadoluhisarı",
  "Kanlıca",
  "Çubuklu",
  "Beykoz",
  "Anadolukavağı",
];

// Video Galeri Sabitleri
import type { VideoContent, VideoGalleryConfig } from "./types";

export const VIDEO_GALLERY_CONFIG: VideoGalleryConfig = {
  autoPlay: true,
  showOnEveryVisit: true, // Her ziyarette otomatik aç
  defaultMuted: true, // Autoplay için muted başla
  fadeOutDuration: 2, // Son 2 saniyede ses kısılır
  crossfadeDuration: 0.6, // Video geçiş süresi
  skipButtonDelay: 3, // 3 saniye sonra "Atla" butonu
  storageKey: "sirket-galeri-muted", // Ses tercihi için
};

// Atmosferik İstanbul Boğazı videoları
// Not: Bu videolar örnek olarak eklenmiştir, kendi videolarınızla değiştirebilirsiniz
export const GALLERY_VIDEOS: VideoContent[] = [
  {
    id: "bogaz-yolculugu",
    title: "Boğaz'da Bir Yolculuk",
    description: "İstanbul Boğazı'nın eşsiz manzarası",
    url: "https://www.youtube.com/watch?v=z6O3GIVXa2w", // Istanbul Bosphorus 4K
    year: "1851",
  },
  {
    id: "istanbul-gundogumu",
    title: "İstanbul'da Gün Doğumu",
    description: "Boğaz'ın iki yakası arasında şafak",
    url: "https://www.youtube.com/watch?v=Scxs7L0vhZ4", // Istanbul sunrise drone
    year: "1854",
  },
  {
    id: "vapur-seferi",
    title: "Tarihi Vapur Seferi",
    description: "Şehir Hatları vapurlarıyla nostaljik yolculuk",
    url: "https://www.youtube.com/watch?v=8HqyKw1BCUU", // Istanbul ferry
    year: "1872",
  },
];
