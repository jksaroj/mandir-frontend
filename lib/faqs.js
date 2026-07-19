import { apiGet, getCurrentLocale } from "./api";

export async function fetchFaqs(scope, entityKey = "") {
  const locale = await getCurrentLocale();
  const query = new URLSearchParams({ scope, entity_key: entityKey });
  const response = await apiGet(`/faqs?${query}`);
  const rows = Array.isArray(response?.data) ? response.data : [];
  return rows.map((row) => ({
    question: row.question?.[locale] || row.question?.en || row.question_en,
    answer: row.answer?.[locale] || row.answer?.en || row.answer_en
  })).filter((item) => item.question && item.answer);
}
