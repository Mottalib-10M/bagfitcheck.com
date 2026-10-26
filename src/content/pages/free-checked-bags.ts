import { definePage } from '../../lib/guide-types';

const strip = (s: string | undefined) => (s ?? '').replace(/^Airline co-branded credit cards?( \([^)]*\))?:\s*/i, '');

export default definePage({
  id: 'free-checked-bags', group: 'fees', order: 4,
  tool: { kind: 'fees', props: { airline: 'delta', only: 'us' } },
  mini: { kind: 'mini:card' },
  related: ['checked-bag-fees', 'overweight-baggage-fee', 'delta', 'southwest', 'alaska'],
  sources: ['american-checked', 'delta-medallion', 'delta-military', 'united-checked', 'southwest-checked', 'alaska-card', 'alaska-checked', 'hawaiian-checked', 'jetblue-fees', 'frontier-military', 'frontier-bags'],
  en: {
    slug: 'free-checked-bags', nav: 'Free checked bags', card: 'Who checks a bag for free on each US airline: co-branded card holders and their companions, elite members, and military travelers.',
    title: 'Free Checked Bags 2026: Card, Status and Military Rules',
    description: 'Free checked bags on US airlines in 2026: the co-branded card benefit and the companions it covers, elite status tiers, and the rules for active-duty military.',
    h1: 'Free checked bags: card, status and military rules by airline',
    intro: 'Set the airline, the travelers and the free-bag benefit you hold: the calculator shows the round-trip bag fees with and without it.',
    resume: (h) => {
      const dl = h.A('delta'), b6 = h.A('jetblue');
      const one = dl.fees!.first!.online as number;
      return `Three things waive checked bag fees on most US airlines: the airline’s co-branded credit card, elite status in its loyalty program, and active-duty military service. The card usually covers the first bag, and its value comes from the companions it includes: up to 8 on the same reservation with Delta and Southwest, up to 6 with Alaska, up to 3 with JetBlue. At ${dl.f('first')} per bag each way, a family of four on Delta saves ${h.m(one * 2 * 4)} on one round trip, and a couple ${h.m(one * 2 * 2)}. Status starts with one free bag at the first tier and reaches three at the top tiers of American, United, Alaska and Hawaiian. Military travelers on personal trips get two free bags on Delta, Southwest and Frontier, three on American, United, Alaska and Hawaiian, and more on orders. ${b6.name} publishes no military rule on the pages read, and Allegiant no free-bag benefit at all.`;
    },
    faqs: (h) => {
      const dl = h.A('delta'), aa = h.A('american');
      const one = dl.fees!.first!.online as number;
      return [
        { q: 'Does the airline credit card give free bags to my companions?', a: 'On most US airlines, yes, if they are on the same reservation. Delta and Southwest extend the free first bag to up to 8 companions, Alaska to 6 guests and JetBlue to 3 travelers. American’s page confirms the benefit for the cardholder but does not state how many companions it covers, and United’s pages read here do not give the details.' },
        { q: 'How many trips does an airline card need to pay for itself?', a: `Divide the annual fee by what one round trip saves. On Delta, a free first bag is worth ${h.m(one * 2)} per traveler per round trip, so ${h.m(one * 4)} for a couple. A card with an annual fee under that amount pays for itself on one couple’s trip with a bag each. The calculator on this page runs the numbers with your own fee.` },
        { q: 'Do military members get free checked bags on personal trips?', a: `On most US airlines, yes, with a valid military ID. Delta and Southwest give two free bags, Frontier two plus a carry-on, and American, United, Alaska and Hawaiian three. On military orders the count rises, to five bags on ${aa.name}, Delta and United. JetBlue’s military policy was not found on the pages read for this site, so check with the airline.` },
        { q: 'Does elite status cover checked bags for people traveling with me?', a: 'Often, but not always. Delta Medallion members and Southwest A-List members share the free first bag with up to 8 companions on the reservation. United Premier members cover up to nine others on the same itinerary. Alaska’s page includes companions on the same reservation, and JetBlue Mosaic covers travelers on the same itinerary. Frontier ties the bags to the higher Elite tiers.' },
      ];
    },
    body: (h) => {
      const us = h.AIRLINES.filter((a) => a.region === 'us');
      const cardRows = us.map((a) => [h.a(a.id, a.name), a.perks?.card ? strip(a.perks.card) : 'no co-branded card benefit stated on the pages read']);
      const statusRows = us.filter((a) => a.perks?.status).map((a) => [h.a(a.id, a.name), a.perks!.status!]);
      const milRows = us.map((a) => [h.a(a.id, a.name), a.perks?.militaryBags != null ? h.num(a.perks.militaryBags) : 'not stated', a.perks?.military ?? 'not found on the pages read']);
      const ex = (id: string, travelers: number) => { const x = h.A(id); const f = x.fees!.first!.online as number; return [h.a(id, x.name), h.num(travelers), x.f('first'), h.m(f * 2 * travelers)]; };
      const sav = [ex('delta', 2), ex('delta', 4), ex('southwest', 4), ex('alaska', 4), ex('jetblue', 4), ex('american', 1)];
      return `<h2>The co-branded credit card, airline by airline</h2>
<p>Most US airlines on this site state a free-bag benefit for holders of their co-branded credit card, and it is the way most travelers end up checking a bag without paying. The rules differ on three points: how many companions are covered, whether the trip must be paid with the card, and which flights qualify. The table quotes the conditions as read on each airline’s page.</p>
${h.table(['Airline', 'What the card holder gets'], cardRows, 'Card benefits as stated on the airline’s own pages; the card issuer is not named here.', ['l', 'l'])}
<p>Two cautions. The companions must be on the same reservation as the cardholder; a friend booked separately on the same flight pays. And several airlines tie the benefit to details in the booking, such as the loyalty number on American and Southwest or payment with the card on Delta and Alaska. ${h.a('united', 'United')}’s pages read on an archived copy mention fee waivers for cardmembers but not the number of bags or companions, so this site counts no card benefit for United.</p>
<h2>What the card saves on a round trip</h2>
<p>A free first bag saves the first-bag fee twice per traveler on a round trip, once each way. The table uses each airline’s online price for the first bag and assumes every traveler is covered, within the number of companions the airline states.</p>
${h.table(['Airline', 'Travelers', 'First bag, each way', 'Saved per round trip'], sav, 'American: companions covered not stated, so only the cardholder is counted.', ['l', 'r', 'r', 'r'])}
<p>Set those savings against the annual fee of the card. The calculator below takes the number of round trips you fly in a year, the number of travelers and the fee written in your card’s terms, and returns what is left once the fee is paid.</p>
<h2>Elite status</h2>
<p>Status in the loyalty program gives free bags without a card. The first tier usually brings one free bag, the middle tiers two and the top tiers three, and several airlines extend it to travelers on the same booking.</p>
${h.table(['Airline', 'Free bags with status'], statusRows, 'As read on each airline’s baggage pages.', ['l', 'l'])}
<p>United also raises the weight for its Premier members, to 70 pounds per bag in economy within North America. Frontier works differently: its Elite tiers unlock a carry-on first, then one and two checked bags at the Platinum and Diamond levels.</p>
<h2>Military travelers</h2>
<p>Active-duty US service members get free bags on every US airline that publishes a policy here, with a valid military ID. On personal travel the count is two or three; on military orders it rises, often to five. Several airlines raise the weight to 70 pounds or waive excess charges for these bags.</p>
${h.table(['Airline', 'Free bags, personal travel', 'Rule as read'], milRows, 'Spirit, which also had a military policy, stopped flying in May 2026 and is left out.', ['l', 'r', 'l'])}
<p>The bags are free, but the rest of the trip is not always: an overweight bag beyond the waived limit pays the normal surcharge, listed on the ${h.a('overweight-baggage-fee', 'overweight fee page')}. For everyone else, the ${h.a('checked-bag-fees', 'checked bag fee comparison')} gives the price of each bag.</p>`;
    },
  },
});
