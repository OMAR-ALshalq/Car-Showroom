import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "CarShowRoom",
  description = "وجهتك الأولى لشراء السيارات - أفضل الأسعار وأحدث الموديلات",
  keywords = "سيارات, شراء سيارات, سوريا, سيارات للبيع, CarShowRoom,أسعار سيارات تويوتا 2024 في سوريا",
  image = "/image/imgMain.jpg",
  url = "https://almalih-motors.com"
}) {
  const fullTitle = title.includes("CarShowRoom")
    ? title
    : `${title} | CarShowRoom`;

  return (
    <Helmet>
      {/* ✅ أساسي */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* ✅ Open Graph (فيسبوك / واتساب) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* ✅ Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ✅ Canonical */}
      <link rel="canonical" href={url} />

      {/* ✅ اللغة */}
      <html lang="ar" dir="rtl" />
    </Helmet>
  );
}
