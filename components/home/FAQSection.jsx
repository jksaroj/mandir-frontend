import Accordion from "@/components/ui/Accordion";
import { homeFaqItems } from "@/lib/homeContent";

export default function FAQSection({ items = homeFaqItems }) {
  const faqItems = Array.isArray(items) && items.length > 0 ? items : homeFaqItems;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.title || item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content || item.answer
      }
    }))
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 id="faq-heading" className="text-center font-serif text-2xl font-bold text-[#2d2020]">
        — ❖ &nbsp; Frequently Asked Questions &nbsp; ❖ —
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-500">
        Answers to common questions about temples, mantras and pilgrimage in India.
      </p>
      <Accordion items={faqItems.map((item) => ({ title: item.title || item.question, content: item.content || item.answer }))} className="mt-8" />
    </section>
  );
}
