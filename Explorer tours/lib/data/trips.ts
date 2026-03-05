import { Trip } from "@/types/trip";

export const trips: Trip[] = [
  {
    id: "trip-rajmachi-night",
    slug: "rajmachi-firefly-night-trek",
    name: "Rajmachi Firefly Night Trek",
    summary:
      "Monsoon night trek through glowing forest trails with fort sunrise and guided ridge camp.",
    region: "Sahyadri",
    category: "Monsoon Treks",
    destination: "Lonavala, Maharashtra",
    durationDays: 2,
    difficulty: "Moderate",
    bestMonths: ["June", "July", "August", "September"],
    price: 3499,
    heroVideo:
      "https://cdn.pixabay.com/video/2020/05/08/38508-419132989_large.mp4",
    heroImage:
      "https://images.unsplash.com/photo-1508264165352-258db2ebd59b?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Guided midnight ascent with safety marshals",
      "Lakeside camp and local Maharashtrian meals",
      "Sunrise fort walk and valley descent"
    ],
    overview:
      "Rajmachi is our signature Sahyadri monsoon departure designed for first-time trekkers and working professionals. The route blends forest trail movement, safe night ascent, ridge-line sunrise, and short historical fort exploration.",
    inclusions: [
      "Pune roundtrip transfer",
      "Certified trek leader and sweep support",
      "Dinner, breakfast, and hydration support",
      "Group first-aid and emergency coordination"
    ],
    exclusions: [
      "Personal snacks and bottled beverages",
      "Individual travel insurance",
      "Anything not listed in inclusions"
    ],
    faqs: [
      {
        question: "Is this trek beginner friendly?",
        answer:
          "Yes. Basic fitness is enough. Our pace strategy and guide ratio are designed for beginners."
      },
      {
        question: "Do we trek in heavy rain?",
        answer:
          "We continue in moderate rain with full safety checks. In severe weather we reroute or pause movement."
      }
    ],
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Pune Departure and Night Ascent",
        description:
          "Evening departure from Pune, safety briefing at base village, and guided ascent under controlled pace."
      },
      {
        day: 2,
        title: "Fort Exploration and Return",
        description:
          "Sunrise at ridge point, Rajmachi fort circuit, breakfast camp, and return transfer."
      }
    ]
  },
  {
    id: "trip-sandhan-valley",
    slug: "sandhan-valley-canyon-trek",
    name: "Sandhan Valley Canyon Trek",
    summary:
      "A technical canyoning trail with rappelling sections, narrow rock gorges, and stargazing camp.",
    region: "Sahyadri",
    category: "Weekend Treks",
    destination: "Bhandardara, Maharashtra",
    durationDays: 2,
    difficulty: "Challenging",
    bestMonths: ["November", "December", "January", "February"],
    price: 4299,
    heroVideo:
      "https://cdn.pixabay.com/video/2021/11/12/97044-646924962_large.mp4",
    heroImage:
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Rappelling supported by technical leaders",
      "Night camp inside rock canyon corridor",
      "Photographer-led dawn canyon session"
    ],
    itinerary: [
      {
        day: 1,
        title: "Base Briefing and Canyon Entry",
        description:
          "Arrival at Samrad village, technical gear checks, and descent into Sandhan canyon with rope support."
      },
      {
        day: 2,
        title: "Canyon Exit and Return",
        description:
          "Early start, boulder navigation, final ascent out of the gorge, and return to Pune or Mumbai."
      }
    ]
  },
  {
    id: "trip-harishchandragad",
    slug: "harishchandragad-kokankada-trek",
    name: "Harishchandragad Kokankada Trek",
    summary:
      "Classic Sahyadri ridge trail featuring Konkan Kada cliffs, ancient caves, and panoramic sunrise.",
    region: "Sahyadri",
    category: "Weekend Treks",
    destination: "Ahmednagar, Maharashtra",
    durationDays: 2,
    difficulty: "Moderate",
    bestMonths: ["October", "November", "December", "January"],
    price: 3199,
    heroVideo:
      "https://cdn.pixabay.com/video/2018/10/11/18656-294879015_large.mp4",
    heroImage:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Sunrise experience at Konkan Kada edge",
      "Guided cave stay and local cuisine",
      "Historical fort walk with expert leads"
    ],
    itinerary: [
      {
        day: 1,
        title: "Night Drive and Base Trek Start",
        description:
          "Late night departure, early morning base breakfast, and climb to Harishchandragad plateau."
      },
      {
        day: 2,
        title: "Kokankada Sunrise and Exit",
        description:
          "Sunrise lookout at Kokankada, temple circuit, controlled descent, and return to city."
      }
    ]
  },
  {
    id: "trip-kedarkantha",
    slug: "kedarkantha-winter-summit",
    name: "Kedarkantha Winter Summit",
    summary:
      "Premium snow trek in Uttarakhand with acclimatization-first itinerary and summit day support.",
    region: "Himalaya",
    category: "Himalayan Treks",
    destination: "Uttarkashi, Uttarakhand",
    durationDays: 6,
    difficulty: "Challenging",
    bestMonths: ["December", "January", "February", "March"],
    price: 16999,
    heroVideo:
      "https://cdn.pixabay.com/video/2019/11/11/28777-372648400_large.mp4",
    heroImage:
      "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517821099601-6d8d7f00d85f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Professional trek captain ratio and safety checks",
      "Snow camp logistics and weather tracking",
      "Summit push with high-altitude protocol"
    ],
    overview:
      "Kedarkantha is our flagship winter Himalayan summit plan with full logistics support from Sankri base. It focuses on acclimatization discipline, summit-day weather windows, and guided snow movement for reliable completion.",
    inclusions: [
      "Dehradun to Sankri roundtrip transport",
      "All trek meals during expedition days",
      "Trek permit and forest entry support",
      "Experienced high-altitude trek leads and support crew"
    ],
    exclusions: [
      "Travel to Dehradun",
      "Personal trekking gear rental",
      "Emergency evacuation cost if required"
    ],
    faqs: [
      {
        question: "What fitness level is required?",
        answer:
          "You should be able to run 4 to 5 km comfortably and complete stair training before departure."
      },
      {
        question: "Will there be snow in all batches?",
        answer:
          "Peak snow conditions are typically from late December to early March, based on weather cycles."
      }
    ],
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Sankri Arrival",
        description:
          "Arrival, gear checks, and briefing session at Sankri base camp."
      },
      {
        day: 2,
        title: "Trek to Juda Ka Talab",
        description:
          "Forest trail ascent with hydration protocol and campsite orientation."
      },
      {
        day: 3,
        title: "Kedarkantha Base Camp",
        description:
          "Steady climb to base camp and summit strategy session."
      },
      {
        day: 4,
        title: "Summit Day",
        description:
          "Pre-dawn summit attempt, ridge photography window, and descent to camp."
      },
      {
        day: 5,
        title: "Descend to Sankri",
        description:
          "Long descent to Sankri with evening recovery meal."
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Checkout and return transfer to Dehradun."
      }
    ]
  },
  {
    id: "trip-hampta-pass",
    slug: "hampta-pass-crossover-trek",
    name: "Hampta Pass Crossover Trek",
    summary:
      "A dramatic crossover from green Kullu valley to stark Spiti landscapes in one expedition.",
    region: "Himalaya",
    category: "Himalayan Treks",
    destination: "Manali, Himachal Pradesh",
    durationDays: 5,
    difficulty: "Challenging",
    bestMonths: ["June", "July", "August", "September"],
    price: 18999,
    heroVideo:
      "https://cdn.pixabay.com/video/2022/06/03/118687-717548685_large.mp4",
    heroImage:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Pass crossing at 14,000+ ft with guide support",
      "Chandratal add-on road excursion",
      "High-camp tenting with cook crew"
    ],
    overview:
      "Hampta Pass is a dramatic crossover trek where landscapes shift quickly from alpine meadows to rocky cold desert terrain. This page covers our full logistics, climb strategy, and crossover-day safety plan.",
    inclusions: [
      "Manali base support and transport to trailhead",
      "Twin-sharing alpine tents and sleeping system",
      "All meals on trek days",
      "Technical support and route safety team"
    ],
    exclusions: [
      "Stay and food in Manali before trek start",
      "Personal medication and gear purchases",
      "Any cost from weather-related itinerary extension"
    ],
    faqs: [
      {
        question: "Is Hampta harder than Kedarkantha?",
        answer:
          "Hampta has longer trail hours and terrain variation, while Kedarkantha is colder and snow-heavy in winter."
      },
      {
        question: "Is Chandratal guaranteed?",
        answer:
          "It is attempted when roads and weather permit. Safety and local authority advisories decide final access."
      }
    ],
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Manali to Jobra",
        description:
          "Drive to trailhead, orientation, and short acclimatization walk."
      },
      {
        day: 2,
        title: "Jobra to Jwara Camp",
        description:
          "Riverside trail with meadows and gradual altitude gain."
      },
      {
        day: 3,
        title: "Jwara to Balu Ka Ghera",
        description:
          "Long ascent day with snowfield sections near upper camp."
      },
      {
        day: 4,
        title: "Hampta Pass Crossing",
        description:
          "Cross the pass and descend to Shea Goru camp."
      },
      {
        day: 5,
        title: "Exit and Return",
        description:
          "Descend to Chhatru and return drive with optional Chandratal visit."
      }
    ]
  },
  {
    id: "trip-valley-flowers",
    slug: "valley-of-flowers-hemkund-trail",
    name: "Valley of Flowers and Hemkund Trail",
    summary:
      "Scenic alpine valley trek blended with Hemkund Sahib spiritual high-altitude trail.",
    region: "Himalaya",
    category: "Spiritual Trails",
    destination: "Chamoli, Uttarakhand",
    durationDays: 6,
    difficulty: "Moderate",
    bestMonths: ["July", "August", "September"],
    price: 17999,
    heroVideo:
      "https://cdn.pixabay.com/video/2020/07/26/45670-445952985_large.mp4",
    heroImage:
      "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508261303786-6ef7eb7b69f6?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "UNESCO valley exploration with naturalist support",
      "Hemkund Sahib high-altitude day hike",
      "Guesthouse stays and local Garhwali meals"
    ],
    overview:
      "Valley of Flowers with Hemkund is built as a scenic + spiritual mountain trail experience. The route combines blooming alpine meadows, a UNESCO landscape zone, and a high-altitude temple day hike.",
    inclusions: [
      "Ground transfers as per itinerary",
      "Guesthouse accommodation on trek days",
      "All trek meals and guide support",
      "Permits and protected area entry support"
    ],
    exclusions: [
      "Personal ponies, porters, or additional baggage carriers",
      "Any medical expense or evacuation service",
      "Personal shopping and miscellaneous expenses"
    ],
    faqs: [
      {
        question: "Can beginners join this trail?",
        answer:
          "Yes, if you prepare with regular walking and cardio. Hemkund day is steep and requires steady pace."
      },
      {
        question: "When do flowers bloom best?",
        answer:
          "Peak bloom window is usually mid-July to late August, depending on monsoon progression."
      }
    ],
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Joshimath Arrival",
        description:
          "Check-in and briefing with route condition updates."
      },
      {
        day: 2,
        title: "Govindghat to Ghangaria",
        description:
          "Steady ascent to Ghangaria with porter support options."
      },
      {
        day: 3,
        title: "Valley of Flowers Day Hike",
        description:
          "Full day guided valley circuit and evening return."
      },
      {
        day: 4,
        title: "Hemkund Sahib Trek",
        description:
          "Early uphill hike to Hemkund and descent back to camp."
      },
      {
        day: 5,
        title: "Return to Govindghat",
        description:
          "Descend to Govindghat and transfer to Joshimath."
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Return drive and expedition closure."
      }
    ]
  },
  {
    id: "trip-meghalaya-root-bridge",
    slug: "meghalaya-root-bridges-trail",
    name: "Meghalaya Living Root Bridges Trail",
    summary:
      "Rainforest trekking to double-decker root bridges, waterfalls, and village homestay culture.",
    region: "Northeast",
    category: "Forest Trails",
    destination: "Cherrapunji, Meghalaya",
    durationDays: 4,
    difficulty: "Moderate",
    bestMonths: ["October", "November", "December", "March", "April"],
    price: 14999,
    heroVideo:
      "https://cdn.pixabay.com/video/2023/08/14/176115-854197352_large.mp4",
    heroImage:
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Double-decker root bridge guided route",
      "Waterfall circuit and cave exploration",
      "Village homestay with local Khasi cuisine"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shillong to Cherrapunji",
        description:
          "Road transfer, briefing, and short acclimatization walk."
      },
      {
        day: 2,
        title: "Root Bridge Trek",
        description:
          "Full-day descent to Nongriat and bridge circuit."
      },
      {
        day: 3,
        title: "Waterfall and Village Trail",
        description:
          "Visit hidden falls and local trail networks."
      },
      {
        day: 4,
        title: "Return Transfer",
        description:
          "Morning village experience and departure to Shillong."
      }
    ]
  },
  {
    id: "trip-rann-kutch",
    slug: "rann-of-kutch-full-moon-expedition",
    name: "Rann of Kutch Full Moon Expedition",
    summary:
      "White desert camping experience with moonlit salt plains, craft villages, and cultural nights.",
    region: "Desert",
    category: "Desert Expeditions",
    destination: "Dhordo, Gujarat",
    durationDays: 3,
    difficulty: "Easy",
    bestMonths: ["November", "December", "January", "February"],
    price: 12999,
    heroVideo:
      "https://cdn.pixabay.com/video/2023/12/06/192010-891504429_large.mp4",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Full moon desert walk on white salt flats",
      "Premium tent stay at Dhordo",
      "Kutchi folk performance and craft village tour"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bhuj Arrival and Camp Transfer",
        description:
          "Airport or station pickup and transfer to desert camp."
      },
      {
        day: 2,
        title: "White Rann and Culture Circuit",
        description:
          "Craft village visit, sunset at white desert, and evening folk program."
      },
      {
        day: 3,
        title: "Departure",
        description:
          "Early breakfast and transfer to Bhuj."
      }
    ]
  },
  {
    id: "trip-gokarna-coastal",
    slug: "gokarna-coastal-trail-camp",
    name: "Gokarna Coastal Trail Camp",
    summary:
      "A sea-cliff trail linking hidden beaches with camp nights and sunrise coastal hikes.",
    region: "Coastal",
    category: "Coastal Escapes",
    destination: "Gokarna, Karnataka",
    durationDays: 3,
    difficulty: "Easy",
    bestMonths: ["October", "November", "December", "January", "February", "March"],
    price: 8499,
    heroVideo:
      "https://cdn.pixabay.com/video/2021/08/30/86744-595412918_large.mp4",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506956191951-7a88da4435e5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Guided half-day coastal trail with beach hopping",
      "Sunset camp dinner and bonfire stories",
      "Optional kayaking and water activity add-ons"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Beach Check-in",
        description:
          "Arrival at Gokarna, camp check-in, and sunset orientation walk."
      },
      {
        day: 2,
        title: "Coastal Trail Day",
        description:
          "Trail from Om Beach to Paradise Beach with activity breaks."
      },
      {
        day: 3,
        title: "Leisure Morning and Departure",
        description:
          "Short sunrise walk, breakfast, and departure transfer support."
      }
    ]
  }
];

export const tripBySlug = new Map(trips.map((trip) => [trip.slug, trip]));

export const featuredTripSlugs = [
  "rajmachi-firefly-night-trek",
  "kedarkantha-winter-summit",
  "hampta-pass-crossover-trek",
  "valley-of-flowers-hemkund-trail"
] as const;

const featuredTripSlugSet = new Set<string>(featuredTripSlugs);

export const featuredTrips = trips.filter((trip) => featuredTripSlugSet.has(trip.slug));
