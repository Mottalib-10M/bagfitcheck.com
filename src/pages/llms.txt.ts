/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import params from '../data/params-2026.json';

const words = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Free bag tools for flyers in the United States and the United Kingdom: a checker that tests one bag's three sides and weight against the personal item, carry-on and checked bag limits of 17 airlines at once (American, Delta, United, Southwest, Alaska, JetBlue, Spirit, Frontier, Allegiant, Hawaiian, Ryanair, easyJet, Jet2, British Airways, Wizz Air, TUI, Virgin Atlantic), a round-trip bag fee calculator with card, status and military exemptions, the TSA 3-1-1 liquids rule and the liquids rule of each UK airport, and a power bank watt-hour check. Each figure read on the airline's or agency's own page, with its date. Independent site, not an airline. Tools run in the browser. Published by Radif Partners. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- Sizes, weights and fees read on each airline's own baggage pages; TSA and FAA pages (US government works); GOV.UK Department for Transport pages (Open Government Licence v3.0); UK airport security pages. Retrieved ${words(params.retrieved_at)}.`,
    '',
    `- [Will my bag fit?](${SITE_URL}${route('home', 'en')}): bag size checker for 17 airlines and round-trip bag fees`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
