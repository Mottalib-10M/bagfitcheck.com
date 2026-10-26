import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

type Range = { item: string; min: number; max: number; channel?: string };
/** easyJet record, with the fields the engine does not type (excess, gate). */
const E = (h: Helpers) => h.A('easyjet') as ReturnType<Helpers['A']> & { excess: { amount: number }; gate: { amount: number } };
const item = (h: Helpers, start: string) => (E(h).range as Range[]).find((r) => r.item.startsWith(start))!;
const PB = (h: Helpers) => h.P.rules.powerBankAirlines.find((p) => p.airline === 'easyJet')!;
const cm = (s: string) => s.split(' (')[0];

export default definePage({
  id: 'easyjet', group: 'uk', order: 2, demarche: true,
  tool: { kind: 'fit', props: { mode: 'carry', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:bag-easyjet' },
  related: ['ryanair', 'jet2', 'underseat-bag', 'hold-luggage-size', 'uk-liquid-rules'],
  sources: ['easyjet-cabin', 'easyjet-hold', 'easyjet-fees', 'easyjet-dg'],
  en: {
    slug: 'easyjet-baggage', nav: 'easyJet', card: 'The free under-seat bag, the paid large cabin bag, hold weights from 15 to 32 kg and the £60 airport charges, from easyJet’s pages.',
    title: 'easyJet Hand Luggage Size 2026: Under-Seat, Large Bag, Hold',
    description: 'easyJet hand luggage size in 2026: the free 45 × 36 × 20 cm under-seat bag, the 56 × 45 × 25 cm large cabin bag, hold bags of 15 to 32 kg and airport fees.',
    h1: 'easyJet hand luggage size, large cabin bag and hold bags',
    intro: 'Type the height, width and depth of your bag: the checker shows whether easyJet takes it free under the seat, as a paid large cabin bag, or only in the hold.',
    resume: (h) => {
      const x = E(h);
      return `easyJet lets everyone take one small cabin bag of ${x.pi} on board for free, handles and wheels included, and that bag can weigh as much as ${x.piW}, more than the 10 kg Wizz Air sets for its free bag. It must stay under the seat in front of you. The overhead locker is reserved for the large cabin bag, ${x.co} and up to ${x.coW}, which you add as a paid extra (it comes with Speedy Boarding), which is free for easyJet Plus members and which is part of the Inclusive Plus fare, locker space permitting. easyJet does not publish a fixed price for it: the fee depends on demand, route, date and when you book. The one fixed figure is the penalty, ${h.m(x.gate.amount, 'GBP')} for a large cabin bag found at the boarding gate. Hold bags are sold by weight, from 15 kg to ${x.ckW.split(' (')[0]}, and an unbooked bag of up to 23 kg costs ${h.m(item(h, 'Hold bag at bag drop').min, 'GBP')} at the bag drop desk. These rules were read on easyJet’s pages on ${x.read}.`;
    },
    faqs: (h) => {
      const x = E(h);
      return [
        { q: 'Can an easyJet under-seat bag really weigh 15 kg?', a: `Yes. easyJet’s cabin bag page sets the free small bag at ${cm(x.pi)} and up to 15 kg, adding only that you must be able to lift and carry it yourself. The size is the strict part: the bag has to go under the seat in front, so a rigid case that is 21 cm deep will be refused even if it is light.` },
        { q: 'How much is the easyJet large cabin bag?', a: `easyJet publishes no fixed price. Its fees page says charges vary with demand, route, flight date and time of booking, and the exact price appears when you buy. What is fixed is the gate charge: ${h.m(x.gate.amount, 'GBP')} if a large cabin bag that was not paid for reaches the boarding gate. Adding it online is always cheaper, in easyJet’s own words.` },
        { q: 'Can I share hold weight between easyJet bags on one booking?', a: `Yes. Weight can be pooled across the hold bags of one booking, up to three bags per passenger, as long as no single bag goes over ${x.ckW.split(' (')[0]}. Two people with a 23 kg allowance each can split 46 kg unevenly between two suitcases. A bag heavier than its share at the desk pays ${h.m(x.excess.amount, 'GBP')} per extra kilo.` },
      ];
    },
    body: (h) => {
      const x = E(h), pb = PB(h);
      const weights = [15, 23, 26, 29, 32];
      return `<h2>What travels free, and where it goes</h2>
<p>An easyJet ticket on its own includes one bag: the small under-seat bag. Its limit is ${x.pi}, and it is the only easyJet bag with a fixed size that costs nothing. Because easyJet sets its weight cap at ${x.piW}, a dense backpack full of books passes where another airline would object; the constraint is the space under the seat, not the scale. Measure the depth with the bag packed, since a soft backpack bulges past 20 cm faster than it looks.</p>
<p>The overhead locker is a separate, paid space. The large cabin bag, a trolley case or a larger rucksack of ${x.co}, weighing up to ${x.coW}, is sold as an add-on that comes with Speedy Boarding. easyJet Plus members get it free, and the Inclusive Plus fare includes it subject to locker space. Both bags together are therefore possible: a small bag under the seat plus a large one above.</p>
${h.table(['Bag', 'Size', 'Weight', 'How you get it'], [['Small under-seat bag', x.pi, x.piW, 'every fare, free'], ['Large cabin bag', x.co, x.coW, 'paid add-on, easyJet Plus, Inclusive Plus'], ['Hold bag', `${h.num(x.checked!.linearCm!)} cm in total (length + width + height)`, `15 to ${cm(x.ckW)}`, 'bought by weight']], 'Limits read on easyJet’s cabin bag, hold luggage and fees pages.', ['l', 'l', 'l', 'l'])}
<h2>Prices: what easyJet publishes and what it does not</h2>
<p>easyJet does not print a table of bag prices. Its fees page says that cabin and hold bag charges are per item and per flight, and vary with demand, route, flight date and the time of booking; the exact price shows in the basket. Three figures are published, all of them airport prices for people who did not plan ahead: ${h.m(x.gate.amount, 'GBP')} for a large cabin bag at the boarding gate, ${h.m(item(h, 'Hold bag at bag drop').min, 'GBP')} for an unbooked hold bag of up to 23 kg at the bag drop desk, and ${h.m(x.excess.amount, 'GBP')} per kilo for a hold bag heavier than the weight you booked.</p>
<!--tool:fees|{"airline":"easyjet","only":"uk"}-->
<p>Before the flight, extra weight on a booked hold bag is sold online in 3 kg steps, at up to £15 per 3 kg, up to the 32 kg ceiling per item. Compared with ${h.m(x.excess.amount, 'GBP')} a kilo at the desk, 3 kg online costs at most £15 against ${h.m(x.excess.amount * 3, 'GBP')} at the airport.</p>
<!--tool:mini:excess-->
<h2>Hold bags sold by weight, not by piece</h2>
<p>easyJet hold bags come in five weights: ${weights.map((w) => `${w} kg`).join(', ')}. Each passenger can book up to three, and the length, width and height of each bag must add up to less than ${h.num(x.checked!.linearCm!)} cm, which leaves room for any normal suitcase. The 32 kg cap is absolute: a bag that weighs more is not accepted, whatever you pay, so a heavy load has to be split. Weight is pooled within the booking, which helps families: one heavy case and one light one balance out as long as the total stays under what was bought. The ${h.a('hold-luggage-size', 'hold luggage comparison')} puts these weights next to Ryanair, Jet2 and the full-service airlines.</p>
<h2>Power banks and batteries on easyJet</h2>
<p>easyJet’s dangerous goods page accepts power banks of up to ${pb.maxWh} Wh, with a maximum of ${pb.maxPerPassenger} per customer, in cabin baggage only. The rule that surprises passengers is the use: power banks are prohibited from use on easyJet aircraft and must not be used to charge other devices, so the phone has to be charged before boarding. The page shows no date from which that ban applies. Keep power banks in the under-seat bag, which never leaves you.</p>
<h2>At the airport: liquids and the gate</h2>
<p>easyJet flies from airports with different liquid rules. Some UK airports now take containers up to 2 litres, others still stop at 100 ml, and the return airport abroad may be stricter than the outbound one; the ${h.a('uk-liquid-rules', 'UK liquid rules page')} lists them airport by airport. At the gate, staff check the small bag against the sizer. A bag too big to be the free item is treated as a large cabin bag, and if you have not paid for one, it costs ${h.m(x.gate.amount, 'GBP')} there.</p>
<h2>Booking checklist</h2>
<p>Decide on bags in the first basket: easyJet’s own pages say adding a large cabin bag online is always cheaper than at the gate. Choose the hold weight from what the bag weighs on your scale, rounded up to the next easyJet step, not from habit. If you fly often with a cabin bag, compare the price of easyJet Plus membership with the per-flight add-on. Check the ${h.src('easyjet-cabin', 'cabin bag page')} and the ${h.src('easyjet-fees', 'fees page')} before you fly, as prices and rules can change. This site is independent and is not easyJet.</p>`;
    },
  },
});
