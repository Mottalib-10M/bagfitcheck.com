/**
 * "Will my bag fit?": one bag (three sides and a weight) against every airline of the site, as a
 * personal item, a carry-on or a checked bag. Figures from data/airlines.json through the engine.
 * First render = build defaults (RECETTE §17.5); nothing typed leaves the browser.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { checkAll, toIn, toLb, type Cat, type Region } from '../../lib/engine/bags';
import { formatNumberL } from '../../lib/format-l';

interface Props { idPrefix?: string; mode?: Cat; region?: Region | 'all'; unit?: 'in' | 'cm'; dims?: number[]; weight?: number; primary?: boolean; links?: Record<string, string> }
const CAT_LABEL: Record<Cat, string> = { personal: 'personal item (under the seat)', carry: 'carry-on (overhead bin)', checked: 'checked bag (hold)' };
const DEFAULTS: Record<Cat, { in: number[]; cm: number[]; lb: number; kg: number }> = {
  personal: { in: [16, 12, 8], cm: [40, 30, 20], lb: 10, kg: 5 },
  carry: { in: [22, 14, 9], cm: [55, 40, 20], lb: 15, kg: 7 },
  checked: { in: [28, 18, 12], cm: [70, 45, 30], lb: 45, kg: 20 },
};

export default function FitCheck({ idPrefix = 'fit', mode = 'carry', region = 'all', unit = 'in', dims, weight, primary = false, links = {} }: Props) {
  const d0 = dims ?? DEFAULTS[mode][unit];
  const [u, setU] = useState<'in' | 'cm'>(unit);
  const [cat, setCat] = useState<Cat>(mode);
  const [reg, setReg] = useState<Region | 'all'>(region);
  const [l, setL] = useState(d0[0]);
  const [w, setW] = useState(d0[1]);
  const [h, setH] = useState(d0[2]);
  const [wt, setWt] = useState(weight ?? (unit === 'in' ? DEFAULTS[mode].lb : DEFAULTS[mode].kg));
  const r1 = (x: number) => Math.round(x * 10) / 10;
  const switchUnit = (n: 'in' | 'cm') => {
    if (n === u) return;
    const k = n === 'cm' ? 2.54 : 1 / 2.54, kw = n === 'cm' ? 0.45359237 : 1 / 0.45359237;
    setL(r1(l * k)); setW(r1(w * k)); setH(r1(h * k)); setWt(r1(wt * kw)); setU(n);
  };
  const bag = useMemo(() => {
    const dimsIn = [l, w, h].map((x) => (u === 'cm' ? toIn(x) : x));
    return { dims: dimsIn, lb: u === 'cm' ? toLb(wt) : wt };
  }, [l, w, h, wt, u]);
  const rows = useMemo(() => checkAll(bag, cat, reg), [bag, cat, reg]);
  const ok = rows.filter((r) => r.res.verdict === 'fits').length;
  const known = rows.filter((r) => r.res.verdict !== 'unknown').length;
  const f1 = (x: number) => formatNumberL(x, 'en', x < 10 ? 1 : 0);
  const overText = (v: string, over: number) => (v === 'too-big' ? `${u === 'cm' ? f1(over * 2.54) + ' cm' : f1(over) + ' in'} too big` : v === 'too-heavy' ? `${u === 'cm' ? f1(over * 0.4536) + ' kg' : f1(over) + ' lb'} too heavy` : '');
  const wUnit = u === 'cm' ? 'kg' : 'lb';
  const p = (s: string) => `${idPrefix}-${s}`;
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <p className="text-base font-semibold text-navy-900">Will my bag fit? Your bag against {rows.length} airlines</p>
      <div className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form className="grid min-w-0 grid-cols-1 content-start gap-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SelectField id={p('cat')} label="Check it as a" value={cat} onChange={(x) => setCat(x as Cat)} options={(['personal', 'carry', 'checked'] as Cat[]).map((c) => ({ value: c, label: CAT_LABEL[c] }))} />
            <Toggle id={p('unit')} label="Units" value={u} onChange={(x) => switchUnit(x as 'in' | 'cm')} options={[{ value: 'in', label: 'in / lb' }, { value: 'cm', label: 'cm / kg' }]} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <NumberField id={p('l')} label="Height" value={l} onChange={setL} unit={u} max={u === 'cm' ? 300 : 120} decimals={1} tag="en-US" />
            <NumberField id={p('w')} label="Width" value={w} onChange={setW} unit={u} max={u === 'cm' ? 300 : 120} decimals={1} tag="en-US" />
            <NumberField id={p('h')} label="Depth" value={h} onChange={setH} unit={u} max={u === 'cm' ? 300 : 120} decimals={1} tag="en-US" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NumberField id={p('wt')} label="Weight (0 if not weighed)" value={wt} onChange={setWt} unit={wUnit} max={u === 'cm' ? 100 : 220} decimals={1} tag="en-US" />
            <SelectField id={p('reg')} label="Airlines" value={reg} onChange={(x) => setReg(x as Region | 'all')} options={[{ value: 'all', label: 'US, UK and Europe' }, { value: 'us', label: 'US airlines' }, { value: 'uk', label: 'UK and Europe airlines' }]} />
          </div>
          <p className="text-xs text-navy-600">Measure with wheels and handles. Nothing you type leaves this browser.</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">Fits as a {CAT_LABEL[cat]}</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{ok} of {known} airlines</p>
          <ul className="mt-3 max-h-80 divide-y divide-navy-200 overflow-y-auto text-sm">
            {rows.map(({ a, res }) => (
              <li key={a.id} className="flex items-baseline justify-between gap-3 py-1.5">
                <span className="text-navy-800">{links[a.id] ? <a className="underline hover:text-navy-950" href={links[a.id]}>{a.name}</a> : a.name}{a.unconfirmed ? <span className="text-xs text-navy-600"> (archived figures)</span> : null}</span>
                <span className={`text-right ${res.verdict === 'fits' ? 'font-semibold text-emerald-800' : res.verdict === 'unknown' ? 'text-navy-600' : 'font-semibold text-red-800'}`}>
                  {res.verdict === 'fits' ? `Fits (${res.limitText})` : res.verdict === 'unknown' ? 'No published limit' : `${overText(res.verdict, res.over)} (${res.limitText})`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
