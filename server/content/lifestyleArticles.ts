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

export interface GalleryImage {
  url: string; // served from client/public/blog/* or an absolute URL
  alt?: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
}

export interface Citation {
  label: string;
  url: string;
}

export type LayoutVariant = "standard" | "gallery" | "map" | "qa";

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

  // Blog / Insights fields. All optional and additive: existing articles stay
  // valid, and the prerendered /blog/:slug page fills sensible defaults (hero
  // and gallery by category, layout variant by slug hash) when these are unset.
  isInsight?: boolean; // surfaced in the homepage Insights row
  heroImage?: string; // hero image for the blog page
  gallery?: GalleryImage[]; // relevant, topic-specific images
  citations?: Citation[]; // Tier 1 / Tier 2 sources, shown as "Sources"
  showMap?: boolean; // embed a map of the area on the blog page
  mapCoords?: string; // "lat,lng" centre for the embedded map
  layoutVariant?: LayoutVariant; // overrides the slug-hash default
  readingTime?: number; // minutes; estimated from body when unset
  author?: string;
  updatedAt?: string; // ISO date, defaults to publishedAt
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
    imageUrl: "/blog/nuanu-creative-city.jpg",
    sortOrder: 6,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-01-20",
    gallery: [
      { url: "/blog/luna-beach-club.jpg", alt: "Luna Beach Club at Nuanu Creative City near Kaba Kaba" },
      { url: "/blog/tabanan-villa-construction.webp", alt: "New villa development underway near Kaba Kaba, Tabanan" },
    ],
    citations: [
      { label: "Nuanu Creative City (official site)", url: "https://www.nuanu.com" },
      { label: "Alila Hotels by Hyatt", url: "https://www.hyatt.com/brands/alila" },
    ],
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
  {
    slug: "foreigners-buy-property-bali",
    title: "Can US and Dubai Investors Buy Property in Bali?",
    category: "investment",
    imageUrl: "/blog/bali-villa-tropical-pool.webp",
    sortOrder: 8,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-02-03",
    layoutVariant: "qa",
    metaDescription:
      "Can US and Dubai investors buy property in Bali? Yes, through leasehold, Hak Pakai or a PT PMA company. Here is how each route works for foreign buyers.",
    body: `<p>Yes, foreigners can invest in Bali property, including buyers from the United States and the United Arab Emirates. What changes is the structure, not the eligibility. Indonesian law does not let a foreign individual hold freehold (Hak Milik) land title, so overseas buyers use one of a few established routes instead.</p><p>The first is leasehold, where you hold the right to use a property for a fixed term, commonly 25 or 40 years, often with an agreed extension. The entry price is lower and the paperwork is simpler, which is why many first-time buyers start here. OMA Townhouse offers 25 and 40 year leasehold on this basis.</p><p>The second is Hak Pakai, a right-to-use title available to a foreigner who holds an Indonesian residence permit such as a KITAS or KITAP. The third is a foreign-owned company, a <a href="https://oss.go.id" data-external="true">PT PMA</a>, which can hold Hak Guna Bangunan, the right to build and use the land. A PT PMA is the route most buyers take when they want freehold-style control and the ability to run the property as a rental business. OMA offers freehold through this structure.</p><p>For a US citizen or a Dubai-based investor, the practical point is that your nationality does not block any of these. You work within the same framework as every other foreign buyer. Money you transfer into Indonesia is reported through the banking system, so keep clean records of the funds you bring in.</p><p>This is general information and not legal or tax advice. Permit categories and rules change, so confirm the current position with a licensed Indonesian notary (PPAT) and the OMA Townhouse team before you commit.</p>`,
    venues: [],
    citations: [
      { label: "Indonesia Investment Coordinating Board (BKPM)", url: "https://www.bkpm.go.id" },
      { label: "Online Single Submission (OSS) company portal", url: "https://oss.go.id" },
    ],
    gallery: [
      { url: "/blog/property-contract-signing.webp", alt: "Signing a Bali property purchase agreement" },
      { url: "/blog/bali-villa-aerial-pool.webp", alt: "Aerial view of a Bali villa and private pool" },
    ],
    faq: [
      {
        question: "Can a US citizen buy property in Bali?",
        answer:
          "Yes. US citizens use the same routes as other foreigners: leasehold for a fixed term, Hak Pakai with an Indonesian residence permit, or a PT PMA company for freehold-style ownership.",
      },
      {
        question: "Can foreigners own freehold land in Bali?",
        answer:
          "Not as individuals. Freehold (Hak Milik) is reserved for Indonesian citizens. Foreigners reach freehold-style control through a PT PMA company that holds Hak Guna Bangunan.",
      },
      {
        question: "Do I need to live in Bali to buy?",
        answer:
          "No. The leasehold and PT PMA routes do not require residency. Hak Pakai does require an Indonesian residence permit such as a KITAS or KITAP.",
      },
    ],
  },
  {
    slug: "bali-vs-dubai-property",
    title: "Bali vs Dubai Property for Foreign Investors",
    category: "investment",
    imageUrl: "/blog/dubai-skyline-day.webp",
    sortOrder: 9,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-02-17",
    metaDescription:
      "Bali vs Dubai property for foreign investors: Dubai allows direct freehold, Bali uses leasehold or a PT PMA company. Compare ownership, entry price and tax.",
    body: `<p>For a foreign investor choosing between Bali and Dubai, the clearest difference is ownership. In Dubai you can buy freehold as a foreigner in designated freehold zones, a right set out in the emirate's 2002 property reforms, and hold the title in your own name. In Bali you cannot hold freehold as an individual. You use leasehold, a Hak Pakai right-to-use title, or a PT PMA company, the same routes covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>.</p><p>Entry price is the next split. Dubai's established freehold districts tend to start higher in absolute terms. Emerging Bali areas such as Tabanan sit lower, which is part of the off-plan case. At OMA Townhouse, leasehold starts at 115,000 USD and freehold via PT PMA at 265,000 USD, and land in this area runs well below Canggu prices.</p><p>Both markets draw international rental demand, so the question is less about which is busier and more about where your capital fits. Rental yields move with season, management quality and location, so treat any figure you read as a range rather than a promise.</p><p>Tax also differs. The UAE has no personal income tax, while Indonesia taxes rental income, so a Bali rental needs that built into the numbers. A Dubai buyer used to tax-free rental should plan for it rather than be caught out by it.</p><p>Neither market is universally better. Dubai offers direct freehold and a tax-light setup. Bali offers a lower entry point and a different lifestyle, with ownership handled through leasehold or a company. This is general information, not financial, legal or tax advice, so confirm current rules and pricing with a qualified adviser and the OMA Townhouse team.</p>`,
    venues: [],
    citations: [
      { label: "Dubai Land Department", url: "https://dubailand.gov.ae" },
      { label: "Indonesia Investment Coordinating Board (BKPM)", url: "https://www.bkpm.go.id" },
    ],
    gallery: [
      { url: "/blog/bali-villa-garden-pool.webp", alt: "Bali villa with a garden and private pool" },
      { url: "/blog/dubai-skyline-sunset.webp", alt: "Dubai skyline and Burj Khalifa at sunset" },
    ],
    faq: [
      {
        question: "Is Bali or Dubai better for property investment?",
        answer:
          "Neither is universally better. Dubai allows direct foreign freehold and has no personal income tax. Bali has a lower entry point but uses leasehold or a PT PMA company and taxes rental income. The right choice depends on your budget and goals.",
      },
      {
        question: "Can foreigners own freehold in Dubai but not Bali?",
        answer:
          "Yes. Dubai lets foreigners own freehold in designated zones. Indonesia reserves freehold for citizens, so foreign buyers in Bali use leasehold, Hak Pakai or a PT PMA company.",
      },
      {
        question: "Are Bali rental yields higher than in Dubai?",
        answer:
          "Yields in both markets vary with location, season and management, so treat any single figure as a range. This is not financial advice.",
      },
    ],
  },
  {
    slug: "tax-for-foreign-property-owners-bali",
    title: "Bali Rental Income Tax for Foreign Owners",
    category: "investment",
    imageUrl: "/blog/tax-prep-checklist.webp",
    sortOrder: 10,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-22",
    layoutVariant: "qa",
    metaDescription:
      "How is a Bali rental taxed for a foreign owner? Non-residents face 20 percent PPh 26 on gross rent. A PT PMA pays 22 percent corporate tax on net profit.",
    body: `<p>What tax do foreign property owners pay on a Bali rental? Two main lines apply. If you hold the villa in your own name as a non-resident, Indonesia withholds 20 percent of the gross rent under Article 26 of the income tax law, known as PPh 26. If you hold the property through a PT PMA company instead, the company pays 22 percent corporate income tax on net profit and you take the cash out as a dividend.</p><p>If you become an Indonesian tax resident, by spending 183 days or more in any 12 month period, the rule shifts to <a href="https://www.pajak.go.id/en/node/34297" data-external="true">PPh Pasal 4 ayat 2</a>, a 10 percent final tax on the gross rent from land and buildings. The legal basis is Government Regulation 34/2017.</p><p>Short-term holiday rental also pulls in a local tax, PHR, charged by the regency at up to 10 percent of accommodation revenue. The annual property tax, PBB (Pajak Bumi dan Bangunan), is set as a small percent of the government-assessed value, known as the NJOP. Rates vary by regency and generally sit in a 0.1 to 0.5 percent band on the taxable base. The Directorate General of Taxes covers the framework on its <a href="https://www.pajak.go.id/en/node/57517" data-external="true">PBB page</a>.</p><p>Repatriating rental income from Indonesia is routine when the paperwork is clean. PT PMA dividends paid to a foreign shareholder carry a 20 percent withholding tax under PPh 26, often reduced under a treaty if you provide a Certificate of Domicile. The company must also file quarterly LKPM reports to BKPM as a condition of operating and remitting profit. For a US owner the cleared funds land in your home account in USD. For a Dubai-based owner the UAE does not tax personal income, so once the Indonesian side is settled the receipt is clean.</p><p>One practical comparison. A Dubai freehold throws off rent in your own name with no local income tax. A Bali villa pays Indonesian tax first, then the after-tax cash comes home. None of this is tax advice, so confirm your position with a qualified Indonesian tax adviser and the OMA Townhouse team before you commit. The same routes are covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>.</p>`,
    venues: [],
    citations: [
      { label: "Directorate General of Taxes: PPh Pasal 4 ayat 2 (rental of land and buildings)", url: "https://www.pajak.go.id/en/node/34297" },
      { label: "Directorate General of Taxes: Pajak Bumi dan Bangunan (PBB)", url: "https://www.pajak.go.id/en/node/57517" },
      { label: "PwC Worldwide Tax Summaries: Indonesia individual income", url: "https://taxsummaries.pwc.com/indonesia/individual/income-determination" },
      { label: "ILA Global Consulting: real estate tax in Indonesia", url: "https://ilaglobalconsulting.com/real-estate-tax-indonesia/" },
    ],
    gallery: [
      { url: "/blog/tax-form-calculator.webp", alt: "Income tax form with a calculator" },
      { url: "/blog/bali-villa-loungers.webp", alt: "Bali rental villa with poolside loungers" },
    ],
    faq: [
      {
        question: "How is rental income taxed for foreigners in Indonesia?",
        answer:
          "Non-residents face a 20 percent withholding tax on gross rent under Article 26 (PPh 26). Indonesian tax residents pay a 10 percent final tax on gross rent from land and buildings under PPh Pasal 4 ayat 2. A PT PMA holds the asset as a company and pays 22 percent corporate income tax on net profit instead.",
      },
      {
        question: "Can a US or UAE owner repatriate Bali rental income?",
        answer:
          "Yes. PT PMA profits and dividends can be transferred abroad once Indonesian tax is settled and quarterly LKPM reports are filed with BKPM. Dividends to a foreign shareholder carry a 20 percent withholding tax, sometimes reduced under a tax treaty if a Certificate of Domicile is provided.",
      },
      {
        question: "Is there annual property tax (PBB) in Bali?",
        answer:
          "Yes. PBB (Pajak Bumi dan Bangunan) is the annual land and building tax. Rates depend on the regency and the government-assessed value (NJOP), generally falling in a 0.1 to 0.5 percent band on the taxable base.",
      },
    ],
  },
  {
    slug: "buy-bali-off-plan-property-remotely",
    title: "How to Buy Bali Off-Plan Property Remotely",
    category: "investment",
    imageUrl: "/blog/house-under-construction.webp",
    sortOrder: 11,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-23",
    layoutVariant: "qa",
    metaDescription:
      "How to buy Bali off-plan property remotely from the US or Dubai. Power of attorney, PPJB and AJB, notary (PPAT), and the rupiah transfer rule explained.",
    body: `<p>Yes, you can buy Bali off-plan property remotely from the US or Dubai. Most foreign buyers sign through a notarised Power of Attorney filed with an Indonesian notary, and never need to fly in before closing. The notary, a PPAT, handles title verification at the National Land Agency (BPN) on your behalf.</p><p>Indonesia joined the Hague Apostille Convention on 4 June 2022, which replaced the older embassy legalisation chain with a single apostille from your home country. In the US that is the state Secretary of State; the UAE issues apostilles through its Ministry of Foreign Affairs. The Indonesian notary drafts your Power of Attorney, you sign and notarise it at home, you apostille it, then you courier it to Bali. Articles 1792 to 1819 of the Indonesian Civil Code (KUHPerdata) cover proxy signing, so your appointed attorney can execute the deeds for you.</p><p>The paperwork follows a known order. A Letter of Intent reserves the unit against a deposit, usually around 10 percent. The PPJB (Perjanjian Pengikatan Jual Beli) is the binding pre-sale agreement that locks in price, payment schedule and delivery date during the build. The notarial deed, AJB for freehold or a lease deed for leasehold, completes the transfer once the unit is delivered and the title is ready to register at <a href="https://www.atrbpn.go.id" data-external="true">BPN</a>. Only a licensed PPAT can register title in Indonesia, so both deeds are signed before one.</p><p>Money is the part that catches most first-time foreign buyers. <a href="https://www.abnrlaw.com/news/regulation-on-mandatory-use-of-rupiah-and-prohibition-of-dual-price-denomination" data-external="true">Bank Indonesia Regulation 17/3/PBI/2015</a> requires domestic property transactions to be denominated and settled in rupiah, so wires from your home bank in USD or AED convert to IDR on arrival. Off-plan payments usually stage 10 to 20 percent at signing, then milestone payments at foundation, roof and handover. Third-party escrow is available at around 1 to 2 percent of the deal and is worth using; Indonesian law does not mandate it, so favour a developer with a track record and a payment schedule tied to construction milestones.</p><p>For a US buyer, transfers above 25,000 USD per month into rupiah need underlying-transaction documents at the receiving bank, so keep your PPJB, invoices and POA on hand. A Dubai-based buyer has no UAE-side exchange control to worry about. This is general information and not legal, tax or financial advice; confirm the current rules with a licensed Indonesian notary before you commit. Ownership routes are covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>, and tax in our <a href="/blog/tax-for-foreign-property-owners-bali">rental income tax guide</a>.</p>`,
    venues: [],
    citations: [
      { label: "Ministry of Law and Human Rights: Indonesia Apostille service", url: "https://apostille.ahu.go.id" },
      { label: "Bank Indonesia Regulation 17/3/PBI/2015 (Mandatory Use of Rupiah)", url: "https://peraturan.bpk.go.id/Details/135519/peraturan-bi-no-173pbi2015-tahun-2015" },
      { label: "ABNR Counsellors at Law: Mandatory Use of Rupiah and Dual Price Denomination", url: "https://www.abnrlaw.com/news/regulation-on-mandatory-use-of-rupiah-and-prohibition-of-dual-price-denomination" },
      { label: "Conventus Law: Apostille Convention In Full Effect In Indonesia", url: "https://conventuslaw.com/report/apostille-convention-finally-in-full-effect-in-indonesia/" },
    ],
    gallery: [
      { url: "/blog/buyer-remote-laptop.webp", alt: "Foreign buyer reviewing property documents on a laptop" },
      { url: "/blog/architectural-floor-plan.webp", alt: "Architectural floor plan of an off-plan villa" },
    ],
    faq: [
      {
        question: "Do you need to fly to Bali to buy off-plan?",
        answer:
          "No. Most foreign buyers sign through a notarised Power of Attorney filed with an Indonesian notary (PPAT). Since Indonesia joined the Hague Apostille Convention on 4 June 2022, a single apostille from your home country replaces the older embassy legalisation chain.",
      },
      {
        question: "How do due diligence and notary (PPAT) steps work remotely?",
        answer:
          "A licensed Indonesian notary (PPAT) verifies the title at the National Land Agency (BPN), drafts the PPJB pre-sale agreement, and later executes the AJB or lease deed. Your appointed attorney signs on your behalf under your apostilled Power of Attorney, then the PPAT submits the deed to BPN for registration.",
      },
      {
        question: "How are off-plan payments transferred internationally?",
        answer:
          "You wire USD or AED from your home bank. The funds convert to IDR on arrival because Bank Indonesia Regulation 17/3/PBI/2015 requires domestic property transactions to settle in rupiah. Payments typically stage 10 to 20 percent at signing, then at foundation, roof and handover.",
      },
    ],
  },
  {
    slug: "is-bali-off-plan-a-good-investment-2026",
    title: "Is Bali Off-Plan a Good Investment in 2026?",
    category: "investment",
    imageUrl: "/blog/off-plan-construction.webp",
    sortOrder: 12,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-24",
    layoutVariant: "qa",
    metaDescription:
      "Is Bali off-plan property a good investment for foreigners in 2026? Yields, the new Tabanan land conversion rule, and how Bali stacks up against US benchmarks.",
    body: `<p>Bali off-plan property can be a sound investment for a foreign buyer in 2026, but the answer turns on the ownership structure and where you buy. The market split is now clear. Professionally managed villas in supply-constrained pockets are holding occupancy, while oversupplied corridors like central Canggu have compressed on nightly rate. Off-plan in an emerging area such as Tabanan is where the lower land basis still leaves room to grow.</p><p>On yields, place numbers in context. <a href="https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel" data-external="true">Colliers</a> puts Bali gross villa yields in roughly a 4.4 to 6.9 percent band, with managed luxury operators reporting higher net figures once season and management quality are accounted for. Treat any figure as a range. By comparison, US residential gross yields averaged about 6.56 percent in late 2025 according to the <a href="https://www.globalpropertyguide.com/north-america/united-states/rental-yields" data-external="true">Global Property Guide</a>, and <a href="https://www.attomdata.com/news/market-trends/single-family-rental/2026-single-family-rental-market-report/" data-external="true">ATTOM's 2026 read</a> shows single-family rental yields falling in roughly 55 percent of US counties.</p><p>The bigger 2026 shift is regulatory. Bali Governor's Instruction Number 5 of 2025, in force from 2 December 2025, prohibits the conversion of productive rice fields to tourism use across six regencies that include Tabanan. <a href="https://thebalisun.com/balancing-land-conversion-and-tourism-development-to-be-key-focus-for-bali-in-2026/" data-external="true">The Bali Sun</a> walks through the policy, and <a href="https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" data-external="true">Emerhub</a> covers the legal teeth, including penalties under Law 41 of 2009. Projects already licensed on non-agricultural land continue. For an off-plan buyer on a permitted, non-rice-paddy site, the practical effect is a cap on future competing supply that over time supports rate and resale.</p><p>Demand is still moving. Bali drew 6.94 million foreign visitors in 2025 and the provincial 2026 target is 6.63 million, per the plan covered by <a href="https://jakartaglobe.id/lifestyle/bali-targets-66-million-international-visitors-in-2026" data-external="true">Jakarta Globe</a>. A villa in Tabanan within 25 to 30 minutes of Canggu rents on the spillover of the busier corridor while you carry the lower land basis.</p><p>Risks are real. Off-plan delivery can slip, and the 2024 to 2025 villa oversupply has pressured nightly rate on weaker product. Mitigate by picking a developer with a track record. Tie the payment schedule to construction milestones, and check that the title sits on properly zoned, non-agricultural land before you sign. Foreigners hold through leasehold, Hak Pakai or a PT PMA company, as covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>; rental income is then taxed under the rules in our <a href="/blog/tax-for-foreign-property-owners-bali">rental income tax guide</a>. This is general information and not financial, legal or tax advice. Confirm the specifics with a qualified Indonesian notary and the OMA Townhouse team before you commit.</p>`,
    venues: [],
    citations: [
      { label: "Colliers Quarterly Property Market Report Q1 2026 Bali Hotel", url: "https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel" },
      { label: "Global Property Guide: United States residential rental yields", url: "https://www.globalpropertyguide.com/north-america/united-states/rental-yields" },
      { label: "ATTOM Data: 2026 Single-Family Rental Market Report", url: "https://www.attomdata.com/news/market-trends/single-family-rental/2026-single-family-rental-market-report/" },
      { label: "The Bali Sun: Balancing Land Conversion and Tourism Development in 2026", url: "https://thebalisun.com/balancing-land-conversion-and-tourism-development-to-be-key-focus-for-bali-in-2026/" },
      { label: "Emerhub: Bali Criminalizes Rice Field Conversions", url: "https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" },
      { label: "Jakarta Globe: Bali Targets 6.6 Million International Visitors in 2026", url: "https://jakartaglobe.id/lifestyle/bali-targets-66-million-international-visitors-in-2026" },
    ],
    gallery: [
      { url: "/blog/bali-villa-white-pool.webp", alt: "Modern Bali villa with a private pool" },
      { url: "/blog/blueprint-compass.webp", alt: "Architectural blueprint with a drafting compass" },
    ],
    faq: [
      {
        question: "What are the risks for a foreign off-plan buyer in Bali?",
        answer:
          "The main risks are delivery delays, title or zoning issues, and rate compression in oversupplied micro-markets. Mitigate by choosing a developer with a track record, a payment schedule tied to construction milestones, and a clean non-agricultural title that complies with Bali Governor's Instruction Number 5 of 2025.",
      },
      {
        question: "How do Bali yields compare to US rental markets?",
        answer:
          "Independent trackers put Bali gross villa yields in roughly a 4 to 7 percent band, with managed luxury operators reporting higher net figures. US residential gross yields averaged about 6.56 percent in late 2025 according to the Global Property Guide, and ATTOM's 2026 read shows single-family yields falling in roughly 55 percent of US counties. Treat any figure as a range, not a promise.",
      },
      {
        question: "What protects an off-plan buyer if the build slips?",
        answer:
          "Most protection sits in the PPJB, the binding pre-sale agreement, which fixes price, payment schedule and delivery date and sets penalties for late delivery. Stage payments against construction milestones and consider third-party escrow at around 1 to 2 percent of the deal. This is general information, not legal advice.",
      },
    ],
  },
  {
    slug: "freehold-vs-leasehold-bali",
    title: "Freehold vs Leasehold in Bali for Foreign Buyers",
    category: "investment",
    imageUrl: "/blog/property-contract-signature.webp",
    sortOrder: 13,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-25",
    layoutVariant: "qa",
    metaDescription:
      "Freehold vs leasehold in Bali for a foreign buyer: PT PMA holds HGB for up to 80 years, leasehold runs 25 to 30 years per term with negotiated extension.",
    body: `<p>For a foreign buyer in Bali, freehold and leasehold are not what they would be in the US or the UAE. Indonesian law reserves freehold, called Hak Milik, for Indonesian citizens only under Article 21(1) of the 1960 Basic Agrarian Law, so a foreign individual cannot hold it. The two routes that actually work for a foreign buyer are a PT PMA, an Indonesian company you own that holds <a href="https://www.aseanbriefing.com/news/indonesias-omnibus-law-relaxed-foreign-ownership-laws-on-real-estate/" data-external="true">Hak Guna Bangunan (HGB)</a> on the land, and leasehold (Hak Sewa), where you hold the right to use a property for a fixed term.</p><p>The PT PMA freehold route gives the strongest claim a foreigner can hold in Bali. Under Government Regulation 18 of 2021, HGB is granted for an initial 30 years, extendable for 20 years, then renewable for another 30 years, for up to 80 years. The asset belongs to the company, so on exit you can transfer the property out of the PT PMA or sell the company shares. Setup is heavier: <a href="https://www.cekindo.com/blog/minimum-capital-investment-in-indonesia" data-external="true">BKPM Regulation 5 of 2025</a> lowered the minimum paid-up capital to IDR 2.5 billion, around 150,000 USD, with a 10 billion IDR total investment plan per business code still required.</p><p>Leasehold is the simpler entry. Any foreigner can sign a Hak Sewa without an Indonesian residence permit and without forming a company. Bali leases commonly run 25 to 30 years per agreement, and an extension clause is usually negotiated up front to push the effective term toward 70 to 80 years. There is no statutory cap on lease length in Indonesian law, but many notaries decline to draft a single-term lease beyond 30 years. At OMA Townhouse, leasehold runs at 25 or 40 years with extension built in, and freehold via PT PMA is offered as a separate price band.</p><p>Which fits depends on your goal. A long-hold rental you intend to pass on tends to fit the PT PMA freehold route. A second home with a clean exit and a lower entry price tends to fit leasehold. Hak Pakai, a right-to-use title held in your own name, sits between the two and needs a KITAS or KITAP residence permit. Ownership routes are also covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>. This is general information, not legal advice, so confirm the current rules with a licensed Indonesian notary (PPAT) and the OMA Townhouse team before you commit.</p>`,
    venues: [],
    citations: [
      { label: "Indonesia Basic Agrarian Law (UU No. 5 of 1960)", url: "https://faolex.fao.org/docs/pdf/ins3920.pdf" },
      { label: "ASEAN Briefing: Indonesia's Omnibus Law on Real Estate Ownership", url: "https://www.aseanbriefing.com/news/indonesias-omnibus-law-relaxed-foreign-ownership-laws-on-real-estate/" },
      { label: "Cekindo: PT PMA Minimum Capital in Indonesia (2026)", url: "https://www.cekindo.com/blog/minimum-capital-investment-in-indonesia" },
      { label: "Emerhub: Investing in Leasehold vs Freehold Properties in Bali", url: "https://emerhub.com/bali/understanding-investing-in-leasehold-vs-freehold-properties-in-bali/" },
    ],
    gallery: [
      { url: "/blog/bali-villa-aframe.webp", alt: "A-frame Bali villa with a private pool" },
      { url: "/blog/lease-document-signing.webp", alt: "Signing a Bali leasehold agreement" },
    ],
    faq: [
      {
        question: "Which is better for a US or UAE buyer, leasehold or PT PMA?",
        answer:
          "There is no single answer. A US or UAE buyer who wants a long-hold rental run as a business tends to take the PT PMA freehold route, since HGB runs up to 80 years and the asset transfers via company shares on exit. A buyer who wants a simpler entry, lower setup cost and no Indonesian company tends to take leasehold. This is general information, not legal or financial advice.",
      },
      {
        question: "How long are Bali leaseholds and can they be extended?",
        answer:
          "Bali leases commonly run 25 to 30 years per single agreement. Most contracts include an extension clause that pushes the effective term toward 70 to 80 years. There is no statutory cap in Indonesian law, but many notaries decline to draft a single-term lease beyond 30 years.",
      },
      {
        question: "What happens to a leasehold at the end of the term?",
        answer:
          "Without an exercised extension, the land and any built improvements revert to the landowner at the end of the lease term. That is why the extension mechanism, the renewal price and the dispute clauses in the original Hak Sewa agreement matter as much as the headline length.",
      },
    ],
  },
  {
    slug: "what-is-off-plan-property-bali",
    title: "What Is Off-Plan Property in Bali?",
    category: "investment",
    imageUrl: "/blog/blog-nuanu-creative.webp",
    sortOrder: 14,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-26",
    layoutVariant: "qa",
    metaDescription:
      "What is off-plan property in Bali? A unit bought before completion via a PPJB pre-sale agreement, with payments staged against construction milestones.",
    body: `<p>Off-plan property in Bali is a unit you buy before it is finished, often before construction starts, secured through a PPJB (Perjanjian Pengikatan Jual Beli), a binding pre-sale agreement that fixes the price, payment schedule and delivery date while the developer builds. You pay in stages tied to the build rather than handing over the full price on day one, and you take possession once the unit is complete and the title is ready to transfer.</p><p>Indonesian law puts a floor under how early a developer can sell this way. Under Article 10(1) of <a href="https://peraturan.bpk.go.id/Details/128152/permen-pupr-no-11prtm2019-tahun-2019" data-external="true">Permen PUPR No. 11/PRT/M/2019</a>, a developer cannot sign a PPJB until physical construction has reached at least 20 percent completion, alongside clear land certainty and a building permit already in hand. A reservation deposit ahead of that point is routine. The binding PPJB itself is meant to wait until the threshold is met.</p><p>The building permit referenced above is the PBG (Persetujuan Bangunan Gedung), introduced by <a href="https://peraturan.bpk.go.id/Details/161846/pp-no-16-tahun-2021" data-external="true">PP No. 16 of 2021</a> to replace the older IMB system. A developer who cannot show a PBG for the land has not cleared the basic legal step that off-plan buyers are relying on, so asking to see it before you sign anything is a reasonable, ordinary request.</p><p>Price is the other half of why buyers choose off-plan. <a href="https://www.exotiqproperty.com/blog/buying-off-plan-property-in-bali" data-external="true">Exotiq Property</a> notes that off-plan payment plans in Bali run construction-linked, where each instalment matches a building milestone, or time-linked, where payments fall on a fixed calendar regardless of progress, and that construction-linked is the safer structure for a buyer. Early off-plan pricing sits below the cost of an equivalent finished villa, since the developer is selling future delivery rather than a turnkey asset, though the discount is a range that varies by project and is not a guaranteed return.</p><p>Off-plan is not risk free. Builds can slip, and a thin developer can stall. Weigh that against a finished property, which costs more upfront but removes the construction and delivery risk entirely. Stage your payments against the milestones in the PPJB, confirm the PBG and land certificate before you sign, and use a licensed Indonesian notary (PPAT) throughout. Ownership routes for a foreign buyer are covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>, and the remote buying process in our <a href="/blog/buy-bali-off-plan-property-remotely">guide to buying off-plan remotely</a>. This is general information, not legal or financial advice, so confirm the specifics of any project with a licensed notary before you commit.</p>`,
    venues: [],
    citations: [
      { label: "Permen PUPR No. 11/PRT/M/2019: Sistem Perjanjian Pendahuluan Jual Beli Rumah", url: "https://peraturan.bpk.go.id/Details/128152/permen-pupr-no-11prtm2019-tahun-2019" },
      { label: "PP No. 16 Tahun 2021: Peraturan Pelaksanaan UU No. 28/2002 tentang Bangunan Gedung", url: "https://peraturan.bpk.go.id/Details/161846/pp-no-16-tahun-2021" },
      { label: "Exotiq Property: Buying Off Plan Property in Bali", url: "https://www.exotiqproperty.com/blog/buying-off-plan-property-in-bali" },
    ],
    gallery: [
      { url: "/blog/blog-nuanu-creative.webp", alt: "Off-plan development under construction near Kaba Kaba" },
      { url: "/blog/rice-terraces.jpg", alt: "Tabanan rice terraces, Bali" },
      { url: "/blog/blog-rice-field.webp", alt: "Rice fields near Kaba Kaba, Tabanan" },
    ],
    faq: [
      {
        question: "How does off-plan payment work in Bali?",
        answer:
          "Off-plan payments in Bali are usually staged, either construction-linked, where each instalment matches a building milestone such as foundation, structure and roof, or time-linked, where payments fall on a fixed calendar. A reservation deposit comes first, then the PPJB locks in the schedule once the project clears the legal construction threshold for that agreement. Construction-linked plans give the buyer more protection if the build slows down.",
      },
      {
        question: "Is buying off-plan property in Bali safe for a foreigner?",
        answer:
          "It can be, provided the basics are in place. Confirm the developer holds a PBG (building approval) and a clean land certificate, that the PPJB only follows the legal construction threshold under Permen PUPR No. 11/PRT/M/2019, and that payments are staged against verified progress. A licensed Indonesian notary (PPAT) should review every document before you sign.",
      },
      {
        question: "Off-plan vs completed property in Bali, which is better?",
        answer:
          "Neither is universally better. Off-plan usually costs less upfront and lets a buyer lock in current pricing ahead of completion, but it carries construction and delivery risk. A completed property costs more but removes that risk immediately. The right choice depends on your timeline, budget and tolerance for build risk.",
      },
    ],
  },
  {
    slug: "rental-yield-tabanan-bali",
    title: "Rental Yield in Tabanan, Bali: What to Expect",
    category: "investment",
    imageUrl: "/blog/real-estate-growth-chart.webp",
    sortOrder: 15,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-26",
    layoutVariant: "qa",
    metaDescription:
      "What rental yield can you expect in Tabanan, Bali? Colliers puts Bali gross villa yields at 4.4 to 6.9 percent, plus what actually drives appreciation nearby.",
    body: `<p>The rental yield a foreign owner buying off-plan in Tabanan should expect sits inside Bali's published gross villa yield range, roughly 4.4 to 6.9 percent according to <a href="https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel" data-external="true">Colliers' Q1 2026 Bali Hotel report</a>, treated as a range, not a promise. No tracker breaks that figure out for Tabanan specifically, since the area is still building its own rental history, so the island-wide band is the honest starting point, with the outcome on any villa shaped by occupancy ramp-up, management quality and micro-location.</p><p>Canggu is the comparison every Tabanan buyer makes. The same Colliers report finds that villas in supply-constrained pockets are holding occupancy, while oversupplied corridors, central Canggu among them, have compressed on nightly rate after the 2024 to 2025 building wave. Tabanan has not been overbuilt, so fewer villas are chasing the same demand, which is why an off-plan unit there can reach stabilized occupancy without competing against a saturated strip of near identical listings.</p><p>Capital appreciation here rests on two concrete events, not a hope that prices follow Canggu's. Bali Governor's Instruction Number 5 of 2025, in force from 2 December 2025, bans converting productive rice fields to tourism use across six regencies including Tabanan, per <a href="https://thebalisun.com/balancing-land-conversion-and-tourism-development-to-be-key-focus-for-bali-in-2026/" data-external="true">The Bali Sun</a> and the legal detail in <a href="https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" data-external="true">Emerhub's coverage</a>. That caps future tourism supply on agricultural land, the opposite of what fueled overbuilding elsewhere. Separately, <a href="https://www.nuanu.com" data-external="true">Nuanu Creative City</a>, a 44 hectare development with schools, coworking and a beach club a short drive from Kaba Kaba, is already funded and under construction, the kind of project that tends to lift land values nearby; see our <a href="/blog/hotels-development">guide to why Tabanan is drawing investment</a>.</p><p>A foreign individual cannot legally rent out a Bali villa directly. The compliant route runs through a PT PMA holding a Villa license under KBLI 55193, licensed through Indonesia's OSS system under Government Regulation 28 of 2025, with a valid NIB in place before the unit takes bookings, per <a href="https://emerhub.com/bali/renting-out-villa-in-bali/" data-external="true">Emerhub's guide to renting out a Bali villa</a>. Most owners then hand bookings to a licensed villa management company. <a href="https://ilaglobalconsulting.com/foreigners-rent-out-property-bali/" data-external="true">ILA Global Consulting</a> puts typical pricing at 10 to 20 percent of rental revenue depending on service level, on top of any booking platform commission, so build that into any projection before comparing it to the headline Colliers range. This is general information, not financial or legal advice. Ownership structure is covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a> and rental income tax in our <a href="/blog/tax-for-foreign-property-owners-bali">tax guide</a>; confirm current licensing requirements with the OMA Townhouse team and a licensed Indonesian notary before you commit.</p>`,
    venues: [],
    citations: [
      { label: "Colliers Quarterly Property Market Report Q1 2026 Bali Hotel", url: "https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel" },
      { label: "The Bali Sun: Balancing Land Conversion and Tourism Development in 2026", url: "https://thebalisun.com/balancing-land-conversion-and-tourism-development-to-be-key-focus-for-bali-in-2026/" },
      { label: "Emerhub: Bali Criminalizes Rice Field Conversions", url: "https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" },
      { label: "Nuanu Creative City (official site)", url: "https://www.nuanu.com" },
      { label: "Emerhub: A Guide to Renting out Villas in Bali as a Foreign Investor", url: "https://emerhub.com/bali/renting-out-villa-in-bali/" },
      { label: "ILA Global Consulting: How To Rent Out Property As A Foreign Investor In Bali", url: "https://ilaglobalconsulting.com/foreigners-rent-out-property-bali/" },
    ],
    gallery: [
      { url: "/blog/real-estate-growth-chart.webp", alt: "Model houses on a real estate growth chart", credit: "Artful Homes / Pexels", sourceUrl: "https://www.pexels.com/photo/20208884/" },
      { url: "/blog/tabanan-rice-terrace-aerial.webp", alt: "Aerial view of rice terraces near Tabanan, Bali", credit: "Tom Fisk / Pexels", sourceUrl: "https://www.pexels.com/photo/36810327/" },
      { url: "/blog/balinese-villa-garden-pavilion.webp", alt: "Traditional Balinese villa pavilion set in a tropical garden", credit: "Onna Bugeisha / Pexels", sourceUrl: "https://www.pexels.com/photo/36107525/" },
    ],
    faq: [
      {
        question: "How do Tabanan yields compare to Canggu?",
        answer:
          "No published tracker breaks Bali yields out by sub-regency, so there is no separate Tabanan figure to set against Canggu. What is documented, per Colliers, is that supply-constrained pockets are holding occupancy while oversupplied corridors such as central Canggu have compressed on nightly rate after the 2024 to 2025 building wave. Tabanan's lower density today is the practical reason it has room to perform well as the area matures.",
      },
      {
        question: "What drives capital appreciation near Canggu and Tabanan?",
        answer:
          "Two concrete drivers, not just a hope that prices follow Canggu. Bali Governor's Instruction Number 5 of 2025 bans new tourism development on productive rice fields across six regencies including Tabanan, capping future competing supply. Nuanu Creative City, a 44 hectare development with schools, coworking and a beach club minutes from Kaba Kaba, is already funded and under construction, the kind of project that tends to lift land values nearby.",
      },
      {
        question: "How is rental managed for an off-plan villa?",
        answer:
          "A foreign individual cannot rent out a Bali villa directly. The compliant structure is a PT PMA holding a Villa license under KBLI 55193, licensed through Indonesia's OSS system under Government Regulation 28 of 2025, with day to day bookings handled by a licensed villa management company for a fee that commonly runs 10 to 20 percent of revenue.",
      },
    ],
  },
  {
    slug: "where-is-kaba-kaba-bali",
    title: "Where Is Kaba Kaba, Bali? Distance to Canggu",
    category: "location",
    imageUrl: "/blog/tanah-lot-temple-coast.webp",
    sortOrder: 16,
    isInsight: false,
    author: "OMA Townhouse",
    publishedAt: "2026-06-27",
    layoutVariant: "map",
    metaDescription:
      "Where is Kaba Kaba, Bali? It sits in Tabanan Regency, about 20 to 25 minutes from Canggu, 10 minutes from Tanah Lot and roughly an hour from the airport.",
    body: `<p>Kaba Kaba is a village in Kediri district, Tabanan Regency, on Bali's south west coast, about 20 to 25 minutes by car from the heart of Canggu and 10 to 15 minutes from the closer Nuanu and Seseh stretch of coastline. It sits inland from the beach road, surrounded by rice terraces rather than beachfront traffic, which is the main reason land here costs a fraction of Canggu's.</p><p>Administratively the village borders Nyambu to the north, Cepaka to the east, Munggu in neighboring Badung Regency to the south and Buwit to the west, according to <a href="https://kabakaba.desa.id/artikel/2024/8/27/profil-wilayah-desa-kaba-kaba" data-external="true">Desa Kaba-kaba's own village profile</a>. The same profile puts it about 10 km from Tabanan town, the regency capital, and 21 km from Denpasar. <a href="https://en.wikipedia.org/wiki/Tanah_Lot" data-external="true">Tanah Lot</a>, Bali's well known sea temple, sits in the same Kediri district, a drive of roughly 10 minutes.</p><p>That distance is also the off-plan thesis. <a href="https://www.nuanu.com" data-external="true">Nuanu Creative City</a>, a 44 hectare development with schools, coworking and a beach club, is 10 to 15 minutes away and already under construction, and early Canggu buyers are the reference point most people in Tabanan use for what land near a growing hub can become; see our <a href="/blog/hotels-development">guide to why Tabanan is drawing investment</a>. None of that is a guarantee, and any return should be read as a range rather than a promise.</p><p>For a buyer flying in from the US or Dubai, <a href="https://ngurahraiairport.com/" data-external="true">Ngurah Rai International Airport</a>, known as DPS, is about 25 km away, roughly an hour by car depending on traffic, the same drive any Canggu villa owner already makes. Once you are on the ground, Kaba Kaba functions less like a remote outpost and more like a quieter neighborhood a short ring road away from everything Bali's south coast offers.</p>`,
    venues: [
      { name: "Tanah Lot Temple", distance: "10 min", coords: "-8.6212,115.0868", url: "https://en.wikipedia.org/wiki/Tanah_Lot" },
      { name: "Canggu (Berawa/Batu Bolong)", distance: "20-25 min", coords: "-8.6478,115.1385", url: "https://maps.google.com/?q=Canggu+Bali" },
      { name: "Nuanu Creative City", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
      { name: "Ngurah Rai International Airport (DPS)", distance: "55-65 min", coords: "-8.7467,115.1667", url: "https://ngurahraiairport.com/" },
    ],
    citations: [
      { label: "Desa Kaba-kaba: Profil Wilayah Desa (official village profile)", url: "https://kabakaba.desa.id/artikel/2024/8/27/profil-wilayah-desa-kaba-kaba" },
      { label: "Tanah Lot - Wikipedia", url: "https://en.wikipedia.org/wiki/Tanah_Lot" },
      { label: "Nuanu Creative City (official site)", url: "https://www.nuanu.com" },
      { label: "I Gusti Ngurah Rai International Airport (official)", url: "https://ngurahraiairport.com/" },
    ],
    gallery: [
      { url: "/blog/tanah-lot-temple-coast.webp", alt: "Tanah Lot sea temple on the Bali coast near Kaba Kaba", credit: "Tina P. / Pexels", sourceUrl: "https://www.pexels.com/photo/scenic-view-of-tanah-lot-temple-in-bali-34136174/" },
      { url: "/blog/bali-rural-road-rice-fields.webp", alt: "Rural road winding through rice terraces in Bali", credit: "Agung Pandit Wiguna / Pexels", sourceUrl: "https://www.pexels.com/photo/aerial-view-of-a-road-and-rice-terraces-17716415/" },
      { url: "/blog/canggu-beach-sunset-crowd.webp", alt: "Crowded Canggu beach at sunset, Bali", credit: "Peggy Anke / Pexels", sourceUrl: "https://www.pexels.com/photo/people-at-the-beach-during-sunset-5289209/" },
    ],
    faq: [
      {
        question: "Kaba Kaba vs Canggu for living and investment?",
        answer:
          "Kaba Kaba is about 20 to 25 minutes from central Canggu by car, so you trade walking distance to the beach for land at a fraction of Canggu's price, set in a working rice field village. For investment, that price gap combined with the Nuanu development nearby is the underlying case; for living, expect a quieter, more local daily routine.",
      },
      {
        question: "How do you get from Kaba Kaba to the airport?",
        answer:
          "By car. Ngurah Rai International Airport, known as DPS, is roughly 25 km away, about an hour's drive depending on traffic, the same route used by villa owners in Canggu and Seminyak.",
      },
      {
        question: "What is the area around Kaba Kaba like?",
        answer:
          "Rural and agricultural, with rice terraces rather than beachfront development. Tanah Lot temple is about 10 minutes away, the Nuanu and Seseh coastline is 10 to 15 minutes away, and central Canggu is 20 to 25 minutes away.",
      },
    ],
  },
  {
    slug: "what-is-nuanu-creative-city",
    title: "What Is Nuanu Creative City, Bali? Property Impact",
    category: "development",
    imageUrl: "/blog/bali-coastal-cliff-tabanan.webp",
    sortOrder: 17,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-28",
    metaDescription:
      "Nuanu Creative City is a 44 hectare creative hub on Tabanan coast near Kaba Kaba, with schools, wellness and a beach club shaping nearby land values.",
    body: `<p>Nuanu Creative City is a 44 hectare development on Bali's Tabanan coast built around art, education and wellness rather than the usual resort retail mix, and it matters to a Kaba Kaba buyer because a funded build of this size moving in next door is a stronger signal than any sales brochure. <a href="https://www.nuanu.com" data-external="true">Nuanu</a> sits between Nyanyi Beach and Tanah Lot Temple in Tabanan Regency, about 10 to 15 minutes from OMA Townhouse.</p><p>The project was founded in 2020 by Sergey Solonin, the entrepreneur behind the Russian payments company Qiwi, with construction starting in 2021 and the first school campus opening in 2023. The site now mixes a boutique hotel, the Luna Beach Club, a wellness and spa complex, sound healing and yoga spaces, an alpaca farm and a butterfly breeding program aimed at local biodiversity. A second hotel, the four star X Hotel, is set to open in late 2026, one of about 18 more projects underway toward a planned total near 50 spaces across the site. Nuanu has pledged to keep two-thirds of the land as natural landscape rather than build it out completely.</p><p>For property nearby, the case is straightforward rather than guaranteed: when an operator commits dozens of projects and a school to one stretch of coast over several years, land around it tends to draw more buyers and more services, the same pattern that played out as Canggu grew. Treat any future price move as a range, not a promise, and read it alongside our <a href="/blog/hotels-development">guide to why Tabanan is drawing investment</a> rather than on its own. None of this is financial advice.</p>`,
    venues: [
      { name: "Nuanu Creative City", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
      { name: "Tanah Lot Temple", distance: "10 min", coords: "-8.6212,115.0868", url: "https://en.wikipedia.org/wiki/Tanah_Lot" },
    ],
    citations: [
      { label: "Nuanu Creative City (official site)", url: "https://www.nuanu.com" },
      { label: "The Urban List: Delve Into Art, Nature and Innovation at Nuanu Creative City", url: "https://www.theurbanlist.com/a-list/nuanu-creative-city-bali" },
    ],
    gallery: [
      { url: "/blog/bali-coastal-cliff-tabanan.webp", alt: "Limestone cliffs along Bali's coastline", credit: "ArtHouse Studio / Pexels", sourceUrl: "https://www.pexels.com/photo/verdant-balangan-cliff-in-bali-overlooking-blue-ocean-4534136/" },
      { url: "/blog/balinese-garden-sculpture.webp", alt: "Traditional Balinese stone sculpture in a tropical garden", credit: "hakki Ulucay / Pexels", sourceUrl: "https://www.pexels.com/photo/balinese-ganesha-statue-in-lush-tropical-garden-35070472/" },
      { url: "/blog/bali-tropical-rainforest-foliage.webp", alt: "Dense tropical rainforest foliage in Bali", credit: "Kyle Vermeulen / Pexels", sourceUrl: "https://www.pexels.com/photo/lush-tropical-foliage-in-bali-s-rainforest-34710865/" },
    ],
    faq: [
      {
        question: "What is inside Nuanu Creative City?",
        answer:
          "A boutique hotel, the Luna Beach Club, a wellness and spa complex, an international school campus, sound healing and yoga spaces, an alpaca farm and a butterfly breeding program, with a second hotel and more projects planned through 2026 and beyond.",
      },
      {
        question: "How far is Nuanu from Kaba Kaba?",
        answer:
          "About 10 to 15 minutes by car from OMA Townhouse, on the same stretch of Tabanan coast between Nyanyi Beach and Tanah Lot Temple.",
      },
      {
        question: "Does Nuanu affect nearby land values?",
        answer:
          "A development of this scale tends to draw more buyers and services to the surrounding area over time, the same pattern seen as Canggu grew. That is a pattern, not a guarantee, so treat any projection as a range and not financial advice.",
      },
    ],
  },
  {
    slug: "relocating-to-bali-with-family-kaba-kaba",
    title: "Relocating to Bali With a Family Near Kaba Kaba",
    category: "family",
    imageUrl: "/blog/family-pool-tropical-villa.webp",
    sortOrder: 18,
    isInsight: false,
    author: "OMA Townhouse",
    publishedAt: "2026-06-29",
    metaDescription:
      "You can relocate to Bali with a family near Kaba Kaba on a Second Home Visa or dependent KITAS, with schools at Grow or ProEd and Kasih Ibu Hospital nearby.",
    body: `<p>Yes, you can relocate to Bali with a family near Kaba Kaba. Most families use one of two legal routes: a Second Home Visa held by one parent, or a Dependent KITAS sponsored by a spouse who already holds a work or investor permit. Neither requires living in Bali full time first, but both need paperwork ready before you move.</p><p>The Second Home Visa, KITAS index E33, lets a foreigner live in Indonesia for 5 or 10 years without a local sponsor, according to <a href="https://emerhub.com/indonesia/indonesian-second-home-visa/" data-external="true">Emerhub's guide to the visa</a>. It is non-working, and the financial bar is real: within 90 days of arrival you must show a deposit of at least USD 130,000 in a state-owned Indonesian bank, or own Indonesian property worth at least USD 1,000,000. A spouse and children under 18 can be added as dependents on the same application, which is the route most off-plan buyers use once their unit is registered.</p><p>If only one parent qualifies on income or investment grounds, for example through a PT PMA, the rest of the family typically joins on a Dependent KITAS instead. <a href="https://www.cekindo.com/blog/dependent-visa-indonesia" data-external="true">Cekindo's guide to the dependent visa</a> notes the sponsor must hold a valid KITAS or KITAP and show sufficient financial capability, and the dependent permit is valid for 6 to 12 months, renewed in line with the sponsor's own permit. Applications for either route run through the <a href="https://evisa.imigrasi.go.id" data-external="true">official Indonesian e-Visa portal</a>.</p><p>Daily life near Kaba Kaba then covers the basics families ask about. <a href="https://growinkedungu.com/" data-external="true">Grow International School</a> in Kedungu runs a Cambridge curriculum about 10 minutes away, and <a href="https://www.nuanu.com" data-external="true">ProEd Global School at Nuanu</a> is a second option 10 to 15 minutes out. Our <a href="/blog/schools-family">guide to schools and healthcare near Kaba Kaba</a> covers both in more detail.</p><p>For healthcare, Kasih Ibu Hospital in Tabanan is 15 to 20 minutes away for everyday care, while <a href="https://www.bimcbali.com" data-external="true">BIMC Hospital</a> in Kuta, with English-speaking staff and a 24 hour emergency room, is closer to 45 to 50 minutes. Day-to-day costs away from beachfront Canggu tend to run lower, tracking local Tabanan prices rather than tourist-strip ones, though that is a pattern, not a fixed number. This is general information, not immigration, legal or tax advice. Confirm current visa requirements with a licensed Indonesian immigration agent, and see our <a href="/blog/tax-for-foreign-property-owners-bali">rental income tax guide</a> if you plan to rent out the property.</p>`,
    venues: [
      { name: "Grow International School", distance: "10 min", coords: "-8.5900,115.1150", url: "https://growinkedungu.com/" },
      { name: "Nuanu / ProEd", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
      { name: "Kasih Ibu Hospital", distance: "15-20 min", coords: "-8.5400,115.1700", url: "https://maps.google.com/?q=Kasih+Ibu+Hospital+Tabanan" },
      { name: "BIMC Hospital Kuta", distance: "45-50 min", coords: "-8.7210,115.1730", url: "https://www.bimcbali.com" },
    ],
    citations: [
      { label: "Emerhub: Indonesia Second Home Visa, Requirements and Application Process", url: "https://emerhub.com/indonesia/indonesian-second-home-visa/" },
      { label: "Cekindo: Dependent Visa Indonesia, 5 Things You Should Know", url: "https://www.cekindo.com/blog/dependent-visa-indonesia" },
      { label: "Official Indonesian e-Visa portal (Direktorat Jenderal Imigrasi)", url: "https://evisa.imigrasi.go.id" },
      { label: "Grow International School (official site)", url: "https://growinkedungu.com/" },
      { label: "Nuanu Creative City (official site)", url: "https://www.nuanu.com" },
      { label: "BIMC Hospital (official site)", url: "https://www.bimcbali.com" },
    ],
    gallery: [
      { url: "/blog/family-pool-tropical-villa.webp", alt: "Family with children relaxing by a pool at a tropical villa in Bali", credit: "Atlantic Ambience / Pexels", sourceUrl: "https://www.pexels.com/photo/11266606/" },
      { url: "/blog/international-school-art-class.webp", alt: "Children in an arts and crafts class at an international school", credit: "Yan Krukau / Pexels", sourceUrl: "https://www.pexels.com/photo/8612983/" },
      { url: "/blog/family-unpacking-moving-boxes.webp", alt: "Family unpacking moving boxes after relocating to a new home", credit: "cottonbro studio / Pexels", sourceUrl: "https://www.pexels.com/photo/family-unpacking-after-moving-4569340/" },
    ],
    faq: [
      {
        question: "Can you relocate to Bali with a family near Kaba Kaba?",
        answer:
          "Yes. Most families use a Second Home Visa, which covers a spouse and children under 18 as dependents, or a Dependent KITAS sponsored by a parent who already holds a work or investor permit.",
      },
      {
        question: "What international schools are near Kaba Kaba?",
        answer:
          "Grow International School in Kedungu is about 10 minutes away on a Cambridge curriculum, and ProEd Global School at Nuanu is a second option 10 to 15 minutes out.",
      },
      {
        question: "What is healthcare like near Tabanan?",
        answer:
          "Kasih Ibu Hospital in Tabanan covers everyday care 15 to 20 minutes from Kaba Kaba. For more complex needs, BIMC Hospital in Kuta has English-speaking staff and a 24 hour emergency room, about 45 to 50 minutes away.",
      },
      {
        question: "What does it cost to live near Canggu?",
        answer:
          "Day-to-day costs away from beachfront Canggu tend to run lower, since rent and dining follow local Tabanan prices rather than tourist-strip ones. That is a general pattern, not a fixed figure, and it depends on the household.",
      },
    ],
  },
  {
    slug: "why-buy-off-plan-bali",
    title: "Why Buy Off-Plan Instead of a Finished Villa in Bali?",
    category: "investment",
    imageUrl: "/blog/villa-frame-construction-tropical.webp",
    sortOrder: 19,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-06-30",
    layoutVariant: "qa",
    metaDescription:
      "Why buy off-plan instead of a finished villa in Bali? Lower entry price, staged payments and a customization window are the main reasons foreign buyers choose off-plan.",
    body: `<p>Off-plan costs less than a finished villa because you are buying future delivery, not a turnkey asset. Developers price early units below projected completion value to fund construction and attract buyers who take on the build timeline. A foreign buyer who signs at an early stage locks in today's pricing rather than paying the post-completion market rate for the same villa.</p><p>Payments are staged. Instead of moving the full purchase amount in a single wire, you contribute in tranches tied to verified construction milestones: a reservation deposit, then a payment at foundation, another at structural frame, and the balance at handover. That keeps more capital available in your home market between transfers, which matters when a US or UAE buyer is also managing other assets while the Bali unit is under construction. <a href="https://www.exotiqproperty.com/blog/buying-off-plan-property-in-bali" data-external="true">Exotiq Property's guide to buying off-plan in Bali</a> notes that construction-linked plans, where each tranche is tied to a verified milestone rather than a calendar date, give buyers more protection if the build slows.</p><p>A third factor is customization. At an early off-plan stage, buyers often have input on finishes and fixtures. A finished villa comes as-is.</p><p>The risks are real. Construction can run late. A developer running on thin cash flow can stall. Indonesian law sets a floor: under Article 10(1) of <a href="https://peraturan.bpk.go.id/Details/128152/permen-pupr-no-11prtm2019-tahun-2019" data-external="true">Permen PUPR No. 11/PRT/M/2019</a>, the binding pre-sale agreement, the PPJB, cannot be signed until physical construction has reached at least 20 percent completion, the developer holds clear land title and a building permit (PBG) is already in hand. That threshold means the project is not purely on paper when you commit, though it is still well short of handover. Staging your payments against verified progress, confirmed by a licensed Indonesian notary, is the main additional protection.</p><p>A finished villa removes build risk entirely and can generate rental income from day one. The right choice depends on your timeline and how much risk you are prepared to carry while construction runs. Ownership structures for a foreign buyer are covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>, and the full remote purchase process in our <a href="/blog/buy-bali-off-plan-property-remotely">guide to buying off-plan remotely</a>. This is general information and not financial, legal or tax advice.</p>`,
    venues: [],
    citations: [
      { label: "Permen PUPR No. 11/PRT/M/2019: Sistem Perjanjian Pendahuluan Jual Beli Rumah", url: "https://peraturan.bpk.go.id/Details/128152/permen-pupr-no-11prtm2019-tahun-2019" },
      { label: "Exotiq Property: Buying Off Plan Property in Bali", url: "https://www.exotiqproperty.com/blog/buying-off-plan-property-in-bali" },
    ],
    heroImage: "/blog/villa-frame-construction-tropical.webp",
    gallery: [
      { url: "/blog/construction-workers-villa-scaffolding.webp", alt: "Construction workers on scaffolding at a villa building site with palm trees", credit: "Pavel Khlyatunov / Pexels", sourceUrl: "https://www.pexels.com/photo/14989326/" },
      { url: "/blog/modern-white-villa-exterior.webp", alt: "Completed contemporary white villa exterior surrounded by lush tropical greenery", credit: "Gustavo Galeano Maz / Pexels", sourceUrl: "https://www.pexels.com/photo/7501130/" },
    ],
    faq: [
      {
        question: "What are the risks of buying off-plan in Bali?",
        answer:
          "Build delays and developer cash-flow problems are the main ones. Specification changes or quality cuts during construction are a related concern. Mitigate by requiring the PPJB only after the legal 20 percent construction threshold is met under Permen PUPR No. 11/PRT/M/2019, staging payments against verified milestones and using a licensed Indonesian notary throughout.",
      },
      {
        question: "How much cheaper is off-plan than completed property in Bali?",
        answer:
          "There is no single fixed discount. Developers price early off-plan units below their projected post-completion market value to fund construction and attract early buyers, and that gap narrows as construction progresses. The actual saving depends on the project, developer and market conditions. This is general information, not financial advice.",
      },
      {
        question: "What protections exist for off-plan buyers in Bali?",
        answer:
          "Under Article 10(1) of Permen PUPR No. 11/PRT/M/2019, a developer cannot sign the binding pre-sale agreement (PPJB) until physical construction has reached at least 20 percent completion, with clear land title and a building permit (PBG) in hand. The PPJB must fix price, payment schedule and delivery date and set penalties for late delivery. Staging payments against verified construction progress adds further protection.",
      },
    ],
  },
  {
    slug: "pt-pma-setup-bali-property",
    title: "How to Set Up a PT PMA to Buy Bali Property",
    category: "investment",
    imageUrl: "/blog/pt-pma-company-stamp-registration.webp",
    sortOrder: 21,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-02",
    layoutVariant: "qa",
    metaDescription:
      "How to set up a PT PMA to buy Bali property as a foreigner: IDR 2.5 billion paid-up capital, 4 to 6 weeks via the OSS system, HGB title for up to 80 years.",
    body: `<p>A PT PMA (Perseroan Terbatas Penanaman Modal Asing) is the company structure that lets a foreign buyer hold freehold-equivalent property title in Bali. Registration runs through Indonesia's <a href="https://oss.go.id" data-external="true">Online Single Submission (OSS) system</a> and the core incorporation typically takes 4 to 6 weeks. A licensed Indonesian notary and incorporation firm can handle every step under your Power of Attorney, so no visit to Indonesia is required at any stage.</p><p>The minimum paid-up capital under BKPM Regulation No. 5 of 2025 is IDR 2.5 billion, around USD 150,000, reduced from the previous IDR 10 billion floor. The company must also carry a total investment plan exceeding IDR 10 billion per business code, though for a property company the value of land and buildings counts toward that figure. You need at least two shareholders, foreign individuals qualify, one director and one commissioner, plus a registered business address in Indonesia in the province where the company operates.</p><p>The setup follows a fixed sequence. Your notary reserves the company name and drafts the Deed of Establishment, which your attorney signs under Power of Attorney if you are abroad. The deed goes to the Ministry of Law for approval, then the <a href="https://oss.go.id" data-external="true">OSS portal</a> issues a Business Identification Number (NIB) and sector licenses. The company opens a local bank account and deposits the paid-up capital. After that, it applies to the National Land Agency (BPN) for Hak Guna Bangunan (HGB). Under <a href="https://peraturan.bpk.go.id/Home/Details/161848/pp-no-18-tahun-2021" data-external="true">Government Regulation 18 of 2021</a>, HGB runs for an initial 30 years, extendable by 20, then renewable for a further 30, for up to 80 years in total.</p><p>Annual compliance covers corporate tax returns and quarterly LKPM investment reports filed with BKPM. A PT PMA renting out a Bali villa also needs a sector license under KBLI 55193 before taking bookings, a process covered in our <a href="/blog/rental-yield-tabanan-bali">rental yield guide</a>. Professional fees and ongoing compliance costs depend on the adviser and the company's scope, so get written quotes from a licensed incorporation firm before you commit. The freehold versus leasehold comparison is in our <a href="/blog/freehold-vs-leasehold-bali">freehold vs leasehold guide</a>, and all foreign buyer ownership options are in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>. This is general information, not legal, tax or company-formation advice. Confirm the current rules with a licensed Indonesian notary (PPAT) and the OMA Townhouse team before you start the setup.</p>`,
    venues: [],
    heroImage: "/blog/pt-pma-company-stamp-registration.webp",
    gallery: [
      {
        url: "/blog/corporate-contract-signing-office.webp",
        alt: "Business professional signing a corporate contract at an office desk",
        credit: "Kampus Production / Pexels",
        sourceUrl: "https://www.pexels.com/photo/8730015/",
      },
      {
        url: "/blog/tropical-villa-lush-greenery.webp",
        alt: "White tropical villa set among lush greenery and palm trees in Bali",
        credit: "KSU Eli Studio / Pexels",
        sourceUrl: "https://www.pexels.com/photo/8681218/",
      },
    ],
    citations: [
      { label: "Indonesia OSS (Online Single Submission) company registration portal", url: "https://oss.go.id" },
      { label: "Government Regulation PP No. 18 of 2021 (Hak Pengelolaan, Hak Atas Tanah)", url: "https://peraturan.bpk.go.id/Home/Details/161848/pp-no-18-tahun-2021" },
      { label: "Cekindo: PT PMA Minimum Capital in Indonesia (2026)", url: "https://www.cekindo.com/blog/minimum-capital-investment-in-indonesia" },
      { label: "ILA Global Consulting: Setting Up a PT PMA in Indonesia", url: "https://ilaglobalconsulting.com/setting-up-pt-pma-indonesia/" },
    ],
    faq: [
      {
        question: "How long does it take to set up a PT PMA in Indonesia?",
        answer:
          "The core incorporation typically takes 4 to 6 weeks through the OSS system, covering name reservation, Deed of Establishment, Ministry of Law approval and NIB issuance. Opening a bank account and depositing the paid-up capital can add a further 2 to 4 weeks, so the company is usually fully operational within 6 to 10 weeks of engagement.",
      },
      {
        question: "How much does a PT PMA cost to set up and maintain?",
        answer:
          "Setup costs include the minimum paid-up capital of IDR 2.5 billion (around USD 150,000) plus professional fees paid to a notary and incorporation firm. Annual compliance, covering tax filings, bookkeeping and quarterly LKPM reports to BKPM, is an ongoing cost on top of that. Get written quotes from a licensed Indonesian incorporation firm for current fee ranges. This is general information, not financial or legal advice.",
      },
      {
        question: "Do I need to be in Indonesia to set up a PT PMA?",
        answer:
          "No. The full registration process can be handled remotely through a licensed Indonesian notary acting under a notarised, apostilled Power of Attorney. Indonesia joined the Hague Apostille Convention on 4 June 2022, replacing the older embassy legalisation chain with a single apostille from your home country. The remote signing process is the same as for buying off-plan property remotely.",
      },
    ],
  },
  {
    slug: "bali-property-exit-strategy",
    title: "Bali Property Exit Strategy for Foreign Investors",
    category: "investment",
    imageUrl: "/blog/property-sold-sign-realtor.webp",
    sortOrder: 20,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-01",
    layoutVariant: "qa",
    metaDescription:
      "How do you exit a Bali property investment? Leasehold assignment or PT PMA share sale are the two main routes, each with different tax rates and timelines.",
    body: `<p>Yes, you can sell a Bali property investment as a foreign buyer, and the process follows an established legal path. The route depends on how you hold the asset. A leasehold holder assigns their lease rights to a new buyer. A PT PMA holder can either transfer the company shares or sell the property out of the company. Each route carries different tax treatment and a different timeline.</p><p>A Hak Sewa (leasehold) gives you the right to use a property for a fixed term. When you sell before that term ends, a licensed Indonesian notary (PPAT) drafts an assignment deed and the new buyer steps into your position for the remaining years. Most lease contracts require the original Indonesian landowner's written consent to the assignment, so check your contract before you list. On the seller's side, <a href="https://peraturan.bpk.go.id/Details/5755/pp-no-34-tahun-2016" data-external="true">Government Regulation PP No. 34 of 2016</a> sets a final income tax (PPh Final) of 2.5 percent of the gross transaction value, paid before the notary can execute the deed. The buyer pays BPHTB, the land and building acquisition duty, at 5 percent. Holding an Indonesian tax number (NPWP) before you sell matters: without one, a higher withholding rate can apply to a foreign seller under Article 26 of the income tax law.</p><p>If the property sits inside a PT PMA company, the quickest exit is usually a company share sale. The buyer acquires your PT PMA shares and with them the property title, without any fresh title registration at BPN. For a non-resident seller, <a href="https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers" data-external="true">Article 26 withholding tax</a> applies to the sale proceeds at up to 20 percent; that rate may be reduced if your home country has a tax treaty with Indonesia and you present a Certificate of Domicile. Both the US and the UAE have tax treaties with Indonesia. The actual rate on a private company share sale depends on how Indonesian tax authorities treat the gain and should be confirmed with a qualified Indonesian tax adviser before you close. Share transfers typically complete in 2 to 4 months.</p><p>The alternative PT PMA exit is to sell the property itself out of the company. The PT PMA as seller pays PPh Final at 2.5 percent under PP No. 34/2016. The buyer pays BPHTB at 5 percent, a fresh title registers at BPN and a new land certificate issues. This takes 4 to 6 months and costs more in transaction taxes, but delivers a clean property transfer. You will need to wind down or repurpose the PT PMA company separately afterward.</p><p>Indonesia does not impose a standalone capital gains tax on property sales. PPh Final on an asset transfer applies to the gross transaction value, not only the profit. A seller who paid USD 200,000 and sells for USD 350,000 pays 2.5 percent on USD 350,000, not just on the USD 150,000 difference. Plan for 3 to 6 months from committed buyer to funds in your home account; marketing, due diligence and tax clearance each add time. Keep your original PPJB, land certificate copy and PT PMA records on file, since a buyer will request them. Ownership structures are covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a> and our <a href="/blog/freehold-vs-leasehold-bali">freehold vs leasehold guide</a>. This is general information and not tax, legal or financial advice; confirm your specific position with a licensed Indonesian notary and a qualified tax adviser before you sell.</p>`,
    venues: [],
    heroImage: "/blog/property-sold-sign-realtor.webp",
    gallery: [
      {
        url: "/blog/real-estate-keys-documents-desk.webp",
        alt: "Property keys on real estate documents with colourful house models, symbolising a property transfer",
        credit: "Jakub Zerdzicki / Pexels",
        sourceUrl: "https://www.pexels.com/photo/real-estate-keys-and-documents-with-house-models-34135038/",
      },
      {
        url: "/blog/agent-handing-property-key.webp",
        alt: "Real estate agent in a suit handing property keys to a buyer",
        credit: "Kampus Production / Pexels",
        sourceUrl: "https://www.pexels.com/photo/real-estate-agent-handing-house-keys-8815915/",
      },
    ],
    citations: [
      {
        label: "Government Regulation PP No. 34/2016: PPh Final on property transfers (BPK)",
        url: "https://peraturan.bpk.go.id/Details/5755/pp-no-34-tahun-2016",
      },
      {
        label: "Directorate General of Taxes: Income Tax Article 26 (non-resident withholding)",
        url: "https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers",
      },
      {
        label: "Exotiq Property: Selling Property in Bali in 2026",
        url: "https://www.exotiqproperty.com/blog/selling-property-in-bali-2026",
      },
    ],
    faq: [
      {
        question: "How do you assign a Bali leasehold to a new buyer?",
        answer:
          "You transfer your lease rights via a notarial assignment deed drafted by a licensed Indonesian notary (PPAT). Most lease contracts require the original Indonesian landowner's written consent first. The seller pays PPh Final at 2.5 percent of the transaction value under Government Regulation PP No. 34/2016, and the buyer pays BPHTB at 5 percent.",
      },
      {
        question: "What tax does a foreign seller pay when selling Bali property?",
        answer:
          "For a direct property asset transfer, the seller pays PPh Final at 2.5 percent of the gross transaction value under PP No. 34/2016, regardless of the profit made. The buyer pays BPHTB at 5 percent. For a PT PMA share sale, Article 26 withholding tax applies to a non-resident seller at up to 20 percent, potentially reduced under a tax treaty. This is general information, not tax advice.",
      },
      {
        question: "Is a PT PMA share transfer faster than selling the property directly?",
        answer:
          "Yes. A PT PMA share sale transfers the company and the property inside it without a fresh land title registration at BPN, typically completing in 2 to 4 months. A direct asset transfer requires a new deed registered at BPN and a new land certificate, and generally takes 4 to 6 months or more.",
      },
    ],
  },
  {
    slug: "bali-property-due-diligence-checklist",
    title: "Bali Off-Plan Property Due Diligence Checklist",
    category: "investment",
    imageUrl: "/blog/property-inspection-checklist-clipboard.webp",
    sortOrder: 22,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-03",
    layoutVariant: "qa",
    metaDescription:
      "What due diligence before buying off-plan in Bali? Verify the BPN land certificate, check RTRW zoning, confirm the PBG permit, and review the PPJB carefully.",
    body: `<p>Before buying off-plan property in Bali, a foreign buyer should complete five checks: verify the land certificate at BPN, confirm the zoning, see the building permit, review the PPJB, and check the developer's track record. A licensed Indonesian notary (PPAT) acting under your Power of Attorney can handle each of these remotely, so no site visit is needed before you sign.</p><p>Start with the land certificate. Ask for the original from the seller and have your PPAT cross-check it at the local <a href="https://www.atrbpn.go.id" data-external="true">Ministry of ATR/BPN</a> office. The check confirms the registered owner, the plot boundaries, and any encumbrance such as a Hak Tanggungan mortgage. Certificate type matters for a foreign buyer: only Indonesian citizens can hold Sertifikat Hak Milik (SHM, freehold). A PT PMA company holds Hak Guna Bangunan (SHGB/HGB), and a foreigner with an Indonesian residence permit can hold Hak Pakai. Legacy village tax records such as Girik or Letter C are not registered titles under Indonesian law and cannot be transferred without first converting them at BPN. A seller who can only show a Girik is a significant red flag, not a routine condition to overlook.</p><p>Next, confirm the zoning. The regency spatial plan (RTRW) and its detailed layer (RDTR) set what construction is permitted on each plot. Agricultural land bars permanent buildings entirely; tourism or residential zones allow villa development. In Tabanan, verify that the plot is not productive agricultural land covered by Bali Governor's Instruction Number 5 of 2025, which bans rice field conversion to tourism across six regencies from 2 December 2025, per <a href="https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" data-external="true">Emerhub's coverage</a>. Then check the building permit. Under <a href="https://peraturan.bpk.go.id/Details/161846/pp-no-16-tahun-2021" data-external="true">PP No. 16/2021</a>, the PBG (Persetujuan Bangunan Gedung) replaced the older IMB. A developer who cannot show a PBG has not cleared the step that off-plan buyers are depending on.</p><p>The PPJB is the binding pre-sale agreement that locks in your price, payment schedule, unit specification, and delivery date. Under Article 10(1) of <a href="https://peraturan.bpk.go.id/Details/128152/permen-pupr-no-11prtm2019-tahun-2019" data-external="true">Permen PUPR No. 11/PRT/M/2019</a>, a developer cannot sign a PPJB until physical construction has reached at least 20 percent completion, the land title is clear, and the PBG is in hand. The PPJB should name both parties, describe the unit and its specification, set penalties for late delivery, and include a dispute resolution clause. Stage your payments against verified construction milestones rather than calendar dates, so each tranche is tied to confirmed progress. Finally, check the developer's track record: verify their NIB through the <a href="https://oss.go.id" data-external="true">OSS portal</a>, ask for completed project addresses, and confirm those titles are cleanly registered at BPN. A developer who presses you to pay before the PPJB legal threshold is met is a clear warning sign. Foreign buyers cannot hold SHM in any form, and nominee structures where an Indonesian national holds freehold on your behalf are not legally enforceable. The ownership routes that work are leasehold, Hak Pakai, or a PT PMA company, as covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>. This is general information, not legal or investment advice; have a licensed Indonesian notary review every document before you commit.</p>`,
    venues: [],
    heroImage: "/blog/property-inspection-checklist-clipboard.webp",
    gallery: [
      {
        url: "/blog/due-diligence-document-magnifying-glass.webp",
        alt: "Magnifying glass on financial documents representing property due diligence review",
        credit: "Anna Nekrashevich / Pexels",
        sourceUrl: "https://www.pexels.com/photo/magnifying-glass-on-top-of-document-6801648/",
      },
      {
        url: "/blog/off-plan-site-inspector-hardhat.webp",
        alt: "Construction site inspector in hard hat holding a clipboard at an off-plan development",
        credit: "Mikael Blomkvist / Pexels",
        sourceUrl: "https://www.pexels.com/photo/man-in-the-construction-site-holding-a-clipboard-8961004/",
      },
    ],
    citations: [
      { label: "Ministry of ATR/BPN: National Land Agency (official)", url: "https://www.atrbpn.go.id" },
      { label: "PP No. 16/2021: PBG building approval (BPK)", url: "https://peraturan.bpk.go.id/Details/161846/pp-no-16-tahun-2021" },
      { label: "Permen PUPR No. 11/PRT/M/2019: PPJB pre-sale agreement system (BPK)", url: "https://peraturan.bpk.go.id/Details/128152/permen-pupr-no-11prtm2019-tahun-2019" },
      { label: "Emerhub: Bali Criminalizes Rice Field Conversions (Governor's Instruction No. 5/2025)", url: "https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" },
      { label: "Indonesia OSS portal: NIB company verification", url: "https://oss.go.id" },
    ],
    faq: [
      {
        question: "How do I check the land certificate before buying in Bali?",
        answer:
          "Ask the seller for the original land certificate and have a licensed Indonesian notary (PPAT) cross-check it at the local Ministry of ATR/BPN office. The check confirms the registered owner, the exact plot boundaries, and any encumbrance on the title. Confirm the certificate type at the same time: SHM (freehold) is reserved for Indonesian citizens, while a PT PMA holds SHGB/HGB and a foreigner with a residence permit can hold Hak Pakai.",
      },
      {
        question: "What developer track record checks matter for off-plan in Bali?",
        answer:
          "Verify the developer's NIB (Business Identification Number) via Indonesia's OSS portal. Ask for the addresses of completed projects and confirm that those titles are cleanly registered at BPN with no outstanding encumbrances. A developer who cannot produce completed project certificates, or who asks for payment before the legal PPJB threshold under Permen PUPR No. 11/PRT/M/2019 is met, is a warning sign worth taking seriously.",
      },
      {
        question: "What is a PPJB and what should it include?",
        answer:
          "A PPJB (Perjanjian Pengikatan Jual Beli) is the binding pre-sale agreement for off-plan property. Under Article 10(1) of Permen PUPR No. 11/PRT/M/2019, it can only be signed once physical construction reaches at least 20 percent completion, the developer holds a clean land certificate, and the PBG building permit is in hand. The PPJB should include both parties' identities, a full description of the unit with its specification, the purchase price and staged payment schedule, the delivery date, penalties for late delivery, and a dispute resolution clause.",
      },
    ],
  },
  {
    slug: "villa-management-bali-remote-owners",
    title: "Managing a Bali Rental Villa from Abroad",
    category: "investment",
    imageUrl: "/blog/villa-rental-pool-management.webp",
    sortOrder: 23,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-04",
    metaDescription:
      "Manage a Bali rental villa from the US or Dubai using a local company. Fees run 20-30% of gross; they handle staff, OTAs, and monthly reports. PT PMA required.",
    body: `<p>You manage a Bali rental villa from the US or Dubai by appointing a local villa management company. They handle the daily operations: hiring and supervising staff, setting nightly rates across <a href="https://www.airbnb.com" data-external="true">Airbnb</a>, Booking.com, and Agoda through a channel manager, responding to guest inquiries, coordinating maintenance, and sending you a monthly profit and loss report. Your role is reviewing that report, approving any significant repair, and making decisions by email or a shared owner portal.</p><p>Before you take a single booking, you need the right legal structure in place. Individual foreigners cannot hold an accommodation license under Indonesian law. Rental income from a Bali villa must flow through a PT PMA (Perseroan Terbatas Penanaman Modal Asing) company that holds the Villa license under business code KBLI 55193 and a registered business identification number (NIB) issued through <a href="https://oss.go.id" data-external="true">Indonesia's OSS portal</a>. Operating without this structure puts your listing at risk of removal from OTA platforms and exposes you to fines. The PT PMA setup is covered in more detail in the <a href="/blog/foreigners-buy-property-bali">foreign ownership guide</a>.</p><p>A full-service management contract typically runs 20 to 30 percent of gross rental revenue. That fee covers staff management, dynamic pricing across OTA channels, guest communication and check-in logistics, routine maintenance oversight, and monthly owner reporting with dashboard access. Separately, OTA platforms take their own commission of roughly 15 percent per booking. Your net after both layers is roughly 55 to 65 percent of gross before utilities and ongoing maintenance costs, a structure comparable to hiring a property manager for a US short-term rental where similar all-in costs apply.</p><p>Listing directly on Airbnb without a management company is possible once your PT PMA and NIB are active, but most absentee owners find a professional manager delivers better occupancy. Dynamic pricing tools, timely guest review management, and on-site coordination eliminate the time-zone problem. Compare that to Dubai, where owners engage RERA-licensed managers under a simpler licensing path, but the day-to-day logic is the same: appoint a local operator, agree on a fee, and review the numbers each month. This is general information, not financial or legal advice.</p>`,
    venues: [],
    heroImage: "/blog/villa-rental-pool-management.webp",
    gallery: [
      {
        url: "/blog/digital-nomad-cafe.webp",
        alt: "Remote workers on laptops in a Bali coworking cafe, illustrating remote property management",
        credit: "Pexels",
        sourceUrl: "https://www.pexels.com/",
      },
      {
        url: "/blog/remote-owner-reviewing-reports.webp",
        alt: "Property owner reviewing monthly rental income reports on a laptop from a remote location",
        credit: "Karolina Grabowska / Pexels",
        sourceUrl: "https://www.pexels.com/photo/woman-using-a-laptop-4050290/",
      },
    ],
    citations: [
      {
        label: "Emerhub: Renting Out a Villa in Bali as a Foreign Investor",
        url: "https://emerhub.com/bali/renting-out-villa-in-bali/",
      },
      {
        label: "Cekindo: How to Rent a Villa in Bali Legally",
        url: "https://www.cekindo.com/blog/villa-in-bali",
      },
      {
        label: "Indonesia OSS Portal: NIB and accommodation business licensing",
        url: "https://oss.go.id",
      },
    ],
    faq: [
      {
        question: "What does a Bali villa management company do?",
        answer:
          "A villa management company handles everything an on-site owner would: hiring and supervising staff, managing OTA listings and nightly pricing, coordinating guest check-ins, resolving maintenance issues, and producing monthly financial statements. Most provide an owner portal so you can see bookings, maintenance logs, and cash flow without calling anyone.",
      },
      {
        question: "How much does Bali villa management cost?",
        answer:
          "Full-service villa management typically runs 20 to 30 percent of gross rental revenue. On top of that, OTA platforms such as Airbnb and Booking.com charge roughly 15 percent per booking. Your net after both layers is approximately 55 to 65 percent of gross before utilities and ongoing maintenance. Some companies offer tiered packages at lower percentages but exclude staff management or marketing. This is a general range, not a guarantee of any specific return.",
      },
      {
        question: "Can I list my Bali villa on Airbnb directly?",
        answer:
          "Yes, if your PT PMA company holds the Villa license (KBLI 55193) and a valid NIB registered through Indonesia's OSS portal. Without a PT PMA, a foreigner cannot legally hold the accommodation license required to take bookings on OTA platforms. Most remote owners appoint a management company to handle the listing because professional dynamic pricing and on-site guest coordination produce higher occupancy than self-management from overseas.",
      },
    ],
  },
  {
    slug: "bali-visa-property-owner-investor",
    title: "What Visa Do I Need to Live in Bali as a Property Owner?",
    category: "lifestyle",
    imageUrl: "/blog/bali-second-home-visa-passport-stamps.webp",
    sortOrder: 24,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-05",
    layoutVariant: "qa",
    metaDescription:
      "What visa do you need to live in Bali as a property owner? Buying alone does not give you a visa. The Second Home Visa E33 gives 5 or 10 year residency.",
    body: `<p>Buying a Bali villa does not automatically give you a visa. A leasehold or PT PMA property can be owned and rented out as an absentee investor, visiting on a standard tourist visa, without an Indonesian stay permit. The visa question becomes relevant when you want to live in Bali long-term. The main route for a property owner in that position is the Second Home Visa, index E33, which gives 5 or 10 years of residency without a local employer, a local sponsor or any minimum age requirement.</p><p>The E33 is established under Directorate General of Immigration Circular Letter IMI-0820.GR.01.01 of 2022 and applications go through <a href="https://evisa.imigrasi.go.id" data-external="true">Indonesia's official e-visa portal</a>. To qualify, you must show financial capacity within 90 days of the stay permit being issued: either an IDR 2 billion deposit (approximately USD 130,000) in a state-owned Indonesian bank such as Bank Mandiri, BNI or BRI, or ownership of Indonesian property worth at least USD 1,000,000. Most buyers at typical off-plan villa price points use the deposit route, since the property value threshold sits well above starting prices in the Kaba Kaba market. The visa does not allow local work or Indonesian income sources; remote income from an employer or business based abroad is treated separately. Your spouse, children and parents can join as dependents on the same application without providing a separate IDR 2 billion deposit.</p><p>A PT PMA company structure opens a second permit route. A shareholder who holds a minimum personal shareholding of IDR 10 billion inside the PT PMA can apply for an Investor KITAS, index E28A. That IDR 10 billion shareholding bar sits higher than, and separate from, the IDR 2.5 billion minimum paid-up capital required to incorporate the PT PMA itself, so the Second Home Visa deposit route tends to be simpler for most buyers. PT PMA setup details are in our <a href="/blog/pt-pma-setup-bali-property">PT PMA guide</a>.</p><p>One practical link between visa status and ownership structure: Hak Pakai, the right-to-use title a foreign individual can hold directly in their own name, requires a valid Indonesian stay permit. Leasehold (Hak Sewa) and PT PMA freehold do not carry that requirement, which is why most absentee investors use one of those two structures. After three continuous years on an E33, the holder can apply for a KITAP, Indonesia's permanent stay permit, which has no fixed-term renewal. Ownership routes are in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a> and our <a href="/blog/freehold-vs-leasehold-bali">freehold vs leasehold guide</a>. This is general information, not immigration or legal advice; confirm current requirements with a licensed Indonesian immigration agent and the OMA Townhouse team before you apply.</p>`,
    venues: [],
    heroImage: "/blog/bali-second-home-visa-passport-stamps.webp",
    gallery: [
      {
        url: "/blog/travel-documents-passport-visa-application.webp",
        alt: "Passport and travel documents on a fabric surface representing a visa application",
        credit: "Jakub Zerdzicki / Pexels",
        sourceUrl: "https://www.pexels.com/photo/32060712/",
      },
      {
        url: "/blog/bali-resort-terrace-outdoor-living.webp",
        alt: "Outdoor terrace with wicker seating at a Bali-style resort showing the day-to-day lifestyle for long-stay residents",
        credit: "Kevin Yung / Pexels",
        sourceUrl: "https://www.pexels.com/photo/34811443/",
      },
    ],
    citations: [
      {
        label: "Directorate General of Immigration: E33 Visa Rumah Kedua (official)",
        url: "https://www.imigrasi.go.id/wna/permohonan-visa-republik-indonesia/e33-visa-rumah-kedua",
      },
      {
        label: "Indonesia Official e-Visa portal (Direktorat Jenderal Imigrasi)",
        url: "https://evisa.imigrasi.go.id",
      },
      {
        label: "Emerhub: Indonesia Second Home Visa, Requirements and Application Process",
        url: "https://emerhub.com/indonesia/indonesian-second-home-visa/",
      },
      {
        label: "ILA Global Consulting: Setting Up a PT PMA in Indonesia",
        url: "https://ilaglobalconsulting.com/setting-up-pt-pma-indonesia/",
      },
    ],
    faq: [
      {
        question: "Can I get a Bali visa by buying property?",
        answer:
          "Not automatically. Buying a villa does not trigger a visa. The Second Home Visa (E33) has two financial routes: an IDR 2 billion deposit (approximately USD 130,000) in a state-owned Indonesian bank, or ownership of Indonesian property worth at least USD 1,000,000. Most buyers at typical off-plan Bali prices use the deposit route, since the property value threshold is above starting prices in the Kaba Kaba market.",
      },
      {
        question: "What is the Bali Second Home Visa and who qualifies?",
        answer:
          "The Second Home Visa, index E33, is a stay permit for foreigners who want to live in Indonesia for 5 or 10 years without working there locally. You qualify by showing either an IDR 2 billion bank deposit or USD 1 million in Indonesian property within 90 days of the permit being issued. A spouse, children and parents can join as dependents without a separate deposit. Applications go through Indonesia's official e-visa portal.",
      },
      {
        question: "Do I need a visa to rent out my Bali property?",
        answer:
          "No. A stay permit is not required to own or rent out a Bali villa as an absentee investor. The rental structure must still be legal: a PT PMA company holding the accommodation license under KBLI 55193, with a valid NIB from Indonesia's OSS portal. You can manage the rental remotely without holding an Indonesian visa and visit on a standard tourist entry.",
      },
    ],
  },
];
