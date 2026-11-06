import { machines } from "../machines";
import { getGasTurbineProfile, turbineRotorMaterials } from "../turbineEfficiencies";

describe("gas turbine efficiencies", () => {
    it("uses the workbook formulas for rotor size, material tier, and fitting", () => {
        const steel = turbineRotorMaterials.findIndex(material => material.name === "Steel");

        const tightLarge = getGasTurbineProfile(steel, 2, 0, 20, false);
        expect(tightLarge.baseEfficiency).toBeCloseTo(1.35);
        expect(tightLarge.optimalFlowPerSecond).toBeCloseTo(900);
        expect(tightLarge.maxFuelInputPerSecond).toBeCloseTo(2700);
        expect(tightLarge.overflowTier).toBe(2);

        const looseLarge = getGasTurbineProfile(steel, 2, 1, 20, false);
        expect(looseLarge.baseEfficiency).toBeCloseTo(0.9025);
        expect(looseLarge.optimalFlowPerSecond).toBeCloseTo(3078.6093);

        const tightHugeRotor = getGasTurbineProfile(steel, 3, 0, 20, false);
        expect(tightHugeRotor.baseEfficiency).toBeCloseTo(1.6);
        expect(tightHugeRotor.optimalFlowPerSecond).toBeCloseTo(1200);

        const xl = getGasTurbineProfile(steel, 2, 0, 20, true);
        expect(xl.optimalFlowPerSecond).toBeCloseTo(16 * tightLarge.optimalFlowPerSecond);
        expect(xl.maxFuelInputPerSecond).toBeCloseTo(18000);
    });

    it("exposes rotor size, material, fitting, and per-machine fuel input", () => {
        const large = machines["Large Gas Turbine"];
        expect(large.choices?.rotorSize.choices).toEqual(["Small", "Normal", "Large", "Huge"]);
        expect(large.choices?.rotorMaterial.choices).toContain("Steel");
        expect(large.choices?.turbineFitting.choices).toEqual(["Tight", "Loose"]);
        expect(large.choices?.fuelInputPerSecond.min).toBeGreaterThan(0);
        expect(large.choices?.fuelInputPerSecond.description).toContain("per machine");
        expect(large.choices).not.toHaveProperty("amperage");
        expect(machines["XL Turbo Gas Turbine."].choices?.rotorSize.choices).toEqual(["Small", "Normal", "Large", "Huge"]);
    });

    it("rejects unknown rotor, fitting, and fuel selections", () => {
        expect(() => getGasTurbineProfile(-1, 2, 0, 20, false)).toThrow(RangeError);
        expect(() => getGasTurbineProfile(0, 2, 2, 20, false)).toThrow(RangeError);
        expect(() => getGasTurbineProfile(0, 2, 0, 0, false)).toThrow(RangeError);
    });
});
