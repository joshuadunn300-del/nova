// imageLibrary.js — curated, royalty-free stock photos for generated demo sites.
//
// Hero photo IDs + brand colors for all 59 niches below are extracted directly
// from Tenji's real production bundle (reference/tenji-image-library.md,
// 2026-07-21) — not guessed, not re-curated. Superseded an earlier hand-picked
// set of ~14 niches whose hero images didn't actually match the real bundle
// once this landed (e.g. electricians was a different photo entirely).
// `about`/`services` arrays don't have an authoritative per-niche source yet
// (the extracted doc only maps niche → hero + brand color), so niches without
// a hand-curated about/services set fall back to GENERIC's — hero image (the
// biggest visual element) is exact for every niche either way.
//
// All photo IDs are free Unsplash-License images (commercial use OK, no
// attribution, no API key) — NOT plus.unsplash.com premium. Hotlinked
// directly, exactly like Tenji does.
//
// Usage:  getNicheImages('plumbing').hero
//         getNicheImages('plumbing').about
//         getNicheImages('plumbing').services   // array of 2-3 URLs
//         getNicheBrandColor('plumbing')         // '#2563EB'
//         getAvatar(0)                            // testimonial face
//
// See imageLibrary.README.md for integration + how to add a niche.

// Build a hotlink-stable Unsplash URL from a bare photo id.
const U = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

