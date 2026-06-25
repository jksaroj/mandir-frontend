export default function JsonLd({ data }) {
  const blocks = Array.isArray(data) ? data.filter(Boolean) : [data].filter(Boolean);
  if (!blocks.length) return null;

  return blocks.map((block, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Hindi/English: JSON-LD structured data Google ko page context samjhata hai.
        __html: JSON.stringify(block).replace(/</g, "\\u003c")
      }}
    />
  ));
}
