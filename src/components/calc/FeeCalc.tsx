/**
 * Round-trip bag fees: airline, bags per traveler, carry-on, online or airport, free-bag benefit,
 * travelers. Fixed-price airlines from their published fee tables; airlines that price bags per
 * flight show their published range, never an invented figure. Nothing typed leaves the browser.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { AIRLINES, airline, tripFees, type Channel, type Perk } from '../../lib/engine/bags';
import { money, dateL } from '../../lib/format-l';

interface Props { idPrefix?: string; airline?: string; bags?: number; primary?: boolean; only?: 'us' | 'uk' }

export default function FeeCalc({ idPrefix = 'fee', airline: a0 = 'united', bags: b0 = 1, primary = false, only }: Props) {
  const list = AIRLINES.filter((a) => !only || a.region === only);
  const [id, setId] = useState(a0);
  const [bags, setBags] = useState(b0);
  const [carry, setCarry] = useState('1');
  const [basic, setBasic] = useState('0');
  const [ch, setCh] = useState<Channel>('online');
  const [perk, setPerk] = useState<Perk>('none');
  const [trav, setTrav] = useState(1);
  const [rt, setRt] = useState('1');
  const a = airline(id);
  const out = useMemo(() => tripFees({ airline: id, bags, carry: carry === '1', channel: ch, perk, travelers: trav, roundTrip: rt === '1', basic: basic === '1' }), [id, bags, carry, ch, perk, trav, rt, basic]);
  const m = (n: number) => money(n, out.cur);
  const p = (s: string) => `${idPrefix}-${s}`;
  const pk = a.perks ?? {};
  const bagWord = (n: number) => `${n} free bag${n > 1 ? 's' : ''}`;
  const perks = [{ value: 'none', label: 'None' }, ...(pk.cardBags ? [{ value: 'card', label: `Airline co-branded card (${bagWord(pk.cardBags)})` }] : []), ...(pk.statusBags ? [{ value: 'status', label: `Lowest elite tier (${bagWord(pk.statusBags)})` }] : []), ...(pk.militaryBags ? [{ value: 'military', label: `Active-duty military (${bagWord(pk.militaryBags)})` }] : [])];
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <p className="text-base font-semibold text-navy-900">Bag fees for your trip</p>
      <div className="mt-3 grid gap-5 lg:grid-cols-2">
        <form className="grid content-start gap-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectField id={p('al')} label="Airline" value={id} onChange={(x) => { setId(x); setPerk('none'); }} options={list.map((x) => ({ value: x.id, label: x.unconfirmed ? `${x.name} (archived figures)` : x.name }))} />
            <NumberField id={p('bags')} label="Checked bags per traveler" value={bags} onChange={(x) => setBags(Math.min(3, Math.round(x)))} max={3} tag="en-US" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle id={p('carry')} label="Taking a carry-on?" value={carry} onChange={setCarry} options={[{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }]} />
            <Toggle id={p('basic')} label="Basic or lowest fare?" value={basic} onChange={setBasic} options={[{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }]} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle id={p('ch')} label="Pay for bags" value={ch} onChange={(x) => setCh(x as Channel)} options={[{ value: 'online', label: 'Online' }, { value: 'airport', label: 'Airport' }]} />
            <SelectField id={p('perk')} label="Free-bag benefit" value={perk} onChange={(x) => setPerk(x as Perk)} options={perks} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField id={p('trav')} label="Travelers" value={trav} onChange={(x) => setTrav(Math.max(1, Math.min(9, Math.round(x))))} max={9} tag="en-US" />
            <Toggle id={p('rt')} label="Trip" value={rt} onChange={setRt} options={[{ value: '1', label: 'Round trip' }, { value: '0', label: 'One way' }]} />
          </div>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          {!a.dynamic ? (<>
            <p className="text-sm font-medium text-navy-600">{a.name}, {rt === '1' ? 'round trip' : 'one way'}, {trav} traveler{trav > 1 ? 's' : ''}</p>
            <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{out.known ? '' : 'at least '}{m(out.total)}</p>
            <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
              {out.lines.map((l) => <tr key={l.label}><td className="py-1.5 pr-3 text-navy-600">{l.label}, each way</td><td className="tabular-nums py-1.5 text-right text-navy-900">{l.amount === 0 ? 'free' : m(l.amount)}</td></tr>)}
              {out.missing.map((l) => <tr key={l}><td className="py-1.5 pr-3 text-navy-600">{l}, each way</td><td className="py-1.5 text-right text-navy-900">not published</td></tr>)}
              <tr><td className="py-1.5 pr-3 text-navy-600">Per traveler, each way</td><td className="tabular-nums py-1.5 text-right font-semibold text-navy-900">{m(out.perWay)}</td></tr>
            </tbody></table>
            <p className="mt-2 text-xs text-navy-600">{out.missing.length ? `${a.name} shows this fee only in its own booking tools, so it is left out. ` : ''}Fees read on {a.name}’s page{a.via === 'wayback' ? ' (archived copy)' : ''} on {dateL(a.readOn)}. {perk === 'card' ? pk.card : perk === 'status' ? pk.status : perk === 'military' ? pk.military : ''}</p>
          </>) : (<>
            <p className="text-sm font-medium text-navy-600">{a.name} prices bags per flight</p>
            <p className="mt-1 text-2xl font-bold text-navy-900">{a.range?.length ? `${money(a.range[0].min, a.currency)} to ${money(a.range[0].max, a.currency)}` : 'Shown at booking'}</p>
            {a.range?.length ? <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
              {a.range.map((r) => <tr key={r.item + (r.channel ?? '')}><td className="py-1.5 pr-3 text-navy-600">{r.item}{r.channel ? ` (${r.channel})` : ''}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(r.min, a.currency)} to {money(r.max, a.currency)}</td></tr>)}
            </tbody></table> : null}
            <p className="mt-2 text-xs text-navy-600">Published range read on {a.name}’s page{a.via === 'wayback' ? ' (archived copy)' : ''} on {dateL(a.readOn)}; the exact price depends on the route and date and appears before you pay.</p>
          </>)}
        </div>
      </div>
    </div>
  );
}
