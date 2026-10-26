/**
 * Power bank check: capacity (mAh) and voltage → watt-hours → what the FAA (US) or the CAA (UK)
 * allows in the cabin and in the hold. Limits from params-2026.json (rules.batteries).
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import Toggle from '../ui/Toggle';
import { wattHours } from '../../lib/engine/bags';
import { formatNumberL } from '../../lib/format-l';
import P from '../../data/params-2026.json';

interface Props { idPrefix?: string; region?: 'us' | 'uk'; primary?: boolean }
const B = P.rules.batteries;

export function batteryVerdict(wh: number, count: number) {
  if (wh <= B.noApprovalWh) return { cabin: 'Allowed in carry-on', approval: false, hold: 'Not allowed in checked bags', ok: true, extra: count > 0 ? '' : '' };
  if (wh <= B.approvalWh) return { cabin: count > B.approvalMaxSpares ? `Over the limit: at most ${B.approvalMaxSpares} spares of this size, with airline approval` : 'Carry-on only with the airline’s approval', approval: true, hold: 'Not allowed in checked bags', ok: count <= B.approvalMaxSpares };
  return { cabin: 'Not allowed on a passenger flight', approval: false, hold: 'Not allowed in checked bags', ok: false };
}

export default function PowerBank({ idPrefix = 'pb', region = 'us', primary = false }: Props) {
  const [mah, setMah] = useState(20000);
  const [v, setV] = useState(3.7);
  const [n, setN] = useState(1);
  const [reg, setReg] = useState(region);
  const wh = useMemo(() => wattHours(mah, v), [mah, v]);
  const out = batteryVerdict(wh, n);
  const p = (s: string) => `${idPrefix}-${s}`;
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <p className="text-base font-semibold text-navy-900">Can this power bank fly?</p>
      <div className="mt-3 grid gap-5 sm:grid-cols-2">
        <form className="grid content-start gap-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <NumberField id={p('mah')} label="Capacity printed on it" value={mah} onChange={setMah} unit="mAh" max={200000} tag="en-US" />
          <div className="grid grid-cols-2 gap-3">
            <NumberField id={p('v')} label="Voltage" value={v} onChange={setV} unit="V" max={60} decimals={2} help="3.7 V for most packs" tag="en-US" />
            <NumberField id={p('n')} label="How many" value={n} onChange={(x) => setN(Math.max(1, Math.round(x)))} max={20} tag="en-US" />
          </div>
          <Toggle id={p('reg')} label="Flying from" value={reg} onChange={(x) => setReg(x as 'us' | 'uk')} options={[{ value: 'us', label: 'US (FAA)' }, { value: 'uk', label: 'UK (CAA)' }]} />
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">Rating of each power bank</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{formatNumberL(wh, 'en', wh < 10 ? 1 : 0)} Wh</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-3 text-navy-600">Carry-on</td><td className={`py-1.5 text-right font-semibold ${out.ok ? 'text-emerald-800' : 'text-red-800'}`}>{out.cabin}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">Checked bag</td><td className="py-1.5 text-right font-semibold text-red-800">{out.hold}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">Limits applied</td><td className="tabular-nums py-1.5 text-right text-navy-900">{B.noApprovalWh} Wh / {B.approvalWh} Wh</td></tr>
          </tbody></table>
          <p className="mt-2 text-xs text-navy-600">{reg === 'us' ? B.noteUs : B.noteUk} Your airline can be stricter.</p>
        </div>
      </div>
    </div>
  );
}
