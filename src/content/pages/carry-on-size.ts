import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'carry-on-size', group: 'size', order: 1,
  tool: { kind: 'fit', props: { mode: 'carry', region: 'us', unit: 'in' } },
  mini: { kind: 'mini:convert' },
  related: ['personal-item-size', 'personal-item-vs-carry-on', 'basic-economy-carry-on', 'hand-luggage-size', 'checked-bag-fees'],
  sources: ['american-carryon', 'delta-carryon', 'united-carryon', 'southwest-carryon', 'alaska-carryon', 'jetblue-fees', 'frontier-bags', 'allegiant-fees'],
  en: {
    slug: 'carry-on-size', nav: 'Carry-on size', card: 'The overhead-bin limit of each US airline in inches and centimetres, and a check of your own bag against all of them.',
    title: 'Carry-On Size 2026: Limits of Every US Airline, In and Cm',
    description: 'Carry-on luggage size for American, Delta, United, Southwest, Alaska, JetBlue, Frontier and Allegiant, read on each airline page, plus a check of your own bag.',
    h1: 'Carry-on size by airline, and does your bag fit?',
    intro: 'Type the three sides of your bag: the checker says which airlines take it in the overhead bin, and by how much a side is over where it is not.',
    resume: (h) => {
      const aa = h.A('american'), sw = h.A('southwest'), f9 = h.A('frontier'), g4 = h.A('allegiant');
      return `The usual carry-on size in the United States is ${aa.co}: that is the limit of American, Delta, United, Alaska, Hawaiian and JetBlue, wheels and handles included. Two airlines allow more. Southwest takes ${sw.co}, and Frontier ${f9.co}, though Frontier sells the carry-on separately unless your bundle includes it. Allegiant accepts ${g4.co} and always charges for it. A bag of exactly 22 by 14 by 9 inches therefore fits every US airline on this site, and a bag a single inch longer is refused by most of them. Weight is rarely the problem: the large network airlines publish no weight limit for the carry-on, while Frontier caps it at ${f9.coW}. The real trap is the fare: on the cheapest tickets of some airlines, only the personal item under the seat is included, and the carry-on costs money or is not allowed at all.`;
    },
    faqs: (h) => [
      { q: 'Is 22 x 14 x 9 inches the carry-on size for every airline?', a: `For the large US airlines, yes: American, Delta, United, Alaska, Hawaiian and JetBlue all publish 22 by 14 by 9 inches. Southwest and Frontier allow 24 by 16 by 10, Allegiant 22 by 16 by 10. UK and European airlines work in centimetres and are often smaller, down to ${h.A('ryanair').co} on Ryanair, so a US-legal bag can be too deep in Europe.` },
      { q: 'Do wheels and handles count in the carry-on size?', a: 'Yes. Every airline on this site measures the bag as it goes into the sizer, including wheels, handles and outside pockets when they are full. A suitcase sold as a 22-inch model can measure more once the wheels are counted. Measure it yourself, standing on its wheels, with the handle pushed down, and enter those three numbers in the checker above.' },
      { q: 'What happens if my carry-on is too big at the gate?', a: `It goes in the hold, and the low-cost airlines charge their highest price for it. Allegiant lists up to $75 for a bag checked at the gate, easyJet £60 for a large cabin bag found at the gate, Ryanair up to £75 for a bag over 55 by 40 by 20 cm. The same bag paid online before the flight costs less on all three.` },
      { q: 'Is there a weight limit for carry-on bags in the US?', a: `American, Delta, United, Southwest, Alaska and JetBlue publish no weight limit for the carry-on on domestic flights; you must be able to lift it into the bin yourself. Frontier is the exception, at ${h.A('frontier').coW} for both the personal item and the carry-on. UK and European airlines usually cap the cabin bag at 10 kg or 15 kg.` },
    ],
    body: (h) => {
      const us = h.AIRLINES.filter((a) => a.region === 'us');
      const rows = us.map((a) => { const x = h.A(a.id); return [h.a(a.id, a.name), x.co, x.coW, a.carryIncluded === 'all' ? 'included on every fare' : a.carryIncluded === 'not-basic' ? 'not on Basic Economy' : 'paid extra or in a bundle']; });
      return `<h2>Carry-on limits of the US airlines</h2>
<p>The table gives the largest carry-on each airline accepts in the overhead bin, as written on its own carry-on page, with the reading date on each airline page of this site. Where an airline publishes inches only, the centimetres are our conversion.</p>
${h.table(['Airline', 'Carry-on size', 'Weight', 'On the cheapest fare'], rows, 'Limits read on each airline page; see the airline pages for the date and the address.', ['l', 'l', 'l', 'l'])}
<h2>How to measure a bag the way the sizer does</h2>
<p>Stand the bag on its wheels and measure from the floor to the top of the handle housing: that is the height, usually the 22-inch side. Then measure the widest point from side to side, including side handles, and the depth from the front pocket to the back, including the wheels if they stick out. Fill the bag as you will on the day, because a soft bag swells by an inch or two when packed. The checker sorts your three numbers from longest to shortest before comparing them, so the order you type them in does not matter. A centimetre bag works too: switch the units and type what the label or your tape measure says.</p>
<!--tool:mini:volume-->
<h2>When the bin is not the problem: the fare is</h2>
<p>On the large network airlines the size is the same on every fare, but not the right to use the bin. ${h.a('united', 'United')} keeps its Basic Economy passengers to a personal item on most domestic routes, and a carry-on brought to the airport must be checked for a fee. ${h.a('american', 'American')} and ${h.a('delta', 'Delta')} include a carry-on on their basic fares. The low-cost airlines go further: ${h.a('frontier', 'Frontier')} and ${h.a('allegiant', 'Allegiant')} sell the carry-on as an extra, priced per flight, and a bag that turns up unpaid at the gate pays the highest price on their list. The ${h.a('basic-economy-carry-on', 'basic economy page')} compares the rules fare by fare.</p>
<h2>Flying to Europe or within the UK</h2>
<p>European airlines publish their sizes in centimetres and several of them sit below the US standard. A 22 by 14 by 9 inch bag is 56 by 36 by 23 cm: too deep for Ryanair's paid cabin bag of 55 by 40 by 20 cm and right at the limit of Virgin Atlantic. Before a trip that combines a US airline and a European one, check the bag against both with the checker set to all airlines, or read the ${h.a('hand-luggage-size', 'hand luggage sizes of the UK airlines')}.</p>
<h2>Small regional jets</h2>
<p>On small regional aircraft the bins are too shallow for a standard carry-on. American and Delta say so on their carry-on pages: on these flights the bag is tagged at the door and handed back on arrival, free of charge. It is not a size problem and it costs nothing; keep medicines, keys and power banks in the personal item in case the carry-on goes in the hold.</p>`;
    },
  },
});
