export type GasTurbineRotorSize = "large" | "huge";

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

type GasTurbineEfficiency = {
    tightLarge: number;
    tightHuge: number;
    looseLarge: number;
    looseHuge: number;
}

// Efficiency is stored as a multiplier (for example, 1.35 means 135%).
const gasEfficiencyByRotorTier: Record<number, GasTurbineEfficiency> = {
    0: { tightLarge: 1.05, tightHuge: 1.3, looseLarge: 0.6555, looseHuge: 0.8645 },
    1: { tightLarge: 1.15, tightHuge: 1.4, looseLarge: 0.741, looseHuge: 0.9405 },
    2: { tightLarge: 1.25, tightHuge: 1.5, looseLarge: 0.817, looseHuge: 1.026 },
    3: { tightLarge: 1.35, tightHuge: 1.6, looseLarge: 0.9025, looseHuge: 1.102 },
    4: { tightLarge: 1.45, tightHuge: 1.7, looseLarge: 0.9785, looseHuge: 1.1875 },
    5: { tightLarge: 1.55, tightHuge: 1.8, looseLarge: 1.064, looseHuge: 1.2635 },
    6: { tightLarge: 1.65, tightHuge: 1.9, looseLarge: 1.14, looseHuge: 1.349 },
    7: { tightLarge: 1.75, tightHuge: 2, looseLarge: 1.2255, looseHuge: 1.425 },
    8: { tightLarge: 1.85, tightHuge: 2.1, looseLarge: 1.3015, looseHuge: 1.5105 },
    9: { tightLarge: 1.95, tightHuge: 2.2, looseLarge: 1.387, looseHuge: 1.5865 },
    10: { tightLarge: 2.05, tightHuge: 2.3, looseLarge: 1.463, looseHuge: 1.672 },
    11: { tightLarge: 2.15, tightHuge: 2.4, looseLarge: 1.5485, looseHuge: 1.748 },
    12: { tightLarge: 2.25, tightHuge: 2.5, looseLarge: 1.6245, looseHuge: 1.8335 },
    13: { tightLarge: 2.35, tightHuge: 2.6, looseLarge: 1.71, looseHuge: 1.9095 },
    17: { tightLarge: 2.75, tightHuge: 3, looseLarge: 2.033, looseHuge: 2.2325 },
    22: { tightLarge: 3.25, tightHuge: 3.5, looseLarge: 2.432, looseHuge: 2.641 },
    24: { tightLarge: 3.45, tightHuge: 3.7, looseLarge: 2.5935, looseHuge: 2.8025 },
    25: { tightLarge: 3.55, tightHuge: 3.8, looseLarge: 2.679, looseHuge: 2.8785 },
    26: { tightLarge: 3.65, tightHuge: 3.9, looseLarge: 2.755, looseHuge: 2.964 },
};

export function getGasTurbineEfficiency(
    materialIndex: number,
    rotorSize: GasTurbineRotorSize,
    fittingIndex: number,
): number {
    const material = turbineRotorMaterials[materialIndex];
    if (!material)
        throw new RangeError(`Unknown turbine rotor material index: ${materialIndex}`);

    const values = gasEfficiencyByRotorTier[material.tier];
    if (!values)
        throw new RangeError(`No gas turbine efficiency data for rotor tier ${material.tier}`);

    if (fittingIndex !== 0 && fittingIndex !== 1)
        throw new RangeError(`Unknown turbine fitting index: ${fittingIndex}`);

    if (rotorSize === "large")
        return fittingIndex === 0 ? values.tightLarge : values.looseLarge;
    return fittingIndex === 0 ? values.tightHuge : values.looseHuge;
}
