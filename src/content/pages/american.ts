import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'american', group: 'us', order: 1, demarche: true,
  tool: { kind: 'fees', props: { airline: 'american', only: 'us' } },
  mini: { kind: 'mini:bag-american' },
  related: ['carry-on-size', 'basic-economy-carry-on', 'checked-bag-fees', 'overweight-baggage-fee', 'free-checked-bags'],
  sources: ['american-carryon', 'american-checked', 'american-over'],
  en: {
    slug: 'american-airlines-baggage-fees', nav: 'American Airlines', card: 'American Airlines bag fees online and at the airport, the Basic Economy surcharge, carry-on and personal item sizes.',
    title: 'AA Baggage Fees 2026: American Airlines Carry-On and Bags',
    description: 'American Airlines baggage fees in 2026, online and at the airport, the Basic Economy surcharge since May 18, carry-on size and overweight fees, with a checker.',
    h1: 'American Airlines bag fees and carry-on size',
    intro: 'Pick the number of bags and how you pay: the calculator gives the American Airlines total for one way or a round trip, with the online saving shown apart.',
    resume: (h) => {
      const x = h.A('american'), b = (x as any).basicFees;
      return `On a domestic Main Cabin ticket, American Airlines charges ${x.f('first', 'online')} for the first checked bag when you pay on its website or app, and ${x.f('first', 'airport')} when you pay at the airport. The second bag costs ${x.f('second', 'online')} online or ${x.f('second', 'airport')} at the counter, and a third bag ${x.f('third', 'airport')} whichever way you pay. Each fee applies each way, so a round trip doubles it. Basic Economy tickets issued from ${h.date(b.from)} pay five dollars more: ${h.m(b.first.online)} online and ${h.m(b.first.airport)} at the airport for the first bag. A checked bag may weigh up to ${x.ckW} and measure up to ${x.ck}. In the cabin, every fare includes a carry-on of ${x.co}, handles and wheels counted, plus a personal item of ${x.pi} that fits under the seat. These figures were read on an archived copy of American's pages captured on ${x.read}, because the airline site refuses automated reading.`;
    },
    faqs: (h) => {
      const x = h.A('american'), b = (x as any).basicFees, o = x.overweight!;
      return [
        { q: 'How much cheaper is it to pay for an American Airlines bag online?', a: `Five dollars per bag for the first and second bag. The first bag is ${x.f('first', 'online')} on the website or app against ${x.f('first', 'airport')} at the airport, the second ${x.f('second', 'online')} against ${x.f('second', 'airport')}. American says the online price holds when you pay up to two hours before departure. The third bag shows no online saving on the archived page: it is ${x.f('third', 'airport')} either way.` },
        { q: 'Does American Airlines Basic Economy include a carry-on bag?', a: `Yes. The archived carry-on page lists one personal item and one carry-on for every ticket, with no Basic Economy exception, so the ${x.co} bag goes in the overhead bin at no charge. What changes on Basic Economy is the checked bag: from ${h.date(b.from)} it costs ${h.m(b.first.online)} online for the first one, five dollars more than Main Cabin.` },
        { q: 'What does American Airlines charge for a bag over 50 pounds?', a: `The archived oversize page splits it in three bands for travel within the US, Puerto Rico, the US Virgin Islands and Canada: over 50 and up to 53 pounds costs ${h.m(o[0].fee)}, over 53 and up to 70 pounds ${h.m(o[1].fee)}, over 70 and up to 100 pounds ${h.m(o[2].fee)}. Bags above 100 pounds are refused. The charge comes on top of the normal checked bag fee.` },
        { q: 'Who flies American Airlines with free checked bags?', a: 'Holders of the airline’s co-branded credit card get the first bag free on domestic itineraries operated by American, as long as the loyalty number is in the booking. AAdvantage Gold members get one free bag, Platinum two, Executive Platinum and Platinum Pro three. Active US military with ID check three bags free on personal travel, and up to five on orders.' },
      ];
    },
    body: (h) => {
      const x = h.A('american'), b = (x as any).basicFees, o = x.overweight!;
      const fees = h.table(
        ['Bag, each way', 'Main Cabin online', 'Main Cabin airport', 'Basic Economy online', 'Basic Economy airport'],
        [
          ['First bag', x.f('first', 'online'), x.f('first', 'airport'), h.m(b.first.online), h.m(b.first.airport)],
          ['Second bag', x.f('second', 'online'), x.f('second', 'airport'), h.m(b.second.online), h.m(b.second.airport)],
          ['Third bag', x.f('third', 'online'), x.f('third', 'airport'), x.f('third', 'airport'), x.f('third', 'airport')],
        ],
        `Domestic US fees read on an archived copy of American's checked bag page captured on ${x.read}. Basic Economy column: tickets issued from ${h.date(b.from)}.`,
        ['l', 'r', 'r', 'r', 'r'],
      );
      const ow = h.table(
        ['Weight or size of the bag', 'Charge on top of the bag fee'],
        [
          ['Over 50 lb, up to 53 lb', h.m(o[0].fee)],
          ['Over 53 lb, up to 70 lb', h.m(o[1].fee)],
          ['Over 70 lb, up to 100 lb', h.m(o[2].fee)],
          ['Over 62 in, up to 65 in (length + width + height)', '$30'],
          ['Over 65 in, up to 115 in', h.m(x.oversize!.fee)],
          ['Over 100 lb or over 115 in', 'not accepted'],
        ],
        `Within or between the US, Puerto Rico, the US Virgin Islands and Canada, read on an archived copy captured on ${h.date('2026-02-28')}.`,
        ['l', 'r'],
      );
      return `<h2>The two prices of every American bag</h2>
<p>American is one of the few large US carriers that still sells the same checked bag at two prices. Pay on ${h.src('american-checked', 'its checked bag page')} or in the app, up to two hours before departure, and you get the lower one. Wait until an agent tags the bag and you pay five dollars more for each of the first two pieces. On a family of four with one bag each, that is forty dollars on a round trip for doing nothing different but tapping a button the day before.</p>
<p>The fee runs per direction and per passenger, so the numbers below double on a return trip and multiply by the size of the group. The scope of the table below is domestic travel, which American defines as flights within or between the US mainland, Hawaii, Alaska, Puerto Rico and the US Virgin Islands.</p>
${fees}
<h2>What changed on April 9 and May 18, 2026</h2>
<p>The archived page dates two increases. For tickets issued from ${h.date('2026-04-09')}, the first Main Cabin bag went from $40 to ${x.f('first', 'airport')} at the airport, the second from $50 to ${x.f('second', 'airport')}, and the third bag from $150 to ${x.f('third', 'airport')}. A second step followed for Basic Economy tickets issued from ${h.date(b.from)}: a surcharge of five dollars per bag on the first and second piece, which puts the first Basic Economy bag at ${h.m(b.first.airport)} at the counter and ${h.m(b.first.online)} online. The ticket date counts, not the flight date, so a trip booked in March and flown in June keeps the old price.</p>
<p>For a traveler who checks one bag, the cheaper Basic Economy fare therefore saves less than its headline suggests. Once the bag is added both ways, the gap with Main Cabin shrinks by ten dollars on a round trip. The ${h.a('basic-economy-carry-on', 'basic economy comparison')} runs that sum for American and United side by side.</p>
<h2>Free bags: card, status and military</h2>
<p>Three groups skip the fee. The first is the holder of the airline's co-branded credit card: the first checked bag is free on domestic itineraries operated by American, provided the AAdvantage number is in the reservation. The archived page does not say how many companions share the benefit, so do not count on it for the whole party. The second group is elite members: AAdvantage Gold and oneworld Ruby get the first bag free, Platinum and oneworld Sapphire the first two, Executive Platinum, Platinum Pro and oneworld Emerald the first three. The third is the military: active US service members with ID check the first three bags free on personal travel, and on orders they and their dependents check up to five.</p>
<!--tool:mini:card-->
<h2>Heavy and oversized bags</h2>
<p>The standard bag stops at ${x.ckW} and ${x.ck}. Beyond that American charges by band, as written on ${h.src('american-over', 'its oversize and overweight page')}. The page captured in February 2026 says these amounts were updated on ${h.date('2024-02-20')} for travel from ${h.date('2024-04-17')}; a later change cannot be ruled out. When a bag is both too heavy and too big, only the higher of the two charges applies.</p>
${ow}
<!--tool:mini:overweight-->
<h2>Carry-on, personal item and the small jets</h2>
<p>American's ${h.src('american-carryon', 'carry-on page')} is short: one bag of ${x.co} that must fit the sizer at the airport, and one personal item of ${x.pi} under the seat. No weight limit is written for either. On American Eagle regional jets the bins are smaller, and a full-size carry-on is valet-checked at the gate at no charge instead of going in the bin. Keep a power bank and medicines in the personal item for that reason: the valet bag travels in the hold.</p>
<h2>What to check before you pay</h2>
<p>Look at the ticket's issue date, since it decides between the old and new prices. Check whether the fare is Basic Economy, which pays the surcharge. Add the AAdvantage number to the booking if you hold the airline's card or status, before you reach the airport. Then pay for the bag online, ideally the day before, and weigh it at home: three pounds over the limit already costs ${h.m(o[0].fee)}.</p>`;
    },
  },
});
