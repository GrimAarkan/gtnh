import { calculateGenerator, calculateTurbineCurrentEfficiency, generatedEuPerTick } from '../fuel';

describe('calculateGenerator', () => {
    it('calculates power and recipe duration from fuel input per second', () => {
        const r = calculateGenerator({
            fuelValue: 1000,
            fuelAmount: 1,
            fuelInputPerSecond: 2,
            baseEfficiency: 1,
            efficiency: 1,
        })!;
        expect(r.euPerRecipe).toBe(1000);
        expect(r.euPerTick).toBe(100);
        expect(r.fuelPerTick).toBeCloseTo(0.1);
        expect(r.durationTicks).toBe(10);
        expect(r.durationMinutes).toBeCloseTo(1 / 120);
    });

    it('applies efficiencies above and below 100%', () => {
        const r = calculateGenerator({
            fuelValue: 1000,
            fuelAmount: 2,
            fuelInputPerSecond: 2,
            baseEfficiency: 1.25,
            efficiency: 1.25,
        })!;
        expect(r.baseEfficiency).toBe(1.25);
        expect(r.efficiency).toBe(1.25);
        expect(r.euPerRecipe).toBe(2500);
        expect(r.euPerTick).toBe(125);
        expect(r.fuelPerTick).toBeCloseTo(0.1);
        expect(r.durationTicks).toBe(20);
        expect(r.durationMinutes).toBeCloseTo(1 / 60);
    });

    it('derives machine count from linked fuel throughput', () => {
        const r = calculateGenerator({
            fuelValue: 400,
            fuelAmount: 1,
            fuelInputPerSecond: 0.5,
            baseEfficiency: 0.9,
            efficiency: 0.9,
        })!;
        const generators = 3;
        const recipesPerMinute = generators / r.durationMinutes;
        const crafters = recipesPerMinute * r.durationMinutes;
        expect(generatedEuPerTick(crafters, r.euPerTick)).toBeCloseTo(27);
    });

    it('rejects unusable input', () => {
        const validInput = {fuelValue: 10, fuelAmount: 1, fuelInputPerSecond: 1, baseEfficiency: 1, efficiency: 1};
        expect(calculateGenerator({...validInput, fuelValue: 0})).toBeNull();
        expect(calculateGenerator({...validInput, fuelAmount: 0})).toBeNull();
        expect(calculateGenerator({...validInput, fuelInputPerSecond: 0})).toBeNull();
        expect(calculateGenerator({...validInput, baseEfficiency: 0})).toBeNull();
        expect(calculateGenerator({...validInput, efficiency: 0})).toBeNull();
    });
});

describe('calculateTurbineCurrentEfficiency', () => {
    const settings = {
        baseEfficiency: 1.35,
        optimalFlowPerSecond: 900,
        overflowTier: 2,
        isXl: false,
    };

    it('matches base efficiency at optimal flow and scales down below it', () => {
        expect(calculateTurbineCurrentEfficiency({...settings, fuelInputPerSecond: 900})).toBeCloseTo(1.35);
        expect(calculateTurbineCurrentEfficiency({...settings, fuelInputPerSecond: 450})).toBeCloseTo(0.675);
    });

    it('uses the overflow tier above optimal flow', () => {
        expect(calculateTurbineCurrentEfficiency({...settings, fuelInputPerSecond: 1350})).toBeCloseTo(1.215);
    });

    it('uses the XL turbine curve above optimal flow', () => {
        expect(calculateTurbineCurrentEfficiency({
            ...settings,
            isXl: true,
            fuelInputPerSecond: 1350,
        })).toBeCloseTo(0.675);
    });
});
