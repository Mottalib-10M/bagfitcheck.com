import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'personal-item-vs-carry-on', group: 'size', order: 3,
  tool: { kind: 'mini:volume' },
  mini: { kind: 'mini:bag-frontier' },
  related: ['personal-item-size', 'carry-on-size', 'basic-economy-carry-on', 'allegiant', 'frontier'],
  sources: ['american-carryon', 'united-carryon', 'frontier-bags', 'allegiant-fees', 'jetblue-terms', 'ryanair-fees', 'easyjet-cabin'],
  en: {
    slug: 'personal-item-vs-carry-on', nav: 'Personal item vs carry-on', card: 'What separates the free under-seat bag from the overhead-bin bag, airline by airline, in size, volume and price.',
    title: 'Personal Item vs Carry-On 2026: Size, Volume and Who Pays',
    description: 'Personal item vs carry-on: the size and volume gap on each airline, which fares include the bin bag, and when a backpack alone is enough for a trip in 2026.',
    h1: 'Personal item vs carry-on: the difference that costs money',
    intro: 'Pick an airline: the calculator gives the volume of its under-seat bag and of its overhead-bin bag, and whether the larger one is included on its cheapest fare.',
    resume: (h) => {
      const aa = h.A('american'), f9 = h.A('frontier'), fr = h.A('ryanair');
      return `The personal item goes under the seat in front of you; the carry-on goes in the overhead bin. On American the first is ${aa.pi} and the second ${aa.co}, so the carry-on offers about 40 percent more space. Where the line matters is the price. The large network airlines include both bags on almost every fare, United excepted on Basic Economy. The low-cost airlines include only the personal item: Frontier and Allegiant sell the carry-on per flight, and Ryanair includes ${fr.pi} for free while its ${fr.co} cabin bag is a paid extra. If a trip of three or four nights fits in a backpack, the personal item alone avoids every bag fee. Frontier publishes a ${f9.piW} cap on both bags, so weight is not a way around the size.`;
    },
    faqs: (h) => [
      { q: 'What is the difference between a personal item and a carry-on?', a: 'Where it is stowed and how big it may be. The personal item must fit under the seat in front of you, around 18 by 14 by 8 inches. The carry-on goes in the overhead bin, around 22 by 14 by 9 inches. Most airlines let you bring one of each, but some charge for the carry-on.' },
      { q: 'Can my personal item go in the overhead bin?', a: 'Usually yes if there is room once everyone has boarded, but the crew can ask you to move it under the seat to free space for carry-ons. On a full flight, plan for the under-seat space. On regional jets with small bins, the personal item is the only bag that is sure to stay with you.' },
      { q: 'Is a carry-on worth paying for on a low-cost airline?', a: `It depends on the trip and on when you buy it. Allegiant lists ${h.m(10)} to ${h.m(75)} for a carry-on depending on route and timing, the higher end at the airport. For a weekend, a well-packed personal item is often enough. For a week, compare the carry-on with a checked bag on the same booking, as the checked bag is sometimes priced lower.` },
      { q: 'Do laptop bags count as personal items?', a: 'Yes. A laptop bag, a purse, a camera bag and a small backpack are all personal items, and you may bring one. If you need both a laptop bag and a backpack, put the laptop in the backpack or use your carry-on allowance for the second bag, where your fare includes one.' },
    ],
    body: (h) => {
      const both = h.AIRLINES.filter((a) => a.personal?.in || a.personal?.cm).filter((a) => a.carry);
      const rows = both.map((a) => { const x = h.A(a.id); return [h.a(a.id, a.name), x.pi, x.co, a.carryIncluded === 'all' ? 'both included' : a.carryIncluded === 'not-basic' ? 'carry-on not on basic' : 'carry-on paid or in a bundle']; });
      return `<h2>The two allowances side by side</h2>
<p>The table lists the airlines that publish both sizes. Where an airline writes inches, the centimetres are our conversion, and the other way round for the UK airlines.</p>
${h.table(['Airline', 'Personal item', 'Carry-on', 'Cheapest fare'], rows, 'Sizes read on each airline page.', ['l', 'l', 'l', 'l'])}
<h2>Three ways airlines draw the line</h2>
<p>The first model gives both bags to everyone: ${h.a('american', 'American')}, ${h.a('delta', 'Delta')}, ${h.a('southwest', 'Southwest')}, ${h.a('alaska', 'Alaska')}, ${h.a('hawaiian', 'Hawaiian')} and ${h.a('jetblue', 'JetBlue')} work this way on domestic flights, and so do ${h.a('jet2', 'Jet2')}, ${h.a('british-airways', 'British Airways')} and ${h.a('tui', 'TUI')} in the UK. The second model removes the overhead bin from one fare only: ${h.a('united', 'United')} Basic Economy on most domestic routes. The third sells the carry-on as an extra on every fare except bundles: ${h.a('frontier', 'Frontier')}, ${h.a('allegiant', 'Allegiant')}, ${h.a('ryanair', 'Ryanair')}, ${h.a('easyjet', 'easyJet')} and ${h.a('wizz-air', 'Wizz Air')}. The bag you own matters less than which model your airline follows.</p>
<h2>Packing a trip into the smaller bag</h2>
<p>A personal item of 18 by 14 by 8 inches is about 33 liters of box, less once a soft bag curves at the corners. Clothes rolled rather than folded, shoes worn rather than packed, and a toilet bag of travel sizes leave room for three or four days. The weak point is the depth: eight inches is the first side to fail when a backpack is overfilled, and it is the side the sizer is strictest on. Leave the front pocket half empty and carry the jacket.</p>
<h2>The Frontier example</h2>
<p>Frontier publishes ${h.A('frontier').pi} for the personal item and ${h.A('frontier').co} for the carry-on, with the same weight cap on both. The tool below checks a bag against both Frontier sizes at once and says which one it qualifies as; Frontier's own page sets the price of the carry-on when you book.</p>`;
    },
  },
});
