import { RecipeModel } from "../page";
import { machines } from "../machines";
import { getGasTurbineEfficiency, turbineRotorMaterials } from "../turbineEfficiencies";

describe("gas turbine efficiencies", () => {
    it("uses the rotor table's material tier and fitting for both turbine sizes", () => {
        const steel = turbineRotorMaterials.findIndex(material => material.name === "Steel");

        expect(getGasTurbineEfficiency(steel, "large", 0)).toBeCloseTo(1.35);
        expect(getGasTurbineEfficiency(steel, "large", 1)).toBeCloseTo(0.9025);
        expect(getGasTurbineEfficiency(steel, "huge", 0)).toBeCloseTo(1.6);
        expect(getGasTurbineEfficiency(steel, "huge", 1)).toBeCloseTo(1.102);
    });

    it("attaches rotor controls to the large and XL gas turbines", () => {
        const model = new RecipeModel({voltageTier: 3});
        const large = machines["Large Gas Turbine"];
        const xl = machines["XL Turbo Gas Turbine."];

        expect(large.choices?.rotorMaterial.choices).toContain("Steel");
        expect(large.choices?.turbineFitting.choices).toEqual(["Tight", "Loose"]);
        expect(large.generator!(model, {amperage: 1, rotorMaterial: 0, turbineFitting: 0}).efficiency).toBeCloseTo(1.35);
        expect(xl.generator!(model, {amperage: 1, rotorMaterial: 0, turbineFitting: 0}).efficiency).toBeCloseTo(1.6);
    });

    it("rejects unknown rotor and fitting selections", () => {
        expect(() => getGasTurbineEfficiency(-1, "large", 0)).toThrow(RangeError);
        expect(() => getGasTurbineEfficiency(0, "large", 2)).toThrow(RangeError);
    });
});
