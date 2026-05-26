/** Static homepage content — temples/reels/mantras still come from API where available */

export const RECENT_SEARCHES_KEY = "sd_recent_searches";

export const trendingSearches = [
  { label: "Kashi Vishwanath Temple", href: "/temples/kashi-vishwanath-temple" },
  { label: "Hanuman Chalisa", href: "/chalisa/hanuman-chalisa" },
  { label: "Om Namah Shivaya", href: "/mantras/om-namah-shivaya" },
  { label: "Vrindavan temples", href: "/temples" },
  { label: "Mahashivratri 2026", href: "#events" }
];

export const deityFilters = [
  { id: "all", label: "All" },
  { id: "shiva", label: "Shiva" },
  { id: "krishna", label: "Krishna" },
  { id: "ram", label: "Ram" },
  { id: "hanuman", label: "Hanuman" },
  { id: "devi", label: "Devi" }
];

export const cityFilters = [
  { id: "all", label: "All Cities" },
  { id: "varanasi", label: "Varanasi" },
  { id: "ayodhya", label: "Ayodhya" },
  { id: "vrindavan", label: "Vrindavan" },
  { id: "haridwar", label: "Haridwar" },
  { id: "ujjain", label: "Ujjain" }
];

export function matchDeityFilter(temple, filterId) {
  if (!filterId || filterId === "all") return true;
  const deity = `${temple.deity || ""} ${temple.name || ""}`.toLowerCase();
  const map = {
    shiva: ["shiva", "mahadev"],
    krishna: ["krishna", "vishnu", "venkateswara", "jagannath", "vasudev"],
    ram: ["ram", "rama", "ayodhya"],
    hanuman: ["hanuman", "bajrang"],
    devi: ["devi", "goddess", "durga", "lakshmi", "parvati", "meenakshi", "kali"]
  };
  return (map[filterId] || []).some((k) => deity.includes(k));
}

export function matchCityFilter(temple, filterId) {
  if (!filterId || filterId === "all") return true;
  const city = (temple.city || temple.badge || "").toLowerCase();
  return city.includes(filterId);
}

export const spiritualReels = [
  {
    id: "reel-1",
    title: "Kashi Vishwanath Aarti",
    deity: "Shiva",
    filter: "shiva",
    duration: "0:58",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "reel-2",
    title: "Hanuman Chalisa Bhajan",
    deity: "Hanuman",
    filter: "hanuman",
    duration: "1:12",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "reel-3",
    title: "Vrindavan Krishna Darshan",
    deity: "Krishna",
    filter: "krishna",
    duration: "0:45",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "reel-4",
    title: "Ayodhya Ram Mandir",
    deity: "Ram",
    filter: "ram",
    duration: "1:05",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "reel-5",
    title: "Durga Mata Aarti",
    deity: "Durga",
    filter: "durga",
    duration: "0:52",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "reel-6",
    title: "Somnath Jyotirlinga",
    deity: "Shiva",
    filter: "shiva",
    duration: "1:20",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=400&q=80"
  }
];

export const reelFilters = [
  { id: "all", label: "All" },
  { id: "shiva", label: "Shiva" },
  { id: "hanuman", label: "Hanuman" },
  { id: "krishna", label: "Krishna" },
  { id: "ram", label: "Ram" },
  { id: "durga", label: "Durga" }
];

export const fallbackEvents = [
  {
    slug: "mahashivratri-2026",
    name: "Mahashivratri Celebrations",
    date: "26 Feb 2026",
    location: "Kashi Vishwanath, Varanasi",
    description: "Night-long Shiva worship, Rudrabhishek and special darshan across Jyotirlinga temples.",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=600&q=80",
    href: "#events"
  },
  {
    slug: "holi-vrindavan",
    name: "Holi in Vrindavan",
    date: "14 Mar 2026",
    location: "Vrindavan, Uttar Pradesh",
    description: "Celebrate divine love with temple processions, bhajan and Phoolon ki Holi.",
    image:
      "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=600&q=80",
    href: "#events"
  },
  {
    slug: "ram-navami",
    name: "Ram Navami Utsav",
    date: "27 Mar 2026",
    location: "Ayodhya, Uttar Pradesh",
    description: "Special abhishek, Ramayana path and deepotsav at Shri Ram Janmabhoomi.",
    image:
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=600&q=80",
    href: "#events"
  },
  {
    slug: "kumbh-haridwar",
    name: "Ganga Aarti & Kumbh Snan",
    date: "10 Apr 2026",
    location: "Haridwar, Uttarakhand",
    description: "Sacred dip in the Ganga with evening aarti at Har Ki Pauri.",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=600&q=80",
    href: "#events"
  },
  {
    slug: "navratri-ujjain",
    name: "Navratri at Mahakal",
    date: "02 Oct 2026",
    location: "Ujjain, Madhya Pradesh",
    description: "Nine nights of Devi worship with special darshan at Mahakaleshwar.",
    image:
      "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=600&q=80",
    href: "#events"
  }
];

