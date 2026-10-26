import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'food-on-plane', group: 'rules', order: 4,
  tool: { kind: 'liquids', props: { country: 'us' } },
  mini: { kind: 'mini:alcohol' },
  related: ['tsa-liquid-rule', 'uk-liquid-rules', 'checked-bag-fees', 'personal-item-size'],
  sources: ['tsa-food', 'tsa-liquids', 'govuk', 'ap-lgw'],
  en: {
    slug: 'food-on-plane', nav: 'Food and drink', card: 'Solid food, spreads, baby food and bottles of alcohol: what passes US and UK security in the cabin, and what goes in the hold.',
    title: 'Food on a Plane 2026: What TSA and UK Security Allow',
    description: 'Food on a plane in 2026: solid snacks pass security, spreads and soups count as liquids, baby food is exempt, and spirits in the hold are capped at 5 liters.',
    h1: 'Food on a plane: what passes security, what goes in the hold',
    intro: 'For anything you can pour or spread, the size of the jar decides: type it in to see whether it passes a US checkpoint or belongs in your checked bag.',
    resume: (h) => {
      const T = h.P.rules.tsa, F = h.P.rules.tsaFood, U = h.P.rules.uk;
      return `Solid food goes through airport security in the US and the UK without a size limit: sandwiches, fruit, crackers, cooked meals in a box, a slice of cake. The line falls between solid and liquid, and many foods sit on the liquid side without looking like drinks. Peanut butter, jam, honey, hummus, yogurt, soup, sauces and soft dips are treated as liquids, so at a US checkpoint each jar must hold ${h.num(T.oz, 1)} ounces or less and fit in the ${T.bag}. At a UK airport the cap is ${U.ml} ml per container, or 2 litres at the airports that state it. Baby food and baby milk are exempt in both countries. Alcohol has its own TSA rule: in a checked bag, drinks of ${F.alcoholMinPct}% to ${F.alcoholMaxPct}% alcohol are limited to ${F.alcoholLitres} liters per passenger in unopened retail packaging, drinks above ${F.alcoholMaxPct}% are banned, and in the cabin only miniatures within the liquids rule pass.`;
    },
    faqs: (h) => {
      const T = h.P.rules.tsa, F = h.P.rules.tsaFood;
      return [
        { q: 'Can I bring a jar of peanut butter in my carry-on?', a: `Only a small one. Spreads are screened as liquids, so a jar of peanut butter, jam or chocolate spread must hold ${h.num(T.oz, 1)} ounces or less and go in the quart-sized bag with your toiletries. A full-size jar belongs in the checked bag. The same applies at UK airports, at ${h.P.rules.uk.ml} ml per container unless the airport you leave from allows more.` },
        { q: 'How many bottles of wine can I put in my checked bag?', a: `For wine, which sits below ${F.alcoholMinPct}% alcohol, the TSA sets no quantity limit in checked bags. For spirits of ${F.alcoholMinPct}% to ${F.alcoholMaxPct}%, the limit is ${F.alcoholLitres} liters per passenger, in unopened retail packaging, which is about six standard 750 ml bottles. Anything over ${F.alcoholMaxPct}% cannot fly. Your airline’s weight limit and your destination’s customs allowance may be the tighter limits.` },
        { q: 'Can I take homemade food through airport security?', a: 'Yes, if it is solid: sandwiches, a cooked meal in a sealed box, cookies, a slice of pie or fruit all pass the checkpoint in the cabin. Wet parts are the issue. A curry with a lot of sauce, a soup or a container of salad dressing is judged as a liquid, so pack those small or in the hold. Officers can ask you to take food out of the bag for screening.' },
        { q: 'Can I bring food from abroad into the US or the UK?', a: 'Security and customs are two different checks. Security decides what goes on the plane; customs at the arrival airport decides what may enter the country, and its rules on meat, dairy, fruit and plants are often strict. Before you pack food for the flight home, read the import rules of the authorities of the country you are flying to and declare food when asked.' },
      ];
    },
    body: (h) => {
      const T = h.P.rules.tsa, F = h.P.rules.tsaFood, U = h.P.rules.uk;
      const big = U.airports.filter((a) => a.rule === 'large').map((a) => a.name);
      const rows: Array<Array<string>> = [
        ['Sandwich, wrap, burger', 'solid', 'yes', 'yes'],
        ['Fresh fruit, raw vegetables', 'solid', 'yes', 'yes'],
        ['Bread, cookies, cake, chocolate bar', 'solid', 'yes', 'yes'],
        ['Peanut butter, jam, honey, chocolate spread', 'liquid', `${h.num(T.oz, 1)} oz jar or smaller`, `${U.ml} ml, or 2 litres where the airport allows`],
        ['Hummus, yogurt, soft dips, sauces', 'liquid', `${h.num(T.oz, 1)} oz or smaller`, `${U.ml} ml, or 2 litres where the airport allows`],
        ['Soup, gravy, salad dressing', 'liquid', `${h.num(T.oz, 1)} oz or smaller`, `${U.ml} ml, or 2 litres where the airport allows`],
        ['Baby food, baby milk, formula', 'exempt', 'yes, declared at screening', 'yes, in larger amounts'],
      ];
      return `<h2>Solid or liquid: the only question at the checkpoint</h2>
<p>Security officers do not sort food by type, they sort it by texture. If it keeps its shape, it is solid and travels in the cabin in any quantity. If it can be poured, spread, pumped or spooned, it falls under the liquids rule, whatever it is called on the label. A loaf of bread passes; the jar of jam to go with it is a liquid. A wedge of hard cheese is solid; a tub of cream cheese is not.</p>
${h.table(['Food', 'Treated as', 'US carry-on (TSA)', 'UK hand luggage'], rows, `TSA food and liquids pages; UK limits from GOV.UK and each airport’s page. 2 litres applies at ${big.join(', ')}.`, ['l', 'l', 'l', 'l'])}
<p>The size of the container is what counts, not how much is left in it, so a half-eaten 12 ounce jar of honey is still a 12 ounce jar. When in doubt, move the item to the checked bag, or buy it after the checkpoint, where nothing you purchase is screened against the cabin rule.</p>
<h2>Alcohol: the numbers in the hold</h2>
<p>The TSA food page gives three bands, by strength. Drinks of ${F.alcoholMinPct}% alcohol or less, which covers beer and almost all wine, have no TSA quantity limit in checked bags. Drinks between ${F.alcoholMinPct}% and ${F.alcoholMaxPct}% alcohol, which covers most spirits and liqueurs, are limited to ${F.alcoholLitres} liters per passenger in the hold, in unopened retail packaging. Above ${F.alcoholMaxPct}%, such as some overproof rum or grain alcohol, the bottle is not allowed at all. In the cabin, any alcohol is a liquid: miniatures of ${h.num(T.oz, 1)} ounces or less in the quart bag, like any other toiletry-sized container.</p>
<p>The checker below applies these bands to your bottles. Weight is the other constraint: six bottles of wine weigh several kilos once wrapped, and a bag that crosses the airline’s weight limit pays a surcharge; the ${h.a('overweight-baggage-fee', 'overweight fee page')} lists them. A bottle wrapped in clothes in the middle of the bag, away from the sides, travels best.</p>
<h2>Baby food, milk and special diets</h2>
<p>Parents get the widest exemption on both sides of the Atlantic. In the US, baby formula, breast milk and baby food are allowed above ${h.num(T.oz, 1)} ounces in the carry-on and do not go in the quart bag; take them out and tell the officer at the start of screening. In the UK, GOV.UK allows baby food and milk and food for a special diet in larger quantities, and the rule recorded on this site sets 2 litres as the ceiling. Officers may ask you to open a container, so pack it where it is easy to reach.</p>
<h2>Leaving from a UK airport</h2>
<p>For food, the UK split between airports matters less than for toiletries, because most solid food is unaffected. It matters for jars. From ${big.join(', ')}, a 400 g jar of honey or chutney can stay in the cabin bag, since their pages allow containers up to 2 litres. From London Stansted, Manchester or any other airport keeping ${U.ml} ml, the same jar goes in the hold or stays behind. Gatwick’s page notes that metal and double-walled containers, such as an insulated flask of soup, must still be emptied. The ${h.a('uk-liquid-rules', 'UK liquid rules page')} lists every airport with the date its page was read.</p>
<h2>Arriving with food: customs is a separate check</h2>
<p>Getting through security at departure says nothing about what you may bring into the country at the other end. Each country sets its own import rules for meat, dairy, eggs, fruit, vegetables and plants, and many of them differ from what you are used to. This site does not hold those rules. Read the page of the customs or agriculture authority of your destination before you pack food for the journey, declare it on arrival when you are asked, and eat or discard anything you are unsure about before landing.</p>`;
    },
  },
});
