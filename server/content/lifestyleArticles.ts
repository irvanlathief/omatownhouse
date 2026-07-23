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
    body: `<p>For a foreign investor choosing between Bali and Dubai, the clearest difference is ownership. In Dubai you can buy freehold as a foreigner in designated freehold zones, a right set out in the emirate's 2002 property reforms, and hold the title in your own name. In Bali you cannot hold freehold as an individual. You use leasehold, a Hak Pakai right-to-use title, or a PT PMA company, the same routes covered in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>.</p><p>Entry price is the next split. Dubai's established freehold districts tend to start higher in absolute terms. Emerging Bali areas such as Tabanan sit lower, which is part of the off-plan case. At OMA Townhouse, founding-release leasehold pricing starts at 159,000 USD and the PT PMA route starts at 299,000 USD. Units 04-12 will use revised release pricing.</p><p>Both markets draw international rental demand, so the question is less about which is busier and more about where your capital fits. Rental yields move with season, management quality and location, so treat any figure you read as a range rather than a promise.</p><p>Tax also differs. The UAE has no personal income tax, while Indonesia taxes rental income, so a Bali rental needs that built into the numbers. A Dubai buyer used to tax-free rental should plan for it rather than be caught out by it.</p><p>Neither market is universally better. Dubai offers direct freehold and a tax-light setup. Bali offers a lower entry point and a different lifestyle, with ownership handled through leasehold or a company. This is general information, not financial, legal or tax advice, so confirm current rules and pricing with a qualified adviser and the OMA Townhouse team.</p>`,
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
  {
    slug: "bali-property-financing-foreigners",
    title: "Can Foreigners Get Financing to Buy Bali Property?",
    category: "investment",
    imageUrl: null,
    sortOrder: 25,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-06",
    layoutVariant: "qa",
    metaDescription:
      "Bali property financing for foreigners: an Indonesian KPR mortgage requires KITAS. Most off-plan buyers use a developer payment plan instead.",
    body: `<p>Most foreign buyers fund a Bali property purchase through one of three routes: a developer payment plan, funds from their home market, or an Indonesian bank loan. For off-plan buyers the developer plan is the most common, because it requires no Indonesian residence permit and no local credit check. An Indonesian bank mortgage is possible, but the conditions rule it out for most absentee investors.</p><p>Indonesian bank mortgages, known as KPR, are available to foreign nationals who hold a valid KITAS or KITAP, the Indonesian temporary or permanent stay permit. The property must hold HGB title under a PT PMA company, since under <a href="https://peraturan.bpk.go.id/Home/Details/161848/pp-no-18-tahun-2021" data-external="true">ATR/BPN Ministerial Regulation 18 of 2021</a>, leasehold cannot be registered as bank collateral. The unit must be ready to occupy. In June 2025, <a href="https://www.thejakartapost.com/adv/2025/06/04/permata-bank-offers-new-foreign-mortgage-program-for-jakarta-property-buyers.html" data-external="true">Permata Bank launched Indonesia's first dedicated foreigner mortgage program</a>, the KPR iB IMBT WNA, offering up to 60 percent loan-to-value on properties worth at least IDR 2 billion, with a minimum monthly income of IDR 25 million and a loan tenor of 3 to 10 years. J Trust Bank, backed by a Japanese financial group, also offers KPR to foreign residents with KITAS. Across both products, expect a 30 to 40 percent down payment. Off-plan units under construction are excluded because there is no completed HGB title to register as collateral during the build.</p><p>Developer payment plans fill that gap for off-plan buyers. A deposit of roughly 10 to 30 percent secures the unit, with the balance paid in stages tied to verified construction milestones: foundation, structural frame, roofing and handover. The plan runs interest-free over 12 to 24 months, as <a href="https://www.exotiqproperty.com/blog/buying-off-plan-property-in-bali" data-external="true">Exotiq Property's off-plan guide</a> explains. No KITAS, bank credit history or Indonesian tax number is required, which is why most foreign off-plan buyers in Bali use this route.</p><p>If you prefer a lump-sum wire from your home country, all Indonesian property transactions settle in rupiah under Bank Indonesia Regulation 17/3/PBI/2015, covered in our <a href="/blog/buy-bali-off-plan-property-remotely">guide to buying off-plan remotely</a>. US-based buyers sometimes draw on a HELOC or cash-out refinance on US property and wire the proceeds to Indonesia, where the bank converts to IDR. UAE-based buyers typically transfer cash directly. In both cases, keep your PPJB and source-of-funds documentation on hand for the receiving bank. Ownership structures are in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>. This is general information, not financial, legal or tax advice; confirm your financing options with a licensed Indonesian notary and the OMA Townhouse team before you commit.</p>`,
    venues: [],
    heroImage: "/blog/mortgage-loan-rates-meeting.webp",
    gallery: [
      {
        url: "/blog/real-estate-floor-plan-banknotes.webp",
        alt: "Property agent holding banknotes over an off-plan floor plan, representing a developer payment plan for a Bali villa",
        credit: "Pavel Danilyuk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/7937704/",
      },
      {
        url: "/blog/currency-exchange-usd-bank.webp",
        alt: "Hands exchanging US dollars and local currency at a bank counter, representing an international funds transfer for a Bali property purchase",
        credit: "audy-of-course / Pexels",
        sourceUrl: "https://www.pexels.com/photo/18804128/",
      },
    ],
    citations: [
      {
        label: "Ministry of ATR/BPN Regulation 18 of 2021 (land rights and collateral rules)",
        url: "https://peraturan.bpk.go.id/Home/Details/161848/pp-no-18-tahun-2021",
      },
      {
        label: "The Jakarta Post: Permata Bank launches first foreigner mortgage program in Indonesia (June 2025)",
        url: "https://www.thejakartapost.com/adv/2025/06/04/permata-bank-offers-new-foreign-mortgage-program-for-jakarta-property-buyers.html",
      },
      {
        label: "ILA Global Consulting: How to Get a Loan as a Foreigner in Indonesia and Bali",
        url: "https://ilaglobalconsulting.com/how-to-get-a-loan-as-foreigner-in-indonesia-and-bali/",
      },
      {
        label: "Exotiq Property: Buying Off Plan Property in Bali",
        url: "https://www.exotiqproperty.com/blog/buying-off-plan-property-in-bali",
      },
    ],
    faq: [
      {
        question: "Can I get an Indonesian bank loan as a foreigner?",
        answer:
          "Yes, if you hold a valid KITAS or KITAP and the property carries HGB title under a PT PMA. Banks including Permata Bank, which launched a dedicated foreigner mortgage program in June 2025, and J Trust Bank offer KPR to foreign residents. Expect a 30 to 40 percent down payment. Off-plan units under construction do not qualify as collateral because there is no completed HGB title to register during the build.",
      },
      {
        question: "What developer financing options exist for Bali off-plan?",
        answer:
          "A construction-linked payment plan is standard: a deposit of 10 to 30 percent secures the unit, with the balance paid in interest-free stages at foundation, structural frame, roofing and handover. The plan typically spans 12 to 24 months and requires no KITAS, bank credit history or Indonesian tax number. This is the route most foreign off-plan buyers in Bali use.",
      },
      {
        question: "Can I use a home equity loan from the US to buy Bali property?",
        answer:
          "Yes. A HELOC or cash-out refinance on US property gives you a lump sum that you can wire to Indonesia, where it converts to IDR as required by Bank Indonesia Regulation 17/3/PBI/2015. There is no Indonesian restriction on the source of funds as long as the transaction settles in rupiah and you keep documentation of the underlying property purchase. This is general information, not financial advice.",
      },
    ],
  },
  {
    slug: "bali-vs-thailand-property-investment",
    title: "Bali vs Thailand Property for Foreign Investors",
    category: "investment",
    imageUrl: null,
    sortOrder: 26,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-07",
    layoutVariant: "qa",
    metaDescription:
      "Bali vs Thailand property investment: Thailand allows condo freehold within a 49% quota; Bali uses leasehold or PT PMA. Compare ownership, yields and rental tax.",
    heroImage: "/blog/phuket-island-beach-aerial.webp",
    body: `<p>For a foreign investor comparing Bali and Thailand, the first question is usually ownership, and the answer splits by property type. In Thailand, buying a condominium in your own name is straightforward: Section 19(2) of Thailand's Condominium Act B.E. 2522 (1979) allows foreign nationals to hold freehold title on condo units, provided total foreign-held floor area in the building stays within 49 percent of saleable space. That Chanote title deed registers in your name at the Thai Land Office. For a villa or any landed property in Thailand, the legal ceiling is a 30-year registered leasehold under the Thai Civil and Commercial Code, with renewals left as a contractual promise rather than a statutory right. Nominee company structures that were historically used to work around this have faced active prosecution in Thailand since 2024, with criminal penalties under the Land Code.</p><p>Bali does not offer direct individual freehold, but the villa holding structure extends further. A PT PMA company holds Hak Guna Bangunan (HGB) for up to 80 years under <a href="https://peraturan.bpk.go.id/Home/Details/161848/pp-no-18-tahun-2021" data-external="true">Government Regulation 18 of 2021</a>: an initial 30 years, extendable by 20, then renewable for 30. Company formation requires a minimum paid-up capital of IDR 2.5 billion, around USD 150,000, under BKPM Regulation 5 of 2025. For a buyer who wants a simpler entry, Bali leasehold (Hak Sewa) is available to any foreigner without a residence permit, and is commonly structured at 25 to 40 years per term with an extension clause built in. Ownership routes are covered fully in our <a href="/blog/freehold-vs-leasehold-bali">freehold vs leasehold guide</a>.</p><p>On yields, the two markets land in an overlapping published range, though the data sources differ. <a href="https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel" data-external="true">Colliers' Q1 2026 Bali Hotel report</a> puts Bali gross villa yields at roughly 4.4 to 6.9 percent. <a href="https://www.colliers.com/en-th/research/phuket-residential-report-2025_2026" data-external="true">Colliers' Phuket Residential Report 2025-2026</a> and Savills Thailand both cite 5 to 8 percent gross for managed villas in Phuket's west coast corridor. Both figures are before management fees, which typically run 20 to 30 percent of revenue in either market, local taxes, and operating costs. Treat them as a range, not a promise. This is not financial advice.</p><p>Rental tax is one area where Thailand holds a marginal advantage for a non-resident. A non-resident landlord in Thailand pays 15 percent withholding on gross rental income, and both the US-Thailand and UAE-Thailand double tax agreements can reduce or credit that charge, according to <a href="https://www.hlbthai.com/thai-rental-properties-and-personal-income-tax-2/" data-external="true">HLB Thailand</a>. Indonesia's PPh 26 charges a non-resident individual 20 percent of gross rental income. A PT PMA company pays 22 percent corporate income tax on net profit instead, with dividends then subject to a further 20 percent withholding, though Indonesia has double tax treaties with both the US and UAE. The full Bali rental tax picture is in our <a href="/blog/tax-for-foreign-property-owners-bali">tax guide</a>.</p><p>A supply-side difference matters if you are looking at Tabanan specifically. Bali's Governor's Instruction Number 5 of 2025, in force from December 2, 2025, bans the conversion of productive rice fields to tourism use across six regencies including Tabanan, per <a href="https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" data-external="true">Emerhub's coverage</a>. Phuket has no equivalent restriction and continues to absorb substantial new condominium supply, which has pressured yields in oversupplied corridors.</p><p>What the two markets offer is a different buyer profile, not a universal winner. Thailand's condo route delivers the simplest foreign freehold path for a buyer who wants a Chanote deed in their own name with no company formation required. Bali's PT PMA route gives a villa investor a longer statutory holding period and an off-plan entry price in emerging areas like Tabanan, in exchange for company setup and annual compliance costs. A US or UAE buyer with a preference for a private pool villa over a longer holding period tends to weigh those two variables against each other and decide based on budget and how much company overhead they are willing to manage. This is general information, not financial, legal, or tax advice. Confirm current ownership rules and licensing requirements with a qualified adviser in whichever market you buy. Foreign ownership and PT PMA details are in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>.</p>`,
    venues: [],
    gallery: [
      {
        url: "/blog/phuket-island-beach-aerial.webp",
        alt: "Aerial view of Koh Khai Nai island in Phuket, Thailand, with turquoise water and a sandy beach reached by a floating pier",
        credit: "Aykut Ekinci / Pexels",
        sourceUrl: "https://www.pexels.com/photo/aerial-view-with-drone-koh-khai-nai-island-phuket-thailand-beautiful-tropical-island-with-white-sand-beach-and-turquoise-clear-water-17422289/",
      },
      {
        url: "/blog/thailand-villa-sunset-property.webp",
        alt: "Villa property in Thailand at sunset, with a formal garden, tall trees and mountain views in the background",
        credit: "Optical Chemist / Pexels",
        sourceUrl: "https://www.pexels.com/photo/charming-tuscan-style-villa-at-sunset-in-thailand-31999010/",
      },
      {
        url: "/blog/phuket-coast-development-aerial.webp",
        alt: "Aerial view of Phuket's developed west coast hillside, showing the density of resort and villa construction along the bay",
        credit: "Pexels",
        sourceUrl: "https://www.pexels.com/photo/aerial-view-of-phuket-coast-in-thailand-12358328/",
      },
    ],
    citations: [
      {
        label: "Colliers Phuket Residential Report 2025-2026",
        url: "https://www.colliers.com/en-th/research/phuket-residential-report-2025_2026",
      },
      {
        label: "Colliers Quarterly Property Market Report Q1 2026 Bali Hotel",
        url: "https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel",
      },
      {
        label: "Savills Thailand: Foreign Buyer's Complete Guide to Thai Property Law (2025 Edition)",
        url: "https://www.savills.co.th/blog/article/225735/singapore-articles/the-foreign-buyer-s-complete-guide-to-thai-property-law-(2025-edition).aspx",
      },
      {
        label: "HLB Thailand: Thai Rental Properties and Personal Income Tax",
        url: "https://www.hlbthai.com/thai-rental-properties-and-personal-income-tax-2/",
      },
      {
        label: "Government Regulation PP No. 18 of 2021 (Hak Pengelolaan, Hak Atas Tanah)",
        url: "https://peraturan.bpk.go.id/Home/Details/161848/pp-no-18-tahun-2021",
      },
      {
        label: "Emerhub: Bali Criminalizes Rice Field Conversions (Governor's Instruction No. 5/2025)",
        url: "https://emerhub.com/news/bali-criminalizes-rice-field-conversions/",
      },
    ],
    faq: [
      {
        question: "Can foreigners own property in Thailand more easily than Bali?",
        answer:
          "For condominiums, yes. Thailand's Condominium Act B.E. 2522 lets a foreigner hold freehold on a condo unit within the 49 percent foreign quota per building, with the title deed registering in their own name. For villas and landed property, Thailand's legal ceiling is a 30-year leasehold with no statutory renewal guarantee, while Bali's PT PMA company structure holds Hak Guna Bangunan for up to 80 years. The simpler route depends on the asset type.",
      },
      {
        question: "Are Bali or Phuket rental yields higher for villas?",
        answer:
          "The published gross ranges overlap. Colliers puts Bali villa yields at roughly 4.4 to 6.9 percent for 2026, and Colliers and Savills Thailand both cite 5 to 8 percent gross for managed Phuket villas. Actual net yields in either market depend heavily on occupancy, management quality, and location, so treat any figure as a range. This is not financial advice.",
      },
      {
        question: "Is Thailand or Bali better for a short-term rental property?",
        answer:
          "Neither is universally better. A Phuket villa in a managed program can earn year-round on international OTA channels, and the condo freehold route gives a simpler title. A Bali villa in a supply-constrained area like Tabanan rents on spillover demand from Canggu with a lower off-plan entry price, but requires a PT PMA company and a Villa license under KBLI 55193 before taking bookings. The better fit depends on your budget, preferred holding structure, and how much company formation overhead you are willing to manage.",
      },
    ],
  },
  {
    slug: "bali-property-prices-2026",
    title: "Bali Property Prices in 2026: What the Market Shows",
    category: "investment",
    imageUrl: "/blog/bali-villa-cluster-aerial.webp",
    sortOrder: 27,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-08",
    layoutVariant: "qa",
    metaDescription:
      "Bali property prices in 2026 split by area: supply-constrained pockets hold value while oversupplied corridors compress. Canggu vs Tabanan land price gap explained.",
    body: `<p>Bali property prices are moving in two directions at once in 2026. Supply-constrained pockets of the southern corridors and newer locations like Tabanan are holding or rising in asking price. Oversupplied corridors, notably parts of central Canggu where villa density built up sharply in 2023 and 2024, have seen nightly rate compression that is feeding into resale sentiment. Indonesia's national residential property price index grew just 0.62 percent year on year in Q1 2026 per <a href="https://www.bi.go.id/en/publikasi/laporan/Documents/Residential-Property-Survey-Quarter-1-2026.pdf" data-external="true">Bank Indonesia's quarterly survey</a>, well below what foreign buyers often assume when they read headline reports about Bali.</p><p>Demand is not the problem. <a href="https://bali.bps.go.id/en/pressrelease/2026/02/02/718014/tourism-overview-of-bali-province--december-2025.html" data-external="true">BPS-Statistics Indonesia Bali Province</a> recorded 6,948,754 direct foreign arrivals in 2025, up 9.72 percent year on year, the strongest annual figure the island has recorded. That sustains rental occupancy in well-run villas and keeps buyer interest from the US and UAE in place. The issue is that supply in some corridors has outrun demand, so the market has split.</p><p><a href="https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel" data-external="true">Colliers' Q1 2026 Bali Hotel report</a> puts gross villa yields across the island in a 4.4 to 6.9 percent band, and notes that supply-constrained pockets are holding occupancy and rate. Oversaturated stretches, by contrast, face discounted nightly rates and weaker resale interest. A buyer comparing listings on headline price alone, without checking local rental occupancy in that specific pocket, is looking at the wrong variable.</p><p>On land, <a href="https://www.exotiqproperty.com/blog/bali-land-price-trends-what-investors-need-to-know" data-external="true">Exotiq Property's land price guide</a> lists prime Canggu freehold plots in a range of IDR 600 million to IDR 1.5 billion per are (one are equals 100 square metres), with top-corridor land above that. Tabanan, including the Kaba Kaba and Kediri areas, sits well below those levels. That land-basis gap is the core argument for off-plan buyers evaluating the area. Any listed figure is an asking price in a negotiated market, not a fixed rate, so treat it as a range.</p><p>The supply picture for Tabanan also changed in late 2025. Bali Governor's Instruction Number 5 of 2025, in force from 2 December 2025, bans the conversion of productive rice fields to tourism use across six regencies including Tabanan, as <a href="https://emerhub.com/news/bali-criminalizes-rice-field-conversions/" data-external="true">Emerhub</a> and <a href="https://thebalisun.com/balancing-land-conversion-and-tourism-development-to-be-key-focus-for-bali-in-2026/" data-external="true">The Bali Sun</a> have covered. Projects on non-agricultural land that already hold a building permit continue, but the instruction caps the future pipeline of competing sites on agricultural land. This is general information and not financial, tax or investment advice. Treat any price, yield or appreciation figure as a range at a point in time. Ownership structures for a foreign buyer are in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a> and rental tax in our <a href="/blog/tax-for-foreign-property-owners-bali">rental income tax guide</a>.</p>`,
    venues: [],
    heroImage: "/blog/bali-villa-cluster-aerial.webp",
    gallery: [
      {
        url: "/blog/bali-villa-rice-fields-aerial.webp",
        alt: "Aerial view of a Bali villa with a pool set beside rice fields, illustrating the land-use contrast in Tabanan",
        credit: "Tom Fisk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/aerial-view-of-luxurious-bali-villa-and-pool-36965360/",
      },
      {
        url: "/blog/bali-luxury-resort-aerial-pool.webp",
        alt: "Overhead aerial of a Bali luxury resort lap pool flanked by villa pavilions, showing the premium end of the island's property market",
        credit: "Lukas Jahn / Pexels",
        sourceUrl: "https://www.pexels.com/photo/aerial-view-of-bali-resort-pool-and-villas-35068661/",
      },
    ],
    citations: [
      {
        label: "Bank Indonesia: Residential Property Price Survey Q1 2026",
        url: "https://www.bi.go.id/en/publikasi/laporan/Documents/Residential-Property-Survey-Quarter-1-2026.pdf",
      },
      {
        label: "BPS-Statistics Indonesia Bali Province: Tourism Overview December 2025",
        url: "https://bali.bps.go.id/en/pressrelease/2026/02/02/718014/tourism-overview-of-bali-province--december-2025.html",
      },
      {
        label: "Colliers Quarterly Property Market Report Q1 2026 Bali Hotel",
        url: "https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-bali-hotel",
      },
      {
        label: "Exotiq Property: Bali Land Price Trends, What Investors Need to Know",
        url: "https://www.exotiqproperty.com/blog/bali-land-price-trends-what-investors-need-to-know",
      },
      {
        label: "Emerhub: Bali Criminalizes Rice Field Conversions (Governor's Instruction No. 5/2025)",
        url: "https://emerhub.com/news/bali-criminalizes-rice-field-conversions/",
      },
      {
        label: "The Bali Sun: Balancing Land Conversion and Tourism Development in 2026",
        url: "https://thebalisun.com/balancing-land-conversion-and-tourism-development-to-be-key-focus-for-bali-in-2026/",
      },
    ],
    faq: [
      {
        question: "Are Bali property prices still rising in 2026?",
        answer:
          "In supply-constrained pockets, yes. In oversupplied corridors like parts of central Canggu, nightly rate compression is feeding into resale sentiment. Indonesia's national residential property price index grew 0.62 percent year on year in Q1 2026 per Bank Indonesia, a modest figure. Bali's villa segment is more differentiated than that average suggests, and the direction depends heavily on which area and which product quality you are looking at.",
      },
      {
        question: "How have Canggu land prices changed over the past 5 years?",
        answer:
          "Established Bali agencies including Exotiq Property list prime Canggu freehold land in a range of IDR 600 million to IDR 1.5 billion per are (100 square metres), with top-corridor plots higher. Appreciation over the past five years has been significant relative to the regional baseline, but oversupply in some sub-corridors has since pressured nightly rates, which flows into weaker resale demand for lower-quality stock. Asking prices vary by exact location, zoning and road access. This is general information, not financial advice.",
      },
      {
        question: "What areas of Bali have the most property price growth?",
        answer:
          "No tracker publishes a consistent sub-regency breakdown with enough history to rank areas by annual appreciation. What Colliers documents for 2026 is that supply-constrained pockets are holding occupancy and value better than oversupplied corridors. Emerging locations like Tabanan also offer a significantly lower entry price than the Canggu corridor, which leaves more room for future movement from a lower base. Treat any projection you read as a range, not a forecast. This is not financial advice.",
      },
    ],
  },
  {
    slug: "usd-idr-exchange-rate-bali-property",
    title: "USD/IDR Exchange Rate and Your Bali Property Investment",
    category: "investment",
    imageUrl: null,
    sortOrder: 28,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-09",
    layoutVariant: "qa",
    metaDescription:
      "How does the USD/IDR exchange rate affect your Bali property investment? Priced in USD, settled in IDR, with rental income flowing in rupiah.",
    body: `<p>The USD/IDR exchange rate affects your Bali property investment at two points: when you buy, and when you repatriate rental income. The two effects run in opposite directions, and knowing which applies to which step keeps the numbers honest.</p><p>Off-plan villas in Bali are typically priced in US dollars for foreign buyers. The USD figure is the working reference, but <a href="https://peraturan.bpk.go.id/Details/135519/peraturan-bi-no-173pbi2015-tahun-2015" data-external="true">Bank Indonesia Regulation 17/3/PBI/2015</a> requires domestic transactions to settle in rupiah. Your payment wire converts to IDR at the <a href="https://www.bi.go.id/en/statistik/informasi-kurs/jisdor/default.aspx" data-external="true">Bank Indonesia JISDOR rate</a>, the Jakarta Interbank Spot Dollar Rate published daily on business days. The JISDOR tracked from roughly IDR 15,397 per dollar at end-2023 to IDR 16,095 at end-2024 per <a href="https://data.worldbank.org/indicator/PA.NUS.FCRF?locations=ID" data-external="true">World Bank annual exchange rate data</a>, and reached an all-time high of IDR 18,171 on 8 June 2026 per Bank Indonesia records. If your sale and purchase agreement specifies fixed IDR amounts at each payment milestone, a weaker rupiah means each milestone costs more in dollar terms.</p><p>Rental income runs in the opposite direction. Revenue from your Bali villa reaches the PT PMA company in rupiah, whether the guest paid in IDR or the booking platform converted from another currency. When you repatriate that profit, you exchange IDR back to dollars at the market rate. The rupiah has depreciated roughly 34 percent against the dollar since 2015 per World Bank data, an average of about 3 percent per year in nominal terms. <a href="https://www.knightfrank.co.id/research" data-external="true">Knight Frank Indonesia's 2024 research</a> puts gross rental yields for Bali daily-rental villas in a 7 to 12 percent band, measured in IDR. Once you apply annual IDR depreciation, management fees (commonly 20 to 30 percent of gross rental revenue) and Indonesian rental income tax, the USD-equivalent return narrows considerably from that headline range. Treat all yield figures as a range, not a guarantee, and this is not financial advice.</p><p>A natural hedge sits inside the structure already. Villa operating costs, including staff, maintenance and management fees, are denominated in rupiah. When IDR weakens, your local cost base softens in dollar terms alongside rental revenue, so day-to-day operations are self-balancing in IDR. The exchange rate only bites at the repatriation step. Most operators manage this by holding an IDR account at an Indonesian bank for operating float, timing remittances when the rupiah is relatively stronger, and converting each payment milestone separately rather than locking a rate up front. Formal hedging instruments for IDR, called Non-Deliverable Forwards, are available from major international banks but carry a cost tied to the Indonesia-US interest rate differential that typically makes them impractical for individual villa investors. A Dubai-based buyer holding UAE dirhams faces a second conversion layer; because the AED is pegged to the US dollar, AED-to-IDR movements track the USD/IDR rate directly.</p><p>Check the current JISDOR on bi.go.id before planning any milestone payment. Rental income tax and repatriation rules are in our <a href="/blog/tax-for-foreign-property-owners-bali">rental income tax guide</a>, and ownership structures are in our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a>. This is general information and not financial, legal or tax advice; confirm current exchange rates and your specific situation with a qualified Indonesian adviser before you commit.</p>`,
    venues: [],
    heroImage: "/blog/idr-rupiah-banknotes-denominations.webp",
    gallery: [
      {
        url: "/blog/usd-hundred-dollar-bills-stack.webp",
        alt: "US one-hundred dollar bills with Benjamin Franklin portrait, representing the investor capital currency in a Bali property purchase",
        credit: "Jonathan Borba / Pexels",
        sourceUrl: "https://www.pexels.com/photo/14820469/",
      },
      {
        url: "/blog/bali-villa-pool-tropical-greenery.webp",
        alt: "Private lap pool at a Bali villa surrounded by lush tropical garden and frangipani trees, showing the asset a foreign investor is buying",
        credit: "Mark Direen / Pexels",
        sourceUrl: "https://www.pexels.com/photo/36418268/",
      },
    ],
    citations: [
      {
        label: "Bank Indonesia JISDOR (Jakarta Interbank Spot Dollar Rate)",
        url: "https://www.bi.go.id/en/statistik/informasi-kurs/jisdor/default.aspx",
      },
      {
        label: "World Bank: Official Exchange Rate (Indonesia), IDR per USD annual average",
        url: "https://data.worldbank.org/indicator/PA.NUS.FCRF?locations=ID",
      },
      {
        label: "Bank Indonesia Regulation 17/3/PBI/2015: Mandatory Use of Rupiah (BPK)",
        url: "https://peraturan.bpk.go.id/Details/135519/peraturan-bi-no-173pbi2015-tahun-2015",
      },
      {
        label: "Knight Frank Indonesia: Research and market reports",
        url: "https://www.knightfrank.co.id/research",
      },
    ],
    faq: [
      {
        question: "What happens to my Bali investment if the rupiah weakens?",
        answer:
          "The effect depends on the step. At purchase, if your sale and purchase agreement specifies IDR settlement amounts at each milestone, a weaker rupiah means your USD buys more IDR and each milestone potentially costs fewer dollars than projected. For rental income, a weaker rupiah means each dollar of repatriated profit requires more IDR to buy, reducing the USD value of an IDR-denominated yield. The two effects offset each other partially, but the net position depends on how your SPA is structured and when you remit.",
      },
      {
        question: "Are Bali property prices quoted in USD or IDR?",
        answer:
          "Off-plan villa prices for foreign buyers are typically quoted in USD by developers and agents. Legal settlement must occur in rupiah under Bank Indonesia Regulation 17/3/PBI/2015. Most sale and purchase agreements name a USD reference price and specify conversion to IDR at the Bank Indonesia JISDOR rate on each payment date, bridging the gap between the marketing convention and the legal requirement.",
      },
      {
        question: "How do I manage currency risk in a Bali property investment?",
        answer:
          "The most practical steps are: keep an IDR operating account at an Indonesian bank to match local costs against local income; time remittances when the rupiah is relatively stronger against your home currency; and convert each payment milestone separately rather than fixing a single rate at signing. Formal Non-Deliverable Forward contracts for USD/IDR are available from major banks but the carry cost tied to the Indonesia-US interest rate differential typically makes them impractical for individual villa investors. This is general information, not financial advice.",
      },
    ],
  },
  {
    slug: "annual-costs-owning-bali-villa",
    title: "Annual Costs of Owning a Bali Villa as a Foreign Investor",
    category: "investment",
    imageUrl: null,
    sortOrder: 29,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-10",
    layoutVariant: "qa",
    metaDescription:
      "Annual costs of owning a Bali villa: PBB land tax, PT PMA compliance fees from USD 2,500/year, PLN electricity, insurance, and pool maintenance explained.",
    body: `<p>Owning a Bali villa through a PT PMA company carries six main annual cost lines: land and building tax (PBB-P2), PT PMA compliance, electricity, insurance, pool and garden maintenance, and staff wages. For a mid-range three-bedroom pool villa, the combined holding costs typically run USD 12,000 to 24,000 per year before villa management fees or capital expenditure reserves.</p><p>PBB-P2 (Pajak Bumi dan Bangunan) is the annual land and building tax. The PT PMA, as registered title holder, receives an annual tax notice (SPPT) from the local revenue authority (BAPENDA) and pays by 31 August each year. Under <a href="https://djpk.kemenkeu.go.id" data-external="true">Law No. 1 of 2022 (HKPD)</a>, each Bali regency sets its own rate up to a national ceiling. In Badung regency, which covers Canggu, Seminyak, and Kuta, the commercial rate is around 0.3 percent of the government-assessed value (NJOP). On a villa with an NJOP of IDR 5 billion (roughly USD 310,000), that comes to approximately IDR 15 million per year (about USD 940). The non-taxable base threshold is IDR 12 million. Tabanan rates are set by a separate local regulation and should be confirmed with BAPENDA Tabanan or a licensed Indonesian tax adviser before budgeting.</p><p>PT PMA annual compliance covers monthly PPh withholding tax returns, an annual corporate income tax filing (SPT Tahunan Badan, due by end of April), and quarterly Investment Activity Reports (LKPM) submitted to BKPM via <a href="https://oss.go.id" data-external="true">Indonesia's OSS portal</a>. Outsourcing these to a local accounting and compliance firm costs USD 2,500 to 5,800 per year for a single-asset villa company, according to <a href="https://ilaglobalconsulting.com/setting-up-pt-pma-indonesia/" data-external="true">ILA Global Consulting</a> and <a href="https://www.cekindo.com/blog/requirements-for-pt-pma" data-external="true">Cekindo</a>.</p><p>PLN electricity for rental villas falls under the commercial B-2 tariff at <a href="https://web.pln.co.id/pelanggan/tarif-tenaga-listrik" data-external="true">IDR 1,444.70 per kWh</a>. A three to four-bedroom pool villa consuming 1,500 to 5,000 kWh per month incurs annual electricity bills of roughly IDR 30 million to 87 million (about USD 1,900 to 5,400). Property All Risks (PAR) insurance runs roughly 0.2 percent of the insured building value per year. On a villa insured at IDR 5 billion to 10 billion, expect IDR 10 million to 20 million annually (about USD 625 to 1,250), available from providers including <a href="https://www.allianzinsurancebali.com/property-insurance/" data-external="true">Allianz Insurance Bali</a> and BCA Insurance.</p><p>Pool maintenance (professional cleaning visits two to three times per week including chemicals) runs IDR 1.5 million to 2 million per month. If the villa employs two permanent staff, total employer costs including wages, <a href="https://www.bpjsketenagakerjaan.go.id/en/penerima-upah.html" data-external="true">BPJS social security contributions</a> at around 10 percent of wages, and the mandatory annual THR bonus come to roughly USD 6,000 to 9,000 per year. These holding costs run whether the villa is occupied or not. Budget a capital expenditure reserve of 3 to 5 percent of property value per year for appliances, roofing, and pool equipment. Villa management fees of 20 to 30 percent of gross rental revenue, covered in the <a href="/blog/villa-management-bali-remote-owners">villa management guide</a>, sit on top of these fixed costs. This is general information, not financial or legal advice; confirm your cost profile with a licensed Indonesian tax adviser before committing.</p>`,
    venues: [],
    heroImage: "/blog/villa-annual-budget-planning.webp",
    gallery: [
      {
        url: "/blog/tropical-resort-villas-pool-beach.webp",
        alt: "Southeast Asian resort villas with infinity pool set among tropical greenery above a sandy beach, illustrating the type of property incurring annual holding costs",
        credit: "Quang Nguyen Vinh / Pexels",
        sourceUrl: "https://www.pexels.com/photo/photo-of-villas-near-beach-2476632/",
      },
      {
        url: "/blog/tropical-villa-garden-lawn.webp",
        alt: "White two-storey tropical villa with wooden balconies surrounded by a well-maintained green lawn, banana trees, and tropical planting",
        credit: "Quang Nguyen Vinh / Pexels",
        sourceUrl: "https://www.pexels.com/photo/14024968/",
      },
    ],
    citations: [
      {
        label: "Ministry of Finance DJPK: UU HKPD No. 1/2022 on regional fiscal relations (PBB-P2 framework)",
        url: "https://djpk.kemenkeu.go.id",
      },
      {
        label: "ILA Global Consulting: Setting Up a PT PMA in Indonesia (annual compliance costs)",
        url: "https://ilaglobalconsulting.com/setting-up-pt-pma-indonesia/",
      },
      {
        label: "Cekindo: PT PMA Requirements and Annual Obligations",
        url: "https://www.cekindo.com/blog/requirements-for-pt-pma",
      },
      {
        label: "PT PLN (Persero): Official Electricity Tariff Table (B-2 commercial rate)",
        url: "https://web.pln.co.id/pelanggan/tarif-tenaga-listrik",
      },
      {
        label: "OwnPropertyAbroad: Bali Villa Insurance Guide",
        url: "https://ownpropertyabroad.com/indonesia/bali/villa-insurance-in-bali/",
      },
      {
        label: "BPJS Ketenagakerjaan: Employer contribution rates for employees (official)",
        url: "https://www.bpjsketenagakerjaan.go.id/en/penerima-upah.html",
      },
    ],
    faq: [
      {
        question: "How much is the annual property tax (PBB) on a Bali villa?",
        answer:
          "The PBB-P2 rate is set by each Bali regency under Law No. 1 of 2022 (HKPD). In Badung regency (Canggu, Seminyak, Kuta), the commercial rate is around 0.3 percent of the government-assessed value (NJOP). On a villa with an NJOP of IDR 5 billion, that is roughly IDR 15 million per year (about USD 940). The non-taxable threshold is IDR 12 million. Tabanan rates are set separately by local regulation. The PT PMA receives an annual tax notice (SPPT) and pays by 31 August each year.",
      },
      {
        question: "What does PT PMA annual compliance cost in Indonesia?",
        answer:
          "For a single-asset villa company, outsourcing PT PMA compliance to a local accounting firm typically costs USD 2,500 to 5,800 per year. This covers monthly PPh withholding tax returns, the annual corporate income tax return (SPT Tahunan Badan), and quarterly LKPM investment reports to BKPM via the OSS portal. The higher end applies when nominee director services or a foreign director KITAS work permit renewal is included. ILA Global Consulting and Cekindo publish ranges in this band.",
      },
      {
        question: "What are the ongoing holding costs for a Bali investment villa?",
        answer:
          "For a mid-range three-bedroom pool villa held via PT PMA, the main annual holding costs are: PBB land tax (roughly IDR 6 million to 15 million), PT PMA compliance (USD 2,500 to 5,800), PLN commercial electricity (IDR 30 million to 87 million), property insurance at roughly 0.2 percent of insured value, pool maintenance (IDR 18 million to 24 million), and staff wages and BPJS if employing permanent staff. The combined total for a mid-range villa typically runs USD 12,000 to 24,000 per year before villa management fees. This is a general estimate, not financial advice.",
      },
    ],
  },
  {
    slug: "bali-vs-portugal-property-investment",
    title: "Bali vs Portugal Property for Foreign Investors",
    category: "investment",
    imageUrl: null,
    sortOrder: 30,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-11",
    layoutVariant: "qa",
    metaDescription:
      "How Bali and Portugal compare for foreign buyers: ownership rules, gross yields, transfer taxes, and what changed after Portugal ended its Golden Visa.",
    body: `<p>Both Bali and Portugal attract foreign property buyers, but the two markets work differently. In Portugal, US and UAE nationals can own freehold property directly in their own name with the same legal rights as a Portuguese citizen. In Bali, foreigners cannot hold freehold title (Hak Milik). The common routes are a leasehold of up to 25 years with a renewal option, or a PT PMA foreign company structure that holds a registered land right for up to 80 years under Indonesian government regulation.</p><p>On gross rental yield, Bali typically runs ahead. Established Bali agencies such as <a href="https://www.kibarer-property.com" data-external="true">Kibarer Property</a> cite gross yields of 8 to 15 percent for well-managed short-term rental villas in Canggu and Uluwatu. Portugal's Lisbon and Algarve markets average around 5 to 7 percent gross, according to <a href="https://www.globalpropertyguide.com/europe/portugal/rental-yields" data-external="true">Global Property Guide</a>. These are gross figures before management fees, taxes, and operating costs. Net returns in both markets are substantially lower. This is general information and not financial advice; actual returns depend on location, management quality, and occupancy.</p><p>Transaction costs differ. Portugal applies a 7.5 percent IMT transfer tax on purchases by non-residents, plus 0.8 percent stamp duty. Indonesia charges BPHTB at 5 percent on the buyer's side. Annual property taxes are light in both markets: <a href="https://www.pwc.pt/en/pwcinforfisco/tax-guide/2025/imi-aimi.html" data-external="true">Portugal's IMI</a> runs 0.3 to 0.45 percent of the government-assessed value; Indonesia's PBB effective rate is lower still. Where the two markets differ more sharply is rental income. Portugal taxes non-resident rental income at a flat 28 percent on net income. Indonesia withholds 20 percent on gross rent paid to a non-resident under Article 26 of the income tax law, a rate confirmed by the <a href="https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers" data-external="true">Indonesian Directorate General of Taxes</a>.</p><p>Portugal ended its real estate-based Golden Visa on 7 October 2023 under <a href="https://dre.pt/dre/detalhe/lei/56-2023-211449274" data-external="true">Law 56/2023</a>. Foreign buyers can still purchase freely, but the purchase no longer creates a path to EU residency. Portugal's NHR tax regime was also closed to new applicants at the end of 2023. Its replacement, the IFICI program, targets researchers and innovation workers and does not benefit passive rental investors, as covered by the <a href="https://www.ibanet.org/overview-Portugal-new-IFICI-regime" data-external="true">International Bar Association</a>. Bali's 5-year Second Home Visa is tied to demonstrating a fund balance rather than property ownership. For Bali ownership structures, see our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a> and our <a href="/blog/freehold-vs-leasehold-bali">leasehold vs freehold guide</a>.</p>`,
    venues: [],
    heroImage: "/blog/algarve-coastline-top-view.webp",
    gallery: [
      {
        url: "/blog/algarve-rocky-coast-drone.webp",
        alt: "Drone aerial of the Algarve rocky coastline in Portugal showing sea caves, ochre cliffs, and turquoise Atlantic water",
        credit: "Mo Eid / Pexels",
        sourceUrl: "https://www.pexels.com/photo/drone-shot-of-a-rocky-coast-of-algarve-portugal-24377407/",
      },
      {
        url: "/blog/lisbon-portugal-city-aerial.webp",
        alt: "Panoramic view of Lisbon, Portugal with red-tiled rooftops, pastel facades, and the Tagus estuary in the background",
        credit: "ClickerHappy / Pexels",
        sourceUrl: "https://www.pexels.com/photo/city-lisbon-houses-portugal-9253/",
      },
    ],
    citations: [
      {
        label: "Investropa: Portugal property foreign ownership rights for non-EU nationals (2026)",
        url: "https://investropa.com/blogs/news/portugal-foreigner-rights",
      },
      {
        label: "PwC Portugal 2025 Tax Guide: IMT (Municipal Property Transfer Tax)",
        url: "https://www.pwc.pt/en/pwcinforfisco/tax-guide/2025/imt.html",
      },
      {
        label: "Idealista Portugal: Portugal raises property transfer tax for non-resident buyers (December 2025)",
        url: "https://www.idealista.pt/en/news/property-for-sale-in-portugal/2025/12/09/71789-portugal-raises-property-transfer-tax-for-non-resident-buyers-what-you-need",
      },
      {
        label: "PwC Portugal 2025 Tax Guide: IMI (Annual Municipal Property Tax)",
        url: "https://www.pwc.pt/en/pwcinforfisco/tax-guide/2025/imi-aimi.html",
      },
      {
        label: "Global Property Guide: Gross rental yields in Portugal, Lisbon and Algarve",
        url: "https://www.globalpropertyguide.com/europe/portugal/rental-yields",
      },
      {
        label: "International Bar Association: Overview of Portugal's new IFICI regime",
        url: "https://www.ibanet.org/overview-Portugal-new-IFICI-regime",
      },
      {
        label: "Portuguese Republic Official Gazette: Lei 56/2023 (Mais Habitacao, Golden Visa end)",
        url: "https://dre.pt/dre/detalhe/lei/56-2023-211449274",
      },
      {
        label: "Indonesian Directorate General of Taxes: Income Tax Article 26 (non-resident withholding)",
        url: "https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers",
      },
    ],
    faq: [
      {
        question: "Can foreigners own property more easily in Portugal or Bali?",
        answer:
          "Portugal is simpler for direct ownership. US and UAE nationals can hold freehold title in their own name with no company or residency requirement. In Bali, foreigners cannot hold freehold; the main routes are a leasehold of typically 25 years plus a renewal, or a PT PMA foreign company structure. A PT PMA takes 4 to 8 weeks to set up and carries annual compliance costs of roughly USD 2,500 to 5,800.",
      },
      {
        question: "Are Bali or Portugal rental yields higher for villas?",
        answer:
          "Bali typically shows higher gross yields. Established Bali agencies cite 8 to 15 percent gross for well-managed short-term rental villas. Portugal's Lisbon and Algarve markets average around 5 to 7 percent gross. Net yields in both markets are substantially lower after management fees, taxes, and operating costs. These are ranges, not guarantees, and not financial advice.",
      },
      {
        question: "How does rental income tax compare for Bali vs Portugal?",
        answer:
          "Portugal taxes non-resident rental income at a flat 28 percent on net income (gross receipts minus allowable expenses). Indonesia withholds 20 percent on the gross rent paid to a non-resident under Article 26 of the income tax law. If you hold a Bali villa through a PT PMA company, the company pays 22 percent corporate income tax on net profit instead. Confirm your specific tax position with a qualified adviser before committing.",
      },
      {
        question: "Does buying property in Portugal still lead to EU residency?",
        answer:
          "No. Portugal ended its real estate-based Golden Visa on 7 October 2023 under Law 56/2023. Foreign nationals can still buy property freely, but a purchase no longer creates a path to EU or Schengen-area residency. The Golden Visa program continues via other qualifying routes such as investment funds and scientific research.",
      },
    ],
  },
  {
    slug: "retiring-to-bali-us-uae-investors",
    title: "Can I Retire in Bali? A Guide for US and UAE Investors",
    category: "lifestyle",
    imageUrl: null,
    sortOrder: 31,
    isInsight: false,
    author: "OMA Townhouse",
    publishedAt: "2026-07-12",
    heroImage: "/blog/kedungu-beach.jpg",
    metaDescription:
      "Yes, US and UAE citizens can retire in Bali using a Retirement KITAS, Silver Hair Visa or Second Home Visa. Visa options, costs and healthcare explained.",
    body: `<p>Yes, you can retire in Bali as a US or UAE citizen. The practical question is which visa fits your age, income and available capital, since Indonesia offers three distinct routes for long-term retirement residence.</p><p>The Retirement KITAS (E33F) is the standard annual permit for those aged 55 and over. Specialist firms such as <a href="https://emerhub.com/indonesia/retirement-visa-indonesia-guide/" data-external="true">Emerhub</a> and <a href="https://ilaglobalconsulting.com/retirement-visa-in-bali/" data-external="true">ILA Global Consulting</a> report that Indonesian immigration typically expects pension income in the range of USD $1,500 to $3,000 per month. The permit runs one year and renews annually; after four years you can apply for the KITAP, the closest thing to permanent residency for a foreign retiree in Indonesia.</p><p>If you are 60 or older, the Silver Hair Visa (E33E) covers five years without annual renewal in exchange for a USD $50,000 deposit in an Indonesian state bank and proof of USD $3,000 per month in pension income. The deposit stays in your account and earns interest.</p><p>The Second Home Visa (E33) removes the age requirement entirely. You place IDR 2 billion, around USD $130,000, in your own account at a state bank such as BNI, BRI or Mandiri, or you own Indonesian property worth at least USD $1 million under a Hak Pakai title. It runs five or ten years and does not require you to hire domestic staff. <a href="https://emerhub.com/indonesia/indonesian-second-home-visa/" data-external="true">Emerhub's Second Home Visa guide</a> covers the full application process and 90-day document window.</p><p>A comfortable single retirement in Bali typically costs USD $1,500 to $2,500 per month, covering a private villa, a mix of local and imported dining, and local transport, based on cost-of-living data from <a href="https://internationalliving.com/countries/indonesia/cost-of-living-in-bali/" data-external="true">International Living</a>. A Western lifestyle with frequent travel costs more.</p><p>Bali's private hospitals are more capable than many first-time visitors expect. <a href="https://bimcbali.com" data-external="true">BIMC Hospital</a> runs a 24-hour international emergency service and Siloam Hospitals Bali holds Joint Commission International accreditation, the global benchmark for hospital quality. Medical costs in Bali run roughly three to five times below US levels, though private international health insurance is still recommended and is a legal requirement under the Retirement KITAS.</p><p>US citizens receive Social Security in Indonesia through the <a href="https://www.ssa.gov/international/payments_outsideUS.html" data-external="true">SSA International Direct Deposit program</a>; the sign-up form is SSA-1199-OP36. Under the 1988 <a href="https://www.irs.gov/pub/irs-trty/indo.pdf" data-external="true">US-Indonesia tax treaty</a>, Social Security income is taxed only in the US, not in Indonesia. US citizens still file US taxes on worldwide income from abroad, and any Indonesian bank account that exceeds USD $10,000 at any point in the year triggers an annual FBAR filing. UAE citizens face no comparable home-country reporting obligation.</p><p>This is general information and not legal, visa or tax advice. Visa rules change, so confirm current requirements with a licensed Indonesian immigration consultant and a qualified adviser before you commit.</p>`,
    venues: [],
    gallery: [
      {
        url: "/blog/retired-couple-spa-wellness.webp",
        alt: "Retired couple relaxing together in a spa pool",
        credit: "cottonbro studio / Pexels",
        sourceUrl: "https://www.pexels.com/photo/an-elderly-couple-in-a-swimming-pool-7222576/",
      },
      {
        url: "/blog/senior-outdoor-dining-retirement.webp",
        alt: "Senior man enjoying a meal at an outdoor restaurant",
        credit: "RDNE Stock project / Pexels",
        sourceUrl: "https://www.pexels.com/photo/man-in-white-button-up-shirt-sitting-on-chair-with-his-coffee-5637630/",
      },
    ],
    citations: [
      { label: "Emerhub: Retirement Visa Indonesia Guide", url: "https://emerhub.com/indonesia/retirement-visa-indonesia-guide/" },
      { label: "Emerhub: Second Home Visa Indonesia", url: "https://emerhub.com/indonesia/indonesian-second-home-visa/" },
      { label: "ILA Global Consulting: Retirement Visa in Bali", url: "https://ilaglobalconsulting.com/retirement-visa-in-bali/" },
      { label: "US Social Security Administration: Payments Outside the US", url: "https://www.ssa.gov/international/payments_outsideUS.html" },
      { label: "IRS: US-Indonesia Income Tax Treaty", url: "https://www.irs.gov/pub/irs-trty/indo.pdf" },
      { label: "International Living: Cost of Living in Bali", url: "https://internationalliving.com/countries/indonesia/cost-of-living-in-bali/" },
    ],
    faq: [
      {
        question: "What does it cost to live in Bali in retirement?",
        answer:
          "A comfortable single retirement in Bali typically runs USD $1,500 to $2,500 per month, covering a private villa or apartment, a mix of local and imported dining, and local transport. A Western lifestyle with frequent travel will cost more. Budget-focused retirees eating mainly at local warungs and renting in quieter areas can live on closer to USD $1,200 to $1,500 per month.",
      },
      {
        question: "Is Bali a good place to retire for US citizens?",
        answer:
          "Many US retirees find the cost of living, year-round climate, access to private international hospitals and the available visa options make Bali a practical retirement base. The main considerations are the ongoing US tax obligation on worldwide income, the FBAR requirement for Indonesian bank accounts, and finding the right visa structure. None of these are barriers, but each needs a qualified adviser to handle correctly.",
      },
      {
        question: "Can I retire to Bali on a Second Home Visa?",
        answer:
          "Yes. The Second Home Visa (E33) has no minimum age and runs five or ten years without annual renewal. You qualify by placing IDR 2 billion, roughly USD $130,000, in a state-owned Indonesian bank in your own name, or by owning Indonesian property worth at least USD $1 million under a Hak Pakai title. The deposit stays yours and earns interest.",
      },
    ],
  },
  {
    slug: "hak-pakai-bali-foreign-buyers",
    title: "What Is Hak Pakai? Bali Property Ownership for Foreigners",
    category: "investment",
    imageUrl: null,
    sortOrder: 32,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-13",
    heroImage: "/blog/property-title-handshake-documents.webp",
    metaDescription:
      "Hak Pakai is the only title foreigners can hold directly in Bali. Learn eligibility, duration up to 80 years, and how it compares to leasehold.",
    body: `<p>Hak Pakai, Indonesian for "right of use," is the only land title a foreign individual can register in their own name at Indonesia's land office (BPN). Defined under PP 103/2015, it gives the holder a statutory recorded interest in the land rather than a private contract with the owner. To qualify you need a valid KITAS or KITAP; a tourist or visit visa does not meet the BPN requirement.</p><p>The title runs in three periods: 30 years on first grant, extendable by 20 years, then by a further 30 years, giving a practical ceiling of 80 years over the property's life. Each extension requires a valid Indonesian stay permit at the time of renewal, so uninterrupted permit renewal matters. The <a href="/blog/bali-visa-property-owner-investor">Second Home Visa (E33)</a> qualifies and, at five or ten years, keeps permit administration straightforward.</p><p>Two financial thresholds apply in Bali. Landed houses must be valued at a minimum of IDR 2 billion, roughly USD $125,000 at current exchange rates. Land area is capped at around 2,000 sqm per title. Each foreigner may hold one Hak Pakai title at a time. The transaction runs through a licensed PPAT (land deed official) who prepares the notarial deed and files the BPN registration.</p><p>The title is for residential use. Personal occupation and holiday use are permitted; earning commercial rental income under a personal Hak Pakai is not covered by the regulation. Operators who run villas as a rental business typically structure this through a <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a> registered with the correct KBLI business code.</p><p>Compared with leasehold, Hak Pakai is a registered BPN title, giving a stronger legal position, but it requires an active permit, a minimum purchase value, and is limited to one title per person for residential use. Leasehold is a private contract between two parties, requires no KITAS, carries no statutory minimum value, and suits investors who do not hold a continuous stay permit or who want to operate the property commercially. The right structure depends on residency plans and intended use.</p>`,
    venues: [],
    gallery: [
      {
        url: "/blog/property-legal-document-review.webp",
        alt: "Professional reviewing legal property documents at a desk",
        credit: "Pexels",
        sourceUrl: "https://www.pexels.com/photo/7821683/",
      },
      {
        url: "/blog/bali-villa-pool-tropical-bale.webp",
        alt: "Aerial view of a Bali villa pool surrounded by tropical gardens and thatched bale pavilions",
        credit: "Michael Block / Pexels",
        sourceUrl: "https://www.pexels.com/photo/3225531/",
      },
    ],
    citations: [
      { label: "PP 103/2015: Indonesian Government Regulation on Foreign Individual Property Ownership", url: "https://peraturan.bpk.go.id/Details/5547/pp-no-103-tahun-2015" },
      { label: "Emerhub: Laws and Regulations for Buying Property in Indonesia", url: "https://emerhub.com/indonesia/laws-and-regulations-for-buying-property-in-indonesia/" },
      { label: "Cekindo: Guide to Buying Land in Indonesia", url: "https://www.cekindo.com/blog/buying-land-indonesia" },
    ],
    faq: [
      {
        question: "How long does Hak Pakai last in Bali and can it be extended?",
        answer:
          "Under PP 103/2015, Hak Pakai runs for an initial 30 years, with a first renewal of 20 years and a second renewal of 30 years, for a maximum of 80 years over the property's life. Each extension requires a valid Indonesian stay permit at the time of renewal. A PPAT handles the extension paperwork and BPN re-registration.",
      },
      {
        question: "What visa do I need to hold Hak Pakai in Bali?",
        answer:
          "You need a valid KITAS (temporary stay permit) or KITAP (permanent stay permit). The Second Home Visa (E33), which runs five or ten years, qualifies and is popular among property buyers for its long validity and relatively straightforward renewal. A tourist or social visit visa does not satisfy the BPN requirement.",
      },
      {
        question: "Is Hak Pakai better than leasehold for a foreign property buyer in Bali?",
        answer:
          "It depends on your situation. Hak Pakai gives a registered BPN title, which is a stronger legal instrument than a private leasehold contract, and it runs up to 80 years. However, it requires an active KITAS or KITAP, a minimum property value of IDR 2 billion in Bali, and is limited to one title per person for residential use. Leasehold suits buyers who want more flexibility, do not hold a stay permit, or plan to operate the property commercially through a PT PMA structure.",
      },
    ],
  },
  {
    slug: "bali-tourist-levy-rental-income",
    title: "The Bali Tourist Levy: What Villa Owners Need to Know",
    category: "investment",
    imageUrl: null,
    sortOrder: 33,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-14",
    heroImage: "/blog/bali-ulun-danu-temple-lake.webp",
    metaDescription:
      "The Bali tourist levy (IDR 150,000) is paid by the guest, not the villa owner. Learn how the PWA is collected, who enforces it, and what it means for your rental yield.",
    body: `<p>The Bali tourist levy is paid by the arriving foreign visitor, not by the villa owner. If you own or plan to own a rental villa in Bali, the levy does not reduce your rental income. It is a guest-side cost of IDR 150,000, roughly USD 10, charged once per visit to Bali regardless of how long the stay is.</p><p>The levy, officially called the Pungutan Wisatawan Asing (PWA), was introduced on 14 February 2024 under <a href="https://jdih.baliprov.go.id/produk-hukum/peraturan-perundang-undangan/perda/29179" data-external="true">Bali Provincial Regulation No. 6 of 2023</a>, titled "Levies for Foreign Tourists for the Protection of Culture and Natural Environment of Bali." Guests pay via the <a href="https://lovebali.baliprov.go.id" data-external="true">official LoveBali portal</a> before or during their trip, or at cashless counters in the arrivals hall at Ngurah Rai International Airport. Payment produces a QR code sent by email, which some hotels and villas ask to see at check-in.</p><p>Hotels, registered travel agents, and certain tourism operators are authorized to collect the levy on behalf of guests, earning a commission of up to 3 percent. If your villa is managed by a professional management company, ask whether they are registered as a PWA collection point. Collecting for guests can simplify the guest experience while generating a small administrative fee of up to IDR 4,500 per stay.</p><p>In 2024, Bali collected IDR 318 billion (about USD 19.2 million) in levy revenue between February 14 and December 31, according to the <a href="https://bmc.baliprov.go.id/news/title/realisasi-pwa-2024-lampaui-target-sekda-dewa-indra-pastikan-teralokasi-sesuai-peruntukannya" data-external="true">Bali Media Center</a>. That came from roughly 2.1 million payers out of 6.3 million international arrivals, a compliance rate of about 33 percent. The Bali government has since introduced spot checks at major attractions including Tanah Lot and the Jatiluwih rice terraces. Levy funds are directed to traditional villages (desa adat), subak water cooperatives, and environmental programs across Bali's regencies.</p><p>For a yield calculation, a USD 10 arrival fee for the guest is unlikely to affect occupancy for a villa priced at several hundred dollars per night. The levy applies equally to every international visitor, whether they stay in a private villa, a hotel, or a homestay. For context on how Indonesian taxes affect your rental income as a foreign owner, see our guide on <a href="/blog/tax-for-foreign-property-owners-bali">rental income tax for Bali property owners</a>. This article is general information and not tax or legal advice.</p>`,
    venues: [],
    gallery: [
      {
        url: "/blog/balinese-dance-uluwatu-ceremony.webp",
        alt: "Balinese dancers in traditional gold and green costume perform at Uluwatu Temple split gate at sunset with the Indian Ocean behind them",
        credit: "Pragyan Bezbaruah / Pexels",
        sourceUrl: "https://www.pexels.com/photo/traditional-balinese-dance-at-uluwatu-temple-32877903/",
      },
      {
        url: "/blog/tourist-bali-candi-bentar-gate.webp",
        alt: "Female tourist with a straw hat stands before the ornate split gate (candi bentar) at the Gate of Heaven viewpoint in Bali with ocean panorama behind her",
        credit: "Kachonk Adventure / Pexels",
        sourceUrl: "https://www.pexels.com/photo/tourist-in-front-of-split-gateway-of-a-temple-17956745/",
      },
    ],
    citations: [
      {
        label: "Bali JDIH: Peraturan Daerah Provinsi Bali No. 6 of 2023 (Levies for Foreign Tourists)",
        url: "https://jdih.baliprov.go.id/produk-hukum/peraturan-perundang-undangan/perda/29179",
      },
      {
        label: "Disparda Bali: Official launch of the Pungutan Wisatawan Asing (February 2024)",
        url: "https://disparda.baliprov.go.id/luncurkan-pwa-wisatawan-asing-masuk-bali-wajib-bayar-rp-150-ribu/2024/02/",
      },
      {
        label: "Bali Media Center: 2024 PWA collections exceeded target (official provincial report)",
        url: "https://bmc.baliprov.go.id/news/title/realisasi-pwa-2024-lampaui-target-sekda-dewa-indra-pastikan-teralokasi-sesuai-peruntukannya",
      },
      {
        label: "LoveBali: Official Foreign Tourist Levy FAQ and payment portal",
        url: "https://lovebali.baliprov.go.id/faq",
      },
    ],
    faq: [
      {
        question: "Does the Bali tourist levy reduce my rental yield as a villa owner?",
        answer:
          "No. The Bali tourist levy (IDR 150,000, roughly USD 10) is paid by the arriving foreign guest, not by the property owner. It is a one-off arrival fee that does not appear in your rental accounts or reduce your gross rental income. At USD 10 per visit, the levy is unlikely to deter guests from booking a villa that costs several hundred dollars per night.",
      },
      {
        question: "Who pays the Bali tourist levy, the guest or the owner?",
        answer:
          "The guest pays it. Under Bali Provincial Regulation No. 6 of 2023, every international visitor entering Bali must pay IDR 150,000 once per trip. The obligation sits with the traveller, not the accommodation operator. Villa management companies that are registered as collection points can pay on behalf of guests and earn a commission of up to 3 percent.",
      },
      {
        question: "How is the Bali tourist levy collected and enforced?",
        answer:
          "Guests pay via the official LoveBali portal (lovebali.baliprov.go.id) before or during their trip, or at cashless counters in the arrivals area at Ngurah Rai International Airport. After payment, a QR code is sent by email as proof. Hotels and registered operators can collect on arrival. The Bali government conducts spot checks at major attractions including Tanah Lot and the Jatiluwih terraces.",
      },
    ],
  },
  {
    slug: "off-plan-villa-construction-timeline-bali",
    title: "How Long Does It Take to Build an Off-Plan Villa in Bali?",
    category: "investment",
    imageUrl: null,
    sortOrder: 34,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-15",
    heroImage: "/blog/tropical-villa-frame-under-construction.webp",
    metaDescription:
      "A Bali off-plan villa takes 12 to 18 months from contract to handover. Learn the construction phases, what causes delays, and what your PPJB should include.",
    body: `<p>A Bali off-plan villa typically takes 12 to 18 months from contract signing to handover when you include design, permitting, and construction. A compact two-bedroom build with a small pool usually finishes toward the lower end of that range. A larger multi-bedroom villa with full landscaping and an outdoor pavilion commonly runs 16 to 18 months.</p><p>Before groundbreaking, the developer needs a PBG (Persetujuan Bangunan Gedung), Indonesia's building approval. Under <a href="https://peraturan.bpk.go.id/Details/161846/pp-no-16-tahun-2021" data-external="true">PP 16/2021</a>, the statutory review is 28 working days from a complete application, but the KKPR (spatial conformity clearance) and certified architectural drawings must be in hand first. In practice, the full pre-construction phase is 2 to 3 months. This is time the developer works through in parallel with early payment milestones, not time you sit idle after signing.</p><p>Once groundbreaking starts, the build moves through five stages: foundation (1 to 2 months), structural work and walls (3 to 4 months), roofing (1 month), MEP fitout and finishing (2 to 3 months), then pool and landscaping, which usually run alongside finishing. Construction from slab to handover is 8 to 12 months for most villa footprints, according to established Bali villa builders and advisers who track these projects.</p><p>The rainy season, roughly November to April, is the biggest schedule risk. Foundation excavation can flood and concrete curing slows in heavy rain; some builders report foundation phases running 20 to 40 percent longer when groundbreaking falls in the wet season. Starting groundbreaking in the dry season, May to October, gives the project its best chance to hold its schedule. Material supply logistics and labor availability are secondary factors that a well-capitalized developer manages proactively.</p><p>A well-drafted <a href="/blog/bali-property-due-diligence-checklist">PPJB (sale-and-purchase agreement)</a> states a specific handover date, ties stage payments to named milestones such as foundation completion, structural completion, and practical completion, and includes a financial penalty clause that activates if the developer delivers late. Handover is formalized in a BAST (Berita Acara Serah Terima), after which the developer carries maintenance responsibility for 100 days. Have a licensed PPAT or property lawyer review the milestone schedule and delivery terms before you sign. This article is general information and not legal advice.</p>`,
    venues: [],
    gallery: [
      {
        url: "/blog/construction-supervisor-site-clipboard.webp",
        alt: "Property inspector in a white hard hat and business attire reviewing notes on a clipboard at a construction site",
        credit: "Pavel Danilyuk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/7937689/",
      },
      {
        url: "/blog/construction-worker-cement-tropical-site.webp",
        alt: "Construction worker carrying a cement bag on their head at a tropical house building site with a concrete mixer and lush greenery in the background",
        credit: "Kenneth Surillo / Pexels",
        sourceUrl: "https://www.pexels.com/photo/28427819/",
      },
    ],
    citations: [
      {
        label: "PP No. 16 Tahun 2021: Building Permit (PBG) statutory review timeline (28 working days)",
        url: "https://peraturan.bpk.go.id/Details/161846/pp-no-16-tahun-2021",
      },
      {
        label: "Emerhub: Building a Villa in Bali - Cost, Key Considerations, and Process",
        url: "https://emerhub.com/bali/building-a-villa-in-bali-and-what-you-need-to-know/",
      },
      {
        label: "Emerhub: PBG Building Permit in Bali - Application, Documents, Cost, and Timeline",
        url: "https://emerhub.com/bali/building-permit-pbg/",
      },
      {
        label: "Cekindo: Buy House in Indonesia - Sale and Purchase Agreement (PPJB) guide",
        url: "https://www.cekindo.com/blog/buy-house-indonesia-agreement",
      },
    ],
    faq: [
      {
        question: "What causes off-plan delays in Bali and how can buyers protect themselves?",
        answer:
          "The rainy season from November to April is the main risk. Heavy rain slows foundation excavation and concrete curing, and some builds report foundation phases running 20 to 40 percent longer when groundbreaking falls in the wet season. Starting construction in the dry season, May to October, helps. On the contract side, a PPJB with a named delivery date, milestone-linked stage payments, and a late-delivery penalty gives you legal recourse if the developer falls behind schedule.",
      },
      {
        question: "How many months does it take from contract to handover for a Bali off-plan villa?",
        answer:
          "Budget 12 to 18 months from contract signing to handover. Design and permitting takes roughly 2 to 3 months, and construction from groundbreaking to practical completion is 8 to 12 months. A compact two-bedroom villa finishes toward the lower end of that range. A larger build with full landscaping, outdoor pavilion, and pool runs toward the higher end.",
      },
      {
        question: "What should the PPJB say about construction milestones and the delivery date?",
        answer:
          "Your PPJB should state a specific handover date, not only a construction period. Stage payments should tie to named milestones, such as foundation complete, structural complete, roofing complete, and practical completion, rather than to calendar dates alone. The agreement should also include a financial penalty for late delivery and specify the 100-day defects period that begins after the BAST (Berita Acara Serah Terima) handover document is signed. Ask a licensed PPAT or property lawyer to review these terms before you sign.",
      },
    ],
  },
  {
    slug: "bali-villa-property-insurance",
    title: "Bali Villa Insurance: What Foreign Owners Need",
    category: "investment",
    imageUrl: null,
    sortOrder: 35,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-16",
    heroImage: "/blog/villa-insurance-policy-review.webp",
    metaDescription:
      "Bali villa property insurance: what PSAKI covers, why earthquake and flood riders matter, how much it costs, and how foreigners qualify as policyholders.",
    body: `<p>A Bali villa needs at minimum a PSAKI fire policy, which covers fire, lightning, explosion, and smoke, plus two riders most owners overlook: EQVET for earthquake, volcanic eruption, and tsunami, and FTSWD for flood and storm. Earthquake cover matters because standard PSAKI and Property All Risk (PAR) policies both exclude seismic events by default, and Indonesia sits directly on the Pacific Ring of Fire.</p><p>Indonesian property insurance is governed by <a href="https://www.ojk.go.id/en/kanal/iknb/pages/asuransi.aspx" data-external="true">OJK (Otoritas Jasa Keuangan)</a> under Law No. 40 of 2014, with policy standards set by AAUI (Asosiasi Asuransi Umum Indonesia). The base PSAKI covers five named perils: fire, lightning, explosion, aircraft impact, and smoke. A Property All Risk (PAR) policy adds riot, strike, and malicious damage, plus usually flood and storm, but the EQVET earthquake endorsement remains excluded even from PAR and must be added explicitly. Premium rates for earthquake cover are set by OJK Circular Letter SEOJK 6/2017, which establishes minimum and maximum rates by province and seismic zone. Bali falls in a high seismic risk zone, so earthquake premiums run higher than for properties in lower-risk parts of Indonesia.</p><p>Annual premiums for base property cover run roughly 0.1% to 0.35% of the insured value, with the earthquake rider added on top. For a villa insured at around IDR 2 billion, that puts the base annual premium in the range of IDR 2 million to IDR 7 million, depending on construction class, location, and the covers chosen. These are indicative market figures from Bali property advisers, not a binding quote. Get proposals from two or three OJK-licensed insurers or work with a licensed Indonesian insurance broker. This article is general information, not financial or insurance advice.</p><p>If you rent the villa short-term, add third-party liability cover (Tanggung Gugat Pihak Ketiga). It covers bodily injury or property damage to guests and neighbouring properties. Limits of IDR 500 million to IDR 2.5 billion are available, at an additional cost of roughly 0.1% to 0.3% of the chosen limit per year.</p><p>Both PT PMA companies and leasehold holders qualify as policyholders. A PT PMA is an Indonesian legal entity and can be named insured with any OJK-licensed insurer. A leasehold holder insures the building improvements representing their economic interest, even though the land title stays with the Indonesian landowner. One compliance note: a villa operating without a valid PBG (Persetujuan Bangunan Gedung) and SLF (Sertifikat Laik Fungsi) risks having a claim voided, since unlicensed commercial use can breach policy conditions. Get your <a href="/blog/bali-property-due-diligence-checklist">permits in order</a> before relying on cover. See also <a href="/blog/pt-pma-setup-bali-property">how to set up a PT PMA</a> if you are considering the corporate ownership route.</p>`,
    venues: [],
    gallery: [
      {
        url: "/blog/earthquake-damage-property.webp",
        alt: "Buildings destroyed by earthquake showing why earthquake insurance riders are essential for Bali villa owners on the Pacific Ring of Fire",
        credit: "Serkan Gonultas / Pexels",
        sourceUrl: "https://www.pexels.com/photo/destroyed-buildings-and-houses-in-town-in-turkey-after-earthquake-17142571/",
      },
      {
        url: "/blog/tropical-villa-flood-damage.webp",
        alt: "Tropical house surrounded by floodwater with palm trees illustrating flood risk for Bali villas during the wet season",
        credit: "Anoop VS / Pexels",
        sourceUrl: "https://www.pexels.com/photo/flooded-tropical-house-with-palm-trees-32442294/",
      },
    ],
    citations: [
      {
        label: "AAUI: Polis Standar Asuransi Kebakaran Indonesia (PSAKI) - Indonesian standard fire insurance policy",
        url: "https://aaui.or.id/polis-standar-asuransi-kebakaran-indonesia/",
      },
      {
        label: "OJK SEOJK No. 6/SEOJK.05/2017: mandatory minimum and maximum premium rates for property insurance by zone",
        url: "https://ojk.go.id/id/kanal/iknb/regulasi/asuransi/surat-edaran-ojk/Pages/Surat-Edaran-Otoritas-Jasa-Keuangan-Nomor-6-SEOJK.05-2017.aspx",
      },
      {
        label: "AAUI: Polis Standar Asuransi Gempa Bumi Indonesia (PSAGBI) - earthquake insurance standard policy wording",
        url: "https://aaui.or.id/wp-content/uploads/2025/10/9-PSAGBI-rev-dispute-2021.pdf",
      },
      {
        label: "MSIG Indonesia: Home Shield Insurance - property coverage including earthquake and flood extensions",
        url: "https://msig.co.id/personal-insurance/home-shield-insurance",
      },
      {
        label: "Be Protected Indonesia: what insurance does a Bali villa owner need - coverage types and eligibility",
        url: "https://www.beprotectedindonesia.com/post/blog-villa-insurance-bali",
      },
      {
        label: "Bali Property Rules: villa licensing guide - PBG and SLF compliance and impact on insurance claims",
        url: "https://balipropertyrules.com/guides/bali-villa-licensing-foreigners/",
      },
    ],
    faq: [
      {
        question: "Does Indonesian property insurance cover earthquake and flood?",
        answer:
          "No, not by default. The standard PSAKI fire policy covers fire, lightning, explosion, aircraft impact, and smoke only. Earthquake, volcanic eruption, and tsunami must be added as a separate EQVET rider. Flood and storm (FTSWD) is excluded from PSAKI and must be added as an endorsement. A Property All Risk (PAR) policy typically includes flood and storm but still excludes the earthquake endorsement. Always confirm the exact policy wording with your insurer, as the EQVET exclusion applies even under PAR.",
      },
      {
        question: "How much does villa insurance cost in Bali?",
        answer:
          "Bali property advisers cite annual premiums of roughly 0.1% to 0.35% of the insured value for base property cover, before the earthquake rider is added. For a villa insured at around IDR 2 billion, that puts the base annual premium in the range of IDR 2 million to IDR 7 million, depending on construction class, location, and coverage breadth. The earthquake endorsement adds more, and third-party liability adds further if included. Get quotes from at least two OJK-licensed insurers. These figures are general estimates, not financial advice.",
      },
      {
        question: "Can I insure a Bali villa I own through a PT PMA?",
        answer:
          "Yes. A PT PMA is an Indonesian limited liability company, so it can enter insurance contracts with any OJK-licensed insurer and be named as policyholder. Leasehold holders can also insure their building improvements. In both cases, make sure the property holds a valid PBG (Persetujuan Bangunan Gedung) and SLF (Sertifikat Laik Fungsi), since operating without these building permits can give an insurer grounds to void a claim even if the policy was properly issued.",
      },
    ],
  },
  {
    slug: "canggu-vs-tabanan-property-investment",
    title: "Canggu vs Tabanan for Property Investment",
    category: "location",
    imageUrl: null,
    sortOrder: 36,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-17",
    heroImage: "/blog/canggu-bali-beachfront-development-aerial.webp",
    metaDescription:
      "Canggu vs Tabanan property: Tabanan land is 30-50% cheaper, rental yields are similar, but fewer new permits apply and the airport drive is longer.",
    body: `<p>Tabanan land costs 30 to 50 percent less than comparable plots in Canggu, and that price gap is the starting point for most buyers who compare the two areas. You get larger plots, a quieter setting with rice field views, and a lower entry price; in exchange, transaction liquidity is thinner and the drive from Kaba Kaba to Ngurah Rai Airport is around 55 to 65 minutes, roughly double the time from central Canggu.</p><p>Canggu, in Badung Regency, leads Bali in transaction volume with around a third of all island property sales. Prime land there runs from about IDR 1.5 billion to 3 billion per are, or roughly USD 90,000 to 180,000 per are at current exchange rates. Tabanan's southern villages, including Kaba Kaba, Munggu, and Nyambu, sit inside the same broad market catchment but with land prices 30 to 50 percent below, according to <a href="https://www.exotiqproperty.com/blog/bali-land-price-trends-what-investors-need-to-know" data-external="true">Exotiq Property</a>. Established beach clubs, coworking spaces, and high short-term rental occupancy underpin Canggu's premium. Tabanan's case is the opposite: more land per dollar, less proven guest demand, and a longer drive to the airport.</p><p>Gross rental yields for well-managed pool villas run broadly 8 to 12 percent annually in both areas. Canggu commands the upper part of that range more consistently because of deeper guest demand and repeat bookings. Tabanan properties close to <a href="/blog/what-is-nuanu-creative-city">Nuanu Creative City</a> and the Badung border are approaching similar figures as operators expand west. These are ranges, not guarantees, and net returns depend on management costs and occupancy. This is not financial advice.</p><p>A regulatory point worth verifying for any Tabanan project: from 2026, Bali's provincial government stopped issuing permits for new tourism development on productive agricultural land in six regencies, including Tabanan, per <a href="https://www.thejakartapost.com/indonesia/2025/09/17/bali-to-issue-regulationbanning-villa-and-hotel-construction-on-agricultural-land.html" data-external="true">The Jakarta Post</a>. Badung, which covers Canggu, is not in the restricted group. For off-plan buyers, confirming that a project holds its permits before this restriction took effect is a due diligence essential, not optional.</p><p>One infrastructure project that could reduce the distance gap is the planned <a href="https://www.balidiscovery.com/stalled-bali-toll-project-to-resume-in-2025/" data-external="true">Gilimanuk-Mengwi toll road</a>, a 96.84-km highway that will run through Tabanan Regency. The project has faced delays and was targeting completion in the late 2020s as of its most recent update. If delivered, drive times from Tabanan's southern villages to Denpasar and the airport would fall meaningfully.</p><p>The comparison comes down to certainty versus price. Canggu offers proven rental demand, easier resale, and a short airport run. Tabanan, and Kaba Kaba in particular, suits buyers focused on lower entry prices and larger plots, who are buying on a medium-term horizon and have confirmed the permits on their project.</p>`,
    venues: [
      { name: "Canggu (Batu Bolong Beach)", distance: "20-25 min", coords: "-8.6478,115.1385", url: "https://maps.google.com/?q=Canggu+Bali" },
      { name: "Kaba Kaba, Tabanan (OMA area)", distance: "", coords: "-8.576677,115.145663" },
      { name: "Ngurah Rai Airport (DPS)", distance: "55-65 min from Kaba Kaba", coords: "-8.7467,115.1667", url: "https://ngurahraiairport.com/" },
    ],
    showMap: true,
    mapCoords: "-8.620,115.147",
    gallery: [
      {
        url: "/blog/tabanan-bali-agricultural-land-aerial.webp",
        alt: "Aerial view of open rice fields and agricultural land in Bali, typical of the Tabanan countryside around Kaba Kaba",
        credit: "Tom Fisk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/35386125/",
      },
      {
        url: "/blog/bali-property-development-construction-site.webp",
        alt: "Aerial view of a large off-plan property development under construction in Bali showing foundation work and plotted land",
        credit: "Tom Fisk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/36422828/",
      },
    ],
    citations: [
      {
        label: "Exotiq Property: Bali land price trends and area comparison (Tier 2 agency report)",
        url: "https://www.exotiqproperty.com/blog/bali-land-price-trends-what-investors-need-to-know",
      },
      {
        label: "The Jakarta Post: Bali to issue regulation banning villa and hotel construction on agricultural land (Sep 2025)",
        url: "https://www.thejakartapost.com/indonesia/2025/09/17/bali-to-issue-regulationbanning-villa-and-hotel-construction-on-agricultural-land.html",
      },
      {
        label: "Bali Discovery: Gilimanuk-Mengwi toll road project update and resumption",
        url: "https://www.balidiscovery.com/stalled-bali-toll-project-to-resume-in-2025/",
      },
      {
        label: "Invest Land Bali: Bali real estate market data and transaction volume by area (2026)",
        url: "https://investlandbali.com/bali-real-estate-market",
      },
    ],
    faq: [
      {
        question: "Why are Tabanan land prices lower than Canggu?",
        answer:
          "Tabanan lacks Canggu's beachfront location and established tourist infrastructure, so land there trades at 30 to 50 percent below Canggu prices. You get more land for your money and space for larger villas, but with fewer cafes, shops, and walkable beach access within the immediate neighbourhood.",
      },
      {
        question: "Is Tabanan or Canggu better for rental yield?",
        answer:
          "Both areas generate broadly similar gross yields for well-managed pool villas, in the range of 8 to 12 percent annually. Canggu's deeper guest market means it hits the upper end more reliably. Tabanan is closing that gap as management operators expand west, but Canggu still carries lower occupancy risk on average. These are ranges, not guarantees; this is not financial advice.",
      },
      {
        question: "How far is Tabanan from the airport vs Canggu?",
        answer:
          "Canggu is about 20 to 30 minutes from Ngurah Rai Airport under normal traffic. Kaba Kaba, in southern Tabanan, is around 55 to 65 minutes from the airport by car. Both drives extend during peak hours.",
      },
    ],
  },
  {
    slug: "indonesian-bank-account-foreign-investor",
    title: "Opening an Indonesian Bank Account as a Foreign Investor",
    category: "investment",
    imageUrl: null,
    sortOrder: 37,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-18",
    heroImage: "/blog/bank-counter-usd-to-local-currency.webp",
    metaDescription:
      "How foreign investors open an Indonesian bank account for Bali property: PT PMA corporate accounts, which banks accept foreigners, KITAS requirements, SWIFT transfers, and the USD 25,000 documentation rule.",
    body: `<p>A foreign investor buying Bali property almost always needs an Indonesian bank account. For buyers using a <a href="/blog/pt-pma-setup-bali-property">PT PMA structure</a>, the account comes before the purchase: paid-up capital must be deposited into a company bank account before a notary can transfer title.</p><p>There are two tracks. A personal savings account requires a valid passport plus a KITAS or KITAP (Indonesian residence permit), a local address, and a minimum initial deposit. Bank Negara Indonesia (BNI) sets that minimum at IDR 250,000; Bank Central Asia (BCA) and Bank Mandiri both require IDR 500,000. OCBC Indonesia and CIMB Niaga operate more flexible policies for some foreigners, occasionally accepting a passport alone for limited accounts.</p><p>For a PT PMA corporate account, the company must be fully incorporated first. Indonesian banks require the Ministry of Law and Human Rights approval of the deed of establishment, a Business Identification Number (NIB) from the OSS system, and a company tax registration number (NPWP). A foreign director must also hold a valid KITAS before any Indonesian bank will add them as an authorized signatory. With complete documents in hand, the account typically opens within one to four weeks. BCA, Bank Mandiri, BNI, and HSBC Indonesia all serve PT PMA clients.</p><p>Under BKPM Regulation No. 5 of 2025, the minimum paid-up capital for a new PT PMA is IDR 2.5 billion, roughly USD 150,000. That amount goes into the company account and is subject to a 12-month lock-up: it cannot be withdrawn except to pay for assets, construction, or verified operating costs declared through the OSS system.</p><p>Sending funds from abroad is handled via SWIFT. BCA uses code CENAIDJAXXX; Mandiri uses BMRIIDJAXXX. Transfers typically arrive in two to five business days. Bank Indonesia requires supporting documentation for any foreign currency purchase against Rupiah that exceeds the equivalent of USD 25,000 per month, so keep your sale and purchase agreement and proof of funds ready before wiring larger amounts. OCBC Indonesia offers multi-currency accounts, which lets you hold USD and convert to Rupiah at a time that suits your exchange-rate view.</p><p>This article is for general information only and is not financial or legal advice. Speak with a licensed Indonesian legal or tax professional before making decisions about company structure or banking.</p>`,
    venues: [],
    faq: [
      {
        question: "Do I need to be in Indonesia to open a PT PMA bank account?",
        answer:
          "The company's authorized signatory, typically the director, must appear in person at the bank. A foreign director must also hold a valid KITAS before the bank will register them as signatory, which means completing the KITAS process beforehand. Many Indonesia company formation firms handle PT PMA registration and bank account opening as a single service.",
      },
      {
        question: "Which Indonesian bank is best for a foreign property investor?",
        answer:
          "BCA and Bank Mandiri are the most widely used by foreign-owned companies in Bali. Both offer SWIFT international transfers and multi-currency facilities. OCBC Indonesia is a strong option if you want to hold USD alongside IDR, which gives you more control over when you convert funds.",
      },
      {
        question: "What is the USD 25,000 rule for sending money to Indonesia?",
        answer:
          "Bank Indonesia requires supporting documentation for any foreign currency purchase against Rupiah that exceeds the equivalent of USD 25,000 per month per sender. For a property payment, your bank will typically ask for the sale and purchase agreement and proof of funds before processing the transfer. This is a routine compliance step under Bank Indonesia foreign exchange regulations, not a bar on the transaction.",
      },
      {
        question: "How long is the PT PMA paid-up capital locked up after deposit?",
        answer:
          "Under BKPM Regulation No. 5 of 2025, the minimum paid-up capital of IDR 2.5 billion deposited into the PT PMA bank account is locked for 12 months. You can withdraw from it during that period only to pay for assets, construction, or verified operating expenses, and the company must submit a lock-up declaration through the OSS system at incorporation.",
      },
    ],
    gallery: [
      {
        url: "/blog/bank-officer-account-review.webp",
        alt: "Bank officer reviewing account documents with a foreign investor at a desk",
        credit: "Pexels",
        sourceUrl: "https://www.pexels.com/photo/7821671/",
      },
      {
        url: "/blog/international-currencies-usd-transfer.webp",
        alt: "Mixed US dollar and euro banknotes representing international fund transfers for overseas property purchases",
        credit: "Pexels",
        sourceUrl: "https://www.pexels.com/photo/8193975/",
      },
    ],
    citations: [
      {
        label: "Emerhub: Opening a Corporate Bank Account in Indonesia - Guide for Foreign Investors (Tier 2)",
        url: "https://emerhub.com/indonesia/opening-a-bank-account/",
      },
      {
        label: "XPND: Required Documents for PT PMA Incorporation in Indonesia 2026 (Tier 2)",
        url: "https://xpnd.co.id/blogs/required-documents-pt-pma-incorporation-indonesia-2026/",
      },
      {
        label: "Bank Indonesia: Foreign Exchange and Money Market Regulations (Tier 1)",
        url: "https://www.bi.go.id/en/peraturan/moneter/Pages/default.aspx",
      },
      {
        label: "BKPM / OSS: Investment Regulations including PT PMA Capital Requirements (Tier 1)",
        url: "https://oss.go.id/informasi/bkpm-regulasi",
      },
    ],
  },
  {
    slug: "bali-vs-lombok-property-investment",
    title: "Bali vs Lombok for Property Investment in 2026",
    category: "investment",
    imageUrl: null,
    sortOrder: 38,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-19",
    heroImage: "/blog/lombok-beach-kuta-pristine.webp",
    metaDescription:
      "Bali vs Lombok for foreign property investors in 2026: how ownership rules, tourism volume, entry prices, and resale liquidity compare on each island.",
    body: `<p>Both Bali and Lombok follow identical Indonesian national law on foreign property ownership, so the legal framework is the same on each island. The choice between them is not about what you can own but about what kind of market you are buying into: Bali is established and liquid; Lombok is earlier stage and carries more growth potential alongside more execution risk.</p><p>Foreigners on either island can hold property through a long-term leasehold (Hak Sewa), through Hak Pakai if they hold an Indonesian residence permit and plan to use the property personally, or through a <a href="/blog/pt-pma-setup-bali-property" data-external="false">PT PMA company</a> for commercial short-term rental under Hak Guna Bangunan title. Practical support for these structures is more mature and better tested in Bali, where notaries, legal firms, and accountants with foreign-client experience are more widely available.</p><p>On tourism, Bali recorded nearly 6.95 million direct international arrivals in 2025, a 9.72 percent increase on the prior year according to the <a href="https://bali.bps.go.id/en/pressrelease/2026/02/02/718014/tourism-overview-of-bali-province--december-2025.html" data-external="true">BPS Bali provincial statistics office</a>. Lombok's Zainuddin Abdul Madjid International Airport handled roughly 430,000 international arrivals in 2024 based on <a href="https://ntb.bps.go.id/en/statistics-table/2/NDkyIzI=/jumlah-kunjungan-wisata-mancanegara-ke-bandara-international-lombok-menurut-kebangsaan.html" data-external="true">BPS NTB data</a>. That gap in visitor volume means Bali landlords are drawing from a far larger pool of short-stay tenants, which directly supports occupancy stability. Lombok's numbers are growing from a low base, which can translate to faster percentage gains but also to higher occupancy risk in a slow year.</p><p>On price, prime Bali coastal land in areas like Canggu or Seminyak trades at a significant premium to comparable Lombok beachfront. The government-backed <a href="https://www.bkpm.go.id/en/info/announcements/the-mandalika-indonesia-tourism-development-corporation-itdc" data-external="true">Mandalika Special Economic Zone</a> on Lombok's south coast covers roughly 1,175 hectares and has received infrastructure financing from the Asian Infrastructure Investment Bank. That pipeline of resort openings, roads, and utilities has lifted land values in the Kuta Lombok and Mandalika corridor, narrowing part of the historic price gap with Bali, but entry prices in most of Lombok still sit well below comparable Bali addresses.</p><p>For a buyer who wants rental income, a track record of resales, and a broad choice of management operators, Bali is the more straightforward market. For a buyer prepared to hold for five years or more and comfortable with thinner short-stay liquidity in the near term, Lombok's lower entry cost and government-backed infrastructure investment offer a different risk and reward profile. Neither choice is a guaranteed return, and outcomes depend on location, management quality, and the overall direction of Indonesian tourism. This article is for general information only and is not financial or legal advice. Speak with a licensed Indonesian legal or tax professional before making any investment decision.</p>`,
    venues: [],
    faq: [
      {
        question: "Can foreigners own property in Lombok the same way as in Bali?",
        answer:
          "Yes. The same Indonesian national law applies on both islands. Foreigners can hold property through a long-term leasehold, through Hak Pakai with a valid Indonesian residence permit, or through a PT PMA company under Hak Guna Bangunan title for commercial rental. The practical difference is that Bali has a larger, more established network of notaries, legal firms, and accountants experienced with foreign buyers.",
      },
      {
        question: "Are Lombok property prices lower than Bali?",
        answer:
          "Generally yes, particularly outside the Mandalika SEZ corridor. Prime Bali coastal land in areas like Canggu and Seminyak commands a significant premium over comparable Lombok beachfront. The Mandalika development has pushed values up in southern Lombok, narrowing part of that gap in key zones, but most of the island still offers lower entry prices than Bali's established tourist areas.",
      },
      {
        question: "Which has higher rental yields, Bali or Lombok?",
        answer:
          "Gross yield projections in Lombok, particularly around the Mandalika corridor, are sometimes quoted higher than established Bali areas, partly because entry prices are lower relative to advertised nightly rates. However, Bali's much higher tourism volume, nearly 6.95 million international arrivals in 2025 versus around 430,000 for Lombok, means occupancy in Bali is typically more predictable. Yield figures on either island are highly dependent on location, management, and seasonality. This is not financial advice; ranges vary widely and are not guaranteed.",
      },
      {
        question: "What is the Mandalika SEZ and why does it matter for Lombok property?",
        answer:
          "The Mandalika Special Economic Zone is a 1,175-hectare government-backed tourism development on Lombok's southern coast, master-planned and operated by the state-owned Indonesia Tourism Development Corporation (ITDC). It includes international-standard roads, utilities, a MotoGP racing circuit, and a pipeline of resort openings. The AIIB has provided infrastructure financing of USD 248.4 million. Proximity to Mandalika has raised land values in the surrounding Kuta Lombok corridor, making it the main concentration of buyer activity on the island.",
      },
    ],
    gallery: [
      {
        url: "/blog/mandalika-circuit-lombok-aerial.webp",
        alt: "Aerial view of the Mandalika Circuit in Lombok's Special Economic Zone with the ocean and green hills in the background",
        credit: "Pexels / Afif Ramdhasuma",
        sourceUrl: "https://www.pexels.com/photo/aerial-view-of-mandalika-circuit-lombok-30013597/",
      },
      {
        url: "/blog/lombok-coastal-hills-turquoise.webp",
        alt: "Green coastal hills and turquoise water along the West Nusa Tenggara coastline of Lombok",
        credit: "Pexels / Captura Visual Moment",
        sourceUrl: "https://www.pexels.com/photo/scenic-view-of-west-nusa-tenggara-coastline-32332180/",
      },
    ],
    citations: [
      {
        label: "BPS Bali: Tourism Overview of Bali Province, December 2025 - 6.95M foreign arrivals (Tier 1)",
        url: "https://bali.bps.go.id/en/pressrelease/2026/02/02/718014/tourism-overview-of-bali-province--december-2025.html",
      },
      {
        label: "BPS NTB: Foreign Tourist Visits to Lombok International Airport by Nationality (Tier 1)",
        url: "https://ntb.bps.go.id/en/statistics-table/2/NDkyIzI=/jumlah-kunjungan-wisata-mancanegara-ke-bandara-international-lombok-menurut-kebangsaan.html",
      },
      {
        label: "BKPM / ITDC: The Mandalika - Indonesia Tourism Development Corporation (Tier 1)",
        url: "https://www.bkpm.go.id/en/info/announcements/the-mandalika-indonesia-tourism-development-corporation-itdc",
      },
      {
        label: "AIIB: Indonesia Mandalika Urban and Tourism Infrastructure Project - USD 248.4M loan (Tier 1)",
        url: "https://www.aiib.org/en/projects/details/2025/_download/indonesia/PIMR_SBF_Indonesia_P000069_No.12_January_2025_Public-Version.pdf",
      },
      {
        label: "ILA Global Consulting: Ultimate Guide to Buying Property in Lombok 2026 (Tier 2)",
        url: "https://ilaglobalconsulting.com/lombok-real-estate-guide-2026/",
      },
    ],
  },
  {
    slug: "bali-capital-gains-tax-foreign-seller",
    title: "Capital Gains Tax When Selling Bali Property as a Foreigner",
    category: "investment",
    imageUrl: null,
    sortOrder: 39,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-20",
    heroImage: "/blog/property-sale-taxes-usd-lightbox.webp",
    metaDescription:
      "Selling Bali property as a foreigner: the seller pays 2.5% PPh final with an NPWP, or 20% Article 26 without one. US and UAE treaty impacts explained.",
    body: `<p>When you sell Bali property as a foreigner, the main seller-side tax is a final income tax (PPh) of 2.5 percent of the gross sale price, established by <a href="https://datacenter.ortax.org/ortax/aturan/show/16100" data-external="true">Government Regulation No. 34 of 2016</a>. That rate applies only if you hold an Indonesian tax number, known as an NPWP. Without one, the <a href="https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers" data-external="true">Directorate General of Taxes</a> treats the proceeds as income to a non-resident and applies the Article 26 withholding rate of 20 percent instead.</p><p>The difference matters in practice. On a USD 250,000 sale, the gap between 2.5 percent and 20 percent is roughly USD 43,750. Register for an NPWP well before you find a buyer, not after. The PPAT notary cannot execute the transfer deed until the seller produces proof of PPh payment, so the tax must be settled before closing day.</p><p>The buyer pays a separate acquisition tax, BPHTB (Bea Perolehan Hak atas Tanah dan Bangunan), at 5 percent of the purchase value above the local exemption threshold. That comes out of the buyer's funds, not the seller's, but experienced buyers price it into their offers, so it affects overall deal economics.</p><p>US sellers face an added home-country layer. Indonesia and the United States have a tax convention listed in the <a href="https://www.irs.gov/businesses/international-businesses/indonesia-tax-treaty-documents" data-external="true">IRS treaty library</a>. The treaty can reduce Indonesian withholding in certain situations, but the US taxes its citizens on worldwide income regardless of where the property sits. Indonesian PPh paid is generally creditable against the US capital gains liability, though the net outcome depends on your holding period and personal rate. Get advice from a CPA with international property experience before you list.</p><p>UAE residents face a cleaner home-country picture. Indonesia and the UAE have a double taxation agreement, registered on the <a href="https://datacenter.ortax.org/ortax/treaty/show/87" data-external="true">Ortax treaty database</a>, that entered into force for income received from January 2022. The UAE levies no personal income tax on individuals, so once Indonesian PPh is settled the sale proceeds arrive without a second domestic tax.</p><p>Sellers who hold through a <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a> and exit via a share transfer rather than the property title directly face a different tax treatment. Gains are recognised at the company level, and separate withholding rules may apply under the relevant treaty. That route needs its own legal and tax analysis before you commit. This article is for general information only and is not financial, tax or legal advice; confirm your position with a qualified Indonesian tax professional before any sale.</p>`,
    venues: [],
    faq: [
      {
        question: "Do I pay the same seller tax as an Indonesian when selling Bali property?",
        answer:
          "With an NPWP (Indonesian tax number), yes. Both resident and non-resident sellers pay 2.5 percent PPh final on the gross sale price under Government Regulation No. 34 of 2016. Without an NPWP, the Directorate General of Taxes applies the Article 26 non-resident withholding rate of 20 percent instead, which is eight times higher.",
      },
      {
        question: "Do US citizens owe US capital gains tax on top of Indonesian PPh when selling Bali property?",
        answer:
          "Yes. The US taxes citizens on worldwide income regardless of where the property sits. Indonesian PPh paid can be credited against the US capital gains liability, but a residual US amount can remain depending on the gain size, holding period, and personal rate. A CPA with international property experience should review the position before the sale.",
      },
      {
        question: "How is selling via PT PMA shares different from a direct property sale in Bali?",
        answer:
          "Exiting through a PT PMA share transfer means the gain is recognised at the company level rather than on a direct property title transfer. Different withholding rules apply under the relevant tax treaty, and the overall tax burden varies by structure. This route requires specific legal and tax advice from an Indonesian adviser experienced with PT PMA disposals.",
      },
    ],
    gallery: [
      {
        url: "/blog/tax-calculation-sale-proceeds-notebook.webp",
        alt: "Person calculating property sale tax with a notebook and US dollar bills on a wooden desk",
        credit: "Pexels / Olia Danilevich",
        sourceUrl: "https://www.pexels.com/photo/close-up-of-hands-using-a-calculator-with-notebook-and-cash-5466812/",
      },
      {
        url: "/blog/sold-property-blueprints-hardhat.webp",
        alt: "Architectural blueprints with a SOLD sign and a hard hat on a sunlit surface, representing a completed property sale",
        credit: "Pexels / Thirdman",
        sourceUrl: "https://www.pexels.com/photo/blueprints-with-a-sold-sign-and-hard-hat-8470061/",
      },
    ],
    citations: [
      {
        label: "Government Regulation No. 34 of 2016: Final Income Tax on Property Transfers (PP 34/2016) - Ortax (Tier 1)",
        url: "https://datacenter.ortax.org/ortax/aturan/show/16100",
      },
      {
        label: "Directorate General of Taxes: Income Tax Article 26 - Non-Resident Withholding at 20% (Tier 1)",
        url: "https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers",
      },
      {
        label: "IRS: Indonesia Tax Treaty Documents - 1988 US-Indonesia Tax Convention (Tier 1)",
        url: "https://www.irs.gov/businesses/international-businesses/indonesia-tax-treaty-documents",
      },
      {
        label: "Ortax: Indonesia-UAE Double Tax Avoidance Agreement (Perpres No. 34/2021, effective Jan 2022) (Tier 1)",
        url: "https://datacenter.ortax.org/ortax/treaty/show/87",
      },
      {
        label: "ILA Global Consulting: Dubai to Bali - Indonesia-UAE Tax Treaty for Property Investors (Tier 2)",
        url: "https://ilaglobalconsulting.com/tax-treaty-dubai-bali/",
      },
    ],
  },
  {
    slug: "power-of-attorney-bali-property-purchase",
    title: "Using a Power of Attorney to Buy Bali Property from Abroad",
    category: "investment",
    imageUrl: null,
    sortOrder: 40,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-21",
    heroImage: "/blog/poa-notary-lawyer-desk-justice.webp",
    metaDescription:
      "A Surat Kuasa Khusus lets a foreign buyer complete a Bali property purchase remotely. US apostille path, UAE steps, and what the POA can and cannot sign.",
    body: `<p>Yes, you can complete most of a Bali property purchase from the US or Dubai using a Surat Kuasa Khusus, which translates as Special Power of Attorney. This document, governed by the Indonesian Civil Code (KUHPerdata, <a href="https://adcolaw.com/blog/understanding-power-of-attorney-functions-types-and-examples/" data-external="true">Articles 1792 to 1819</a>), authorises a named representative in Indonesia to sign property documents on your behalf. In practice that representative is an independent Indonesian lawyer. The scope of authority must be written out in full detail, because the PPAT (the land deed official) will reject any document that lists acts in vague or general terms.</p><p>If you sign the POA at home, the authentication path differs by country. US buyers benefit from Indonesia joining the Hague Apostille Convention in June 2022, established by <a href="https://www.allenandgledhill.com/sg/publication/articles/21911/apostille-convention-enters-into-force-for-indonesia" data-external="true">Presidential Regulation No. 2 of 2021</a>. You notarise the document before a US notary public, obtain an apostille from the relevant state Secretary of State, and then submit it to the Indonesian notary or PPAT. The process typically takes a few days. UAE buyers face extra steps because the UAE has not joined the Apostille Convention. The document must be attested with the UAE Ministry of Foreign Affairs and then legalised at the Indonesian Embassy in Abu Dhabi or the Consulate General in Dubai before it is valid in Indonesia.</p><p>Once authenticated, your representative can sign the PPJB (preliminary sale and purchase agreement) before a licensed notary, then appear before the PPAT to execute the AJB, which is the formal deed of sale and title transfer. The PPAT must file the title change with the National Land Agency (BPN) within seven working days of signing. Your lawyer must physically attend the PPAT appointment; the POA replaces your physical presence, not the presence of a competent authorised signatory.</p><p>A power of attorney authorises a process, not an ownership structure. Foreigners still cannot hold Hak Milik (freehold) in their own names regardless of how a POA is written. Valid structures remain leasehold, Hak Pakai for those with an Indonesian residency permit, or ownership through a <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a>. Never grant a POA to the seller's agent or the developer's recommended notary. Appoint your own independent Indonesian lawyer and confirm in writing that the lawyer's role is to represent your interests alone. This article is for general information only and is not legal advice; confirm your position with a qualified Indonesian lawyer before signing any property documents.</p>`,
    venues: [],
    faq: [
      {
        question: "Do I need a notarized power of attorney to buy property in Bali from the US or UAE?",
        answer:
          "Yes. In Indonesia the relevant instrument is a Surat Kuasa Khusus (Special Power of Attorney). US buyers notarise it and obtain an apostille from their state Secretary of State, since Indonesia joined the Hague Apostille Convention in June 2022. UAE buyers must go through UAE Ministry of Foreign Affairs attestation and then Indonesian Embassy legalisation, as the UAE has not joined the Apostille Convention.",
      },
      {
        question: "What does a Bali property power of attorney cover?",
        answer:
          "A properly drafted Surat Kuasa Khusus can authorise signing the PPJB (preliminary sale agreement) before a licensed notary, signing the AJB (deed of sale and title transfer) before the PPAT, paying transfer taxes, and filing the title update at the National Land Agency (BPN). Each act must be listed explicitly. A vague or general POA will be rejected by the PPAT.",
      },
      {
        question: "Can my Indonesian lawyer sign property documents on my behalf?",
        answer:
          "Yes, provided the POA is correctly authenticated and explicitly authorises each step. Your lawyer must physically appear before the PPAT to sign the AJB on your behalf. Appoint a lawyer who is independent of the seller, developer, and any agent, and confirm that the authority to act is clearly set out in the document.",
      },
    ],
    gallery: [
      {
        url: "/blog/poa-property-document-signing-formal.webp",
        alt: "Man in a suit signing a formal legal document at a desk, representing a power of attorney signing for a Bali property purchase",
        credit: "Pexels / Mikhail Nilov",
        sourceUrl: "https://www.pexels.com/photo/elegant-man-signing-documents-8730998/",
      },
      {
        url: "/blog/poa-legal-scales-gavel.webp",
        alt: "Scales of justice and a wooden gavel on a desk, representing the legal framework for Indonesian property transactions",
        credit: "Pexels / Sora Shimazaki",
        sourceUrl: "https://www.pexels.com/photo/close-up-photo-of-gavel-5669619/",
      },
    ],
    citations: [
      {
        label: "Allen & Gledhill: Apostille Convention Enters into Force for Indonesia (Presidential Regulation No. 2/2021) (Tier 2)",
        url: "https://www.allenandgledhill.com/sg/publication/articles/21911/apostille-convention-enters-into-force-for-indonesia",
      },
      {
        label: "ADCO Law: Understanding Power of Attorney in Indonesia - Types and Legal Basis (KUHPerdata Articles 1792-1819) (Tier 2)",
        url: "https://adcolaw.com/blog/understanding-power-of-attorney-functions-types-and-examples/",
      },
      {
        label: "Emerhub: Laws and Regulations for Buying Property in Indonesia as a Foreigner (Tier 2)",
        url: "https://emerhub.com/indonesia/laws-and-regulations-for-buying-property-in-indonesia/",
      },
      {
        label: "Apostille USA: Powers of Attorney Apostille Services for Indonesia - Hague Convention Process (Tier 2)",
        url: "https://apostille-usa.com/2024/04/powers-of-attorney-apostille-services-for-indonesia/",
      },
    ],
  },
  {
    slug: "short-term-rental-permit-bali-villa",
    title: "What Permit Does a Bali Villa Need to Rent Short-Term?",
    category: "investment",
    imageUrl: null,
    sortOrder: 41,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-22",
    heroImage: "/blog/bali-villa-short-term-rental-aerial.webp",
    metaDescription:
      "A Bali villa renting to guests needs a Pondok Wisata or Villa license via OSS. Foreign PT PMA owners face a regulatory Catch-22 under Permenpar 18/2016 and the new KBLI 2025 codes.",
    body: `<p>A Bali villa renting to guests by the night needs either a Pondok Wisata license (for Indonesian citizen owners) or, for a foreign-owned <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a>, a Villa accommodation license under Indonesia's OSS business registration system. Without one, the property cannot legally list on Airbnb, Booking.com, or any other platform under Ministerial Regulation Permenpar No. 6 of 2025.</p><p>The Pondok Wisata (KBLI code 55130) is Indonesia's standard short-term rental license, defined under <a href="https://peraturan.bpk.go.id/Details/171166/permenpar-no-18-tahun-2016" data-external="true">Permenpar No. 18 of 2016</a>. It covers residential properties rented to tourists on a nightly or weekly basis, with a ceiling of five bedrooms. Properties above that threshold require a Hotel Melati classification, which carries higher staffing and inspection standards. The license is issued through Indonesia's OSS portal as a Nomor Induk Berusaha (NIB) combined with a Sertifikat Standar, is valid for five years, and must be renewed. One restriction is non-negotiable: Permenpar 18/2016 limits the Pondok Wisata to Indonesian citizens. Foreigners cannot hold it in their own name.</p><p>A foreign investor must own and operate a Bali rental villa through a PT PMA company, as set out in our <a href="/blog/freehold-vs-leasehold-bali">ownership structure guide</a>. The difficulty is that the Villa code (KBLI 55193) most PT PMAs have historically used is formally reserved for cooperatives and Indonesian micro and small enterprises under Presidential Regulation No. 10 of 2021. A standard large-scale PT PMA cannot obtain KBLI 55193 through the OSS system in a straightforward way. New classification codes introduced by Peraturan BPS No. 7 of 2025 (effective December 2025) are expected to clarify the licensing path for PT PMAs in this situation, but the OSS implementation was still stabilising as of mid-2026. An independent Indonesian legal adviser can identify the current compliant route.</p><p>Before filing in OSS, the property needs three things in place: a PBG (the commercial building approval), an SLF (certificate of occupancy for commercial use), and confirmed tourism zone (pink zone) zoning under Bali's spatial plan. A villa in a residential or protected green zone cannot hold any short-term rental license.</p><p>Enforcement is no longer theoretical. On July 22, 2025, Bali's Governor personally oversaw the demolition of 48 unlicensed structures at Bingin Beach. Fines for unlicensed rental operation start at IDR 50 million. Foreigners running a rental business without PT PMA authorisation face deportation and an entry ban of one to six years. Operating through an Indonesian nominee to hold the license on a foreigner's behalf is illegal and since February 2026 carries criminal penalties under Bali's regional regulation Perda No. 4/2026. This is general information, not legal or financial advice; confirm your licensing position with a qualified adviser before listing your villa.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What is the difference between a Pondok Wisata and a hotel license in Bali?",
        answer:
          "A Pondok Wisata (KBLI 55130) covers residential properties of up to five bedrooms, is available to Indonesian citizens only, and is designed for owner-operated short-term rentals. Properties with six or more guest rooms need a Hotel Melati classification, which requires a formal company structure, additional staffing, and more stringent safety inspections. Both licenses are issued through Indonesia's OSS system as a NIB combined with a Sertifikat Standar.",
      },
      {
        question: "Can a PT PMA hold a short-term rental permit in Bali?",
        answer:
          "A PT PMA cannot hold a Pondok Wisata license, which is restricted to Indonesian citizens under Permenpar No. 18 of 2016. The Villa code (KBLI 55193) most PT PMAs have used is formally reserved for Indonesian micro and small enterprises under Presidential Regulation No. 10 of 2021, creating a regulatory conflict for foreign-owned companies. New KBLI codes introduced in December 2025 under Peraturan BPS No. 7 of 2025 are expected to provide a clearer path, but the OSS implementation is still being established. Confirm the current compliant route with an Indonesian legal adviser.",
      },
      {
        question: "What happens if I rent my Bali villa without a permit?",
        answer:
          "Unlicensed villas face fines starting at IDR 50 million, property sealing by Satpol PP, and delisting from Airbnb and Booking.com under Ministerial Regulation Permenpar No. 6 of 2025. Foreigners operating without proper PT PMA authorisation can be deported and banned from re-entering Indonesia for one to six years. Since February 2026, using an Indonesian nominee to hold the permit on a foreigner's behalf is a criminal offence under Bali's regional regulation Perda No. 4/2026, carrying up to five years imprisonment.",
      },
    ],
    gallery: [
      {
        url: "/blog/bali-rental-permit-stamp-approval.webp",
        alt: "Hands pressing an official rubber stamp onto a document, representing the approval of a tourism business permit or NIB for a Bali short-term rental villa",
        credit: "Pexels / Anna Tarazevich",
        sourceUrl: "https://www.pexels.com/photo/a-person-s-hand-using-a-stamp-6358840/",
      },
      {
        url: "/blog/rental-property-compliance-inspection.webp",
        alt: "A property inspector in a hard hat and high-visibility vest checking a building door with a clipboard, representing the SLF compliance inspection required before a Bali villa rental permit is issued",
        credit: "Pexels / RDNE Stock project",
        sourceUrl: "https://www.pexels.com/photo/a-male-inspector-in-a-hard-hat-conducts-a-property-inspection-outdoors-with-a-clipboard-8293667/",
      },
    ],
    citations: [
      {
        label: "Permenpar No. 18 Tahun 2016 - BPK Official Legal Database (Tier 1): primary regulation defining Pondok Wisata and tourism business registration",
        url: "https://peraturan.bpk.go.id/Details/171166/permenpar-no-18-tahun-2016",
      },
      {
        label: "KBLI 55130 Pondok Wisata - BPS Official KBLI Database (Tier 1): Indonesian standard business classification for homestay accommodation",
        url: "https://klasifikasi.web.bps.go.id/app/view/kbli2009/55130",
      },
      {
        label: "Emerhub: Understanding the Pondok Wisata Bali Homestay License (Tier 2)",
        url: "https://emerhub.com/bali/pondok-wisata-bali-homestay-license/",
      },
      {
        label: "ILA Global Consulting: Indonesia Villa Rental Regulations 2026 - PT PMA requirements and fines (Tier 2)",
        url: "https://ilaglobalconsulting.com/indonesia-villa-rental-regulations-2026/",
      },
      {
        label: "Seven Stones Indonesia: KBLI 2025 Tourism Accommodation Codes and PT PMA licensing path (Tier 2)",
        url: "https://sevenstonesindonesia.com/blog/kbli-2025-2026-tourism-accommodation-codes-saving-the-day-for-pt-pmas-in-bali/",
      },
    ],
  },
  {
    slug: "ppjb-contract-bali-off-plan-explained",
    title: "What Is a PPJB? Bali Off-Plan Contract Explained",
    category: "investment",
    imageUrl: null,
    sortOrder: 42,
    metaDescription:
      "A PPJB is Indonesia's preliminary binding off-plan purchase agreement, signed before a notary. Know what it must include before committing to a Bali villa.",
    body: `<p>A PPJB (Perjanjian Pengikatan Jual Beli) is Indonesia's preliminary binding purchase agreement for <a href="/blog/what-is-off-plan-property-bali">off-plan property</a>. It secures the deal before the villa is ready for a formal title transfer, and under Ministerial Regulation Permen PUPR No. 11 of 2019 it must be drawn up as a notarial deed signed before a licensed Notaris. The buyer has a legal right to seven working days to review it before signing.</p><p>The PPJB is not a title transfer. It creates only a personal right between buyer and developer. The AJB (Akta Jual Beli) is the final deed that actually shifts ownership and must be executed before a PPAT (Pejabat Pembuat Akta Tanah) and registered at Indonesia's National Land Agency (BPN). For a Bali off-plan villa, the PPJB typically precedes handover by 12 to 24 months.</p><p>Government Regulation PP No. 12 of 2021 adds a key rule: a developer cannot sign a PPJB until the project is at least 20% physically complete and the building permit (PBG) has been issued. Permen PUPR 11/2019 sets the mandatory content, which includes both parties' identities, a full property description with specifications, the purchase price and payment schedule, the agreed handover date, developer guarantees, rights and obligations, cancellation terms, and a dispute resolution clause.</p><p>Beyond the statutory minimum, ask your independent lawyer to add milestone-linked payments rather than calendar-date tranches, a daily denda (penalty) if the developer misses the delivery date, a retention holdback at final payment until defects are fixed, and a defect liability window of at least 90 days post-handover. Indonesian law does not require escrow for off-plan residential property. Deposits typically go directly to the developer. Negotiating for funds to sit at a commercial bank or through a notary trust arrangement reduces that risk.</p><p>For foreign buyers, the ownership structure must be settled before the PPJB is signed because it determines what deed follows at completion. A leasehold buyer converts to an Akta Sewa. A KITAS holder can convert to a Hak Pakai deed registered at BPN. A buyer using a <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a> converts via an AJB to a HGB title. See our <a href="/blog/freehold-vs-leasehold-bali">ownership structures guide</a> for a full comparison. This is general information, not legal or financial advice. Always engage an independent Indonesian lawyer to review your PPJB before signing.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What is the difference between a PPJB and an AJB in a Bali property transaction?",
        answer:
          "A PPJB (Perjanjian Pengikatan Jual Beli) is a preliminary binding agreement signed before a Notaris. It creates a personal right between buyer and developer but does not transfer land title. An AJB (Akta Jual Beli) is the final transfer deed, executed before a PPAT (land conveyancer) and registered at BPN, that actually shifts legal ownership. In an off-plan Bali villa purchase, the PPJB comes first, typically 12 to 24 months before handover, and the final deed follows once construction is complete.",
      },
      {
        question: "What clauses protect the buyer in a Bali PPJB?",
        answer:
          "Under Permen PUPR No. 11 of 2019, a PPJB must include the handover date, developer guarantees, cancellation terms, and a dispute resolution clause. Beyond those, buyers should negotiate for payments tied to construction milestones, a denda (daily penalty) for late delivery, a retention holdback until defects are fixed, a defect liability period of at least 90 days post-handover, and funds held by a commercial bank rather than deposited directly with the developer. Indonesian law does not mandate escrow for residential off-plan, so that protection must be written into the PPJB itself.",
      },
      {
        question:
          "When does a PPJB convert to a full title transfer in Bali?",
        answer:
          "It depends on the buyer's ownership structure. A leasehold buyer converts from PPJB to an Akta Sewa (lease deed) once the build is complete and all payments are made. A KITAS holder using Hak Pakai converts to a Hak Pakai deed registered at BPN. A foreign buyer holding through a PT PMA company converts via an AJB to a HGB title in the company's name. Under PP No. 12 of 2021, the developer must have at least 20% physical completion and a valid PBG (building permit) before the PPJB can be signed, so the timeline typically runs 12 to 24 months from signing to handover.",
      },
    ],
    publishedAt: "2026-07-23",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/ppjb-buyer-legal-consultation.webp",
    gallery: [
      {
        url: "/blog/off-plan-new-build-contract-signing.webp",
        alt: "A couple and their agent signing purchase documents inside a new-build apartment under construction, representing the moment a Bali off-plan PPJB is executed",
        credit: "Pexels / cottonbro studio",
        sourceUrl:
          "https://www.pexels.com/photo/a-couple-signing-real-estate-documents-with-a-realtor-inside-a-new-apartment-7647387/",
      },
      {
        url: "/blog/ppjb-contract-clause-review.webp",
        alt: "Two professionals reviewing a formal property contract clause by clause at a desk, representing the seven-day buyer review period required under Indonesian PPJB regulations",
        credit: "Pexels / Ketut Subiyanto",
        sourceUrl:
          "https://www.pexels.com/photo/two-adults-reviewing-and-discussing-a-business-contract-with-a-pen-and-clipboard-8730976/",
      },
    ],
    citations: [
      {
        label:
          "Permen PUPR No. 11/PRT/M/2019 - BPK RI JDIH: Ministerial Regulation governing PPJB form, mandatory clauses and notary obligations (Tier 1)",
        url: "https://peraturan.bpk.go.id/Home/Details/128152/permen-pupr-no-11prtm2019-tahun-2019",
      },
      {
        label:
          "PP No. 12 Tahun 2021 - BPK RI JDIH: Government Regulation defining the PPJB system and the 20% construction completion requirement (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/161842/pp-no-12-tahun-2021",
      },
      {
        label:
          "ILA Global Consulting: Property Handover Delay in Indonesia - buyer rights and denda clauses under Indonesian law (Tier 2)",
        url: "https://ilaglobalconsulting.com/property-handover-delay-in-indonesia/",
      },
      {
        label:
          "Emerhub: Bali Property Investment Guide for Foreign Investors - PPJB process and buyer protections (Tier 2)",
        url: "https://emerhub.com/bali/property-investment-in-bali/",
      },
    ],
    layoutVariant: "qa",
  },
];
