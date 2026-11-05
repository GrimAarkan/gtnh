// Pure math for fuel-burning generators. No repository/DOM dependencies so it can be unit tested without data.bin.

const TICKS_PER_MINUTE = 20 * 60;

export type GeneratorInput = {
    /** Fuel value in EU per unit of fuel (EU/L for fluids). */
    fuelValue: number;
    /** Total amount of fuel consumed by one "recipe" (liters for fluids). */
    fuelAmount: number;
    /** Output of ONE generator in EU/t. */
    euPerTick: number;
    /** Efficiency multiplier. Values above 1 represent output above the fuel's nominal energy. */
    efficiency: number;
}

export type GeneratorResult = {
    /** Efficiency multiplier as a fraction; values above 1 are valid. */
    efficiency: number;
    /** EU produced by one recipe (burning fuelAmount of fuel). */
    euPerRecipe: number;
    /** Ticks one generator needs to burn one recipe's worth of fuel while running at euPerTick. */
    durationTicks: number;
    /** Same as durationTicks, in minutes (matches GtRecipe.durationMinutes semantics). */
    durationMinutes: number;
    /** Fuel burned per tick by a single generator running at full output. */
    fuelPerTick: number;
}

/** Returns null when the inputs can't describe a working generator. */
export function calculateGenerator(input: GeneratorInput): GeneratorResult | null {
    const { fuelValue, fuelAmount, euPerTick, efficiency } = input;
    if (!(fuelValue > 0) || !(fuelAmount > 0) || !(euPerTick > 0) || !(efficiency > 0))
        return null;
    const euPerRecipe = fuelAmount * fuelValue * efficiency;
    const durationTicks = euPerRecipe / euPerTick;
    return {
        efficiency,
        euPerRecipe,
        durationTicks,
        durationMinutes: durationTicks / TICKS_PER_MINUTE,
        fuelPerTick: euPerTick / (fuelValue * efficiency),
    };
}

/** Average EU/t produced by `generators` machines. */
export function generatedEuPerTick(generators: number, euPerTick: number): number {
    return generators * euPerTick;
}
