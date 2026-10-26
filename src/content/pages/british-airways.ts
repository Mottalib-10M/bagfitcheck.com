import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const B = (h: Helpers) => h.A('british-airways');
const PB = (h: Helpers) => h.P.rules.powerBankAirlines.find((p) => p.airline === 'British Airways')!;
const short = (s: string) => s.split(' (')[0];
/** Overweight bag charge, per bag and one-way journey, on the archived baggage page (uk.json, ba-bags). */
const HEAVY = { GBP: 65, EUR: 75, USD: 100 };

export default definePage({
  id: 'british-airways', group: 'uk', order: 4, demarche: true,
  tool: { kind: 'fit', props: { mode: 'carry', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:bag-british-airways' },
  related: ['virgin-atlantic', 'hand-luggage-size', 'hold-luggage-size', 'uk-liquid-rules', 'power-bank-on-plane'],
  sources: ['ba-bags', 'ba-restrictions'],
  en: {
    slug: 'british-airways-baggage', nav: 'British Airways', card: 'A hand bag and a cabin bag on every British Airways fare, Basic included, hold bags of 23 or 32 kg and the heavy bag charge.',
    title: 'BA Hand Luggage 2026: British Airways Sizes, Hold, Basic',
    description: 'British Airways hand luggage 2026: a 40 × 30 × 15 cm hand bag plus a 56 × 45 × 25 cm cabin bag on every fare, Basic too, and 23 or 32 kg hold bags by cabin.',
    h1: 'British Airways hand luggage and hold allowance',
    intro: 'Give the checker your bag’s measurements: it compares them with the British Airways hand bag, cabin bag and hold limits at once.',
    resume: (h) => {
      const x = B(h);
      return `British Airways gives every passenger two pieces of hand luggage, whatever the ticket, including the cheapest Economy Basic fare sold as hand baggage only. The first is a hand bag of up to ${x.pi}, which must fit under the seat in front. The second is a cabin bag of up to ${x.co}, wheels and handles included, which you must be able to lift into the overhead locker without help. The capture we read gives no kilo limit for either. In the hold, Economy and Premium Economy passengers get bags of up to ${x.ckW} each, up to ${x.ck}, while Business and First allow 32 kg; Economy Basic includes no hold bag at all. No bag over 32 kg is accepted, and a bag between 23 and 32 kg costs ${h.m(HEAVY.GBP, 'GBP')} per one-way journey. We read these rules in an archived copy of the British Airways baggage page captured on ${x.read}, as the live site did not answer us.`;
    },
    faqs: (h) => {
      const x = B(h);
      return [
        { q: 'Does British Airways Economy Basic include a cabin bag?', a: `Yes. British Airways includes both the hand bag of ${short(x.pi)} and the cabin bag of ${short(x.co)} on every fare, Economy Basic included. What Economy Basic leaves out is the hold bag: you can add one, at a price that depends on the destination and is shown in the booking or in Manage My Booking.` },
        { q: 'Is there a weight limit for British Airways cabin bags?', a: 'The archived copy of the baggage page we read, captured on September 30, 2026, states sizes for the hand bag and the cabin bag but no weight in kilos. Its only condition is that you can lift the cabin bag into the overhead locker unassisted. If the live page shows a weight when you book, that figure applies.' },
        { q: 'What does British Airways charge for a heavy hold bag?', a: `A bag above the ${short(x.ckW)} Economy allowance but no heavier than 32 kg is charged ${h.m(HEAVY.GBP, 'GBP')}, or ${h.m(HEAVY.EUR, 'EUR')}, or ${h.m(HEAVY.USD, 'USD')}, per bag and per one-way journey, on the page we read. Above 32 kg British Airways does not accept the bag at all, so the only option is to split the load into a second bag.` },
        { q: 'Can I pack a power bank in my British Airways hold bag?', a: 'No. The British Airways restrictions page carried a notice titled Update to our power banks policy, without a start date, saying that power banks and spare batteries are forbidden in checked baggage. Carry up to two in the cabin, each no larger than 100 Wh, and keep them in the seat pocket or in a bag under the seat in front.' },
      ];
    },
    body: (h) => {
      const x = B(h), pb = PB(h);
      return `<h2>Two pieces in the cabin on every ticket</h2>
<p>British Airways is a full-service airline, and its hand luggage allowance shows it: the same two pieces on every fare, with no priority add-on to buy. The hand bag may measure up to ${x.pi} and travels under the seat in front. The cabin bag may measure up to ${x.co}, including wheels and handles, and goes in the overhead locker. The page we read sets no weight in kilos for either and asks only that you can lift the cabin bag into the locker unassisted.</p>
<p>One detail on the same page: a calculator section shows a variant of the hand bag as a handbag or backpack of 45 × 36 × 20 cm, without naming the route or cabin it applies to, while the cabin-by-cabin section gives ${short(x.pi)}. The checker on this page uses the smaller figure, which is the safe one. Note that the British Airways hand bag is 15 cm deep, shallower than the 20 cm under-seat bag of most low-cost airlines, so a backpack bought for ${h.a('ryanair', 'Ryanair')} can be too thick here.</p>
<h2>Hold allowance by cabin</h2>
${h.table(['Cabin or fare', 'Hold bag weight'], [['Economy Basic', 'no hold bag included'], ['Economy', `${x.ckW} per bag`], ['Premium Economy', `${x.ckW} per bag`], ['Business and First', `${h.weight({ kg: 32 } as never)} per bag`]], 'Weights from the archived copy of the British Airways baggage page; the number of bags per cabin depends on the ticket.', ['l', 'l'])}
<p>Every hold bag must stay within ${x.ck}. Top-tier members of the airline’s loyalty scheme also get the 32 kg weight. The page gives 190 × 75 × 65 cm as the largest oversize bag it carries in the hold. Above 32 kg, no bag is carried, whatever the cabin.</p>
<p>The price of an extra bag, including the first bag on an Economy Basic ticket, depends on the destination and on how many bags you add; British Airways shows it in its baggage calculator and in Manage My Booking, and online is cheaper than at the airport. The only fixed figure on the page is the heavy bag charge: ${h.m(HEAVY.GBP, 'GBP')}, ${h.m(HEAVY.EUR, 'EUR')} or ${h.m(HEAVY.USD, 'USD')} per bag weighing between 23 and 32 kg, per one-way journey. British Airways publishes no rate per kilo, so this site has no excess calculator for it: the charge is per bag.</p>
<h2>Power banks: the cabin only</h2>
<p>The British Airways restrictions page, in an archived copy of ${h.date('2026-09-11')}, allows up to ${pb.maxPerPassenger} power banks per person, each up to ${pb.maxWh} Wh and showing its capacity rating. Seat power must not be used to charge a power bank, only your devices, and the power banks themselves must sit in the seat pocket or in a bag under the seat in front, not in the overhead locker. A notice at the top of the page, titled Update to our power banks policy, adds that power banks and spare batteries are forbidden in checked baggage; no start date is given. The ${h.a('power-bank-on-plane', 'power bank page')} shows how to work out Wh from the mAh figure on the label.</p>
<h2>Liquids at Heathrow and Gatwick</h2>
<p>The same British Airways page notes that some London airports, including Heathrow and Gatwick, use new security scanners and, where arrangements are in place, accept liquids in containers of up to 2 litres, left in the cabin bag. That is the airport’s rule, not the airline’s, and the airport you fly home from may still apply 100 ml. The ${h.a('uk-liquid-rules', 'UK liquid rules page')} lists each airport from its own website.</p>
<h2>Where these figures come from</h2>
<p>British Airways’ site refused our direct requests, so this page relies on the Internet Archive’s copies of ${h.src('ba-bags', 'the baggage essentials page')}, captured on ${x.read}, and ${h.src('ba-restrictions', 'the liquids and restrictions page')}, captured on ${h.date('2026-09-11')}. They reproduce the airline’s own text at those dates. Before you fly, open the live pages or your booking: they decide. This site is independent and is not British Airways.</p>
<h2>Checks before you book or pack</h2>
<p>On an Economy Basic fare, ask yourself whether a hold bag is needed, since adding it later is priced by route. In Business or First, the 32 kg allowance is per bag, and nothing heavier flies, so a very heavy load means two bags. Measure the depth of the hand bag first: at 15 cm it is the tightest of the British Airways limits. A trip with a ${h.a('virgin-atlantic', 'Virgin Atlantic')} leg needs a narrower cabin bag, so compare both in the checker.</p>`;
    },
  },
});
