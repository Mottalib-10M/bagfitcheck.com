import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'delta', group: 'us', order: 2, demarche: true,
  tool: { kind: 'fees', props: { airline: 'delta', only: 'us' } },
  mini: { kind: 'mini:bag-delta' },
  related: ['carry-on-size', 'personal-item-size', 'checked-bag-fees', 'free-checked-bags', 'american'],
  sources: ['delta-carryon', 'delta-fees', 'delta-excess', 'delta-medallion', 'delta-military', 'delta-previous'],
  en: {
    slug: 'delta-baggage-fees', nav: 'Delta', card: 'Delta checked bag fees after the April 2026 increase, the carry-on limit, Main Basic rules and the free-bag exemptions.',
    title: 'Delta Baggage Fees 2026: Carry-On Size and Checked Bags',
    description: 'Delta baggage fees for 2026 after the April 8 increase, carry-on size in inches and cm, Main Basic, overweight bands and who checks a bag free, with a tool.',
    h1: 'Delta bag fees and carry-on size',
    intro: 'Set the bags, the trip and any card or Medallion status: the calculator gives what Delta charges for your party, each way or for the return.',
    resume: (h) => {
      const x = h.A('delta'), c = x.carry!;
      return `Delta charges ${x.f('first')} for the first checked bag and ${x.f('second')} for the second on flights within the United States, each way, and ${x.f('third')} for the third and every bag after it. Delta publishes no cheaper online price: the amount is the same whether you add the bag when booking or at the counter. These fees apply to tickets bought from ${h.date('2026-04-08')}; before that date the first two bags cost $35 and $45. Each bag may weigh ${x.ckW} and measure ${x.ck} in length, width and height combined. In the cabin, every passenger, including Delta Main Basic, brings one carry-on of ${x.co}, with a combined maximum of ${h.num(c.linearIn!)} linear inches, and one personal item. Delta gives no dimensions for that personal item: a purse, briefcase or small backpack that fits under the seat in front. The figures were read on Delta's own pages on ${x.read}.`;
    },
    faqs: (h) => {
      const x = h.A('delta'), o = x.overweight!;
      return [
        { q: 'Did Delta raise its checked bag fees in 2026?', a: `Yes. Delta's page of previous fees says that tickets bought before ${h.date('2026-04-08')} paid $35 for the first bag and $45 for the second within the United States. From that date the first bag is ${x.f('first')} and the second ${x.f('second')}, each way. A ticket keeps the fee in force on the day it was bought.` },
        { q: 'What size personal item does Delta allow?', a: 'Delta publishes no measurements for it. Its carry-on page shows examples, a purse, a briefcase, a small backpack or a laptop bag, and asks for an item of that kind that fits beneath the seat in front of you. For a number to aim at, American, Frontier and Allegiant all publish 18 by 14 by 8 inches for theirs.' },
        { q: 'How much is a 60 pound bag on Delta?', a: `Delta adds ${h.m(o[0].fee)} for a bag between 51 and 70 pounds, on top of the ${x.f('first')} first bag fee, so a single 60 pound first bag costs ${h.m(o[0].fee + (x.fees!.first!.online as number))} each way within the US. Between 71 and just under 100 pounds the surcharge is ${h.m(o[1].fee)}. Delta does not accept bags of 100 pounds or more.` },
        { q: 'Can I bring a carry-on on a small Delta Connection plane?', a: 'On Delta Connection flights with 50 seats or fewer, only personal items go in the cabin. A larger bag is checked at the gate free of charge, so it costs nothing, but it rides in the hold: keep keys, medicines and any power bank in the personal item that stays with you.' },
      ];
    },
    body: (h) => {
      const x = h.A('delta'), o = x.overweight!;
      const fees = h.table(
        ['Checked bag', 'Fee each way', 'Before April 8, 2026'],
        [['First', x.f('first'), '$35'], ['Second', x.f('second'), '$45'], ['Third', x.f('third'), 'not listed on the page read'], ['Fourth to tenth', `${x.f('third')} each`, 'not listed on the page read']],
        `Within the United States, Delta Main and Delta Comfort, read on Delta's pages on ${x.read}.`,
        ['l', 'r', 'r'],
      );
      const extra = h.table(
        ['Bag over the standard limit', 'Surcharge each way'],
        [[`${o[0].fromLb} to ${o[0].toLb} lb`, h.m(o[0].fee)], [`${o[1].fromLb} lb to under 100 lb`, h.m(o[1].fee)], ['100 lb or more', 'not permitted'], [`${x.oversize!.fromLinearIn} to 80 linear in`, h.m(x.oversize!.fee)]],
        'Amounts from Delta’s excess and overweight baggage page, in addition to the bag fee.',
        ['l', 'r'],
      );
      return `<h2>One price, wherever you pay</h2>
<p>Some carriers reward the passenger who pays for a bag ahead of time. Delta does not: ${h.src('delta-fees', 'its baggage overview')} lists a single amount for each bag within the United States, and the same figure applies at check-in. That makes the arithmetic simple. Two travelers, one bag each, a round trip: four first-bag fees. Add a second bag for one of them and the trip gains two second-bag fees. The tool at the top does this count and also subtracts any bag covered by a card or a Medallion tier.</p>
${fees}
<p>The old column comes from Delta's own ${h.src('delta-previous', 'page of previous checked baggage fees')}, which explains that the increase concerns tickets purchased on or after ${h.date('2026-04-08')}. Fare names changed as well: the cabins are now called Delta Main, Delta Comfort and Delta Main Basic. Delta One and Delta First travelers get ${h.num(70)} pounds per bag instead of the standard ${x.ckW}.</p>
<h2>Main Basic still carries a bag on board</h2>
<p>Unlike some rivals, Delta keeps the overhead bin open to its cheapest fare. ${h.src('delta-carryon', 'The carry-on page')} says each passenger can bring one carry-on bag and one personal item free of charge, and Main Basic is not an exception. The bag must stay within ${x.co} on each side and within ${h.num(x.carry!.linearIn!)} inches when the three sides are added up, so a bag that is a little longer but thinner can still fail on the total. No weight limit is published for the cabin bag. The exception is the smallest regional aircraft: on Delta Connection flights with 50 seats or fewer, only personal items stay with you, and larger bags are checked at the gate for free.</p>
<h2>Heavy bags and long bags</h2>
<p>Overweight and oversize charges add to the normal bag fee rather than replacing it. They are steep on a one-bag trip: a first bag between 51 and 70 pounds costs more than three times the base fee in total. Moving a few pounds into the carry-on usually pays better than any other fix.</p>
${extra}
<!--tool:mini:overweight-->
<h2>Who pays nothing for the first bag</h2>
<p>Delta's ${h.src('delta-medallion', 'Medallion and credit card page')} describes two routes to a free first bag. Holders of the airline's co-branded credit card who book the flight with that card get the first checked bag free, and the benefit extends to up to eight companions listed on the same reservation, nine travelers in all. Medallion members of any tier, and SkyTeam Elite and Elite Plus members, also have the first bag fee waived, again with up to eight companions on the booking, and higher tiers or fares can add more bags. For the military, ${h.src('delta-military', 'the military baggage page')} gives active US service members two free bags on personal travel in Delta Main or Delta Comfort, three in the premium cabins, and five when traveling on orders.</p>
<!--tool:mini:card-->
<h2>Before you book a Delta flight with bags</h2>
<p>Check the purchase date of the ticket, which sets the fee. Measure the carry-on on all three sides and on the total. If you hold the airline's card, pay for the flight with it, since the benefit depends on that, and put every companion on the same reservation. Weigh checked bags at home: the jump at 51 pounds is the most expensive pound on the trip.</p>`;
    },
  },
});
