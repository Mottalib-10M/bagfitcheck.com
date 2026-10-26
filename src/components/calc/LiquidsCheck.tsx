/**
 * Liquids in hand luggage: departure airport, container size and number → does it pass security?
 * US: TSA 3-1-1 rule at every airport. UK: the 100 ml rule, or the larger limit at the airports
 * whose own pages say their new scanners allow it. Rules from params-2026.json (rules.tsa, rules.uk).
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { formatNumberL, dateL } from '../../lib/format-l';
import P from '../../data/params-2026.json';

interface Props { idPrefix?: string; country?: 'us' | 'uk'; airport?: string; primary?: boolean }
const T = P.rules.tsa;
const U = P.rules.uk;
type Ap = (typeof U.airports)[number];
const ML_PER_OZ = 29.5735;

export function liquidVerdict(country: 'us' | 'uk', ap: Ap | null, ml: number, count: number) {
  if (country === 'us') {
    const ok = ml <= T.ml + 0.5;
    return { ok, head: ok ? 'Allowed in carry-on' : 'Not in carry-on: pack it in a checked bag', rows: [['Limit per container', `${formatNumberL(T.oz, 'en', 1)} oz (${T.ml} ml)`], ['Bag', `${T.bag}, one per passenger`], ['Your containers', `${count} × ${formatNumberL(ml, 'en', 0)} ml`]] as Array<[string, string]>, note: T.note };
  }
  const big = ap?.rule === 'large';
  const max = big ? (ap?.maxMl ?? U.ml) : U.ml;
  const ok = ml <= max + 0.5;
  return { ok, head: ok ? 'Allowed in hand luggage' : 'Not in hand luggage: put it in the hold', rows: [['Limit per container', `${formatNumberL(max, 'en', 0)} ml`], ['Bag', big ? (ap?.bag ?? U.bigBag) : U.bag], ['Rule read on', ap ? `${ap.name}, ${dateL(ap.readOn)}` : 'GOV.UK']] as Array<[string, string]>, note: big ? U.noteLarge : U.note100 };
}

export default function LiquidsCheck({ idPrefix = 'liq', country = 'us', airport, primary = false }: Props) {
  const [c, setC] = useState<'us' | 'uk'>(country);
  const [ap, setAp] = useState(airport ?? U.airports[0].code);
  const [unit, setUnit] = useState<'ml' | 'oz'>(country === 'us' ? 'oz' : 'ml');
  const [size, setSize] = useState(country === 'us' ? 3.4 : 100);
  const [count, setCount] = useState(4);
  const a = U.airports.find((x) => x.code === ap) ?? null;
  const ml = unit === 'oz' ? size * ML_PER_OZ : size;
  const out = useMemo(() => liquidVerdict(c, a, ml, count), [c, a, ml, count]);
  const p = (s: string) => `${idPrefix}-${s}`;
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <p className="text-base font-semibold text-navy-900">Can I take this liquid through security?</p>
      <div className="mt-3 grid gap-5 sm:grid-cols-2">
        <form className="grid content-start gap-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <Toggle id={p('c')} label="Flying from" value={c} onChange={(x) => setC(x as 'us' | 'uk')} options={[{ value: 'us', label: 'US airport' }, { value: 'uk', label: 'UK airport' }]} />
          {c === 'uk' && <SelectField id={p('ap')} label="UK airport" value={ap} onChange={setAp} options={U.airports.map((x) => ({ value: x.code, label: x.name }))} />}
          <div className="grid grid-cols-2 gap-3">
            <NumberField id={p('size')} label="Container size" value={size} onChange={setSize} unit={unit} max={unit === 'oz' ? 100 : 3000} decimals={1} tag="en-US" />
            <Toggle id={p('u')} label="Unit" value={unit} onChange={(x) => { const n = x as 'ml' | 'oz'; if (n !== unit) setSize(Math.round((n === 'oz' ? size / ML_PER_OZ : size * ML_PER_OZ) * 10) / 10); setUnit(n); }} options={[{ value: 'oz', label: 'oz' }, { value: 'ml', label: 'ml' }]} />
          </div>
          <NumberField id={p('n')} label="Number of containers" value={count} onChange={(x) => setCount(Math.max(1, Math.round(x)))} max={50} tag="en-US" />
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{formatNumberL(ml, 'en', 0)} ml per container</p>
          <p className={`mt-1 text-2xl font-bold ${out.ok ? 'text-emerald-800' : 'text-red-800'}`}>{out.head}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            {out.rows.map(([l, x]) => <tr key={l}><td className="py-1.5 pr-3 text-navy-600">{l}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{x}</td></tr>)}
          </tbody></table>
          <p className="mt-2 text-xs text-navy-600">{out.note}</p>
        </div>
      </div>
    </div>
  );
}
