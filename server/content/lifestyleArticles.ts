// Lifestyle / "Living in Kaba Kaba" content for OMA Townhouse.
//
// This module is the single source of truth for the lifestyle articles rendered
// in the "Living in Kaba Kaba" section. The tRPC `lifestyle.list` query returns
// this data directly when no database is configured (e.g. the Vercel deploy),
// and seeds it into MySQL when a database IS available. The content-automation
// routine in /automation appends new articles here.
//
// Writing rules (see automation/HUMANIZER.md): no em dashes, en dashes, curly
// quotes, emoji, or rule-of-three pile-ups. Distance ranges in prose use the
// word "to" (e.g. "25 to 30 minutes"); the hyphenated form is only used inside
// the venue chips. Yield / return claims are framed as ranges and never as
// guarantees.

export interface Venue {
  name: string;
  distance: string;
  coords: string;
  url?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LifestyleArticleSeed {
  slug: string;
  title: string;
  category: string;
  imageUrl: string | null;
  sortOrder: number;
  body: string; // HTML
  venues: Venue[];
  metaDescription?: string;
  faq?: FaqItem[];
  publishedAt?: string; // ISO date, used for sitemap lastmod / sorting
}

// OMA Townhouse coordinates, used for Google Maps directions links.
export const OMA_COORDS = "-8.576677,115.145663";

export const LIFESTYLE_ARTICLES: LifestyleArticleSeed[] = [
  {
    slug: "gyms-fitness",
    title: "Gyms and Fitness Near Kaba Kaba",
    category: "fitness",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/OZqFwqmLzpWwJFpW.webp",
    sortOrder: 1,
    metaDescription:
      "Gyms and fitness near Kaba Kaba, Bali: Reload Sanctuary, Omni Gym and The Block are a short drive from OMA Townhouse and Canggu.",
    body: `<p>One question buyers ask before going off-plan in Kaba Kaba is simple. Can you keep a serious training routine this far from Canggu? The answer is yes. <a href="https://www.instagram.com/reloadsanctuary/" data-external="true">Reload Sanctuary</a> in Canggu is a 6,000 sqm wellness complex with a full gym, rooftop performance zone, recovery spa and biohacking rooms, about 25 to 30 minutes from OMA.</p><p>Closer in, <a href="https://www.instagram.com/omnibali/" data-external="true">Omni Gym</a> in Pererenan is a 20 to 25 minute drive and a favourite among serious lifters. <a href="https://www.instagram.com/theblockbali/" data-external="true">The Block Bali</a> runs functional and CrossFit style sessions, and <a href="https://www.instagram.com/nirvanalifebali/" data-external="true">Nirvana Life</a> pairs training with longer wellness retreats.</p><p>For an off-plan investor this matters more than it looks. A location that supports the daily habits owners and tenants actually want is a location that rents. You trade the Canggu traffic for rice field views on the drive, and the gym is still there when you arrive.</p>`,
    venues: [
      { name: "Reload Sanctuary", distance: "25-30 min", coords: "-8.6478,115.1385", url: "https://www.instagram.com/reloadsanctuary/" },
      { name: "Omni Gym", distance: "20-25 min", coords: "-8.6395,115.1290", url: "https://www.instagram.com/omnibali/" },
      { name: "The Block Bali", distance: "20-25 min", coords: "-8.6410,115.1310", url: "https://www.instagram.com/theblockbali/" },
      { name: "Nirvana Life", distance: "25-30 min", coords: "-8.6550,115.1400", url: "https://www.instagram.com/nirvanalifebali/" },
    ],
    faq: [
      {
        question: "Are there good gyms near Kaba Kaba?",
        answer:
          "Yes. Omni Gym in Pererenan is 20 to 25 minutes away, and Canggu venues like Reload Sanctuary and The Block Bali are roughly 25 to 30 minutes from OMA Townhouse.",
      },
      {
        question: "How far is Kaba Kaba from Canggu?",
        answer:
          "About 25 minutes by car, which keeps Canggu gyms, cafes and beach clubs within easy reach while land prices stay well below Canggu levels.",
      },
    ],
  },
  {
    slug: "cafes-dining",
    title: "Cafes and Dining Around Kaba Kaba and Seseh",
    category: "dining",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/ABCQFXQbtcsZAkdh.webp",
    sortOrder: 2,
    metaDescription:
      "Cafes and restaurants near Kaba Kaba and Seseh, Bali, from Open House Seseh to Yuki Canggu, all a short drive from OMA Townhouse.",
    body: `<p>What is the food scene like if you buy off-plan near Kaba Kaba? Strong, and getting stronger. In Seseh, 15 to 20 minutes away, <a href="https://www.instagram.com/openhouseseseh/" data-external="true">Open House Seseh</a> has become the local favourite for rice field views and a slow morning. <a href="https://www.instagram.com/neighbourhoodseseh/" data-external="true">Neighbourhood Seseh</a> and <a href="https://www.instagram.com/thalassabali/" data-external="true">Thalassa</a> fill out the same stretch.</p><p>Toward Canggu, 25 to 30 minutes from OMA, <a href="https://www.instagram.com/yukicanggu/" data-external="true">Yuki Canggu</a> on Batu Bolong runs a 14 course omakase and a modern izakaya menu. <a href="https://www.instagram.com/chottomatto.bali/" data-external="true">Chotto Matto</a> handles ramen and Japanese street food, and <a href="https://www.instagram.com/cratecafebali/" data-external="true">Crate Cafe</a> remains a reliable work-and-coffee spot with meals from about 50k IDR.</p><p>For a rental owner the takeaway is practical. Guests want options within a short drive, and Kaba Kaba sits between the quiet Seseh cafes and the busier Canggu names without putting you in the middle of either crowd.</p>`,
    venues: [
      { name: "Yuki Canggu", distance: "25-30 min", coords: "-8.6510,115.1380", url: "https://www.instagram.com/yukicanggu/" },
      { name: "Chotto Matto", distance: "25-30 min", coords: "-8.6500,115.1370", url: "https://www.instagram.com/chottomatto.bali/" },
      { name: "Crate Cafe", distance: "25-30 min", coords: "-8.6490,115.1360", url: "https://www.instagram.com/cratecafebali/" },
      { name: "Open House Seseh", distance: "15-20 min", coords: "-8.6200,115.1250", url: "https://www.instagram.com/openhouseseseh/" },
      { name: "Neighbourhood Seseh", distance: "15-20 min", coords: "-8.6180,115.1240", url: "https://www.instagram.com/neighbourhoodseseh/" },
    ],
    faq: [
      {
        question: "Where are the best cafes near Kaba Kaba?",
        answer:
          "Open House Seseh and Neighbourhood Seseh are 15 to 20 minutes away, while Crate Cafe and the wider Canggu cafe scene sit around 25 to 30 minutes from OMA Townhouse.",
      },
    ],
  },
  {
    slug: "beach-clubs",
    title: "Beach Clubs Near Kaba Kaba, Minus the Traffic",
    category: "lifestyle",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/PDCHwUSBfHEidARn.webp",
    sortOrder: 3,
    metaDescription:
      "Beach clubs near Kaba Kaba, Bali: Luna Beach Club at Nuanu is 10 to 15 minutes from OMA Townhouse, with Finns, La Brisa and Atlas close by.",
    body: `<p>How close are the beach clubs if you invest off-plan in Kaba Kaba? Closer than most people expect. Your nearest is <a href="https://www.instagram.com/lunabeachclub/" data-external="true">Luna Beach Club</a> at Nuanu, 10 to 15 minutes from OMA, with sunset views and no Batu Bolong gridlock on the way.</p><p><a href="https://www.instagram.com/finnsbeachclub/" data-external="true">Finns Beach Club</a> sits 25 to 30 minutes away with its oceanfront pools and bars. <a href="https://www.instagram.com/labrisabali/" data-external="true">La Brisa</a> on Echo Beach, built from repurposed fishing boats, has some of the better sunsets on this coast. <a href="https://www.instagram.com/atlasbeachclub/" data-external="true">Atlas Beach Club</a>, one of the largest anywhere, is also within reach.</p><p>That mix is part of the off-plan case for the area. You hold an asset in a calm rice field village and still put owners and guests at a world ranked beach club inside fifteen minutes.</p>`,
    venues: [
      { name: "Luna Beach Club", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.instagram.com/lunabeachclub/" },
      { name: "Finns Beach Club", distance: "25-30 min", coords: "-8.6560,115.1350", url: "https://www.instagram.com/finnsbeachclub/" },
      { name: "La Brisa", distance: "25-30 min", coords: "-8.6530,115.1320", url: "https://www.instagram.com/labrisabali/" },
      { name: "Atlas Beach Club", distance: "30-35 min", coords: "-8.6600,115.1400", url: "https://www.instagram.com/atlasbeachclub/" },
    ],
    faq: [
      {
        question: "What is the closest beach club to OMA Townhouse?",
        answer:
          "Luna Beach Club at Nuanu, about 10 to 15 minutes away, with Finns, La Brisa and Atlas Beach Club reachable in 25 to 35 minutes.",
      },
    ],
  },
  {
    slug: "spas-wellness",
    title: "Wellness and Spas Within Reach of Kaba Kaba",
    category: "wellness",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/NAcHHeirtQpdYOqQ.webp",
    sortOrder: 4,
    metaDescription:
      "Spas and wellness near Kaba Kaba, Bali: Ulaman Retreat is minutes from OMA Townhouse, with Therapy, Udara and Canggu spas a short drive away.",
    body: `<p>Wellness is one of the quieter reasons people buy off-plan in this part of Tabanan. Right in the Kaba Kaba area, <a href="https://www.instagram.com/ulamanretreat/" data-external="true">Ulaman Retreat</a> is an eco-luxury resort that has put the village on the map for high-end travellers, 5 to 10 minutes from OMA.</p><p>In Pererenan, 20 to 25 minutes out, <a href="https://www.instagram.com/therapybali/" data-external="true">Therapy Day Spa</a> offers toxin-free treatments in a calm setting. <a href="https://www.instagram.com/goldustbali/" data-external="true">Goldust Spa</a> and <a href="https://www.instagram.com/amospabali/" data-external="true">AMO Spa</a> are long-running Canggu names. In Seseh, <a href="https://www.instagram.com/udarabali/" data-external="true">Udara Bali</a> combines yoga retreats with detox and spa services, and <a href="https://www.instagram.com/solacefloat/" data-external="true">Solace Float</a> covers float therapy.</p><p>For a rental property a nearby retreat like Ulaman does real work. It signals the kind of guest the area attracts and supports the nightly rates that make the yield case stand up.</p>`,
    venues: [
      { name: "Ulaman Retreat", distance: "5-10 min", coords: "-8.5800,115.1500", url: "https://www.instagram.com/ulamanretreat/" },
      { name: "Therapy Day Spa", distance: "20-25 min", coords: "-8.6380,115.1280", url: "https://www.instagram.com/therapybali/" },
      { name: "Udara Bali", distance: "15-20 min", coords: "-8.6150,115.1220", url: "https://www.instagram.com/udarabali/" },
      { name: "Goldust Spa", distance: "25-30 min", coords: "-8.6480,115.1350", url: "https://www.instagram.com/goldustbali/" },
    ],
    faq: [
      {
        question: "Is there a wellness retreat near Kaba Kaba?",
        answer:
          "Yes. Ulaman Retreat, an eco-luxury wellness resort, is 5 to 10 minutes from OMA Townhouse, with more spas in Seseh and Canggu within 25 minutes.",
      },
    ],
  },
  {
    slug: "local-community",
    title: "Living in Kaba Kaba and the Local Scene",
    category: "community",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/wMIMhbjKOmFFjkpP.webp",
    sortOrder: 5,
    metaDescription:
      "Living in Kaba Kaba, Bali: a real village community near Canggu, anchored by Kaba Kaba Social and Ulaman, with modern amenities a short drive away.",
    body: `<p>What is it actually like to live in Kaba Kaba? The draw is not only what sits nearby, it is the village itself. <a href="https://www.instagram.com/kabakaba.social/" data-external="true">Kaba Kaba Social</a> is the local hub where residents and expats mix in a way the bigger areas no longer manage.</p><p><a href="https://www.instagram.com/ulamanretreat/" data-external="true">Ulaman Resort</a> brings international wellness travellers through, which keeps the area grounded but outward looking. Balinese ceremonies, temple festivals and a real sense of neighbourhood are still part of daily life here.</p><p>People often describe this as the Canggu of about ten years ago, before the crowds and the price jumps, except you now get modern amenities a short drive away. For an off-plan buyer, the gap between today's land price and the direction the area is heading is the whole point.</p>`,
    venues: [
      { name: "Kaba Kaba Social", distance: "2-5 min", coords: "-8.5780,115.1480", url: "https://www.instagram.com/kabakaba.social/" },
      { name: "Ulaman Resort", distance: "5-10 min", coords: "-8.5800,115.1500", url: "https://www.instagram.com/ulamanretreat/" },
    ],
    faq: [
      {
        question: "What is the community like in Kaba Kaba?",
        answer:
          "A genuine Balinese village with active ceremonies and a local social scene, plus an international crowd drawn by Ulaman, all about 25 minutes from Canggu.",
      },
    ],
  },
  {
    slug: "hotels-development",
    title: "Why Tabanan and Kaba Kaba Are Drawing Investment",
    category: "development",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/RFpzOLCapYdEXOzx.webp",
    sortOrder: 6,
    metaDescription:
      "Tabanan and Kaba Kaba are drawing investment: Alila Hotels, the 44 hectare Nuanu Creative City and quality-tourism policy are reshaping the area.",
    body: `<p>Why buy off-plan in Tabanan rather than a finished villa in Canggu? Look at who is moving in. <a href="https://www.instagram.com/alilahotels/" data-external="true">Alila Hotels</a> is opening in the Tabanan area, and when established luxury operators commit, land values tend to follow.</p><p><a href="https://www.nuanu.com" data-external="true">Nuanu Creative City</a> is a 44 hectare development 10 to 15 minutes from OMA, bringing coworking, international schools, wellness venues and <a href="https://www.instagram.com/lunabeachclub/" data-external="true">Luna Beach Club</a> to the doorstep. That is a large, funded build happening next door rather than a forecast on a brochure.</p><p>The Tabanan government is promoting quality tourism, meaning higher-end, lower-density development that protects the landscape. Early Canggu buyers saw their land multiply over the cycle, and off-plan pricing in Kaba Kaba is positioned against that same pattern today. None of this is a guarantee, so treat the figures as ranges and not as financial advice, but the direction of travel is hard to miss.</p>`,
    venues: [
      { name: "Nuanu Creative City", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
      { name: "Alila (coming soon)", distance: "15-20 min", coords: "-8.5900,115.1200", url: "https://www.instagram.com/alilahotels/" },
    ],
    faq: [
      {
        question: "Is Kaba Kaba a good place to invest in Bali?",
        answer:
          "The area sits beside the 44 hectare Nuanu development and incoming hotel brands like Alila, with land priced well below Canggu. Returns are never guaranteed, so treat any projection as a range.",
      },
      {
        question: "What is Nuanu Creative City?",
        answer:
          "A 44 hectare development 10 to 15 minutes from OMA Townhouse with international schools, coworking, wellness venues and Luna Beach Club.",
      },
    ],
  },
  {
    slug: "schools-family",
    title: "Schools and Healthcare Near Kaba Kaba for Families",
    category: "family",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/LQcTfcrQovcgmBPl.webp",
    sortOrder: 7,
    metaDescription:
      "Schools and healthcare near Kaba Kaba, Bali: Grow International and ProEd at Nuanu plus Tabanan hospitals, all a short drive from OMA Townhouse.",
    body: `<p>Can you relocate to Kaba Kaba with a family and still cover school and healthcare? Yes, and it is better connected than the location suggests. <a href="https://growinkedungu.com/" data-external="true">Grow International School</a> in Kedungu is about 10 minutes away and runs a Cambridge curriculum with a shuttle. <a href="https://www.nuanu.com" data-external="true">ProEd Global School at Nuanu</a> gives a second international option right next door.</p><p>For healthcare, Kasih Ibu Hospital in Tabanan is 15 to 20 minutes out for everyday needs. <a href="https://www.bfriendhospital.com/" data-external="true">BFriend Hospital</a> and <a href="https://www.siloamhospitals.com/" data-external="true">Siloam Hospital</a> handle more specialised care 30 to 40 minutes away.</p><p>For a buyer weighing an off-plan home as a place to actually live, that combination of schooling, hospitals and a safe village setting is what makes Kaba Kaba workable for families rather than only for investors.</p>`,
    venues: [
      { name: "Grow International School", distance: "10 min", coords: "-8.5900,115.1150", url: "https://growinkedungu.com/" },
      { name: "Nuanu / ProEd", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
      { name: "Kasih Ibu Hospital", distance: "15-20 min", coords: "-8.5400,115.1700", url: "https://maps.google.com/?q=Kasih+Ibu+Hospital+Tabanan" },
    ],
    faq: [
      {
        question: "Are there international schools near Kaba Kaba?",
        answer:
          "Yes. Grow International School in Kedungu is about 10 minutes away, and ProEd Global School at Nuanu is 10 to 15 minutes from OMA Townhouse.",
      },
    ],
  },
];
