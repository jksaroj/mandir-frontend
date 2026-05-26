import { apiGet } from "./api";
import { fetchTemples } from "./temples";
import { fetchSpiritualItems } from "./mantras";
import { fetchPandits } from "./pandits";

export async function fetchHomeData() {
  const [temples, spiritualItems, pandits, apiData] = await Promise.all([
    fetchTemples(),
    fetchSpiritualItems(),
    fetchPandits(),
    apiGet("/public/home")
  ]);

  return {
    temples,
    spiritualItems,
    pandits,
    festivals: apiData?.festivals ?? [],
    events: apiData?.events ?? [],
    pujaServices: apiData?.pujaServices ?? [],
    cities: apiData?.cities ?? []
  };
}
