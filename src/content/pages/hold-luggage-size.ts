import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'hold-luggage-size', group: 'size', order: 7,
  tool: { kind: 'fit', props: { mode: 'checked', region: 'uk', unit: 'cm' } },
  mini: { kind: 'mini:excess' },
  related: ['hand-luggage-size', 'checked-bag-weight-limit', 'easyjet', 'tui', 'british-airways'],
  sources: ['ryanair-terms', 'ryanair-fees', 'easyjet-hold', 'easyjet-fees', 'jet2-bags', 'ba-bags', 'wizz-checked', 'tui-luggage', 'va-checked'],
  en: {
    slug: 'hold-luggage-size', nav: 'Hold luggage', card: 'Hold bag weights and sizes of the UK airlines, from 10 kg to 32 kg, and the per-kilo charge when the bag is heavier than booked.',
    title: 'Hold Luggage Size 2026: Weights and Limits of 7 UK Airlines',
    description: 'Hold luggage size and weight for Ryanair, easyJet, Jet2, British Airways, Wizz Air, TUI and Virgin Atlantic, and the per-kilo charge at the airport in 2026.',
    h1: 'Hold luggage: weight and size limits of UK airlines',
    intro: 'Enter the suitcase you want to check in, in centimetres and kilos: the checker shows which airlines accept it in the hold and where it is over a limit.',
    resume: (h) => {
      const ba = h.A('british-airways'), ls = h.A('jet2'), u2 = h.A('easyjet'), w6 = h.A('wizz-air');
      return `In the UK the hold bag is sold by weight rather than by size. British Airways includes one bag of ${ba.ckW} on Economy fares other than Basic, with a maximum of ${ba.ck}. Jet2 sells hold bags of ${ls.ckW}, with no general size published. easyJet lets you pre-book 15, 23, 26, 29 or 32 kg, and the three sides must add up to under 275 cm. Ryanair offers 10, 20 and 23 kg bags; Wizz Air 10, 20, 26 and 32 kg, with an outside limit of ${w6.ck}. TUI includes 20 kg on most packages and 25 kg on some. No airline on this list that states a ceiling carries a single item over 32 kg. The money is lost at the scale: a bag heavier than the weight you paid for is charged per kilo at the airport, ${h.m(12, 'GBP')} on easyJet, ${h.m(13, 'GBP')} on Ryanair, 13 euros on Wizz Air and ${h.m(15, 'GBP')} on TUI short and mid-haul flights.`;
    },
    faqs: (h) => [
      { q: 'What is the maximum weight for a hold bag on UK flights?', a: 'Thirty-two kilograms per item on every airline of this site that states a ceiling, for health and safety reasons. What you can actually check depends on the bag you booked: 20 or 23 kg on most fares, 10 kg on the light options of Ryanair and Wizz Air. Heavier bags are charged by the kilo at the desk.' },
      { q: 'Is it cheaper to pre-book extra hold weight or pay at the airport?', a: `Pre-booking is cheaper on every airline here. easyJet charges ${h.m(12, 'GBP')} per extra kilo per bag at the airport and ${h.m(60, 'GBP')} for a bag that was not booked at all; TUI charges ${h.m(15, 'GBP')} a kilo on short and mid-haul flights. Weigh the case at home with a luggage scale and book the next weight band if you are close.` },
      { q: 'Does British Airways include a hold bag on every fare?', a: `No. Its Economy Basic fare is hand baggage only. Other Economy and Premium Economy fares include one bag of up to ${h.A('british-airways').ckW}; Business and First allow heavier bags. The figures come from an archived copy of the British Airways page captured on September 30, 2026.` },
    ],
    body: (h) => {
      const uk = h.AIRLINES.filter((a) => a.region === 'uk');
      const rows = uk.map((a) => { const x = h.A(a.id); return [h.a(a.id, a.name), a.checked?.cm || a.checked?.linearCm ? x.ck : 'none stated', x.ckW, (a.checked as any)?.note ?? '']; });
      return `<h2>Hold allowances read on each airline's page</h2>
<p>The weight column gives the largest standard bag or the included allowance; the last column summarises the weights the airline sells. Virgin Atlantic's figures come from an archived copy of ${h.date('2025-06-28')}, the latest we could read, and must be checked on the airline's page.</p>
${h.table(['Airline', 'Size limit', 'Weight', 'Weights offered'], rows, 'Read on each airline page; dates and archived copies on the airline pages.', ['l', 'l', 'l', 'l'])}
<h2>The per-kilo charge at the desk</h2>
<p>Each airline that publishes an excess rate applies it per kilo above the weight you booked, per bag and per flight. The calculator below uses the rate of the airline you pick. Rounding is our assumption: we count every started kilo as a full one, which is what a desk scale reading in whole kilos produces.</p>
<!--tool:mini:excess-->
<h2>Size matters less, until it does</h2>
<p>Few travellers meet a hold size limit with an ordinary suitcase: ${h.A('british-airways').ck} on British Airways is larger than most cases sold. The limits bite with sports equipment, musical instruments and boxes, which airlines handle as special items with their own prices. easyJet's 275 cm rule is a sum of the three sides, so a long, flat bag can pass where a cube of the same volume would not, and the checker above applies each rule the way the airline writes it.</p>
<h2>Packing a hold bag to the limit without paying extra</h2>
<p>Luggage scales differ by half a kilo from the airport's, so aim a kilo under. Shoes and books are the usual culprits; move them to the cabin bag if your fare includes one, within its own weight limit. Keep power banks and spare lithium batteries out of the hold altogether: aviation safety rules keep them in the cabin, as the ${h.a('power-bank-on-plane', 'power bank page')} explains.</p>`;
    },
  },
});
