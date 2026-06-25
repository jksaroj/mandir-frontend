import {
  FALLBACK_TEMPLE_IMAGE,
  buildTempleImageList,
} from "./images";

const defaultFacilities = [
  ["Free Accommodation", "for devotees"],
  ["Free Meals", "(Prasadam)"],
  ["Cloak Room", "Facility"],
  ["Prasadam Counter", "Sales"],
  ["Drinking Water", "Available"],
  ["Wheelchair", "Facility"],
  ["Medical", "Services"],
  ["Security", "24/7"]
];

const defaultDarshanTimings = [
  ["Morning Darshan", "05:00 AM - 12:00 PM"],
  ["Afternoon Break", "12:30 PM - 03:00 PM"],
  ["Evening Darshan", "03:00 PM - 09:00 PM"],
  ["Special Seva", "10:00 AM - 06:00 PM"]
];

export const temples = [
  {
    slug: "sri-venkateswara-temple",
    name: "Sri Venkateswara Temple",
    city: "Tirupati, Andhra Pradesh",
    citySlug: "tirupati",
    deity: "Lord Venkateswara (Vishnu)",
    badge: "Tirupati, AP",
    rating: "4.8",
    reviewCount: "12.5K",
    dressCode: "Traditional (Saree / Dhoti)",
    templeTimings: "03:00 AM - 11:00 PM",
    excerpt:
      "Sri Venkateswara Temple is one of the most famous and richest temples in the world, dedicated to Lord Venkateswara. Located in Tirumala hills, the temple is a significant pilgrimage center for devotees.",
    image:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=400&q=80"
    ],
    about: {
      paragraphs: [
        "The Sri Venkateswara Temple, also known as Tirumala Tirupati Temple, is dedicated to Lord Venkateswara, an incarnation of Lord Vishnu. It is one of the most visited pilgrimage sites in the world, attracting millions of devotees every year.",
        "The temple is located on the Tirumala hills of Andhra Pradesh and is managed by the Tirumala Tirupati Devasthanams (TTD)."
      ],
      info: [
        ["Established", "300 CE"],
        ["Temple Type", "Vaishnavite"],
        ["Festivals", "Brahmotsavam, Vaikuntha Ekadashi"],
        ["Temple Authority", "TTD (Tirumala Tirupati Devasthanams)"],
        ["Annual Visitors", "5 Crore+"],
        ["Nearest Railway Station", "Tirupati (26 km)"]
      ],
      darshanTimings: [
        ["Suprabhatam", "03:00 AM"],
        ["Sarva Darshan", "04:00 AM - 11:00 PM"],
        ["Special Entry Darshan", "01:00 PM - 11:00 PM"],
        ["Break", "02:30 PM - 03:30 PM"],
        ["Seeghra Darshan", "10:00 AM - 10:00 PM"],
        ["Accommodation Booking", "08:00 AM - 08:00 PM"]
      ]
    },
    location: {
      address: "Tirupati, Andhra Pradesh 517507",
      airText:
        "Nearest Airport is Tirupati Airport (Renigunta) which is about 26 km from the temple. Connected with major cities like Hyderabad, Bengaluru, Chennai.",
      airport: "Tirupati Airport (Renigunta) - 26 km",
      railway: "Tirupati Railway Station - 26 km"
    },
    nearby: [
      ["ISKCON Temple, Tirupati", "12 km from temple"],
      ["Kapila Theertham", "20 km from temple"],
      ["Chandragiri Fort", "16 km from temple"],
      ["Talakona Waterfalls", "49 km from temple"],
      ["Silathoranam", "60 km from temple"]
    ],
    faqs: [
      {
        question: "What is the best time to visit Sri Venkateswara Temple?",
        answer:
          "Early morning darshan is usually preferred for a calmer visit. Festival days and weekends are busier, so devotees should check current darshan timing and crowd updates before planning."
      },
      {
        question: "Is online darshan or seva booking available for this temple?",
        answer:
          "Yes, devotees can plan darshan and seva bookings in advance where available. Booking early helps reduce waiting time and makes the visit more convenient."
      },
      {
        question: "What dress code should devotees follow at the temple?",
        answer:
          "Traditional and modest clothing is recommended. Saree, salwar suit, dhoti, kurta, or other respectful attire is suitable for temple visits."
      },
      {
        question: "Are facilities available for senior citizens and devotees with disabilities?",
        answer:
          "The temple provides important devotee facilities such as drinking water, medical help, wheelchair support, security, and other services depending on availability."
      }
    ]
  },
  {
    slug: "kashi-vishwanath-temple",
    name: "Kashi Vishwanath Temple",
    city: "Varanasi, Uttar Pradesh",
    citySlug: "varanasi",
    deity: "Lord Shiva",
    badge: "Varanasi, UP",
    rating: "4.9",
    reviewCount: "8.7K",
    dressCode: "Traditional (Dhoti / Saree)",
    templeTimings: "04:00 AM - 11:00 PM",
    excerpt:
      "Kashi Vishwanath Temple is one of the most revered Jyotirlingas of Lord Shiva, located on the western bank of the holy river Ganga in Varanasi.",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=400&q=80"
    ],
    about: {
      paragraphs: [
        "Kashi Vishwanath Temple is dedicated to Lord Shiva as Vishwanath, the ruler of the universe. Varanasi, also known as Kashi, is among the oldest living cities and a major spiritual destination.",
        "The temple corridor and surrounding ghats make it a powerful center for darshan, aarti, and spiritual rituals throughout the year."
      ],
      info: [
        ["Established", "Ancient"],
        ["Temple Type", "Shaivite"],
        ["Festivals", "Maha Shivaratri, Shravan"],
        ["Temple Authority", "Shri Kashi Vishwanath Temple Trust"],
        ["Annual Visitors", "7 Crore+"],
        ["Nearest Railway Station", "Varanasi Junction (3 km)"]
      ],
      darshanTimings: defaultDarshanTimings
    },
    location: {
      address: "Lahori Tola, Varanasi, Uttar Pradesh 221001",
      airText:
        "Lal Bahadur Shastri International Airport in Babatpur is about 26 km from the temple and connects Varanasi with major Indian cities.",
      airport: "Varanasi Airport (Babatpur) - 26 km",
      railway: "Varanasi Junction - 3 km"
    },
    nearby: [
      ["Dashashwamedh Ghat", "1 km from temple"],
      ["Sankat Mochan Hanuman Temple", "4 km from temple"],
      ["Assi Ghat", "5 km from temple"],
      ["Sarnath", "12 km from temple"],
      ["Ramnagar Fort", "14 km from temple"]
    ],
    faqs: [
      {
        question: "What is the best time to visit Kashi Vishwanath Temple?",
        answer:
          "Early morning and evening aarti hours are especially popular. Maha Shivaratri and Shravan month draw very large crowds."
      },
      {
        question: "Is online darshan booking available?",
        answer:
          "Online registration and slot booking may be available for special darshan. Check the official temple portal before your visit."
      },
      {
        question: "What dress code should devotees follow?",
        answer:
          "Traditional modest attire is required. Mobile phones and bags may need to be deposited at designated counters."
      },
      {
        question: "Are facilities available for senior citizens?",
        answer:
          "Wheelchair assistance, drinking water, and security support are generally available near the temple complex."
      }
    ]
  },
  {
    slug: "jagannath-temple",
    name: "Jagannath Temple",
    city: "Puri, Odisha",
    citySlug: "puri",
    deity: "Lord Jagannath (Vishnu)",
    badge: "Puri, Odisha",
    rating: "4.7",
    reviewCount: "8.3K",
    dressCode: "Traditional attire",
    templeTimings: "05:00 AM - 11:00 PM",
    excerpt:
      "Jagannath Temple in Puri is one of the Char Dham pilgrimage sites, famous for Rath Yatra and the divine trinity of Jagannath, Balabhadra, and Subhadra.",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=400&q=80"
    ],
    about: {
      paragraphs: [
        "The Jagannath Temple is an important Vaishnavite shrine and the spiritual heart of Puri. It is renowned for its annual Rath Yatra festival.",
        "Mahaprasad served at the temple is considered sacred, and devotees visit from across India throughout the year."
      ],
      info: [
        ["Established", "12th Century"],
        ["Temple Type", "Vaishnavite"],
        ["Festivals", "Rath Yatra, Snana Yatra"],
        ["Temple Authority", "Shree Jagannath Temple Administration"],
        ["Annual Visitors", "2 Crore+"],
        ["Nearest Railway Station", "Puri (3 km)"]
      ],
      darshanTimings: defaultDarshanTimings
    },
    location: {
      address: "Grand Road, Puri, Odisha 752001",
      airText:
        "Biju Patnaik International Airport in Bhubaneswar is about 60 km from Puri and is the nearest major airport.",
      airport: "Bhubaneswar Airport - 60 km",
      railway: "Puri Railway Station - 3 km"
    },
    nearby: [
      ["Puri Beach", "2 km from temple"],
      ["Gundicha Temple", "3 km from temple"],
      ["Chilika Lake", "50 km from temple"],
      ["Konark Sun Temple", "35 km from temple"],
      ["Sakshi Gopal Temple", "20 km from temple"]
    ],
    faqs: [
      {
        question: "When is Rath Yatra celebrated at Jagannath Temple?",
        answer:
          "Rath Yatra is celebrated annually during the Ashadha month. Dates change each year based on the Hindu calendar."
      },
      {
        question: "Can non-Hindus enter the temple?",
        answer:
          "Entry rules are strict and may vary. Please check official temple guidelines before planning your visit."
      },
      {
        question: "What dress code is required?",
        answer:
          "Traditional modest clothing is expected for devotees entering the temple premises."
      },
      {
        question: "Is prasadam available for devotees?",
        answer:
          "Mahaprasad is distributed daily and is an important part of the temple visit experience."
      }
    ]
  },
  {
    slug: "meenakshi-amman-temple",
    name: "Meenakshi Amman Temple",
    city: "Madurai, Tamil Nadu",
    citySlug: "madurai",
    deity: "Goddess Meenakshi (Devi)",
    badge: "Madurai, TN",
    rating: "4.7",
    reviewCount: "8.1K",
    dressCode: "Traditional (Saree / Veshti)",
    templeTimings: "05:00 AM - 12:30 PM, 04:00 PM - 10:00 PM",
    excerpt:
      "Meenakshi Amman Temple is a historic Dravidian temple dedicated to Goddess Meenakshi and Lord Sundareswarar, known for its towering gopurams and art.",
    image:
      "https://images.unsplash.com/photo-1621355894913-4b6f4c5f45b2?auto=format&fit=crop&w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1621355894913-4b6f4c5f45b2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=400&q=80"
    ],
    about: {
      paragraphs: [
        "Meenakshi Amman Temple is a masterpiece of Dravidian architecture with colorful gopurams, sculpted pillars, and sacred tanks.",
        "The temple is central to Madurai's cultural and spiritual life, drawing devotees for festivals, weddings, and daily poojas."
      ],
      info: [
        ["Established", "6th Century CE"],
        ["Temple Type", "Shaivite-Shakta"],
        ["Festivals", "Chithirai Festival, Navaratri"],
        ["Temple Authority", "HR&CE, Tamil Nadu"],
        ["Annual Visitors", "1.5 Crore+"],
        ["Nearest Railway Station", "Madurai Junction (2 km)"]
      ],
      darshanTimings: defaultDarshanTimings
    },
    location: {
      address: "Madurai Main, Tamil Nadu 625001",
      airText:
        "Madurai International Airport is about 12 km from the temple with connections to major Indian cities.",
      airport: "Madurai Airport - 12 km",
      railway: "Madurai Junction - 2 km"
    },
    nearby: [
      ["Thirumalai Nayakkar Mahal", "2 km from temple"],
      ["Gandhi Memorial Museum", "3 km from temple"],
      ["Koodal Azhagar Temple", "2 km from temple"],
      ["Alagar Kovil", "21 km from temple"],
      ["Samayanallur Mariamman Temple", "12 km from temple"]
    ],
    faqs: [
      {
        question: "What are the temple opening hours?",
        answer:
          "The temple usually opens in morning and evening sessions. Timings may change on festival days."
      },
      {
        question: "Is photography allowed inside?",
        answer:
          "Photography is generally restricted inside the inner sanctum. Please follow temple staff instructions."
      },
      {
        question: "Which festivals are most popular?",
        answer:
          "Chithirai Festival and Navaratri attract large gatherings of devotees from across Tamil Nadu."
      },
      {
        question: "Are guided tours available?",
        answer:
          "Local guides are often available near the temple complex to explain architecture and history."
      }
    ]
  },
  {
    slug: "somnath-temple",
    name: "Somnath Temple",
    city: "Somnath, Gujarat",
    citySlug: "somnath",
    deity: "Lord Shiva",
    badge: "Somnath, Gujarat",
    rating: "4.8",
    reviewCount: "7.8K",
    dressCode: "Traditional (Dhoti / Saree)",
    templeTimings: "06:00 AM - 10:00 PM",
    excerpt:
      "Somnath Temple on the shores of the Arabian Sea is among the twelve Jyotirlinga shrines of Lord Shiva and a major pilgrimage destination in Gujarat.",
    image:
      "https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=400&q=80"
    ],
    about: {
      paragraphs: [
        "Somnath Temple is revered as the first among the twelve Jyotirlingas. Its seaside location adds to the spiritual atmosphere of the shrine.",
        "The temple has been rebuilt several times through history and remains a symbol of devotion and resilience."
      ],
      info: [
        ["Established", "Ancient"],
        ["Temple Type", "Shaivite"],
        ["Festivals", "Maha Shivaratri, Kartik Purnima"],
        ["Temple Authority", "Shree Somnath Trust"],
        ["Annual Visitors", "80 Lakh+"],
        ["Nearest Railway Station", "Veraval (7 km)"]
      ],
      darshanTimings: defaultDarshanTimings
    },
    location: {
      address: "Somnath, Prabhas Patan, Gujarat 362268",
      airText:
        "Diu Airport and Rajkot Airport are commonly used gateways, with road connectivity to Somnath via Veraval.",
      airport: "Diu Airport - 85 km",
      railway: "Veraval Railway Station - 7 km"
    },
    nearby: [
      ["Triveni Sangam", "1 km from temple"],
      ["Bhalka Tirth", "5 km from temple"],
      ["Prabhas Patan Museum", "2 km from temple"],
      ["Gir National Park", "45 km from temple"],
      ["Porbandar", "130 km from temple"]
    ],
    faqs: [
      {
        question: "What is the best time to visit Somnath Temple?",
        answer:
          "Winter months (October to February) are pleasant for travel. Maha Shivaratri draws very large crowds."
      },
      {
        question: "Is evening aarti worth attending?",
        answer:
          "Yes, the evening aarti with views of the Arabian Sea is a memorable experience for devotees."
      },
      {
        question: "Are there accommodation options nearby?",
        answer:
          "Several dharamshalas and hotels are available in Somnath and Veraval for pilgrims."
      },
      {
        question: "How far is the temple from the beach?",
        answer:
          "The temple is located close to the coastline, and devotees can visit the beach after darshan."
      }
    ]
  }
];