// Hero photo ID + brand color per niche — verbatim from Tenji's real bundle.
const HERO_BRAND = {
  plumbing: { hero: '1504328345606-18bbc8c9d7d1', brand: '#2563EB' },
  electricians: { hero: '1621905251918-48416bd8575a', brand: '#F59E0B' },
  roofers: { hero: '1632759145351-1d592919f522', brand: '#B91C1C' },
  'pest-control': { hero: '1632935190508-b45a3a2e9a36', brand: '#DC2626' },
  hvac: { hero: '1581094794329-c8112a89af12', brand: '#0891B2' },
  'tree-removal': { hero: '1542273917363-3b1817f69a2d', brand: '#15803D' },
  locksmiths: { hero: '1558002038-1055907df827', brand: '#374151' },
  'garage-door': { hero: '1597007030739-6d2e7172ee5e', brand: '#7C3AED' },
  'smash-repair': { hero: '1632823471565-1ecaf6ddb88a', brand: '#DC2626' },
  landscapers: { hero: '1558904541-efa843a96f01', brand: '#16A34A' },
  scaffolding: { hero: '1503387762-592deb58ef4e', brand: '#475569' },
  builders: { hero: '1503387762-592deb58ef4e', brand: '#C2410C' },
  'home-renovation': { hero: '1600585154340-be6161a56a0c', brand: '#B45309' },
  'bathroom-renovation': { hero: '1620626011761-996317b8d101', brand: '#0D9488' },
  'kitchen-renovators': { hero: '1556909114-f6e7ad7d3136', brand: '#9A3412' },
  painters: { hero: '1562259949-e8e7689d7828', brand: '#9333EA' },
  tilers: { hero: '1600566752355-35792bedcfea', brand: '#0E7490' },
  'flooring-installers': { hero: '1581858726788-75bc0f6a952d', brand: '#A16207' },
  'solar-panel-installers': { hero: '1509391366360-2e959784a276', brand: '#CA8A04' },
  'security-camera-installers': { hero: '1557597774-9d273605dfa9', brand: '#1E40AF' },
  fencing: { hero: '1605146769289-440113cc3d00', brand: '#EA580C' },
  'concrete-contractors': { hero: '1518709268805-4e9042af9f23', brand: '#6B7280' },
  'driveway-installers': { hero: '1558981403-c5f9899a28bc', brand: '#57534E' },
  bricklayers: { hero: '1581094794329-c8112a89af12', brand: '#9F1239' },
  excavation: { hero: '1581094794329-c8112a89af12', brand: '#854D0E' },
  demolition: { hero: '1504307651254-35680f356dfd', brand: '#7F1D1D' },
  'carpet-cleaners': { hero: '1558317374-067fb5f30001', brand: '#0369A1' },
  'pressure-washing': { hero: '1527515637462-cff94eecc1ac', brand: '#0284C7' },
  'gutter-cleaning': { hero: '1632889186786-f9b5e8e2c2a4', brand: '#0E7490' },
  'skip-bin-hire': { hero: '1530587191325-3db32d826c18', brand: '#CA8A04' },
  'rubbish-removal': { hero: '1532996122724-e3c354a0b15b', brand: '#16A34A' },
  removalists: { hero: '1600518464441-9154a4dea21b', brand: '#D97706' },
  'car-detailing': { hero: '1607860108855-64acf2078ed9', brand: '#1D4ED8' },
  mechanics: { hero: '1486006920555-c77dcf18193c', brand: '#1E3A8A' },
  'tyre-shops': { hero: '1486262715619-67b85e0b08d3', brand: '#111827' },
  'lawn-care': { hero: '1592417817098-8fd3d9eb14a5', brand: '#4D7C0F' },
  'pool-cleaners': { hero: '1576013551627-0cc20b96c2a7', brand: '#06B6D4' },
  'window-cleaners': { hero: '1527515637462-cff94eecc1ac', brand: '#0284C7' },
  'storage-facilities': { hero: '1586528116311-ad8dd3c8310d', brand: '#7C3AED' },
  'car-wash': { hero: '1520340356584-f9917d1eea6f', brand: '#0EA5E9' },
  gyms: { hero: '1534438327276-14e5300c3a48', brand: '#DC2626' },
  dentists: { hero: '1588776814546-1ffcf47267a5', brand: '#0D9488' },
  physios: { hero: '1571019613454-1cb2f99b2d8b', brand: '#0E7490' },
  chiropractors: { hero: '1612531385446-f7e6d131e1d0', brand: '#0891B2' },
  podiatrists: { hero: '1559757175-7cb057fba93c', brand: '#0369A1' },
  optometrists: { hero: '1577401239170-897942555fb3', brand: '#1D4ED8' },
  vets: { hero: '1576201836106-db1758fd1c97', brand: '#0D9488' },
  'personal-trainers': { hero: '1571019613454-1cb2f99b2d8b', brand: '#DC2626' },
  'martial-arts': { hero: '1555597673-b21d5c935865', brand: '#B91C1C' },
  'hair-salons': { hero: '1560066984-138dadb4c035', brand: '#BE185D' },
  barbers: { hero: '1585747860715-2ba37e788b70', brand: '#1F2937' },
  'beauty-salons': { hero: '1570172619644-dfd03ed5d881', brand: '#C026D3' },
  'nail-salons': { hero: '1604654894610-df63bc536371', brand: '#DB2777' },
  'massage-clinics': { hero: '1600334089648-b0d9d3028eb2', brand: '#7C3AED' },
  'tattoo-studios': { hero: '1611501275019-9b5cda994e8d', brand: '#9333EA' },
  cafes: { hero: '1554118811-1e0d58224f24', brand: '#92400E' },
  restaurants: { hero: '1517248135467-4c7edcad34c4', brand: '#B91C1C' },
  takeaway: { hero: '1568901346375-23c9450c58cd', brand: '#EA580C' },
  bakeries: { hero: '1509440159596-0249088772ff', brand: '#A16207' },
  catering: { hero: '1555244162-803834f70033', brand: '#9D174D' },
};

