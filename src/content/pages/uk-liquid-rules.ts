import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uk-liquid-rules', group: 'rules', order: 2,
  tool: { kind: 'liquids', props: { country: 'uk', airport: 'LHR' } },
  mini: { kind: 'mini:liquid' },
  related: ['tsa-liquid-rule', 'hand-luggage-size', 'food-on-plane', 'power-bank-on-plane', 'easyjet'],
  sources: ['govuk', 'ap-lhr', 'ap-lgw', 'ap-stn', 'ap-ltn', 'ap-man', 'ap-bhx', 'ap-edi', 'ap-brs', 'ap-ncl', 'ap-abz', 'ap-bfs', 'ap-lcy', 'ap-lba', 'ap-lpl', 'ap-ema', 'ap-sou', 'ap-mme'],
  en: {
    slug: 'uk-liquid-rules', nav: 'UK liquid rules', card: 'Seventeen UK airports, each with its own liquids limit: 100 ml or 2 litres per container, with or without the plastic bag.',
    title: 'Liquid Rules at UK Airports 2026: 100ml or 2 Litres Each',
    description: 'Hand luggage liquids at 17 UK airports in 2026: which allow 2 litre containers, which keep 100 ml, whether you still need the plastic bag, and the return trap.',
    h1: 'UK airport liquid rules: 100 ml or 2 litres, airport by airport',
    intro: 'Choose the airport you fly from and the size of your bottle: the checker applies that airport’s own published limit, with the date its page was read.',
    resume: (h) => {
      const U = h.P.rules.uk;
      const big = U.airports.filter((a) => a.rule === 'large'), small = U.airports.filter((a) => a.rule === '100ml');
      return `There is no longer one liquids rule for hand luggage in the UK. Of the ${U.airports.length} airports checked for this page, ${big.length} state on their own security pages that you can take containers of up to 2 litres through screening and leave them in your bag: ${big.map((a) => a.name).join(', ')}. The other ${small.length}, among them London Stansted, Manchester and London City, keep the ${U.ml} ml limit per container, but nearly all of them have dropped the clear plastic bag because their scanners see the liquids inside the cabin bag. GOV.UK still describes the older baseline that applies unless the airport says otherwise: containers of ${U.ml} ml or less, all in one resealable bag of about ${U.bagL} litre, roughly ${U.bagCm[0]} by ${U.bagCm[1]} cm. Medicines, special-diet food and baby milk are allowed in larger amounts everywhere. The catch is the flight home: the airport abroad sets the rule on the return leg, and most still apply ${U.ml} ml.`;
    },
    faqs: (h) => {
      const U = h.P.rules.uk;
      const big = U.airports.filter((a) => a.rule === 'large');
      return [
        { q: 'Which UK airports allow 2 litre liquids in hand luggage?', a: `On the pages read for this site, ${big.length} airports state a limit of 2 litres per container: ${big.map((a) => a.name).join(', ')}. Some of those pages were read on archived copies, dated in the table on this page. Every other UK airport on the list keeps ${U.ml} ml per container, even where it no longer asks for the plastic bag.` },
        { q: 'Do I still need a clear plastic bag for liquids at UK airports?', a: 'At most large UK airports, no. Every one of the seventeen airports listed here now lets liquids stay in your bag; Southampton, Luton, Manchester and the others say in so many words that the clear resealable pouch is no longer needed. The bag remains the GOV.UK baseline, so carry one in case an airport changes its lanes or you fly home from abroad.' },
        { q: 'Can I take a 2 litre bottle from Heathrow and back from Spain?', a: `Out of Heathrow, yes: its page allows containers up to 2 litres in the cabin bag. On the way back, the airport in Spain applies its own rule, and many airports outside the UK still limit containers to ${U.ml} ml. Pack the large bottle in the hold for the return leg, or plan to finish or leave it before the flight home.` },
        { q: 'Is baby milk limited to 100 ml at UK airport security?', a: 'No. Baby milk, baby food, essential medicines and special-diet food are allowed above the usual container size at every UK airport, up to 2 litres according to the rule recorded here. Security staff may ask you to open or test them, so keep them easy to reach and separate from the rest of your liquids.' },
      ];
    },
    body: (h) => {
      const U = h.P.rules.uk;
      const rows = U.airports.map((a) => [
        h.src(a.src as any, a.name),
        a.rule === 'large' ? `${h.num(a.maxMl / 1000)} litres` : `${a.maxMl} ml`,
        a.bag,
        `${h.date(a.readOn)}${a.via === 'wayback' ? ' (archived copy)' : ''}`,
      ]);
      const wb = U.airports.filter((a) => a.via === 'wayback');
      return `<h2>Seventeen airports, seventeen pages</h2>
<p>The table lists each airport with the rule written on its own security page, the bag rule and the day that page was read. ${wb.length} of them could only be read on an archived copy of the page (${wb.map((a) => `${a.name}, ${h.date(a.readOn)}`).join('; ')}); for those, the airport may have changed its wording since. Each airport name opens the page that was read.</p>
${h.table(['Airport', 'Limit per container', 'Plastic bag', 'Page read on'], rows, 'Limits copied from each airport’s security page. Archived copy: the Internet Archive copy of the airport page was read.', ['l', 'r', 'l', 'l'])}
<p>Two details from the airport pages are worth knowing. Gatwick allows the larger containers except metal or double-walled ones, such as insulated flasks, which still have to be emptied before screening. Aberdeen, Southampton and Teesside state that there is no limit on the number of ${U.ml} ml containers, as long as each one stays within the size.</p>
<h2>The GOV.UK baseline, and why airports differ from it</h2>
<p>The government guidance, published on GOV.UK under the Open Government Licence, sets out the rule every airport starts from. Liquids in hand luggage go in containers of no more than ${U.ml} ml. All of them fit in a single transparent resealable bag of around ${U.bagL} litre, about ${U.bagCm[0]} cm by ${U.bagCm[1]} cm, which you can close and which is shown separately at screening. Larger quantities are allowed for medicines, for food needed on a special diet and for baby food and milk. The guidance adds that the airport may apply different rules, and that is where the split comes from: airports that have installed the newer CT scanners, which see liquids inside a cabin bag, can let liquids stay in the bag, and some of them have raised the container size.</p>
<p>A container is judged by its capacity, not by what is left in it. A 150 ml tube half used is still a 150 ml tube at a ${U.ml} ml airport. Liquids include gels, pastes, creams, lotions and aerosols, so lip gloss, toothpaste and hair wax count.</p>
<h2>The return-flight trap</h2>
<p>The new limits apply to departures from the airport that announced them, not to the trip. A bottle of 1 litre that leaves Edinburgh in the cabin bag meets a different checkpoint on the flight home from a holiday airport, and also at a UK airport that keeps ${U.ml} ml if you fly out of one and back into another. Three habits avoid losing it. Check the rule of the return airport before packing. Put anything above ${U.ml} ml that you want to bring back in the hold bag on the return leg; the ${h.a('hold-luggage-size', 'hold luggage page')} gives the weight each UK airline allows. And buy large toiletries at the destination instead of carrying them both ways.</p>
<p>Travelers connecting to the United States face the strictest version: TSA rules allow ${h.num(h.P.rules.tsa.oz, 1)} ounces, or ${h.P.rules.tsa.ml} ml, per container in a quart-sized bag at every US checkpoint, so any repeat screening on arrival or during a connection undoes the UK allowance. The ${h.a('tsa-liquid-rule', 'TSA liquid rule page')} covers it.</p>
<h2>Medicines, baby milk and special diets</h2>
<p>These are allowed at every UK airport in larger amounts, up to 2 litres according to the rule recorded for this site. They do not need to go in the plastic bag at airports that still use one, but they should be easy to take out. Staff may ask you to open a container or test it. Keeping a few days of any regular medicine in the cabin bag also protects you if the hold bag arrives late.</p>`;
    },
  },
});
