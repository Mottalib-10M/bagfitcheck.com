import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Wizz Air record, with the excess field the engine does not type. */
const W = (h: Helpers) => h.A('wizz-air') as ReturnType<Helpers['A']> & { excess: { amount: number } };
const PB = (h: Helpers) => h.P.rules.powerBankAirlines.find((p) => p.airline === 'Wizz Air')!;
const short = (s: string) => s.split(' (')[0];
/** Hold bag weights sold by Wizz Air (help centre, checked-in baggage). */
const HOLD_KG = [10, 20, 26, 32];

export default definePage({
  id: 'wizz-air', group: 'uk', order: 5, demarche: true,
  tool: { kind: 'fit', props: { mode: 'carry', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:bag-wizz-air' },
  related: ['ryanair', 'easyjet', 'underseat-bag', 'personal-item-vs-carry-on', 'power-bank-on-plane'],
  sources: ['wizz-allowance', 'wizz-cabin', 'wizz-checked', 'wizz-restricted'],
  en: {
    slug: 'wizz-air-baggage', nav: 'Wizz Air', card: 'The free 40 × 30 × 20 cm bag, the trolley bag that only comes with WIZZ Priority, hold bags of 10 to 32 kg and the 13 EUR per kilo surcharge.',
    title: 'Wizz Air Baggage 2026: Free Bag Size, Priority, Hold Bags',
    description: 'Wizz Air baggage in 2026: the free 40 × 30 × 20 cm bag up to 10 kg, the 55 × 40 × 23 cm trolley with WIZZ Priority, hold bags of 10 to 32 kg, 13 EUR a kilo.',
    h1: 'Wizz Air baggage: free bag, Priority trolley and hold',
    intro: 'Type your bag’s height, width and depth: the checker tells you whether it is a free Wizz Air carry-on bag, needs WIZZ Priority, or belongs in the hold.',
    resume: (h) => {
      const x = W(h);
      return `On Wizz Air, the bag included in every ticket is small: one carry-on bag of ${x.pi}, weighing up to ${x.piW}, which has to fit under the seat in front of you. Anything bigger in the cabin means buying WIZZ Priority during booking, the only way to get the trolley bag of ${x.co}, also limited to ${x.coW}, into the overhead locker. Wizz Air sells the trolley only as part of Priority; it cannot be added on its own. Hold bags come in four weights, ${HOLD_KG.map((k) => `${k} kg`).join(', ')}, with the WIZZ Go and WIZZ Plus bundles including checked baggage. Wizz Air states its prices in euros on its help pages, and the one figure written there in text is the airport surcharge for an overweight hold bag: ${h.m(x.excess.amount, 'EUR')} per kilo. Bag prices themselves vary by flight and appear in the booking. We read the Wizz Air help centre on ${x.read}.`;
    },
    faqs: (h) => {
      const x = W(h);
      return [
        { q: 'Is the free Wizz Air bag 40 x 30 x 20 cm or larger?', a: `The Wizz Air help centre, read on ${x.read}, still gives ${short(x.pi)} and ${short(x.piW)} for the free carry-on bag. Some text in the booking pages of the same site mentions a larger size, but the help centre is where Wizz Air publishes the allowance. Pack to the smaller size and you are safe either way.` },
        { q: 'Can I buy only the trolley bag without WIZZ Priority?', a: `No. Wizz Air sells the trolley bag of ${short(x.co)} exclusively as part of WIZZ Priority, and only during the booking process according to its cabin baggage page. If the free under-seat bag is not enough and you do not want Priority, the alternative is a hold bag, the lightest of which is 10 kg, limited to one per passenger.` },
        { q: 'How many power banks can I take on Wizz Air?', a: `One. Wizz Air allows each person up to 20 spare batteries but at most one power bank among them, and no power bank above ${PB(h).maxWh} Wh. Its restricted items page adds that power banks must not be used during any phase of the flight, so it stays switched off in your bag from boarding to arrival.` },
      ];
    },
    body: (h) => {
      const x = W(h), pb = PB(h);
      return `<h2>Free, Priority or hold: the three Wizz Air options</h2>
${h.table(['Option', 'Size', 'Weight', 'How you get it'], [['Carry-on bag (under the seat)', x.pi, x.piW, 'every ticket, free'], ['Trolley bag (overhead locker)', x.co, x.coW, 'WIZZ Priority, bought during booking'], ['Checked-in bag', x.ck, HOLD_KG.map((k) => `${k} kg`).join(', '), 'paid per flight, or in WIZZ Go and WIZZ Plus']], 'From the Wizz Air help centre pages on cabin and checked-in baggage.', ['l', 'l', 'l', 'l'])}
<p>Two features set Wizz Air apart. First, the free bag has a weight limit, ${x.piW}, as well as a size: a laptop bag full of chargers can go over before it fills up. Second, the larger cabin bag is 23 cm deep, three centimetres more than the ${h.a('ryanair', 'Ryanair')} equivalent, so a case accepted by Wizz Air on the outbound flight can be refused by another low-cost airline on the way back.</p>
<p>The help centre gives ${short(x.pi)} for the free bag. Some strings in Wizz Air’s booking pages mention 42 × 32 × 25 cm, a larger size that the help centre does not show; this site uses the help centre figure, and so should your packing.</p>
<h2>What it costs, in euros</h2>
<p>Wizz Air’s help pages state amounts in euros; prices in pounds appear only once you are in the booking. Its list of services and fees is drawn in the browser, so no bag price could be read from it in text, and this site does not publish a Wizz Air bag price it has not seen. Two things are written plainly. Checked-in bags bought at the airport cost more than the same bags added in advance: the help centre says that higher baggage fees apply to extra pieces bought there. And the checked-in baggage page warns travellers to weigh their bags before they arrive, as a surcharge of ${h.m(x.excess.amount, 'EUR')} per kilo is due at the airport for a bag weighing between 10 and 20 kg or between 20 and 32 kg.</p>
<!--tool:mini:excess-->
<p>The Wizz Air cabin page says only that exceeding the dimensions leads to extra fees; it gives no amount for a cabin bag that turns out too big at the gate. Treat any doubt as a reason to measure at home with the bag packed.</p>
<h2>Checked-in bags: four weights, one size ceiling</h2>
<p>Hold bags are sold at ${HOLD_KG.map((k) => `${k} kg`).join(', ')}. A passenger can check up to six, but no more than one of the 10 kg kind. Each must stay within ${x.ck}, a ceiling so large that only bulky items come near it. The surcharge per kilo makes the choice of weight matter: at ${h.m(x.excess.amount, 'EUR')} a kilo, two kilos over already cost ${h.m(x.excess.amount * 2, 'EUR')} at the desk, so if your scale says more than the weight you plan to book, book the next weight up. The ${h.a('hold-luggage-size', 'hold luggage page')} compares the weight steps of the UK airlines.</p>
<h2>Power banks: one only, never in use</h2>
<p>Wizz Air is the strictest UK-flying airline on power banks among the pages we read. Its restricted items page allows each person up to 20 spare batteries, but no more than ${pb.maxPerPassenger} power bank among them, and forbids any power bank above ${pb.maxWh} Wh. Power banks must not be used during any phase of the flight. A traveller with two power banks, accepted on ${h.a('easyjet', 'easyJet')} or ${h.a('british-airways', 'British Airways')}, has to leave one at home. The ${h.a('power-bank-on-plane', 'power bank page')} compares the rules.</p>
<h2>Before you click pay</h2>
<p>Choose between Priority and a hold bag at the booking stage, since the trolley cannot be added later on its own. Weigh the free bag as well as measuring it, because ${short(x.piW)} applies under the seat too. Check the sum in pounds or euros on the final screen: the booking shows it, the help pages do not. The pages that decide are the Wizz Air ${h.src('wizz-cabin', 'cabin baggage')}, ${h.src('wizz-checked', 'checked-in baggage')} and ${h.src('wizz-restricted', 'restricted items')} pages. This site is independent and is not Wizz Air.</p>`;
    },
  },
});
