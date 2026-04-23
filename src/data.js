const unsplash = (q) => `https://picsum.photos/seed/${q}${Math.floor(Math.random()*100)}/1200/800`;

// ✅ REPLACED LOCAL FILES WITH GOOGLE DRIVE LINKS
const gomateshModel = "https://drive.google.com/uc?export=download&id=1qZ3D6r3kLAg6iXyH0YXC_aDJTAVgmGx6";
const chaturmukhaModel = "https://drive.google.com/uc?export=download&id=1J8S1raSb9CFbEhK5B83OSzU26RyxuWX4";

export const placesData = [
  {
  id: "st-aloysius-chapel",
  name: "St. Aloysius Chapel, Mangalore",
  type: "place",
  city: "Mangalore",
  tag: "HERITAGE",
  image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/St.Aloysius_college%28Autonomous%29Mangalore.jpg",   // FIXED

  coords: [12.8625, 74.8435],
  description:
    "A stunning chapel known for its beautiful frescoes and Portuguese-era architecture. A must-visit in Mangalore.",
  openingHours: "06:00 AM – 07:00 PM",
  ticketPrice: "Free (donations welcome)",
  bookingLink: null,
  bestTime: "Morning (quiet) or late afternoon",
  duration: "30–45 mins",
  rating: 4.5,
  facilities: ["Parking", "Guided visits available", "Restrooms nearby"],

  photos: [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/St.Aloysius_college%28Autonomous%29Mangalore.jpg",
      title: "St. Aloysius College"
    },
    {
      url: "https://www.joinpaperplanes.com/wp-content/uploads/2023/08/Murals-of-St-Aloysius-Chapel-%E2%80%94-Altar-1024x683.png",
      title: "St. Aloysius Chapel Fresco"
    },
    {
      url: "https://aloysiuscampus.com/images/institutions/1624356235.jpg",
      title: "Heritage Building"
    }
  ]
},
  {
    id: "kadri-manjunatha-temple",
    name: "Kadri Manjunatha Temple",
    type: "place",
    city: "Mangalore",
    tag: "SPIRITUAL",
    image: "/images/kadri_temple.jpg",
    coords: [12.9158, 74.8557],
    description:
      "Ancient hilltop temple famous for its bronze idols and serene surroundings.",
    openingHours: "05:00 AM – 09:00 PM",
    ticketPrice: "Free",
    bookingLink: null,
    bestTime: "Early morning prayers, festivals",
    duration: "30–60 mins",
    rating: 4.4,
    facilities: ["Prasadam stalls", "Parking", "Steps access"],
    photos: [unsplash("temple"), unsplash("temple steps"), unsplash("temple crowd")]
  },
  {
    id: "someshwara-beach-place",
    name: "Someshwara (Rock) Temple & Beach",
    type: "place",
    city: "Mangalore",
    tag: "HISTORICAL",
    image: "/images/someshwara.jpg",
    coords: [12.8367, 74.8459],
    description:
      "A scenic rocky beach with nearby ancient temple and dramatic rock formations.",
    openingHours: "24 hours (beach); Temple 06:00 AM – 06:00 PM",
    ticketPrice: "Free",
    bookingLink: null,
    bestTime: "Sunset & low tide",
    duration: "30–90 mins",
    rating: 4.3,
    facilities: ["Street food stalls nearby", "Parking", "No lifeguard"],
    photos: [unsplash("rocky beach"), unsplash("sunset beach"), unsplash("temple by sea")]
  },
  {
    id: "gommatabetta-karkala",
    name: "Gommatabetta (Karkala Gomateshwara)",
    type: "place",
    city: "Karkala (near Mangalore)",
    tag: "MONUMENT",
    image: "/images/gomata2.jpg",
    coords: [13.2038, 75.0056],
    description:
      "Home to the impressive monolithic Gommateshwara statue — a major pilgrimage and heritage site.",
    openingHours: "06:00 AM – 07:00 PM",
    ticketPrice: "Free",
    bookingLink: null,
    bestTime: "Early morning & festival days",
    duration: "45–90 mins",
    rating: 4.5,
    facilities: ["Parking", "Toilets", "Guides available on request"],
    photos: [unsplash("monolithic statue"), unsplash("pilgrimage site"), unsplash("heritage monument")],
      modelUrl: gomateshModel ,
  },
  {
    id: "chaturmukha-basadi",
    name: "Chaturmukha Basadi",
    type: "place",
    city: "Karkala",
    tag: "HERITAGE",
    image: "/images/chaturmuka.jpeg",
    coords: [13.2100, 75.0000], // Approx location near Gommatabetta
    description:
      "A symmetric Jain temple with four identical entrances leading to the sanctum. Built in the late 16th century, it is renowned for its architectural precision.",
    openingHours: "08:00 AM – 06:00 PM",
    ticketPrice: "Free",
    bookingLink: null,
    bestTime: "Morning or Evening",
    duration: "30–45 mins",
    rating: 4.6,
    facilities: ["Photography Allowed", "Architecture Guide"],
    photos: [unsplash("ancient temple"), unsplash("stone architecture"), unsplash("jain temple")],
    // ADDED 3D MODEL HERE
    modelUrl: chaturmukhaModel
  },
  {
    id: "st-marys-island",
    name: "St. Mary's Island (Malpe)",
    type: "place",
    city: "Udupi",
    tag: "NATURAL",
    image: "/images/st_marys_island.jpg",
    coords: [13.3522, 74.6860],
    description:
      "Famous for unique hexagonal basalt rock formations & clear waters. Accessible by boat from Malpe.",
    openingHours: "Boat services typically 08:00 AM – 04:00 PM (depends on operator)",
    ticketPrice: "Boat fare applies (~₹100–₹400 per person depending on season)",
    bookingLink: null,
    bestTime: "Morning for calm seas",
    duration: "2–4 hours (boat trip + island walk)",
    rating: 4.6,
    facilities: ["Boat kiosks in Malpe", "No food stalls on island", "Shade is limited"],
    photos: [unsplash("island rocks"), unsplash("basalt rocks"), unsplash("island boat")]
  },
  {
    id: "udupi-sri-krishna",
    name: "Sri Krishna Temple, Udupi",
    type: "place",
    city: "Udupi",
    tag: "SPIRITUAL",
    image: "/images/udupi_temple.jpg",
    coords: [13.3409, 74.7429],
    description:
      "Historic Krishna Matha founded by Madhvacharya — a central spiritual attraction in Udupi.",
    openingHours: "05:00 AM – 09:30 PM (varies for specific seva/times)",
    ticketPrice: "Free (donations)",
    bookingLink: null,
    bestTime: "Early morning / festival times",
    duration: "30–60 mins",
    rating: 4.7,
    facilities: ["Prasadam", "Darsan timings displayed", "Parking in nearby areas"],
    photos: [unsplash("krishna temple"), unsplash("hindu temple interior"), unsplash("prasad")]
  },
];

