import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'overweight-baggage-fee', group: 'fees', order: 3,
  tool: { kind: 'mini:overweight' },
  mini: { kind: 'mini:excess' },
  related: ['checked-bag-weight-limit', 'checked-bag-fees', 'hold-luggage-size', 'american', 'frontier'],
  sources: ['american-over', 'delta-excess', 'united-checked', 'southwest-checked', 'alaska-checked', 'hawaiian-checked', 'jetblue-fees', 'frontier-bags', 'allegiant-fees', 'ryanair-fees', 'easyjet-fees', 'wizz-checked', 'tui-luggage'],
  en: {
    slug: 'overweight-baggage-fee', nav: 'Overweight bag fees', card: 'What a bag over 50 lb or over the booked kilos costs on each airline, the oversize charge, and how to avoid both.',
    title: 'Overweight Baggage Fee 2026: 51 to 70 lb and Up, by Airline',
    description: 'Overweight bag fees in 2026: $100 for 51 to 70 lb on most US airlines, the bands of American, JetBlue, Frontier, Allegiant, oversize charges and UK kilo rates.',
    h1: 'Overweight baggage fees by airline, and what oversize costs',
    intro: 'Choose an airline and enter the weight and size of your bag: the calculator gives the surcharge on top of the normal bag fee, each way.',
    resume: (h) => {
      const dl = h.A('delta'), aa = h.A('american'), b6 = h.A('jetblue'), f9 = h.A('frontier'), g4 = h.A('allegiant');
      return `A checked bag over 50 pounds pays a surcharge on top of the normal bag fee, each way. On Delta, Southwest, Alaska and Hawaiian it is ${h.m(dl.overweight![0].fee)} from 51 to 70 pounds and ${h.m(dl.overweight![1].fee)} above that, with 100 pounds as the ceiling. American splits the first band: ${h.m(aa.overweight![0].fee)} for a bag just over the limit, up to 53 pounds, then ${h.m(aa.overweight![1].fee)} to 70 pounds and ${h.m(aa.overweight![2].fee)} beyond. JetBlue charges a flat ${h.m(b6.overweight![0].fee)} from 51 to 99 pounds. Frontier starts earlier, at 41 pounds, with ${h.m(f9.overweight![0].fee)}, then ${h.m(f9.overweight![1].fee)} from 51 pounds. Allegiant is the cheapest at ${h.m(g4.overweight![0].fee)} and ${h.m(g4.overweight![1].fee)}. Oversize bags, over 62 linear inches on most airlines, pay a separate charge, often ${h.m(dl.oversize!.fee)}. UK airlines charge by the kilo at the airport instead: ${h.m((h.A('ryanair') as any).excess.amount, 'GBP')} on Ryanair, ${h.m((h.A('easyjet') as any).excess.amount, 'GBP')} on easyJet, per kilo over what you booked.`;
    },
    faqs: (h) => {
      const aa = h.A('american'), dl = h.A('delta');
      const first = aa.fees!.first!.airport as number;
      return [
        { q: 'How much does a 55 pound bag cost on American Airlines?', a: `At the airport, the first bag fee of ${h.m(first)} plus the ${h.m(aa.overweight![1].fee)} surcharge for 54 to 70 pounds, so ${h.m(first + aa.overweight![1].fee)} each way and ${h.m((first + aa.overweight![1].fee) * 2)} for a round trip. Taking two pounds out would put it in the ${h.m(aa.overweight![0].fee)} band for 51 to 53 pounds, and five pounds out would remove the surcharge altogether.` },
        { q: 'Is it cheaper to check two bags than one overweight bag?', a: `Usually, yes. On Delta, a second bag costs ${dl.f('second')} each way, while one bag between 51 and 70 pounds pays a ${h.m(dl.overweight![0].fee)} surcharge on top of the first bag fee. Splitting a 70 pound load into two bags of 35 pounds saves ${h.m(dl.overweight![0].fee - (dl.fees!.second!.online as number))} each way, as long as you have a second bag to put it in.` },
        { q: 'Do I pay both the overweight and the oversize fee?', a: 'It depends on the airline. American’s page says it applies only the higher of the two when a bag is both too heavy and too big. Other airlines list the two charges separately without saying whether they combine, so expect to be asked for both and check with the airline before flying with a bag that breaks both limits.' },
        { q: 'What is the heaviest bag an airline will accept?', a: 'On the US airlines on this site, 100 pounds is the ceiling: Delta, United, Southwest, Alaska, Hawaiian and Allegiant refuse anything heavier, and JetBlue and Frontier stop just under 100. In the UK, 32 kg is the most easyJet, Ryanair and Wizz Air accept for a single item, and TUI stops at 25 kg. Anything heavier has to be split into two bags.' },
      ];
    },
    body: (h) => {
      const over = h.AIRLINES.filter((a) => (a.overweight?.length ?? 0) > 0);
      const rows = over.map((a) => {
        const x = h.A(a.id);
        const bands = a.overweight!.map((b) => `${b.fromLb} to ${b.toLb} lb: ${h.m(b.fee)}`).join('<br>');
        const ov = a.oversize?.bands ? a.oversize.bands.map((b) => `${b.fromLinearIn} to ${b.toLinearIn} in: ${h.m(b.fee)}`).join('; ') : a.oversize ? `from ${a.oversize.fromLinearIn} linear in: ${h.m(a.oversize.fee)}` : 'not published';
        return [h.a(a.id, a.name), bands, ov, a.id === 'jetblue' ? x.read : a.id === 'american' ? `${h.date(h.P.sources['american-over'].label.en.match(/captured on (\d{4}-\d{2}-\d{2})/)![1])}, archived copy` : `${x.read}${a.via === 'wayback' ? ', archived copy' : ''}`];
      });
      const uk = h.AIRLINES.filter((a) => a.region === 'uk' && !a.unconfirmed).map((a) => {
        const e = (a as any).excess;
        const cur = e?.currency === 'EUR' ? 'EUR' : 'GBP';
        const rate = !e ? 'no per-kilo rate on the pages read' : e.amount != null ? `${h.m(e.amount, cur)} per kg` : `${h.m(e.shortMidHaul, cur)} per kg short and mid-haul, ${h.m(e.longHaul, cur)} long-haul`;
        return [h.a(a.id, a.name), rate, e?.where ?? ''];
      });
      const ua = h.A('united'), f9 = h.A('frontier');
      return `<h2>Overweight and oversize charges of the US airlines</h2>
<p>Each figure below is a surcharge added to the normal checked bag fee, per bag and per direction. The weight bands are written as each airline publishes them; where the airline says "over 50 up to 53 pounds", the table reads it as 51 to 53.</p>
${h.table(['Airline', 'Overweight bands', 'Oversize', 'Read on'], rows, 'Domestic US flights. Archived copy: the Internet Archive copy of the airline page was read.', ['l', 'l', 'l', 'l'])}
<p>${h.a('united', 'United')} is missing from the table. Its checked bag page, read on an archived copy of ${ua.read}, shows overweight and oversize amounts only inside its own fee calculator; the page itself states only that bags over 100 pounds are not accepted. ${h.a('frontier', 'Frontier')} raised its charge for 51 to 99 pounds from ${h.m(100)} to ${h.m(129)} for bookings made from ${h.date('2026-04-04')}, while its band for 41 to 50 pounds stays at ${h.m(f9.overweight![0].fee)}. Spirit, which also charged from 51 pounds, stopped flying in May 2026 and is left out.</p>
<h2>How the bill adds up on a real trip</h2>
<p>The calculator above gives the charge for one bag in one direction. A round trip doubles it, and every overweight bag of every traveler counts separately. Two travelers on Delta with one 60 pound bag each pay ${h.m(h.A('delta').overweight![0].fee)} four times in surcharges, ${h.m(h.A('delta').overweight![0].fee * 4)}, on top of ${h.m((h.A('delta').fees!.first!.online as number) * 4)} in first-bag fees. Bags that are free thanks to status, a co-branded card or military service may still pay the overweight charge: the free-bag benefit usually covers the standard bag, and only some programs, such as Frontier’s for military travelers and Alaska’s for military travel on orders, also waive the excess charges.</p>
<h2>UK airlines: priced by the kilo</h2>
<p>In the UK, the weight you book is the limit, and every kilo above it is charged at the bag drop. The rates below are the airport prices published on each airline’s fee page.</p>
${h.table(['Airline', 'Rate at the airport', 'Where it applies'], uk, 'Read on each airline’s fee or luggage page. Ryanair writes its rate as €/£13, payable in the currency of the departure airport.', ['l', 'l', 'l'])}
<p>The cheaper route is almost always to book the weight in advance. ${h.a('easyjet', 'easyJet')}, for example, sells additional weight on a pre-booked bag at up to £15 per 3 kg before the flight, against £12 for each single kilo at the airport. ${h.a('ryanair', 'Ryanair')} and ${h.a('wizz-air', 'Wizz Air')} sell heavier bag bands at booking. The calculator below gives the airport bill for the kilos over your allowance.</p>
<h2>Repacking at the counter, and before</h2>
<p>A bag that is two or three pounds over is the most expensive mistake in this table, because the whole surcharge applies to a weight you could carry in your hands. Before leaving home, weigh the bag and keep a margin of a pound or half a kilo. At the airport, if the scale shows a small excess, step aside and move the heavy items: shoes, books, a laptop charger, toiletries in travel sizes. They can go into your carry-on or personal item, within the cabin limits and the liquids rule, or be worn. If you travel with someone whose bag is light, even out the two bags before you reach the desk. The ${h.a('checked-bag-weight-limit', 'weight limit page')} explains how to weigh a bag accurately at home.</p>`;
    },
  },
});
