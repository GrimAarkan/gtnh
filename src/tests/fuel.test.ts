import { calculateGenerator, generatedEuPerTick } from '../fuel';

describe('calculateGenerator', () => {
    it('burns fuel at euPerTick / (fuelValue * efficiency)', () => {
        // Fuel worth 1000 EU/L into a 2048 EU/t generator at 100% efficiency
        const r = calculateGenerator({fuelValue: 1000, fuelAmount: 1, euPerTick: 2048, efficiency: 1})!;
        expect(r.euPerRecipe).toBe(1000);
        expect(r.fuelPerTick).toBeCloseTo(2048 / 1000);
        expect(r.durationTicks).toBeCloseTo(1000 / 2048);
    });

    it('applies efficiency multipliers above and below 100%', () => {
        const r = calculateGenerator({fuelValue: 1000, fuelAmount: 2, euPerTick: 100, efficiency: 1.25})!;
        expect(r.efficiency).toBe(1.25);
        expect(r.euPerRecipe).toBe(2500);
        expect(r.fuelPerTick).toBeCloseTo(100 / 1250);
        expect(r.durationTicks).toBe(15);
        expect(r.durationMinutes).toBeCloseTo(15 / 1200);
    });

    it('round-trips: generators x durationMinutes x recipes/min gives back the generator output', () => {
        const r = calculateGenerator({fuelValue: 400, fuelAmount: 1, euPerTick: 512, efficiency: 0.9})!;
        const generators = 3;
        const recipesPerMinute = generators / r.durationMinutes;
        const crafters = recipesPerMinute * r.durationMinutes;
        expect(generatedEuPerTick(crafters, 512)).toBeCloseTo(1536);
    });

    it('rejects unusable input', () => {
        expect(calculateGenerator({fuelValue: 0, fuelAmount: 1, euPerTick: 32, efficiency: 1})).toBeNull();
        expect(calculateGenerator({fuelValue: 10, fuelAmount: 0, euPerTick: 32, efficiency: 1})).toBeNull();
        expect(calculateGenerator({fuelValue: 10, fuelAmount: 1, euPerTick: 0, efficiency: 1})).toBeNull();
        expect(calculateGenerator({fuelValue: 10, fuelAmount: 1, euPerTick: 32, efficiency: 0})).toBeNull();
    });

});
