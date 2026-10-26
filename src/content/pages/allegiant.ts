import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'allegiant', group: 'us', order: 8, demarche: true,
  tool: { kind: 'fees', props: { airline: 'allegiant', only: 'us' } },
  mini: { kind: 'mini:bag-allegiant' },
  related: ['personal-item-size', 'checked-bag-fees', 'overweight-baggage-fee', 'frontier', 'personal-item-vs-carry-on'],
  sources: ['allegiant-fees'],
  en: {
    slug: 'allegiant-baggage-fees', nav: 'Allegiant', card: 'Allegiant carry-on and checked bag prices per segment, the free personal item, the 80 linear inch checked bag and the overweight charges.',
    title: 'Allegiant Baggage Fees 2026: Carry-On Price and Bag Size',
    description: 'Allegiant baggage fees in 2026: the carry-on price range, bags paid per segment, the free personal item, the 80 inch checked bag limit and overweight charges.',
    h1: 'Allegiant bag fees, carry-on price and bag sizes',
    intro: 'Allegiant charges for every bag except the personal item. Check your bag here, then price it on Allegiant’s booking page for your route.',
    resume: (h) => {
      const x = h.A('allegiant'), r = x.range![0], o = x.overweight!;
      return `Allegiant includes one bag in the fare: a personal item of ${x.pi} that fits under the seat. Everything else is paid, and paid per segment, so a trip with a connection or a return flight pays again on each leg. The carry-on, up to ${x.co}, costs from ${h.m(r.min)} to ${h.m(r.max)} depending on the route and on when you add it, and is cheapest at booking. Checked bags are also priced by route and segment, with no fixed list, and Allegiant accepts up to four per passenger. Its checked bag limit is unusual: ${x.ck} in length, width and height combined, against 62 inches on most US airlines, with a weight of ${x.ckW}. Above that weight Allegiant adds ${h.m(o[0].fee)} up to ${o[0].toLb} pounds and ${h.m(o[1].fee)} up to ${o[1].toLb} pounds. A bag checked at the gate can cost up to $75. These figures were read on an archived copy of Allegiant's fee page captured on ${x.read}.`;
    },
    faqs: (h) => {
      const x = h.A('allegiant'), r = x.range![0];
      return [
        { q: 'How much is a carry-on bag on Allegiant?', a: `Between ${h.m(r.min)} and ${h.m(r.max)} per segment, according to the archived fee page. The price depends on the route and on when you add the bag; it is lowest when bought with the ticket. A round trip pays it twice, and a connecting itinerary pays it on each flight. No Allegiant fare includes the carry-on.` },
        { q: 'Can I check a large bag on Allegiant without an oversize fee?', a: `Up to ${x.ck}, yes. Allegiant's checked bag limit counts length, width and height together up to 80 inches, which is more than the 62 inches of most US airlines. Golf bags and large duffels that are oversize elsewhere can travel as standard bags, provided they stay within ${x.ckW}.` },
        { q: 'What happens if my Allegiant personal item is too big?', a: `If the bag is larger than ${x.pi}, it is no longer a free personal item. The archived page lists a charge of $50 to $75 for an oversized personal item at the airport, up to the top of the carry-on range. Measuring it at home costs nothing.` },
      ];
    },
    body: (h) => {
      const x = h.A('allegiant'), r = x.range![0], o = x.overweight!;
      const t = h.table(
        ['Item', 'Size', 'Price per segment'],
        [
          ['Personal item', x.pi, 'free'],
          ['Carry-on', x.co, `${h.m(r.min)} to ${h.m(r.max)}`],
          ['Checked bag (up to 4)', `${x.ck}, ${x.ckW}`, 'set by route and date'],
          ['Bag checked at the gate', 'any', '$0 to $75'],
          ['Oversized personal item at the airport', `over ${x.pi}`, '$50 to $75'],
        ],
        `Read on an archived copy of Allegiant's optional services and fees page captured on ${x.read}.`,
        ['l', 'l', 'r'],
      );
      const ow = h.table(
        ['Checked bag over the standard', 'Added to the bag price'],
        [[`${o[0].fromLb} to ${o[0].toLb} lb`, h.m(o[0].fee)], [`${o[1].fromLb} to ${o[1].toLb} lb`, h.m(o[1].fee)], [`Over ${x.checked!.linearIn} linear in`, h.m(x.oversize!.fee)]],
        undefined,
        ['l', 'r'],
      );
      return `<h2>Every leg is a new bag fee</h2>
<p>The key word on ${h.src('allegiant-fees', 'Allegiant’s fee page')} is segment. A segment is one flight, from takeoff to landing. A round trip has two, a trip with a stop has more, and each one is charged separately for every carry-on and checked bag. A family that compares Allegiant with a network carrier should multiply the bag price by the number of flights, not by the number of trips.</p>
${t}
<p>Allegiant's site was not readable by automated tools, so the figures here come from the Internet Archive's copy of the page captured on ${x.read}. Allegiant publishes no dated change to these prices on that page.</p>
<h2>The personal item is the whole free allowance</h2>
<p>Allegiant writes the personal item as 8 by 14 by 18 inches, which is ${x.pi}. It must fit under the seat ahead, and nothing else is free. A soft backpack or a small tote within those sides covers a short trip at no cost. The carry-on, at ${x.co}, is slightly wider and deeper than the US norm of 22 by 14 by 9 inches, so a standard roller bag fits; the question is only whether it is worth the price on your route.</p>
<h2>An 80 inch checked bag</h2>
<p>This is the one rule where Allegiant is more lenient than its rivals. A checked bag may measure ${x.ck} in total, so long items that pay oversize charges on other airlines can go as a standard bag. The weight limit stays at ${x.ckW}, and the surcharges for heavier bags are lower than those of the network carriers.</p>
${ow}
<!--tool:mini:overweight-->
<p>Allegiant's page lists no co-branded credit card benefit, no status tiers and no military allowance for bags; this site found none on the page read.</p>
<h2>Booking Allegiant with bags: the checks</h2>
<p>Count the segments of the trip and multiply. Add the carry-on and checked bags at booking, when the price is lowest, rather than at the airport or the gate. Measure the personal item before leaving home, since an oversized one at the airport starts at $50, far above the lowest carry-on price. And if you carry sports equipment, use the 80 inch limit to your advantage.</p>`;
    },
  },
});
