// Pure math for fuel-burning generators. No repository/DOM dependencies so it can be unit tested without data.bin.

const TICKS_PER_MINUTE = 20 * 60;

export type GeneratorInput = {
    /** Fuel value in EU per unit of fuel (EU/L for fluids). */
    fuelValue: number;
    /** Total amount of fuel consumed by one "recipe" (liters for fluids). */
    fuelAmount: number;
    /** Output of ONE generator in EU/t. */
    euPerTick: number;
    /** Percentage of the fuel's energy lost, 0..99. 0 means 100% efficient. */
    efficiencyLossPercent: number;
}

export type GeneratorResult = {
    /** Efficiency as a fraction (0..1]. */
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
    const { fuelValue, fuelAmount, euPerTick, efficiencyLossPercent } = input;
    if (!(fuelValue > 0) || !(fuelAmount > 0) || !(euPerTick > 0))
        return null;
    const loss = Math.min(99, Math.max(0, efficiencyLossPercent || 0));
    const efficiency = 1 - loss / 100;
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
