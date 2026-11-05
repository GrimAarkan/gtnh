import { calculateGenerator, generatedEuPerTick } from '../fuel';

describe('calculateGenerator', () => {
    it('burns fuel at euPerTick / (fuelValue * efficiency)', () => {
        // Fuel worth 1000 EU/L into a 2048 EU/t generator at 100% efficiency
        const r = calculateGenerator({fuelValue: 1000, fuelAmount: 1, euPerTick: 2048, efficiencyLossPercent: 0})!;
        expect(r.euPerRecipe).toBe(1000);
        expect(r.fuelPerTick).toBeCloseTo(2048 / 1000);
        expect(r.durationTicks).toBeCloseTo(1000 / 2048);
    });

    it('applies efficiency loss', () => {
        const r = calculateGenerator({fuelValue: 1000, fuelAmount: 2, euPerTick: 100, efficiencyLossPercent: 25})!;
        expect(r.efficiency).toBe(0.75);
        expect(r.euPerRecipe).toBe(1500);
        expect(r.durationTicks).toBe(15);
        expect(r.durationMinutes).toBeCloseTo(15 / 1200);
    });

    it('round-trips: generators x durationMinutes x recipes/min gives back the generator output', () => {
        const r = calculateGenerator({fuelValue: 400, fuelAmount: 1, euPerTick: 512, efficiencyLossPercent: 10})!;
        const generators = 3;
        const recipesPerMinute = generators / r.durationMinutes;
        const crafters = recipesPerMinute * r.durationMinutes;
        expect(generatedEuPerTick(crafters, 512)).toBeCloseTo(1536);
    });

    it('rejects unusable input', () => {
        expect(calculateGenerator({fuelValue: 0, fuelAmount: 1, euPerTick: 32, efficiencyLossPercent: 0})).toBeNull();
        expect(calculateGenerator({fuelValue: 10, fuelAmount: 0, euPerTick: 32, efficiencyLossPercent: 0})).toBeNull();
        expect(calculateGenerator({fuelValue: 10, fuelAmount: 1, euPerTick: 0, efficiencyLossPercent: 0})).toBeNull();
    });

    it('clamps efficiency loss to 0..99', () => {
        expect(calculateGenerator({fuelValue: 10, fuelAmount: 1, euPerTick: 1, efficiencyLossPercent: 500})!.efficiency).toBeCloseTo(0.01);
        expect(calculateGenerator({fuelValue: 10, fuelAmount: 1, euPerTick: 1, efficiencyLossPercent: -5})!.efficiency).toBe(1);
    });
});
