import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'underseat-bag', group: 'size', order: 6,
  tool: { kind: 'fit', props: { mode: 'personal', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:bag-ryanair' },
  related: ['hand-luggage-size', 'ryanair', 'wizz-air', 'easyjet', 'personal-item-size'],
  sources: ['ryanair-fees', 'easyjet-cabin', 'jet2-bags', 'ba-bags', 'wizz-cabin', 'tui-luggage'],
  en: {
    slug: 'underseat-bag', nav: 'Under-seat bag', card: 'The free small bag of each UK airline, from 40 × 30 × 15 cm to 45 × 36 × 20 cm, and whether your backpack passes.',
    title: 'Under-Seat Bag Size 2026: Free Small Bag of 6 UK Airlines',
    description: 'Under-seat bag size of Ryanair, easyJet, Jet2, British Airways, Wizz Air and TUI in 2026: the free small bag in cm and kg, and a check of your own backpack.',
    h1: 'Under-seat bag: the free small bag on UK flights',
    intro: 'Measure the backpack or handbag you plan to take as your only free bag: the checker lists the airlines whose under-seat size it meets.',
    resume: (h) => {
      const fr = h.A('ryanair'), u2 = h.A('easyjet'), ba = h.A('british-airways'), w6 = h.A('wizz-air');
      return `Every UK and European airline on this site lets you bring one small bag that fits under the seat in front, free on every fare. Four of them publish the same size, ${fr.pi}: Ryanair, Jet2, Wizz Air and TUI. easyJet is the most generous at ${u2.pi}, with a weight of up to ${u2.piW}. British Airways is the shallowest, ${ba.pi} for its hand bag, because its passengers also get a full cabin bag. Wizz Air is the only one of the four 40 by 30 by 20 airlines that prints a weight, ${w6.piW}. For travelers on the cheapest Ryanair, easyJet or Wizz Air fare this bag is the whole allowance, and the sizer at the gate is where a fee can appear. A backpack of 40 by 30 by 15 cm passes on all six; one of 40 by 30 by 20 cm passes everywhere except British Airways, where it simply becomes the cabin bag.`;
    },
    faqs: (h) => [
      { q: 'Will a 40 x 30 x 20 cm backpack fit as the free bag on easyJet?', a: `Yes. easyJet's under-seat bag can measure up to ${h.A('easyjet').pi}, larger than 40 by 30 by 20 cm on every side. The same backpack is exactly the Ryanair, Jet2, Wizz Air and TUI limit, so it is a sensible single bag for anyone who flies several of them in a year.` },
      { q: 'What happens if my Ryanair small bag is too big at the gate?', a: `If the bag does not fit the sizer, Ryanair treats it as an oversize bag: refused or, where possible, put in the hold for ${h.m(70, 'GBP')} to ${h.m(75, 'GBP')}, the range published on its fees page. Paying for Priority and a cabin bag at booking costs far less, from ${h.m(12.49, 'GBP')} on the same page.` },
      { q: 'Can I take a handbag and a backpack under the seat?', a: 'Not as two free bags. The airlines on this site allow one small under-seat item per passenger, so a handbag goes inside the backpack. Coats, duty-free bought after security and medical items are handled separately by each airline; check its page if you rely on them.' },
    ],
    body: (h) => {
      const uk = h.AIRLINES.filter((a) => a.region === 'uk' && a.personal);
      const rows = uk.map((a) => { const x = h.A(a.id); return [h.a(a.id, a.name), x.pi, a.personal?.kg ? x.piW : 'none stated']; });
      return `<h2>The six free small bags compared</h2>
<p>Virgin Atlantic is missing from the table because the archived copy of its page we could read does not give a separate under-seat size. All the others were read on the airline's baggage page; Jet2 and British Airways on archived copies, with the dates on their pages.</p>
${h.table(['Airline', 'Small under-seat bag', 'Weight'], rows, 'Sizes in cm as published, inches converted.', ['l', 'l', 'l'])}
<h2>Packing for a fare with only the small bag</h2>
<p>Forty by thirty by twenty centimetres is a box of 24 litres. It holds a weekend of clothes, a wash bag and a small laptop, and not much more. Wear the heaviest shoes and the coat. Keep liquids where they can be reached, in case your departure airport still applies the 100 ml rule and asks for a clear bag: the ${h.a('uk-liquid-rules', 'UK liquid rules')} differ from one airport to the next. Leave the outside pockets flat, because the sizer measures the bulge.</p>
<h2>Checking one bag against one airline</h2>
<p>The tool below tests a bag against the three Ryanair allowances at once, the free small bag, the paid cabin bag and the check-in bag, and gives the smallest one it qualifies as. Each airline page on this site has the same tool for that airline.</p>
<!--tool:mini:bag-ryanair-->
<h2>Why British Airways is smaller, and why it does not matter</h2>
<p>At ${h.A('british-airways').pi}, the British Airways hand bag is five centimetres shallower than the others. The reason is that it is never the only bag: every British Airways fare, Economy Basic included, also gives a cabin bag of ${h.A('british-airways').co}. A backpack that is too deep to be the hand bag simply travels as the cabin bag, and a handbag or laptop case goes under the seat. On the airlines that only include the small bag, the same depth would cost money; on British Airways it costs nothing.</p>
<h2>Soft bags, sizers and the gate</h2>
<p>The sizer at the gate is a metal frame of the published size. A soft backpack that is a little over on paper often slides in once squeezed; a hard case cannot. The risk is the extra pocket filled at the last minute with a water bottle or a jumper. Pack the night before, put the bag in a box or against a tape measure at the published size, and take out what does not fit.</p>
<h2>When the small bag is not enough</h2>
<p>Ryanair, easyJet and Wizz Air sell a larger cabin bag with priority boarding, and a hold bag in several weights. The cheapest moment to add either is when you book; after booking the price rises, and at the airport it is highest. The ${h.a('hand-luggage-size', 'hand luggage size page')} lists the paid cabin bags, and the ${h.a('hold-luggage-size', 'hold luggage page')} the checked weights.</p>`;
    },
  },
});
