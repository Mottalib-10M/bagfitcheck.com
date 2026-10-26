import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'southwest', group: 'us', order: 4, demarche: true,
  tool: { kind: 'fees', props: { airline: 'southwest', only: 'us' } },
  mini: { kind: 'mini:bag-southwest' },
  related: ['checked-bag-fees', 'free-checked-bags', 'carry-on-size', 'overweight-baggage-fee', 'hawaiian'],
  sources: ['southwest-fees', 'southwest-carryon', 'southwest-checked'],
  en: {
    slug: 'southwest-baggage-fees', nav: 'Southwest', card: 'Southwest bag fees on each fare since April 2026, the larger carry-on, Choice Extra, interisland Hawaii and the free-bag exemptions.',
    title: 'Southwest Bag Fees 2026: Carry-On Size and Checked Bags',
    description: 'Southwest bag fees 2026 by fare: first and second bag, Choice Extra, interisland Hawaii, the 24 x 16 x 10 inch carry-on, overweight charges, plus a calculator.',
    h1: 'Southwest bag fees and carry-on size',
    intro: 'Pick the fare, the number of bags and any card or A-List status: the calculator gives the Southwest total for the trip.',
    resume: (h) => {
      const x = h.A('southwest');
      return `Southwest charges for checked bags on three of its four fares. On U.S. Mainland flights booked, ticketed or changed from ${h.date('2026-04-09')}, the Basic, Choice and Choice Preferred fares pay ${x.f('first')} for the first bag and ${x.f('second')} for the second, each way, and ${x.f('third')} for a third. The price is the same online and at the airport. The top fare, Choice Extra, includes two checked bags. Each bag can weigh ${x.ckW} and measure ${x.ck}. The cabin is where Southwest stays generous: every fare, Basic included, keeps one carry-on and one personal item free, and the carry-on limit of ${x.co} is larger than the 22 by 14 by 9 inches of the network carriers. Southwest gives no measurements for the personal item, only that it goes under the seat in front. The figures were read on Southwest's fee page and help center on ${x.read}.`;
    },
    faqs: (h) => {
      const x = h.A('southwest');
      return [
        { q: 'Which Southwest fare includes free checked bags?', a: `Choice Extra, the highest fare, includes two checked bags. Basic, Choice and Choice Preferred pay ${x.f('first')} for the first bag and ${x.f('second')} for the second on U.S. Mainland trips booked from ${h.date('2026-04-09')}. Holders of the airline's co-branded credit card and A-List members also get a first bag free, whatever the fare.` },
        { q: 'Is a 24 inch suitcase allowed as a Southwest carry-on?', a: `Yes, as long as the other two sides fit too. Southwest's help center gives the limit as 24 inches long, 16 wide and 10 high, which is ${x.co}, wheels and handles included. A 24 inch case is too long for most other US airlines, so check the return airline if you change carrier.` },
        { q: 'How much does Southwest charge to check a bag between Hawaiian islands?', a: `For travelers who are not Hawaii residents, Southwest raised interisland fees to $30 for the first bag and $40 for the second, from $15 and $20 before. The change applies to travel booked, ticketed or changed from ${h.date('2026-04-09')}, the same date as the Mainland increase.` },
        { q: 'Does Southwest charge for a bag of 55 pounds?', a: `Yes. A bag between 51 and 70 pounds costs ${h.m(x.overweight![0].fee)} on top of the standard bag fee, and one between 71 and 100 pounds ${h.m(x.overweight![1].fee)}. A first bag of 55 pounds therefore costs ${h.m(x.overweight![0].fee + (x.fees!.first!.online as number))} each way, unless it falls under a free-bag benefit.` },
      ];
    },
    body: (h) => {
      const x = h.A('southwest'), o = x.overweight!;
      const fares = h.table(
        ['Fare', 'Carry-on and personal item', 'First bag', 'Second bag'],
        [
          ['Basic', 'included', x.f('first'), x.f('second')],
          ['Choice', 'included', x.f('first'), x.f('second')],
          ['Choice Preferred', 'included', x.f('first'), x.f('second')],
          ['Choice Extra', 'included', 'included', 'included'],
        ],
        `U.S. Mainland, booked, ticketed or changed from ${h.date('2026-04-09')}, each way. Read on ${x.read}.`,
        ['l', 'l', 'r', 'r'],
      );
      return `<h2>Bag fees by Southwest fare</h2>
<p>Southwest publishes its bag fees on ${h.src('southwest-fees', 'its optional travel charges page')}, set by fare. Three of its four fares pay for every checked bag, and the fourth includes two. The amounts below are those for the U.S. Mainland. Before ${h.date('2026-04-09')}, the same bags cost $35 and $45; any booking made, ticketed or changed on or after that date pays the new price, so changing an older ticket moves it to the new fees.</p>
${fares}
<p>A third bag costs ${x.f('third')} on the fares that pay. No online discount appears: unlike some network carriers, Southwest charges the same whether you add the bag in advance or at the counter.</p>
<h2>Hawaii: a separate interisland price</h2>
<p>Flights between the Hawaiian islands follow their own scale. For travelers who are not Hawaii residents, the first interisland bag went from $15 to $30 and the second from $20 to $40, on the same date as the Mainland change. Flights between the Mainland and Hawaii are not in the interisland scale. If your trip combines both, price each segment separately in the calculator above, or compare with ${h.a('hawaiian', 'Hawaiian Airlines')}, which also flies between the islands.</p>
<h2>Still the roomiest carry-on of the big airlines</h2>
<p>${h.src('southwest-carryon', 'The help center')} allows one carry-on, a roller bag, garment bag or tote, of ${x.co} on every fare, plus a personal item that goes under the seat. The two inches of extra length and width over the 22 by 14 by 9 inch norm are enough for a 24 inch case or a weekend duffel. Southwest does not publish a weight for either bag and gives no personal item size; anything that slides under the seat ahead of you passes.</p>
<h2>Heavy or oversized bags</h2>
<p>${h.src('southwest-checked', 'The checked bag policy')} caps a standard bag at ${x.ckW} and ${x.ck}. Overweight items of ${o[0].fromLb} to ${o[0].toLb} pounds cost ${h.m(o[0].fee)}, and ${o[1].fromLb} to ${o[1].toLb} pounds ${h.m(o[1].fee)}. Oversized items above 62 inches and up to 80 inches pay ${h.m(x.oversize!.fee)} per item. In each case the charge is added to the standard bag fee, it does not replace it.</p>
<!--tool:mini:overweight-->
<h2>Free bags without Choice Extra</h2>
<p>Three groups check bags free on any fare. Primary holders of the airline's co-branded credit card get the first standard checked bag free, and so do up to eight passengers on the same reservation, provided the Rapid Rewards number is in the booking. A-List members get the same first bag for themselves and up to eight others, and A-List Preferred members the first and second bags. Active-duty military with a valid military ID check the first and second bags free.</p>
<!--tool:mini:card-->
<h2>Checklist for a Southwest booking</h2>
<p>Compare the Choice Extra fare with a cheaper fare plus bags: for two checked bags each way, the bag fees alone can exceed the fare difference. Add the Rapid Rewards number before travel if anyone in the party holds the card or A-List status. Do not change an old ticket without checking the bag fee, since a change made after April 9 moves it to the new scale. And weigh the bag: the fee at 51 pounds is more than twice the first bag fee.</p>`;
    },
  },
});
