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
  {
    slug: "bali-property-transfer-taxes-bphtb",
    title: "Transfer Taxes When Buying Bali Property: BPHTB and PPh",
    category: "investment",
    imageUrl: null,
    sortOrder: 43,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-07-24",
    heroImage: "/blog/bphtb-property-transfer-tax-rates-review.webp",
    metaDescription:
      "BPHTB at 5% and PPh Final at 2.5% apply at every Bali property closing. Who pays what, how each is calculated, and what changes for a PT PMA share transfer.",
    body: `<p>When you buy property in Bali, two one-time transfer taxes fall due at closing. The buyer pays BPHTB (Bea Perolehan Hak atas Tanah dan Bangunan, the Acquisition Duty on Land and Buildings) at 5% of the taxable acquisition value above a regional exemption floor. The seller simultaneously pays Final Income Tax (PPh Final) at 2.5% of the gross transaction price. Both must be settled before the PPAT (the land deed official) can sign the title deed, so they are closing costs, not deferred obligations.</p><p>BPHTB is a regional tax administered by each regency under <a href="https://peraturan.bpk.go.id/Details/38763/uu-no-28-tahun-2009" data-external="true">Law No. 28 of 2009 on Regional Taxes and Levies</a>. The formula is 5% multiplied by (NPOP minus NPOPTKP). NPOP (the Tax Object Acquisition Value) is the higher of the agreed sale price or the government's annual NJOP assessment. NPOPTKP is the regency's tax-free floor; national law sets the minimum at IDR 60 million for standard purchases, and Bali regencies including Tabanan set theirs in that range. On a villa priced at IDR 3 billion with an IDR 60 million floor, the BPHTB works out to 5% of IDR 2.94 billion, which is IDR 147 million. The PPAT calculates the amount, issues a payment slip, and you pay at a government-appointed bank before the deed signing. The validated receipt must be presented at the PPAT appointment.</p><p>The seller pays PPh Final under <a href="https://peraturan.bpk.go.id/Details/5755/pp-no-34-tahun-2016" data-external="true">Government Regulation No. 34 of 2016</a>. The rate is 2.5% of the gross transaction price or the NJOP, whichever is higher. For that same IDR 3 billion property, the seller's tax is IDR 75 million. PPh Final is a definitive tax: once paid, the seller has no further income tax exposure on that transaction regardless of actual profit. For government-subsidised simple housing below official price ceilings, the rate drops to 1%, but that category does not apply to the villa market.</p><p>If you buy a Bali villa by acquiring the shares of the <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a> that holds it, the tax picture changes. No property title changes hands in a share sale, so BPHTB does not apply. What the selling shareholders face instead is income tax on their gain. For a non-resident seller, Indonesian law imposes Article 26 withholding tax at 20% on an estimated net figure equal to 25% of gross sale proceeds, giving an effective rate of 5% on proceeds, reduced if a double tax treaty applies. The buyer inherits the company along with all its obligations, so independent legal due diligence on the PT PMA's corporate records, contracts, and liabilities is essential before signing any share purchase agreement.</p><p>Beyond BPHTB and PPh, closing a Bali property deal involves a PPAT fee (capped at 1% of the transaction value by regulation and typically split between buyer and seller by agreement), a BPN land certificate registration fee, and notary charges. Total buyer-side transaction costs for a direct purchase generally run between 4% and 6% of the purchase price. These are estimates; confirm the exact figures with your PPAT or an independent Indonesian tax adviser before signing. This article is for general information only and is not financial or legal advice.</p>`,
    venues: [],
    faq: [
      {
        question: "Who pays BPHTB, the buyer or seller in a Bali property deal?",
        answer:
          "BPHTB is the buyer's tax. The seller pays PPh Final at 2.5% of the gross sale price under Government Regulation No. 34 of 2016. Both taxes must be paid before the PPAT can execute the title deed. The PPAT calculates both amounts, issues separate payment slips, and requires the validated bank receipts at the signing appointment.",
      },
      {
        question: "How is BPHTB calculated on a Bali villa purchase?",
        answer:
          "The formula is 5% multiplied by (NPOP minus NPOPTKP). NPOP is the higher of the agreed sale price or the government NJOP annual assessment. NPOPTKP is the regency tax-free floor, with a national minimum of IDR 60 million under Law No. 28 of 2009. On a villa priced at IDR 3 billion with a floor of IDR 60 million, the BPHTB bill is approximately IDR 147 million. You pay at a government-appointed bank before the deed appointment and present the validated slip to the PPAT.",
      },
      {
        question: "Are transfer taxes different for a PT PMA share transfer versus a direct property sale?",
        answer:
          "Yes. A direct property sale triggers BPHTB for the buyer (5%) and PPh Final for the seller (2.5%), both paid at closing. A PT PMA share transfer avoids BPHTB entirely because no property title changes hands. The selling shareholders pay income tax on their gain instead, with a 20% Article 26 withholding rate applied to 25% of proceeds for non-resident sellers, which is an effective rate of 5%, potentially reduced by a double tax treaty. Each route carries different tax exposure and different due diligence requirements, so model both options with an Indonesian tax adviser before signing.",
      },
    ],
    gallery: [
      {
        url: "/blog/property-purchase-deed-offer-signing.webp",
        alt: "Hands signing an Offer to Purchase Real Estate document at a closing table, representing the moment when BPHTB and PPh transfer taxes must be cleared before the Bali property deed is executed",
        credit: "Pexels / RDNE Stock project",
        sourceUrl: "https://www.pexels.com/photo/8292787/",
      },
      {
        url: "/blog/bphtb-tax-calculation-two-people-desk.webp",
        alt: "Two people reviewing tax forms with a calculator at a wooden desk, representing the calculation of BPHTB and PPh Final transfer taxes for a Bali property purchase",
        credit: "Pexels / Mikhail Nilov",
        sourceUrl: "https://www.pexels.com/photo/6963053/",
      },
    ],
    citations: [
      {
        label: "UU No. 28 Tahun 2009 - BPK RI JDIH: Law on Regional Taxes and Levies, governing BPHTB rate (max 5%), NPOPTKP floor (min IDR 60 million), and regional administration of the acquisition duty (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/38763/uu-no-28-tahun-2009",
      },
      {
        label: "PP No. 34 Tahun 2016 - BPK RI JDIH: Government Regulation on Final Income Tax from Transfer of Land and Building Rights, setting the 2.5% PPh Final rate for the seller (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/5755/pp-no-34-tahun-2016",
      },
      {
        label: "KPMG Indonesia Tax News Flash October 2016: Analysis of Government Regulation No. 34/2016 on income tax from land and building rights transfer (Tier 2)",
        url: "https://assets.kpmg.com/content/dam/kpmg/id/pdf/2016/10/id-tnf-oct16-tax-transfer-land-building-rights-gr34.pdf",
      },
      {
        label: "Emerhub: Bali Property Investment Guide for Foreign Investors - BPHTB, PPh Final, and PPAT fee breakdown (Tier 2)",
        url: "https://emerhub.com/bali/property-investment-in-bali/",
      },
    ],
  },
  {
    slug: "bali-vs-spain-property-investment",
    title: "Bali vs Spain Property for Foreign Investors",
    category: "investment",
    imageUrl: null,
    sortOrder: 44,
    metaDescription:
      "Spain offers freehold ownership and EU legal security; Bali offers higher yields and lower taxes. How the Costa del Sol and Bali compare for foreign investors.",
    body: `<p>Spain allows any foreign buyer, including US and UAE nationals, to own residential property as full freehold in perpetuity. No leasehold term, no company structure, and no residency permit is required. In Bali, the Basic Agrarian Law reserves Hak Milik (freehold title) for Indonesian citizens only. Foreign buyers must use a leasehold arrangement (typically 25 years with an optional renewal) or set up a <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a> to hold a Hak Guna Bangunan title. Spain's ownership model is simpler and more liquid.</p><p>Entry prices differ sharply. Marbella property averaged roughly EUR 4,400 to EUR 5,500 per square metre by early 2026, up 8.1% in 2025 according to <a href="https://www.knightfrank.com/research/article/2026/4/piri-100-ultimate-prime-residential-property-index" data-external="true">Knight Frank's PIRI 100 index</a>. A modest villa on the Costa del Sol starts around EUR 1 million. Bali off-plan villas can be acquired for far less in US dollar terms, with leasehold product in the Tabanan area priced from around USD 200,000. Purchase taxes in Andalusia run 7% ITP on resale property, or 10% IVA plus 1.2% stamp duty on new builds. In Bali, the buyer pays BPHTB at 5% of the acquisition value while the seller covers PPh Final at 2.5%.</p><p>Rental yield is where Bali holds its clearest advantage. Prime villa areas such as Canggu typically produce gross yields of 7% to 15% depending on occupancy, management, and season. Marbella and the wider Costa del Sol deliver more in the range of 4% to 7% gross for villas, with the luxury segment at the lower end. Net returns in both markets fall after management fees, local taxes, and vacancy. These are illustrative ranges, not guarantees. This is general information, not financial advice.</p><p>Annual taxes are higher in Spain for non-EU owners. Rental income from Spanish property is taxed at 24% of gross income for non-EU residents with no expense deductions, per Spain's tax authority <a href="https://sede.agenciatributaria.gob.es/Sede/en_gb/no-residentes/irnr-sin-establecimiento-permanente/cuestiones-especificas-sobre-tributacion-inmuebles/renta-imputada-inmueble-urbano-uso-propio.html" data-external="true">AEAT</a>. Owners of vacant Spanish property also pay an annual imputed income tax. IBI council tax runs 0.4% to 1.1% of the cadastral value each year. A progressive wealth tax applies to Spanish-situs assets above EUR 700,000. In Bali, rental income is taxed at a flat 10% final withholding tax, PBB land tax is minimal, and there is no wealth tax on foreign-held property.</p><p>On short-term rentals, Malaga city froze new tourist rental licenses until August 2028 under a 2025 municipal moratorium. Marbella continues to issue licenses but now requires a 3/5 majority approval from the building's community of owners alongside a national registry registration. Bali requires a Pondok Wisata permit and local zoning compliance, but the licensing path remains open across most areas including the Tabanan corridor near OMA Townhouse. A local lawyer in each market is essential before signing.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Can foreigners own freehold property in Spain more easily than in Bali?",
        answer:
          "Yes. Any non-resident, including US and UAE nationals, can purchase residential property in Spain as full freehold in perpetuity. No leasehold term, company structure, or residency visa is needed. In Bali, the Basic Agrarian Law reserves Hak Milik freehold title for Indonesian citizens only. Foreign buyers use either a leasehold arrangement or a PT PMA company structure to hold property. Spain's ownership is simpler and easier to sell or inherit, though it comes with higher entry costs and heavier ongoing taxes for non-EU owners.",
      },
      {
        question:
          "Are Bali or Spanish coastal rental yields higher for foreign investors?",
        answer:
          "Bali yields are generally higher. Prime villa areas such as Canggu report gross yields of 7% to 15%, though net returns depend heavily on occupancy and management quality. Marbella and the Costa del Sol typically deliver 4% to 7% gross for villas, with luxury product at the lower end. These are ranges, not guarantees, and net yields fall further once management fees, local taxes, and vacancy are factored in. This is general information, not financial advice.",
      },
      {
        question:
          "How do taxes compare for foreign property owners in Spain vs Bali?",
        answer:
          "Spain carries a significantly higher tax burden for non-EU owners such as US and UAE nationals. Rental income is taxed at 24% of gross with no expense deductions for non-EU residents, per Spain's AEAT. Vacant property owners pay an annual imputed income tax. IBI council tax, a progressive wealth tax on Spanish assets above EUR 700,000, and a Solidarity Tax on assets above EUR 3 million add further annual obligations. In Bali, rental income is taxed at a flat 10% final withholding tax, PBB land tax is minimal, and there is no wealth tax.",
      },
    ],
    publishedAt: "2026-07-25",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/marbella-costa-del-sol-aerial.webp",
    gallery: [
      {
        url: "/blog/marbella-white-villas-aerial.webp",
        alt: "Aerial view of densely packed whitewashed villas in a hillside residential development near Marbella, Costa del Sol, Spain, showing the scale of the local property market",
        credit: "mike-art-visual-creator / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/aerial-view-of-whitewashed-villas-in-marbella-36288577/",
      },
      {
        url: "/blog/marbella-beachfront-costa-del-sol.webp",
        alt: "Marbella beachfront from the sea, showing La Concha mountain backdrop, palm trees, and a row of residential properties along the Costa del Sol shoreline",
        credit: "WeDesignMarbella / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/beautiful-coastal-view-of-marbella-spain-37800921/",
      },
    ],
    citations: [
      {
        label:
          "Knight Frank PIRI 100 2026 - Prime Marbella residential prices rose 8.1% in 2025, above the 3.2% global luxury market average (Tier 2)",
        url: "https://www.knightfrank.com/research/article/2026/4/piri-100-ultimate-prime-residential-property-index",
      },
      {
        label:
          "DM Properties Marbella - Market Price Trends 2025-2026: Marbella averaged EUR 4,424/m2 in 2025 with 7.67% year-on-year growth (Tier 2)",
        url: "https://www.dmproperties.com/47867-marbella-property-market-price-trends-2025-2026",
      },
      {
        label:
          "AEAT (Spanish Tax Agency) - IRNR: imputed income and rental income tax for non-resident property owners, official rates (Tier 1)",
        url: "https://sede.agenciatributaria.gob.es/Sede/en_gb/no-residentes/irnr-sin-establecimiento-permanente/cuestiones-especificas-sobre-tributacion-inmuebles/renta-imputada-inmueble-urbano-uso-propio.html",
      },
      {
        label:
          "Welex Marbella - 2% ITP property transfer tax in Andalusia: key points for 2026, including the standard 7% ITP flat rate for resale property (Tier 2)",
        url: "https://www.welex.es/2-property-transfer-tax-in-andalusia-key-points-for-real-estate-professionals-in-2026/",
      },
      {
        label:
          "Lucas Fox / Dils - Capital gains tax for non-residents in Spain 2025: 24% rate on gains, 3% buyer withholding via Modelo 211 (Tier 2)",
        url: "https://www.lucasfox.com/news-and-press/articles/complete-guide-to-capital-gains-tax-for-non-residents-in-spain-2025-1",
      },
      {
        label:
          "Investropa - Spain property foreign ownership 2026: no restrictions on non-EU buyers; full freehold rights available to any nationality (Tier 2)",
        url: "https://investropa.com/blogs/news/spain-foreigner-rights",
      },
      {
        label:
          "Relo Real Estate - Best areas for high rental yields on the Costa del Sol 2026: Marbella villa yields typically 4% to 7% gross (Tier 2)",
        url: "https://www.reloreal.com/news/best-areas-to-invest-in-costa-del-sol-for-high-rental-yields-in-2026",
      },
    ],
    layoutVariant: "standard",
  },
  {
    slug: "hak-guna-bangunan-bali-pt-pma",
    title: "What Is Hak Guna Bangunan? PT PMA Property in Bali",
    category: "investment",
    imageUrl: null,
    sortOrder: 45,
    metaDescription:
      "Hak Guna Bangunan (HGB) is the Right to Build title a PT PMA uses to hold Bali property. Initial 30 years, up to 80 years with renewals. Complete guide.",
    body: `<p>Hak Guna Bangunan (HGB), or Right to Build, is the title a <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a> holds when it acquires property in Bali. Defined under Article 35 of Indonesia's Basic Agrarian Law (Law No. 5 of 1960), HGB grants the right to construct and own buildings on land for a certified period, registered as a Sertifikat HGB with the <a href="https://www.atrbpn.go.id" data-external="true">National Land Agency (BPN)</a>. Foreigners cannot hold HGB in their own name. Only Indonesian citizens and Indonesian legal entities, including a PT PMA, qualify as holders.</p><p>Under Government Regulation No. 18 of 2021 (PP 18/2021), HGB on state or government-managed land runs for an initial 30 years, extendable by 20 years, then renewable for a final 30 years, giving a maximum of 80 years of tenure. On land originally held as Hak Milik (freehold owned by an Indonesian individual), HGB is limited to 30 years and is renewable only by private agreement with the landowner. Most Bali villas sold to PT PMA buyers start as Hak Milik land, and the title converts to HGB at the point of transfer.</p><p>Three titles matter to foreign investors. Hak Milik is perpetual freehold, reserved by law for Indonesian citizens only and unavailable to any company. Hak Pakai (Right to Use) can be held directly by a foreigner with a valid KITAS or KITAP residence permit for one personal residential property, but it generally cannot be mortgaged as bank collateral. HGB through a PT PMA is the standard commercial title. Its key practical advantage is that the SHGB certificate can be registered as Hak Tanggungan (a security interest) with an Indonesian bank, making leverage possible in a way Hak Pakai for a company does not allow.</p><p>When a PT PMA buys from an Indonesian seller holding Hak Milik, the title must convert. The seller formally releases the Hak Milik, and BPN issues a new Sertifikat HGB in the PT PMA's name. A licensed PPAT (Pejabat Pembuat Akta Tanah, the land deed official) prepares the Akta Jual Beli (sale and purchase deed). The PT PMA pays BPHTB acquisition duty at 5% of the transaction value, and the seller pays PPh Final at 2.5% of the gross amount. BPN registration typically takes several weeks to a few months depending on the local office and whether a title conversion is required.</p><p>A PT PMA holding HGB can exit in two ways. It can transfer the title directly to another eligible buyer through a new Akta Jual Beli executed before a PPAT, or it can sell the shares of the PT PMA itself, leaving the land certificate in the company's name while changing who owns the company. The <a href="/blog/bali-property-exit-strategy">exit strategy guide</a> covers both routes and the applicable taxes. One practical point to track: since mid-2025, BPN has tightened enforcement of the rule that HGB land must be actively developed within two years of acquisition, and renewal applications must be filed before the 30-year certificate lapses.</p>`,
    venues: [],
    faq: [
      {
        question:
          "How long does a Hak Guna Bangunan title last and can it be renewed?",
        answer:
          "HGB has a three-stage tenure structure under Government Regulation No. 18 of 2021. On state or government-managed land, the initial grant is up to 30 years, extendable by 20 years, and renewable for a final 30 years, giving a maximum of 80 years total. On land originally held as Hak Milik (Indonesian freehold), HGB is limited to 30 years and renewable only by private agreement with the landowner. Renewal applications must be submitted before the certificate lapses; HGB that expires without renewal may revert to state control, a rule BPN has enforced more strictly since mid-2025.",
      },
      {
        question:
          "What is the difference between HGB, Hak Pakai, and Hak Milik in Bali?",
        answer:
          "Hak Milik is perpetual freehold available only to Indonesian citizens. No company, whether locally or foreign-owned, can hold Hak Milik. Hak Pakai (Right to Use) can be held directly by a foreigner with a KITAS or KITAP residence permit for one personal residential property, and also by a PT PMA, but it generally cannot be registered as Hak Tanggungan (mortgage security) with an Indonesian bank. HGB (Right to Build) is held by a PT PMA company, valid for up to 80 years with renewals on state land, and it can be mortgaged as bank collateral. That mortgageability makes HGB the preferred title for PT PMA investors in rental villas and commercial property.",
      },
      {
        question: "Can a PT PMA sell a property held under HGB title?",
        answer:
          "Yes. A PT PMA holding HGB can transfer the title to another eligible buyer through an Akta Jual Beli (sale and purchase deed) signed before a licensed PPAT. The direct property transfer triggers BPHTB at 5% for the buyer and PPh Final at 2.5% for the selling PT PMA. Alternatively, the owner can transfer the shares of the PT PMA itself, which keeps the land certificate in the company name and changes only who owns the company. This share transfer method does not trigger BPHTB in the same way as a direct sale, but carries its own tax and due diligence implications. A licensed Indonesian notary-PPAT should be engaged for either route.",
      },
    ],
    publishedAt: "2026-07-26",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/land-certificate-stamped-verification.webp",
    gallery: [
      {
        url: "/blog/construction-plans-hardhat-topview.webp",
        alt: "Top-down view of architectural floor plans, a Purchase and Sale Agreement, and a white hard hat laid out on a surface in dramatic sunlight, representing the Right to Build planning documents a PT PMA requires before construction",
        credit: "Thirdman / Pexels",
        sourceUrl: "https://www.pexels.com/photo/8470057/",
      },
      {
        url: "/blog/legal-certificate-justice-law-desk.webp",
        alt: "A framed legal completion certificate alongside a Lady Justice bronze statue on a law firm desk, representing the certified property title (Sertifikat HGB) issued by Indonesia's National Land Agency (BPN) to a PT PMA company",
        credit: "Pavel Danilyuk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/8112198/",
      },
    ],
    citations: [
      {
        label:
          "Indonesian Basic Agrarian Law (UUPA) Law No. 5 of 1960, Articles 35-40: defines Hak Guna Bangunan as the right to erect and own buildings on land; Article 36 lists eligible holders including Indonesian legal entities (PT PMA) (Tier 1)",
        url: "https://faolex.fao.org/docs/pdf/ins3920.pdf",
      },
      {
        label:
          "Government Regulation No. 18 of 2021 (PP 18/2021) on Land Rights and Registration: updated HGB duration to 30+20+30 years for a maximum of 80 years on state land (Tier 1)",
        url: "https://iglolaw.com/regulations/government-no-18-of-2021/",
      },
      {
        label:
          "ILA Global Consulting - Land Ownership and Title Transfer in Bali and Lombok: HGB, Hak Pakai, Hak Milik, and PT PMA acquisition process explained (Tier 2)",
        url: "https://ilaglobalconsulting.com/land-ownership-land-title-transfer-bali-lombok/",
      },
      {
        label:
          "Cekindo - Buying Property in Bali for Foreigners: PT PMA holds HGB for commercial property; Hak Milik reserved for Indonesian citizens only (Tier 2)",
        url: "https://www.cekindo.com/blog/buying-property-in-bali-essentials-for-foreigners",
      },
    ],
    layoutVariant: "standard",
  },
  {
    slug: "bali-property-inheritance-foreign-owners",
    title: "Bali Property Inheritance: What Foreign Owners Need to Know",
    category: "investment",
    imageUrl: null,
    sortOrder: 46,
    metaDescription:
      "Indonesia has no inheritance tax. This guide explains how Bali property passes to foreign heirs across PT PMA, leasehold, and Hak Pakai structures.",
    body: `<p>Indonesia has no inheritance or estate tax. What happens to your Bali property when you die comes down to how you hold it, and the PT PMA company structure is by far the most succession-friendly option for foreign investors.</p><p><strong>PT PMA (company ownership):</strong> Your heirs inherit shares in the Indonesian company, not the property itself. The company's HGB title stays unchanged, so there is no BPHTB (property acquisition duty) triggered by the transfer. Heirs update the shareholder register with Indonesia's Ministry of Law and Human Rights and may need a notarized share transfer deed. This is why the <a href="/blog/pt-pma-setup-bali-property">PT PMA structure</a> works well for families who want a clear handover path.</p><p><strong>Leasehold:</strong> A <a href="/blog/freehold-vs-leasehold-bali">leasehold right</a> can pass to heirs for the remaining contract term, but only if the original agreement contains an explicit assignability-on-death clause. Without that clause, a foreign heir may need a court order to claim the right. Always review this clause before signing any lease contract.</p><p><strong>Hak Pakai:</strong> Hak Pakai can transfer to a foreign heir only if the heir is legally resident in Indonesia with a valid <a href="/blog/bali-visa-property-owner-investor">KITAS or KITAP stay permit</a>. A non-resident foreign heir who inherits Hak Pakai must sell or transfer the title within one year under the Basic Agrarian Law (UUPA Law No. 5 of 1960), or it reverts to the state.</p><p>On tax: inheritance of property is exempt from Indonesian income tax under PPh Law No. 36 of 2008, Article 4(3)(a), and PMK 81/2024 confirms that land or building transfers caused by death are not subject to final income tax. If an actual land or building title transfers to an heir (as opposed to PT PMA shares), BPHTB applies at 5% of the taxable value above IDR 300 million, a more favorable threshold than a regular purchase. PT PMA share inheritance is handled under company law and does not trigger BPHTB.</p><p>The most practical estate planning step is an Indonesian notarial will that covers your Indonesian assets specifically. A foreign will is recognized in Indonesia when apostilled, translated into Bahasa Indonesia by a certified sworn translator, and registered with Indonesia's Central Will Registry. For a PT PMA, the company's articles of association should also name a succession mechanism directly. Work with an Indonesian notary and a specialist inheritance lawyer before any issue arises rather than after.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Can I leave my Bali leasehold or PT PMA to a non-Indonesian heir?",
        answer:
          "With PT PMA, yes. Your heirs inherit your company shares, not the property directly, which is a standard corporate succession process under Indonesian company law. Neither the heir nor the property needs to change status. A leasehold can also pass to any heir for the remaining contract term, provided the lease agreement contains an explicit assignability-on-death clause. Neither path requires the heir to be an Indonesian citizen.",
      },
      {
        question:
          "Does Indonesia recognize a foreign will for Bali property?",
        answer:
          "Yes. A foreign will can be recognized in Indonesia if it is apostilled by the issuing country, translated into Bahasa Indonesia by a certified sworn translator, and registered with Indonesia's Central Will Registry. For a PT PMA, the company's articles of association and any shareholder agreement should address share succession separately, as company law governs those transfers rather than personal inheritance law.",
      },
      {
        question:
          "What is the inheritance tax on Bali property for foreigners?",
        answer:
          "Indonesia has no inheritance or estate tax. If an heir receives actual land or a building (a leasehold assignment or Hak Pakai transfer), they pay BPHTB at 5% of the value above an IDR 300 million threshold, which is more favorable than the standard purchase rate. A PT PMA share transfer on death does not trigger BPHTB, because no land title changes hands at the property level.",
      },
    ],
    publishedAt: "2026-07-27",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/estate-will-signing-elderly.webp",
    gallery: [
      {
        url: "/blog/inheritance-lawyer-consultation-couple.webp",
        alt: "A lawyer consults with a couple across a desk in a professional office, with a Lady Justice statue visible, representing the legal advice foreign Bali property owners should seek for estate planning",
        credit: "Karola G / Pexels",
        sourceUrl: "https://www.pexels.com/photo/7876150/",
      },
      {
        url: "/blog/estate-planning-law-firm-documents.webp",
        alt: "A Lady Justice bronze statue sits among legal documents and a laptop on a law firm desk, representing the Indonesian notarial process for registering a foreign will and succession documents",
        credit: "Karola G / Pexels",
        sourceUrl: "https://www.pexels.com/photo/7876093/",
      },
    ],
    citations: [
      {
        label:
          "PwC Worldwide Tax Summaries - Indonesia Individual Other Taxes: Indonesia has no inheritance, estate, or gift taxes (Tier 2)",
        url: "https://taxsummaries.pwc.com/indonesia/individual/other-taxes",
      },
      {
        label:
          "ILA Global Consulting - Inheritance in Indonesia for Foreigners: PT PMA share succession, Hak Pakai eligibility for resident heirs, will registration requirements (Tier 2)",
        url: "https://ilaglobalconsulting.com/inheritance-in-indonesia-for-foreigners/",
      },
      {
        label:
          "MUC Tax Advisory - Inheritance assets exempt from income tax under PPh Law No. 36/2008 Article 4(3)(a); BPHTB on inherited land/buildings at 5% above IDR 300 million threshold (Tier 2)",
        url: "https://muc.co.id/en/article/procedure-for-obtaining-a-tax-clearance-certificate-for-inheritance-assets",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-vs-greece-property-investment",
    title: "Bali vs Greece Property for Foreign Investors",
    category: "investment",
    imageUrl: null,
    sortOrder: 47,
    metaDescription:
      "Greece lets US and UAE buyers own freehold; Bali requires leasehold or PT PMA. Compare yields, transfer taxes, rental tax, and the Greek Golden Visa change.",
    body: `<p>Greece and Bali both attract US and UAE property buyers, but ownership works very differently. In Greece, US and UAE nationals can buy freehold property in their own name in most of the country, with the same title rights as a Greek citizen. In Bali, Indonesian law reserves freehold title (Hak Milik) for Indonesian nationals. Foreign buyers access the market through a leasehold (commonly structured as 25 years with a 25-year renewal option, or 30 years with a 20-year extension), or a PT PMA foreign-owned company that holds a renewable Hak Guna Bangunan land right. Our <a href="/blog/foreigners-buy-property-bali">foreign ownership guide</a> explains each structure.</p><p>Transaction costs favour Greece at the point of purchase. Buyers of existing Greek residential property pay a transfer tax of 3.09% (3% plus a 0.09% municipal surcharge) on the higher of the contract price or the government's assessed value, per <a href="https://elxis.com/blog/how-much-is-property-transfer-tax-in-greece" data-external="true">Elxis</a>. In Indonesia, buyers pay BPHTB at 5% of the taxable acquisition value. Notary and registration fees apply on top in both markets.</p><p>Rental income tax differs in structure. Greece taxes non-resident rental income at a progressive rate: 15% on the first EUR 12,000, 25% on the amount up to EUR 35,000, and 45% above that, applied on gross rent after a 5% deemed expense deduction, per <a href="https://taxsummaries.pwc.com/greece/individual/other-taxes" data-external="true">PwC Greece</a>. Non-residents must file an annual Greek tax return. Indonesia withholds a flat 20% of gross rental income from non-residents under <a href="https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers" data-external="true">Article 26 of the income tax law</a>. No US-Indonesia tax treaty exists, so US nationals pay the full 20%. UAE residents may qualify for a reduced rate under the bilateral Indonesia-UAE treaty by providing a Certificate of Domicile.</p><p>On gross rental yield, Bali's established short-term rental areas typically run ahead. Agents and operators cite 8 to 15% gross for well-managed villas in Canggu and Uluwatu. Greek island short-term rentals in Mykonos and Santorini produce roughly 5 to 7% gross; Athens residential units average around 5%, per <a href="https://www.globalpropertyguide.com/europe/greece/rental-yields" data-external="true">Global Property Guide</a>. These are gross, pre-expense figures. Management fees, taxes, maintenance, and seasonal vacancy reduce net returns substantially in both markets. This is general market information and not financial advice.</p><p>Greece's Golden Visa was restructured under <a href="https://www.wfw.com/articles/understanding-the-new-golden-visa-law-%CE%BD%CE%BF-5100-2024-key-points-and-implications/" data-external="true">Law 5100/2024</a>, effective 31 August 2024. The minimum investment in high-demand zones (Attica, Thessaloniki, Mykonos, Santorini, and any island with more than 3,100 residents) rose to EUR 800,000, and qualifying properties are now prohibited from being listed on short-term rental platforms. Bali's five-year Second Home Visa is tied to a demonstrated bank balance, not property ownership, so buying a villa does not by itself create a residency pathway. For a comparison with other markets, see our guides on <a href="/blog/bali-vs-portugal-property-investment">Bali vs Portugal</a> and <a href="/blog/bali-vs-spain-property-investment">Bali vs Spain</a>.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Can foreigners own freehold property in Greece more easily than in Bali?",
        answer:
          "Yes. US and UAE nationals can buy Greek property in freehold, in their own name, with full title rights in most of the country. In Bali, freehold is restricted to Indonesian nationals. Foreign buyers use a long-term leasehold (typically 25+25 or 30+20 years) or a PT PMA company holding a renewable HGB title. A border-zone exception applies in parts of northern Greece and certain eastern Aegean islands, where a Ministry of Defense permit is required before a non-EU buyer can complete a purchase.",
      },
      {
        question:
          "Are Bali or Greek island rental yields higher for villas?",
        answer:
          "Bali's established short-term rental areas typically report gross yields of 8 to 15% for well-managed villas in Canggu and Uluwatu. Mykonos and Santorini short-term rentals produce roughly 5 to 7% gross; Athens residential property averages around 5%. Both sets of figures are gross and pre-expense. Management fees, maintenance, seasonal vacancy, and local taxes reduce net returns significantly, and are not a guarantee of actual performance.",
      },
      {
        question:
          "How do taxes compare for foreign property owners in Greece vs Bali?",
        answer:
          "In Greece, non-resident rental income is taxed at 15% to 45% on a progressive scale (after a 5% deemed deduction), with an annual tax return required. In Indonesia, a flat 20% of gross rental income is withheld from non-resident foreign owners under Article 26 of the income tax law. At purchase, Greece charges 3.09% transfer tax for existing residential property; Indonesia charges BPHTB at 5%. Both markets impose annual property holding taxes (ENFIA in Greece, PBB in Indonesia) that are generally modest relative to property value.",
      },
    ],
    publishedAt: "2026-07-28",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/santorini-cliffside-villas-aegean.webp",
    gallery: [
      {
        url: "/blog/mykonos-cycladic-villa-pool.webp",
        alt: "Whitewashed Cycladic villa with a private pool and clear blue sky in Mykonos, Greece, showing the freehold property style available to foreign buyers",
        credit: "Abdulrahman Alyaarobi / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/whitewashed-villas-and-pool-in-mykonos-greece-38035858/",
      },
      {
        url: "/blog/mykonos-town-harbor-aerial.webp",
        alt: "Aerial sunset view of Mykonos town with whitewashed buildings and churches clustered on a rocky promontory surrounded by the Aegean Sea",
        credit: "Kelly / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/aerial-view-of-scenic-mykonos-town-in-greece-37844831/",
      },
    ],
    citations: [
      {
        label:
          "Greek Ministry of Economy and Finance: ENFIA (Single Real Estate Ownership Tax) - official overview of the annual Greek property tax applying to resident and non-resident owners (Tier 1)",
        url: "https://minfin.gov.gr/en/tax-policy/tax-guide/single-real-estate-ownership-tax-enfia/",
      },
      {
        label:
          "PwC Worldwide Tax Summaries - Greece Individual Other Taxes: non-resident rental income progressive tax rates (15%/25%/45%) and ENFIA surtax on portfolios above EUR 500,000 (Tier 2)",
        url: "https://taxsummaries.pwc.com/greece/individual/other-taxes",
      },
      {
        label:
          "Elxis: Property Transfer Tax in Greece - 3.09% rate (3% plus 0.09% municipal surcharge) on existing residential purchases (Tier 2)",
        url: "https://elxis.com/blog/how-much-is-property-transfer-tax-in-greece",
      },
      {
        label:
          "Watson Farley & Williams: Understanding Greek Golden Visa Law 5100/2024 - EUR 800,000 threshold in high-demand zones, short-term rental prohibition on qualifying properties (Tier 2)",
        url: "https://www.wfw.com/articles/understanding-the-new-golden-visa-law-%CE%BD%CE%BF-5100-2024-key-points-and-implications/",
      },
      {
        label:
          "Global Property Guide: Gross rental yields in Greece - Athens 4.99% average; island and regional market benchmarks (Tier 2)",
        url: "https://www.globalpropertyguide.com/europe/greece/rental-yields",
      },
      {
        label:
          "Indonesian Directorate General of Taxes (DJP): Article 26 income tax - 20% flat withholding on gross rental income paid to non-resident foreign taxpayers (Tier 1)",
        url: "https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-villa-building-permit-pbg-explained",
    title: "PBG Building Permits for Bali Villas: What Buyers Must Know",
    category: "investment",
    imageUrl: null,
    sortOrder: 48,
    metaDescription:
      "Indonesia replaced the old IMB building permit with PBG in 2021. Here is what every off-plan Bali villa buyer needs to know about PBG and SLF.",
    body: `<p>The PBG (Persetujuan Bangunan Gedung) is the building approval a developer must hold before starting construction in Indonesia. If you are buying off-plan in Bali, confirming the PBG exists and matches the unit you are purchasing is one of the most consequential due diligence checks you can make.</p><p>Indonesia retired the old IMB (Izin Mendirikan Bangunan) building licence in 2021 under Government Regulation No. 16 of 2021 (PP 16/2021), which implemented the Job Creation Law (Law No. 11 of 2020) for the construction sector. The old IMB was a discretionary administrative licence; the PBG is a standards-based approval issued when a design meets Indonesia's national technical building standards (NSPK). A PBG carries lifetime validity once issued. Applications go through the government's <a href="https://simbg.pu.go.id" data-external="true">SIMBG portal</a>, run by the Ministry of Public Works, with a statutory processing time of 28 working days from a complete submission. Before a developer can file for a PBG, they need a KKPR (zoning conformity approval) confirming the land is in a permitted tourism or residential zone and not in an agricultural green zone.</p><p>A second document, the SLF (Sertifikat Laik Fungsi), must be in hand at handover. The SLF is issued after construction is complete, once a government inspector confirms the finished structure, fire systems, and electrical and plumbing work match the approved PBG and meet safety standards. Without an SLF, the villa cannot be legally occupied, cannot be listed on short-term rental platforms, and cannot hold a Pondok Wisata or villa accommodation licence. For rental-use villas, the SLF is valid for five years before renewal is required.</p><p>Foreigners cannot hold a PBG personally. A legally structured Bali villa must show the PBG in the name of the developer's PT PMA, which holds an HGB (Hak Guna Bangunan) land right over the plot. You or your lawyer can verify the permit number directly on the SIMBG portal. See our <a href="/blog/bali-property-due-diligence-checklist">full due diligence checklist</a> for the complete list of documents to request before signing.</p><p>Enforcement has become concrete. In July 2025, authorities demolished 48 structures at Bingin Beach, Uluwatu, after a provincial inspection found they lacked valid permits. Bali Gubernatorial Decree No. 5 of 2025 prohibits new villa construction on rice fields, and Regional Regulation No. 4 of 2026 made agricultural land conversion a criminal offence with penalties up to five years in prison. For an off-plan buyer, the commercial risk is direct: multiple Bali agencies report that resale buyers demand 40 to 50 percent off the price of a property that cannot produce a clean permit chain.</p><p>When you sign a <a href="/blog/ppjb-contract-bali-off-plan-explained">PPJB (binding sale agreement)</a>, ask your notary to check the KKPR and PBG documents before you sign, not after construction ends. The contract should name delivery with a valid PBG and an issued SLF as a developer obligation, not a best-efforts promise.</p>`,
    venues: [],
    faq: [
      {
        question: "What replaced the IMB building permit in Indonesia?",
        answer:
          "Government Regulation No. 16 of 2021 (PP 16/2021) replaced the IMB (Izin Mendirikan Bangunan) with the PBG (Persetujuan Bangunan Gedung), implementing the Job Creation Law (Law No. 11 of 2020). The PBG is a standards-based approval confirming a building design meets national technical standards. It carries lifetime validity once issued. IMBs granted before 2021 remain valid for their original build.",
      },
      {
        question:
          "Does a Bali villa need both a PBG and an SLF before it can be rented out?",
        answer:
          "Yes. The PBG approves the building plans before construction starts. The SLF (Sertifikat Laik Fungsi) is issued after construction, once an inspector confirms the finished building matches approved plans and meets safety standards. A rental villa cannot legally operate or hold a Pondok Wisata or villa accommodation licence without both a valid PBG and a current SLF. For commercial rental villas, the SLF must be renewed every five years.",
      },
      {
        question:
          "Can an off-plan buyer verify a developer has the correct Bali building permit?",
        answer:
          "Yes. Permit numbers can be searched on the government SIMBG portal at simbg.pu.go.id, operated by the Ministry of Public Works. You or your Indonesian lawyer can confirm the PBG exists, covers the right floor area and building use, and is held in the developer's PT PMA name. Checking this before signing the PPJB is strongly recommended. The developer should also be able to show the KKPR zoning conformity approval, which must be in place before any PBG can be filed.",
      },
    ],
    publishedAt: "2026-07-29",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/pbg-permit-approval-stamp-document.webp",
    gallery: [
      {
        url: "/blog/construction-foundation-rebar-site-inspection.webp",
        alt: "Two workers inspecting a steel rebar grid at a building foundation during construction, illustrating the site inspection stage before a building approval is issued",
        credit: "Tkirkgoz / Pexels",
        sourceUrl: "https://www.pexels.com/photo/37733179/",
      },
      {
        url: "/blog/building-safety-inspection-team-hardhat.webp",
        alt: "A team of inspectors wearing hard hats conducting a safety walkthrough of a completed building, representing the SLF certificate inspection process in Bali",
        credit: "Pavel Danilyuk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/7937743/",
      },
    ],
    citations: [
      {
        label:
          "Indonesian Ministry of Public Works: SIMBG (Sistem Informasi Manajemen Bangunan Gedung) - official portal for PBG and SLF applications and permit verification (Tier 1)",
        url: "https://simbg.pu.go.id/",
      },
      {
        label:
          "BPK Law Database: PP No. 16 Tahun 2021 - Government Regulation implementing the Building Construction Approval (PBG) in place of the IMB (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/161846/pp-no-16-tahun-2021",
      },
      {
        label:
          "Tarubali (Bali Provincial Spatial Information System): PBG and SLF - importance in the construction permitting process (Tier 1)",
        url: "https://tarubali.baliprov.go.id/persetujuan-bangunan-gedung-pbg-dan-sertifikat-laik-fungsi-slf-pentingnya-dalam-proses-konstruksi-bangunan-gedung/",
      },
      {
        label:
          "Emerhub: PBG Building Permit in Bali - application process, required documents, cost, and timeline (Tier 2)",
        url: "https://emerhub.com/bali/building-permit-pbg/",
      },
      {
        label:
          "Seven Stones Real Estate: Securing Your Villa in Bali - PBG and SLF building permits explained for investors (Tier 2)",
        url: "https://realestate.sevenstonesindonesia.com/securing-your-villa-in-bali-essential-pbg-slf-building-permits-explained/",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-nominee-arrangement-property-risks",
    title: "Bali Nominee Arrangements: What Foreign Buyers Must Know",
    category: "investment",
    imageUrl: null,
    sortOrder: 49,
    metaDescription:
      "Nominee arrangements are illegal in Bali under UUPA Art. 26(2) and Law 25/2007. Learn the risks foreign buyers face and the three legal alternatives.",
    body: `<p>A nominee arrangement is when an Indonesian citizen holds property title in their own name on behalf of a foreign buyer who provides the purchase funds. This structure is explicitly prohibited under Indonesian law, and courts will not protect a foreign buyer who loses out when a nominee acts against their interests.</p><p>The prohibition rests on two statutes. The Basic Agrarian Law (UUPA, Law No. 5 of 1960) reserves Hak Milik (freehold title) exclusively for Indonesian citizens. Article 26(2) states that any act intended, directly or indirectly, to transfer Hak Milik to a foreign national is null and void, and the land may revert to the state. The <a href="https://jdih-storage.bkpm.go.id/jdih/jdih/2007UUINVESTMENT25-ENGLISH-.pdf" data-external="true">Investment Law (Law No. 25 of 2007)</a> adds a second layer: Article 33 explicitly prohibits any agreement in which shares in an Indonesian company are held for and on behalf of another person. Both arrangements are declared void from the outset.</p><p>Because the arrangement is void, courts cannot award restitution. Indonesian Supreme Court Decision No. 3020 K/Pdt/2014 confirmed this directly. An Indonesian nominee sold a Bali plot to a third party without the foreign buyer's consent. The court found both parties had committed an unlawful act under Civil Code Article 1365, and the foreign buyer recovered nothing. Supreme Court Circular No. 10 of 2020 (SEMA 10/2020) reinforced this position by instructing all courts to treat the registered certificate holder as the legal owner, regardless of any private agreement about who provided the funds.</p><p>Two further risks compound the core problem. If the nominee dies, the property passes automatically to their statutory heirs under Indonesian succession law, and those heirs have no obligation to honor an unenforceable private arrangement. A nominee can also mortgage the land without the buyer's knowledge, because they hold the registered title and the private nominee agreement grants the buyer no rights that Indonesian courts will recognize.</p><p>Bali Province formalized criminal enforcement in 2026. On 24 February 2026, Governor Wayan Koster signed <a href="https://realestate.sevenstonesindonesia.com/bali-officially-bans-nominee-practice-for-land-ownership/" data-external="true">Bali Provincial Regulation No. 4 of 2026</a>, which criminalizes nominee land arrangements in Bali Province with penalties of up to five years imprisonment and a fine of one billion rupiah (approximately USD 60,000). Intermediaries, agents, and notaries who help structure a nominee arrangement share criminal exposure under the regulation.</p><p>Foreign buyers have legal alternatives that avoid all of these risks. A <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a> can hold land under a renewable Hak Guna Bangunan (HGB) title for up to 80 years in total. Foreign residents with a valid Indonesian stay permit (KITAS, KITAP, or the Second Home Visa) can hold <a href="/blog/hak-pakai-bali-foreign-buyers">Hak Pakai</a> directly in their own name under Government Regulation No. 18 of 2021. A notarized leasehold (Hak Sewa, UUPA Article 44) is the most common structure for buyers who prefer not to set up a company. For a full comparison, see our <a href="/blog/freehold-vs-leasehold-bali">ownership structures guide</a>. This article is general information and is not legal advice.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Is it legal for a foreigner to use an Indonesian nominee to buy property in Bali?",
        answer:
          "No. Nominee arrangements are prohibited under Article 26(2) of the Basic Agrarian Law (UUPA, Law No. 5 of 1960) and Article 33 of the Investment Law (Law No. 25 of 2007). Both laws declare such arrangements null and void from inception. Bali Province also imposed criminal penalties under Perda No. 4 of 2026, signed 24 February 2026, with exposure for the foreign buyer, the nominee, and any intermediary who facilitates the structure. The three legal ownership routes for foreigners are a PT PMA company, Hak Pakai for visa holders, and a notarized leasehold.",
      },
      {
        question: "What risks does a Bali property nominee arrangement create?",
        answer:
          "The core risk is that the arrangement is void, so Indonesian courts cannot award restitution if the nominee acts against the buyer's interests. Documented risks include the nominee selling or mortgaging the property without consent (confirmed in Supreme Court Decision No. 3020 K/Pdt/2014), the land reverting to the state under UUPA Article 26(2), and property passing to the nominee's heirs on death with no obligation to the foreign buyer. From 2026, Bali Perda No. 4 of 2026 adds criminal exposure of up to five years imprisonment and a fine of one billion rupiah.",
      },
      {
        question:
          "What happens if the nominee dies or disputes ownership of my Bali property?",
        answer:
          "If the Indonesian nominee dies, the property passes automatically to their statutory heirs under Indonesian inheritance law, regardless of any private agreement. Heirs can include a spouse, children, and parents, each with a legal share. The foreign buyer has no enforceable claim because the private nominee agreement is void. If the nominee disputes ownership while alive, Indonesian courts follow Supreme Court Circular No. 10 of 2020 (SEMA 10/2020), which instructs courts to recognize the registered certificate holder as the legal owner, not the undisclosed foreign beneficiary.",
      },
    ],
    publishedAt: "2026-07-30",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/nominee-property-contract-blueprints.webp",
    gallery: [
      {
        url: "/blog/nominee-handshake-agreement-documents.webp",
        alt: "Two people shaking hands across a table with legal documents visible between them, representing the informal trust-based nominee arrangement that Indonesian law prohibits for foreign property buyers",
        credit: "Ron Lach / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/unrecognizable-hands-handshaking-over-table-9870223/",
      },
      {
        url: "/blog/nominee-legal-consultation-property.webp",
        alt: "A lawyer seated across from two clients in a law office with a Lady Justice figurine on the desk, illustrating the legal consultation a foreign buyer should seek before structuring a Bali property purchase",
        credit: "Karola G / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/couple-in-lawyer-office-7876153/",
      },
    ],
    citations: [
      {
        label:
          "Indonesia Basic Agrarian Law (UUPA), Law No. 5 of 1960, Article 26(2): any direct or indirect transfer of Hak Milik to a foreign national is null and void by law; land may revert to the state (Tier 1)",
        url: "https://peraturan.go.id/peraturan/view.html?id=11e44c4ea27e84bfa3100000fb5a0c5a",
      },
      {
        label:
          "BKPM: Indonesia Investment Law No. 25 of 2007, Article 33 (English translation) - nominee agreements for company shares explicitly prohibited and declared null and void (Tier 1)",
        url: "https://jdih-storage.bkpm.go.id/jdih/jdih/2007UUINVESTMENT25-ENGLISH-.pdf",
      },
      {
        label:
          "Kompas Properti: Supreme Court Circular SEMA No. 10 of 2020 - courts to recognize the certificate holder as legal owner; nominee name-borrowing practice not recognized (Tier 1, as reported by Kompas Properti)",
        url: "https://properti.kompas.com/read/2020/02/18/195049521/ma-tak-akui-praktik-pinjam-nama-wna-atas-kepemilikan-tanah",
      },
      {
        label:
          "Seven Stones Indonesia Real Estate: Bali Perda No. 4 of 2026 - criminal ban on nominee land arrangements; penalties up to 5 years and IDR 1 billion (Tier 2)",
        url: "https://realestate.sevenstonesindonesia.com/bali-officially-bans-nominee-practice-for-land-ownership/",
      },
      {
        label:
          "University of Indonesia Law Journal (Jurnal Reformasi Hukum Vol. 28): analysis of Denpasar District Court nominee case No. 274/Pdt.G/2020/PN Dps; courts applied UUPA Articles 9(1), 21(1), and 26(2) to void nominee agreements (Tier 2 academic)",
        url: "https://ojs.uid.ac.id/index.php/jrh/article/view/1024",
      },
      {
        label:
          "BPK Law Database: Government Regulation PP No. 18 of 2021, Article 51 - Hak Pakai for foreign nationals with valid Indonesian stay permits; maximum term 30 + 20 + 30 years (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/163505/pp-no-18-tahun-2021",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "best-area-bali-property-investment-2026",
    title: "Best Area in Bali to Buy Property in 2026",
    category: "location",
    imageUrl: null,
    sortOrder: 50,
    metaDescription:
      "The best area in Bali to buy property in 2026 depends on your goal: Canggu for yield, Uluwatu for growth, or Tabanan for lowest entry and widest upside.",
    body: `<p>Bali's main investment areas fall into four distinct markets, each with a different risk-return profile. Canggu leads in transaction volume and proven rental demand; Uluwatu leads in land price appreciation; Seminyak is largely saturated; and the Tabanan corridor, running from Kaba Kaba to Kedungu, offers the widest upside from the lowest entry point.</p><p>Canggu, in Badung Regency, accounts for roughly a third of all Bali property transactions. Land here runs from IDR 1.5 billion to 3 billion per are, and prime pool villas produce gross rental yields in the range of 10 to 18 percent, according to <a href="https://www.exotiqproperty.com/blog/where-to-buy-real-estate-in-bali" data-external="true">Exotiq Property</a>. Short-term rental occupancy in well-managed villas averages 70 to 80 percent annually. The trade-off is high entry cost and limited remaining land.</p><p>Uluwatu and the southern Bukit peninsula draw buyers who want lower entry with faster appreciation. Land there runs roughly 40 percent below Canggu pricing, yet net rental yields are broadly similar because cliff-view villa nightly rates run high. Land values on the Bukit have grown 25 to 35 percent in recent years as luxury hotel groups expand into the area.</p><p>Seminyak, between Canggu and Kuta, is a mature market. Nearly all buildable land is developed, new supply is minimal, and price growth has been flat. It suits buyers seeking an established yield-producing asset rather than capital appreciation.</p><p>The Tabanan corridor, including Kaba Kaba, Kedungu, and Nyanyi, offers land at 50 to 60 percent below Badung pricing. The growth catalyst is <a href="/blog/what-is-nuanu-creative-city">Nuanu Creative City</a>, a 40-hectare mixed-use development reshaping the area's profile. One check to run before buying: Bali's provincial government restricted new tourism construction on productive agricultural land in Tabanan and five other districts, per <a href="https://www.thejakartapost.com/indonesia/2025/09/17/bali-to-issue-regulationbanning-villa-and-hotel-construction-on-agricultural-land.html" data-external="true">The Jakarta Post</a>. Any project with permits already in place is unaffected, but confirming this is a due diligence step, not a formality.</p><p>Ubud serves a different buyer profile, focused on wellness retreats and boutique villas rather than the coastal short-term rental market. For a head-to-head comparison of Canggu and Tabanan, see our <a href="/blog/canggu-vs-tabanan-property-investment">Canggu vs Tabanan guide</a>. All yield and price figures are indicative ranges from Bali property agencies active in 2026 and are not guarantees. This is general information, not financial advice.</p>`,
    venues: [
      {
        name: "Canggu (Batu Bolong Beach)",
        distance: "20-25 min",
        coords: "-8.6478,115.1385",
        url: "https://maps.google.com/?q=Canggu+Bali",
      },
      {
        name: "Kedungu Beach, Tabanan",
        distance: "5-10 min",
        coords: "-8.6742,115.0939",
        url: "https://maps.google.com/?q=Kedungu+Beach+Tabanan+Bali",
      },
      {
        name: "Uluwatu, Bukit Peninsula",
        distance: "50-60 min",
        coords: "-8.8291,115.0851",
        url: "https://maps.google.com/?q=Uluwatu+Bali",
      },
      {
        name: "Seminyak Beach",
        distance: "30-35 min",
        coords: "-8.6938,115.1618",
        url: "https://maps.google.com/?q=Seminyak+Bali",
      },
    ],
    faq: [
      {
        question:
          "Which Bali area has the highest rental yields: Canggu, Uluwatu, or Tabanan?",
        answer:
          "Canggu consistently achieves the highest gross rental yields for pool villas, typically 10 to 18 percent, driven by deep year-round demand from digital nomads and short-stay tourists. Uluwatu produces broadly similar net yields despite lower entry prices because cliff-view villa nightly rates run high. Tabanan yields are lower but growing as Nuanu Creative City and the Kedungu coastal strip attract operators. Yield figures are indicative ranges from Bali property agencies, not guarantees, and depend on management quality, villa design, and occupancy. This is not financial advice.",
      },
      {
        question:
          "Is Ubud or Seminyak better for a Bali investment villa?",
        answer:
          "These areas serve different guests and are difficult to compare on raw yield alone. Seminyak is a mature coastal market with established tourist infrastructure, minimal new land supply, and flat recent price growth. Ubud draws a wellness and cultural travel demographic with distinct nightly rates and occupancy patterns. Seminyak suits a buyer seeking a stable, established rental asset in a well-known location; Ubud suits one seeking a boutique lifestyle property with a niche occupancy profile. Neither currently matches Canggu or Uluwatu for transaction liquidity or land appreciation pace.",
      },
      {
        question:
          "What areas of Bali are seeing the fastest property price growth?",
        answer:
          "Uluwatu and the southern Bukit peninsula have seen the fastest recent land price growth, with appreciation of 25 to 35 percent in recent years according to Bali property agencies. The Tabanan corridor, including Kedungu and Kaba Kaba, is the emerging market with the widest potential upside from a lower current base, driven by the Nuanu Creative City development and the westward expansion of the Canggu corridor. Canggu itself has appreciated strongly over five years but is closer to its price ceiling as available land is largely built out. These figures are indicative estimates from market participants, not forecasts, and are not financial advice.",
      },
    ],
    publishedAt: "2026-07-31",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/bali-rocky-coastline-aerial.webp",
    gallery: [
      {
        url: "/blog/uluwatu-cliff-coastline-sunset.webp",
        alt: "Aerial view of Uluwatu's limestone cliff face dropping to the Indian Ocean at dusk, with waves breaking at the base and a small structure visible on the clifftop, representing one of Bali's fastest-appreciating property corridors",
        credit: "Saksham Vikram / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/stunning-cliffside-view-in-uluwatu-bali-at-sunset-30286799/",
      },
      {
        url: "/blog/bali-black-sand-beach-aerial.webp",
        alt: "Top-down aerial of a Bali black sand beach with white foam from breaking waves, characteristic of the volcanic coastline running through the Tabanan and west Badung corridor near Kedungu and Nyanyi",
        credit: "Agung Pandit Wiguna / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/aerial-view-of-a-brown-beach-17053179/",
      },
      {
        url: "/blog/bali-coastal-neighborhood-aerial.webp",
        alt: "Aerial view of a dense Bali coastal neighborhood with traditional terracotta-tiled rooftops and green gardens stretching toward a blue ocean horizon, illustrating the built-out character of established areas such as Seminyak and southern Canggu",
        credit: "Tom Fisk / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/aerial-view-of-bali-coastal-landscape-in-indonesia-34595065/",
      },
    ],
    citations: [
      {
        label:
          "Exotiq Property: Where to buy real estate in Bali - area guide covering Canggu, Uluwatu, Seminyak, and Tabanan with pricing and yield context (Tier 2)",
        url: "https://www.exotiqproperty.com/blog/where-to-buy-real-estate-in-bali",
      },
      {
        label:
          "Emerhub: Where to Invest in Bali - best areas for foreign investors including ownership structure and yield overview (Tier 2)",
        url: "https://emerhub.com/bali/best-areas-to-invest-bali/",
      },
      {
        label:
          "The Jakarta Post: Bali to issue regulation banning villa and hotel construction on agricultural land in six districts including Tabanan (Tier 1 news)",
        url: "https://www.thejakartapost.com/indonesia/2025/09/17/bali-to-issue-regulationbanning-villa-and-hotel-construction-on-agricultural-land.html",
      },
    ],
    showMap: true,
    mapCoords: "-8.700,115.120",
    layoutVariant: "map",
  },
  {
    slug: "bali-land-use-zoning-for-villa-investors",
    title: "Bali Land Use Zoning: Can You Build a Rental Villa There?",
    category: "investment",
    imageUrl: null,
    sortOrder: 51,
    metaDescription:
      "Not every Bali plot allows a rental villa. Learn Bali land use zones (pink, yellow, green), how to check before buying, and the 2025 agricultural land rules.",
    body: `<p>Not every Bali plot allows a rental villa. Bali's land use is governed by a provincial spatial plan (RTRW) established under <a href="https://peraturan.bpk.go.id/Details/262423/perda-prov-bali-no-2-tahun-2023" data-external="true">Perda No. 2 of 2023</a>, which divides all land in the province into zones with distinct building rights. Buying a parcel without confirming its zone first is the most common and most expensive mistake foreign buyers make.</p><p>The pink zone (kawasan pariwisata, tourist area) is where short-term rental villas legally belong. Hotels, resorts, and holiday accommodation are permitted here. The yellow zone (kawasan permukiman, residential area) allows housing and some long-stay villas, depending on the regency's detailed plan. The green zone (kawasan pertanian, agricultural area) is where problems arise. Commercial villa construction on agricultural land is prohibited under the RTRW, and enforcement has tightened sharply since 2024. Conservation zones carry the strictest rules and exclude all commercial development.</p><p>Enforcement hardened further in late 2025. Governor Wayan Koster issued Gubernatorial Decree No. 5 of 2025, prohibiting any conversion of Sustainable Food Crop Land (LP2B) and Standard Rice Field Area (LBS) for non-agricultural use. The decree became law on December 2, 2025. Bali's rice field coverage fell from 70,996 hectares in 2019 to approximately 64,474 hectares by early 2026, losing around 1,000 hectares a year. Developers who already held a valid building permit (PBG) before the decree are not affected. Any new permit application on protected agricultural land faces rejection. For more on building permits, see our <a href="/blog/bali-villa-building-permit-pbg-explained">guide to PBG permits</a>.</p><p>You can run a preliminary zone check using the national GISTARU portal at <a href="https://gistaru.atrbpn.go.id" data-external="true">gistaru.atrbpn.go.id</a>, operated by the Ministry of Agrarian Affairs (ATR/BPN). For a formal answer, request an SKRK (Surat Keterangan Rencana Kota, zoning certificate) from the local regency planning office, or ask your PPAT notary to obtain a KKPR (space utilization conformity document) through the OSS portal. One practical limit: Bali's detailed zoning layer (RDTR) covered only about 23 percent of the province as of mid-2024, so the online map may not resolve every parcel. For those areas, a direct inquiry to the regency planning office (BAPPEDA) gives the definitive answer.</p><p>Getting the zone wrong carries real consequences. Badung authorities demolished more than 40 villas in Bingin in 2024 for zone violations, and fines for unauthorized construction average around IDR 500 million (roughly USD 32,000). A 2023 Bali Provincial Government report identified 120 properties in Bingin and Uluwatu as breaching zone restrictions. Under the 2025 decree, converting LP2B land for a villa can now result in criminal prosecution rather than administrative penalties alone. Check the zone before you sign. For a full pre-purchase checklist, see <a href="/blog/bali-property-due-diligence-checklist">Bali off-plan due diligence</a>.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What is the difference between green zone and tourist zone land in Bali?",
        answer:
          "The pink tourist zone (kawasan pariwisata) is for commercial hospitality, including rental villas, hotels, and resorts. A short-term rental permit (Pondok Wisata or hotel license) can only be issued on correctly zoned tourist land. The green zone (kawasan pertanian) is agricultural land where commercial villa construction is prohibited under Perda No. 2/2023. Buildings in green zones must serve farming or conservation purposes. Buying a green-zone plot expecting to build a rental villa is not legally workable.",
      },
      {
        question:
          "Can a foreign buyer check the zoning of a Bali plot before buying?",
        answer:
          "Yes. Start with the GISTARU interactive map at gistaru.atrbpn.go.id, run by the Ministry of Agrarian Affairs (ATR/BPN). The map shows colour-coded zones across Bali. Follow that with a formal SKRK zoning certificate from the local regency planning office, which confirms the zone, building coverage ratio, and permitted uses for the specific parcel. Your PPAT notary can also verify through the OSS portal (oss.go.id) using a KKPR application. Treat the online map as an initial screen, not a final answer, since Bali's detailed zoning layer (RDTR) covered only about 23 percent of the province as of mid-2024.",
      },
      {
        question:
          "What happens if a Bali villa is built on illegally zoned land?",
        answer:
          "Authorities can issue a demolition order, revoke the building permit (PBG), and impose fines. In 2024, Badung regency demolished more than 40 villas in Bingin for zone violations. Fines for unauthorized construction average around IDR 500 million (roughly USD 32,000). Under Bali Gubernatorial Decree No. 5 of 2025, converting LP2B protected rice field land for villa construction can also result in criminal prosecution, not just administrative penalties.",
      },
    ],
    publishedAt: "2026-08-01",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/bali-village-green-zone-aerial.webp",
    gallery: [
      {
        url: "/blog/bali-rice-fields-village-development-aerial.webp",
        alt: "Aerial view of rural Bali showing green rice paddies alongside village rooftops and agricultural land, illustrating the contrast between Bali's protected green zones and permissible development areas",
        credit: "Wayan Parmana / Pexels",
        sourceUrl: "https://www.pexels.com/photo/6801571/",
      },
      {
        url: "/blog/bali-agricultural-zone-rice-paddies-hut.webp",
        alt: "Drone view of lush green Balinese rice paddies with a solitary hut, representing the agricultural green zone land where commercial villa construction is prohibited under Bali's RTRW spatial plan",
        credit: "Tom Fisk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/35669317/",
      },
    ],
    citations: [
      {
        label:
          "Peraturan Daerah Provinsi Bali No. 2 Tahun 2023 (RTRW Bali 2023-2043) - official provincial spatial plan regulation (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/262423/perda-prov-bali-no-2-tahun-2023",
      },
      {
        label:
          "Taru Bali (Bali Provincial Spatial Planning Information System) - RTRWP zone guidance and updates (Tier 1)",
        url: "https://tarubali.baliprov.go.id/rtrwp-bali/",
      },
      {
        label:
          "GISTARU (Ministry of Agrarian Affairs ATR/BPN) - national interactive zoning map portal (Tier 1)",
        url: "https://gistaru.atrbpn.go.id",
      },
      {
        label:
          "The Jakarta Post: Bali to issue regulation banning villa and hotel construction on agricultural land in six districts including Tabanan (Tier 1 news)",
        url: "https://www.thejakartapost.com/indonesia/2025/09/17/bali-to-issue-regulationbanning-villa-and-hotel-construction-on-agricultural-land.html",
      },
      {
        label:
          "Emerhub: Bali Criminalizes Rice Field Conversions - LP2B land protection and enforcement implications for villa buyers (Tier 2)",
        url: "https://emerhub.com/news/bali-criminalizes-rice-field-conversions/",
      },
    ],
    layoutVariant: "gallery",
  },
  {
    slug: "bali-leasehold-renewal-process-investors",
    title: "Bali Leasehold Renewal: What Investors Need to Negotiate",
    category: "investment",
    imageUrl: null,
    sortOrder: 52,
    metaDescription:
      "Bali leasehold renewal has no statutory right to renew. Learn how Hak Sewa and HGB extensions work, when to negotiate, and what clauses to demand upfront.",
    body: `<p>A Bali leasehold renewal is only as strong as the extension clause written into the original deed. Indonesian law gives foreign buyers no automatic right to renew a private lease (Hak Sewa), so every year of tenure beyond the initial term depends on language your notary drafted before you signed.</p><p>Most foreign buyers hold Bali property through a Hak Sewa, a private lease executed before a licensed Indonesian notary (PPAT). The term is whatever the parties negotiate; developers commonly offer 25 to 30 years as the initial period, with extension clauses that push the total effective term to 50 to 80 years. Because Hak Sewa is not registered at the National Land Agency (BPN), the notarized deed in Bahasa Indonesia is your entire legal protection. English translations carry no independent weight in an Indonesian court.</p><p>Buyers who purchase through a PT PMA company hold Hak Guna Bangunan (HGB), a BPN-registered title. Under Government Regulation PP 18 of 2021, HGB runs 30 years initially, extendable for 20 years, then renewable for another 30 years, for a maximum of 80 years. Renewal is an administrative application to the local land office (kantor pertanahan), not a private negotiation. File it at least 12 months before the title lapses, and keep land tax (PBB) payments current, since arrears can block the renewal.</p><p>On the Hak Sewa side, established Bali property consultancies agree: lock the extension terms in at signing, not later. Once your villa is built and earning rental income, the landowner's negotiating leverage grows substantially. The clause wording is what separates a meaningful protection from a formality. A jaminan perpanjangan (guarantee of extension) creates a binding contractual obligation; a prioritas perpanjangan (priority right) gives you only first refusal and is far weaker. For renewal pricing, a three-valuer appraisal by KJPP-certified Indonesian appraisers is the most commonly recommended balanced approach. Avoid any clause that sets the renewal price by "mutual agreement" with no independent valuation mechanism. Also confirm the clause explicitly binds the landowner's heirs and successors in title.</p><p>If a guarantee clause exists and the landowner refuses to honor it, you have grounds to pursue specific performance or damages in an Indonesian civil court under the Civil Code. In practice, proceedings move slowly and are conducted in Bahasa Indonesia, so enforcement is not guaranteed even with a strong clause. Where no extension clause exists at all, structures you built on the land revert to the freehold owner when the term ends. This is general information and not legal advice. For ownership structures available to US and UAE buyers, see our <a href="/blog/foreigners-buy-property-bali">guide for foreign buyers</a> and our <a href="/blog/freehold-vs-leasehold-bali">freehold vs leasehold comparison</a>. Confirm your specific position with a licensed Indonesian PPAT notary before committing.</p>`,
    venues: [],
    faq: [
      {
        question:
          "When should a Bali leasehold renewal be negotiated, at signing or later?",
        answer:
          "At the time of signing the original lease. Once a villa is built and generating rental income, the landowner's negotiating leverage increases significantly. Where an existing lease lacks a strong extension clause, industry guidance recommends approaching renewal talks 3 to 5 years before the term ends, while the property is still generating income and the buyer still holds some leverage. Inside 12 months of expiry, that leverage shifts almost entirely to the landowner.",
      },
      {
        question:
          "What happens if a Bali landowner refuses to renew a leasehold?",
        answer:
          "It depends on the contract language. If the deed contains a jaminan perpanjangan (guarantee of extension), the refusal is a breach of contract under the Indonesian Civil Code, giving you grounds to sue for specific performance or damages. If the deed has no extension clause, or only a prioritas perpanjangan (priority right), you have no statutory claim to renewal. Without a binding clause, all structures built on the land revert to the freehold owner at the end of the term, with no statutory compensation requirement.",
      },
      {
        question:
          "How is leasehold renewal price set for a Bali villa?",
        answer:
          "Three pricing mechanisms appear in market practice. A fixed price written in IDR into the original deed is the most protective for the buyer but rare, since landowners anticipating land appreciation are rarely willing to fix the price decades in advance. A three-valuer appraisal by KJPP-certified Indonesian licensed appraisers is the most balanced approach recommended by Bali property specialists. A third option is a formula linked to Statistics Indonesia (BPS) CPI inflation data. Avoid any clause that says the price will be set by mutual agreement with no independent valuation mechanism.",
      },
    ],
    publishedAt: "2026-08-02",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/leasehold-renewal-handshake-agreement.webp",
    gallery: [
      {
        url: "/blog/bali-villa-infinity-pool-sunset.webp",
        alt: "Bali-style villa with infinity pool reflecting a golden sunset sky and tropical greenery, representing the leasehold asset a foreign investor needs to protect through a well-drafted lease extension clause negotiated at signing",
        credit: "Kevin Yung / Pexels",
        sourceUrl: "https://www.pexels.com/photo/34790496/",
      },
      {
        url: "/blog/leasehold-contract-clause-review.webp",
        alt: "Two people reviewing and signing a property purchase document at a desk, illustrating the importance of negotiating leasehold extension clauses and renewal pricing mechanisms at the time of signing the original Bali lease deed",
        credit: "RDNE Stock Project / Pexels",
        sourceUrl: "https://www.pexels.com/photo/8292787/",
      },
    ],
    citations: [
      {
        label:
          "ILA Global Consulting: Leasing Property in Bali - Hak Sewa structure, notary requirements, and extension clause best practices (Tier 2)",
        url: "https://ilaglobalconsulting.com/leasing-property-bali/",
      },
      {
        label:
          "Emerhub: Leasehold Property in Bali for Foreign Investors - when and how to negotiate renewals (Tier 2)",
        url: "https://emerhub.com/bali/leasing-property/",
      },
      {
        label:
          "Exotiq Property: What is a Leasehold Title in Bali - term structure, extension clause types, and pricing mechanisms (Tier 2)",
        url: "https://www.exotiqproperty.com/blog/leasehold-title-bali",
      },
      {
        label:
          "ICLG: Indonesia Real Estate Laws and Regulations 2025 - HGB renewal process under PP 18/2021 (authoritative legal reference)",
        url: "https://iclg.com/practice-areas/real-estate-laws-and-regulations/indonesia",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-villa-occupancy-rates-investors",
    title: "Bali Villa Occupancy Rates: What Investors Should Expect",
    category: "investment",
    imageUrl: null,
    sortOrder: 53,
    metaDescription:
      "What occupancy can a Bali rental villa realistically expect? BPS data shows 60 to 75 percent annually, with clear peaks in July to August and at Christmas.",
    body: `<p>A well-positioned Bali rental villa can realistically expect annual occupancy in the range of 60 to 75 percent, based on official accommodation data and short-term rental platform figures. Location, management quality, and the time of year each move that figure considerably.</p><p>The clearest benchmark comes from <a href="https://bali.bps.go.id/en/publication/2025/10/29/87025aedfe6f78db04bac3e5/room-occupancy-rate-accommodation-bali-province-2024.html" data-external="true">BPS Statistics Indonesia</a>, which publishes monthly Room Occupancy Rates (TPK) for Bali's classified hotels. The annual average for star-rated accommodation reached 62.36 percent in 2024. Monthly figures show the seasonal spread: January 2024 came in at 56.27 percent while August 2024 hit 70.16 percent. Privately managed villas on short-term rental platforms track a similar arc; <a href="https://airbtics.com/annual-airbnb-revenue-in-bali-indonesia/" data-external="true">Airbtics</a> reported a median occupancy of roughly 63 percent for Bali listings across the February 2025 to January 2026 period.</p><p>Seasonality is the factor that matters most for yield planning. Bali has two demand peaks. The dry-season peak (July through August and the Christmas to New Year window) pushes prime-zone properties toward 75 to 85 percent occupancy. The shoulder months of February through May see that drop to 45 to 55 percent. Bali's rainy season does not deliver the near-shutdown seen in parts of Thailand. International arrivals grew 19.4 percent in 2024 to 6.33 million visitors, and sustained long-haul demand from Australia, the US, and Europe keeps off-season occupancy from falling as steeply as it does in markets with narrower visitor bases.</p><p>Location amplifies the effect. Villas in Canggu, Seminyak, and Uluwatu carry deep booking-platform histories and proximity to surf and dining that keeps guests coming in quieter months. Emerging areas such as Tabanan and Kaba Kaba offer lower entry prices and growing demand driven partly by the <a href="/blog/what-is-nuanu-creative-city">Nuanu Creative City development</a>, though their occupancy track records are still short. Management quality runs a close second to location: professionally operated properties that handle dynamic pricing, photography, and guest communications typically outperform self-managed equivalents by 10 to 15 percentage points on annual occupancy.</p><p>One factor worth noting: active listings in Bali grew roughly 18 percent year-on-year through 2025, which puts downward pressure on average daily rates even while occupancy stays broadly stable. A villa with differentiated design or a distinct amenity set holds its bookings better as the market deepens. These figures are a guide for due diligence, not a guaranteed return. Actual performance depends on the specific property, the operator you appoint, and market conditions that can change. This is not financial advice; consult a qualified property adviser before committing capital.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What is the average occupancy rate for Bali villas in peak and off season?",
        answer:
          "In peak season (July through August and the Christmas to New Year window), well-managed villas in prime zones commonly reach 75 to 85 percent occupancy. In the shoulder months of February through May, the same properties typically see 45 to 55 percent. BPS Statistics Indonesia data for star-rated accommodation in Bali shows an annual average of 62.36 percent for 2024, with August hitting 70.16 percent and January at 56.27 percent. Short-term rental platforms report a similar mid-year median for private villa listings.",
      },
      {
        question:
          "How does Bali villa occupancy compare to Phuket or Mykonos?",
        answer:
          "Direct comparison is difficult because reporting methods differ across markets. Bali's year-round visitor base, drawing both short-haul travellers from Australia and long-haul arrivals from the US and Europe, produces a more even occupancy curve than Phuket, where demand outside the November to April high season can fall sharply. Mykonos is intensely seasonal with very high occupancy from June to September but near-zero from October to May. Bali's annual average of roughly 62 to 63 percent across all classified accommodation is higher than many island leisure markets maintain across a full twelve months.",
      },
      {
        question:
          "What factors most affect Bali villa occupancy rates?",
        answer:
          "Location is the largest single factor; established short-stay zones in Canggu, Seminyak, and Uluwatu consistently outperform newer or off-track areas. Professional management that handles dynamic OTA pricing, high-quality photography, and prompt guest communications typically adds 10 to 15 percentage points to annual occupancy compared with self-management. Villa design quality and distinctiveness matter increasingly as the number of active listings grows. Finally, booking-window timing: demand for peak-season dates accelerates 6 to 8 weeks out, and operators who adjust minimum-stay rules and pricing at that point capture the highest average daily rates.",
      },
    ],
    publishedAt: "2026-08-03",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/bali-cliffside-resort-villa-aerial.webp",
    gallery: [
      {
        url: "/blog/tropical-resort-pool-guests-aerial.webp",
        alt: "Aerial view of a tropical resort showing guests in a large outdoor pool surrounded by palm trees and beach vegetation, illustrating the occupancy demand that drives Bali short-term rental yields",
        credit: "Danilo Lopes / Pexels",
        sourceUrl: "https://www.pexels.com/photo/tropical-resort-aerial-view-with-pools-and-palm-trees-33191057/",
      },
      {
        url: "/blog/bali-villa-garden-waterfeature.webp",
        alt: "Ground-level view of a Balinese villa garden with a reflective water feature, decorative stone bowls, and tropical palms, representing the style of property that attracts short-term rental guests to Bali",
        credit: "Kseniya Kobi / Pexels",
        sourceUrl: "https://www.pexels.com/photo/garden-resort-with-palm-trees-near-swimming-pool-8159777/",
      },
    ],
    citations: [
      {
        label:
          "BPS Statistics Indonesia Bali Province: Room Occupancy Rate Accommodation Bali Province 2024 - annual star hotel TPK 62.36 percent (Tier 1)",
        url: "https://bali.bps.go.id/en/publication/2025/10/29/87025aedfe6f78db04bac3e5/room-occupancy-rate-accommodation-bali-province-2024.html",
      },
      {
        label:
          "BPS Statistics Indonesia Bali Province: Tourism Overview August 2025 - monthly TPK data including August 2024 peak at 70.16 percent (Tier 1)",
        url: "https://bali.bps.go.id/en/pressrelease/2025/10/01/717985/tourism-overview-of-bali-province--august-2025.html",
      },
      {
        label:
          "BPS Statistics Indonesia Bali Province: Foreign Tourist Statistics of Bali Province 2024 - 6.33 million international arrivals, 19.4 percent annual growth (Tier 1)",
        url: "https://bali.bps.go.id/en/publication/2025/07/28/ebb7c3b73638d228089e6cea/foreign-tourist-statistics-of-bali-province-2024.html",
      },
      {
        label:
          "Airbtics: Bali Airbnb Data 2026 - median short-term rental occupancy approximately 63 percent for the February 2025 to January 2026 period (Tier 2 industry data)",
        url: "https://airbtics.com/annual-airbnb-revenue-in-bali-indonesia/",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-vs-mauritius-property-investment",
    title: "Bali vs Mauritius Property for Foreign Investors",
    category: "investment",
    imageUrl: null,
    sortOrder: 54,
    metaDescription:
      "Bali vs Mauritius property for foreign investors: freehold in Mauritius versus leasehold in Bali, with rental yields, taxes, and residency compared.",
    body: `<p>Both Bali and Mauritius attract foreign property buyers with island settings and lifestyle appeal, but they sit at opposite ends of several key axes: Mauritius offers freehold title and an automatic residence permit above a price threshold; Bali delivers rental yields that are typically two to three times higher, with a larger tourism market and lower entry costs.</p><p>In Mauritius, foreigners must purchase within government-approved schemes administered by the <a href="https://edbmauritius.org/info_centre/property-development-scheme" data-external="true">Economic Development Board (EDB)</a>. The current framework is the Property Development Scheme (PDS), which replaced the older Integrated Resort Scheme (IRS) for new developments. Both give the buyer freehold ownership, with title registered in the buyer's name and no expiry date. A purchase above USD 375,000 in a qualifying development grants a permanent residence permit to the buyer, their spouse, and dependent children under 24, valid for the full period of ownership. From 1 July 2026, the registration duty on these non-citizen purchases rose from 5 percent to 10 percent of the transaction price under the <a href="https://mauritiusassembly.govmu.org/mauritiusassembly/wp-content/uploads/2025/08/18_THE-FINANCE-ACT-2025-.pdf" data-external="true">Mauritius Finance Act 2025</a>.</p><p>In Bali, foreigners cannot hold freehold land (Hak Milik). The practical routes are a long-term leasehold, typically structured as 25 to 30 years with an extension option negotiated at signing, or holding the property through a PT PMA, a foreign-owned Indonesian company that can hold Hak Guna Bangunan (HGB) title. Neither gives outright freehold. A PT PMA adds setup costs and annual compliance obligations but provides the stronger title security of the two. There is no minimum purchase price in Bali, and residency is not automatically linked to buying; the Indonesia Second Home Visa requires a separate application.</p><p>Rental yields diverge sharply. <a href="https://www.globalpropertyguide.com/africa/mauritius/rental-yields" data-external="true">Global Property Guide</a> reports average gross rental yields in Mauritius of approximately 3.07 to 3.22 percent across its residential market. Bali recorded 6.33 million international arrivals in 2024 per <a href="https://bali.bps.go.id/en/publication/2025/07/28/ebb7c3b73638d228089e6cea/foreign-tourist-statistics-of-bali-province-2024.html" data-external="true">BPS Statistics Indonesia</a>, supporting a much larger short-stay market; well-managed villas in established zones generate gross yields broadly in the 8 to 12 percent range. The Mauritius market drew 1,382,177 arrivals in 2024, per the <a href="https://tourism.govmu.org/Documents/Statistics/Handbook%20of%20Statistical%20Data%20on%20Tourism,%20Year%202024.pdf" data-external="true">Republic of Mauritius Handbook of Statistical Data on Tourism</a>.</p><p>Mauritius holds advantages on the tax side: no capital gains tax, no inheritance tax, and no annual property tax. Non-resident rental income is subject to a flat 15 percent withholding tax. In Bali, annual property tax (PBB) is modest at roughly 0.5 percent of assessed value; rental income withholding rates range from 10 to 20 percent depending on the owner's residency status (see our <a href="/blog/tax-for-foreign-property-owners-bali">Bali rental income tax guide</a> for details). On a sale, the Indonesian seller pays 2.5 percent PPh on the gross sale price, while Mauritius levies no capital gains tax on the vendor.</p><p>A US or UAE investor who wants freehold title, a residence permit, and a simplified tax environment will find Mauritius delivers on those criteria, at the cost of lower rental income potential and higher transaction costs from July 2026 onwards. An investor focused on rental yield from a high-volume tourism market, with a lower entry price and flexible ownership structure, will find Bali the stronger choice. These are indicative ranges based on available market data, not guaranteed returns. This is not financial advice; consult a qualified adviser before committing capital.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Can foreigners own freehold property in Mauritius easier than in Bali?",
        answer:
          "Yes. In Mauritius, foreigners can buy freehold residential property within EDB-approved schemes such as the PDS and IRS, giving outright ownership of land and building with no expiry date and title registered in their name. In Bali, freehold land (Hak Milik) is not available to foreigners. The options are a long-term leasehold or holding property via a PT PMA, a foreign-owned Indonesian company. The Mauritius route offers clearer title security, though it requires buying within an approved scheme at a price that typically starts well above USD 200,000.",
      },
      {
        question: "How do Bali and Mauritius rental yields compare?",
        answer:
          "The gap is significant. Mauritius averages approximately 3 to 4 percent gross across its residential market according to Global Property Guide data. Bali, backed by over 6 million international arrivals per year, sees well-managed villas in established short-stay zones generating broadly 8 to 12 percent gross. The difference reflects the scale and nature of each market: Mauritius draws a smaller, higher-spend visitor base while Bali supports year-round, mass-market tourism demand that fills short-term rentals consistently.",
      },
      {
        question:
          "What visa does owning property in Mauritius give versus Bali?",
        answer:
          "In Mauritius, purchasing a qualifying PDS or IRS property above USD 375,000 automatically triggers a permanent residence permit for the buyer, their spouse, and dependent children under 24, valid as long as they hold the property. In Bali, property ownership does not trigger a visa directly. Foreign investors typically apply separately for the Indonesia Second Home Visa, which is based on financial criteria rather than a specific purchase price. The Indonesia Golden Visa property route requires a minimum apartment purchase of USD 1 million.",
      },
    ],
    publishedAt: "2026-08-04",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/mauritius-le-morne-peninsula-aerial.webp",
    gallery: [
      {
        url: "/blog/mauritius-aerial-coast.webp",
        alt: "High-altitude aerial view of Mauritius showing the Le Morne peninsula, turquoise lagoon, and coastline, representing the island setting that attracts foreign property investors",
        credit: "Vince (Vincent Rivaud) / Pexels",
        sourceUrl: "https://www.pexels.com/photo/34870508/",
      },
      {
        url: "/blog/mauritius-beach-resort-huts.webp",
        alt: "Mauritius beach resort with traditional thatched palm umbrellas and sunloungers beside calm turquoise water, representing the luxury resort setting of PDS and IRS scheme properties",
        credit: "Vince (Vincent Rivaud) / Pexels",
        sourceUrl: "https://www.pexels.com/photo/34732320/",
      },
    ],
    citations: [
      {
        label:
          "EDB Mauritius: Property Development Scheme - official scheme rules, USD 375,000 residence permit threshold, freehold ownership rights for non-citizens (Tier 1)",
        url: "https://edbmauritius.org/info_centre/property-development-scheme",
      },
      {
        label:
          "Mauritius Finance Act 2025 (Act No. 18 of 2025) - registration duty on non-citizen property acquisitions raised from 5% to 10% effective 1 July 2026 (Tier 1)",
        url: "https://mauritiusassembly.govmu.org/mauritiusassembly/wp-content/uploads/2025/08/18_THE-FINANCE-ACT-2025-.pdf",
      },
      {
        label:
          "Global Property Guide: Gross Rental Yields in Mauritius - approximately 3.07 to 3.22 percent in Q3 2025 to Q1 2026 (Tier 2)",
        url: "https://www.globalpropertyguide.com/africa/mauritius/rental-yields",
      },
      {
        label:
          "BPS Statistics Indonesia Bali Province: Foreign Tourist Statistics of Bali Province 2024 - 6.33 million international arrivals (Tier 1)",
        url: "https://bali.bps.go.id/en/publication/2025/07/28/ebb7c3b73638d228089e6cea/foreign-tourist-statistics-of-bali-province-2024.html",
      },
      {
        label:
          "Republic of Mauritius: Handbook of Statistical Data on Tourism 2024 - 1,382,177 total tourist arrivals, average length of stay 11.4 nights (Tier 1)",
        url: "https://tourism.govmu.org/Documents/Statistics/Handbook%20of%20Statistical%20Data%20on%20Tourism,%20Year%202024.pdf",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-property-developer-vetting-guide",
    title: "How to Vet a Bali Property Developer Before You Buy",
    category: "investment",
    imageUrl: null,
    sortOrder: 55,
    metaDescription:
      "How to vet a Bali off-plan property developer: five checks covering NIB registration, land title, PBG permit, completed project track record, and PPJB terms.",
    body: `<p>Vetting a Bali off-plan developer means running five checks before any money moves: confirm the company is properly registered, verify clean land title, confirm the building permit is in hand, visit a completed project, and scrutinize the PPJB contract terms. Off-plan listings represent roughly 37 percent of Bali's residential supply, according to Colliers Indonesia's 2025 property market report, so the volume of projects is large and the quality of developer documentation varies considerably.</p><p>Start with company registration. Every Indonesian property developer must hold a NIB (Nomor Induk Berusaha) with a KBLI business classification that covers building construction. The code for residential villa development is KBLI 41011. You can look up a developer's NIB and its associated KBLI codes through the <a href="https://oss.go.id/en" data-external="true">OSS portal</a>, administered by BKPM (Indonesia's Investment Coordinating Board). A developer operating as a sole trader or CV rather than a PT or PT PMA lacks the legal structure to hold building rights. For medium and high-risk construction activity, the developer also needs an IUJK (Construction Business License) from the Ministry of Public Works. See our <a href="/blog/pt-pma-setup-bali-property">PT PMA guide</a> for background on the corporate structure that legally registered developers use.</p><p>Next, check the land. The certificate must be in the developer's PT or PT PMA name, held as HGB (Hak Guna Bangunan) title. A certificate in an individual Indonesian's name signals a nominee arrangement, which is legally void under Indonesian property law. Run a preliminary parcel check using the Ministry of ATR/BPN's <a href="https://bhumi.atrbpn.go.id" data-external="true">Bhumi portal</a>, which shows whether a plot is registered and its approximate ownership. To surface encumbrances such as bank mortgages on the land, your PPAT notary must request a certified title extract directly from the local BPN office. Confirm the land is in the correct zone for a rental villa before assuming one is viable there. See our <a href="/blog/bali-land-use-zoning-for-villa-investors">land use zoning guide</a> for details on tourist, residential, and agricultural zones.</p><p>Building permits come next. Under Government Regulation No. 16 of 2021, a developer must hold a PBG (Persetujuan Bangunan Gedung) before breaking ground. Permit applications and numbers are tracked on the government's <a href="https://simbg.pu.go.id" data-external="true">SIMBG portal</a>, run by the Ministry of Public Works. Ask the developer for their SIMBG permit reference and check it yourself. At handover, the developer must deliver an SLF (Sertifikat Laik Fungsi); without it the villa cannot hold a short-term rental license or be legally occupied. If prior completed projects lack an SLF, that is a clear warning sign. Our <a href="/blog/bali-villa-building-permit-pbg-explained">PBG permit guide</a> explains both documents in full.</p><p>Track record is the next check. Ask for the names and addresses of two or three completed projects, then visit them or have a trusted person on the ground confirm delivery dates, SLF status, and handover condition. A developer who cannot point to completed, occupied villas has not demonstrated they can deliver. New entities formed specifically for one project carry the highest completion risk, because there is no history against which to judge the team or the process.</p><p>Finally, scrutinize the <a href="/blog/ppjb-contract-bali-off-plan-explained">PPJB (binding sale agreement)</a>. Under Government Regulation No. 12 of 2021, a PPJB for an off-plan property must be a notarial deed, not a privately signed document. The contract must name a specific handover date, tie each payment to a named construction milestone, and include a financial penalty clause for late delivery. One structural difference US or Dubai buyers should understand: Indonesia has no statutory escrow requirement comparable to Dubai's RERA escrow law. A PPJB holder is a personal-rights creditor, not a secured owner, if a developer defaults. Milestone-linked payments and a penalty clause are your main contractual protections. Have an independent Indonesian property lawyer, not the developer's recommended notary, review the PPJB before you sign. See our <a href="/blog/bali-property-due-diligence-checklist">full due diligence checklist</a> for the broader set of documents to request. This is general information, not legal or financial advice; engage a qualified adviser before committing capital.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What red flags should I look for in a Bali off-plan developer?",
        answer:
          "Key red flags include a land certificate held in an individual Indonesian's name rather than the developer's PT or PT PMA, a NIB with KBLI codes unrelated to construction, marketing before the PBG permit is confirmed in SIMBG, inability to produce SLF documents for prior completed projects, and a demand for a large upfront payment before construction milestones are tied to the contract. Resistance to including a financial penalty clause for late delivery in the PPJB is also a warning sign. A developer who cannot provide real addresses of completed projects they actually built and delivered should be treated with caution.",
      },
      {
        question:
          "How do I verify a Bali developer has the correct land and permits?",
        answer:
          "Check the land certificate number on the Ministry of ATR/BPN's Bhumi portal at bhumi.atrbpn.go.id, which shows whether a plot is registered and its approximate ownership. For a check that also surfaces encumbrances such as bank mortgages, your PPAT notary must request a certified title extract from the local BPN land office. Verify the building permit (PBG) reference on the Ministry of Public Works SIMBG portal at simbg.pu.go.id. Both portals are publicly accessible and free to use. Cross-reference the NIB and KBLI classification of the developer's company on the OSS portal at oss.go.id.",
      },
      {
        question:
          "What questions should I ask before signing a Bali off-plan contract?",
        answer:
          "Before signing a PPJB, ask for: the PBG permit number and its SIMBG reference, the land certificate number and BPN registration details, the NIB and KBLI classification of the developer's company, the addresses of two or three prior completed projects, and a draft PPJB that names a specific handover date, lists each construction milestone with the payment tied to it, and includes a delay penalty clause. The PPJB must be a notarial deed under Government Regulation No. 12 of 2021, not a private signed document. Ask your own Indonesian property lawyer to review the draft before you sign, separate from any notary the developer recommends.",
      },
    ],
    publishedAt: "2026-08-05",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/developer-site-visit-hardhat-review.webp",
    gallery: [
      {
        url: "/blog/construction-site-engineers-discussion.webp",
        alt: "Two engineers wearing hard hats and safety vests discuss construction progress at a large building site with yellow crane structures in the background, representing the site visit check a buyer should make when vetting a Bali off-plan developer",
        credit: "Mikael Blomkvist / Pexels",
        sourceUrl: "https://www.pexels.com/photo/8961065/",
      },
      {
        url: "/blog/developer-credential-document-review.webp",
        alt: "Real estate agent holding a clipboard with property listing documents, explaining the details to a client during a consultation, representing the document and credential review a buyer should conduct when vetting a Bali property developer",
        credit: "RDNE Stock project / Pexels",
        sourceUrl: "https://www.pexels.com/photo/8292784/",
      },
    ],
    citations: [
      {
        label:
          "OSS-RBA portal, BKPM (Ministry of Investment): NIB and KBLI business registration system for Indonesian companies, including property developers (Tier 1)",
        url: "https://oss.go.id/en",
      },
      {
        label:
          "Ministry of ATR/BPN BHUMI portal: digital land parcel ownership and registration status verification map (Tier 1)",
        url: "https://bhumi.atrbpn.go.id",
      },
      {
        label:
          "SIMBG portal, Ministry of Public Works: PBG building permit application and permit number lookup for Indonesian construction projects (Tier 1)",
        url: "https://simbg.pu.go.id",
      },
      {
        label:
          "Government Regulation No. 16 of 2021 (PP 16/2021): legal basis for the PBG building permit system, replacing the former IMB, requiring permit before construction commences (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/161846/pp-no-16-tahun-2021",
      },
      {
        label:
          "Colliers Indonesia Annual Property Market Report 2025 - Bali Apartment: off-plan listings represent approximately 37 percent of available residential supply in Bali (Tier 2)",
        url: "https://www.colliers.com/en-id/research/colliers-annual-property-market-report-2025-bali-apartment",
      },
      {
        label:
          "ICLG Indonesia Real Estate Laws and Regulations 2025: PPJB holders hold personal rights only and rank as concurrent creditors in developer insolvency, with no statutory escrow protection (Tier 2)",
        url: "https://iclg.com/practice-areas/real-estate-laws-and-regulations/indonesia",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-vs-mexico-property-investment",
    title: "Bali vs Mexico Property for Foreign Investors",
    category: "investment",
    imageUrl: null,
    sortOrder: 56,
    metaDescription:
      "Bali vs Mexico for foreign investors: fideicomiso vs leasehold, rental income tax rates, purchase costs, and gross yields compared side by side.",
    body: `<p>Both Bali and Mexico attract US buyers looking for a tropical second home with short-term rental income, but their ownership structures work differently. In Mexico, most coastal destinations fall inside the Restricted Zone, defined as land within 50 kilometres of any coastline under Article 27 of the Mexican Constitution. Inside that zone, US nationals buy through a fideicomiso, a bank trust where a licensed Mexican bank holds title on your behalf for 50 years, renewable indefinitely. The trust gives you full beneficial rights to use, rent, renovate, sell, or leave the property to heirs, with annual maintenance fees of roughly USD 500 to 700. In Bali, foreigners hold through a leasehold, typically 25 years with a 25-year renewal option, or through a PT PMA foreign-owned company holding a Hak Guna Bangunan right. Our <a href="/blog/freehold-vs-leasehold-bali">ownership guide</a> covers each structure in detail.</p><p>Purchase closing costs are broadly comparable. Mexico buyers typically spend 5 to 9 percent of the purchase price, with the state acquisition tax (ISAI) running 2 to 5 percent depending on state. Quintana Roo, which covers Tulum and Playa del Carmen, charges 2 percent ISAI. In Indonesia, the buyer pays BPHTB at 5 percent of the taxable acquisition value. Both markets add notary and registration fees. Mexico also adds a fideicomiso setup fee of roughly USD 500 to 1,000 for properties inside the Restricted Zone.</p><p>Rental income tax favours Bali slightly for US owners. Mexico withholds 25 percent of gross rent from non-residents with no deductions permitted, per <a href="https://taxsummaries.pwc.com/mexico/individual/taxes-on-personal-income" data-external="true">PwC Mexico</a>. Indonesia withholds 20 percent under <a href="https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers" data-external="true">Article 26 of the income tax law</a>. A US-Mexico income tax treaty exists and allows US residents to credit Mexican withholding against their US tax liability, but it does not reduce the 25 percent statutory withholding rate. No US-Indonesia treaty exists; US nationals credit Indonesian withholding under standard domestic foreign tax credit rules.</p><p>Gross rental yields in the strongest tourist areas of both markets run roughly 8 to 15 percent gross for well-managed short-term rental villas, though net returns are substantially lower after costs. Tulum can reach that upper range in strong years; Playa del Carmen averages closer to 5 to 6 percent gross. Bali villas in Canggu and Uluwatu are cited in the same 8 to 15 percent gross range by agents and operators. Management fees in both markets typically consume 25 to 35 percent of rental revenue. These are general market estimates and not a guarantee of returns. This is not financial advice.</p><p>On exit, Bali is significantly cheaper for the seller: a final income tax (PPh) of 2.5 percent of the transaction price applies, as detailed in our <a href="/blog/bali-capital-gains-tax-foreign-seller">capital gains guide</a>. Mexico non-residents pay either 25 percent of the gross sale price or 35 percent of net profit, per the <a href="https://themexicohandbook.com/property-and-capital-gains-tax-in-mexico-a-guide-for-foreigners/" data-external="true">Mexico Handbook</a>. For comparisons with other markets, see our guides on <a href="/blog/bali-vs-thailand-property-investment">Bali vs Thailand</a> and <a href="/blog/bali-vs-portugal-property-investment">Bali vs Portugal</a>.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Can foreigners own property more easily in Mexico than in Bali?",
        answer:
          "In Mexico's coastal Restricted Zone, US nationals buy through a fideicomiso bank trust that lasts 50 years and is renewable indefinitely. The trust is straightforward to set up, gives full beneficial ownership rights including the right to rent and sell, and is broadly recognized by Mexican courts. In Bali, a leasehold gives personal rights for a fixed term, and a PT PMA company gives ownership through a company structure with annual compliance requirements. Neither market allows foreigners to hold direct freehold title in their own name, and both structures can be made secure with proper legal advice. The fideicomiso is arguably simpler administratively than running a PT PMA, but it also involves ongoing annual fees to the trustee bank.",
      },
      {
        question:
          "Are Bali or Mexico rental yields higher for villa investors?",
        answer:
          "The strongest short-term rental corridors in both markets produce similar gross yield ranges, roughly 8 to 15 percent for well-managed villas. In Mexico, Tulum villas reach that upper range in strong demand periods; Playa del Carmen typically averages 5 to 6 percent gross; Los Cabos net yields commonly fall 3 to 5 percent after management and operating costs. In Bali, Canggu and Uluwatu villas are cited in the 8 to 15 percent gross range by established agents. Net yields in both markets are substantially lower after management fees of 25 to 35 percent of revenue, taxes, maintenance, and vacancy. Location, property standard, and management quality drive the actual result far more than the country itself. This is general market context, not financial advice.",
      },
      {
        question:
          "What are the tax differences when selling a Mexico villa vs a Bali villa as a foreigner?",
        answer:
          "Selling as a non-resident in Mexico means choosing between 25 percent of the gross sale price or 35 percent of the net profit, with no primary-residence exemption available to non-residents. In Bali, the seller pays a final income tax of 2.5 percent of the transaction value regardless of residency or holding period. The Bali exit tax is substantially lower. However, US nationals remain liable for US capital gains tax on worldwide income in both cases, crediting any foreign tax paid against the US liability. A cross-border tax adviser should review your position in either market before you sign a sale agreement.",
      },
    ],
    publishedAt: "2026-08-08",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/tulum-mayan-ruins-caribbean-aerial.webp",
    gallery: [
      {
        url: "/blog/cancun-hotel-zone-beachfront-aerial.webp",
        alt: "Aerial view of Cancun's Hotel Zone showing a dense strip of luxury beach resorts and hotels lining a turquoise Caribbean shoreline, illustrating Mexico's established coastal tourism market",
        credit: "Israel Torres / Pexels",
        sourceUrl: "https://www.pexels.com/photo/hotels-and-resorts-on-sea-coast-in-cancun-20210508/",
      },
      {
        url: "/blog/tulum-beach-turquoise-coast.webp",
        alt: "Ground-level coastal view from the Tulum ruins site showing a rocky clifftop with tropical vegetation overlooking a turquoise Caribbean sea, representing Mexico's Riviera Maya property market",
        credit: "Camilo Laverde / Pexels",
        sourceUrl: "https://www.pexels.com/photo/the-beach-and-ocean-in-tulum-mexico-27638882/",
      },
    ],
    citations: [
      {
        label:
          "PwC Mexico Tax Summaries: individual income taxes for non-residents, 25% withholding on gross rental income with no deductions permitted (Tier 2)",
        url: "https://taxsummaries.pwc.com/mexico/individual/taxes-on-personal-income",
      },
      {
        label:
          "Indonesia DGT (pajak.go.id): Article 26 income tax, 20% final withholding on gross Indonesian-source income paid to non-residents (Tier 1)",
        url: "https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers",
      },
      {
        label:
          "Mexico Handbook: property and capital gains tax guide for foreigners, ISAI purchase tax range and non-resident seller options of 25% gross or 35% net (Tier 2)",
        url: "https://themexicohandbook.com/property-and-capital-gains-tax-in-mexico-a-guide-for-foreigners/",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "pt-pma-profit-repatriation-bali",
    title: "How to Take Profits Out of a Bali PT PMA",
    category: "investment",
    imageUrl: null,
    sortOrder: 57,
    metaDescription:
      "Bali PT PMA profits: how to declare dividends, withholding tax rates for US and UAE shareholders, and how to wire money to a foreign bank account.",
    body: `<p>The legal route for taking profit out of a Bali PT PMA is a dividend declared at the annual General Meeting of Shareholders (GMS). Before that payment leaves Indonesia, the company withholds income tax under Article 26 of Indonesia's Income Tax Law, at either 20 percent or a lower rate under a Double Tax Agreement. The net dividend then transfers by wire to your US or UAE bank with no further legal restriction on the outbound payment.</p><p>Every dividend follows a fixed sequence. First, the company needs audited financial statements showing a positive profit balance. Any accumulated losses from prior years must be absorbed before a distribution can be declared. Indonesian company law also requires a statutory legal reserve equal to at least 20 percent of the company's paid-up capital, built up from annual profits before dividends are paid. Once both conditions are met, the annual GMS passes a resolution. Company law requires that meeting to be held within six months of the financial year end. The directors then calculate the withholding tax, pay it to the Directorate General of Taxation, and wire the net dividend to shareholders.</p><p>The default withholding rate is 20 percent of the gross dividend. US shareholders can apply the <a href="https://www.irs.gov/pub/irs-trty/indo.pdf" data-external="true">US-Indonesia Income Tax Convention</a>, which reduces the rate to 15 percent, or to 10 percent if the US shareholder holds at least 25 percent of the PT PMA's voting shares. UAE shareholders benefit from the Indonesia-UAE treaty that entered into force in January 2022, which sets the dividend withholding rate at 10 percent. A 2025 ministerial regulation (PMK 112/2025) added a new condition: the reduced treaty rate applies only if the qualifying ownership has been held continuously for at least 365 days before the dividend is paid. If that window has not been met, the full 20 percent domestic rate applies regardless of treaty.</p><p>Under Investment Law No. 25 of 2007, PT PMA companies have a statutory right to repatriate profits and dividends abroad, subject to tax compliance. Your bank will ask for the GMS resolution, audited accounts, and evidence of Article 26 withholding tax payment before processing the outbound wire. Large transfers may trigger Bank Indonesia reporting, though no cap applies to the transfer itself. Director salaries and related-party management fees are alternative extraction routes between GMS cycles, each with separate withholding implications and transfer pricing scrutiny. A local tax adviser should review your specific structure before any distribution. This is general context, not tax or financial advice.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What withholding tax applies when a PT PMA pays a dividend to a foreign shareholder?",
        answer:
          "The default rate under Article 26 is 20 percent of the gross dividend. US shareholders can apply the US-Indonesia tax treaty to reduce this to 15 percent, or 10 percent if they hold at least 25 percent of the company's voting shares. UAE shareholders benefit from the Indonesia-UAE treaty at 10 percent. A 2025 regulation (PMK 112/2025) requires the qualifying stake to have been held for at least 365 consecutive days before the dividend date to access these reduced rates; if not, the full 20 percent applies.",
      },
      {
        question:
          "How do I transfer profits from my Bali PT PMA to a US or UAE bank account?",
        answer:
          "After the annual GMS passes a dividend resolution and the company pays the Article 26 withholding tax to the Indonesian tax office, the net amount is wired via SWIFT to your foreign bank. Investment Law No. 25 of 2007 guarantees PT PMA companies the right to repatriate profits without restriction. Your bank will typically request the GMS resolution, the audited financial statements, and the withholding tax payment receipt before releasing the outbound transfer.",
      },
      {
        question:
          "Is there a minimum retained earnings requirement before a PT PMA can pay a dividend?",
        answer:
          "Yes. A PT PMA can only declare dividends from a positive retained earnings balance shown in audited annual financial statements. Any accumulated losses from prior years must first be absorbed. Indonesian company law also requires a statutory reserve equal to at least 20 percent of paid-up capital to be built up before distributions. Both conditions must be satisfied before the GMS can lawfully vote a dividend.",
      },
    ],
    publishedAt: "2026-08-09",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/shareholders-meeting-boardroom-dividend.webp",
    gallery: [
      {
        url: "/blog/euro-usd-mixed-currency-dividend-transfer.webp",
        alt: "Aerial view of mixed Euro and US Dollar banknotes spread on a wooden surface, representing the international dividend repatriation process from a Bali PT PMA to a foreign bank account",
        credit: "Ibrahim Boran / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/aerial-view-of-mixed-euro-and-us-dollar-banknotes-on-wooden-floor-8193975/",
      },
      {
        url: "/blog/tax-document-professional-withholding.webp",
        alt: "A financial professional reviewing tax documents at a wooden desk, representing the Article 26 withholding tax calculation and payment required before a PT PMA dividend is wired abroad",
        credit: "Polina Tankilevitch / Pexels",
        sourceUrl:
          "https://www.pexels.com/photo/close-up-of-a-professional-examining-tax-documents-on-a-wooden-desk-indoors-6927546/",
      },
    ],
    citations: [
      {
        label:
          "Indonesia DGT (pajak.go.id): Article 26 income tax, 20% final withholding on dividends paid to non-resident foreign taxpayers (Tier 1)",
        url: "https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers",
      },
      {
        label:
          "US-Indonesia Income Tax Convention (IRS.gov): treaty text setting dividend withholding at 15% standard rate and 10% for shareholders with 25% or more of voting shares (Tier 1)",
        url: "https://www.irs.gov/pub/irs-trty/indo.pdf",
      },
      {
        label:
          "Katadata DInsights: Indonesia ratified the Indonesia-UAE tax treaty with a 10% dividend withholding rate, in force from January 2022 (Tier 2)",
        url: "https://dinsights.katadata.co.id/read/2021/06/18/indonesia-ratifies-tax-treaty-with-uae-here-are-the-rates",
      },
      {
        label:
          "ASEAN Briefing: profit repatriation in Indonesia, covering Investment Law No. 25 of 2007 guarantees for PT PMA companies to repatriate dividends and profits without restriction (Tier 2)",
        url: "https://www.aseanbriefing.com/doing-business-guide/indonesia/taxation-and-accounting/profit-tax-repatriation-indonesia",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-property-investment-risks-2026",
    title: "Bali Property Investment Risks in 2026",
    category: "investment",
    imageUrl: null,
    sortOrder: 58,
    metaDescription:
      "The main risks of buying Bali property in 2026: nominee traps, zoning bans, permit enforcement, natural disaster exposure, and currency drag for foreign investors.",
    body: `<p>Buying Bali property in 2026 carries real risks for foreign investors, and most of them are legal rather than market-based. A buyer who understands the rules and picks the right structure can manage the majority before signing anything.</p><p><strong>Nominee and title risk</strong> is the highest-stakes failure point. Article 26(2) of <a href="https://peraturan.bpk.go.id/Details/38784/uu-no-5-tahun-1960" data-external="true">Indonesia's Basic Agrarian Law (UUPA 1960)</a> voids any arrangement designed to give a foreigner indirect freehold ownership through an Indonesian national. If the nominee dies, disputes the arrangement, or is pursued by creditors, you have no enforceable claim in any Indonesian court. The safe path is a registered leasehold or a PT PMA holding HGB title.</p><p><strong>Zoning risk</strong> sharpened after Bali's Governor issued Instruction No. 5 of 2025, prohibiting conversion of designated sustainable agricultural land (LP2B) to villa or tourism use. Violating that rule under <a href="https://peraturan.bpk.go.id/Details/38960/uu-no-41-tahun-2009" data-external="true">Law No. 41 of 2009</a> carries a penalty of up to five years in prison. Before committing to any parcel, obtain the zoning certificate and ask a licensed notary (PPAT) to confirm the land designation in writing.</p><p><strong>Permit and licensing risk</strong> is now commercially material. Permenpar No. 6/2025 required short-term rental operators to register with a valid NIB and operational permit by 31 March 2026. Major booking platforms started removing unlicensed listings during 2026. A villa without a current SLF and Pondok Wisata licence cannot lawfully generate rental income, which directly affects your yield.</p><p><strong>Natural disaster risk</strong> is real but insurable. Bali sits on the Ring of Fire and has three active volcanoes, including Mount Agung, which last erupted between 2017 and 2019. A Property All Risk (PAR) policy from a licensed Indonesian insurer can add earthquake, volcanic eruption and flood cover to a standard base policy. Check flood maps for any plot, choose higher ground where possible, and verify the build standard of the structure.</p><p><strong>Currency risk</strong> matters at the point of purchase and at repatriation. The <a href="https://www.bi.go.id/en/statistik/informasi-kurs/transaksi-bi/Default.aspx" data-external="true">Bank Indonesia JISDOR reference rate</a> moved from roughly IDR 15,700 to IDR 16,981 per USD over 2024 to 2025. On a USD 250,000 property, a further five percent rupiah move is roughly USD 12,500 of foreign exchange impact. Multi-year holds tend to smooth this, but short-term strategies carry more exposure. This is general context, not financial or legal advice. Seek professional guidance matched to your specific structure before proceeding.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What legal risks exist for foreign buyers purchasing Bali property?",
        answer:
          "The main legal risks are nominee arrangements, title disputes and zoning violations. Article 26(2) of Indonesia's Basic Agrarian Law (UUPA 1960) voids any scheme that gives a foreigner indirect freehold ownership through an Indonesian national. A registered leasehold or a PT PMA holding HGB title are the recognised legal structures. Before purchasing, confirm the land title and zoning classification with a licensed notary (PPAT).",
      },
      {
        question:
          "How does natural disaster risk affect a Bali property investment?",
        answer:
          "Bali sits on the Ring of Fire and has three active volcanoes, including Mount Agung, which last erupted between 2017 and 2019. Seasonal floods affect low-lying plots, particularly those originally classified as rice fields. A Property All Risk (PAR) policy from a licensed Indonesian insurer can include earthquake, volcanic eruption and flood cover. Choosing higher ground, checking flood maps and verifying the build standard of the structure reduces exposure.",
      },
      {
        question:
          "What market risks should a US or UAE investor know before buying in Bali?",
        answer:
          "The primary market risks are localised oversupply in high-density corridors like central Canggu, yield compression on undifferentiated villas, and currency drag from rupiah moves. Properties that are well-located, managed by a professional operator and fully compliant with licensing rules show more stable occupancy than generic unlicensed units. Currency risk is manageable over a multi-year hold but matters at purchase and at repatriation given the rupiah's gradual drift versus the US dollar.",
      },
    ],
    publishedAt: "2026-08-10",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/bali-mount-agung-volcano-natural-risk.webp",
    gallery: [
      {
        url: "/blog/property-risk-inspection-hardhat-clipboard.webp",
        alt: "A property inspector in a white hardhat reviews notes on a clipboard inside a building under construction, representing the permit and compliance checks required for a Bali off-plan villa investment",
        credit: "Pavel Danilyuk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/7937689",
      },
      {
        url: "/blog/home-insurance-policy-review-desk.webp",
        alt: "A person reviews a home insurance policy document on a clipboard at a wooden desk, representing the Property All Risk coverage foreign Bali villa owners should carry against earthquake, flood and volcanic eruption",
        credit: "Mikhail Nilov / Pexels",
        sourceUrl: "https://www.pexels.com/photo/7734569",
      },
    ],
    citations: [
      {
        label:
          "Indonesia Basic Agrarian Law (UUPA) No. 5 of 1960, Article 26(2): voids any transaction designed to give a foreign national indirect freehold (Hak Milik) ownership through a nominee (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/38784/uu-no-5-tahun-1960",
      },
      {
        label:
          "Law No. 41 of 2009 on Protection of Sustainable Agricultural Land: prohibits conversion of LP2B classified land; violations carry up to 5 years imprisonment (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/38960/uu-no-41-tahun-2009",
      },
      {
        label:
          "Bank Indonesia JISDOR reference rate: official USD/IDR transaction rate data showing the rupiah moved from roughly IDR 15,700 to IDR 16,981 per USD over 2024 to 2025 (Tier 1)",
        url: "https://www.bi.go.id/en/statistik/informasi-kurs/transaksi-bi/Default.aspx",
      },
      {
        label:
          "Bali Governor's Instruction No. 5 of 2025: prohibition on conversion of rice field and LP2B sustainable agricultural land to tourism and villa use, Bali Provincial Government (Tier 1)",
        url: "https://www.baliprov.go.id/",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "fractional-co-ownership-bali-villa",
    title: "Fractional Villa Co-Ownership in Bali for Foreigners",
    category: "investment",
    imageUrl: null,
    sortOrder: 59,
    metaDescription:
      "Foreigners can co-own a Bali villa through a PT PMA with 2+ shareholders. Here is how the legal structure works and what risks every co-investor must manage.",
    body: `<p>Yes, two or more foreigners can legally co-own a Bali villa. The standard vehicle is a PT PMA (Indonesian foreign-owned limited liability company). Each co-investor holds shares in the PT PMA; the PT PMA holds the land title directly, typically as Hak Guna Bangunan (HGB). <a href="https://www.indonesia-investments.com/business/foreign-investment/company-law-indonesia/item8311" data-external="true">Company Law No. 40 of 2007</a> requires a minimum of two shareholders and sets no upper limit on the total, so a villa shared by four or eight investors is structurally workable. In short-term villa rental sectors, up to 100% of shares may be held by foreign nationals; no Indonesian partner is required.</p><p>A leasehold (Hak Sewa) can also name multiple co-lessees in the notarial deed. Because Hak Sewa is a private contractual right rather than a registered land title, usage schedules, cost sharing, and exit terms must all be embedded in the lease agreement and a parallel co-ownership deed. At renewal, the landowner can renegotiate or decline to extend regardless of how many names appear on the original lease.</p><p>Commercial fractional platforms in Bali market PT PMA shares in individual villas at lower entry prices than whole-villa ownership, with each buyer receiving a proportional share of rental income and a set number of personal-use nights per year. Each property sits in its own ring-fenced PT PMA, which should survive a platform closure. There is no dedicated Indonesian fractional property law; Indonesia's financial regulator OJK published draft tokenization regulations in late 2025 but had not finalized them as of mid-2026. Dubai, by contrast, issues each fractional co-owner an individual DLD-registered title deed under Law No. 6 of 2019, making the legal standing for each co-owner clearer at the outset.</p><p>Governance deadlock is the most immediate operational risk: at a 50/50 share split, Indonesian company law provides no natural majority for ordinary shareholder votes, so a buy-sell or drag-along clause in the shareholders' agreement is essential. Exit is harder than it appears because there is no liquid secondary market for a single-villa PT PMA stake and selling requires finding a willing private buyer and completing a formal share transfer. Shares also pass through both Indonesian company law and the co-owner's home-country estate rules on death, so inheritance should be planned for in advance. Nominee arrangements that disguise foreign ownership remain explicitly illegal under <a href="https://peraturan.bpk.go.id/Details/38784/uu-no-5-tahun-1960" data-external="true">Article 26(2) of Indonesia's Agrarian Law (UUPA 1960)</a> and unenforceable in Indonesian courts. This is general context, not financial or legal advice; seek professional guidance before proceeding.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Can two or more foreigners co-own a Bali villa through a PT PMA?",
        answer:
          "Yes. Indonesian Company Law No. 40 of 2007 requires a minimum of two shareholders for any PT and sets no upper limit. In sectors covering short-term villa rentals, 100% of shares may be held by foreign nationals; no Indonesian partner is required. The PT PMA holds the land title directly as HGB, and each co-owner holds shares proportional to their investment.",
      },
      {
        question:
          "How does fractional ownership of a Bali leasehold work legally?",
        answer:
          "A leasehold (Hak Sewa) is a private contractual right, not a registered land title. Multiple parties can be named as co-lessees in the notarial deed, but usage scheduling, cost sharing, and exit terms must all be written into the lease agreement or a parallel co-ownership deed. At the end of the term, the landowner can renegotiate conditions and is under no obligation to renew on the original terms.",
      },
      {
        question:
          "What are the main risks of jointly buying a Bali property with a partner or group?",
        answer:
          "Governance deadlock is common at a 50/50 share split because Indonesian company law provides no natural majority for ordinary shareholder votes; a buy-sell or drag-along clause in the shareholders' agreement resolves this. Exit is illiquid: there is no secondary market for a single-villa PT PMA stake, so selling means finding a private buyer and completing a formal share transfer. Shares also pass through both Indonesian and home-country estate law on death, making inheritance planning important from the outset.",
      },
    ],
    publishedAt: "2026-08-11",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/co-investors-villa-partnership-boardroom.webp",
    gallery: [
      {
        url: "/blog/bali-twin-villa-pool-top-view.webp",
        alt: "Top-down aerial view of a traditional Balinese twin-pavilion villa with private pool and tropical garden, showing the type of asset that multiple foreign co-investors can jointly hold through a PT PMA structure",
        credit: "Inci Cinaroglu / Pexels",
        sourceUrl: "https://www.pexels.com/photo/34054904",
      },
      {
        url: "/blog/shareholder-agreement-signing-co-ownership.webp",
        alt: "A person signing a multi-page legal agreement, representing the shareholders' agreement that co-investors must put in place when jointly owning a Bali villa through a PT PMA",
        credit: "Jakub Zerdzicki / Pexels",
        sourceUrl: "https://www.pexels.com/photo/34862508",
      },
    ],
    citations: [
      {
        label:
          "Indonesia Company Law No. 40 of 2007 on Limited Liability Companies: sets the minimum 2-shareholder requirement; all shareholders may be foreign nationals in sectors open to 100% FDI such as short-term villa rentals (Tier 2 analysis)",
        url: "https://www.indonesia-investments.com/business/foreign-investment/company-law-indonesia/item8311",
      },
      {
        label:
          "Indonesia Basic Agrarian Law (UUPA) No. 5 of 1960, Article 26(2): voids any arrangement designed to give a foreign national indirect freehold ownership through a nominee; explicitly illegal and unenforceable in Indonesian courts (Tier 1)",
        url: "https://peraturan.bpk.go.id/Details/38784/uu-no-5-tahun-1960",
      },
      {
        label:
          "Dubai Law No. 6 of 2019 on Jointly Owned Real Property: issues individual DLD-registered title deeds to each fractional co-owner, providing a regulated framework that contrasts with Indonesia's PT PMA share-based approach (Tier 1)",
        url: "https://dlp.dubai.gov.ae/Legislation%20Reference/2019/Law%20No.%20(6)%20of%202019%20Concerning%20Ownership%20of%20Jointly%20Owned%20Real%20Property%20in%20the%20Emirate%20of%20Dubai.html",
      },
    ],
  },
  {
    slug: "bali-vs-cyprus-property-investment",
    title: "Bali vs Cyprus Property for Foreign Investors",
    category: "investment",
    imageUrl: null,
    sortOrder: 60,
    metaDescription:
      "Bali vs Cyprus property for foreign investors: compare ownership rules, rental yields, taxes, and entry prices before you choose.",
    body: `<p>The ownership structure is the first dividing line between these two markets. Cyprus allows non-EU nationals to acquire genuine freehold title through its Land Registry. Buyers must obtain a permit from the Council of Ministers, a step that is routinely approved, and individual buyers are typically capped at two properties; purchasing through a Cyprus-registered company removes that cap. Bali offers no freehold right to non-citizens. The two practical paths are a leasehold of 25 to 30 years (extendable by agreement in the original notarial deed) or a PT PMA company structure holding <a href="/blog/hak-guna-bangunan-bali-pt-pma">Hak Guna Bangunan title</a>.</p><p>Rental yields strongly favour Bali. The RICS/KPMG Cyprus Property Price Index for Q4 2025 put average apartment gross yields across the island at 5.45%, with Paphos tracking around 4% to 5% and Limassol near 6%. Short-term holiday lets in Cyprus resort zones can edge that up to 5% to 7% gross. In Bali, established agencies in Canggu report gross yields of 8% to 12% for well-managed short-term rental villas; emerging areas like Tabanan offer lower entry prices with broadly similar yield potential. Neither figure is a guarantee, and actual returns depend on occupancy, management quality, and season. This is not financial advice.</p><p>Entry prices are lower in Bali. A new-build apartment in <a href="https://www.leptosestates.com/blog/cyprus/property-market-trends/" data-external="true">Paphos</a> starts from roughly EUR 250,000 to EUR 350,000. Limassol averages around EUR 3,200 per square meter for residential stock, rising above EUR 6,000 for prime seafront units. Off-plan villas in Tabanan start from approximately USD 120,000 to USD 200,000 for a finished unit.</p><p>Cyprus abolished its annual immovable property tax in 2017, so there is no ongoing holding cost on that front. Rental income is subject to progressive income tax (0% on the first EUR 22,000 of taxable income, then 20% to 35% above that) plus a 2.65% healthcare levy on gross rent. When you sell, Cyprus charges 20% capital gains tax on the gain, with a EUR 30,000 lifetime exemption from 2026. Bali charges a simpler 10% flat withholding on gross rental income and 2.5% of the gross sale price on disposal.</p><p>Cyprus offers a path that Bali cannot match: a qualifying property purchase of EUR 300,000 or more can anchor a permanent residency application for the buyer and immediate family, with citizenship eligibility after eight years of legal residency. Cyprus is not a Schengen member yet, but the EU residency document carries real weight for US or UAE investors who want a second base. Bali's <a href="/blog/bali-visa-property-owner-investor">Second Home Visa</a> requires a USD 130,000 blocked deposit separate from the property purchase.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Can foreigners own freehold property in Cyprus more easily than in Bali?",
        answer:
          "Yes. Cyprus allows non-EU nationals to purchase freehold residential property through the Land Registry after obtaining a permit from the Council of Ministers, which is routinely granted. Bali does not permit any form of direct foreign freehold. The practical alternatives in Bali are a leasehold of 25 to 30 years (extendable in the original deed) or a PT PMA company holding Hak Guna Bangunan title.",
      },
      {
        question:
          "Are Bali or Cyprus rental yields higher for investment properties?",
        answer:
          "Bali typically generates higher gross yields. Established agencies in Canggu report 8% to 12% gross for well-managed short-term rental villas; emerging areas like Tabanan offer lower entry prices with similar yield potential. Cyprus resort properties averaged 5.45% gross for apartments in Q4 2025 per the RICS/KPMG Property Price Index, with Paphos around 4% to 5% and Limassol near 6%. Holiday lets in tourist zones can push Cyprus yields to 5% to 7% gross. Actual returns depend on occupancy and management. This is not financial advice.",
      },
      {
        question:
          "How do taxes compare for foreign property owners in Cyprus vs Bali?",
        answer:
          "Cyprus has no annual property tax (abolished in 2017) and charges progressive income tax on rental income, starting at 0% on the first EUR 22,000 of taxable income, plus a 2.65% healthcare levy on gross rent. On sale, Cyprus capital gains tax is 20% of the gain, with a EUR 30,000 lifetime exemption from 2026. Bali charges 10% flat withholding on gross rental income and 2.5% of the gross sale price on disposal. The Bali sell-side rate is lower in most appreciation scenarios.",
      },
      {
        question:
          "Does buying property in Cyprus give you EU residency?",
        answer:
          "A qualifying investment of EUR 300,000 or more in Cyprus (which can be a residential or investment property) can form the basis of a permanent residency application under the Cyprus Golden Visa programme. The permit covers the investor and immediate family and requires at least one visit to Cyprus every two years. After eight years of legal residency, citizenship eligibility opens. Cyprus is not yet a Schengen zone member, so the permit does not grant free movement across all EU states.",
      },
    ],
    publishedAt: "2026-08-12",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/paphos-aphrodite-rock-coastline-aerial.webp",
    gallery: [
      {
        url: "/blog/paphos-cyprus-beachfront-resort-aerial.webp",
        alt: "Aerial view of a beachfront resort hotel in Paphos, Cyprus, with a pool, sandy beach, and the blue Mediterranean Sea, showing the type of tourism-driven coastal property market that attracts foreign investors",
        credit: "IMDA / Pexels",
        sourceUrl: "https://www.pexels.com/photo/12160204/",
      },
      {
        url: "/blog/limassol-cyprus-coast-sunset-aerial.webp",
        alt: "Aerial drone shot of Limassol, Cyprus at sunset, with the city's residential and hotel buildings along the Mediterranean coastline, illustrating one of the island's most active property investment markets",
        credit: "FreeStockPro / Pexels",
        sourceUrl: "https://www.pexels.com/photo/32056715/",
      },
    ],
    citations: [
      {
        label:
          "RICS/KPMG Cyprus Property Price Index Q4 2025: island-wide apartment gross yield 5.45%; Limassol annual price growth 9.90% (Tier 1 index published by RICS and KPMG Cyprus)",
        url: "https://www.globalinvestments.net/properties/guides/cyprus-rental-yields-and-returns",
      },
      {
        label:
          "Cyprus property ownership rules for non-EU nationals, Council of Ministers permit requirement, and two-property cap: Paraschou Law Firm Cyprus (Tier 2)",
        url: "https://paraschou.com.cy/understanding-real-estate-purchases-in-cyprus-for-non-eu-citizens/",
      },
      {
        label:
          "Capital Gains Tax in Cyprus 2026: 20% rate on property gains; EUR 30,000 lifetime exemption from 2026; annual immovable property tax abolished 2017 (Tier 2 tax advisory)",
        url: "https://taxrelocate.com/2026/07/09/capital-gains-tax-in-cyprus-2026-guide-rates-exemptions-how-its-calculated/",
      },
      {
        label:
          "Rental Income Tax in Cyprus 2026: progressive brackets, 2.65% GHS healthcare levy on gross rent, SDC abolished January 2026 (Tier 2 tax advisory)",
        url: "https://www.cyprustaxlife.com/learn/rental-income-cyprus",
      },
      {
        label:
          "Cyprus Golden Visa Programme 2026: EUR 300,000 qualifying investment, EUR 50,000/year income requirement, permanent residency, eight-year path to citizenship eligibility (Tier 2 immigration advisory)",
        url: "https://www.globalcitizensolutions.com/cyprus-golden-visa/",
      },
      {
        label:
          "Bali villa rental yields 2026: gross yields 8% to 12% in established short-term rental areas; entry prices in Tabanan area from USD 120,000 (Tier 2 Bali property agency)",
        url: "https://balivillarealty.com/blog/rental-property-for-rent/",
      },
    ],
  },
  {
    slug: "net-roi-bali-villa-calculation",
    title: "Calculating Net ROI on a Bali Investment Villa",
    category: "investment",
    imageUrl: null,
    sortOrder: 61,
    metaDescription:
      "How to calculate net ROI on a Bali villa: gross yields of 10 to 15 percent and what management fees, rental tax, and holding costs reduce them to.",
    body: `<p>Net ROI on a Bali investment villa typically lands between 4 and 7 percent on purchase price once management fees, rental income tax, and holding costs are subtracted from the gross figure. Established Bali agencies report gross short-term rental yields of 10 to 15 percent in prime areas such as Canggu and Uluwatu, a range consistent with the record short-term rental performance documented in <a href="https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q4-2024-bali-hotel" data-external="true">Colliers' Q4 2024 Bali Hotel report</a>. The gap between gross and net is driven by three predictable cost lines.</p><p>First, villa management and booking platform fees: full-service operators charge 20 to 25 percent of gross revenue as a base fee, with Airbnb and Booking.com adding 15 to 17 percent on top; the combined channel cost before tax or operating expenses typically runs 30 to 35 percent of gross, per <a href="https://ownpropertyabroad.com/indonesia/bali/costs-of-property-management-bali/" data-external="true">OwnPropertyAbroad</a>. Second, rental income tax: a PT PMA holding the villa pays PPh Final at 10 percent of gross rental revenue under <a href="https://peraturan.go.id/id/pp-no-34-tahun-2017" data-external="true">Government Regulation 34 of 2017</a>, a final tax on the gross amount with no further deductions permitted. Third, annual holding costs covering PBB land tax, PT PMA compliance, PLN electricity, insurance, pool maintenance, and a capital expenditure reserve run USD 12,000 to 24,000 per year for a mid-range three-bedroom pool villa, as detailed in our <a href="/blog/annual-costs-owning-bali-villa">annual costs guide</a>.</p><p>A worked example puts the waterfall into numbers. A USD 300,000 off-plan villa generating USD 42,000 in gross annual rental revenue (a 14 percent gross yield) sees combined management and OTA fees of 30 percent consume USD 12,600, PPh Final at 10 percent of gross consume USD 4,200, and USD 13,000 in annual holding costs, leaving a net of USD 12,200 to the PT PMA before any dividend. That is a net yield of just over 4 percent on the purchase price. Drive gross revenue to USD 50,000 through stronger occupancy and the net rises to roughly USD 17,000, a net yield of about 5.7 percent. These are illustrative calculations, not projections. This is general information and not financial or legal advice; confirm your cost profile and tax position with a licensed Indonesian tax adviser before committing.</p><p>The variable that most shifts the outcome is gross revenue. Holding costs are largely fixed, so occupancy rate and nightly rate move the net yield far more than small differences in management fee percentages. For the full ownership and tax picture, see our <a href="/blog/foreigners-buy-property-bali">foreign buyers guide</a> and <a href="/blog/tax-for-foreign-property-owners-bali">rental income tax guide</a>.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What costs reduce the gross rental yield to a net yield on a Bali villa?",
        answer:
          "Three main lines: combined villa management and OTA channel fees of 30 to 35 percent of gross revenue, PPh Final rental income tax at 10 percent of gross rental revenue under Government Regulation 34 of 2017, and annual holding costs of USD 12,000 to 24,000 for a mid-range three-bedroom pool villa covering PBB land tax, PT PMA compliance, electricity, insurance, and pool maintenance. Together these can consume 55 to 70 percent of gross revenue, leaving a net yield of 4 to 7 percent of purchase price for a well-managed villa.",
      },
      {
        question:
          "How do management fees, tax, and maintenance affect Bali villa ROI?",
        answer:
          "On a USD 300,000 villa generating USD 42,000 gross annual rental revenue (14 percent gross yield): combined management and OTA fees at 30 percent remove USD 12,600; PPh Final at 10 percent of gross removes USD 4,200; and USD 13,000 in annual holding costs reduce income further. Net to the PT PMA before dividend is roughly USD 12,200, a net yield of just over 4 percent. At USD 50,000 gross revenue the net rises to around USD 17,000, about 5.7 percent. Illustrative figures, not projections, and not financial advice.",
      },
      {
        question:
          "What is a realistic net yield for a well-managed Bali villa in Canggu or Tabanan?",
        answer:
          "For a well-managed villa in a high-demand area such as Canggu, a realistic net yield on purchase price falls in the 5 to 7 percent range after management fees, PPh Final rental tax, and annual holding costs. In a newer area such as Tabanan or Kaba Kaba where occupancy builds over two to three years, the net in the first year may sit in the 3 to 5 percent range before stabilizing. Market-based estimates, not guarantees. Not financial advice.",
      },
    ],
    publishedAt: "2026-08-13",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/villa-roi-return-on-investment-calculation.webp",
    gallery: [
      {
        url: "/blog/villa-pool-investment-property-aerial.webp",
        alt: "Aerial view of a stone villa with a curved kidney-shaped pool, sun loungers, and tropical gardens, representing a short-term rental investment property with pool",
        credit: "Pexels",
        sourceUrl: "https://www.pexels.com/photo/aerial-view-of-villa-with-pool-35069534/",
      },
      {
        url: "/blog/tropical-villa-pool-complex-southeast-asia.webp",
        alt: "Ground-level view of a large rectangular pool flanked by two tropical villa wings with dark timber roofs and palm trees under a blue sky, representing a Bali-style pool villa investment",
        credit: "Pexels",
        sourceUrl: "https://www.pexels.com/photo/pool-surrounded-by-tropical-villas-1134176/",
      },
    ],
    citations: [
      {
        label:
          "Colliers Indonesia Q4 2024 Bali Hotel Report: record 6.33 million international visitors, RevPAR up 14% year-on-year, villa short-term rental market context (Tier 1)",
        url: "https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q4-2024-bali-hotel",
      },
      {
        label:
          "OwnPropertyAbroad: Costs of Property Management in Bali, base villa management fee 20 to 25 percent of gross revenue (Tier 2)",
        url: "https://ownpropertyabroad.com/indonesia/bali/costs-of-property-management-bali/",
      },
      {
        label:
          "Government Regulation No. 34 of 2017 (PP 34/2017): 10 percent PPh Final on gross rental income from land and buildings in Indonesia (Tier 1 official Indonesian government regulation)",
        url: "https://peraturan.go.id/id/pp-no-34-tahun-2017",
      },
      {
        label:
          "Indonesian Directorate General of Taxes: Article 26 income tax on non-resident foreign taxpayers (Tier 1 official)",
        url: "https://www.pajak.go.id/en/income-tax-article-26-income-tax-foreign-taxpayers",
      },
      {
        label:
          "PwC Indonesia Tax Summaries: Income determination including final withholding rates on rental income from land and buildings (Tier 1 global tax advisory reference)",
        url: "https://taxsummaries.pwc.com/indonesia/individual/income-determination",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "how-to-choose-bali-villa-management-company",
    title: "How to Choose a Villa Management Company in Bali",
    category: "investment",
    imageUrl: null,
    sortOrder: 62,
    metaDescription:
      "Choose a Bali villa management company based on fee structure, legal compliance, and track record. Full-service fees run 20 to 30 percent of gross revenue.",
    body: `<p>The two most important criteria when choosing a Bali villa management company are fee transparency and legal compliance with Indonesia's short-term rental licensing rules. Full-service operators in Bali typically charge 20 to 30 percent of gross rental revenue as a base management fee, per industry data on <a href="https://ownpropertyabroad.com/indonesia/bali/costs-of-property-management-bali/" data-external="true">Bali property management costs</a>. OTA platforms then take their own cut: Booking.com charges villa hosts approximately 15 percent per booking, and Airbnb charges a separate host service fee. A company that presents only its own percentage without explaining OTA charges may understate the combined cost to you.</p><p>Before reviewing any management proposal, confirm the company has practical experience with the legal requirements for operating a short-term rental. Your PT PMA company needs both the Villa accommodation license under business code KBLI 55193 and a valid business identification number issued through <a href="https://oss.go.id" data-external="true">Indonesia's OSS portal</a>. A management company unfamiliar with this licensing step, or that suggests operating without one, creates real risk for your PT PMA registration and your rental income. The short-term rental permit process is covered in our <a href="/blog/short-term-rental-permit-bali-villa">rental permit guide</a>.</p><p>Ask for three things in writing before signing a management contract. First, a full breakdown of what sits inside the management fee versus what is billed separately, including linen, consumables, repairs above an agreed maintenance threshold, and any initial setup or platform costs. Second, the maintenance authorization limit, meaning the repair amount the company can spend without your prior approval. Third, a list of current owner references willing to take a call, with specific questions you can ask about occupancy results and how quickly problems are resolved.</p><p>Read the exit clause carefully. Check the notice period needed to terminate the agreement, whether an exclusivity clause restricts you from direct OTA listings during the contract, and what triggers any penalty. Your Indonesian lawyer should review the management contract before you sign. This is general guidance and not legal or financial advice; confirm specific terms with a licensed Indonesian legal adviser.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What should I look for when choosing a Bali villa management company?",
        answer:
          "The main factors are fee transparency, legal compliance, and a verifiable track record with comparable properties. Ask for a written breakdown of the full management fee including extras, confirm the company can handle PT PMA rental licensing under business code KBLI 55193 and OSS registration, and request two or three owner references you can contact directly. Companies offering dynamic pricing tools, a channel manager across multiple OTA platforms, and monthly owner reporting with a dashboard are generally better placed to maximize occupancy.",
      },
      {
        question:
          "How do Bali villa management fee structures differ between operators?",
        answer:
          "Most operators charge a percentage of gross rental revenue. Full-service companies that handle staff, OTA listings, guest communications, and reporting typically charge 20 to 30 percent of gross revenue. Management-only or booking-agent models charge less but exclude on-site staff supervision and often limit their scope to OTA channel management. OTA platforms such as Booking.com and Airbnb add their own host fees on top of the management fee. Always ask for a combined cost illustration before comparing quotes between operators.",
      },
      {
        question:
          "What questions should I ask a Bali villa manager before signing a contract?",
        answer:
          "Ask for a written breakdown of what is inside versus outside the management fee; the maintenance authorization limit, the maximum amount the company can spend on repairs without your approval; two or three current owner references with contact details; and a sample monthly owner statement showing the full income and expense reconciliation. Also ask about their process for handling the PT PMA accommodation license renewal, OTA dispute resolution, and their response-time commitment for maintenance issues.",
      },
    ],
    publishedAt: "2026-08-14",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/villa-management-review-documents.webp",
    gallery: [
      {
        url: "/blog/bali-villa-garden-pool-exterior.webp",
        alt: "Two-storey Balinese villa with traditional tiled roof, ornate wooden detailing, and a pool and manicured garden at the front, representing the type of investment property managed by a professional company",
        credit: "Harsh & Leena Bansal / Pexels",
        sourceUrl: "https://www.pexels.com/photo/34053607/",
      },
      {
        url: "/blog/villa-pool-maintenance-staff.webp",
        alt: "Pool maintenance worker cleaning a villa pool with a long pole, with palm trees and a tropical property visible behind, illustrating on-site villa management services",
        credit: "Chris Wade NTEZICIMPA / Pexels",
        sourceUrl: "https://www.pexels.com/photo/30546817/",
      },
    ],
    citations: [
      {
        label:
          "OwnPropertyAbroad: Costs of Property Management in Bali, full-service management fee 20 to 30 percent of gross revenue (Tier 2 industry source)",
        url: "https://ownpropertyabroad.com/indonesia/bali/costs-of-property-management-bali/",
      },
      {
        label:
          "Cekindo: 5 Tips to Choose a Property Manager in Bali, legal registration and selection criteria for Bali property management companies (Tier 2 company setup advisory)",
        url: "https://www.cekindo.com/blog/property-management-in-bali",
      },
      {
        label:
          "Indonesia OSS Portal: NIB and KBLI 55193 Villa accommodation license required for legal short-term rental operations (Tier 1 Indonesian government licensing portal)",
        url: "https://oss.go.id",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-strata-title-apartment-foreigners",
    title: "Can Foreigners Buy Strata-Title Apartments in Bali?",
    category: "investment",
    imageUrl: null,
    sortOrder: 63,
    metaDescription:
      "Foreigners can buy strata-title apartments in Bali via HMSRS under GR 18/2021. KITAS required, IDR 2 billion minimum, 49% foreign ownership quota per building.",
    body: `<p>Foreigners can legally buy apartment units in Bali under a strata title called Hak Milik atas Satuan Rumah Susun (HMSRS), which gives you registered ownership of the unit itself. <a href="https://investmentpolicy.unctad.org/investment-policy-monitor/measures/3701/new-regulation-expands-strata-title-rights-for-foreign-citizens-and-legal-entities" data-external="true">Government Regulation No. 18 of 2021</a> opened this route to foreign nationals who hold a valid Indonesian stay permit (KITAS or KITAP). You own the apartment unit; the land the building sits on remains under a separate Hak Pakai or HGB title held by the developer or building management body.</p><p>Before GR 18/2021, foreigners had almost no direct route to registered apartment ownership in Indonesia. The regulation changed that by explicitly naming foreign nationals with residency permits as eligible HMSRS holders, provided the unit meets the provincial minimum purchase price. In Bali, that minimum is IDR 2 billion per unit (roughly USD 125,000 at current rates). These thresholds can change by ministerial decree, so confirm the current figure with a licensed notary before you commit.</p><p>Two further conditions apply. First, no more than 49% of a building's total floor area can be held by foreigners, a cap designed to keep most units accessible to Indonesian residents. Second, foreigners are generally limited to one unit per residential building. The HMSRS title follows the term of the underlying Hak Pakai land certificate: an initial 30 years, extendable by 20 years, with a further renewal of 30 years, for a maximum possible hold of 80 years.</p><p>The HMSRS route differs from a villa leasehold in one important way. A leasehold is a contractual right to use a plot and its building for a fixed term; it sits in your lease contract, not in a land registry. HMSRS is a registered title at the national land agency (ATR/BPN), meaning your ownership appears on the public record. That gives a stronger legal footing in a dispute. The tradeoff is the KITAS or KITAP residency requirement, which not every foreign buyer holds.</p><p>In practice, Bali's residential market is almost entirely standalone villas and low-rise developments. Strata-title apartment buildings aimed at foreign buyers are a small niche, mostly concentrated in Seminyak, Sanur, and parts of greater Denpasar. Areas such as Canggu, Tabanan, and Kaba Kaba are essentially villa markets. If your target is a villa rather than an apartment, a <a href="/blog/pt-pma-setup-bali-property">PT PMA company</a> holding HGB title, or a standard villa leasehold, remains the mainstream path for foreign buyers in Bali. This article is general information only and is not legal or financial advice.</p>`,
    venues: [],
    faq: [
      {
        question:
          "What is HMSRS and how does it let foreigners own an apartment in Bali?",
        answer:
          "HMSRS stands for Hak Milik atas Satuan Rumah Susun, which translates to right of ownership over a flat or apartment unit. Under Government Regulation No. 18 of 2021, foreign nationals who hold a valid Indonesian stay permit (KITAS or KITAP) can hold this title in Indonesia, including Bali. You own the individual unit with a registered certificate lodged at the national land agency; the land beneath the building stays under a separate Hak Pakai or HGB title. The unit must meet the minimum purchase price set for Bali province, currently IDR 2 billion, though that threshold is subject to change by ministerial decree.",
      },
      {
        question:
          "How does strata title differ from a villa leasehold in Bali?",
        answer:
          "A villa leasehold is a contractual right to occupy a specific plot and its building for a set term, typically 25 to 30 years with extension options. The right derives from your lease agreement, not from a registered title. HMSRS is a registered ownership certificate lodged with the national land agency (ATR/BPN), which puts your ownership on the public record. The main tradeoff is that HMSRS requires a valid KITAS or KITAP Indonesian residency permit, whereas a leasehold can be structured without one.",
      },
      {
        question:
          "What is the foreign ownership quota for apartment buildings in Bali?",
        answer:
          "Indonesian law caps foreign strata title ownership at 49% of the total floor area in any one building. This ensures a majority of units remain available to Indonesian nationals. Foreigners are also generally limited to one unit per residential building. The cap applies building by building, so larger developments with more total floor space can accommodate more foreign-owned units in absolute terms while still staying within the 49% limit.",
      },
      {
        question:
          "Are there strata-title apartment developments in Bali available to foreign buyers?",
        answer:
          "Yes, but the supply is small compared to Jakarta. Most eligible developments are concentrated in Seminyak, Sanur, and parts of greater Denpasar where multi-storey buildings are more common. Areas like Canggu, Tabanan, and Kaba Kaba are predominantly villa markets with almost no multi-storey apartment stock. If you want to invest in those areas, the usual foreign-ownership structures are a villa leasehold or a PT PMA company holding HGB title over the land.",
      },
    ],
    publishedAt: "2026-08-15",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/indonesia-highrise-apartment-aerial.webp",
    gallery: [
      {
        url: "/blog/condominium-unit-interior-city-view.webp",
        alt: "Spacious modern apartment unit interior with large floor-to-ceiling sliding windows and a view over a city roofscape, representing the type of unit a foreigner can own under HMSRS strata title in Indonesia",
        credit: "naimbic / Pexels",
        sourceUrl: "https://www.pexels.com/photo/2030037/",
      },
      {
        url: "/blog/luxury-apartment-complex-exterior.webp",
        alt: "Multi-storey luxury apartment complex with white facade, balconies, and large windows set among trees, representing a strata-title residential development eligible for foreign ownership",
        credit: "Nino Sanger / Pexels",
        sourceUrl: "https://www.pexels.com/photo/14998334/",
      },
    ],
    citations: [
      {
        label:
          "UNCTAD Investment Policy Monitor: Indonesia GR 18/2021 expands strata title (HMSRS) rights for foreign citizens, effective February 2021 (Tier 2 intergovernmental source)",
        url: "https://investmentpolicy.unctad.org/investment-policy-monitor/measures/3701/new-regulation-expands-strata-title-rights-for-foreign-citizens-and-legal-entities",
      },
      {
        label:
          "Emerhub: Guide to Buying Property in Indonesia as a Foreigner, HMSRS requirements and minimum purchase prices by province (Tier 2 company setup advisory)",
        url: "https://emerhub.com/indonesia/buying-property-in-indonesia/",
      },
      {
        label:
          "Budidjaja Law: Legal Alert on owning and developing apartments in Indonesia as foreigners, GR 18/2021 framework and practical considerations (Tier 2 Indonesian legal advisory)",
        url: "https://budidjaja.law/2024/07/legal-alert-owning-and-developing-apartments-in-indonesia-as-foreigners-legal-framework-and-practical-considerations/",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "bali-off-plan-deposit-protection",
    title: "Protecting Your Off-Plan Deposit in Bali",
    category: "investment",
    imageUrl: null,
    sortOrder: 64,
    metaDescription:
      "Bali has no mandatory escrow for off-plan property. Your deposit protection comes from PPJB contract clauses. Learn what to demand before you sign.",
    body: `<p>Indonesia has no statutory escrow requirement for off-plan residential property, so your deposit is protected by contract terms, not a government-mandated trust account. If a Bali developer fails mid-build, how much you recover depends almost entirely on what your <a href="/blog/ppjb-contract-bali-off-plan-explained">PPJB</a> says and how you structured your payments.</p><p>The contrast with Dubai makes the gap plain. <a href="https://dlp.dubai.gov.ae/Legislation%20Reference/2007/Law%20No.%20(8)%20of%202007.html" data-external="true">Dubai's Law No. 8 of 2007</a> requires every off-plan developer to open a dedicated, RERA-supervised escrow account per project, with buyers' funds ring-fenced from the developer's other creditors. In Bali, no equivalent statute exists. <a href="https://regulasi.hukumproperti.com/peraturan-pemerintah-republik-indonesia-nomor-12-tahun-2021/" data-external="true">Government Regulation PP No. 12 of 2021</a> provides a floor: a developer cannot present a PPJB for signing until the land title is clear, the building permit (PBG) is issued, and construction has reached at least 20% completion. That rule protects you from signing on a rendering, but it does not control where your payments go after signing.</p><p>Your legal position in a developer default matters. A PPJB gives you a personal contractual claim, not a property title. If the developer is placed into bankruptcy under Indonesian Law No. 37 of 2004, you become an unsecured creditor rather than the property owner. Recovery is possible but partial and can be slow. The less money you have paid at the point of insolvency, the less you stand to lose.</p><p>That reality points directly to the clauses worth insisting on. Demand a milestone-linked payment schedule where each tranche releases only after an independent party confirms verified construction progress, not a calendar date. Add an explicit full-refund and penalty clause that triggers if the developer misses the delivery date or stops construction. Keep each payment tranche as small as the developer will accept, because your exposure at any one point is the cumulative amount already paid.</p><p>A voluntary private escrow arrangement is the closest equivalent to the Dubai model. Some Bali developers now agree to a tri-party bank or notary trust account where payments sit until the corresponding milestone is verified. This typically costs around 1 to 2% of the transaction value and is worth raising during negotiation. If a developer refuses any form of escrow, treat that unwillingness as a data point before committing funds.</p><p>This article is general information only and is not legal or financial advice. Engage an independent Indonesian property lawyer to review your PPJB and advise on payment protection before signing.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Does Indonesia require off-plan deposits to be held in escrow like Dubai?",
        answer:
          "No. Indonesia has no statutory escrow requirement for off-plan residential property. Dubai's Law No. 8 of 2007 mandates dedicated project escrow accounts supervised by RERA, with developers required to pre-fund construction costs before launching sales. In Bali, buyer funds typically go directly to the developer after the PPJB is signed. Voluntary tri-party escrow arrangements are available but are negotiated contract by contract, not required by law.",
      },
      {
        question:
          "What happens to my deposit if a Bali off-plan developer goes bankrupt?",
        answer:
          "Under Indonesian bankruptcy law (Law No. 37 of 2004), a PPJB holder is treated as an unsecured creditor, not the property owner. That means you join a queue of creditors and may recover only part of what you paid, depending on the developer's remaining assets. How much is at risk depends on how much you had paid before insolvency, which is why milestone-based payments, rather than large lump-sum deposits, significantly reduce your exposure.",
      },
      {
        question:
          "What PPJB clauses protect a buyer's deposit if construction stops?",
        answer:
          "The key protection is a milestone-linked payment schedule where each tranche is released only after verified construction progress, not on a calendar date. Beyond that, insist on an explicit full-refund and penalty clause if the developer defaults or fails to deliver by the agreed date. Also specify a clear completion date with liquidated damages for delays. Have an independent Indonesian property lawyer review these clauses before you sign.",
      },
    ],
    publishedAt: "2026-08-16",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/bank-safe-deposit-boxes-escrow.webp",
    gallery: [
      {
        url: "/blog/tropical-construction-stalled-unfinished.webp",
        alt: "Partially constructed concrete building with exposed rebar and open doorframes surrounded by tropical palm trees, representing an unfinished off-plan development and the developer default risk Bali buyers face without mandatory escrow protection",
        credit: "Konstantin Mishchenko / Pexels",
        sourceUrl: "https://www.pexels.com/photo/9348136/",
      },
      {
        url: "/blog/ppjb-deposit-protection-contract-review.webp",
        alt: "Person holding and reviewing a formal contract document with highlighted terms, representing the careful review of PPJB clauses that protect an off-plan buyer's deposit in Bali if construction stops",
        credit: "RDNE Stock project / Pexels",
        sourceUrl: "https://www.pexels.com/photo/7841486/",
      },
    ],
    citations: [
      {
        label:
          "Indonesian Government Regulation PP No. 12 of 2021 on Housing: PPJB conditions including the 20% construction completion threshold (Tier 1 regulation implementing UU Cipta Kerja / Law No. 1 of 2011)",
        url: "https://regulasi.hukumproperti.com/peraturan-pemerintah-republik-indonesia-nomor-12-tahun-2021/",
      },
      {
        label:
          "Dubai Land Department: Law No. 8 of 2007 Concerning Escrow Accounts for Real Estate Development in the Emirate of Dubai (Tier 1 legislation)",
        url: "https://dlp.dubai.gov.ae/Legislation%20Reference/2007/Law%20No.%20(8)%20of%202007.html",
      },
      {
        label:
          "Destined for Bali: The Pros and Cons of Buying Off-Plan Properties in Bali, including deposit structure and developer default risks (Tier 2 market analysis)",
        url: "https://www.destinedforbali.com/p/the-pros-and-cons-of-buying-off-plan",
      },
    ],
    layoutVariant: "gallery",
  },
  {
    slug: "vat-ppn-new-bali-villa-purchase",
    title: "VAT on a New Bali Villa: What Buyers Pay and When",
    category: "investment",
    imageUrl: null,
    sortOrder: 65,
    metaDescription:
      "Buying a new Bali villa from a developer adds 11% PPN (VAT) to the price. Resale villas are exempt. Here is what every foreign buyer needs to know.",
    body: `<p>Buying a new villa directly from a developer in Bali adds an 11% Value Added Tax (PPN in Indonesian) on top of the agreed purchase price. If you negotiate a price of USD 300,000 with the developer, the final invoice will be roughly USD 333,000 once PPN is included. This applies to any first sale of new residential property by a <a href="https://pajak.go.id" data-external="true">VAT-registered developer (PKP)</a>; private resale transactions between individuals do not attract PPN, which means secondary-market buyers pay only BPHTB and PPh.</p><p>The developer must issue an official tax invoice (faktur pajak) for each payment tranche. On an off-plan purchase, you receive separate tax invoices aligned with each construction milestone payment. Keep all of them: they are evidence of the tax you paid and matter for future sale accounting and any PT PMA tax filings.</p><p>Most Bali investment villas fall below the level where a second tax applies. Under <a href="https://www.indonesia-investments.com/news/todays-headlines/property-in-indonesia-government-revises-luxury-goods-tax/item9148" data-external="true">PMK No. 86/PMK.010/2019</a>, properties priced at IDR 30 billion or above (roughly USD 2 million at mid-2026 exchange rates) also attract PPnBM, Indonesia's luxury goods sales tax, at 20% of the full sale value. The developer pays PPnBM and factors it into the listed price. For villas in the typical Canggu and Tabanan investment range, this threshold is rarely reached.</p><p>Buying through a PT PMA opens an option to recover the PPN. If your PT PMA is itself registered as a VAT taxable entity (PKP), the 11% PPN paid on acquisition is a creditable input against the PPN your company collects from rental guests. Over time, this can reduce the net cost of the acquisition tax to zero, provided the PT PMA files monthly PPN returns and maintains compliant faktur pajak records. This is one reason investors sometimes prefer the PT PMA route even for a single villa.</p><p>The Indonesian government has run periodic PPN DTP (government-borne VAT) incentives for residential property. Recent schemes have capped eligibility at properties valued at or below IDR 5 billion (about USD 333,000). Off-plan investment villas priced above that ceiling do not qualify. Check the current Minister of Finance Regulation (PMK) with a local tax adviser before assuming any incentive applies to your purchase.</p><p>Always confirm the developer holds valid PKP status with the <a href="https://pajak.go.id" data-external="true">Direktorat Jenderal Pajak (DJP)</a> before transferring funds, and request a copy of the faktur pajak after each payment. A developer who cannot produce valid tax invoices may not be compliant, which creates risk beyond the property itself.</p><p>This article is general information only and is not tax or legal advice. Consult a registered Indonesian tax adviser (Konsultan Pajak) for guidance specific to your transaction and structure.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Does PPN apply to both off-plan and completed Bali villa purchases from a developer?",
        answer:
          "Yes. PPN applies to any first sale of new residential property by a VAT-registered developer (PKP), whether the property is off-plan or already completed. Each payment tranche on an off-plan purchase generates a separate official tax invoice (faktur pajak). PPN does not apply to secondary-market resales between private individuals; those transactions incur only BPHTB (buyer transfer tax at 5%) and PPh (seller income tax at 2.5%).",
      },
      {
        question:
          "At what price does the PPnBM luxury goods tax apply to a Bali villa?",
        answer:
          "PPnBM applies to properties valued at IDR 30 billion or above (approximately USD 2 million at mid-2026 exchange rates) under PMK No. 86/PMK.010/2019. The rate is 20% of the full sale value. The developer, not the buyer, is legally obligated to pay PPnBM, though developers typically account for it in the listing price. Most investment villas in Canggu, Tabanan, and Kaba Kaba sit below this threshold, so PPnBM is not a cost most foreign buyers will face.",
      },
      {
        question:
          "Can a PT PMA recover the 11% PPN paid when buying a Bali villa?",
        answer:
          "A PT PMA that is itself registered as a VAT taxable entity (PKP) can claim the 11% PPN paid on acquisition as input tax credit. This offsets against PPN collected from rental guests on short-term stays, effectively reducing the net cost of the acquisition PPN to zero over time. The PT PMA must file monthly PPN returns and maintain properly issued faktur pajak records. A PT PMA that is not registered as PKP cannot make this claim.",
      },
      {
        question:
          "Does the government's PPN DTP incentive apply to Bali investment villas?",
        answer:
          "The PPN DTP (government-borne VAT) incentive has been available periodically for eligible residential property in Indonesia, but it caps the property value at IDR 5 billion (about USD 333,000). Off-plan investment villas priced above that ceiling do not qualify. The incentive has also typically required properties to be ready-to-occupy and handed over within the incentive period. Check the current-year PMK regulation with a local tax adviser to confirm what, if anything, applies to your specific purchase.",
      },
    ],
    publishedAt: "2026-08-17",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/property-tax-stamp-document.webp",
    gallery: [
      {
        url: "/blog/new-apartment-building-palm-trees.webp",
        alt: "Modern multi-storey residential apartment buildings with palm trees against a clear blue sky, representing new developer property subject to 11% PPN VAT in Indonesia",
        credit: "Robert So / Pexels",
        sourceUrl: "https://www.pexels.com/photo/14601099/",
      },
      {
        url: "/blog/developer-agent-blueprints-couple.webp",
        alt: "Real estate agent presenting architectural blueprints to a couple indoors, representing the developer sales meeting where PPN is part of the new property purchase transaction in Bali",
        credit: "Ivan S / Pexels",
        sourceUrl: "https://www.pexels.com/photo/8962802/",
      },
    ],
    citations: [
      {
        label:
          "Direktorat Jenderal Pajak (DJP): PMK 131/2024 on PPN rates, confirming the 11% effective rate for most taxable supplies including new residential property sales (Tier 1 Indonesian government source)",
        url: "https://www.pajak.go.id/en/node/113453",
      },
      {
        label:
          "Indonesia Investments: Government Revises Luxury Goods Tax (PPnBM) - PMK No. 86/PMK.010/2019 raising the luxury property threshold to IDR 30 billion (Tier 2 investment news coverage of official regulation)",
        url: "https://www.indonesia-investments.com/news/todays-headlines/property-in-indonesia-government-revises-luxury-goods-tax/item9148",
      },
      {
        label:
          "Logiframe: VAT Incentives for Residential Property in Indonesia (2025 Update) - PPN DTP scheme eligibility, caps, and qualifying property types (Tier 2 Indonesian tax advisory firm)",
        url: "https://logiframe.com/logiframe-blog/vat-incentives-for-landed-houses-and-residential-units-in-indonesia-2025-update",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "foreign-company-buy-bali-property-without-pt-pma",
    title: "Can My US LLC Buy Bali Property Without a PT PMA?",
    category: "investment",
    imageUrl: null,
    sortOrder: 66,
    metaDescription:
      "A US LLC or any foreign company cannot hold a registered Bali land title. Indonesian law requires an Indonesian PT PMA. Here is how the structure works.",
    body: `<p>A US LLC, UK Ltd, or any other foreign-incorporated company cannot hold a registered land title in Bali. Indonesia's <a href="https://www.flevin.com/id/lgso/translations/Laws/Law%20No.%205%20of%201960%20on%20Basic%20Agrarian%20Principles%20(ETLJ).doc" data-external="true">Basic Agrarian Law (UU No. 5 of 1960)</a> restricts Hak Guna Bangunan (the right to build, or HGB) and other title types to entities established under Indonesian law and domiciled in Indonesia. A foreign-incorporated company does not meet that requirement, full stop.</p><p>A US LLC can appear as a named party on a private leasehold contract (Hak Sewa), since Hak Sewa is not registered at the National Land Agency (BPN). The leasehold title stays in the Indonesian landowner's name, and your contract gives you the right to use the land for the agreed period. The risk is a lack of official BPN registration. If a dispute arises, or if the land is mortgaged or sold to a third party, a foreign company's contractual claim is harder to enforce before Indonesian courts than the claim of an Indonesian legal entity would be. Indonesian lawyers will also flag the arrangement when you seek a rental permit, because operating licenses typically require an Indonesian legal person as the applicant.</p><p>Hak Pakai for residential property requires a foreign individual who holds a valid Indonesian stay permit, per <a href="https://www.makarim.com/news/foreigners-to-hold-property-in-indonesia" data-external="true">Government Regulation PP 103 of 2015</a>. It does not apply to any type of company. HGB is restricted to entities incorporated under Indonesian law. Neither title is accessible to an offshore structure registered abroad.</p><p>The practical solution is a PT PMA (Perseroan Terbatas Penanaman Modal Asing), a foreign-investment company incorporated in Indonesia through the <a href="https://oss.go.id" data-external="true">BKPM Online Single Submission (OSS) system</a>. Your US LLC can hold up to 99% of the PT PMA's shares, with a second shareholder holding the remaining 1%. The PT PMA, as an Indonesian legal entity, can then hold HGB title on a Bali villa and apply for the permits needed to operate a short-term rental. This is the structure used by most US and UAE investors in Bali.</p><p>Under current BKPM guidelines, a PT PMA requires a minimum paid-up capital of IDR 2.5 billion (roughly USD 150,000 at mid-2026 exchange rates) and a minimum investment plan of IDR 10 billion. Setup through a local legal firm typically takes 4 to 8 weeks and costs around USD 3,000 to 5,000. Annual compliance such as audit and corporate filings adds roughly USD 2,000 to 4,000 per year. These are ranges based on market-quoted figures and can vary by provider and complexity.</p><p>This article is general information only and is not legal advice. Consult a registered Indonesian lawyer for guidance specific to your situation and structure.</p>`,
    venues: [],
    faq: [
      {
        question:
          "Can a UK Ltd or US LLC hold a Bali leasehold directly without a PT PMA?",
        answer:
          "A US LLC or UK Ltd can be a named party on a private leasehold contract (Hak Sewa) in Bali, since Hak Sewa is not formally registered at BPN. However, this provides weaker legal protection than a properly registered title. For a registered title such as HGB, only an entity incorporated under Indonesian law qualifies. Most investors use a PT PMA to hold HGB and obtain rental operating licenses, rather than relying on an unregistered leasehold under a foreign company name.",
      },
      {
        question:
          "What are the risks of using an offshore company instead of a PT PMA to hold Bali property?",
        answer:
          "The main risks are limited enforceability, no BPN registration, and permit complications. An offshore company holding only a private leasehold has no entry in the national land registry. If the landowner disputes the contract or a third party claims the land, the foreign company's position is harder to defend in Indonesian courts. A rental operating permit (such as a Pondok Wisata license) also requires an Indonesian legal entity as the applicant, so operating commercially without a PT PMA is difficult.",
      },
      {
        question:
          "Does Indonesia recognize foreign company ownership of Bali property?",
        answer:
          "No registered land title in Indonesia can be held by a company incorporated outside Indonesia. The investment framework requires domestic incorporation through a PT PMA to access land rights such as HGB. Indonesia does not have a mechanism analogous to a US deed in a foreign company's name. The PT PMA structure, where the foreign company is the majority shareholder of the Indonesian entity, is the recognized route for foreign investors wanting legal certainty on a Bali property.",
      },
    ],
    publishedAt: "2026-08-18",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/us-llc-form-business-formation-laptop.webp",
    gallery: [
      {
        url: "/blog/indonesian-law-legal-stamp-document.webp",
        alt: "A wooden rubber stamp resting on an open legal document, representing the Indonesian regulatory requirement that only domestically incorporated entities can hold registered property titles in Bali",
        credit: "Markus Spiske / Pexels",
        sourceUrl: "https://www.pexels.com/photo/9858904/",
      },
      {
        url: "/blog/legal-adviser-certificate-office-desk.webp",
        alt: "A legal professional working at a desk with a framed certificate and justice statue, representing the specialist Indonesian legal advice needed when structuring a PT PMA for Bali property investment",
        credit: "Pavel Danilyuk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/8112112/",
      },
    ],
    citations: [
      {
        label:
          "Indonesia Basic Agrarian Law UU No. 5 of 1960 - Article 36 restricts Hak Guna Bangunan to entities established under Indonesian law and domiciled in Indonesia (Tier 1 Indonesian legislation)",
        url: "https://www.flevin.com/id/lgso/translations/Laws/Law%20No.%205%20of%201960%20on%20Basic%20Agrarian%20Principles%20(ETLJ).doc",
      },
      {
        label:
          "Makarim and Taira S Law Firm: Foreigners to Hold Property in Indonesia - analysis of PP 103/2015 and the legal routes for foreign individuals and entities to hold Indonesian property rights (Tier 2 Indonesian law firm)",
        url: "https://www.makarim.com/news/foreigners-to-hold-property-in-indonesia",
      },
      {
        label:
          "BKPM Online Single Submission (OSS) System - official Indonesian investment portal for PT PMA registration, capital requirements, and business licensing (Tier 1 Indonesian government source)",
        url: "https://oss.go.id",
      },
    ],
    layoutVariant: "qa",
  },
  {
    slug: "ubud-vs-canggu-property-investment",
    title: "Ubud vs Canggu for Property Investment in Bali",
    category: "location",
    imageUrl: null,
    sortOrder: 67,
    metaDescription:
      "Ubud vs Canggu for Bali property investment: land prices, rental yields, airport access, and which suits your investor profile in 2026.",
    body: `<p>Canggu suits investors who want the highest short-term rental volumes; Ubud suits those who want a lower entry price and income driven by wellness and cultural tourism. The right choice depends on your price band, target guest, and tolerance for seasonal demand variation.</p><p>Land prices are the most visible difference. Central <a href="https://www.google.com/maps/place/Canggu,+Kuta+Utara,+Badung+Regency,+Bali" data-external="true">Canggu</a> and Berawa land trades at roughly IDR 1.5 to 2 billion per are (100 m2), with premium plots reaching IDR 3 to 5 billion per are. In <a href="https://www.google.com/maps/place/Ubud,+Gianyar+Regency,+Bali" data-external="true">Ubud</a>, land typically ranges from IDR 500 million to 1 billion per are, a 40 to 60 percent discount to comparable coastal plots. For a buyer on a fixed budget, Ubud often allows a larger footprint or a higher-specification build for the same outlay. These are observed ranges from established Bali agencies and will vary by location, plot size, and title type.</p><p>Rental yields follow a similar gap. Canggu and Berawa gross villa yields run 12 to 18 percent, driven by year-round demand from beach visitors and remote workers. Ubud yields run roughly 8 to 12 percent gross, with longer average stays at lower nightly rates. Net yields are lower in both areas after management fees, income tax, and operating costs. These are market-observed ranges, not a guarantee of return. This is not financial advice.</p><p>Airport access matters for your guests. From Ngurah Rai International Airport, Canggu is roughly 14 to 20 km and 40 to 60 minutes by car. Ubud is 36 to 40 km and takes 60 to 90 minutes under normal traffic, and longer during peak hours. Canggu has the access advantage. Ubud guests accept the longer transfer because the destination itself is the draw.</p><p>The legal framework is identical in both areas. Foreign buyers use a leasehold (Hak Sewa), a Hak Pakai title with a valid stay permit, or a PT PMA company holding HGB title. There is no freehold option for foreign nationals in either location. Bali welcomed 6.33 million international tourists in 2024, and star hotel occupancy reached 63.71 percent in December 2024, showing the demand base that rental villas compete in.</p><p>If you want high-volume short stays and strong resale liquidity, Canggu is the more established market. If you want a lower entry cost and a differentiated position in wellness and long-stay tourism, Ubud offers that at a meaningful price discount.</p>`,
    venues: [
      {
        name: "Ubud Town Centre",
        distance: "36-40 km from airport",
        coords: "-8.5069,115.2625",
        url: "https://www.google.com/maps/place/Ubud,+Gianyar+Regency,+Bali",
      },
      {
        name: "Canggu / Berawa",
        distance: "14-20 km from airport",
        coords: "-8.6478,115.1385",
        url: "https://www.google.com/maps/place/Canggu,+Kuta+Utara,+Badung+Regency,+Bali",
      },
    ],
    faq: [
      {
        question: "Are Ubud or Canggu rental yields higher for villas?",
        answer:
          "Canggu and Berawa villas typically produce the stronger gross yields, observed in the 12 to 18 percent range, on the back of high-volume short-stay demand from beach and surf visitors. Ubud runs roughly 8 to 12 percent gross, reflecting lower nightly rates offset partially by longer average stays from wellness and cultural tourists. Net yields in both areas are lower once management fees, taxes, and operating costs are deducted. These are market-observed ranges, not a guarantee of return.",
      },
      {
        question: "How do land prices in Ubud compare to Canggu?",
        answer:
          "Ubud land typically trades at a 40 to 60 percent discount to central Canggu on a per-are basis. Central Canggu and Berawa land runs around IDR 1.5 to 2 billion per are, with premium plots higher. Ubud ranges from around IDR 500 million to 1 billion per are. For a buyer on a fixed budget, Ubud generally allows a larger footprint or higher-specification build for the same capital outlay. Prices vary significantly by specific location, road access, and title type.",
      },
      {
        question: "Is Ubud or Canggu easier to access for international visitors?",
        answer:
          "Canggu is closer to Ngurah Rai International Airport at roughly 14 to 20 km, typically 40 to 60 minutes by car. Ubud is 36 to 40 km from the airport and takes 60 to 90 minutes under normal traffic, with peak-hour journeys running longer. Canggu has the clear accessibility advantage for guests arriving by international flight. Ubud guests tend to make the longer transfer because the area's cultural and wellness character is itself the reason they chose it.",
      },
      {
        question: "Can a foreign buyer purchase in both Ubud and Canggu using the same ownership structure?",
        answer:
          "Yes. The legal framework is the same across all of Bali. Foreign nationals can use a leasehold (Hak Sewa) or, for registered title, set up a PT PMA company to hold HGB. Hak Pakai is also available to foreign individuals who hold a valid Indonesian stay permit. None of these structures change based on whether the property is in Ubud, Canggu, or any other part of Bali. The same Indonesian lawyer can typically handle both.",
      },
    ],
    publishedAt: "2026-08-19",
    isInsight: true,
    author: "OMA Townhouse",
    heroImage: "/blog/ubud-rice-terraces-tegalalang-aerial.webp",
    gallery: [
      {
        url: "/blog/canggu-echo-beach-sunset-surfers.webp",
        alt: "Crowds of people enjoying a golden sunset on Canggu Beach, Bali, capturing the lively beach character that drives strong short-term rental demand in the Canggu property market",
        credit: "Peggy Anke / Pexels",
        sourceUrl: "https://www.pexels.com/photo/5289209/",
      },
      {
        url: "/blog/ubud-traditional-village-forest-aerial.webp",
        alt: "Aerial view of a traditional Balinese village set among dense jungle and rice fields near Ubud, showing the green, low-density landscape that defines the Ubud property market and attracts wellness and cultural tourism",
        credit: "Tom Fisk / Pexels",
        sourceUrl: "https://www.pexels.com/photo/36947695/",
      },
    ],
    citations: [
      {
        label:
          "BPS-Statistics Indonesia Bali Province: Tourism Overview December 2024 - international tourist arrivals 6.33 million for 2024 and star hotel room occupancy 63.71% in December 2024 (Tier 1 official government statistical release)",
        url: "https://bali.bps.go.id/en/pressrelease/2025/02/03/717939/-tourism-overview-in-bali-province-december-2024.html",
      },
      {
        label:
          "Exotiq Property: Bali Land Price Trends - What Investors Need to Know (2025) - market-observed land price ranges for Canggu and Ubud, sourced from an established Tier 2 Bali property agency",
        url: "https://www.exotiqproperty.com/blog/bali-land-price-trends-what-investors-need-to-know",
      },
      {
        label:
          "Kibarer Property - established Bali real estate agency with transaction data covering Ubud and Canggu rental yield ranges (Tier 2 Bali property industry source)",
        url: "https://www.kibarerproperty.com/",
      },
    ],
    showMap: true,
    layoutVariant: "map",
  },
];
