import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'spirit', group: 'us', order: 10, demarche: true,
  tool: { kind: 'fit', props: { mode: 'personal', region: 'us', unit: 'in' } },
  related: ['personal-item-size', 'frontier', 'allegiant', 'personal-item-vs-carry-on'],
  sources: ['houston-spirit', 'spirit-bags', 'spirit-coc'],
  en: {
    slug: 'spirit-airlines-baggage', nav: 'Spirit (ceased)', card: 'Spirit Airlines stopped flying on May 2, 2026. Its last published bag sizes, and where the same personal item travels free today.',
    title: 'Spirit Baggage Fees and Personal Item Size: 2026 Status',
    description: 'Spirit Airlines wound down its operations on May 2, 2026. Its last published personal item, carry-on and checked bag limits, and which airlines take that bag.',
    h1: 'Spirit Airlines baggage: the airline no longer flies',
    intro: 'Spirit Airlines ceased operations on May 2, 2026. Enter the size of your old Spirit personal item: the checker shows which airlines still flying accept it under the seat.',
    resume: (h) => {
      const x = h.A('spirit');
      return `Spirit Airlines no longer operates flights. A press release from Houston Airports dated ${h.date('2026-05-02')} states that, effective immediately on that day, Spirit Airlines ordered a wind-down of its operations, and that all Spirit flights have been canceled. There are therefore no Spirit bag fees to pay in 2026. For travelers who bought luggage to Spirit's rules, the last published limits remain useful. On an archived copy of Spirit's Contract of Carriage, updated as of ${h.date('2026-04-30')} and captured on ${x.read}, the free personal item was ${x.pi} and the carry-on, sold separately on the Value option, was ${x.co}, handles and wheels included. An archived copy of Spirit's Bag Info page, captured on ${h.date('2026-05-02')}, gave the checked bag as ${x.ckW} and ${x.ck}. A bag built to that personal item size fits under the seat on several airlines still flying, which the checker above shows bag by bag.`;
    },
    faqs: (h) => {
      const x = h.A('spirit');
      return [
        { q: 'Is Spirit Airlines still flying in 2026?', a: `No. Houston Airports announced on ${h.date('2026-05-02')} that Spirit Airlines had ordered a wind-down of its operations effective immediately, and that all Spirit flights had been canceled. This site reports only what that release says; for anything about an existing booking, refer to official notices rather than to a bag-size site.` },
        { q: 'Will my old Spirit personal item fit on other airlines?', a: `Spirit's last published personal item was ${x.pi}. American, Frontier and Allegiant publish exactly the same limit, so it fits there under the seat. JetBlue and United publish smaller items, and the bag is too wide for United's ten inch width. Enter its sides in the checker at the top to see each airline.` },
        { q: 'Was the Spirit carry-on bigger than on other airlines?', a: `Its last published limit was ${x.co}, deeper and wider than the 22 by 14 by 9 inches of American, Delta or United. At 18 inches, its width is also over the 16 inches allowed by Southwest, Frontier and Allegiant, the most generous limits still published. A bag cut to the full Spirit size can therefore be refused in the bin on every US airline on this site.` },
      ];
    },
    body: (h) => {
      const x = h.A('spirit');
      const fit = (lim: number[] | undefined, bag: number[]) => {
        if (!lim) return 'no published size';
        const a = [...lim].sort((p, q) => q - p), b = [...bag].sort((p, q) => q - p);
        return b.every((v, i) => v <= a[i]) ? 'fits' : 'too big';
      };
      const piIn = x.personal!.in!, coIn = x.carry!.in!;
      const rows = h.AIRLINES.filter((a) => a.region === 'us').map((a) => {
        const y = h.A(a.id);
        return [h.a(a.id, a.name), a.personal?.in ? y.pi : 'no published size', fit(a.personal?.in, piIn), fit(a.carry?.in, coIn)];
      });
      const t = h.table(
        ['Airline', 'Its personal item limit', 'Spirit personal item under the seat', 'Full-size Spirit carry-on in the bin'],
        rows,
        'Comparison computed from each airline’s own published limits on this site.',
        ['l', 'l', 'l', 'l'],
      );
      return `<h2>What happened on May 2, 2026</h2>
<p>The source for this page is a ${h.src('houston-spirit', 'press release from Houston Airports')} about Bush Airport. It says: "Effective immediately, May 2, 2026, Spirit Airlines ordered a wind-down of its operations." It adds that "All Spirit flights have been canceled". This site has no other official statement to report, and it does not comment on what may happen next. Spirit's own websites did not respond when this page was prepared, which is why the bag rules below come from archived copies.</p>
<h2>Spirit's last published bag rules</h2>
<p>Two archived documents give the final rules. The ${h.src('spirit-coc', 'Contract of Carriage')}, in its version updated as of ${h.date('2026-04-30')} and captured by the Internet Archive on ${x.read}, defined the free personal item as no larger than ${x.pi}, handles and wheels included, and the carry-on as no larger than ${x.co}. The ${h.src('spirit-bags', 'Bag Info support article')}, captured on ${h.date('2026-05-02')}, set the checked bag at a maximum of ${x.ck} and ${x.ckW}, with overweight charges from 51 pounds. On the Value travel option, no carry-on was included but one could be bought; Premium Economy and Spirit First options included one. Bag prices were set per flight at booking, and no fixed fee table was readable on the archived pages, so this site lists none.</p>
<p>The same contract granted service members with valid military ID, and an accompanying spouse or children, one free standard carry-on and two free standard checked bags. These rules are of historical interest only now that the flights are canceled.</p>
<h2>Your Spirit-size bag on the airlines still flying</h2>
<p>Many travelers own a bag cut exactly to Spirit's personal item size. It remains a good under-seat bag. The table compares it, and the full Spirit carry-on, with the limits each US airline on this site publishes today.</p>
${t}
<p>The Spirit personal item matches the published limit of ${h.a('american', 'American')}, ${h.a('frontier', 'Frontier')} and ${h.a('allegiant', 'Allegiant')} exactly. Delta, Southwest, Alaska and Hawaiian publish no personal item size, only that it must fit under the seat, so the table cannot give a verdict for them. The full Spirit carry-on is a different story: its 18 inch width exceeds the 14 inches of the network airlines and even the 16 inches of ${h.a('southwest', 'Southwest')}, Frontier and Allegiant. On the limits published today, it is a checked bag everywhere, or a bag to retire from cabin use.</p>
<h2>What to check on your next booking</h2>
<p>Read the bag rules of the airline you now fly, since the free allowance varies far more than the sizes. On the low-cost carriers, only the personal item is free; on the network airlines, a carry-on is included on most fares. Measure the old Spirit bags with wheels and handles, enter them in the checker, and pick the airline pages linked above for current fees.</p>`;
    },
  },
});
