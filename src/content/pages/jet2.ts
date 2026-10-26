import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const J = (h: Helpers) => h.A('jet2');
const PB = (h: Helpers) => h.P.rules.powerBankAirlines.find((p) => p.airline === 'Jet2')!;
const short = (s: string) => s.split(' (')[0];

export default definePage({
  id: 'jet2', group: 'uk', order: 3, demarche: true,
  tool: { kind: 'fit', props: { mode: 'carry', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:bag-jet2' },
  related: ['tui', 'easyjet', 'hold-luggage-size', 'hand-luggage-size', 'power-bank-on-plane'],
  sources: ['jet2-bags', 'jet2-dg'],
  en: {
    slug: 'jet2-baggage', nav: 'Jet2', card: 'A 10 kg cabin bag on every Jet2 fare, a small under-seat bag, 22 kg hold bags and the power bank rule, from archived copies of Jet2’s pages.',
    title: 'Jet2 Baggage Allowance 2026: 10 kg Cabin Bag, 22 kg Hold',
    description: 'Jet2 baggage allowance 2026: a free 56 × 45 × 25 cm cabin bag up to 10 kg on every fare, a 40 × 30 × 20 cm under-seat bag and up to three 22 kg hold bags.',
    h1: 'Jet2 baggage allowance: cabin bag, small bag and hold',
    intro: 'Measure your suitcase and type the three sides: the checker compares it with Jet2’s free cabin bag and small bag limits, and tells you what does not fit.',
    resume: (h) => {
      const x = J(h);
      return `Jet2 includes a full-size cabin bag in the price of every seat, where Ryanair and Wizz Air sell it as an extra. Each passenger, infants excepted, can take one piece of hand luggage of up to ${x.co}, wheels and handles counted, weighing no more than ${x.coW}, at no extra charge. A small bag of up to ${x.pi}, such as a handbag, a laptop bag or something bought at the airport, can come too, as long as it fits under the seat in front. Hold luggage is the part you pay for: Jet2 sells bags of ${x.ckW}, up to three per person and per flight, at a price set during booking. These figures come from an archived copy of Jet2’s baggage page captured on ${x.read}, because the airline’s site did not answer our direct requests; Jet2’s page on the day you book remains the reference.`;
    },
    faqs: (h) => {
      const x = J(h);
      return [
        { q: 'Does every Jet2 fare include a cabin bag?', a: `Yes. On the archived copy of Jet2’s baggage page we read, one piece of hand luggage up to ${short(x.co)} and ${short(x.coW)} is included free on every booking, infants excluded. Jet2 also sells a paid option that keeps the bag in the cabin on busy flights, which tells you that on a full aircraft some cabin bags may otherwise be placed in the hold.` },
        { q: 'How heavy can a Jet2 hold bag be?', a: `Jet2 sells hold bags of ${short(x.ckW)} each, and a passenger can add up to three per flight, infants excluded. The 32 kg figure on the same page applies to child equipment and bikes, item by item, not to suitcases. Jet2’s page gives no general size limit for a hold bag, so a normal suitcase is not measured, only weighed.` },
        { q: 'Can I use a power bank on a Jet2 flight?', a: `You can carry up to two, each no larger than 160 Wh and protected against short circuit, according to Jet2’s dangerous goods page in an archived copy of ${h.date('2026-05-12')}. They must not be charged on board and should not be used in flight, so charge your phone before you leave the gate and keep the power banks in your hand luggage.` },
      ];
    },
    body: (h) => {
      const x = J(h), pb = PB(h);
      return `<h2>The cabin allowance, piece by piece</h2>
<p>Jet2 counts two pieces in the cabin. The main one is the hand luggage bag: one piece, at most ${x.co} including wheels and handles, and no heavier than ${x.coW}. It is part of the fare, with no bundle or priority product to buy first. The second is a small bag under the seat in front, at most ${x.pi}: Jet2 gives a handbag, a laptop bag or an airport purchase as examples. No weight is stated for the small bag on the copy we read.</p>
${h.table(['Piece', 'Largest size', 'Weight', 'Price'], [['Hand luggage bag', x.co, x.coW, 'included, infants excepted'], ['Small under-seat bag', x.pi, 'not stated', 'included'], ['Hold bag', 'no general size stated', x.ckW, 'paid, set at booking']], 'From the archived copy of Jet2’s baggage page; the figures may have changed since.', ['l', 'l', 'l', 'l'])}
<p>The cabin bag size of ${short(x.co)} matches the larger standard used by easyJet and British Airways, and is deeper than the ${h.a('ryanair', 'Ryanair')} and ${h.a('tui', 'TUI')} cabin bag. A case bought for Jet2 can therefore be too deep for another airline on the return leg if you mix carriers.</p>
<p>Jet2 also sells a paid option to keep the cabin bag with you on busy flights. The page does not give its price, and the base allowance does not change: the bag is still included, the option only decides where it travels when the lockers fill up.</p>
<h2>Hold luggage: 22 kg bags, up to three</h2>
<p>Hold bags on Jet2 are sold at ${x.ckW} each. A passenger can book up to three per flight, infants excluded, by paying the charge shown during booking. The page gives no maximum size for an ordinary suitcase; the only other weight it mentions, 32 kg, is a per-item limit for child equipment such as pushchairs and for bikes. Jet2’s fee page for baggage did not open for us, and no archived copy holds it, so this site shows no Jet2 hold bag price and no charge per extra kilo rather than a guess. The price you see in the booking is the one that applies.</p>
<p>For a family on a beach holiday, the arithmetic is simple: the cabin bags are free, so the cost decision is only how many ${short(x.ckW)} bags the party really needs. The ${h.a('hold-luggage-size', 'hold luggage comparison')} sets Jet2’s 22 kg against the weights of the other UK airlines.</p>
<h2>Power banks and spare batteries</h2>
<p>The Jet2 dangerous goods page, in an archived copy of ${h.date('2026-05-12')}, allows no more than ${pb.maxPerPassenger} power banks per person, each up to ${pb.maxWh} Wh and individually protected against short circuit. In all cases they must not be charged on board and should not be used in flight; the same page also asks passengers not to charge devices during taxi, take-off and landing. The ${h.a('power-bank-on-plane', 'power bank page')} explains how to read the Wh rating on the label.</p>
<h2>Why this page relies on an archived copy</h2>
<p>Jet2’s own site refused our automated reading, so the figures above come from the Internet Archive’s copies of ${h.src('jet2-bags', 'the baggage page')}, captured on ${x.read}, and ${h.src('jet2-dg', 'the dangerous goods page')}. They are the airline’s own words at that date, not a third-party summary, but they can be older than the page you will see. Prices are not shown on this page at all, for the same reason.</p>
<h2>What to check while booking with Jet2</h2>
<p>Look at the baggage step of the booking: it shows the hold bag price for your flight and the option for the cabin bag on busy flights. Weigh the cabin bag at home, because ${short(x.coW)} is a real limit at Jet2, where many airlines set no weight at all. Keep medicines, keys and power banks in the small under-seat bag, which stays with you whatever happens to the larger one. Check the airport’s liquid rule too: the ${h.a('uk-liquid-rules', 'UK liquid rules page')} lists which airports accept 2 litre containers. This site is independent and is not Jet2.</p>`;
    },
  },
});
