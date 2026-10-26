import { definePage } from '../../lib/guide-types';

/** "captured on 2026-05-12" in a source label → that date, for pages read on an archived copy. */
const captured = (label: string) => label.match(/captured on (\d{4}-\d{2}-\d{2})/)?.[1] ?? null;

export default definePage({
  id: 'power-bank-on-plane', group: 'rules', order: 3,
  tool: { kind: 'battery' },
  related: ['tsa-liquid-rule', 'uk-liquid-rules', 'ryanair', 'easyjet', 'wizz-air'],
  sources: ['faa-packsafe', 'tsa-powerbanks', 'tsa-batteries', 'caa-packright', 'ryanair-terms', 'easyjet-dg', 'jet2-dg', 'ba-restrictions', 'wizz-restricted'],
  en: {
    slug: 'power-bank-on-plane', nav: 'Power banks', card: 'Watt-hours from the mAh on the label, the 100 and 160 Wh thresholds, and the UK airlines that cap the number or ban use in flight.',
    title: 'Power Bank on a Plane 2026: Wh Limits, TSA, FAA, UK Airlines',
    description: 'Can your power bank fly in 2026? Convert mAh to watt-hours, see the 100 Wh and 160 Wh limits, why it stays in the cabin, and what Ryanair, easyJet and BA allow.',
    h1: 'Power bank on a plane: the watt-hour limits and airline rules',
    intro: 'Type the capacity and voltage printed on the pack: the checker gives its watt-hours and whether it flies in the cabin, with approval, or not at all.',
    resume: (h) => {
      const B = h.P.rules.batteries;
      const wh = (mah: number) => { const x = Math.round(mah * 3.7) / 1000; return h.num(x, Number.isInteger(x) ? 0 : 1); };
      return `A power bank flies in the cabin, never in a checked bag, and its limit is set in watt-hours. To find them, multiply the milliamp-hours on the label by the voltage and divide by 1,000: a 10,000 mAh pack at 3.7 volts is ${wh(10000)} Wh, a 26,800 mAh pack is ${wh(26800)} Wh. Up to ${B.noApprovalWh} Wh, the FAA and the UK Civil Aviation Authority need no approval, which covers almost every phone and tablet pack. Above ${B.noApprovalWh} and up to ${B.approvalWh} Wh, the airline must approve it, with at most ${B.approvalMaxSpares} such spares per passenger. Above ${B.approvalWh} Wh it does not fly on a passenger aircraft. Airlines add their own rules on top: Ryanair, British Airways and Wizz Air refuse anything over ${B.noApprovalWh} Wh, Wizz Air allows a single power bank, and easyJet and Wizz Air forbid using one during the flight. The UK regulator caps everyone at ${B.ukMaxPowerBanks} power banks.`;
    },
    faqs: (h) => {
      const B = h.P.rules.batteries;
      return [
        { q: 'Is a 20000 mAh power bank allowed on a plane?', a: `Yes, in hand luggage. At the usual 3.7 volts it is ${h.num((20000 * 3.7) / 1000)} Wh, under the ${B.noApprovalWh} Wh threshold, so no approval is needed with any airline on this site. Wizz Air still allows only one power bank per person, and easyJet and Wizz Air do not let you use it during the flight, so charge your phone before boarding.` },
        { q: 'Why can a power bank not go in a checked bag?', a: 'Lithium cells can overheat and catch fire when damaged or shorted. In the cabin, the crew can see and deal with it; in the hold, nobody can. The FAA therefore keeps spare lithium batteries and power banks out of checked bags, and British Airways’ page repeats the ban. If your carry-on is taken from you at the gate, remove the power bank first.' },
        { q: 'How many power banks can I take on a UK flight?', a: `The Civil Aviation Authority sets a ceiling of ${B.ukMaxPowerBanks} per person, and Ryanair, easyJet, Jet2 and British Airways repeat that figure on their own pages. Wizz Air is stricter, with a maximum of one power bank inside its wider limit on spare batteries. Larger packs between ${B.noApprovalWh} and ${B.approvalWh} Wh also need the airline’s approval where the airline accepts them at all.` },
        { q: 'What if the power bank shows mAh but no watt-hours?', a: `Look for the voltage on the label, usually 3.7 V for the cells inside, and work it out: mAh times volts divided by 1,000. British Airways asks that power banks display their capacity rating, so a pack with no legible marking can be refused. The checker above does the sum and compares it with the ${B.noApprovalWh} and ${B.approvalWh} Wh limits.` },
      ];
    },
    body: (h) => {
      const B = h.P.rules.batteries, PB = h.P.rules.powerBankAirlines;
      const rows = PB.map((r) => {
        const d = captured((h.P.sources as Record<string, { label: { en: string } }>)[r.src].label.en);
        return [h.src(r.src as any, r.airline) + (d ? ` (archived copy, ${h.date(d)})` : ''), r.maxPerPassenger, `${r.maxWh} Wh`, r.useOnboard];
      });
      const ex = [5000, 10000, 20000, 26800, 30000, 40000, 50000].map((mah) => {
        const wh = (mah * 3.7) / 1000;
        const v = wh <= B.noApprovalWh ? 'cabin, no approval' : wh <= B.approvalWh ? 'cabin, airline approval needed' : 'not on a passenger flight';
        return [`${h.num(mah)} mAh`, `${h.num(wh, 1)} Wh`, v];
      });
      return `<h2>From milliamp-hours to watt-hours</h2>
<p>Pack makers print the capacity in milliamp-hours in large type because the number is big. Aviation rules use watt-hours, which is the energy actually stored. The conversion needs one more figure from the label, the voltage: Wh = mAh × V ÷ 1,000. Most packs use cells rated at 3.7 volts, and the label shows the rating in small print near the input and output specifications. Some packs print the watt-hours directly; when they do, use that figure. The table assumes 3.7 volts.</p>
${h.table(['Capacity on the label', 'Watt-hours at 3.7 V', 'FAA and CAA rule'], ex, 'Watt-hours computed at 3.7 V; thresholds from the FAA PackSafe page and the CAA.', ['l', 'r', 'l'])}
<p>The step from ${h.num(26800)} to ${h.num(30000)} mAh crosses the line. A pack sold as 30,000 mAh is about ${h.num((30000 * 3.7) / 1000)} Wh: legal with the airline’s approval under the FAA rule, but refused outright by the airlines that cap power banks at ${B.noApprovalWh} Wh. Before buying a large pack for a trip, check the watt-hours rather than the headline number.</p>
<h2>What the FAA and the TSA say for US flights</h2>
<p>The FAA sets the rule and the TSA applies it at the checkpoint. Spare lithium batteries, which include power banks, travel in carry-on baggage only. Up to ${B.noApprovalWh} Wh per battery, there is no approval to ask for. Above ${B.noApprovalWh} and up to ${B.approvalWh} Wh, the airline must agree and each passenger may carry at most ${B.approvalMaxSpares} spares. Above ${B.approvalWh} Wh, a spare battery is forbidden on passenger aircraft. For lithium metal batteries, the non-rechargeable kind found in some cameras, the measure is lithium content, with ${B.lithiumMetalG} grams as the limit per battery. Protect each spare from short circuit: original packaging, a pouch of its own or tape over exposed terminals.</p>
<p>Batteries installed in a device, such as the one in a laptop or a phone, are treated differently from loose spares; the TSA page on lithium batteries in devices covers them. The rule of thumb for a power bank is simple: it is a spare, it travels with you in the cabin.</p>
<h2>UK and European airlines: five sets of rules</h2>
<p>The Civil Aviation Authority adds two points for flights from the UK: at most ${B.ukMaxPowerBanks} power banks per person, and none recharged on board. Each airline then writes its own policy, and they do not agree with each other on size or on use during the flight.</p>
${h.table(['Airline', 'Per passenger', 'Largest allowed', 'Using it on board'], rows, 'Read on each airline’s dangerous goods or terms page. Archived copy: the Internet Archive copy of the airline page was read.', ['l', 'r', 'r', 'l'])}
<p>Three practical consequences follow. On Ryanair, a power bank and spare batteries may not go in a bag placed in the overhead locker, so keep them in the small bag under the seat. On British Airways, the pack goes in the seat pocket or in a bag under the seat in front, and the seat power socket may charge your phone but not the power bank. On easyJet and Wizz Air, the pack stays switched off for the whole flight: charge your phone at the gate. British Airways also displays a banner on the page read announcing an update to its power bank policy that forbids power banks and spare batteries in checked baggage; it gives no start date.</p>
<h2>A short packing routine</h2>
<p>Before leaving home, read the label and work out the watt-hours. Count your packs against the strictest airline of your trip, which on a UK and Europe itinerary is often Wizz Air with one. Put each pack in the bag you keep at your seat, not in the cabin bag that might be checked at the gate. And if a pack is swollen, hot or damaged, do not fly with it at all.</p>`;
    },
  },
});
