import { GetParameter, MachineCoefficient, machines } from "../machines";
import { RecipeModel } from "../page";
import { TIER_UIV } from "../utils";

function configuredMachine(
    machineName:string,
    voltageTier = 0,
    choices:{[key:string]:number} = {},
    recipe?:any,
):{machine:typeof machines[string], model:RecipeModel} {
    const machine = machines[machineName];
    const model = new RecipeModel();
    model.voltageTier = voltageTier;
    model.choices = choices;
    model.recipe = recipe;
    model.ValidateChoices(machine, model);
    return {machine, model};
}

function machineValue(
    machineName:string,
    key:"speed" | "power" | "parallels",
    voltageTier = 0,
    choices:{[key:string]:number} = {},
):number {
    const {machine, model} = configuredMachine(machineName, voltageTier, choices);
    return GetParameter(machine[key] as MachineCoefficient<number>, model);
}

describe("multiblock calculations", () => {
    it("matches the Large Sifter name in recipe data and applies its bonuses", () => {
        expect(machines["Large Sifter"]).toBe(machines["Large Sifter Control Block"]);
        expect(machineValue("Large Sifter", "speed")).toBe(5);
        expect(machineValue("Large Sifter", "power")).toBe(0.75);
        expect(machineValue("Large Sifter", "parallels", 0)).toBe(4);
        expect(machineValue("Large Sifter", "parallels", 3)).toBe(16);
    });

    it("models Mass Solidifier's warm-up speed range, discount, and parallels", () => {
        expect(machineValue("Mass Solidifier", "speed")).toBe(3);
        expect(machineValue("Mass Solidifier", "speed", 0, {speedPercent: 100})).toBe(1);
        expect(machineValue("Mass Solidifier", "speed", 0, {speedPercent: 225})).toBe(2.25);
        expect(machineValue("Mass Solidifier", "power")).toBe(0.8);
        expect(machineValue("Mass Solidifier", "parallels", 0)).toBe(10);
        expect(machineValue("Mass Solidifier", "parallels", 4)).toBe(50);
    });

    it("scales Industrial Centrifuge bonuses with its momentum", () => {
        expect(machineValue("Industrial Centrifuge", "speed", 0, {momentum: 0})).toBe(2);
        expect(machineValue("Industrial Centrifuge", "speed", 0, {momentum: 50})).toBe(2.5);
        expect(machineValue("Industrial Centrifuge", "speed")).toBe(3);
        expect(machineValue("Industrial Centrifuge", "power")).toBe(0.9);
        expect(machineValue("Industrial Centrifuge", "parallels", 2, {momentum: 0})).toBe(12);
        expect(machineValue("Industrial Centrifuge", "parallels", 2)).toBe(24);
    });

    it("applies the current tier tables for other GT++ multiblocks", () => {
        expect(machineValue("Amazon Warehousing Depot", "speed")).toBe(2);
        expect(machineValue("Amazon Warehousing Depot", "speed", 0, {tier: 7})).toBe(9);
        expect(machineValue("Amazon Warehousing Depot", "parallels", 3)).toBe(64);

        expect(machineValue("Large Thermal Refinery", "speed", 0, {coilTier: 0})).toBe(2.55);
        expect(machineValue("Large Thermal Refinery", "speed", 0, {coilTier: 13})).toBe(3.2);
        expect(machineValue("Large Thermal Refinery", "power", 0, {coilTier: 0})).toBeCloseTo(0.76);

        expect(machineValue("Cryogenic Freezer", "speed")).toBe(3);
        expect(machineValue("Cryogenic Freezer", "power")).toBe(0.9);
        expect(machineValue("Cryogenic Freezer", "parallels")).toBe(16);
    });

    it("uses the Material Press and Precision Lathe parallel tables", () => {
        for (const machineName of ["Industrial Bending Machine", "Industrial Forming Press"]) {
            expect(machineValue(machineName, "speed")).toBe(6);
            expect(machineValue(machineName, "parallels", 0)).toBe(4);
            expect(machineValue(machineName, "parallels", 3)).toBe(16);
        }

        expect(machineValue("Industrial Precision Lathe", "speed")).toBe(4);
        expect(machineValue("Industrial Precision Lathe", "power")).toBe(0.8);
        expect(machineValue("Industrial Precision Lathe", "parallels", 0, {itemPipeCasings: 0})).toBe(8);
        expect(machineValue("Industrial Precision Lathe", "parallels", 0, {itemPipeCasings: 7})).toBe(64);
    });

    it("applies Exo-Foundry module counts, pairings, discounts, and overclock bonuses", () => {
        expect(machineValue("Exo-Foundry", "speed")).toBe(1.5);
        expect(machineValue("Exo-Foundry", "power")).toBe(1);
        expect(machineValue("Exo-Foundry", "parallels", 2)).toBe(48);

        const optimum = {chassisTier: 0, scb: 1, sc: 1};
        expect(machineValue("Exo-Foundry", "speed", 0, optimum)).toBe(3.8);
        expect(machineValue("Exo-Foundry", "parallels", 0, optimum)).toBe(36);

        expect(machineValue("Exo-Foundry", "power", 0, {pvs: 1})).toBeCloseTo(0.72);
        const harmonic = configuredMachine("Exo-Foundry", 0, {chassisTier: 2, pvs: 1, so: 1});
        expect(GetParameter(harmonic.machine.power as MachineCoefficient<number>, harmonic.model)).toBeCloseTo(0.32);
        const harmonicOc = GetParameter(harmonic.machine.overclocker, harmonic.model).calculate(harmonic.model, 1);
        expect(harmonicOc.overclockSpeed).toBeCloseTo(2.5);
        expect(harmonicOc.overclockPower).toBe(4);

        const hypercooled = {chassisTier: 2, hc: 1, uc: 1, coolant: 3};
        expect(machineValue("Exo-Foundry", "speed", 0, hypercooled)).toBe(12);
        expect(machineValue("Exo-Foundry", "power", 0, hypercooled)).toBe(8);
        const hypercooledMachine = configuredMachine("Exo-Foundry", 0, hypercooled);
        expect(GetParameter(hypercooledMachine.machine.extraOverclocks!, hypercooledMachine.model)).toBe(3);
    });

    it("uses the average entropic bonus and enforces Exo-Foundry structure slots", () => {
        const entropic = {chassisTier: 2, hr: 4};
        expect(machineValue("Exo-Foundry", "speed", 0, entropic)).toBe(3.5);
        expect(machineValue("Exo-Foundry", "power", 0, entropic)).toBeCloseTo(0.7);
        expect(machineValue("Exo-Foundry", "parallels", 0, entropic)).toBe(32);
        const entropicMachine = configuredMachine("Exo-Foundry", 0, entropic);
        expect(GetParameter(entropicMachine.machine.extraOverclocks!, entropicMachine.model)).toBe(2);

        const choices = configuredMachine("Exo-Foundry", 0, {chassisTier: 0, scb: 1, pvs: 1, sc: 1});
        expect(choices.model.choices.chassisTier).toBe(0);
        expect(choices.model.choices.scb + choices.model.choices.pvs + choices.model.choices.sc).toBe(2);

        const highTierRecipe = {gtRecipe: {voltageTier: TIER_UIV}} as any;
        const supportedRecipe = configuredMachine("Exo-Foundry", 0, {}, highTierRecipe);
        expect(supportedRecipe.model.choices.chassisTier).toBe(1);
        expect(supportedRecipe.model.choices.hr).toBe(1);
    });
});