export const beachesData = [
  {
    id: "panambur-beach",
    name: "Panambur Beach",
    type: "beach",
    city: "Mangalore",
    tag: "POPULAR",
    image: "/images/panambur.jpg",
    coords: [12.9688, 74.8290],
    description:
      "One of Mangalore's most famous beaches — safe for family outings and water sports.",
    openingHours: "06:00 AM – 08:00 PM",
    ticketPrice: "Free; water sports paid separately",
    bookingLink: null,
    bestTime: "Early morning or late afternoon",
    duration: "1–3 hours",
    rating: 4.4,
    facilities: ["Lifeguards (seasonal)", "Food stalls", "Restrooms", "Water sports"],
    photos: [unsplash("beach panorama"), unsplash("beach water sports"), unsplash("beach family")]
  },
  {
    id: "tannirbhavi-beach",
    name: "Tannirbhavi Beach",
    type: "beach",
    city: "Mangalore",
    tag: "SUNSET",
    image: "/images/tannirbhavi.jpg",
    coords: [12.9008, 74.8466],
    description:
      "A long, wide beach with coconut groves and great sunset views — quieter than Panambur.",
    openingHours: "24 hours",
    ticketPrice: "Free",
    bookingLink: null,
    bestTime: "Sunset",
    duration: "1–2 hours",
    rating: 4.3,
    facilities: ["Parking", "Shaded areas", "Basic stalls nearby"],
    photos: [unsplash("sunset beach"), unsplash("beach palm trees"), unsplash("quiet beach")]
  },
  {
    id: "malpe-beach",
    name: "Malpe Beach",
    type: "beach",
    city: "Udupi",
    tag: "BOATING",
    image: "/images/malpe.jpg",
    coords: [13.3564, 74.6874],
    description:
      "Busy, scenic shoreline with boat trips to St Mary's Island and popular local seafood stalls.",
    openingHours: "06:00 AM – 08:00 PM",
    ticketPrice: "Free; boat charges extra",
    bookingLink: null,
    bestTime: "Morning/afternoon for boats",
    duration: "2–4 hours",
    rating: 4.4,
    facilities: ["Boat rides", "Seafood stalls", "Parking"],
    photos: [unsplash("boat beach"), unsplash("seafood beach"), unsplash("beach boats")]
  },
  {
    id: "kapu-beach",
    name: "Kapu (Kaup) Beach",
    type: "beach",
    city: "Udupi",
    tag: "LIGHTHOUSE",
    image: "/images/kapu.jpg",
    coords: [13.3210, 74.7496],
    description:
      "Known for its lighthouse, golden sands and quiet fishing-village vibe — great for pictures.",
    openingHours: "06:00 AM – 06:00 PM (lighthouse timings may vary)",
    ticketPrice: "Free",
    bookingLink: null,
    bestTime: "Sunrise & early morning",
    duration: "1–2 hours",
    rating: 4.2,
    facilities: ["Lighthouse (visit timings vary)", "Parking", "Photo spots"],
    photos: [unsplash("lighthouse beach"), unsplash("beach lighthouse"), unsplash("golden sand")]
  },
  {
    id: "mattu-beach",
    name: "Mattu Beach",
    type: "beach",
    city: "Udupi",
    tag: "SERENE",
    image: "/images/mattu.jpg",
    coords: [13.4130, 74.6730],
    description:
      "A peaceful beach with a small sandbank and nearby coconut groves — lesser crowded and photogenic.",
    openingHours: "06:00 AM – 06:00 PM",
    ticketPrice: "Free",
    bookingLink: null,
    bestTime: "Morning",
    duration: "1–2 hours",
    rating: 4.1,
    facilities: ["Quiet spot", "Limited stalls", "Easy walk to sandbank at low tide"],
    photos: [unsplash("quiet beach"), unsplash("beach sandbank"), unsplash("palm beach")]
  },
];

