/** Engine cases computed by hand from the figures in src/data (RECETTE §9). */
import { describe, expect, it } from 'vitest';
import { airline, AIRLINES, check, checkAll, excessFee, toCm, toIn, toKg, toLb, tripFees, wattHours } from '../src/lib/engine/bags';
import { liquidVerdict } from '../src/components/calc/LiquidsCheck';
import { batteryVerdict } from '../src/components/calc/PowerBank';
import P from '../src/data/params-2026.json';

describe('conversions', () => {
  it('inches and pounds are exact', () => {
    expect(toCm(1)).toBe(2.54);
    expect(toIn(55)).toBeCloseTo(21.65, 2);
    expect(toKg(50)).toBeCloseTo(22.68, 2);
    expect(toLb(23)).toBeCloseTo(50.71, 2);
  });
});

describe('bag size check', () => {
  it('22 × 14 × 9 in fits American, order of sides does not matter', () => {
    expect(check({ dims: [9, 22, 14], lb: 0 }, airline('american').carry).verdict).toBe('fits');
  });
  it('one inch too long is refused with the excess', () => {
    const r = check({ dims: [23, 14, 9], lb: 0 }, airline('american').carry);
    expect(r.verdict).toBe('too-big');
    expect(r.over).toBeCloseTo(1, 5);
  });
  it('55 × 40 × 20 cm fits Ryanair cabin bag but not Virgin Atlantic', () => {
    const bag = { dims: [55, 40, 20].map(toIn), lb: 0 };
    expect(check(bag, airline('ryanair').carry).verdict).toBe('fits');
    expect(check(bag, airline('virgin-atlantic').carry).verdict).toBe('too-big');
  });
  it('weight cap: Frontier personal item over its pounds', () => {
    const lim = airline('frontier').personal!;
    expect(check({ dims: [17, 13, 8], lb: (lim.lb ?? 0) + 1 }, lim).verdict).toBe('too-heavy');
  });
  it('linear limit: 62 in checked bag', () => {
    expect(check({ dims: [30, 20, 12], lb: 0 }, airline('delta').checked).verdict).toBe('fits');
    expect(check({ dims: [31, 21, 12], lb: 0 }, airline('delta').checked).verdict).toBe('too-big');
  });
  it('no published size gives unknown', () => {
    expect(check({ dims: [18, 14, 8], lb: 0 }, airline('delta').personal).verdict).toBe('unknown');
  });
  it('ceased airline is left out of the comparison', () => {
    expect(AIRLINES.some((a) => a.id === 'spirit')).toBe(false);
    expect(checkAll({ dims: [10, 10, 5], lb: 0 }, 'personal', 'us').length).toBe(9);
  });
});

describe('trip fees', () => {
  it('American, 2 bags online, round trip, 2 travelers', () => {
    const r = tripFees({ airline: 'american', bags: 2, carry: false, channel: 'online', perk: 'none', travelers: 2, roundTrip: true });
    expect(r.perWay).toBe(45 + 55);
    expect(r.total).toBe(400);
    expect(r.known).toBe(true);
  });
  it('American Basic Economy pays the higher table', () => {
    const r = tripFees({ airline: 'american', bags: 1, carry: false, channel: 'airport', perk: 'none', travelers: 1, roundTrip: false, basic: true });
    expect(r.perWay).toBe(55);
  });
  it('co-branded card makes the first bag free', () => {
    const r = tripFees({ airline: 'delta', bags: 2, carry: false, channel: 'online', perk: 'card', travelers: 1, roundTrip: false });
    expect(r.perWay).toBe(55);
  });
  it('United second bag is not published: flagged as missing', () => {
    const r = tripFees({ airline: 'united', bags: 2, carry: false, channel: 'online', perk: 'none', travelers: 1, roundTrip: false });
    expect(r.known).toBe(false);
    expect(r.missing).toContain('Checked bag 2');
    expect(r.perWay).toBe(45);
  });
  it('United Basic Economy carry-on at the gate, exempt with status', () => {
    const base = { airline: 'united', bags: 0, carry: true, channel: 'airport' as const, travelers: 1, roundTrip: false, basic: true };
    expect(tripFees({ ...base, perk: 'none' }).perWay).toBe(75);
    expect(tripFees({ ...base, perk: 'status' }).perWay).toBe(0);
  });
  it('dynamic airline returns no fixed total', () => {
    expect(tripFees({ airline: 'frontier', bags: 1, carry: true, channel: 'online', perk: 'none', travelers: 1, roundTrip: true }).known).toBe(false);
  });
});

describe('overweight and oversize', () => {
  it('American bands', () => {
    expect(excessFee('american', 52, 60).weight).toBe(30);
    expect(excessFee('american', 60, 60).weight).toBe(100);
    expect(excessFee('american', 50, 64).size).toBe(30);
    expect(excessFee('american', 50, 70).size).toBe(200);
    expect(excessFee('american', 120, 60).refused).toBe(true);
  });
});

describe('liquids and batteries', () => {
  const ap = (c: string) => P.rules.uk.airports.find((a) => a.code === c)!;
  it('TSA: 100 ml yes, 150 ml no', () => {
    expect(liquidVerdict('us', null, 100, 1).ok).toBe(true);
    expect(liquidVerdict('us', null, 150, 1).ok).toBe(false);
  });
  it('UK: 1 litre bottle passes at Heathrow, not at Stansted', () => {
    expect(liquidVerdict('uk', ap('LHR'), 1000, 1).ok).toBe(true);
    expect(liquidVerdict('uk', ap('STN'), 1000, 1).ok).toBe(false);
  });
  it('watt-hours and thresholds', () => {
    expect(wattHours(20000, 3.7)).toBeCloseTo(74, 5);
    expect(batteryVerdict(74, 1).approval).toBe(false);
    expect(batteryVerdict(wattHours(30000, 3.85), 1).approval).toBe(true);
    expect(batteryVerdict(200, 1).ok).toBe(false);
  });
});
