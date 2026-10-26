import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'tsa-liquid-rule', group: 'rules', order: 1,
  tool: { kind: 'liquids', props: { country: 'us' } },
  mini: { kind: 'mini:liquid' },
  related: ['uk-liquid-rules', 'food-on-plane', 'power-bank-on-plane', 'carry-on-size', 'checked-bag-fees'],
  sources: ['tsa-liquids', 'tsa-food', 'govuk', 'ap-lhr'],
  en: {
    slug: 'tsa-liquid-rule', nav: 'TSA liquid rule', card: 'The 3-1-1 rule at US checkpoints: container size, the quart bag, medicines and baby food, and what to move to the checked bag.',
    title: 'TSA Liquid Rule 2026: 3.4 oz, Quart Bag, What Is Exempt',
    description: 'The TSA 3-1-1 liquids rule for 2026: 3.4 ounce containers in one quart-sized bag, the exemptions for medicines and baby food, and how UK airports now differ.',
    h1: 'TSA liquid rule: 3.4 ounces, one quart bag, and the exemptions',
    intro: 'Pick the size printed on your bottle and how many you carry: the checker says whether it passes a US checkpoint or belongs in the checked bag.',
    resume: (h) => {
      const T = h.P.rules.tsa;
      return `At every US airport the TSA applies one rule to liquids, aerosols, gels, creams and pastes in the carry-on: each container holds ${h.num(T.oz, 1)} ounces (${T.ml} ml) or less, and all of them fit in one ${T.bag} per passenger. That is the 3-1-1 rule: 3.4 ounces, 1 quart bag, 1 bag each. The figure that counts is the capacity printed on the container, so a half-empty 6 ounce bottle of shampoo is refused even if only two ounces are left inside. Larger bottles travel in the checked bag, where the TSA sets no size per container for ordinary toiletries. Three groups are exempt from the size limit and from the bag: medicines, baby formula and breast milk, and baby food; they may exceed ${h.num(T.oz, 1)} ounces in the carry-on and are declared to the officer for separate screening. The rule has not moved in 2026, unlike the UK, where several airports now accept containers up to 2 litres.`;
    },
    faqs: (h) => {
      const T = h.P.rules.tsa;
      return [
        { q: 'Does a half-empty bottle pass the TSA 3.4 ounce limit?', a: `No. The officer reads the capacity printed on the container, not the amount left inside it. A 5 ounce tube of toothpaste with one ounce remaining is over the limit and will be taken out of the carry-on. Decant into containers marked ${h.num(T.oz, 1)} ounces or ${T.ml} ml or less, or pack the original bottle in the checked bag.` },
        { q: 'Can I bring more than 3.4 ounces of medicine through TSA?', a: 'Yes. Liquid medicines are exempt from the 3.4 ounce limit and do not have to fit in the quart-sized bag. Take them out of the carry-on and tell the officer before screening starts, because they are screened separately and may be tested. Keeping them in the original labeled packaging makes the check quicker, though the TSA rule itself sets no quantity cap for them.' },
        { q: 'How much baby formula or breast milk can I carry on a US flight?', a: 'More than 3.4 ounces, in reasonable quantities for the trip. Baby formula, breast milk and baby food are exempt from the container limit and from the quart bag, and a parent may carry them through the checkpoint in their own bag. Separate them from the other liquids and declare them at the start of screening, since the officer screens them on their own.' },
        { q: 'Do toiletries in a checked bag have a size limit under TSA rules?', a: 'For ordinary toiletries such as shampoo, sunscreen, lotion or mouthwash, the TSA sets no per-container size in checked bags; the 3.4 ounce rule applies to the carry-on only. Close every cap tightly and put the bottles in a sealed plastic bag, since pressure changes in the hold can push liquid out. Alcohol has its own limits in the hold.' },
      ];
    },
    body: (h) => {
      const T = h.P.rules.tsa, U = h.P.rules.uk, F = h.P.rules.tsaFood;
      const big = U.airports.filter((a) => a.rule === 'large');
      const rows: Array<Array<string | number>> = [
        ['Shampoo, conditioner, body wash', `carry-on if ${h.num(T.oz, 1)} oz or less, in the quart bag`, 'any size'],
        ['Toothpaste, gel, cream, lotion, sunscreen', `carry-on if ${h.num(T.oz, 1)} oz or less, in the quart bag`, 'any size'],
        ['Liquid medicine', 'exempt: any size, declared at screening', 'any size'],
        ['Baby formula, breast milk, baby food', 'exempt: any size, declared at screening', 'any size'],
        ['Drinking water and soft drinks', `only if ${h.num(T.oz, 1)} oz or less; empty bottles are fine`, 'any size'],
        [`Spirits of ${F.alcoholMinPct}% to ${F.alcoholMaxPct}% alcohol`, `only miniatures of ${h.num(T.oz, 1)} oz in the quart bag`, `up to ${F.alcoholLitres} liters per passenger, unopened retail packaging`],
      ];
      return `<h2>The 3-1-1 rule, item by item</h2>
<p>Three numbers sum it up. Every container in the carry-on holds ${h.num(T.oz, 1)} ounces, which is ${T.ml} milliliters, or less. All those containers go into a single ${T.bag}, the clear resealable kind. Each passenger, children included, gets one such bag. The officer may ask you to take the bag out of the carry-on and place it in a bin, so pack it near the top. A bag that will not close is a bag with too much in it: something has to move to the checked bag or stay behind.</p>
<p>The rule covers far more than drinks. Anything you can pour, pump, squeeze, spread or spray counts as a liquid at the checkpoint: hair gel, mascara, liquid foundation, peanut butter, hummus, yogurt, honey, aerosol deodorant. Solid versions escape it. A bar of soap, a stick deodorant, solid shampoo, a lipstick or a powder foundation travel loose in the carry-on with no size limit.</p>
${h.table(['Item', 'Carry-on', 'Checked bag'], rows, 'TSA rules read on the TSA liquids and food pages; alcohol limits from the TSA food page.', ['l', 'l', 'l'])}
<h2>The three exemptions, and how to use them</h2>
<p>Medicines, baby formula and breast milk, and baby food are the only liquids the TSA lets through above ${h.num(T.oz, 1)} ounces in the cabin. They also stay out of the quart bag, which leaves its full space for toiletries. The exemption does not work silently: take these items out, put them in a separate bin and tell the officer what they are before the belt starts. They go through additional screening and the officer may open a container, which is why a pharmacy label or the original box saves time.</p>
<p>Everything else that is liquid has no exemption, however necessary it feels: a full-size hand cream bought for a long trip, a large sunscreen for the beach, a bottle of water filled before the line. Either it is transferred into containers of ${h.num(T.oz, 1)} ounces, or it is emptied, or it goes in the hold.</p>
<h2>What goes in the checked bag instead</h2>
<p>The checked bag is the outlet for everything larger: the full-size shampoo, the bottle of olive oil brought back from a trip, a jar of jam for a relative. For toiletries the TSA sets no per-container size in the hold. Alcohol is the exception that has numbers: up to ${F.alcoholLitres} liters per passenger of drinks between ${F.alcoholMinPct}% and ${F.alcoholMaxPct}% alcohol, in unopened retail packaging, and nothing above ${F.alcoholMaxPct}%. The ${h.a('food-on-plane', 'food and drink page')} has a checker for bottles. Adding a checked bag to carry two bottles of wine costs money on most US airlines; the ${h.a('checked-bag-fees', 'bag fee comparison')} gives the price of the first bag each way.</p>
<!--tool:mini:alcohol-->
<p>Liquids bought after the checkpoint, in airport shops, are not counted: they were never screened against your carry-on. On a journey with a connection where you go through security again, as when you arrive from abroad and change planes in the US, the 3-1-1 rule applies afresh at that second checkpoint. The TSA liquids page describes how duty-free purchases are handled in that case; read it before buying a large bottle on the first leg.</p>
<h2>Same trip, other rule: flying back from the UK</h2>
<p>A round trip between the US and the UK no longer runs on a single liquids rule. The outbound leg follows the TSA everywhere. On the way back, it depends on the airport. ${big.map((a) => a.name).join(', ')} have published, on their own security pages, a limit of 2 litres per container with no plastic bag, because their new scanners see liquids inside the cabin bag. The other UK airports on this site keep ${U.ml} ml per container, though most of them no longer ask for the bag either. GOV.UK keeps ${U.ml} ml and a bag of about ${U.bagL} litre as the general rule unless an airport says otherwise.</p>
<p>The trap runs in one direction: a 500 ml bottle of sun cream accepted at ${h.a('uk-liquid-rules', 'Heathrow or Gatwick')} on the way out of London is refused at a US checkpoint if you connect and are screened again, and at any of the 100 ml airports in the UK. Pack for the strictest checkpoint of the trip, which for most travelers is the US one.</p>`;
    },
  },
});
