/** Formatting for the en-US pages (RECETTE §4: one locale, en-US; UK fees in pounds or euros as the airline states them). */
export type L = 'en';
export type Cur = 'USD' | 'GBP' | 'EUR';
const TAG = 'en-US';
export const langTag = (_lang: L = 'en') => TAG;
const cache = new Map<string, Intl.NumberFormat>();
function nf(o: Intl.NumberFormatOptions) {
  const k = JSON.stringify(o);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(TAG, o));
  return cache.get(k)!;
}
export const formatNumberL = (v: number, _lang: L = 'en', d = 0) => nf({ minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
const SYM: Record<Cur, string> = { USD: '$', GBP: '£', EUR: '€' };
/** $45, £24.99, €19.99: cents only when the airline's figure has them. */
export const money = (v: number, cur: Cur = 'USD', _lang: L = 'en') => {
  const cents = Math.round(v * 100) % 100 !== 0;
  return `${v < 0 ? '-' : ''}${SYM[cur]}${formatNumberL(Math.abs(v), 'en', cents ? 2 : 0)}`;
};
export const pct = (v: number, _lang: L = 'en', d = 0) => `${formatNumberL(v * 100, 'en', d)}%`;
/** "2026-10-24" → "October 24, 2026" (UTC, never shifts a day). */
export const dateL = (iso: string, _lang: L = 'en') => new Date(`${iso}T00:00:00Z`).toLocaleDateString(TAG, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
