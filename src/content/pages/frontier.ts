import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'frontier', group: 'us', order: 7, demarche: true,
  tool: { kind: 'fees', props: { airline: 'frontier', only: 'us' } },
  mini: { kind: 'mini:bag-frontier' },
  related: ['personal-item-size', 'checked-bag-weight-limit', 'overweight-baggage-fee', 'allegiant', 'spirit'],
  sources: ['frontier-bags', 'frontier-optional', 'frontier-military'],
  en: {
    slug: 'frontier-baggage-fees', nav: 'Frontier', card: 'Frontier personal item and carry-on sizes, the 40 lb checked bag, bundles, overweight bands since April 2026 and the military allowance.',
    title: 'Frontier Baggage Fees and Personal Item Size in 2026',
    description: 'Frontier baggage fees and personal item size in 2026: what is free, the 40 lb checked bag, bundles, the April 4 overweight increase and the military allowance.',
    h1: 'Frontier bag fees and personal item size',
    intro: 'Frontier sets its bag prices flight by flight. Start with the size of your bag: the checker tells you whether it travels free as a personal item.',
    resume: (h) => {
      const x = h.A('frontier'), o = x.overweight!;
      return `On Frontier, the only bag included with every fare is a personal item of ${x.pi}, weighing up to ${x.piW}, wheels and straps counted. Anything larger is paid: a carry-on of up to ${x.co} and ${x.coW}, or a checked bag. Frontier publishes no fixed bag fee. It prices bags for each flight according to the travel dates and the moment of purchase, and a bag bought at booking costs less than the same bag bought at the airport; its Bag Price Checker gives the figure for a given trip. The checked bag is where Frontier differs most: its standard weight is ${x.ckW}, not the 50 pounds of other US airlines, so a bag of ${o[0].fromLb} to ${o[0].toLb} pounds pays ${h.m(o[0].fee)} more. From ${o[1].fromLb} pounds, the surcharge is ${h.m(o[1].fee)} for bookings made from ${h.date('2026-04-04')}. The Economy, Premium and Business bundles include a carry-on. Read on Frontier's pages on ${x.read}.`;
    },
    faqs: (h) => {
      const x = h.A('frontier'), o = x.overweight!;
      return [
        { q: 'What is the weight limit for a Frontier checked bag?', a: `Frontier's standard checked bag weighs up to ${x.ckW} and measures up to ${x.ck}. That is ten pounds less than most US airlines. A bag of ${o[0].fromLb} to ${o[0].toLb} pounds pays ${h.m(o[0].fee)} per bag per direction, and a bag of ${o[1].fromLb} to 99.99 pounds ${h.m(o[1].fee)} for bookings made from ${h.date('2026-04-04')}.` },
        { q: 'Is the Frontier personal item really free?', a: `Yes, one personal item is included with all fares. It must stay within ${x.pi} and ${x.piW}, handles, wheels and straps included, and Frontier checks it at boarding. A bag that does not fit becomes a paid bag, and Frontier says bags cost more at the airport than at booking.` },
        { q: 'Which Frontier bundles include a carry-on bag?', a: 'Frontier lists three bundles that include a carry-on: Economy, Premium and Business. Elite Gold members and above also get a carry-on through their status. On a fare without a bundle or status, the carry-on is an extra priced by flight and by the moment you buy it.' },
        { q: 'Do military members fly Frontier with free bags?', a: 'Active US military with a CAC or military ID get one personal item, one carry-on and two checked bags free, and so do a spouse and children on the same itinerary. The overweight and oversize charges are waived on those two free checked bags, according to Frontier’s military bags page.' },
      ];
    },
    body: (h) => {
      const x = h.A('frontier'), o = x.overweight!;
      const t = h.table(
        ['Item', 'Size', 'Weight', 'Price'],
        [
          ['Personal item', x.pi, x.piW, 'included with every fare'],
          ['Carry-on', x.co, x.coW, 'paid, or in a bundle'],
          ['Checked bag', x.ck, x.ckW, 'paid, set per flight'],
        ],
        `Read on Frontier's bag options page on ${x.read}.`,
        ['l', 'l', 'l', 'l'],
      );
      const ow = h.table(
        ['Checked bag weight or size', 'Charge per bag, per direction'],
        [
          [`${o[0].fromLb} to ${o[0].toLb} lb`, h.m(o[0].fee)],
          [`${o[1].fromLb} to 99.99 lb, booked from ${h.date('2026-04-04')}`, h.m(o[1].fee)],
          [`${o[1].fromLb} to 99.99 lb, booked before that date`, '$100'],
          [`${x.oversize!.fromLinearIn} to 110 linear in`, h.m(x.oversize!.fee)],
        ],
        'From Frontier’s bag options page.',
        ['l', 'r'],
      );
      return `<h2>Three bags, three weight limits</h2>
<p>${h.src('frontier-bags', 'Frontier’s bag options page')} gives each bag a size and a weight, which few US airlines do. The personal item and the carry-on are both capped at ${x.piW}, the checked bag at ${x.ckW}.</p>
${t}
<h2>Why Frontier shows no fixed fee</h2>
<p>Frontier does not print a bag price list. ${h.src('frontier-optional', 'The optional services page')} explains that bag prices depend on the travel dates and on when you buy, and that a bag bought at booking costs less than one bought at the airport. The figure for your trip comes from Frontier's Bag Price Checker during booking. No fixed Frontier bag fee exists to quote, and this site does not invent one; what is fixed, and shown here, is the size of each bag and the overweight charges.</p>
<p>The bundles change the picture. Economy, Premium and Business bundles include a carry-on, and they are sold with the fare. For a traveler who needs a carry-on anyway, comparing the bare fare plus the bag with the bundled fare is the only way to know which is cheaper on a given flight.</p>
<h2>The 40 pound bag and the overweight steps</h2>
<p>A suitcase packed to the 50 pound line that passes on most US airlines costs extra on Frontier. Between ${o[0].fromLb} and ${o[0].toLb} pounds the charge is ${h.m(o[0].fee)}, and from ${o[1].fromLb} pounds it jumped from $100 to ${h.m(o[1].fee)} for bookings made from ${h.date('2026-04-04')}. Bags between ${x.oversize!.fromLinearIn} and 110 linear inches pay ${h.m(x.oversize!.fee)}. These amounts apply per bag and per direction, on top of the bag price.</p>
${ow}
<!--tool:mini:overweight-->
<h2>Status and military bags</h2>
<p>Frontier's elite program grants bags by tier. Elite Silver covers a personal item, Elite Gold a carry-on for the member only. Elite Platinum adds a carry-on and one checked bag, and Elite Diamond a carry-on and two checked bags; both extend to up to eight people on the same reservation. A free-bag benefit tied to a co-branded credit card is not stated on the pages read for this site.</p>
<p>${h.src('frontier-military', 'The military bags page')} is more generous than the fares: active US service members with a CAC or military ID, and a spouse and children on the same itinerary, get a personal item, a carry-on and two checked bags free, with overweight and oversize charges waived on those two bags.</p>
<h2>What to check before paying Frontier</h2>
<p>Measure the personal item: if it fits ${x.pi}, the cheapest fare may be all you need. Weigh the checked bag against ${x.ckW}, not 50. Price the bag at booking rather than later, and compare it with a bundle. Then check the bundle contents on the booking page before paying, to see exactly what each one includes.</p>`;
    },
  },
});
