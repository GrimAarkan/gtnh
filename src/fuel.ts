// Pure math for fuel-burning generators. No repository/DOM dependencies so it can be unit tested without data.bin.

const TICKS_PER_SECOND = 20;
const SECONDS_PER_MINUTE = 60;

export type GeneratorInput = {
    /** Fuel value in EU per unit of fuel (EU/L for fluids). */
    fuelValue: number;
    /** Total amount of fuel consumed by one "recipe" (liters for fluids). */
    fuelAmount: number;
    /** Fuel consumed per second by one generator. */
    fuelInputPerSecond: number;
    /** Base efficiency multiplier (values above 1 are valid). */
    baseEfficiency: number;
    /** Current efficiency multiplier at the selected fuel input rate. */
    efficiency: number;
}

export type GeneratorResult = {
    baseEfficiency: number;
    /** Efficiency multiplier as a fraction; values above 1 are valid. */
    efficiency: number;
    /** EU/t produced by one generator at the configured fuel input rate. */
    euPerTick: number;
    /** EU produced by one recipe (burning fuelAmount of fuel). */
    euPerRecipe: number;
    /** Ticks one generator needs to burn one recipe's worth of fuel. */
    durationTicks: number;
    /** Same as durationTicks, in minutes (matches GtRecipe.durationMinutes semantics). */
    durationMinutes: number;
    /** Fuel burned per tick by one generator at its configured input rate. */
    fuelPerTick: number;
}

/** Returns null when the inputs can't describe a working generator. */
export function calculateGenerator(input: GeneratorInput): GeneratorResult | null {
    const { fuelValue, fuelAmount, fuelInputPerSecond, baseEfficiency, efficiency } = input;
    if (!(fuelValue > 0) || !(fuelAmount > 0) || !(fuelInputPerSecond > 0) ||
        !(baseEfficiency > 0) || !(efficiency > 0))
        return null;

    const euPerRecipe = fuelAmount * fuelValue * efficiency;
    const durationTicks = fuelAmount / fuelInputPerSecond * TICKS_PER_SECOND;
    const euPerTick = fuelInputPerSecond * fuelValue * efficiency / TICKS_PER_SECOND;
    return {
        baseEfficiency,
        efficiency,
        euPerTick,
        euPerRecipe,
        durationTicks,
        durationMinutes: fuelAmount / fuelInputPerSecond / SECONDS_PER_MINUTE,
        fuelPerTick: fuelInputPerSecond / TICKS_PER_SECOND,
    };
}

export type TurbineEfficiencyInput = {
    baseEfficiency: number;
    fuelInputPerSecond: number;
    optimalFlowPerSecond: number;
    overflowTier: number;
    isXl: boolean;
}

/** Current gas-turbine efficiency multiplier at a selected fuel flow. */
export function calculateTurbineCurrentEfficiency(input: TurbineEfficiencyInput): number {
    const { baseEfficiency, fuelInputPerSecond, optimalFlowPerSecond, overflowTier, isXl } = input;
    if (!(baseEfficiency > 0) || !(fuelInputPerSecond > 0) ||
        !(optimalFlowPerSecond > 0) || !(overflowTier > 0))
        return 0;

    const flowRatio = fuelInputPerSecond / optimalFlowPerSecond;
    const factor = isXl
        ? 1 - Math.abs(flowRatio - 1)
        : flowRatio <= 1
            ? flowRatio
            : 1 - (flowRatio - 1) / (3 * overflowTier - 1);
    return baseEfficiency * Math.max(0, factor);
}

/** Average EU/t produced by `generators` machines. */
export function generatedEuPerTick(generators: number, euPerTick: number): number {
    return generators * euPerTick;
}
