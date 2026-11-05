export type GasTurbineRotorSize = "small" | "normal" | "large" | "huge";

export const gasTurbineRotorSizes: GasTurbineRotorSize[] = ["small", "normal", "large", "huge"];

export type TurbineRotorMaterial = {
    name: string;
    tier: number;
}

// Rotor material tiers and gas efficiencies are transcribed from the attached
// GTNH Power Planner rotor table (version 2.8). Steel is first for a useful default.
export const turbineRotorMaterials: TurbineRotorMaterial[] = [
    { name: "Steel", tier: 3 }, { name: "Carbon", tier: 2 }, { name: "Realgar", tier: 1 },
    { name: "Clay Compound", tier: 2 }, { name: "Bronze", tier: 2 }, { name: "Iron", tier: 2 },
    { name: "Magnetic Iron", tier: 2 }, { name: "Magnetic Steel", tier: 3 }, { name: "Wrought Iron", tier: 2 },
    { name: "Tin Alloy", tier: 2 }, { name: "Brass", tier: 1 }, { name: "Silver", tier: 2 },
    { name: "Electrum", tier: 2 }, { name: "Gold", tier: 2 }, { name: "Beryllium", tier: 2 },
    { name: "Nickel-Zinc Ferrite", tier: 0 }, { name: "Polycaprolactam", tier: 1 }, { name: "Redstone Alloy", tier: 2 },
    { name: "Vanadiumsteel", tier: 3 }, { name: "Alumite", tier: 2 }, { name: "Obzinite", tier: 2 },
    { name: "Calcium", tier: 3 }, { name: "Bismuth", tier: 1 }, { name: "Conductive Iron", tier: 3 },
    { name: "Cupronickel", tier: 1 }, { name: "Electrical Steel", tier: 2 }, { name: "Invar", tier: 2 },
    { name: "Ironwood", tier: 2 }, { name: "Magnalium", tier: 2 }, { name: "Nickel", tier: 2 },
    { name: "Pig Iron", tier: 2 }, { name: "Pulsating Iron", tier: 3 }, { name: "Thorium", tier: 2 },
    { name: "Black Steel", tier: 3 }, { name: "Manganese", tier: 2 }, { name: "Molybdenum", tier: 2 },
    { name: "Red Steel", tier: 4 }, { name: "Blue Steel", tier: 4 }, { name: "Bismuth Bronze", tier: 2 },
    { name: "Cobalt", tier: 3 }, { name: "Cobalt Brass", tier: 2 }, { name: "Damascus Steel", tier: 3 },
    { name: "Dark Steel", tier: 3 }, { name: "Fiery Steel", tier: 3 }, { name: "Knightmetal", tier: 3 },
    { name: "Lead", tier: 1 }, { name: "Manasteel", tier: 4 }, { name: "Soularium", tier: 2 },
    { name: "Steeleaf", tier: 3 }, { name: "Aluminium", tier: 2 }, { name: "Blood Infused Iron", tier: 2 },
    { name: "Black Bronze", tier: 2 }, { name: "Thaumium", tier: 3 }, { name: "Ardite", tier: 4 },
    { name: "Manyullyn", tier: 5 }, { name: "Kanthal", tier: 2 }, { name: "Stainless Steel", tier: 4 },
    { name: "Energetic Silver", tier: 3 }, { name: "Chrome", tier: 3 }, { name: "Energetic Alloy", tier: 3 },
    { name: "Sterling Silver", tier: 2 }, { name: "Meteoric Iron", tier: 3 }, { name: "Meteoric Steel", tier: 4 },
    { name: "Nichrome", tier: 2 }, { name: "Magnetic Neodymium", tier: 2 }, { name: "Neodymium", tier: 2 },
    { name: "Reinforced", tier: 4 }, { name: "Titanium", tier: 3 }, { name: "Ultimet", tier: 4 },
    { name: "Astral Silver", tier: 2 }, { name: "Ademic Steel", tier: 4 }, { name: "Vivid Alloy", tier: 4 },
    { name: "Endium", tier: 4 }, { name: "Galgadorian", tier: 3 }, { name: "Vibrant Alloy", tier: 4 },
    { name: "Enhanced Galgadorian", tier: 5 }, { name: "Shadow Metal", tier: 4 }, { name: "Terrasteel", tier: 5 },
    { name: "Void Metal", tier: 4 }, { name: "Epoxid", tier: 1 }, { name: "Fiber-Reinforced Epoxy Resin", tier: 1 },
    { name: "Crystalline Pink Slime", tier: 3 }, { name: "Uranium-235", tier: 3 }, { name: "Uranium-238", tier: 3 },
    { name: "Tungsten", tier: 3 }, { name: "Enderium", tier: 3 }, { name: "Tungstensteel", tier: 4 },
    { name: "HSS-G", tier: 3 }, { name: "Vinteum", tier: 3 }, { name: "End Steel", tier: 4 },
    { name: "Platinum", tier: 4 }, { name: "Tungstencarbide", tier: 4 }, { name: "Duralumin", tier: 3 },
    { name: "Enderium Base", tier: 4 }, { name: "TPV-Alloy", tier: 5 }, { name: "Crystalline Alloy", tier: 4 },
    { name: "Desh", tier: 4 }, { name: "Elven Elementium", tier: 7 }, { name: "Melodic Alloy", tier: 5 },
    { name: "Vyroxeres", tier: 1 }, { name: "Rubracium", tier: 1 }, { name: "MAR-M200 Steel", tier: 3 },
    { name: "Iridium", tier: 3 }, { name: "Plutonium-239", tier: 3 }, { name: "Osmiridium", tier: 3 },
    { name: "Mytryl", tier: 4 }, { name: "Palladium", tier: 4 }, { name: "Callisto Ice", tier: 4 },
    { name: "Infused Gold", tier: 3 }, { name: "Rhodium-Plated Palladium", tier: 5 }, { name: "Ledox", tier: 4 },
    { name: "Osmium", tier: 4 }, { name: "Quantium", tier: 4 }, { name: "Ruridit", tier: 6 },
    { name: "HSS-E", tier: 7 }, { name: "HSS-S", tier: 8 }, { name: "Ichorium", tier: 12 },
    { name: "Orichalcum", tier: 1 }, { name: "Oriharukon", tier: 5 }, { name: "Deep Iron", tier: 2 },
    { name: "Naquadah", tier: 4 }, { name: "Shadow Steel", tier: 4 }, { name: "Mysterious Crystal", tier: 6 },
    { name: "Naquadah Alloy", tier: 5 }, { name: "Force", tier: 3 }, { name: "Fluxed Electrum", tier: 3 },
    { name: "Draconium", tier: 7 }, { name: "Atomic Separation Catalyst", tier: 10 }, { name: "Alduorite", tier: 1 },
    { name: "Ceruclase", tier: 2 }, { name: "Duranium", tier: 11 }, { name: "Gaia Spirit", tier: 12 },
    { name: "High Durability Compound Steel", tier: 13 }, { name: "Mithril", tier: 2 }, { name: "Shadow Iron", tier: 2 },
    { name: "Vulcanite", tier: 2 }, { name: "Stellar Alloy", tier: 7 }, { name: "Trinium", tier: 8 },
    { name: "MAR-Ce-M200 Steel", tier: 4 }, { name: "Naquadria", tier: 4 }, { name: "Enriched Naquadah", tier: 4 },
    { name: "Plutonium-241", tier: 3 }, { name: "Tritanium", tier: 6 }, { name: "Neutronium", tier: 6 },
    { name: "Adamantium", tier: 10 }, { name: "Chrysotile", tier: 3 }, { name: "Black Plutonium", tier: 8 },
    { name: "Cosmic Neutronium", tier: 12 }, { name: "Extremely Unstable Naquadah", tier: 11 }, { name: "Adamantium Alloy", tier: 5 },
    { name: "Awakened Draconium", tier: 9 }, { name: "Infinity Catalyst", tier: 10 }, { name: "Precious Metal Alloy", tier: 7 },
    { name: "Enriched Naquadah Alloy", tier: 6 }, { name: "Infinity", tier: 17 }, { name: "Creon", tier: 26 },
    { name: "Mellion", tier: 26 }, { name: "Six-Phased Copper", tier: 26 }, { name: "Deep Dark Iron", tier: 3 },
    { name: "Transcendent Metal", tier: 22 }, { name: "Spacetime", tier: 25 }, { name: "Metastable Oganesson", tier: 24 },
    { name: "Shirabon", tier: 26 }, { name: "Eternity", tier: 26 }, { name: "Magmatter", tier: 26 },
    { name: "Universium", tier: 25 },
];

