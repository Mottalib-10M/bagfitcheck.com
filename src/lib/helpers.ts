/** Writing helpers handed to every page: links, figures read from data/airlines.json and params-2026.json, tables. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL, type Cur } from './format-l';
import { airline as al, AIRLINES, toCm, toIn, toKg, toLb, type Airline, type Limit } from './engine/bags';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const a = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${a(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${a(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
const r1 = (x: number) => Math.round(x * 10) / 10;
/** "22 × 14 × 9 in (56 × 36 × 23 cm)": published unit first, the other converted. */
export function dims(l: Limit | null | undefined): string {
  if (!l) return 'no published limit';
  const n = (x: number) => formatNumberL(r1(x), 'en', Number.isInteger(r1(x)) ? 0 : 1);
  if (l.in?.length === 3) return `${l.in.map(n).join(' × ')} in (${(l.cm?.length === 3 ? l.cm : l.in.map(toCm)).map((x) => n(Math.round(x))).join(' × ')} cm)`;
  if (l.cm?.length === 3) return `${l.cm.map(n).join(' × ')} cm (${l.cm.map((x) => n(toIn(x))).join(' × ')} in)`;
  if (l.linearIn != null) return `${n(l.linearIn)} linear in (${n(Math.round(toCm(l.linearIn)))} cm)`;
  if (l.linearCm != null) return `${n(l.linearCm)} linear cm (${n(toIn(l.linearCm))} in)`;
  return 'no published size';
}
export function weight(l: Limit | null | undefined): string {
  if (!l) return 'no published limit';
  const n = (x: number) => formatNumberL(r1(x), 'en', Number.isInteger(r1(x)) ? 0 : 1);
  if (l.lb != null) return `${n(l.lb)} lb (${n(toKg(l.lb))} kg)`;
  if (l.kg != null) return `${n(l.kg)} kg (${n(toLb(l.kg))} lb)`;
  return 'no published weight limit';
}
/** Every page id of the plan: a link to a planned page that is not written yet renders as text. */
export const PLANNED = [
  'carry-on-size', 'personal-item-size', 'personal-item-vs-carry-on', 'basic-economy-carry-on', 'hand-luggage-size', 'underseat-bag', 'hold-luggage-size',
  'checked-bag-fees', 'checked-bag-weight-limit', 'overweight-baggage-fee', 'free-checked-bags',
  'american', 'delta', 'united', 'southwest', 'alaska', 'jetblue', 'frontier', 'allegiant', 'hawaiian', 'spirit',
  'ryanair', 'easyjet', 'jet2', 'british-airways', 'wizz-air', 'tui', 'virgin-atlantic',
  'tsa-liquid-rule', 'uk-liquid-rules', 'power-bank-on-plane', 'food-on-plane',
];
export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !PLANNED.includes(id)) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const m = (n: number, cur: Cur = 'USD') => money(n, cur);
  const num = (n: number, d = 0) => formatNumberL(n, 'en', d);
  const pc = (x: number, d = 0) => pct(x, 'en', d);
  /** Airline record plus ready-made strings. */
  const A = (id: string) => {
    const x = al(id);
    const f = (k: 'first' | 'second' | 'third', ch: 'online' | 'airport' = 'online') => { const v = x.fees?.[k]?.[ch] ?? x.fees?.[k]?.online; return v == null ? 'not published' : money(v, x.currency); };
    return { ...x, f, pi: dims(x.personal), co: dims(x.carry), ck: dims(x.checked), piW: weight(x.personal), coW: weight(x.carry), ckW: weight(x.checked), read: dateL(x.readOn) };
  };
  return {
    lang, a, ext, src, m, num, pc, P, A, AIRLINES: AIRLINES as Airline[], dims, weight,
    date: (iso: string) => dateL(iso),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al2: Array<'l' | 'r'> = []) => table(h, r, c, al2),
  };
}
export type Helpers = ReturnType<typeof helpers>;
