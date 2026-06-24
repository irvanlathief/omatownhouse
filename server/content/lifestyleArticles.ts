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
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/RFpzOLCapYdEXOzx.webp",
    sortOrder: 6,
    isInsight: true,
    author: "OMA Townhouse",
    publishedAt: "2026-01-20",
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
    imageUrl: "/blog/blog-nuanu-creative.webp",
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
      { url: "/blog/blog-nuanu-creative.webp", alt: "Development near Kaba Kaba, Tabanan" },
      { url: "/blog/rice-terraces.jpg", alt: "Rice terraces in Tabanan, Bali" },
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
    imageUrl: "/blog/kedungu-beach.jpg",
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
      { url: "/blog/kedungu-beach.jpg", alt: "Kedungu Beach near Tabanan, Bali" },
      { url: "/blog/blog-rice-field.webp", alt: "Rice fields near Kaba Kaba" },
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
    imageUrl: "/blog/blog-rice-field.webp",
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
      { url: "/blog/blog-rice-field.webp", alt: "Rice fields near Kaba Kaba, Tabanan" },
      { url: "/blog/rice-terraces.jpg", alt: "Tabanan rice terraces, Bali" },
      { url: "/blog/blog-nuanu-creative.webp", alt: "Nuanu Creative City near Kaba Kaba" },
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
    imageUrl: "/blog/digital-nomad-cafe.webp",
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
      { url: "/blog/digital-nomad-cafe.webp", alt: "Foreign buyer working remotely from a Bali cafe" },
      { url: "/blog/blog-nuanu-creative.webp", alt: "Nuanu Creative City development near Kaba Kaba" },
      { url: "/blog/blog-rice-field.webp", alt: "Rice fields near Kaba Kaba, Tabanan" },
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
    imageUrl: "/blog/nuanu-creative-city.jpg",
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
      { url: "/blog/blog-rice-field.webp", alt: "Rice fields near Kaba Kaba, Tabanan" },
      { url: "/blog/rice-terraces.jpg", alt: "Tabanan rice terraces, Bali" },
      { url: "/blog/blog-nuanu-creative.webp", alt: "Nuanu Creative City development near Kaba Kaba" },
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
];