// Mining speed values are from the workbook's material rows. Steel is first for the default choice.
const miningSpeedByMaterial: Record<string, number> = {
    "Steel": 6, "Carbon": 1, "Realgar": 1, "Clay Compound": 2,
    "Bronze": 6, "Iron": 6, "Magnetic Iron": 6, "Magnetic Steel": 6,
    "Wrought Iron": 6, "Tin Alloy": 6.5, "Brass": 7, "Silver": 10,
    "Electrum": 12, "Gold": 12, "Beryllium": 14, "Nickel-Zinc Ferrite": 3,
    "Polycaprolactam": 3, "Redstone Alloy": 3, "Vanadiumsteel": 3, "Alumite": 5,
    "Obzinite": 5, "Calcium": 5.49, "Bismuth": 6, "Conductive Iron": 6,
    "Cupronickel": 6, "Electrical Steel": 6, "Invar": 6, "Ironwood": 6,
    "Magnalium": 6, "Nickel": 6, "Pig Iron": 6, "Pulsating Iron": 6,
    "Thorium": 6, "Black Steel": 6.5, "Manganese": 7, "Molybdenum": 7,
    "Red Steel": 7, "Blue Steel": 7.5, "Bismuth Bronze": 8, "Cobalt": 8,
    "Cobalt Brass": 8, "Damascus Steel": 8, "Dark Steel": 8, "Fiery Steel": 8,
    "Knightmetal": 8, "Lead": 8, "Manasteel": 8, "Soularium": 8,
    "Steeleaf": 8, "Aluminium": 10, "Blood Infused Iron": 10, "Black Bronze": 12,
    "Thaumium": 12, "Ardite": 18, "Manyullyn": 25, "Kanthal": 6,
    "Stainless Steel": 7, "Energetic Silver": 8, "Chrome": 11, "Energetic Alloy": 12,
    "Sterling Silver": 13, "Meteoric Iron": 6, "Meteoric Steel": 6, "Nichrome": 6,
    "Magnetic Neodymium": 7, "Neodymium": 7, "Reinforced": 7, "Titanium": 7,
    "Ultimet": 9, "Astral Silver": 10, "Ademic Steel": 12, "Vivid Alloy": 12,
    "Endium": 16, "Galgadorian": 16, "Vibrant Alloy": 18, "Enhanced Galgadorian": 32,
    "Shadow Metal": 32, "Terrasteel": 32, "Void Metal": 32, "Epoxid": 3,
    "Fiber-Reinforced Epoxy Resin": 3, "Crystalline Pink Slime": 6, "Uranium-235": 6, "Uranium-238": 6,
    "Tungsten": 7, "Enderium": 8, "Tungstensteel": 8, "HSS-G": 10,
    "Vinteum": 10, "End Steel": 12, "Platinum": 12, "Tungstencarbide": 14,
    "Duralumin": 16, "Enderium Base": 16, "TPV-Alloy": 16, "Crystalline Alloy": 18,
    "Desh": 20, "Elven Elementium": 20, "Melodic Alloy": 24, "Vyroxeres": 32,
    "Rubracium": 1, "MAR-M200 Steel": 2.60441, "Iridium": 6, "Plutonium-239": 6,
    "Osmiridium": 7, "Mytryl": 8, "Palladium": 8, "Callisto Ice": 9,
    "Infused Gold": 12, "Rhodium-Plated Palladium": 13.2, "Ledox": 15, "Osmium": 16,
    "Quantium": 18, "Ruridit": 19.36, "HSS-E": 32, "HSS-S": 32,
    "Ichorium": 32, "Orichalcum": 32, "Oriharukon": 32, "Deep Iron": 6,
    "Naquadah": 6, "Shadow Steel": 6, "Mysterious Crystal": 8, "Naquadah Alloy": 8,
    "Force": 10, "Fluxed Electrum": 16, "Draconium": 20, "Atomic Separation Catalyst": 31.72,
    "Alduorite": 32, "Ceruclase": 32, "Duranium": 32, "Gaia Spirit": 32,
    "High Durability Compound Steel": 32, "Mithril": 32, "Shadow Iron": 32, "Vulcanite": 32,
    "Stellar Alloy": 96, "Trinium": 128, "MAR-Ce-M200 Steel": 150, "Naquadria": 1,
    "Enriched Naquadah": 6, "Plutonium-241": 6, "Tritanium": 20, "Neutronium": 24,
    "Adamantium": 32, "Chrysotile": 32, "Black Plutonium": 36, "Cosmic Neutronium": 96,
    "Extremely Unstable Naquadah": 100, "Adamantium Alloy": 191.2, "Awakened Draconium": 40, "Infinity Catalyst": 64,
    "Precious Metal Alloy": 100, "Enriched Naquadah Alloy": 180, "Infinity": 256, "Creon": 1,
    "Mellion": 1, "Six-Phased Copper": 1, "Deep Dark Iron": 7, "Transcendent Metal": 290,
    "Spacetime": 320, "Metastable Oganesson": 443.52, "Shirabon": 640, "Eternity": 1,
    "Magmatter": 1, "Universium": 1,
};