// Hand-curated about/services images — kept from the earlier pass (individually
// verified HTTP 200 + eyeballed 2026-07-20). Niches not listed here use
// GENERIC's about/services alongside their own real HERO_BRAND hero image.
const ABOUT_SERVICES = {
  plumbing: {
    about: '1621905252507-b35492cc74b4',
    services: ['1585704032915-c3400ca199e7', '1607472586893-edb57bdc0e39', '1620626011761-996317b8d101'],
  },
  electricians: {
    about: '1621905251918-48416bd8575a',
    services: ['1621905251189-08b45d6a269e', '1620283085439-39620a1e21c4', '1521618755572-156ae0cdd74d'],
  },
  roofers: {
    about: '1635424710928-0544e8512eae',
    services: ['1600585154340-be6161a56a0c', '1583608205776-bfd35f0d9f83'],
  },
  'pest-control': {
    // Note: free literal "exterminator spraying" shots are all premium on Unsplash,
    // so this niche leans on a protect-your-home theme + a masked service tech.
    about: '1581578731548-c64695cc6952',
    services: ['1583608205776-bfd35f0d9f83', '1558904541-efa843a96f01'],
  },
  hvac: {
    about: '1600607687939-ce8a6c25118c',
    services: ['1698479603408-1a66a6d9e80f', '1718203862467-c33159fdc504'],
  },
  'tree-removal': {
    about: '1516214104703-d870798883c5',
    services: ['1635424710928-0544e8512eae', '1516214104703-d870798883c5'],
  },
  locksmiths: {
    about: '1558002038-1055907df827',
    services: ['1595079676339-1534801ad6cf', '1558002038-1055907df827'],
  },
  'garage-door': {
    about: '1568605114967-8130f3a36994',
    services: ['1583608205776-bfd35f0d9f83', '1613977257363-707ba9348227'],
  },
  'smash-repair': {
    about: '1487754180451-c456f719a1fc',
    services: ['1503376780353-7e6692767b70', '1487754180451-c456f719a1fc'],
  },
  landscapers: {
    about: '1558904541-efa843a96f01',
    services: ['1416879595882-3373a0480b5b', '1523348837708-15d4a09cfac2'],
  },
  scaffolding: {
    about: '1541888946425-d81bb19240f5',
    services: ['1504307651254-35680f356dfd', '1517089152318-42ec560349c0'],
  },
  builders: {
    about: '1504307651254-35680f356dfd',
    services: ['1589939705384-5185137a7f0f', '1503387837-b154d5074bd2', '1613977257363-707ba9348227'],
  },
  'home-renovation': {
    about: '1581858726788-75bc0f6a952d',
    services: ['1523413651479-597eb2da0ad6', '1607400201889-565b1ee75f8e'],
  },
  'bathroom-renovation': {
    about: '1600566752355-35792bedcfea',
    services: ['1585704032915-c3400ca199e7', '1523413651479-597eb2da0ad6'],
  },
};

// Fallback for any niche without a hand-curated about/services set.
const GENERIC_ABOUT_SERVICES = {
  about: '1621905252507-b35492cc74b4',
  services: ['1541888946425-d81bb19240f5', '1613977257363-707ba9348227', '1504307651254-35680f356dfd'],
};
const GENERIC_HERO_BRAND = { hero: '1600585154340-be6161a56a0c', brand: '#9D174D' };

// Testimonial/avatar faces via i.pravatar.cc (fake-face service, hotlink-stable,
// no key). Matches Tenji's `i.pravatar.cc/{size}?img={n}` pattern.
const AVATAR_IMGS = [11, 12, 13, 20, 21, 22, 32, 45, 47, 68];

/**
 * Resolve a niche to ready-to-use image URLs.
 * @param {string} niche - niche slug, e.g. "plumbing", "tree-removal" (case-insensitive).
 * @returns {{hero:string, about:string, services:string[]}}
 */
export function getNicheImages(niche) {
  const key = String(niche || '').trim().toLowerCase();
  const hb = HERO_BRAND[key] || GENERIC_HERO_BRAND;
  const as = ABOUT_SERVICES[key] || GENERIC_ABOUT_SERVICES;
  return {
    hero: U(hb.hero, 1600),
    about: U(as.about, 900),
    services: as.services.map((id) => U(id, 800)),
  };
}

/**
 * Real Tenji brand color for a niche (theme.primary default), e.g. plumbing → #2563EB.
 * @param {string} niche
 * @returns {string} hex color
 */
export function getNicheBrandColor(niche) {
  const key = String(niche || '').trim().toLowerCase();
  return (HERO_BRAND[key] || GENERIC_HERO_BRAND).brand;
}

/**
 * Testimonial avatar URL. Deterministic per index so a given reviewer is stable.
 * @param {number} index - reviewer index (0-based).
 * @param {number} [size=64] - px.
 * @returns {string}
 */
export function getAvatar(index = 0, size = 64) {
  const img = AVATAR_IMGS[index % AVATAR_IMGS.length];
  return `https://i.pravatar.cc/${size}?img=${img}`;
}

/** List of supported niche slugs. */
export const NICHE_SLUGS = Object.keys(HERO_BRAND);

export default getNicheImages;
