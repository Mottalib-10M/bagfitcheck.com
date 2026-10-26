/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always through the engine
 * (`lib/engine/bags.ts`) and the data files, never a second formula.
 * `bag:<airline id>` checks one bag against one airline's three limits.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { money, formatNumberL } from './format-l';
import { AIRLINES, ALL_AIRLINES, airline, check, excessFee, linear, toCm, toIn, toLb, tripFees, type Airline, type Limit } from './engine/bags';

const n1 = (v: number) => formatNumberL(v, 'en', Number.isInteger(Math.round(v * 10) / 10) ? 0 : 1);
const n0 = (v: number) => formatNumberL(v);
const opts = (list: Airline[]) => list.map((a, i) => ({ value: String(i), label: a.name }));
const at = <T,>(list: T[], i: number) => list[Math.max(0, Math.min(list.length - 1, Math.round(i)))];
const T = P.rules.tsa, TF = P.rules.tsaFood;

const VERD: Record<string, string> = { fits: 'fits', 'too-big': 'too big', 'too-heavy': 'too heavy', unknown: 'no published limit' };
function bagSpec(id: string): MiniSpec {
  const a = airline(id);
  const cm = a.region === 'uk';
  const u = cm ? 'cm' : 'in', wu = cm ? 'kg' : 'lb';
  const def = cm ? { l: 55, w: 40, h: 20, wt: 10 } : { l: 22, w: 14, h: 9, wt: 15 };
  return {
    title: `Does my bag fit on ${a.name}?`, cta: 'Compare with every airline', ctaPage: 'carry-on-size',
    inputs: [
      { id: 'l', label: `Height (${u})`, def: def.l, unit: u, max: cm ? 300 : 120, decimals: 1 },
      { id: 'w', label: `Width (${u})`, def: def.w, unit: u, max: cm ? 300 : 120, decimals: 1 },
      { id: 'h', label: `Depth (${u})`, def: def.h, unit: u, max: cm ? 300 : 120, decimals: 1 },
      { id: 'wt', label: `Weight (${wu})`, def: def.wt, unit: wu, max: cm ? 100 : 220, decimals: 1 },
    ],
    run: (v) => {
      const bag = { dims: [v.l, v.w, v.h].map((x) => (cm ? toIn(x) : x)), lb: cm ? toLb(v.wt) : v.wt };
      const r = (l: Limit | null) => check(bag, l);
      const p = r(a.personal), c = r(a.carry), k = r(a.checked);
      const best = p.verdict === 'fits' ? 'Personal item' : c.verdict === 'fits' ? 'Carry-on' : k.verdict === 'fits' ? 'Checked bag only' : 'Too big for all three';
      return {
        head: [`Smallest way it travels on ${a.name}`, best],
        rows: [['Personal item', VERD[p.verdict]], ['Carry-on', VERD[c.verdict]], ['Checked bag', VERD[k.verdict]]],
        note: `Limits read on ${a.name}’s page${a.via === 'wayback' ? ' (archived copy)' : ''}; measure with wheels and handles.`,
      };
    },
  };
}

const OVER = AIRLINES.filter((a) => (a.overweight?.length ?? 0) > 0);
const CARD = AIRLINES.filter((a) => a.perks?.cardBags && !a.dynamic && a.fees?.first);
const BASIC = AIRLINES.filter((a) => a.id === 'american' || a.id === 'united');
const EXCESS = AIRLINES.filter((a) => a.region === 'uk' && (a as any).excess);
const excessKg = (a: Airline) => { const e = (a as any).excess; return e?.amount ?? e?.shortMidHaul ?? 0; };
const SIZES = AIRLINES.filter((a) => a.personal && a.carry);