// The workbook's Overflow column is constant within each rotor tier.
const overflowTierByRotorTier: Record<number, number> = {
    0: 1, 1: 1, 2: 1, 3: 2, 4: 2, 5: 2,
    6: 3, 7: 3, 8: 3, 9: 3, 10: 3, 11: 3, 12: 3, 13: 3,
    17: 3, 22: 3, 24: 3, 25: 3, 26: 3,
};

export type GasTurbineProfile = {
    baseEfficiency: number;
    optimalFlowPerSecond: number;
    maxFuelInputPerSecond: number;
    overflowTier: number;
}

/**
 * Uses the formulas in row 173 of the attached GTNH rotor workbook.
 * Its gas-flow values are normalized to 1 EU/L, so scale them by the selected fuel value.
 */
export function getGasTurbineProfile(
    materialIndex: number,
    rotorSizeIndex: number,
    fittingIndex: number,
    fuelValue: number,
    isXl: boolean,
): GasTurbineProfile {
    const material = turbineRotorMaterials[materialIndex];
    if (!material)
        throw new RangeError(`Unknown turbine rotor material index: ${materialIndex}`);

    if (!Number.isInteger(rotorSizeIndex) || rotorSizeIndex < 0 || rotorSizeIndex > 3)
        throw new RangeError(`Unknown turbine rotor size index: ${rotorSizeIndex}`);
    if (fittingIndex !== 0 && fittingIndex !== 1)
        throw new RangeError(`Unknown turbine fitting index: ${fittingIndex}`);
    if (!(fuelValue > 0))
        throw new RangeError(`Invalid turbine fuel value: ${fuelValue}`);

    const miningSpeed = miningSpeedByMaterial[material.name];
    const overflowTier = overflowTierByRotorTier[material.tier];
    if (!(miningSpeed > 0) || !overflowTier)
        throw new RangeError(`Missing turbine data for rotor material: ${material.name}`);

    const sizeMultiplier = rotorSizeIndex + 1;
    const sizeEfficiencyOffset = [0, 2.5, 5, 7.5][rotorSizeIndex];
    const tightEfficiency = 0.5 + 0.1 * (0.5 + sizeEfficiencyOffset + material.tier);
    const baseEfficiency = fittingIndex === 0
        ? tightEfficiency
        : (-0.2 + Math.round(tightEfficiency * 85) * 0.01) * 0.95;

    const gasFlowAtOneEuPerLiter = miningSpeed * sizeMultiplier * 50;
    const optimalFlowPerTickAtOneEuPerLiter = fittingIndex === 0
        ? gasFlowAtOneEuPerLiter
        : 2 * gasFlowAtOneEuPerLiter * Math.pow(1.05, (tightEfficiency - 0.8) * 20);
    const xlMultiplier = isXl ? 16 : 1;
    const optimalFlowPerTick = optimalFlowPerTickAtOneEuPerLiter / fuelValue * xlMultiplier;
    const maxFlowPerTick = Math.floor(optimalFlowPerTick) * 1.5 * overflowTier;

    return {
        baseEfficiency,
        optimalFlowPerSecond: optimalFlowPerTick * 20,
        maxFuelInputPerSecond: maxFlowPerTick * 20,
        overflowTier,
    };
}
