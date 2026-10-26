import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'basic-economy-carry-on', group: 'size', order: 4,
  tool: { kind: 'mini:basic' },
  mini: { kind: 'mini:bag-united' },
  related: ['united', 'american', 'personal-item-size', 'carry-on-size', 'checked-bag-fees'],
  sources: ['united-carryon', 'united-checked', 'american-carryon', 'american-checked', 'delta-carryon', 'southwest-carryon', 'alaska-carryon', 'jetblue-fees'],
  en: {
    slug: 'basic-economy-carry-on', nav: 'Basic economy carry-on', card: 'Which cheapest fares still include an overhead-bin bag, what United charges when they do not, and whether basic still saves once bags are added.',
    title: 'Basic Economy Carry-On 2026: Which Fares Include the Bin Bag',
    description: 'Basic economy carry-on rules of United, American, Delta, Southwest, Alaska and JetBlue in 2026, the United gate fee, and a check of whether basic still saves.',
    h1: 'Basic economy carry-on: is the overhead bin still included?',
    intro: 'Type how much basic saves on your flight and how many bags you take: the calculator says whether it is still the cheaper ticket once the bag fees are added.',
    resume: (h) => {
      const ua = h.A('united'), aa = h.A('american');
      const cf = ua.carryFee!;
      return `On most US airlines the cheapest ticket still includes a full-size carry-on. Delta Main Basic, American Basic Economy, Southwest Basic, Alaska and Hawaiian Saver and JetBlue Main Base all let you bring a carry-on and a personal item, as their bag pages state. United is the exception: on most domestic trips its Basic Economy fare allows the personal item only, and a carry-on brought to the airport must be checked, for ${h.m(cf.online)} in the airport lobby or ${h.m(cf.airport)} at the gate on tickets bought from ${h.date('2026-04-03')}. What basic fares do cost everywhere is the checked bag: American charges Basic Economy ${h.m(5)} more per bag than Main Cabin on tickets issued from ${h.date(aa.basicFees!.from)}. Before choosing basic, add the bag fees to the fare and compare the total with the next fare up.`;
    },
    faqs: (h) => [
      { q: 'Can I bring a carry-on on United Basic Economy?', a: `On most trips no, only the personal item of ${h.A('united').pi}. United's carry-on page lists the exceptions where Basic Economy keeps the carry-on: flights to South America, across the Atlantic and across the Pacific. MileagePlus Premier members, Star Alliance Gold members and primary holders of a qualifying co-branded card are also exempt.` },
      { q: 'Does American Basic Economy include a carry-on?', a: 'Yes. American\'s carry-on page allows one carry-on and one personal item without a Basic Economy exception. What changes on Basic Economy is the price of checked bags: five dollars more per bag than Main Cabin for tickets issued from May 18, 2026, online and at the airport.' },
      { q: 'What happens if I bring a carry-on on United Basic Economy anyway?', a: `It is checked and you pay a fee: ${h.m(h.A('united').carryFee!.online)} if you check it in the airport lobby, ${h.m(h.A('united').carryFee!.airport)} if it is caught at the gate, on tickets bought on or after April 3, 2026. That gate charge is higher than the first checked bag paid online, so a traveler who needs the bag is better off paying for it before arriving.` },
    ],
    body: (h) => {
      const ua = h.A('united'), aa = h.A('american');
      const rows = [
        [h.a('american', 'American'), 'Basic Economy', 'yes', `checked bags ${h.m(5)} more from ${h.date(aa.basicFees!.from)}`],
        [h.a('delta', 'Delta'), 'Main Basic', 'yes', 'no basic surcharge on the fee page read'],
        [h.a('united', 'United'), 'Basic Economy', 'personal item only on most routes', `carry-on checked for ${h.m(ua.carryFee!.online)} lobby, ${h.m(ua.carryFee!.airport)} gate`],
        [h.a('southwest', 'Southwest'), 'Basic', 'yes', 'same bag fees as Choice'],
        [h.a('alaska', 'Alaska'), 'Saver', 'yes', 'same bag fees as Main'],
        [h.a('hawaiian', 'Hawaiian'), 'Saver', 'yes', 'same bag fees as Main'],
        [h.a('jetblue', 'JetBlue'), 'Main Base', 'yes', 'same bag fees'],
      ];
      return `<h2>Basic fare by basic fare</h2>
<p>The names differ from one airline to the next, and so do the rules. The table sums up what each airline's own bag page says about its lowest fare on domestic flights.</p>
${h.table(['Airline', 'Lowest fare', 'Carry-on included', 'Bag cost difference'], rows, 'Read on each airline page; see the airline pages for dates and addresses.', ['l', 'l', 'l', 'l'])}
<h2>Doing the sum before you book</h2>
<p>A basic fare is cheaper only if the fare gap is larger than the extra it causes. On United, a traveler who needs an overhead-bin bag will pay for a checked bag instead, at ${ua.f('first', 'online')} online for the first bag on the page we read. On American, a traveler who checks one bag pays ${h.m(aa.basicFees!.first.online)} online on Basic Economy against ${aa.f('first', 'online')} on Main Cabin. The calculator at the top of the page does the sum for one traveler and one direction; double it for a round trip.</p>
<h2>The United personal item, measured</h2>
<p>Because the United Basic Economy traveler often has nothing else, the ${ua.pi} limit decides the trip. The tool below tests one bag against United's three allowances at once: personal item, carry-on and checked bag. A bag that only passes as a carry-on will cost a fee on that fare.</p>
<!--tool:mini:bag-united-->
<h2>Who is exempt on United</h2>
<p>United's carry-on page lists the travelers who keep the overhead bin on a Basic Economy ticket: MileagePlus Premier members and the companions on their booking, primary holders of a qualifying United co-branded credit card, and Star Alliance Gold members. Routes are an exemption too, since Basic Economy to South America, across the Atlantic and across the Pacific includes the carry-on. Everyone else on a domestic Basic Economy ticket should plan for the personal item only. Status and card benefits also cover checked bags on several airlines, as the ${h.a('free-checked-bags', 'free checked bags page')} details.</p>
<h2>A worked example on American</h2>
<p>Take a round trip where Basic Economy is ${h.m(40)} cheaper each way than Main Cabin, for one traveler with one checked bag paid online. Basic Economy pays ${h.m(aa.basicFees!.first.online)} per direction for the bag against ${aa.f('first', 'online')} on Main Cabin, so the gap shrinks by ${h.m(5)} each way and basic still saves ${h.m(35)} per direction. With two checked bags the difference doubles. The calculator above runs the same sum for your own fare gap.</p>
<h2>Other basic fare restrictions worth knowing</h2>
<p>Bags are only one line in the conditions. When the bins are full, a bag that is included in the fare can still end up in the hold, and the carry-on pages of American and Delta say that on small regional jets a larger bag is checked at the aircraft door free of charge. Seat choice, changes and refunds are restricted in different ways by each airline; those rules are outside this site, so read the fare conditions shown at booking. The bag rules quoted here are those of domestic flights; international basic fares can include more.</p>`;
    },
  },
});
