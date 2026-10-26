import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const V = (h: Helpers) => h.A('virgin-atlantic');
const short = (s: string) => s.split(' (')[0];
/** Capture dates of the two archived Virgin Atlantic pages (params-2026.json source labels). */
const HAND_CAPTURE = '2025-05-29';
/** Upper Class hand baggage on the archived page: two pieces, 12 kg each, 16 kg together. */
const UPPER = { pieces: 2, kgEach: 12, kgTotal: 16 };

export default definePage({
  id: 'virgin-atlantic', group: 'uk', order: 7, demarche: true,
  tool: { kind: 'fit', props: { mode: 'carry', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:bag-virgin-atlantic' },
  related: ['british-airways', 'hand-luggage-size', 'hold-luggage-size', 'carry-on-size', 'power-bank-on-plane'],
  sources: ['va-hand', 'va-checked', 'caa-packright'],
  en: {
    slug: 'virgin-atlantic-baggage', nav: 'Virgin Atlantic', card: 'The last Virgin Atlantic hand and hold limits we could read, from archived copies of mid-2025, clearly dated, with what to check before flying.',
    title: 'Virgin Atlantic Baggage Allowance 2026: Last Published Sizes',
    description: 'Virgin Atlantic baggage allowance for 2026 trips: the 56 × 36 × 23 cm hand bag, 23 kg hold bag and cabin rules, from the last copy we could read, of June 2025.',
    h1: 'Virgin Atlantic baggage allowance: the last published limits',
    intro: 'Type the sides of your bag to compare it with the last Virgin Atlantic hand baggage limit we could read; check the airline’s own page before you fly.',
    resume: (h) => {
      const x = V(h);
      return `Virgin Atlantic’s current help pages cannot be read automatically, so the figures here are the last published figures we could read, from an archived copy of ${x.read}; check the airline’s page before you fly. On that copy, hand baggage was included on every ticket. In Economy, whether Light, Classic or Delight, and in Premium, each passenger could take one piece of up to ${x.co} weighing up to ${x.coW}. Upper Class passengers could take two pieces of ${UPPER.kgEach} kg each, ${UPPER.kgTotal} kg together. No separate under-seat item was described. In the hold, Economy Classic and Delight included one bag of up to ${x.ckW} and ${x.ck}; Upper Class included two bags of 32 kg each; Economy Light included no checked bag. At ${short(x.co)}, that hand bag is narrower than the 56 × 45 × 25 cm cabin bag of easyJet or British Airways, so a case that suits them can be too wide for Virgin Atlantic.`;
    },
    faqs: (h) => {
      const x = V(h);
      return [
        { q: 'Why are the Virgin Atlantic figures on this page from 2025?', a: `Virgin Atlantic moved its help centre to pages that build their text in the browser, and they return nothing to an automated reader; the old addresses redirect there. The latest archived copies holding the baggage text date from ${h.date(HAND_CAPTURE)} and ${x.read}. We show them dated rather than present them as current, and the airline’s live page is the one to trust.` },
        { q: 'Does Virgin Atlantic Economy Light include a checked bag?', a: 'Not on the archived copy we read, dated June 28, 2025: Economy Light included hand baggage but no checked bag, while Economy Classic and Delight included one. A bag could be added to a Light ticket at a price listed on that page. Fares and prices may have changed since, so look at the baggage section of your own booking before you buy.' },
        { q: 'Is the Virgin Atlantic hand bag smaller than the usual UK size?', a: `On the last copy we could read, yes, in width. Virgin Atlantic gave ${short(x.co)}, against 56 × 45 × 25 cm on British Airways, easyJet and Jet2. The height is the same, but a bag 45 cm wide is nine centimetres too wide for that limit. Check the width first if you fly Virgin Atlantic with luggage bought for another airline.` },
      ];
    },
    body: (h) => {
      const x = V(h), b = h.P.rules.batteries;
      return `<h2>Read this first: the date of the figures</h2>
<p>Every figure on this page comes from archived copies of Virgin Atlantic’s help centre: ${h.src('va-hand', 'the hand baggage page')}, captured on ${h.date(HAND_CAPTURE)}, and ${h.src('va-checked', 'the check-in baggage page')}, captured on ${x.read}. The airline’s current help pages build their text in the browser and could not be read by our checks, and no archived copy from 2026 holds the baggage text. These are therefore the last published figures we could read, not a confirmed 2026 allowance. Check the airline’s page, or the baggage section of your booking, before you fly.</p>
<h2>Hand baggage on the last copy we read</h2>
${h.table(['Cabin', 'Pieces', 'Size per piece', 'Weight'], [['Economy Light, Classic and Delight', '1', x.co, x.coW], ['Premium', '1', x.co, x.coW], ['Upper Class', String(UPPER.pieces), x.co, `${UPPER.kgEach} kg each, ${UPPER.kgTotal} kg together`]], 'Archived copy of the Virgin Atlantic hand baggage page, May 2025; not confirmed for 2026.', ['l', 'r', 'l', 'l'])}
<p>The page described hand baggage as included in all tickets and gave the size as 23 × 36 × 56 cm, the order in which Virgin Atlantic wrote it. Read the other way round, it is ${short(x.co)}: the 56 cm height that most airlines use, but a width of 36 cm instead of 45. That narrow width is the main trap. A wheeled case built to the common UK size of 56 × 45 × 25 cm, accepted by ${h.a('british-airways', 'British Airways')}, will be too wide and too deep. The page we read described no separate under-seat bag, so the checker above reports no personal item limit for Virgin Atlantic rather than inventing one.</p>
<h2>Checked bags on the last copy we read</h2>
<p>On the archived check-in baggage page, Economy Classic and Delight included one checked bag of up to ${x.ckW}, within ${x.ck}. Upper Class included two bags of 32 kg each. Economy Light included no checked bag; one could be bought. The June 2025 page listed its prices in pounds, dollars and euros, and said that the price online and at the airport was exactly the same; we do not repeat those 2025 amounts as prices, because they may no longer apply. The page also listed separate charges for overweight bags and for bags over ${short(x.ck)}. The ${h.a('hold-luggage-size', 'hold luggage page')} compares hold weights across the UK airlines, with their dates.</p>
<h2>Power banks: use the UK rules</h2>
<p>We could not read a current Virgin Atlantic power bank rule, and the 2025 copies did not give one we can cite. The UK baseline comes from the ${h.src('caa-packright', 'Civil Aviation Authority’s Pack right page')}: power banks travel with you in the cabin, never in checked luggage; you can take ${b.ukMaxPowerBanks} per person; they should never be recharged on board; batteries between ${b.noApprovalWh} and ${b.approvalWh} Wh need the airline’s approval, and anything above ${b.approvalWh} Wh is not carried in passenger baggage. Before a long-haul flight, check Virgin Atlantic’s own page for whether you may use a power bank in flight. The ${h.a('power-bank-on-plane', 'power bank page')} sets these rules out with the airlines that do publish them.</p>
<h2>Flying to the United States</h2>
<p>If your Virgin Atlantic trip goes to the United States, the flight home leaves from a US airport that applies the TSA rules, including the ${h.num(h.P.rules.tsa.oz, 1)} ounce liquid limit, whatever the UK airport allowed on the way out; the ${h.a('carry-on-size', 'carry-on size page')} gives the US airline limits in inches if part of the trip is on a domestic US flight.</p>
<h2>What to check before you fly</h2>
<p>Open your booking and read the baggage line: it states the hold allowance for your fare, which is the figure that applies to you, whatever any copy from 2025 said. Measure the width of your hand bag against 36 cm. If you hold an Economy Light ticket and need a hold bag, price it in the booking. This site is independent, is not Virgin Atlantic, and will update this page when the airline’s current text can be read.</p>`;
    },
  },
});
