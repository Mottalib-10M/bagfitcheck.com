import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

type Range = { item: string; min: number; max: number; channel?: string };
/** Ryanair record, with the fields the engine does not type (excess, gate). */
const R = (h: Helpers) => h.A('ryanair') as ReturnType<Helpers['A']> & { excess: { amount: number }; gate: { oversizeOrUnpaidCabinBag: { min: number; max: number }; tenKgBagAtGate: { min: number; max: number } } };
const rg = (h: Helpers, item: string, ch: string) => (R(h).range as Range[]).find((r) => r.item === item && r.channel === ch)!;
const span = (h: Helpers, r: { min: number; max: number }) => (r.min === r.max ? h.m(r.min, 'GBP') : `${h.m(r.min, 'GBP')} to ${h.m(r.max, 'GBP')}`);
const PB = (h: Helpers) => h.P.rules.powerBankAirlines.find((p) => p.airline === 'Ryanair')!;

export default definePage({
  id: 'ryanair', group: 'uk', order: 1, demarche: true,
  tool: { kind: 'fit', props: { mode: 'carry', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:bag-ryanair' },
  related: ['easyjet', 'wizz-air', 'underseat-bag', 'hand-luggage-size', 'power-bank-on-plane'],
  sources: ['ryanair-fees', 'ryanair-terms'],
  en: {
    slug: 'ryanair-baggage', nav: 'Ryanair', card: 'The free small bag, the paid 10 kg cabin bag, every published fee range and the gate charges, read on Ryanair’s own pages.',
    title: 'Ryanair Hand Luggage Size 2026: Free Bag, Cabin Bag, Fees',
    description: 'Ryanair hand luggage size in 2026: the free 40 × 30 × 20 cm bag, the 10 kg cabin bag with Priority, published fee ranges, gate charges and the £13 excess kilo.',
    h1: 'Ryanair hand luggage size and bag fees',
    intro: 'Enter your bag’s three sides: the checker tells you whether it passes as Ryanair’s free small bag, needs the paid cabin bag, or has to go in the hold.',
    resume: (h) => {
      const x = R(h), pr = 'Priority & 2 Cabin Bags';
      return `On Ryanair, every passenger may bring one small bag of ${x.pi} free of charge, and it must fit under the seat in front. The sizers at the airport for that bag measure 42 by 20 by 30 cm, in the words of the airline’s own terms, so pack it soft rather than rigid. A second, larger cabin bag of ${x.co}, weighing up to ${x.coW}, only travels with the ${pr} add-on, or on Regular and Flexi Plus fares, which include it. When we read the fee table on ${x.read}, that add-on cost ${span(h, rg(h, pr, 'online at booking'))} per flight at booking and ${span(h, rg(h, pr, 'Post Booking/Airport'))} if bought later. Ryanair prints every amount as €/£: the same number is charged in euros from eurozone airports and in pounds from UK ones. A bag over ${x.co.split(' (')[0]} brought to the boarding gate is refused or put in the hold for ${span(h, x.gate.oversizeOrUnpaidCabinBag)}, so measuring at home is the cheapest step of the trip.`;
    },
    faqs: (h) => {
      const x = R(h);
      return [
        { q: 'Is there a weight limit for the free Ryanair small bag?', a: `Ryanair’s terms give a size for the free small bag, ${x.pi}, but no weight. The 10 kg figure applies to the larger cabin bag that comes with Priority & 2 Cabin Bags, and to the 10 kg check-in bag dropped at the desk. In practice the small bag only has to fit the sizer and slide under the seat in front of you without help.` },
        { q: 'Why does Ryanair show the same fee in euros and pounds?', a: 'Ryanair’s fee table writes every amount as €/£ followed by one number. You pay that number in the currency of the departure airport: in pounds from a UK airport, in euros from an airport in the eurozone. A range such as 12.49 to 36 therefore means £12.49 to £36 on a flight from London and €12.49 to €36 on the way back from Spain.' },
        { q: 'Can I still buy a Ryanair 10 kg check-in bag at the airport?', a: `Yes, if you have no priority. The fee table sets it at ${h.m(rg(h, '10kg Check-in Bag bought at airport bag drop (not pre-booked)', 'airport').min, 'GBP')} at the bag drop desk. The general terms, read the same day, give a range of £35.99 to £60 for the same bag bought at the desk or at the boarding gate. Expect the lower figure at the desk and keep the higher one in mind at the gate.` },
        { q: 'Does a Ryanair 23 kg hold bag have to be booked with the flight?', a: 'The terms say the 23 kg check-in bag is only available at the time of booking, while the fee table still lists a later price range for it. Read together, the safe course is to add the 23 kg bag in the same transaction as the ticket. Up to three 20 kg bags can be added afterwards, at the post-booking price shown in the table above.' },
      ];
    },
    body: (h) => {
      const x = R(h), pb = PB(h);
      const row = (label: string, item: string) => [label, span(h, rg(h, item, 'online at booking')), span(h, rg(h, item, 'Post Booking/Airport'))];
      const ten = rg(h, '10kg Check-in Bag bought at airport bag drop (not pre-booked)', 'airport');
      const twenty = rg(h, '20kg Check-in Bag bought at airport bag drop (not pre-booked)', 'airport');
      return `<h2>The free bag and the Priority bag, side by side</h2>
<p>Ryanair separates two pieces of hand luggage. The first is free on every fare: one small item up to ${x.pi} carried under the seat in front. The airline adds that its small bag sizers measure 42 cm by 20 cm by 30 cm, slightly more generous in one direction than the published size. The second piece is the larger cabin bag of ${x.co}, up to ${x.coW}, which goes in the overhead locker. It is not sold alone: it comes with the Priority &amp; 2 Cabin Bags product, and it is included on Regular and Flexi Plus tickets. Passengers who bought a Plus ticket before December 11, 2019 keep it too, according to the terms.</p>
<p>The price of Priority depends on the route and the date. That is why Ryanair publishes a minimum and a maximum rather than one figure, and why the checker on this page answers the size question first: whether the bag fits is fixed, what it costs is set by the booking engine on the day.</p>
<h2>Published price ranges, at booking and afterwards</h2>
<p>The table copies the ranges of Ryanair’s fee table, read on ${x.read}. The first column is the price when the bag is added while booking the flight; the second is the price after booking, in Manage Booking, or at the airport. Every figure is per flight, so a return trip pays twice.</p>
${h.table(['Product', 'At booking', 'Post booking or airport'], [row('Priority &amp; 2 Cabin Bags', 'Priority & 2 Cabin Bags'), row('10 kg check-in bag', '10kg Check-in Bag'), row('20 kg check-in bag', '20kg Check-in Bag'), row('23 kg check-in bag', '23kg Check-in bag')], 'Ryanair fee table; amounts shown as €/£, the same number in either currency.', ['l', 'r', 'r'])}
<p>The gap between the two columns is the real lesson. A 20 kg bag can cost ${h.m(rg(h, '20kg Check-in Bag', 'online at booking').min, 'GBP')} when it goes into the first basket and up to ${h.m(rg(h, '20kg Check-in Bag', 'Post Booking/Airport').max, 'GBP')} once the flight is paid. Unbooked bags turned up at the bag drop desk have flat prices: ${h.m(twenty.min, 'GBP')} for a 20 kg bag.</p>
<!--tool:fees|{"airline":"ryanair","only":"uk"}-->
<h2>The 10 kg check-in bag: two Ryanair pages, two prices</h2>
<p>For the 10 kg check-in bag bought at the airport without a booking, the two official pages do not say the same thing. The fee table states ${h.m(ten.min, 'GBP')} at the bag drop desk for passengers without priority. The general terms of carriage state that the same passengers can buy it at the bag drop desk or at the boarding gate for £35.99 to £60. We show both because both were on Ryanair’s site on the same day. The likely reading is that the desk price sits at the bottom of the range and the gate can charge more, but the terms do not split the range by place. If you know you need the bag, adding it online removes the question.</p>
<p>A different rule covers passengers who bring a pre-booked 10 kg check-in bag to the gate instead of dropping it: Ryanair either refuses it or puts it in the hold for ${span(h, x.gate.tenKgBagAtGate)}.</p>
<h2>Gate charges and the price of an extra kilo</h2>
<p>A cabin bag larger than ${x.co.split(' (')[0]} at the boarding gate is refused, or placed in the hold where there is room, for ${span(h, x.gate.oversizeOrUnpaidCabinBag)}. The terms add that VAT is charged on top on domestic flights. The same charge applies to a large bag carried by a passenger without Priority. For hold bags, the excess weight fee at the airport, call centre or kiosk is ${h.m(x.excess.amount, 'GBP')} per kilo above what you booked.</p>
<!--tool:mini:excess-->
<h2>Hold bags and the absolute limit</h2>
<p>Each passenger can check in up to three items of up to 20 kg each, plus one 23 kg item that must be bought with the ticket. Nothing heavier than 32 kg, and nothing larger than ${x.ck.split(' (')[0]}, is carried at all, in the cabin or the hold: that is a safety ceiling for bulky items, not a normal suitcase size. The ${h.a('hold-luggage-size', 'hold luggage page')} compares these weights with the other UK airlines.</p>
<h2>Power banks on a Ryanair flight</h2>
<p>The terms limit power banks to ${pb.maxPerPassenger} per passenger and refuse any battery or device over ${pb.maxWh} Wh in the cabin or the hold, electric wheelchair batteries aside. A power bank may charge your phone during the flight, but not during taxi, take-off and landing, and it may never be recharged on board. Ryanair also says power banks and spare lithium batteries cannot sit in a bag stored in the overhead lockers: keep them in the small bag under the seat. The ${h.a('power-bank-on-plane', 'power bank page')} sets out the general rules.</p>
<h2>Before you pay for the flight</h2>
<p>Measure the bag you actually own, wheels and handles included, and decide at the booking stage. If it is deeper than 20 cm, it is not a Ryanair cabin bag, whatever the label says. If you need the overhead locker, compare the price of Priority with a Regular fare, which bundles it. If you need the hold, add the bag in the first basket and weigh it at home, since each kilo over costs ${h.m(x.excess.amount, 'GBP')} at the desk. Ryanair’s ${h.src('ryanair-fees', 'fee table')} and ${h.src('ryanair-terms', 'terms and conditions')} are the pages to check on the day, as both can change without notice. This site is independent and is not Ryanair.</p>`;
    },
  },
});