const SPECS: Record<string, () => MiniSpec> = {
  convert: () => ({
    title: 'Centimetres to inches, side by side', cta: 'Check the bag against every airline', ctaPage: 'carry-on-size',
    inputs: [
      { id: 'a', label: 'Side 1 (cm)', def: 55, unit: 'cm', max: 300, decimals: 1 },
      { id: 'b', label: 'Side 2 (cm)', def: 40, unit: 'cm', max: 300, decimals: 1 },
      { id: 'c', label: 'Side 3 (cm)', def: 20, unit: 'cm', max: 300, decimals: 1 },
    ],
    run: (v) => {
      const i = [v.a, v.b, v.c].map(toIn);
      return { head: ['In inches', `${i.map(n1).join(' × ')} in`], rows: [['Linear size', `${n1(linear(i))} in (${n0(linear([v.a, v.b, v.c]))} cm)`], ['Inches from cm', 'cm ÷ 2.54']], note: 'Airlines measure with wheels and handles.' };
    },
  }),
  weight: () => ({
    title: 'Kilograms or pounds: is it under the usual 50 lb (23 kg)?', cta: 'See each airline’s checked bag limit', ctaPage: 'checked-bag-weight-limit',
    inputs: [{ id: 'kg', label: 'Bag weight on your scale (kg)', def: 21, unit: 'kg', max: 100, decimals: 1 }],
    run: (v) => {
      const lb = toLb(v.kg);
      return { head: ['In pounds', `${n1(lb)} lb`], rows: [['Margin to 50 lb', lb <= 50 ? `${n1(50 - lb)} lb under` : `${n1(lb - 50)} lb over`], ['Margin to 23 kg', v.kg <= 23 ? `${n1(23 - v.kg)} kg under` : `${n1(v.kg - 23)} kg over`]], note: '1 lb = 0.45359237 kg exactly. Airline scales are the ones that count.' };
    },
  }),
  overweight: () => ({
    title: 'Overweight or oversize: what one checked bag costs extra', cta: 'Compare overweight fees', ctaPage: 'overweight-baggage-fee',
    inputs: [
      { id: 'al', label: 'Airline', def: 0, options: opts(OVER) },
      { id: 'lb', label: 'Bag weight (lb)', def: 55, unit: 'lb', max: 150, decimals: 1 },
      { id: 'lin', label: 'Length + width + height (in)', def: 62, unit: 'in', max: 200 },
    ],
    run: (v) => {
      const a = at(OVER, v.al);
      const f = excessFee(a.id, v.lb, v.lin);
      const extra = Math.max(f.weight, f.size);
      return {
        head: [`${a.name}, each way, on top of the bag fee`, f.refused ? 'Not accepted' : money(extra, a.currency)],
        rows: [['Overweight charge', money(f.weight, a.currency)], ['Oversize charge', money(f.size, a.currency)], ['Checked bag limit', `${a.checked?.lb ?? 'n/a'} lb, ${a.checked?.linearIn ?? 'n/a'} in`]],
        note: a.id === 'american' ? 'When a bag is both overweight and oversize, American applies the higher fee only.' : 'Read on the airline’s excess baggage page.',
      };
    },
  }),
  card: () => ({
    title: 'Does the airline’s co-branded card pay for itself in bag fees?', cta: 'Free checked bags explained', ctaPage: 'free-checked-bags',
    inputs: [
      { id: 'al', label: 'Airline', def: 0, options: opts(CARD) },
      { id: 'trips', label: 'Round trips a year', def: 2, max: 50 },
      { id: 'pax', label: 'Travelers on the booking', def: 2, max: 9 },
      { id: 'fee', label: 'Card annual fee ($)', def: 0, unit: '$', max: 1000, help: 'From your card’s terms' },
    ],
    run: (v) => {
      const a = at(CARD, v.al);
      const one = tripFees({ airline: a.id, bags: 1, carry: false, channel: 'online', perk: 'none', travelers: v.pax, roundTrip: true }).total;
      const saved = one * Math.max(0, Math.round(v.trips));
      return { head: ['First checked bag fees avoided in a year', money(saved, a.currency)], rows: [['Net of the annual fee', money(saved - v.fee, a.currency)], ['First bag, each way', money(one / Math.max(1, v.pax) / 2, a.currency)]], note: a.perks?.card ?? '' };
    },
  }),
  basic: () => ({
    title: 'Basic fare or main cabin once bags are added?', cta: 'Basic economy rules', ctaPage: 'basic-economy-carry-on',
    inputs: [
      { id: 'al', label: 'Airline', def: 0, options: opts(BASIC) },
      { id: 'gap', label: 'Fare saved with basic, each way ($)', def: 30, unit: '$', max: 2000 },
      { id: 'bags', label: 'Checked bags', def: 1, max: 3 },
      { id: 'carry', label: 'Need a full-size carry-on?', def: 1, options: [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }] },
    ],
    run: (v) => {
      const a = at(BASIC, v.al);
      const args = { airline: a.id, bags: Math.round(v.bags), carry: v.carry === 1, channel: 'online' as const, perk: 'none' as const, travelers: 1, roundTrip: false };
      const b = tripFees({ ...args, basic: true }), m = tripFees({ ...args, basic: false });
      const extra = b.perWay - m.perWay;
      return { head: ['Basic still saves, each way', money(v.gap - extra, a.currency)], rows: [['Bag fees on basic', money(b.perWay, a.currency)], ['Bag fees on main', money(m.perWay, a.currency)], ['Extra bag cost of basic', money(extra, a.currency)]], note: b.missing.length ? 'Second and later bag fees are not published as a table; only the first bag is counted.' : 'Online prices, one traveler.' };
    },
  }),
  liquid: () => ({
    title: 'Is this container under the TSA 3.4 ounce limit?', cta: 'TSA liquids rule', ctaPage: 'tsa-liquid-rule',
    inputs: [{ id: 'oz', label: 'Size printed on the container', def: 3.4, unit: 'oz', max: 200, decimals: 1 }],
    run: (v) => {
      const ml = v.oz * 29.5735;
      const ok = v.oz <= T.oz + 0.001;
      return { head: ['In the carry-on quart bag?', ok ? 'Yes' : 'No, check it'], rows: [['In milliliters', `${n0(ml)} ml`], ['Limit', `${n1(T.oz)} oz (${T.ml} ml)`]], note: 'The size printed on the container counts, not how full it is.' };
    },
  }),
  alcohol: () => ({
    title: 'Can this bottle go in a checked bag?', cta: 'Food and drink rules', ctaPage: 'food-on-plane',
    inputs: [
      { id: 'abv', label: 'Alcohol by volume', def: 40, unit: '%', max: 100, decimals: 1 },
      { id: 'l', label: 'Total of these bottles', def: 2, unit: 'liters', max: 20, decimals: 2 },
    ],
    run: (v) => {
      const over = v.abv > TF.alcoholMaxPct, mid = v.abv > TF.alcoholMinPct && !over;
      const ok = !over && (!mid || v.l <= TF.alcoholLitres);
      return { head: ['In a checked bag', over ? 'Not allowed' : ok ? 'Allowed' : 'Over the limit'], rows: [['Rule that applies', over ? `over ${TF.alcoholMaxPct}%: banned` : mid ? `${TF.alcoholMinPct}–${TF.alcoholMaxPct}%: ${TF.alcoholLitres} liters max, unopened retail packaging` : `${TF.alcoholMinPct}% or less: no TSA quantity limit`], ['Carry-on', 'only 3.4 oz bottles in the quart bag']], note: 'TSA rule; your airline and your destination’s customs allowance may be stricter.' };
    },
  }),
  excess: () => ({
    title: 'Hold bag over the weight you booked: the airport charge', cta: 'Hold luggage size and weight', ctaPage: 'hold-luggage-size',
    inputs: [
      { id: 'al', label: 'Airline', def: 0, options: opts(EXCESS) },
      { id: 'kg', label: 'Kilos over your allowance', def: 3, unit: 'kg', max: 30, decimals: 1 },
    ],
    run: (v) => {
      const a = at(EXCESS, v.al);
      const per = excessKg(a), cur = (a as any).excess?.currency === 'EUR' ? 'EUR' : 'GBP';
      const kg = Math.ceil(v.kg);
      return { head: [`${a.name}, at the airport`, money(per * kg, cur)], rows: [['Per kilo', money(per, cur)], ['Kilos charged', n0(kg)]], note: a.id === 'tui' ? 'Short and mid-haul rate; long-haul is higher.' : 'Read on the airline’s fees page; weight added online before the flight costs less.' };
    },
  }),
  volume: () => ({
    title: 'Personal item or carry-on: how much more space?', cta: 'Personal item vs carry-on', ctaPage: 'personal-item-vs-carry-on',
    inputs: [{ id: 'al', label: 'Airline', def: 0, options: opts(SIZES) }],
    run: (v) => {
      const a = at(SIZES, v.al);
      const vol = (l: Limit) => { const s = l.cm ?? l.in!.map(toCm); return (s[0] * s[1] * s[2]) / 1000; };
      const p = vol(a.personal!), c = vol(a.carry!);
      return { head: ['Carry-on space vs personal item', `${n1(c / p)} times`], rows: [['Personal item', `about ${n0(p)} liters`], ['Carry-on', `about ${n0(c)} liters`], ['Carry-on on the lowest fare', a.carryIncluded === 'all' ? 'included' : a.carryIncluded === 'not-basic' ? 'not on basic' : 'paid extra']], note: 'Volume of the largest box allowed; soft bags rarely fill it.' };
    },
  }),
};

export function getSpec(kind: string): MiniSpec {
  if (kind.startsWith('bag-')) return bagSpec(kind.slice(4));
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool ${kind}`);
  return f();
}
export const MINI_KINDS = [...Object.keys(SPECS), ...ALL_AIRLINES.filter((a) => !a.ceased).map((a) => `bag-${a.id}`)];
