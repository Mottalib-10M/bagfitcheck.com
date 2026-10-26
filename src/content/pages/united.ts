import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'united', group: 'us', order: 3, demarche: true,
  tool: { kind: 'fees', props: { airline: 'united', only: 'us' } },
  mini: { kind: 'mini:bag-united' },
  related: ['basic-economy-carry-on', 'personal-item-size', 'carry-on-size', 'checked-bag-fees', 'delta'],
  sources: ['united-carryon', 'united-checked'],
  en: {
    slug: 'united-baggage-fees', nav: 'United', card: 'United bag fees from April 2026, the Basic Economy carry-on rule, the 17 by 10 by 9 inch personal item and the free-bag exemptions.',
    title: 'United Baggage Fees 2026: Carry-On Size and Basic Economy',
    description: 'United baggage fees 2026: first bag prepaid, in the lobby or at the gate, the Basic Economy carry-on charge, carry-on and personal item size, free-bag rules.',
    h1: 'United bag fees, carry-on size and the Basic Economy rule',
    intro: 'Choose the bags and the fare: the calculator shows what United charges, and counts the Basic Economy carry-on that has to be checked.',
    resume: (h) => {
      const x = h.A('united'), c = x.carryFee!;
      return `United's checked bag fees start at ${x.f('first', 'online')} for the first bag if you prepay, ${x.f('first', 'airport')} if you pay in the airport lobby and $75 at the gate, for domestic tickets purchased from ${h.date('2026-04-03')}. United writes these as starting prices: the exact fee for a given route, and the fee for a second or third bag, appear only in its online bag-fee calculator, so they are not published on the pages read. The carry-on may measure ${x.co} and the personal item ${x.pi}, a smaller item than on most US airlines. Basic Economy is the catch: on most trips it includes only the personal item, and a carry-on brought to the airport has to be checked for ${h.m(c.online)} in the lobby or ${h.m(c.airport)} at the gate. Checked bags are limited to ${x.ckW} and ${x.ck}. The figures come from an archived copy of United's baggage pages captured on ${x.read}.`;
    },
    faqs: (h) => {
      const x = h.A('united'), c = x.carryFee!;
      return [
        { q: 'Can I take a carry-on on United Basic Economy?', a: `On most trips, no. United Basic Economy includes only a personal item of ${x.pi}. The carry-on is allowed only on routes to South America and on transatlantic and transpacific trips. If you turn up with one elsewhere, it is checked for ${h.m(c.online)} in the lobby or ${h.m(c.airport)} at the gate, for tickets bought from ${h.date('2026-04-03')}.` },
        { q: 'Who is exempt from the United Basic Economy carry-on rule?', a: 'United lists three groups: MileagePlus Premier members and the people traveling with them, primary cardmembers of a qualifying version of the airline’s co-branded credit card, and Star Alliance Gold members. They can bring a full-size carry-on on a Basic Economy ticket. For cardmembers, the wording read names the primary cardmember only.' },
        { q: 'How much is the second checked bag on United?', a: 'United does not print it on its checked bag page. The page gives the starting fee for the first bag and sends travelers to a bag-fee calculator that computes the second, third, overweight and oversize charges for each route. This site does not invent those amounts: run United’s own calculator with your flight before you pay.' },
        { q: 'Will my backpack fit as a United personal item?', a: `Only if it stays within ${x.pi}. United writes the size as 9 by 10 by 17 inches. The 10 inch side is narrower than the 14 inches other US airlines allow, so a typical laptop backpack can fail on width. Enter its three sides in the checker on this page to see whether it passes.` },
      ];
    },
    body: (h) => {
      const x = h.A('united'), c = x.carryFee!;
      const fees = h.table(
        ['What you check', 'Prepaid', 'Airport lobby', 'At the gate'],
        [
          ['First bag (starting price)', x.f('first', 'online'), x.f('first', 'airport'), '$75'],
          ['Basic Economy carry-on that must be checked', 'not offered', h.m(c.online), h.m(c.airport)],
          ['Second and third bag', 'not published', 'not published', 'not published'],
        ],
        `Domestic United Economy, tickets purchased from ${h.date('2026-04-03')}, read on an archived copy captured on ${x.read}.`,
        ['l', 'r', 'r', 'r'],
      );
      return `<h2>Three prices for the same bag</h2>
<p>United ties the fee to the moment you pay. ${h.src('united-checked', 'Its checked bag page')} says that for tickets purchased on or after ${h.date('2026-04-03')}, bag fees start at ${x.f('first', 'online')} prepaid, ${x.f('first', 'airport')} in the lobby and $75 at the gate. The gap between the first and last price is thirty dollars for a single bag, one way. The word "start" matters: some routes cost more, and United shows the real amount only through a calculator on its site that this site could not read. That is why the table leaves the second and third bag blank rather than guessing.</p>
${fees}
<p>The same April change raised the charge for a Basic Economy carry-on that ends up in the hold, from $40 to ${h.m(c.online)} in the lobby and from $65 to ${h.m(c.airport)} at the gate. United's notice also covers flights between the US and Canada, Mexico, the Caribbean and short Latin America routes.</p>
<h2>Basic Economy: the personal item only</h2>
<p>United is the large carrier that keeps the overhead bin closed to its cheapest fare. ${h.src('united-carryon', 'The carry-on page')} allows a Basic Economy passenger one personal item, and a carry-on only on trips to South America and across the Atlantic or the Pacific. On a domestic Basic Economy ticket, plan the trip around a bag that fits under the seat, or price the gap with a standard Economy fare first.</p>
<!--tool:mini:basic-->
<p>Three groups escape the rule: MileagePlus Premier members and those traveling with them, primary cardmembers of a qualifying version of the airline's co-branded credit card, and Star Alliance Gold members. Note the word primary: the wording read names the primary cardmember, and says nothing about other people on that booking.</p>
<h2>A narrow personal item and a standard carry-on</h2>
<p>United's carry-on limit of ${x.co} matches the US norm. The personal item does not. United writes it as 9 by 10 by 17 inches, which is ${x.pi}, with a width of ten inches where American and Frontier allow fourteen. A soft tote compresses; a structured backpack with a laptop sleeve often does not. Measure the bag packed, with straps and side pockets, before relying on it for a Basic Economy trip.</p>
<h2>Weight, size and the bags United refuses</h2>
<p>A standard checked bag stays within ${x.ckW} and either 30 by 20 by 12 inches or ${x.ck} in total, handles and wheels included. Heavier or larger bags pay overweight and oversize charges whose amounts, like the second bag, sit only in United's calculator. Two hard limits are printed: United does not accept bags over 100 pounds, nor bags over 115 inches when the three sides are added.</p>
<h2>Free bags for elite members and the military</h2>
<p>MileagePlus Premier members check bags free, and so do up to nine others on the same itinerary. In economy within the US, Canada, Mexico, the Caribbean and Central America, Silver members get one free bag, Gold two, Platinum and 1K three, each up to 70 pounds. Military members on personal travel check three bags free, within 62 inches and 70 pounds; on orders, five bags of up to 115 inches and 100 pounds. The airline's co-branded credit card also carries bag fee waivers, but the number of bags and companions is not written on the pages read.</p>
<h2>What to look at before booking United</h2>
<p>Check the fare name first: Basic Economy changes what you can carry, not only what you pay. Then check the purchase date, since tickets bought before April 3 keep the old fees. Prepay the first bag rather than paying at the gate, and run United's calculator for a second bag or a heavy one. Last, measure the personal item's width: ten inches is the line that trips most travelers.</p>`;
    },
  },
});
