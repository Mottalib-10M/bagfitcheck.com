import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

type Range = { item: string; min: number; max: number; channel?: string };
/** TUI Airways record, with the excess field the engine does not type. */
const T = (h: Helpers) => h.A('tui') as ReturnType<Helpers['A']> & { excess: { shortMidHaul: number; longHaul: number } };
const bag = (h: Helpers, start: string) => (T(h).range as Range[]).find((r) => r.item.includes(start))!;
const short = (s: string) => s.split(' (')[0];
/** Same flight-only bag prices in euros, as written next to the pounds on the TUI page (uk.json, tui-luggage). */
const EUR = { short: 70, long: 90 };

export default definePage({
  id: 'tui', group: 'uk', order: 6, demarche: true,
  tool: { kind: 'fit', props: { mode: 'carry', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:bag-tui' },
  related: ['jet2', 'hand-luggage-size', 'hold-luggage-size', 'uk-liquid-rules', 'power-bank-on-plane'],
  sources: ['tui-luggage', 'caa-packright'],
  en: {
    slug: 'tui-baggage', nav: 'TUI', card: 'Hand luggage on TUI Airways, the 20 kg package holiday allowance, the flight-only bag prices and the charge per extra kilo.',
    title: 'TUI Baggage Allowance 2026: Hand Luggage, Hold, Extra Kilos',
    description: 'TUI baggage allowance 2026: a 55 × 40 × 20 cm hand luggage bag up to 10 kg, 20 kg hold luggage on most package holidays, flight-only bag prices and extra kilos.',
    h1: 'TUI baggage allowance: hand luggage, hold and extra weight',
    intro: 'Enter the size of your bag: the checker shows whether it is within the TUI Airways hand luggage limit, fits the small personal item, or must go in the hold.',
    resume: (h) => {
      const x = T(h), s = bag(h, 'short-haul'), l = bag(h, 'long-haul');
      return `TUI Airways lets every customer aged two and over take one piece of hand luggage of up to ${x.co}, weighing up to ${x.coW}, whether they booked a package holiday or a flight only. A small personal item or laptop of up to ${x.pi} can come as well, under the seat in front. The hold allowance depends on what you bought. Most package holidays include 20 kg of luggage per person, and some products, among them TUI River Cruise, TUI BLUE, Sensatori by TUI BLUE and Holiday Village holidays, include 25 kg. A flight-only ticket includes no hold bag: one can be added, and if it has not been, the TUI page lists ${h.m(s.min, 'GBP')} per 15 kg bag on short-haul flights and ${h.m(l.min, 'GBP')} on long-haul and some African routes. Whatever was booked, no bag over ${x.ckW} is accepted, and each extra kilo costs ${h.m(x.excess.shortMidHaul, 'GBP')} on flights under seven hours. We read the TUI luggage page on ${x.read}.`;
    },
    faqs: (h) => {
      const x = T(h);
      return [
        { q: 'Is hold luggage included in a TUI flight-only booking?', a: `No. A TUI flight-only booking includes the ${short(x.coW)} hand luggage bag but no hold luggage. You can add a checked bag, priced as a 15 kg bag and accepted up to ${short(x.ckW)}. Without that, TUI lists airport prices of ${h.m(bag(h, 'short-haul').min, 'GBP')} per 15 kg bag on short-haul flights and ${h.m(bag(h, 'long-haul').min, 'GBP')} on long-haul and some African routes.` },
        { q: 'What does TUI charge for each kilo over the allowance?', a: `On the TUI luggage page, each additional kilo costs ${h.m(x.excess.shortMidHaul, 'GBP')} on short and mid-haul flights, meaning those under seven hours, and ${h.m(x.excess.longHaul, 'GBP')} on long-haul flights of more than seven hours. The page adds that charges may vary by season. Three kilos over on a short-haul holiday flight would therefore cost ${h.m(x.excess.shortMidHaul * 3, 'GBP')} at the airport on that flight.` },
        { q: 'Do infants get a TUI baggage allowance?', a: 'Hand luggage is for customers aged two and over, so a baby under two has no hand luggage bag of its own on TUI Airways. On package holidays, the TUI page gives infants a hold allowance of 10 kg rather than the 20 kg of an adult or child. Check the booking confirmation, which states the weight for each passenger by name.' },
      ];
    },
    body: (h) => {
      const x = T(h), s = bag(h, 'short-haul'), l = bag(h, 'long-haul');
      return `<h2>Hand luggage on TUI Airways</h2>
<p>The cabin rule is the same for everyone aged two and over, on a package or a flight only: one piece of hand luggage up to ${x.co}, at most ${x.coW}, plus one small personal item or laptop up to ${x.pi} that stays under the seat in front. A case 25 cm deep, accepted by ${h.a('jet2', 'Jet2')} or ${h.a('easyjet', 'easyJet')}, is too deep for TUI, whose limit is 20 cm. If the hand luggage turns out larger than allowed, TUI says it goes in the hold and that a charge may apply; the page does not give the amount.</p>
<h2>Hold allowance: package or flight only</h2>
${h.table(['What you booked', 'Hold allowance per person'], [['Most package holidays', '20 kg'], ['TUI River Cruise, TUI BLUE, Sensatori by TUI BLUE, Holiday Village', '25 kg'], ['Infants on a package', '10 kg'], ['Flight only', 'none included; one bag can be added, priced as 15 kg'], ['Any booking, largest single bag', x.ckW]], 'From the TUI luggage allowance page; your booking confirmation shows your own allowance.', ['l', 'l'])}
<p>The ${short(x.ckW)} ceiling is per bag and firm: TUI states that no bag heavier than that will be accepted. The page we read says nothing about pooling the weight of several bags, so plan each bag to its own allowance.</p>
<h2>Flight-only bag prices and the cost of a kilo</h2>
<p>The TUI page lists, under its excess luggage charges, what a flight-only customer pays at the airport for a bag not added in advance. Short-haul, the figure is ${h.m(s.min, 'GBP')} or ${h.m(EUR.short, 'EUR')} per 15 kg bag. On flights to Cape Verde, Egypt, The Gambia and Senegal, and on long-haul, it is ${h.m(l.min, 'GBP')} or ${h.m(EUR.long, 'EUR')}. Adding a bag while booking is priced in the booking itself, and TUI does not publish that figure on the page we read.</p>
<!--tool:fees|{"airline":"tui","only":"uk"}-->
<p>Weight above the allowance is charged per kilo at the airport: ${h.m(x.excess.shortMidHaul, 'GBP')} on short and mid-haul flights of less than seven hours, ${h.m(x.excess.longHaul, 'GBP')} on long-haul flights of more than seven hours. TUI notes that its charges may vary by season. A family of four, each two kilos over on a long-haul flight, would pay ${h.m(x.excess.longHaul * 8, 'GBP')} on one leg, enough to make a home luggage scale worth its price.</p>
<!--tool:mini:excess-->
<h2>Power banks: what TUI’s page does not say</h2>
<p>The TUI luggage pages we read give no power bank rule of TUI Airways’ own, unlike Ryanair, easyJet, Jet2, British Airways and Wizz Air, which each publish a count and a Wh limit. The general UK guidance therefore matters more: the ${h.src('caa-packright', 'Civil Aviation Authority’s Pack right page')} says power banks stay with you in the cabin and never go in checked luggage, that you can take ${h.P.rules.batteries.ukMaxPowerBanks} per person, that they should never be recharged on board, and that you should check with the airline before using one in flight. Batteries from ${h.P.rules.batteries.noApprovalWh} to ${h.P.rules.batteries.approvalWh} Wh need the airline’s approval. Check TUI’s own pages or your booking documents for anything stricter, and see the ${h.a('power-bank-on-plane', 'power bank page')} for the rules of the other airlines.</p>
<h2>At the airport and before you leave</h2>
<p>UK airports do not all apply the same liquid rule: some accept containers up to 2 litres, others keep 100 ml, and the airport abroad decides on the way home. The ${h.a('uk-liquid-rules', 'UK liquid rules page')} lists them. Before you travel, find the weight on your booking confirmation, as it differs between package products, and weigh the bags at home. On a flight-only booking, add the bag in advance rather than at the desk. Read the ${h.src('tui-luggage', 'TUI luggage allowance page')} again close to departure, since TUI says charges may vary by season. This site is independent and is not TUI.</p>`;
    },
  },
});
