/**
 * Bag engine: pure functions, no network. Every limit and fee comes from `data/airlines.json`
 * (one record per airline, each figure read on the airline's own page, see `sources`).
 *
 * Size test: an airline publishes length × width × depth "including wheels and handles". A bag is
 * checked in the orientation that suits it best: its three sides sorted from longest to shortest
 * are compared with the limit's three sides sorted the same way. When the airline publishes a total
 * of linear inches (length + width + depth) instead, the sum is compared.
 */
import A from '../../data/airlines.json';

export type Region = 'us' | 'uk';
export type Cur = 'USD' | 'GBP' | 'EUR';
export type Cat = 'personal' | 'carry' | 'checked';
export interface Limit {
  /** Sides in inches (US airlines publish inches; cm kept when published too). */
  in?: number[]; cm?: number[];
  /** Total of the three sides, inches or cm, when the airline uses a sum. */
  linearIn?: number; linearCm?: number;
  lb?: number | null; kg?: number | null;
  /** Who gets it: plain-language summary, as the airline states it. */
  included?: string;
  note?: string;
}
export interface Fee { online?: number | null; airport?: number | null }
export interface Airline {
  id: string; name: string; region: Region; currency: Cur;
  personal: Limit | null; carry: Limit | null; checked: Limit | null;
  /** Fares or bundles that leave the carry-on out: text. */
  carryIncluded: 'all' | 'not-basic' | 'paid' | 'bundle';
  carryFee?: Fee | null;
  fees: { first?: Fee | null; second?: Fee | null; third?: Fee | null } | null;
  /** Published range when the airline prices bags per flight. */
  range?: { item: string; min: number; max: number; channel?: string }[] | null;
  dynamic: boolean;
  overweight?: Array<{ fromLb: number; toLb: number; fee: number }> | null;
  oversize?: { fromLinearIn: number; fee: number } | null;
  perks?: { card?: string; cardBags?: number; status?: string; statusBags?: number; military?: string; militaryBags?: number } | null;
  /** Lowest fares that pay more per bag (American Basic Economy from May 18, 2026). */
  basicFees?: { first?: Fee | null; second?: Fee | null; from?: string } | null;
  carryFeeLabels?: [string, string];
  /** Airline that stopped flying: kept for its page, left out of the tools. */
  ceased?: string;
  /** Figures read on an old archived copy only: shown, labeled, never highlighted. */
  unconfirmed?: boolean;
  personalNote?: string; carryNote?: string;
  changes?: string | null;
  sources: string[];
  readOn: string;
  via?: string;
}
export const ALL_AIRLINES = (A as unknown as { airlines: Airline[] }).airlines;
/** Airlines still flying: the ones the tools compare. */
export const AIRLINES = ALL_AIRLINES.filter((a) => !a.ceased);
export const airline = (id: string) => {
  const a = ALL_AIRLINES.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown airline ${id}`);
  return a;
};
export const byRegion = (r: Region | 'all') => AIRLINES.filter((a) => r === 'all' || a.region === r);

export const CM_PER_IN = 2.54;
export const KG_PER_LB = 0.45359237;
export const toIn = (cm: number) => cm / CM_PER_IN;
export const toCm = (inch: number) => inch * CM_PER_IN;
export const toLb = (kg: number) => kg / KG_PER_LB;
export const toKg = (lb: number) => lb * KG_PER_LB;
export const linear = (d: number[]) => d.reduce((s, x) => s + x, 0);
const desc = (d: number[]) => [...d].sort((a, b) => b - a);

export interface Bag { /** inches */ dims: number[]; /** pounds, 0 = not weighed */ lb: number }
export type Verdict = 'fits' | 'too-big' | 'too-heavy' | 'unknown';
export interface Check { verdict: Verdict; /** largest excess, inches (size) or pounds (weight) */ over: number; limitText: string; side?: number }

/** Limit sides in inches: the published inches, else the published centimetres converted. */
export function limitIn(l: Limit): number[] | null {
  if (l.in && l.in.length === 3) return l.in;
  if (l.cm && l.cm.length === 3) return l.cm.map(toIn);
  return null;
}
export function limitLb(l: Limit): number | null {
  if (l.lb != null) return l.lb;
  if (l.kg != null) return toLb(l.kg);
  return null;
}
/** Small tolerance: 0.05 in (about 1 mm) for rounding between inches and centimetres. */
const TOL = 0.05;
export function check(bag: Bag, l: Limit | null): Check {
  if (!l) return { verdict: 'unknown', over: 0, limitText: '' };
  const sides = limitIn(l);
  const lin = l.linearIn ?? (l.linearCm != null ? toIn(l.linearCm) : null);
  let over = 0; let side: number | undefined;
  if (sides) {
    const b = desc(bag.dims), s = desc(sides);
    b.forEach((x, i) => { const d = x - s[i]; if (d > over + 0) { over = d; side = i; } });
  } else if (lin != null) {
    over = linear(bag.dims) - lin;
  } else return { verdict: 'unknown', over: 0, limitText: '' };
  const limitText = sides ? (l.in ? `${l.in.join(' × ')} in` : `${l.cm!.join(' × ')} cm`) : `${l.linearIn ?? l.linearCm} ${l.linearIn != null ? 'linear in' : 'linear cm'}`;
  if (over > TOL) return { verdict: 'too-big', over, limitText, side };
  const maxLb = limitLb(l);
  if (bag.lb > 0 && maxLb != null && bag.lb > maxLb + 0.01) return { verdict: 'too-heavy', over: bag.lb - maxLb, limitText };
  return { verdict: 'fits', over: 0, limitText };
}
export const limitOf = (a: Airline, c: Cat) => (c === 'personal' ? a.personal : c === 'carry' ? a.carry : a.checked);

/** Every airline of a region against one bag, one category. */
export function checkAll(bag: Bag, c: Cat, r: Region | 'all') {
  return byRegion(r).map((a) => ({ a, res: check(bag, limitOf(a, c)) }));
}

export type Channel = 'online' | 'airport';
export type Perk = 'none' | 'card' | 'status' | 'military';
export interface TripInput { airline: string; bags: number; carry: boolean; channel: Channel; perk: Perk; travelers: number; roundTrip: boolean; basic?: boolean }
export interface TripOut { perWay: number; total: number; lines: Array<{ label: string; amount: number }>; known: boolean; missing: string[]; note?: string; cur: Cur }

const pick = (f: Fee | null | undefined, ch: Channel) => (f ? (ch === 'airport' ? f.airport ?? f.online : f.online ?? f.airport) ?? null : null);

/** Bag fees of one trip for a fixed-price airline. Dynamic airlines return known = false. */
export function tripFees(t: TripInput): TripOut {
  const a = airline(t.airline);
  const cur = a.currency;
  const ways = t.roundTrip ? 2 : 1;
  const trav = Math.max(1, Math.min(9, Math.round(t.travelers)));
  const lines: TripOut['lines'] = [];
  if (a.dynamic || !a.fees) return { perWay: 0, total: 0, lines, known: false, missing: [], cur, note: 'priced per flight at booking' };
  const basic = t.basic && a.basicFees;
  const fees = [basic ? a.basicFees!.first ?? a.fees.first : a.fees.first, basic ? a.basicFees!.second ?? a.fees.second : a.fees.second, a.fees.third];
  let free = 0;
  if (t.perk === 'card') free = a.perks?.cardBags ?? 0;
  if (t.perk === 'status') free = a.perks?.statusBags ?? 0;
  if (t.perk === 'military') free = a.perks?.militaryBags ?? 0;
  let perWay = 0; let known = true; const missing: string[] = [];
  for (let i = 0; i < Math.min(t.bags, 3); i++) {
    if (i < free) { lines.push({ label: `Checked bag ${i + 1}`, amount: 0 }); continue; }
    const f = pick(fees[Math.min(i, 2)], t.channel);
    if (f == null) { known = false; missing.push(`Checked bag ${i + 1}`); continue; }
    perWay += f; lines.push({ label: `Checked bag ${i + 1}`, amount: f });
  }
  // United: Basic Economy carry-on exempt for status holders and primary co-branded cardmembers.
  const carryExempt = t.perk === 'status' || t.perk === 'card';
  if (t.carry && !carryExempt && (a.carryIncluded === 'paid' || (a.carryIncluded === 'not-basic' && t.basic))) {
    const f = pick(a.carryFee, t.channel);
    if (f == null) { known = false; missing.push('Carry-on bag'); } else { perWay += f; lines.push({ label: 'Carry-on bag', amount: f }); }
  }
  return { perWay, total: perWay * ways * trav, lines, known, missing, cur };
}

/** Overweight or oversize charge for one checked bag, per way (fixed-price airlines). */
export function excessFee(id: string, lb: number, linIn: number) {
  const a = airline(id);
  let w = 0;
  for (const b of a.overweight ?? []) if (lb >= b.fromLb && lb <= b.toLb) w = b.fee;
  const maxW = Math.max(0, ...(a.overweight ?? []).map((b) => b.toLb));
  const refused = (a.overweight?.length ?? 0) > 0 && lb > maxW;
  const s = a.oversize && linIn >= a.oversize.fromLinearIn ? a.oversize.fee : 0;
  return { weight: w, size: s, refused, cur: a.currency };
}

/** Watt-hours of a lithium-ion pack: mAh × V / 1000. */
export const wattHours = (mAh: number, volts: number) => (mAh * volts) / 1000;
