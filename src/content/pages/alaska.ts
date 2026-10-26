import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'alaska', group: 'us', order: 5, demarche: true,
  tool: { kind: 'fees', props: { airline: 'alaska', only: 'us' } },
  mini: { kind: 'mini:bag-alaska' },
  related: ['hawaiian', 'free-checked-bags', 'checked-bag-fees', 'carry-on-size', 'checked-bag-weight-limit'],
  sources: ['alaska-checked', 'alaska-carryon', 'alaska-card'],
  en: {
    slug: 'alaska-airlines-baggage-fees', nav: 'Alaska Airlines', card: 'Alaska Airlines bag fees from April 10, 2026, the Saver fare, Atmos status, the card for up to six guests and the military allowance.',
    title: 'Alaska Airlines Baggage Fees 2026: Carry-On and Bag Rules',
    description: 'Alaska Airlines baggage fees 2026: the April 10 table, Saver fares, carry-on size, overweight bands, and free bags with the card, Atmos status or military ID.',
    h1: 'Alaska Airlines bag fees and carry-on rules',
    intro: 'Choose the bags and any free-bag benefit: the calculator gives the Alaska Airlines total for your group, one way or return.',
    resume: (h) => {
      const x = h.A('alaska');
      return `For flights ticketed from ${h.date('2026-04-10')}, Alaska Airlines charges ${x.f('first')} for the first checked bag, ${x.f('second')} for the second and ${x.f('third')} for the third and each one after, each way, on Main Cabin and Saver fares in North America. There is no longer a cheaper price for paying ahead: the five dollar prepay discount of the old table is gone. A standard bag may weigh ${x.ckW} and measure ${x.ck}. The carry-on is free on every fare, Saver included, within ${x.co} or 45 linear inches, wheels and handle counted, and you may add a small personal item such as a purse, briefcase or laptop bag, for which Alaska gives no dimensions. Hawaiian Airlines now publishes exactly the same table. Many travelers pay nothing: the airline's co-branded credit card covers one bag for the cardholder and up to six guests. Figures read on Alaska's pages on ${x.read}.`;
    },
    faqs: (h) => {
      const x = h.A('alaska');
      return [
        { q: 'Does the Alaska Airlines Saver fare include a carry-on?', a: `Yes. Alaska's fee table shows the carry-on as free for every type of traveler, Saver fares included. The bag must stay within ${x.co} or 45 linear inches, wheels and handle counted. Saver passengers pay the same checked bag fees as Main Cabin: ${x.f('first')} for the first bag and ${x.f('second')} for the second.` },
        { q: 'How many guests get a free bag with the Alaska Airlines credit card?', a: 'The cardholder and up to six guests traveling on the same reservation each check one bag free, so seven people in all. Alaska’s card page sets one condition: the airfare must be bought with the card. A companion booked on a separate reservation does not share the benefit.' },
        { q: 'Is there still a prepay discount on Alaska Airlines bags?', a: `No. Before ${h.date('2026-04-10')}, the first bag cost $40, or $35 when paid ahead. The table for flights ticketed from that date shows a single price of ${x.f('first')} and no prepay line. Paying in advance still saves time at the airport, but not money.` },
        { q: 'How many free bags do military members get on Alaska Airlines?', a: 'Active-duty US military with ID check the first three bags free on leisure travel, each up to 70 pounds, and can bring up to five bags at 70 pounds. Traveling with orders, overweight and oversize charges are also waived on up to five bags. The rule is shared with Hawaiian Airlines.' },
      ];
    },
    body: (h) => {
      const x = h.A('alaska'), o = x.overweight!;
      const t = h.table(
        ['Item', 'Before April 10, 2026', 'Ticketed from April 10, 2026'],
        [
          ['Carry-on', 'free', 'free'],
          ['First bag', '$40 ($35 prepaid)', x.f('first')],
          ['Second bag', '$45', x.f('second')],
          ['Third bag and more, each', '$150', x.f('third')],
          [`Overweight, ${o[0].fromLb} to ${o[0].toLb} lb`, 'not listed', h.m(o[0].fee)],
          [`Overweight, ${o[1].fromLb} to ${o[1].toLb} lb`, 'not listed', h.m(o[1].fee)],
          [`Oversize, ${x.oversize!.fromLinearIn} to 115 in`, 'not listed', h.m(x.oversize!.fee)],
        ],
        `North America, Main Cabin and Saver, each way. Current column read on ${x.read}.`,
        ['l', 'r', 'r'],
      );
      return `<h2>The April 2026 table, line by line</h2>
<p>${h.src('alaska-checked', 'The checked baggage page')} is shared by Alaska Airlines and Hawaiian Airlines and shows one table for both. For tickets issued from ${h.date('2026-04-10')}, every line moved up, and the cheaper prepaid price disappeared. The left column shows the previous fees, so you can see what a trip booked earlier still pays.</p>
${t}
<p>The overweight and oversize charges add to the bag fee. A first bag of 60 pounds therefore costs ${h.m((x.fees!.first!.online as number) + o[0].fee)} each way. Within Hawaii the scale is lower, with a first bag at $30; ${h.a('hawaiian', 'the Hawaiian Airlines page')} sets out those interisland prices in full.</p>
<!--tool:mini:overweight-->
<h2>Three ways to check a bag for nothing</h2>
<p>The airline's co-branded credit card gives one free checked bag to the cardholder and to up to six guests on the same reservation, as ${h.src('alaska-card', 'the card FAQ')} explains, as long as the fare was paid with the card. For a family of four on a return trip, that is eight first-bag fees avoided.</p>
<!--tool:mini:card-->
<p>Status in Atmos Rewards, the program Alaska now shares with Hawaiian, works by tier. Silver members, and oneworld Ruby members from partner airlines, get one free bag; Gold and oneworld Sapphire two; Platinum, Titanium and oneworld Emerald three. The benefit follows the member's number, so add it to the booking before the trip.</p>
<p>Active-duty US military members with ID have a generous allowance: three free bags of up to 70 pounds on leisure travel, and up to five at 70 pounds. On orders, the overweight and oversize charges are waived too, on up to five bags.</p>
<h2>Carry-on and personal item</h2>
<p>${h.src('alaska-carryon', 'The carry-on page')} allows one piece of carry-on sized luggage, ${x.co} or 45 linear inches, free of charge, plus one small personal item such as a purse, briefcase or laptop bag, and any medically necessary items. Alaska prints no size for the personal item and no weight for either bag. The 45 inch figure is simply the three sides added up, so a bag of exactly 22 by 14 by 9 inches sits right on it.</p>
<h2>One policy for two airlines</h2>
<p>Alaska and Hawaiian now publish the same baggage page under both names, with identical fees, weight bands and carry-on rules. In practice, a trip that mixes the two brands follows one set of numbers on the North America line, and the free-bag benefits of Atmos Rewards status apply on both. The only line that differs in price is travel wholly within Hawaii, which has its own lower scale. Whichever brand prints the ticket, the standard bag still stops at ${x.ckW}.</p>
<h2>Before you fly Alaska</h2>
<p>Look at the ticketing date; a ticket from before ${h.date('2026-04-10')} stays on the old table. Book the whole party on one reservation paid with the card if someone holds it. Add each member's Atmos number for status bags. And if part of the trip is within Hawaii, check the interisland line, which is priced separately.</p>`;
    },
  },
});
