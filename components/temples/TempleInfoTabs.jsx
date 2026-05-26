import Tabs from "@/components/ui/Tabs";

const tabs = ["Overview", "Darshan & Timings", "Pooja & Seva", "History", "Gallery", "Facilities", "How to Reach", "Reviews"];
const sectionIds = ["overview", "darshan-timings", "pooja-seva", "history", "gallery", "facilities", "how-to-reach", "reviews"];

export default function TempleInfoTabs() {
  return <Tabs tabs={tabs} sectionIds={sectionIds} className="mt-4" sticky scrollable />;
}
