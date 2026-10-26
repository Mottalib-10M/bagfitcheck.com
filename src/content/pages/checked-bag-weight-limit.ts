import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'checked-bag-weight-limit', group: 'fees', order: 2,
  tool: { kind: 'fit', props: { mode: 'checked', region: 'all', unit: 'in' } },
  mini: { kind: 'mini:weight' },
  related: ['overweight-baggage-fee', 'checked-bag-fees', 'hold-luggage-size', 'frontier', 'easyjet'],
  sources: ['american-checked', 'delta-fees', 'united-checked', 'southwest-checked', 'alaska-checked', 'jetblue-coc', 'frontier-bags', 'allegiant-fees', 'ryanair-terms', 'easyjet-hold', 'easyjet-fees', 'jet2-bags', 'ba-bags', 'wizz-checked', 'tui-luggage', 'va-checked'],
  en: {
    slug: 'checked-bag-weight-limit', nav: 'Checked bag weight', card: 'The 50 lb and 23 kg rules, the airlines that go lower or higher, and the size limit that comes with each weight.',
    title: 'Checked Bag Weight Limit 2026: 50 lb, 23 kg and Exceptions',
    description: 'Checked bag weight limits in 2026: 50 lb and 62 inches on most US airlines, 40 lb on Frontier, and the kilo rules of Ryanair, easyJet, Jet2, BA, TUI, Wizz Air.',
    h1: 'Checked bag weight limit: 50 lb, 23 kg and the airlines that differ',
    intro: 'Enter the size and weight of your suitcase: the checker compares it with the checked bag limit of every airline on this site, in pounds or kilos.',
    resume: (h) => {
      const aa = h.A('american'), f9 = h.A('frontier'), g4 = h.A('allegiant'), u2 = h.A('easyjet'), ba = h.A('british-airways'), ls = h.A('jet2');
      return `On American, Delta, United, Southwest, Alaska and Hawaiian, a standard checked bag may weigh up to ${aa.ckW} and measure ${aa.ck} in total, length plus width plus height. JetBlue sets the line just below 51 pounds, which comes to the same thing. Frontier is the outlier at ${f9.ckW}: a bag of 41 to 50 pounds already pays a surcharge there. Allegiant keeps 50 pounds but accepts a larger case, up to ${g4.ck}. UK and European airlines count in kilos and often sell the weight itself: Ryanair offers 10, 20 or 23 kg bags, easyJet bags of 15 to 32 kg, Wizz Air 10 to 32 kg. Jet2 sells bags of ${ls.ckW}, British Airways ${ba.ckW} in Economy, and TUI 20 or 25 kg depending on the holiday. Among the UK airlines the heaviest bag you can book is ${u2.ckW}, on easyJet, Wizz Air and in British Airways Business, and Ryanair carries no single item above that weight.`;
    },
    faqs: (h) => {
      const f9 = h.A('frontier');
      return [
        { q: 'Is 50 pounds the same as 23 kilos for a checked bag?', a: 'Almost. Fifty pounds is 22.7 kg, and airlines that publish both write 50 lb and 23 kg side by side, as American and Delta do. A bag weighed at 23.0 kg on a European scale is 50.7 pounds, which a strict US agent could treat as overweight. Aim for 22.5 kg or 49 pounds on your own scale to keep a margin.' },
        { q: 'Why is the Frontier checked bag limit lower than other airlines?', a: `Frontier writes its standard checked bag as 62 linear inches and up to ${f9.ckW}, ten pounds under the usual US figure. A bag of 41 to 50 pounds is accepted but pays ${h.m(f9.overweight![0].fee)} per bag and per direction on top of the bag price. Pack to 40 pounds on Frontier, or move the heavy items into a second bag.` },
        { q: 'Can a checked bag weigh 70 pounds?', a: 'Only in certain cases. Delta One and Delta First allow 70 pounds per bag, United gives 70 pounds to its Premier members, and United, Alaska and Hawaiian accept 70 pounds for active-duty military travel. In the UK, easyJet and Wizz Air sell bags up to 32 kg, about 70 pounds. Other travelers on US airlines pay a surcharge from 51 pounds, or 41 on Frontier.' },
        { q: 'Is the hold bag weight limit per bag or per passenger in the UK?', a: 'Mostly per bag. Jet2 allows up to three 22 kg bags per person on each flight and Ryanair up to three 20 kg bags, and each bag must meet its own limit, so spare kilos in one cannot cover extra weight in another. TUI is the exception: its page states the allowance as 20 kg of luggage per person on most packages, with no single bag over 25 kg.' },
      ];
    },
    body: (h) => {
      const us = h.AIRLINES.filter((a) => a.region === 'us'), uk = h.AIRLINES.filter((a) => a.region === 'uk');
      const usRows = us.map((a) => { const x = h.A(a.id); return [h.a(a.id, a.name), a.id === 'jetblue' ? 'less than 51 lb' : x.ckW, x.ck]; });
      const ukRows = uk.map((a) => { const x = h.A(a.id); return [h.a(a.id, a.name) + (a.unconfirmed ? ` (archived copy of ${x.read})` : ''), x.ckW, x.ck, a.checked?.note ?? '']; });
      const va = h.A('virgin-atlantic');
      return `<h2>US airlines: 50 pounds, with two exceptions</h2>
<p>The standard US checked bag is a combination of two limits: a weight and a total size in linear inches. Both apply. A bag of 45 pounds that measures 64 linear inches is oversize, and a compact bag that weighs 52 pounds is overweight; each triggers its own surcharge.</p>
${h.table(['Airline', 'Weight per bag', 'Size per bag'], usRows, 'Standard economy, domestic flights, as published on each airline’s checked bag page.', ['l', 'l', 'l'])}
<p>The two exceptions are worth remembering. ${h.a('frontier', 'Frontier')} counts its limit at 40 pounds, so a bag packed for another airline is often overweight there. ${h.a('allegiant', 'Allegiant')} keeps 50 pounds but takes a bigger case than anyone else, which helps with sports gear and bulky items. Premium cabins and status can raise the weight: Delta One and Delta First passengers get 70 pounds per bag, and United Premier members 70 pounds as well.</p>
<h2>UK and European airlines: you buy the kilos</h2>
<p>Low-cost airlines in the UK and Europe do not sell one standard bag. They sell a weight, and the price climbs with it. The kilos you book are the limit that counts at the bag drop, not the maximum the airline can take.</p>
${h.table(['Airline', 'Largest bag', 'Size', 'What the airline offers'], ukRows, `Read on each airline’s hold baggage page. Virgin Atlantic figures come from an archived copy of ${va.read} and have not been confirmed for 2026.`, ['l', 'l', 'l', 'l'])}
<p>On ${h.a('ryanair', 'Ryanair')}, the 10 kg check-in bag, the 20 kg bag and the 23 kg bag are three different products, and nothing over 32 kg is carried at all. ${h.a('easyjet', 'easyJet')} lets you book 15, 23, 26, 29 or 32 kg, and its fee page lists extra weight on a pre-booked bag at up to £15 per 3 kg when added in advance, far below the airport rate. ${h.a('british-airways', 'British Airways')} gives 23 kg in Economy and Premium Economy and 32 kg in Business and First, but no hold bag at all on Economy Basic. ${h.a('tui', 'TUI')} sets 20 kg on most packages and 25 kg on certain holiday types, and refuses any single bag over 25 kg. The ${h.a('hold-luggage-size', 'hold luggage page')} compares the sizes in detail.</p>
<h2>How to weigh a bag at home</h2>
<p>A hanging luggage scale is the most accurate tool: hook it to the handle, lift until the bag is off the floor and hold it still for a second. Without one, use a bathroom scale. Weigh yourself, then weigh yourself holding the bag, and subtract. Do it twice, because bathroom scales drift by a pound or so, and keep a margin of at least one pound or half a kilo below the limit, since the airline’s scale is the one that decides.</p>
<p>The checker above takes pounds or kilos. The converter below turns a reading in kilos into pounds and shows the margin to 50 lb and to 23 kg at once.</p>
<!--tool:mini:weight-->
<h2>When the bag is too heavy at home</h2>
<p>Before leaving, you have four options. Move dense items, such as shoes, books, chargers and toiletries, into your carry-on, keeping in mind the liquids rule. Wear the heaviest clothes and shoes. Split the load into a second checked bag, which on US airlines usually costs less than the overweight charge on the first. Or, on the UK low-cost airlines, upgrade to the next weight band online before the flight, which is cheaper than paying per kilo at the airport. The ${h.a('overweight-baggage-fee', 'overweight fee page')} gives each surcharge, and the ${h.a('checked-bag-fees', 'bag fee comparison')} the price of a second bag.</p>`;
    },
  },
});