export function getTempleBySlug(slug) {
  return temples.find((temple) => temple.slug === slug) ?? null;
}

export function getTempleHref(slug) {
  return `/temples/${slug}`;
}

export function getAllTempleSlugs() {
  return temples.map((temple) => temple.slug);
}

export function getTempleFacilities() {
  return defaultFacilities;
}

export function getDefaultGallery(temple) {
  const list = temple?.images?.length ? temple.images : [temple?.image];
  return list.filter(Boolean).slice(0, 8);
}

function withLocalizedFieldObjects(row, locale = "en") {
  if (!row || typeof row !== "object") return row;
  const output = { ...row };
  for (const [key, value] of Object.entries(row)) {
    if (!key.endsWith("_hi")) continue;
    const base = key.slice(0, -3);
    if (!(base in row)) continue;
    output[base] = {
      en: row[base] ?? "",
      hi: value ?? ""
    };
  }
  output.__locale = locale;
  return output;
}

function normalizeTemple(row, locale = "en") {
  if (!row) return null;
  row = withLocalizedFieldObjects(row, locale);
  const text = (value, fallback = "") => {
    if (value == null) return fallback;
    if (typeof value === "object" && !Array.isArray(value)) {
      return value[locale] ?? value.en ?? value.hi ?? Object.values(value).find(Boolean) ?? fallback;
    }
    return String(value);
  };

  const cleanText = (value, fallback = "") => {
    const raw = text(value, fallback).trim();
    if (!raw) return fallback;
    return raw
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
      .replace(/<\/?[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
  };

  const cleanHtml = (value) => {
    const raw = text(value).trim();
    if (!raw || !/<[a-z][\s\S]*>/i.test(raw)) return "";
    return raw
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/\son\w+="[^"]*"/gi, "")
      .replace(/\son\w+='[^']*'/gi, "")
      .replace(/\sjavascript:/gi, "");
  };

  const parseList = (value, fallback = []) => {
    if (!value) return fallback;
    if (Array.isArray(value)) return value;
    if (typeof value === "object") return [value];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const images = buildTempleImageList(row, FALLBACK_TEMPLE_IMAGE);
  const image = images[0] ?? FALLBACK_TEMPLE_IMAGE;

  const name = cleanText(row.name, "Temple");
  const descriptionHtml = cleanHtml(row.description ?? row.content ?? row.body);
  const description = cleanText(row.description ?? row.content ?? row.body);
  const shortDescription = cleanText(row.short_description ?? row.excerpt ?? row.meta_description);
  const history = cleanText(row.history ?? row.temple_history);
  const city  = text(row.city);
  const state = text(row.state);
  const badge = row.badge ?? (city && state ? `${city}, ${state}` : city || state || "");

  const formatTime12 = (t) => {
    if (!t) return "";
    const part = String(t).slice(0, 5);
    const [h, m] = part.split(":").map(Number);
    if (Number.isNaN(h)) return String(t);
    const ap = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ap}`;
  };

  const apiTimings = Array.isArray(row.timings) ? row.timings : [];
  const scheduleTimings = apiTimings.map((t) => {
    const start = t.start_time;
    const end = t.end_time;
    const range = end
      ? `${formatTime12(start)} - ${formatTime12(end)}`
      : formatTime12(start);
    return {
      name: t.darshan_name,
      start,
      end,
      display: range,
    };
  });

  const darshanTimingsFromApi = scheduleTimings.map((t) => [t.name, t.display]);

  // Timings from opening/closing_time or existing field
  const timings = row.templeTimings ?? row.temple_timings
    ?? (row.opening_time
      ? `${formatTime12(row.opening_time)}${row.closing_time ? ` - ${formatTime12(row.closing_time)}` : ""}`.trim()
      : scheduleTimings[0]?.display ?? "");

  // Build about section from API or existing shape
  const aboutParagraphs = parseList(row.about?.paragraphs)
    .map((paragraph) => cleanText(paragraph))
    .filter(Boolean);

  const about = row.about ?? {
    paragraphs: aboutParagraphs.length
      ? aboutParagraphs
      : [description, shortDescription, history].filter(Boolean),
    info: [
      row.established_year && ["Established", cleanText(row.established_year)],
      row.temple_type      && ["Temple Type", cleanText(row.temple_type)],
      row.festivals_list?.length && ["Festivals", parseList(row.festivals_list).map((f) => cleanText(f.name ?? f)).join(", ")],
      row.temple_authority && ["Temple Authority", cleanText(row.temple_authority)],
      row.annual_visitors  && ["Annual Visitors", cleanText(row.annual_visitors)],
      row.nearest_railway  && ["Nearest Railway Station", cleanText(row.nearest_railway)],
    ].filter(Boolean),
    darshanTimings:
      darshanTimingsFromApi.length > 0 ? darshanTimingsFromApi : defaultDarshanTimings,
  };

  const parseReachField = (raw) => {
    if (!raw) return { description: "", placeName: "", lat: "", lng: "" };
    if (typeof raw === "object") {
      return {
        description: raw.description ?? "",
        placeName: raw.placeName ?? raw.place ?? "",
        lat: String(raw.lat ?? ""),
        lng: String(raw.lng ?? ""),
      };
    }
    try {
      const p = JSON.parse(raw);
      if (p && typeof p === "object") {
        return {
          description: p.description ?? "",
          placeName: p.placeName ?? p.place ?? "",
          lat: String(p.lat ?? ""),
          lng: String(p.lng ?? ""),
        };
      }
    } catch {
      /* plain text */
    }
    return { description: String(raw), placeName: "", lat: "", lng: "" };
  };

  let facilities = parseList(row.facilities);

  // Build location section
  const air = parseReachField(row.how_to_reach_air);
  const train = parseReachField(row.how_to_reach_train);
  const bus = parseReachField(row.how_to_reach_road);

  const location = row.location ?? {
    address: text(row.address),
    latitude: row.latitude != null ? String(row.latitude) : "",
    longitude: row.longitude != null ? String(row.longitude) : "",
    air,
    train,
    bus,
    airText: air.description,
    trainText: train.description,
    roadText: bus.description,
    airport: row.nearest_airport || air.placeName || "",
    railway: row.nearest_railway || train.placeName || "",
  };

  // Nearby places (may be JSON string from DB)
  let nearby = parseList(row.nearby ?? row.nearby_places).map((item) => {
    if (Array.isArray(item)) return item;
    return [
      cleanText(item.name ?? item.title ?? item.place ?? "Nearby place"),
      cleanText(item.distance ?? item.description ?? item.text ?? ""),
    ];
  });

  const poojas = parseList(row.poojas).map((item) => ({
    ...item,
    name: cleanText(item.name),
    short_description: cleanText(item.short_description),
  }));

  const reviews = parseList(row.reviews).map((item) => ({
    ...item,
    reviewer_name: cleanText(item.reviewer_name ?? item.name, "Devotee"),
    review_text: cleanText(item.review_text ?? item.text),
  }));

  const specialEvents = parseList(row.specialEvents ?? row.special_events);

  return {
    slug:         row.slug,
    id:           row.id,
    name,
    city:         city && state ? `${city}, ${state}` : city,
    citySlug:     row.citySlug ?? row.city_slug ?? city.toLowerCase().replace(/\s+/g, "-"),
    deity:        cleanText(row.deity ?? row.main_deity),
    badge,
    rating:       String(row.rating ?? "4.5"),
    reviewCount:  row.reviewCount ?? String(row.total_reviews ?? "0"),
    dressCode:    cleanText(row.dressCode ?? row.dress_code),
    templeTimings: timings,
    scheduleTimings,
    excerpt:      shortDescription || description,
    image,
    images,
    about,
    description,
    descriptionHtml,
    history,
    location,
    facilities,
    nearby,
    poojas,
    reviews,
    specialEvents,
    faqs:         parseList(row.faqs).map((item) => ({
      question: cleanText(item.question),
      answer: cleanText(item.answer),
    })),
    created_at:   row.created_at ?? "",
  };
}

export async function fetchTemples(params = "") {
  const { apiGet, getCurrentLocale } = await import("./api");
  const locale = await getCurrentLocale();
  const response = await apiGet(`/temples?sort=newest&limit=50${params}`);
  // Backend wraps response: { success, data: [...], pagination }
  const arr = Array.isArray(response?.data) ? response.data
    : Array.isArray(response) ? response
    : null;
  if (arr && arr.length > 0) {
    return arr.map((row) => normalizeTemple(row, locale));
  }
  return temples;
}

export async function fetchTempleBySlug(slug) {
  const { apiGet, getCurrentLocale } = await import("./api");
  const locale = await getCurrentLocale();
  // Backend route: GET /api/temples/:slug  (not /temples/slug/:slug)
  const response = await apiGet(`/temples/${slug}`);
  const row = response?.data ?? response;
  if (row && row.slug) {
    return normalizeTemple(row, locale);
  }
  return getTempleBySlug(slug);
}

export async function fetchAllTempleSlugs() {
  const list = await fetchTemples();
  return list.map((temple) => temple.slug);
}
