import Accordion from "@/components/ui/Accordion";
import { homeFaqItems } from "@/lib/homeContent";

export default function FAQSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqItems.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content
      }
    }))
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 id="faq-heading" className="text-center text-2xl font-extrabold text-[#11162b] sm:text-3xl">
        Frequently Asked Questions
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-500">
        Answers to common questions about temples, mantras and pilgrimage in India.
      </p>
      <Accordion items={homeFaqItems} className="mt-8" />
    </section>
  );
}
