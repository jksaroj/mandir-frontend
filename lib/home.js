import { apiGet } from "./api";
import { fetchTemples } from "./temples";
import { fetchSpiritualItems } from "./mantras";
import { fetchPandits } from "./pandits";
import { isEventCurrent, normalizeEvent } from "./events";

export async function fetchHomeData() {
  const [temples, spiritualItems, pandits, eventResponse] = await Promise.all([
    fetchTemples(),
    fetchSpiritualItems(),
    fetchPandits(),
    apiGet("/festivals/upcoming?limit=8")
  ]);

  const events = (Array.isArray(eventResponse?.data) ? eventResponse.data : []).map(normalizeEvent).filter((event) => event?.slug && isEventCurrent(event));
  return {
    temples,
    spiritualItems,
    pandits,
    festivals: events,
    events,
    pujaServices: [],
    cities: []
  };
}
