import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'hawaiian', group: 'us', order: 9, demarche: true,
  tool: { kind: 'fees', props: { airline: 'hawaiian', only: 'us' } },
  mini: { kind: 'mini:bag-hawaiian' },
  related: ['alaska', 'southwest', 'free-checked-bags', 'checked-bag-fees'],
  sources: ['hawaiian-checked', 'hawaiian-carryon'],
  en: {
    slug: 'hawaiian-airlines-baggage-fees', nav: 'Hawaiian Airlines', card: 'Hawaiian Airlines bag fees between the mainland and Hawaii and between the islands, the two co-branded cards, residents and the carry-on.',
    title: 'Hawaiian Airlines Baggage Fees 2026: Interisland, Carry-On',
    description: 'Hawaiian Airlines baggage fees 2026: mainland to Hawaii and interisland prices side by side, the carry-on size, cardholder bags and the Huaka’i resident bags.',
    h1: 'Hawaiian Airlines bag fees, to Hawaii and between the islands',
    intro: 'Pick the bags and the free-bag benefit you hold: the calculator gives the Hawaiian Airlines total on North America routes, one way or return.',
    resume: (h) => {
      const x = h.A('hawaiian');
      return `Hawaiian Airlines has two bag scales. Between Hawaii and North America, on Main Cabin and Saver tickets issued from ${h.date('2026-04-10')}, the first checked bag costs ${x.f('first')}, the second ${x.f('second')} and the third ${x.f('third')}, each way, the same as Alaska Airlines, with which Hawaiian now shares one baggage page. For flights wholly within the state of Hawaii the prices are lower: $30 for the first bag, $40 for the second and $50 for the third. A standard bag weighs up to ${x.ckW} and measures up to ${x.ck}. The carry-on, free on every fare, may measure ${x.co} or 45 linear inches, wheels and handle counted, and a small personal item such as a purse or laptop bag comes with it. Holders of the Hawaiian Airlines version of the co-branded credit card check two bags free on these routes, and Hawaii residents in the Huaka'i program check interisland bags free. Read on ${x.read}.`;
    },
    faqs: (h) => {
      const x = h.A('hawaiian');
      return [
        { q: 'How much does Hawaiian Airlines charge for bags between the islands?', a: 'For flights wholly within Hawaii, the shared Alaska and Hawaiian table lists $30 for the first checked bag, $40 for the second and $50 for the third, each way. A carry-on stays free. Hawaii residents enrolled in the Huaka’i program check interisland bags free, and holders of the Hawaiian Airlines card get two free bags.' },
        { q: 'How many free bags come with the Hawaiian Airlines credit card?', a: 'Two checked bags, for the primary cardmember only, on flights between North America and Hawaii and between the islands. Companions on the reservation are not covered by that card. The Atmos Rewards version of the airline’s co-branded credit card works differently: one free bag for the cardholder and up to six guests on the same reservation.' },
        { q: 'What is the overweight fee on a Hawaiian interisland flight?', a: `Within Hawaii, the table shows $35 per bag for 51 to 70 pounds, $70 per bag for 71 to 100 pounds, and $35 for an oversize bag. Between Hawaii and North America the same bands cost ${h.m(x.overweight![0].fee)}, ${h.m(x.overweight![1].fee)} and ${h.m(x.oversize!.fee)}. Each is charged in addition to the bag fee.` },
      ];
    },
    body: (h) => {
      const x = h.A('hawaiian'), o = x.overweight!;
      const t = h.table(
        ['Each way', 'North America and Hawaii', 'Wholly within Hawaii'],
        [
          ['Carry-on', 'free', 'free'],
          ['First bag', x.f('first'), '$30'],
          ['Second bag', x.f('second'), '$40'],
          ['Third bag', x.f('third'), '$50'],
          ['Fourth bag and more', `${x.f('third')} per bag`, '$50 per bag'],
          [`Overweight ${o[0].fromLb} to ${o[0].toLb} lb`, h.m(o[0].fee), '$35'],
          [`Overweight ${o[1].fromLb} to ${o[1].toLb} lb`, h.m(o[1].fee), '$70'],
          [`Oversize ${x.oversize!.fromLinearIn} to 115 in`, h.m(x.oversize!.fee), '$35'],
        ],
        `Main Cabin and Saver, flights ticketed from ${h.date('2026-04-10')}. Read on the shared Alaska and Hawaiian baggage page on ${x.read}.`,
        ['l', 'r', 'r'],
      );
      return `<h2>Two scales on one page</h2>
<p>Hawaiian now publishes the shared baggage page, and ${h.src('hawaiian-checked', 'Hawaiian’s checked bag page')} carries the same table as Alaska's. Two lines matter to most Hawaiian passengers: the one for travel between Hawaii and North America, and the one for passengers traveling wholly within the state. The second is far cheaper, especially for heavy bags.</p>
${t}
<p>The interisland column applies to passengers whose journey stays wholly within the state; the calculator above uses the North America line, so read the right-hand column for an island-only trip. The old Hawaiian baggage addresses under hawaiianairlines.com/our-services no longer answer, so bookmarks saved before the shared page lead nowhere.</p>
<h2>Who checks bags free</h2>
<p>Hawaiian keeps a benefit that has no Alaska equivalent: the Hawaiian Airlines version of the airline's co-branded credit card gives two free checked bags, for the primary cardmember only, on flights between North America and Hawaii and on interisland flights. The newer Atmos Rewards card works the other way round, with one free bag for the cardholder and up to six guests on the same reservation. A couple traveling together often does better with the second, a solo traveler with heavy luggage with the first.</p>
<!--tool:mini:card-->
<p>Atmos Rewards status, shared by both airlines, adds bags by tier: one for Silver, two for Gold, three for Platinum and Titanium. Hawaii residents can join the Huaka'i program, which makes interisland bags free. Active-duty US military with ID follow the Alaska rule: three free bags of up to 70 pounds.</p>
<h2>Carry-on and personal item</h2>
<p>${h.src('hawaiian-carryon', 'The carry-on page')} allows one piece of carry-on luggage, ${x.co} or 45 linear inches including wheels and handle, free of charge, plus one small personal item such as a purse, briefcase or laptop bag and any medically necessary items. No size is given for the personal item, and no weight for either.</p>
<h2>What the 2026 change did to Hawaiian fares</h2>
<p>The table that applies today covers tickets issued from ${h.date('2026-04-10')}. On the North America line it set the first bag at ${x.f('first')}, the second at ${x.f('second')} and the third at ${x.f('third')}, identical to Alaska's figures for the same date. A ticket issued before that date keeps the amounts in force when it was issued. Because the interisland scale is printed on the same page, it is easy to read the wrong row: check the heading of the row against your route before you pay at a kiosk or online.</p>
<h2>Before an island trip</h2>
<p>Note which flights are interisland and which cross the Pacific, since they are priced on different lines. Check which version of the airline's co-branded card you hold, because one covers the cardholder only and the other the whole reservation. If you live in Hawaii, enroll in Huaka'i before interisland trips. And keep each bag at ${x.ckW}: between the islands an overweight bag costs more than the bag itself.</p>`;
    },
  },
});
