import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'hand-luggage-size', group: 'size', order: 5,
  tool: { kind: 'fit', props: { mode: 'carry', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:convert' },
  related: ['underseat-bag', 'hold-luggage-size', 'ryanair', 'easyjet', 'uk-liquid-rules'],
  sources: ['ryanair-fees', 'easyjet-cabin', 'jet2-bags', 'ba-bags', 'wizz-cabin', 'tui-luggage', 'va-hand'],
  en: {
    slug: 'hand-luggage-size', nav: 'Hand luggage size', card: 'Cabin bag size and weight of Ryanair, easyJet, Jet2, British Airways, Wizz Air, TUI and Virgin Atlantic, with a check of your case.',
    title: 'Hand Luggage Size 2026: Cabin Bag Limits of 7 UK Airlines',
    description: 'Hand luggage size and weight for Ryanair, easyJet, Jet2, British Airways, Wizz Air, TUI and Virgin Atlantic in cm and kg, and which fares include the cabin bag.',
    h1: 'Hand luggage size: which UK airlines take your cabin bag?',
    intro: 'Enter your cabin case in centimetres and kilos: the checker lists the UK and European airlines that accept it in the overhead locker, and the side that is too long elsewhere.',
    resume: (h) => {
      const fr = h.A('ryanair'), u2 = h.A('easyjet'), ls = h.A('jet2'), ba = h.A('british-airways'), w6 = h.A('wizz-air');
      return `There is no single UK hand luggage size. The largest overhead-locker bag, ${ba.co}, is the limit of British Airways, Jet2 and easyJet, while Ryanair and TUI stop at ${fr.co} and Wizz Air at ${w6.co}. The weight goes from ${ls.coW} on Jet2, Ryanair and TUI to ${u2.coW} on easyJet, and British Airways printed no kilo limit on the page we read, only that you must lift the bag yourself. The fare decides the rest: Jet2, British Airways and TUI include the large cabin bag on every ticket, while Ryanair, easyJet and Wizz Air include only a small under-seat bag and sell the locker bag as an extra. So a 55 by 40 by 20 cm case is the safest size to buy: it fits the locker of six of the seven airlines on this page, Wizz Air included, provided the fare pays for it. The exception is Virgin Atlantic, whose last limit we could read is only 36 cm wide.`;
    },
    faqs: (h) => [
      { q: 'Is 55 x 40 x 20 cm hand luggage accepted by every UK airline?', a: `By six of the seven airlines of this site, as a cabin bag in the locker: it matches Ryanair and TUI exactly and sits inside the limits of easyJet, Jet2, British Airways and Wizz Air. Virgin Atlantic last published ${h.A('virgin-atlantic').co}, too narrow. On Ryanair, easyJet and Wizz Air it is a paid bag unless your fare includes it. Keep it under ${h.A('ryanair').coW} to pass on all of them.` },
      { q: 'Do UK airlines weigh hand luggage?', a: 'Several publish a weight and can check it at the gate: 10 kg for the cabin bag on Ryanair, Jet2, TUI and Wizz Air, 15 kg on easyJet. British Airways only asks that you can lift the bag into the locker on your own. Weighing at the gate is not systematic, but a bag found heavier than the limit can be sent to the hold for a fee.' },
      { q: 'Does a 56 x 45 x 25 cm case count as hand luggage?', a: `It is the maximum cabin bag on easyJet, Jet2 and British Airways, measured with wheels and handles. It is too large for Ryanair and TUI, at ${h.A('ryanair').co}, and for Wizz Air. A case sold as cabin size in a shop is often this format, so check which airlines you fly before buying.` },
    ],
    body: (h) => {
      const uk = h.AIRLINES.filter((a) => a.region === 'uk');
      const rows = uk.map((a) => { const x = h.A(a.id); return [h.a(a.id, a.name), x.co, a.carry?.kg ? x.coW : 'none stated', a.carryIncluded === 'all' ? 'every fare' : 'paid add-on or bundle']; });
      return `<h2>Cabin bag limits of the UK airlines</h2>
<p>Every figure below was read on the airline's own baggage page, in centimetres and kilograms; the inches are our conversion. Jet2 and British Airways were read on archived copies of their pages, and the Virgin Atlantic figures come from an archived copy of ${h.date('2025-06-28')} because its current page could not be read; the airline pages of this site give each date.</p>
${h.table(['Airline', 'Cabin bag', 'Weight', 'Included on'], rows, 'Read on each airline page; dates on the airline pages.', ['l', 'l', 'l', 'l'])}
<h2>Paid locker bags: the price moves with the timing</h2>
<p>On ${h.a('ryanair', 'Ryanair')} the cabin bag comes with Priority, sold as an add-on whose published range runs from ${h.m(12.49, 'GBP')} at booking to ${h.m(45.5, 'GBP')} after booking or at the airport. A case that turns up at the gate unpaid, or over the size, goes in the hold for ${h.m(70, 'GBP')} to ${h.m(75, 'GBP')}. ${h.a('easyjet', 'easyJet')} charges ${h.m(60, 'GBP')} at the gate for a large cabin bag that was not booked. Adding the bag when you book is always the cheaper moment.</p>
<h2>Measuring a hard case in centimetres</h2>
<p>Airlines measure the case as it stands, with the wheels and the retracted handle. Many hard cases add two or three centimetres of wheel to the height printed on the label, and an expandable zip adds depth once opened. Measure it closed, standing up, from the floor to the top of the handle housing. If the label is in inches, the converter below gives the centimetres the airline will see.</p>
<!--tool:mini:convert-->
<h2>Which fares include the large cabin bag</h2>
<p>Jet2 and TUI include it on every ticket for passengers aged two and over, and British Airways on every fare including Economy Basic. On the three low-cost airlines it comes with priority boarding or a bundle.</p>
<h2>Liquids and power banks in the cabin bag</h2>
<p>Size is not the only rule at the airport. The liquid limit depends on the airport you leave from, since some UK airports have moved to 2 litres per container and others keep 100 ml: the ${h.a('uk-liquid-rules', 'UK liquid rules page')} lists them. Power banks must travel in the cabin, never in the hold, and some airlines limit how many you carry, as the ${h.a('power-bank-on-plane', 'power bank page')} details.</p>`;
    },
  },
});