export const blogArticles = [
  {
    slug: "famous-temples-india",
    title: "Most Famous Temples in India Every Devotee Should Visit",
    excerpt: "From Tirupati to Kashi — a guide to India's most sacred pilgrimage destinations.",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=500&q=80",
    href: "#"
  },
  {
    slug: "hanuman-chalisa-meaning",
    title: "What is Hanuman Chalisa? Meaning & Benefits",
    excerpt: "Understand the 40 verses of Tulsidas and why millions chant it daily.",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=500&q=80",
    href: "/chalisa/hanuman-chalisa"
  },
  {
    slug: "peace-mantras",
    title: "Powerful Mantras for Peace and Inner Calm",
    excerpt: "Om Namah Shivaya, Gayatri and more — mantras for daily spiritual practice.",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=500&q=80",
    href: "/mantras"
  },
  {
    slug: "vrindavan-travel-guide",
    title: "Best Time to Visit Vrindavan: A Devotee's Guide",
    excerpt: "Festivals, weather and temple timings for your Krishna pilgrimage.",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=500&q=80",
    href: "#"
  },
  {
    slug: "temple-etiquette",
    title: "Temple Etiquette: Dress Code, Darshan & Seva Tips",
    excerpt: "Prepare respectfully for your next mandir visit with this practical guide.",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=500&q=80",
    href: "#"
  }
];

export const homeFaqItems = [
  {
    title: "Which are the most famous temples in India?",
    content:
      "Some of the most revered temples include Tirupati Balaji, Kashi Vishwanath, Jagannath Puri, Meenakshi Madurai, Somnath Jyotirlinga, Ayodhya Ram Mandir, and Vaishno Devi. Each holds deep spiritual significance for millions of devotees."
  },
  {
    title: "What is Hanuman Chalisa?",
    content:
      "Hanuman Chalisa is a 40-verse devotional hymn composed by Goswami Tulsidas in praise of Lord Hanuman. Chanting it is believed to remove obstacles, grant courage, and deepen devotion. Read the full chalisa with meaning on Sri Devasthanam."
  },
  {
    title: "Which mantra is powerful for peace?",
    content:
      "Om Namah Shivaya, Gayatri Mantra, and Om Shanti Mantra are widely chanted for inner peace. Regular japa in a calm environment, especially during Brahma Muhurta, enhances their spiritual effect."
  },
  {
    title: "What is the best time to visit Vrindavan?",
    content:
      "The best times are Kartik month (Oct–Nov), Holi, Janmashtami, and Radhashtami when festivals fill the town with bhajan and leela. Winter (Nov–Feb) offers pleasant weather for temple parikrama."
  }
];

export const fallbackAartis = [
  {
    slug: "shiva-aarti",
    title: "Shiva Aarti",
    deity: "Lord Shiva",
    duration: "4:30",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=200&q=80",
    href: "/mantras"
  },
  {
    slug: "hanuman-aarti",
    title: "Hanuman Aarti",
    deity: "Hanuman",
    duration: "3:45",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=200&q=80",
    href: "/mantras"
  },
  {
    slug: "lakshmi-aarti",
    title: "Lakshmi Aarti",
    deity: "Goddess Lakshmi",
    duration: "5:10",
    image:
      "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=200&q=80",
    href: "/mantras"
  }
];

export const fallbackMantras = [
  {
    slug: "om-namah-shivaya",
    title: "Om Namah Shivaya",
    deity: "Lord Shiva",
    duration: "4:52",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=200&q=80",
    href: "/mantras/om-namah-shivaya"
  },
  {
    slug: "gayatri-mantra",
    title: "Gayatri Mantra",
    deity: "Universal",
    duration: "3:20",
    image:
      "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=200&q=80",
    href: "/mantras"
  },
  {
    slug: "om-namo-bhagavate",
    title: "Om Namo Bhagavate Vasudevaya",
    deity: "Lord Vishnu",
    duration: "5:20",
    image:
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=200&q=80",
    href: "/mantras/om-namo-bhagavate-vasudevaya"
  }
];

export const fallbackChalisas = [
  {
    slug: "hanuman-chalisa",
    title: "Hanuman Chalisa",
    deity: "Hanuman",
    duration: "8:15",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=200&q=80",
    href: "/chalisa/hanuman-chalisa"
  },
  {
    slug: "shri-ram-chalisa",
    title: "Shri Ram Chalisa",
    deity: "Lord Ram",
    duration: "7:40",
    image:
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=200&q=80",
    href: "/chalisa/shri-ram-chalisa"
  },
  {
    slug: "durga-chalisa",
    title: "Durga Chalisa",
    deity: "Goddess Durga",
    duration: "6:55",
    image:
      "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=200&q=80",
    href: "/chalisa"
  }
];