export const hotelsData = [
  {
    id: "vivanta-mangalore",
    name: "Vivanta Mangalore (Old Port Road)",
    type: "hotel",
    city: "Mangalore",
    tag: "5-star",
    image: "/images/vivanta_mangalore.jpg",
    coords: [12.9200, 74.8540],
    description:
      "Upscale hotel with modern amenities, popular for business and leisure travellers in Mangalore.",
    openingHours: "24 hours (check-in 2:00 PM, check-out 12:00 PM)",
    ticketPrice: "Rooms from ₹6,000/night (approx)",
    bookingLink: "https://www.tajhotels.com/en-in/vivanta/",
    bestTime: "All year (monsoon adds a scenic mood)",
    duration: "Overnight stay",
    rating: 4.4,
    facilities: ["Pool", "Restaurant", "Conference rooms", "Free Wi-Fi", "Parking"],
    photos: [unsplash("luxury hotel"), unsplash("hotel pool"), unsplash("hotel lobby")]
  },
  {
    id: "aj-grand-hotel",
    name: "AJ Grand Hotel",
    type: "hotel",
    city: "Mangalore",
    tag: "4-star",
    image: "/images/aj_grand.jpg",
    coords: [12.9166, 74.8550],
    description:
      "Comfortable mid-range hotel with good access to city attractions and transit.",
    openingHours: "24 hours (check-in 2:00 PM)",
    ticketPrice: "Rooms from ₹2,500/night (approx)",
    bookingLink: null,
    bestTime: "Business travel or short stays",
    duration: "Overnight stay",
    rating: 4.0,
    facilities: ["Restaurant", "Free Wi-Fi", "Parking"],
    photos: [unsplash("boutique hotel"), unsplash("hotel room"), unsplash("hotel breakfast")]
  },
  {
    id: "paradise-isle",
    name: "Paradise Isle Beach Resort (Malpe)",
    type: "hotel",
    city: "Udupi",
    tag: "Resort",
    image: "/images/paradise_isle.jpg",
    coords: [13.3559, 74.6790],
    description:
      "Beachfront resort near Malpe — convenient for St Mary's Island trips and family stays.",
    openingHours: "24 hours",
    ticketPrice: "Rooms from ₹4,500/night (approx)",
    bookingLink: null,
    bestTime: "Monsoon for green scenery or winter for clear skies",
    duration: "Overnight stay",
    rating: 4.2,
    facilities: ["Beach access", "Pool", "Family rooms", "Restaurant"],
    photos: [unsplash("beach resort"), unsplash("resort pool"), unsplash("beachfront resort")]
  },
  {
    id: "samanvay-boutique",
    name: "Samanvay Boutique Hotel (Udupi)",
    type: "hotel",
    city: "Udupi",
    tag: "Boutique",
    image: "/images/samanvay.jpg",
    coords: [13.3395, 74.7430],
    description:
      "Popular boutique option in Udupi with modern rooms and friendly service.",
    openingHours: "24 hours",
    ticketPrice: "Rooms from ₹2,000/night (approx)",
    bookingLink: null,
    bestTime: "Weekend getaways",
    duration: "Overnight stay",
    rating: 4.0,
    facilities: ["Free Wi-Fi", "Breakfast", "Parking"],
    photos: [unsplash("small hotel"), unsplash("hotel boutique room"), unsplash("hotel stylish")]
  },
  {
    id: "ocean-pearl",
    name: "The Ocean Pearl (Udupi/Mangalore area)",
    type: "hotel",
    city: "Udupi",
    tag: "Comfort",
    image: "/images/ocean_pearl.jpg",
    coords: [13.3370, 74.7410],
    description:
      "Reliable mid-range chain offering comfortable rooms close to Udupi's city centre.",
    openingHours: "24 hours",
    ticketPrice: "Rooms from ₹1,800/night (approx)",
    bookingLink: null,
    bestTime: "Budget stays",
    duration: "Overnight stay",
    rating: 3.9,
    facilities: ["Parking", "Restaurant", "AC rooms"],
    photos: [unsplash("comfort hotel"), unsplash("hotel corridor"), unsplash("city hotel")]
  },
];

export default {
  placesData,
  beachesData,
  hotelsData,
};
