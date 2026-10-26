import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'checked-bag-fees', group: 'fees', order: 1,
  tool: { kind: 'fees', props: { airline: 'american', only: 'us' } },
  mini: { kind: 'mini:card' },
  related: ['free-checked-bags', 'checked-bag-weight-limit', 'overweight-baggage-fee', 'american', 'delta'],
  sources: ['american-checked', 'delta-fees', 'delta-previous', 'united-checked', 'southwest-fees', 'alaska-checked', 'hawaiian-checked', 'jetblue-fees', 'jetblue-coc', 'frontier-bags', 'allegiant-fees', 'houston-spirit'],
  en: {
    slug: 'checked-bag-fees', nav: 'Checked bag fees', card: 'First, second and third bag on every US airline after the April 2026 increases, online and at the airport, with the date each fee was read.',
    title: 'Checked Bag Fees 2026: Every US Airline, 1st and 2nd Bag',
    description: 'Checked bag fees of American, Delta, United, Southwest, Alaska, Hawaiian and JetBlue in 2026: first to third bag, online or at the airport, after April hikes.',
    h1: 'Checked bag fees of every US airline in 2026',
    intro: 'Pick an airline, the number of bags and travelers: the calculator adds up the round trip from the airline’s own fee table, online or at the counter.',
    resume: (h) => {
      const aa = h.A('american'), dl = h.A('delta'), b6 = h.A('jetblue'), wn = h.A('southwest');
      return `After a round of increases between late March and mid-April 2026, the first checked bag costs ${dl.f('first')} each way on Delta, Southwest, Alaska and Hawaiian, and the second ${dl.f('second')}. American charges the same ${aa.f('first')} for the first bag only when you pay online, ${aa.f('first', 'airport')} at the airport, and ${aa.f('second')} or ${aa.f('second', 'airport')} for the second. JetBlue asks ${b6.f('first')} and ${b6.f('second')} when the bag is added more than a day ahead, ${b6.f('first', 'airport')} and ${b6.f('second', 'airport')} later. United publishes ${h.A('united').f('first')} prepaid for the first bag but shows the others only in a calculator. A third bag is ${aa.f('third')} on most of them and ${wn.f('third')} on Southwest. Frontier and Allegiant set the price flight by flight. Fees are per bag, per traveler and per direction, so a couple with one bag each on Delta pays ${h.m((dl.fees!.first!.online as number) * 4)} for a round trip.`;
    },
    faqs: (h) => {
      const aa = h.A('american'), dl = h.A('delta');
      return [
        { q: 'Which US airline has the cheapest checked bag in 2026?', a: `Among the airlines that publish a fixed table, nobody undercuts ${dl.f('first')} for the first bag: Delta, Southwest, Alaska, Hawaiian, United prepaid, American online and JetBlue in advance all sit at that figure. Frontier and Allegiant can be cheaper or dearer, since they price bags flight by flight; their booking pages show the figure for your date.` },
        { q: 'Are checked bag fees charged each way?', a: `Yes. Every US airline on this site charges per bag, per passenger and per flight direction. A round trip with one bag therefore pays the first-bag fee twice: ${h.m((dl.fees!.first!.online as number) * 2)} on Delta. A connection on the same ticket does not add a fee, because the bag is checked through to the destination.` },
        { q: 'Is it cheaper to pay for checked bags online?', a: `On American and JetBlue, yes. American takes ${h.m((aa.fees!.first!.airport as number) - (aa.fees!.first!.online as number))} off each of the first two bags when paid on its site or app. JetBlue charges less when the bag is added more than 24 hours before departure. Delta, Southwest, Alaska and Hawaiian charge the same amount online and at the counter.` },
        { q: 'Does my old ticket keep the 2026 bag fee from before the increase?', a: 'Yes, as each airline words it: the new fee applies to tickets bought, issued or changed on or after the date announced, and a ticket bought earlier keeps the earlier fee. Delta even keeps a page of previous fees for those tickets. Changing your flight after the date can move you onto the new fee on Southwest, which counts changes too.' },
      ];
    },
    body: (h) => {
      const fixed = h.AIRLINES.filter((a) => a.region === 'us' && !a.dynamic && a.fees);
      const cell = (x: ReturnType<typeof h.A>, k: 'first' | 'second' | 'third') => {
        const o = x.fees?.[k]?.online, ap = x.fees?.[k]?.airport;
        if (o == null && ap == null) return 'not published on the page read';
        if (ap == null || o === ap) return h.m((o ?? ap) as number);
        return `${h.m(o as number)} online, ${h.m(ap)} airport`;
      };
      const rows = fixed.map((a) => { const x = h.A(a.id); return [h.a(a.id, a.name), cell(x, 'first'), cell(x, 'second'), cell(x, 'third'), a.id === 'jetblue' ? `${x.read}; airport prices from an archived copy of the Contract of Carriage` : `${x.read}${a.via === 'wayback' ? ', archived copy' : ''}`]; });
      const sp = h.A('spirit'), f9 = h.A('frontier'), g4 = h.A('allegiant'), ua = h.A('united'), aa = h.A('american');
      const chg: Array<Array<string>> = [
        ['JetBlue', h.date('2026-03-27'), `1st and 2nd bag, within 24 hours of departure`, `${h.m(49)} and ${h.m(69)}`],
        ['United', h.date('2026-04-03'), 'domestic bag fees; Basic Economy carry-on checked in the lobby or at the gate', `carry-on ${h.m(40)}/${h.m(65)} to ${h.m(50)}/${h.m(75)}`],
        ['Delta', h.date('2026-04-08'), '1st and 2nd bag', `${h.m(35)} and ${h.m(45)} to ${h.m(45)} and ${h.m(55)}`],
        ['American', h.date('2026-04-09'), '1st, 2nd and 3rd bag, airport price', `${h.m(40)}, ${h.m(50)}, ${h.m(150)} to ${h.m(50)}, ${h.m(60)}, ${h.m(200)}`],
        ['Southwest', h.date('2026-04-09'), '1st and 2nd bag, US Mainland', `${h.m(35)} and ${h.m(45)} to ${h.m(45)} and ${h.m(55)}`],
        ['Alaska and Hawaiian', h.date('2026-04-10'), '1st, 2nd and 3rd bag, North America', `${h.m(40)}, ${h.m(45)}, ${h.m(150)} to ${h.m(45)}, ${h.m(55)}, ${h.m(200)}`],
        ['JetBlue', h.date('2026-04-17'), '3rd and later bags', `up to ${h.m(200)}`],
        ['American', h.date(aa.basicFees!.from!), 'Basic Economy, 1st and 2nd bag online', `${h.m(aa.basicFees!.first!.online as number)} and ${h.m(aa.basicFees!.second!.online as number)}`],
      ];
      return `<h2>The fee table of each US airline</h2>
<p>Seven US airlines publish their checked bag fees as a fixed table for domestic flights. The figures below are those of the standard economy fare, for a bag within the weight and size limits, each way. Where the airline gives two prices, the first is paid in advance on its website or app and the second at the airport. Where a page could only be read on an archived copy, the date shown is that of the copy.</p>
${h.table(['Airline', '1st bag', '2nd bag', '3rd bag', 'Read on'], rows, 'Domestic US fares, standard economy, each way. Archived copy: the Internet Archive copy of the airline page was read.', ['l', 'l', 'l', 'l', 'l'])}
<p>United is the gap in the table. Its checked bag page, read on an archived copy of ${ua.read}, gives the first bag at ${ua.f('first')} prepaid, ${ua.f('first', 'airport')} in the lobby and ${h.m(75)} at the gate for tickets bought from ${h.date('2026-04-03')}, but the second and third bag fees appear only inside United’s own fee calculator, so they are left blank here rather than guessed. JetBlue’s two prices follow its own logic: the lower one when the bag is added more than 24 hours before departure, the higher one, from the Contract of Carriage, after that.</p>
<h2>Airlines that price bags flight by flight</h2>
<p>${h.a('frontier', 'Frontier')} and ${h.a('allegiant', 'Allegiant')} have no fixed table. Frontier sells bags as extras, at a price that moves with the route and the travel date, and its bag page gives no single figure for a checked bag. Allegiant’s fee page, read on an archived copy of ${g4.read}, gives a range for the carry-on, ${h.m(g4.range![0].min)} to ${h.m(g4.range![0].max)}, but no fixed figure for a checked bag. On both, the only reliable price is the one on the booking screen for your flight. Remember also that their weight limits differ: Frontier’s standard checked bag stops at ${f9.ckW}, ten pounds under the others, and Allegiant accepts larger bags, up to ${g4.ck}.</p>
<p>${h.a('spirit', 'Spirit Airlines')} stopped flying on ${h.date(sp.ceased!)}, according to a ${h.src('houston-spirit', 'Houston Airports press release')}. It is left out of every comparison on this site; its page keeps the last rules it published, for travelers with an old booking or a refund question.</p>
<!--tool:fees|{"airline":"delta","only":"us","bags":2}-->
<h2>What changed in 2026, airline by airline</h2>
<p>Every large US airline moved its bag fees in the spring. In each case the new fee applies according to the date the ticket was bought, issued or, on some airlines, changed. A trip flown in summer on a ticket bought in February kept the old fee.</p>
${h.table(['Airline', 'Tickets from', 'Fee concerned', 'Change'], chg, 'From the “changes” noted on each airline page read for this site.', ['l', 'l', 'l', 'l'])}
<p>Frontier also raised the surcharge for a bag of 51 to 99 pounds from ${h.m(100)} to ${h.m(129)} for bookings from ${h.date('2026-04-04')}; the ${h.a('overweight-baggage-fee', 'overweight fee page')} compares those surcharges.</p>
<h2>Five ways to pay less</h2>
<p>First, pay online where it matters: on American, the saving is per bag and per direction, so four bags on a round trip save four times. Second, fit the trip in a carry-on: on American, Delta, Southwest, Alaska, Hawaiian and JetBlue the carry-on is included on every fare, which makes the checked bag optional for a short trip. Third, share a bag: two travelers with half-empty bags pay two fees, one well-packed bag of 50 pounds pays one. Fourth, think twice about a third bag: at ${aa.f('third')} each way on American, it adds ${h.m((aa.fees!.third!.online as number) * 2)} to a round trip. Fifth, check whether you qualify for a free bag through the airline’s co-branded credit card, elite status or military service; the ${h.a('free-checked-bags', 'free checked bags page')} gives the rules of each airline and the calculator below sets the card’s annual fee against the bags it saves.</p>`;
    },
  },
});
