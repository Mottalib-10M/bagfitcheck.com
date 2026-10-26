import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'jetblue', group: 'us', order: 6, demarche: true,
  tool: { kind: 'fees', props: { airline: 'jetblue', only: 'us' } },
  mini: { kind: 'mini:bag-jetblue' },
  related: ['checked-bag-fees', 'personal-item-size', 'overweight-baggage-fee', 'carry-on-size', 'free-checked-bags'],
  sources: ['jetblue-fees', 'jetblue-terms', 'jetblue-coc'],
  en: {
    slug: 'jetblue-baggage-fees', nav: 'JetBlue', card: 'JetBlue bag fees paid in advance or within 24 hours, peak dates, Main Base, the carry-on and personal item, and the overweight charge.',
    title: 'JetBlue Baggage Fees 2026: Carry-On, Personal Item, Bags',
    description: 'JetBlue baggage fees for 2026: advance and last-day prices, peak dates, Main Base with a carry-on, personal item size, overweight charges and free bags.',
    h1: 'JetBlue bag fees and carry-on size',
    intro: 'Choose the bags and when you add them: the calculator shows the JetBlue advance price against the price within 24 hours of the flight.',
    resume: (h) => {
      const x = h.A('jetblue');
      return `JetBlue prices a checked bag by when you add it. More than 24 hours before departure, on off-peak dates, the first bag costs ${x.f('first', 'online')} and the second ${x.f('second', 'online')}, each way, within the US, Latin America, the Caribbean and Canada. Within 24 hours of the flight you pay the full charge of the Contract of Carriage: ${x.f('first', 'airport')} and ${x.f('second', 'airport')}. A third bag costs ${x.f('third')}. On peak dates, such as late November and the second half of December, even the advance price rises to $49 and $69. Every fare, including Main Base, the fare once called Blue Basic, includes a carry-on of ${x.co} and a personal item. A checked bag must stay within ${x.ck} and weigh less than 51 pounds. The fees were read on JetBlue's fee page on ${x.read}, and the full charges on an archived copy of its Contract of Carriage captured on ${h.date('2026-10-14')}.`;
    },
    faqs: (h) => {
      const x = h.A('jetblue');
      return [
        { q: 'How much do I save by adding a JetBlue bag early?', a: `On off-peak dates, ${h.m((x.fees!.first!.airport as number) - (x.fees!.first!.online as number))} on the first bag and ${h.m((x.fees!.second!.airport as number) - (x.fees!.second!.online as number))} on the second, each way. JetBlue's fee page shows ${x.f('first', 'online')} and ${x.f('second', 'online')} with the saving included, as long as the bag is added more than 24 hours before departure. After that, the Contract of Carriage charge of ${x.f('first', 'airport')} and ${x.f('second', 'airport')} applies.` },
        { q: 'Does JetBlue Main Base include a carry-on bag?', a: `Yes. JetBlue's flight terms say all fares include both a carry-on bag and a personal item, and Main Base, the new name of Blue Basic, is one of them. The carry-on may measure ${x.co}. The checked bag is what Main Base passengers pay for, at the same prices as the other economy fares.` },
        { q: 'What is the JetBlue personal item size?', a: `The only dimensions JetBlue publishes are ${x.pi}, written in the UK and Europe paragraph of its flight terms. The paragraph for domestic flights gives no size and only asks that the item fit under the seat in front. Using the published size as a target keeps you safe on either kind of route.` },
        { q: 'Does JetBlue charge more for a bag over 50 pounds?', a: `Yes, ${h.m(x.overweight![0].fee)} per bag for ${x.overweight![0].fromLb} to ${x.overweight![0].toLb} pounds and the same ${h.m(x.overweight![1].fee)} for ${x.overweight![1].fromLb} to ${x.overweight![1].toLb} pounds, on top of the bag fee. A bag of ${x.oversize!.fromLinearIn} to 80 linear inches pays ${h.m(x.oversize!.fee)}. A standard bag must weigh less than 51 pounds under the Contract of Carriage.` },
      ];
    },
    body: (h) => {
      const x = h.A('jetblue');
      const t = h.table(
        ['Bag, each way', 'Added more than 24 h ahead, off-peak', 'Added more than 24 h ahead, peak', 'Within 24 h of departure'],
        [
          ['First', x.f('first', 'online'), '$49', x.f('first', 'airport')],
          ['Second', x.f('second', 'online'), '$69', x.f('second', 'airport')],
          ['Third and more', x.f('third'), x.f('third'), x.f('third')],
        ],
        `Main Base, Main and EvenMore within the US, Latin America, the Caribbean and Canada. Advance prices read on JetBlue's fee page on ${x.read}; the last column is the Contract of Carriage charge.`,
        ['l', 'r', 'r', 'r'],
      );
      return `<h2>The 24 hour line</h2>
<p>Most US carriers sell a bag at one price or at an online price and an airport price. JetBlue draws its line at 24 hours before departure. ${h.src('jetblue-fees', 'Its fee page')} shows the advance price with the saving already included: on the first bag the saving is four dollars, on the second ten. Miss the deadline and the bag falls back to the charge written in ${h.src('jetblue-coc', 'the Contract of Carriage')}, the June 2026 revision of which sets ${x.f('first', 'airport')} for the first bag and ${x.f('second', 'airport')} for the second for tickets bought from ${h.date('2026-03-27')}. A third bag costs up to ${x.f('third')} for tickets bought from ${h.date('2026-04-17')}.</p>
${t}
<p>Peak dates cancel most of the advantage. On days such as November 19 to 30 and December 17 to 31, 2026, the advance price for the first bag rises to $49 and the second to $69, the same as the full charge. Families flying around Thanksgiving or the year-end holidays should count on the higher figure whatever they do.</p>
<h2>Carry-on and personal item on every fare</h2>
<p>JetBlue's ${h.src('jetblue-terms', 'flight terms')} state that all fares include both a carry-on bag and a personal item. That covers Main Base, the fare the website used to call Blue Basic, so the cheapest JetBlue ticket still lets a ${x.co} bag ride in the bin. For the personal item, the only dimensions printed are in the paragraph about UK and European flights: ${x.pi}. The domestic paragraph does not repeat them. Aim for that size and the bag fits under the seat on any JetBlue route.</p>
<h2>Weight and size: one flat surcharge</h2>
<p>Where most airlines climb in two steps, JetBlue uses one figure. A bag of ${x.overweight![0].fromLb} to ${x.overweight![0].toLb} pounds costs ${h.m(x.overweight![0].fee)} extra, and so does a bag of ${x.overweight![1].fromLb} to ${x.overweight![1].toLb} pounds. A bag of ${x.oversize!.fromLinearIn} to 80 linear inches pays the same ${h.m(x.oversize!.fee)}. The Contract of Carriage defines a standard bag as one of up to ${x.ck} that weighs less than 51 pounds, so a bag of exactly 51 pounds already pays.</p>
<!--tool:mini:overweight-->
<h2>Who checks a bag free on JetBlue</h2>
<p>The airline's co-branded credit cards, offered in two tiers, include the first checked bag for the cardmember and up to three travelers on the same itinerary, on flights operated by JetBlue only. Mosaic members get the first bag included at level 1 and the first two bags at levels 2 to 4, again for themselves and their travel companions on the same itinerary. A military free-bag policy was not found on the pages read for this site, so check with JetBlue before relying on one.</p>
<!--tool:mini:card-->
<h2>Before you finish a JetBlue booking</h2>
<p>Add bags at booking or at least a day before departure, and note whether your dates fall in a peak period. If one traveler holds the card, put the others on the same itinerary, within the limit of three. Weigh the bags at home and keep each under 51 pounds. If you booked before ${h.date('2026-03-27')}, your ticket may still carry the older contract charges.</p>`;
    },
  },
});
