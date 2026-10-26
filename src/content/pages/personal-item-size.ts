import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'personal-item-size', group: 'size', order: 2,
  tool: { kind: 'fit', props: { mode: 'personal', region: 'us', unit: 'in' } },
  mini: { kind: 'mini:volume' },
  related: ['carry-on-size', 'personal-item-vs-carry-on', 'underseat-bag', 'frontier', 'basic-economy-carry-on'],
  sources: ['american-carryon', 'united-carryon', 'jetblue-terms', 'frontier-bags', 'allegiant-fees', 'delta-carryon', 'southwest-carryon', 'alaska-carryon'],
  en: {
    slug: 'personal-item-size', nav: 'Personal item size', card: 'The under-seat bag each US airline lets you bring for free, in inches, and a check of your backpack against all of them.',
    title: 'Personal Item Size 2026: Free Under-Seat Bag by US Airline',
    description: 'Personal item size for American, United, JetBlue, Frontier and Allegiant in inches and cm, the airlines that print no size, and a check of your own backpack.',
    h1: 'Personal item size: which backpack goes free under the seat?',
    intro: 'Type the three sides of your backpack or tote: the checker lists the airlines whose under-seat limit it meets, and the side that is too long where it does not.',
    resume: (h) => {
      const aa = h.A('american'), ua = h.A('united'), b6 = h.A('jetblue'), f9 = h.A('frontier');
      return `A personal item is the small bag that rides under the seat in front of you, and it is free on every fare of every US airline on this site. The size is not the same everywhere. American, Frontier and Allegiant publish ${aa.pi}. United is the strictest at ${ua.pi}, and JetBlue prints ${b6.pi} in its terms. Delta, Southwest, Alaska and Hawaiian give no number at all: their rule is only that the bag must fit under the seat. Frontier is the one airline that also weighs it, with a cap of ${f9.piW}. In practice a backpack of 17 by 10 by 9 inches passes on every airline that publishes a size, which is why travelers on cheap fares choose that format. A bag that is larger but soft can still be accepted if it squeezes into the sizer, while a rigid case of the same outside size cannot.`;
    },
    faqs: (h) => [
      { q: 'Does a backpack count as a personal item on US flights?', a: `Yes, as long as it fits the airline's under-seat size when packed. A school or laptop backpack is usually close to the limit, so measure it full. On United the limit is ${h.A('united').pi}, which a large hiking pack exceeds; on American it is ${h.A('american').pi}. A backpack that is too big becomes your carry-on.` },
      { q: 'Which US airlines do not publish a personal item size?', a: 'Delta, Southwest, Alaska and Hawaiian. Their pages say the bag must fit under the seat in front of you and give no dimensions. That is generous in practice, since nobody measures the bag, but a bag that does not fit under the seat on the day will be moved to the overhead bin or checked.' },
      { q: 'Is the Frontier personal item weighed at the gate?', a: `Frontier is the only US airline on this site that publishes a weight for the personal item: ${h.A('frontier').piW}. Its page says the personal item is checked at boarding. A bag that fails the sizer or the weight becomes a paid carry-on or a checked bag, at the price charged at the gate.` },
      { q: 'Can I bring a purse and a backpack as personal items?', a: 'No. Each passenger gets one personal item. A purse, a laptop bag and a backpack are each a personal item, so two of them use the carry-on allowance too. The usual answer is to put the purse inside the backpack before boarding. Coats, a small food bag and medical devices are usually accepted on top.' },
    ],
    body: (h) => {
      const us = h.AIRLINES.filter((a) => a.region === 'us');
      const rows = us.map((a) => { const x = h.A(a.id); return [h.a(a.id, a.name), a.personal?.in ? x.pi : 'no size published, must fit under the seat', a.personal?.lb ? x.piW : 'none stated']; });
      const ua = h.A('united'), g4 = h.A('allegiant');
      return `<h2>Under-seat limits published by each US airline</h2>
<p>Five airlines print a size. The table quotes it as written on the airline's page, with our conversion in brackets. Where an airline publishes no size, the only test is the space under the seat on your aircraft, which varies by seat row and aircraft type.</p>
${h.table(['Airline', 'Personal item', 'Weight'], rows, 'Read on each airline page; the reading date is on the airline pages of this site.', ['l', 'l', 'l'])}
<h2>Why United's number is the one to pack for</h2>
<p>${h.a('united', 'United')} allows ${ua.pi}, the smallest depth and width of the group. It is also the airline where the size matters most, because Basic Economy passengers on most domestic routes travel with the personal item alone. A bag built for ${h.A('american').pi} is two inches too long for United's 17-inch side and four inches too wide on the 10-inch side. Backpacks sold as "personal item size" are often built around one airline; the checker above compares yours against all of them in one go.</p>
<h2>How much fits in a personal item</h2>
<p>A box of ${ua.pi} holds about 25 liters; the American and Allegiant box about 33. That is enough for two or three days of clothes rolled tightly, a toilet bag of small containers and a laptop. The tool below gives the ratio between the personal item and the carry-on for each airline, which helps decide whether paying for the larger bag is worth it.</p>
<!--tool:mini:volume-->
<h2>Low-cost airlines check it at the door</h2>
<p>On ${h.a('frontier', 'Frontier')} and ${h.a('allegiant', 'Allegiant')} the personal item is the only free bag. Allegiant publishes ${g4.pi} and sells the carry-on separately; Frontier adds its weight cap. Both airlines charge more for a bag paid at the airport than for one added at booking, so a backpack that fails the sizer is the most expensive way to travel with it. Pack it, close it and measure it the night before, including side pockets with a water bottle.</p>
<h2>Flying in Europe with the same bag</h2>
<p>UK and European airlines publish the under-seat bag in centimetres, at ${h.A('ryanair').pi} on Ryanair and ${h.A('british-airways').pi} on British Airways. A US personal item of 18 by 14 by 8 inches is 46 by 36 by 20 cm, too long for both. The ${h.a('underseat-bag', 'under-seat bag page')} covers the UK sizes in detail.</p>`;
    },
  },
});
