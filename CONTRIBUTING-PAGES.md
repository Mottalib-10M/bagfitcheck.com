# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in `src/lib/guide-types.ts`).
The file name must equal `id`. An airline page has the airline's id (`united`, `ryanair`…), so the bag checker
links to it by itself. The page is built at `/en/<en.slug>/`; menus, footer, home lists, llms.txt and sitemap
follow. English only (en-US spelling; UK pages keep UK terms: hand luggage, hold, cabin bag).

## Fields

- `group`: `size`, `fees`, `us`, `uk` or `rules`; `order`: position in its group.
- `tool`: the main tool, right under the H1 (first screen, RECETTE §5):
  - `{ kind: 'fit', props?: { mode: 'personal'|'carry'|'checked', region: 'us'|'uk'|'all', unit: 'in'|'cm' } }`
  - `{ kind: 'fees', props?: { airline: '<id>', bags, only: 'us'|'uk' } }`
  - `{ kind: 'liquids', props?: { country: 'us'|'uk', airport: '<IATA>' } }`, `{ kind: 'battery' }`
  - `{ kind: 'mini:<spec>' }`, specs in `src/lib/mini-specs.ts` (`MINI_KINDS`), always computed by `src/lib/engine/bags.ts`.
- `mini`: a second tool under the citable block (same kinds). In a body, `<!--tool:mini:overweight-->` places one.
- `related`: 3–5 page ids. `sources`: keys of `src/data/params-2026.json` → `sources`.
- `demarche: true` on airline pages: adds the "independent site, not the airline" line under the H1.

## Text rules (checked by `npx vitest run tests/pages.test.ts`, then `npm run check`)

- `title` 50–60 characters, key term first ("Carry-On Size: …", "United Baggage Fees …"), never a question word,
  a country or "Calculator" first. `description` 150–160 characters.
- `resume(h)`: ONE paragraph of at least 120 words answering the page's query with figures.
- `faqs(h)`: 3–5 questions unique across the site, answers 42–88 words, plain text.
- `body(h)`: HTML with at least three `<h2>`; resume + body at least 650 words. No `<h1>`, no em dash.
- Never name a luggage brand, a search engine, a competitor or a bank; a co-branded card is "the airline's co-branded credit card".
- Never present the site as an airline, the TSA or an airport.

## Figures

Never type a size, weight or fee: read it through `h` (`src/lib/helpers.ts`): `h.A('<id>')` gives the airline
record plus `pi`, `co`, `ck` (sizes in both units), `piW`, `coW`, `ckW` (weights), `f('first'|'second'|'third', 'online'|'airport')`
and `read` (reading date); `h.P.rules` holds the TSA, UK and battery rules; `h.m(n, cur)`, `h.num`, `h.date`, `h.table`.

## Data

- `src/data/airlines.json`: one record per airline, each figure read on the airline's own page (`sources`, `readOn`,
  `via: wayback` when the archived copy of the airline page was read).
- `src/data/params-2026.json`: sources, TSA, UK airport and battery rules.
- `src/data/checks.json`: one verbatim sentence per figure; `scripts/update-data.py` re-reads every page monthly
  (workflow `.github/workflows/update-data.yml`, exit code 2 on a change). Raw copies of airline pages go to `data/raw/`
  (git-ignored), never into `public/`.
