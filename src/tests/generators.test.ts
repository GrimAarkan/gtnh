import { PageModel, RecipeModel } from '../page';
import { SolvePage } from '../solver';
import { Recipe, Repository } from '../repository';
import { setupRepository } from './setup';

function findRecipe(recipeType: string, inputName: string): Recipe {
    const repo = Repository.current;
    for (const ptr of repo.recipes) {
        const r = repo.GetObject(ptr, Recipe);
        if (r.recipeType.name === recipeType && r.items.some(i => i.goods.name === inputName))
            return r;
    }
    throw new Error(`Recipe not found: ${recipeType} / ${inputName}`);
}

function solveFixed(recipe: Recipe, tier: number, choices: {[key: string]: number}, count = 1): RecipeModel {
    const page = new PageModel();
    const model = new RecipeModel({recipeId: recipe.id, voltageTier: tier, fixedCrafterCount: count, choices});
    page.rootGroup.elements.push(model);
    SolvePage(page);
    return model;
}

describe('Generators', () => {
    beforeAll(async () => { await setupRepository(); });

    it('burns filled-cell fuel as fluid, without needing empty cells', () => {
        // Jet Fuel A: 2248 EU/L. One EV (2048 EU/t) generator at 100% efficiency.
        const model = solveFixed(findRecipe('Combustion Generator Fuels', 'Jet Fuel A Cell'), 3, {amperage: 1, efficiencyLoss: 0});
        expect(model.isGenerator).toBe(true);
        expect(model.flow.energy[3]).toBeCloseTo(-2048);
        const fuelPerMinute = Object.entries(model.flow.input).find(([id]) => Repository.current.GetById(id)?.name === 'Jet Fuel A');
        expect(fuelPerMinute![1]).toBeCloseTo(2048 / 2248 * 1200);
        expect(Object.values(model.flow.input).length).toBe(1);
    });

    it('applies efficiency loss and amperage', () => {
        const recipe = findRecipe('Semifluid Generator Fuels', 'Creosote Oil'); // 48 EU/L
        const model = solveFixed(recipe, 1, {amperage: 2, efficiencyLoss: 50}); // MV x 2A = 256 EU/t, 50% efficient
        expect(model.flow.energy[1]).toBeCloseTo(-256);
        const fuel = Object.values(model.flow.input)[0];
        expect(fuel).toBeCloseTo(256 / (48 * 0.5) * 1200);
    });

    it('scales with the number of generators', () => {
        const recipe = findRecipe('Thermal Generator Fuels', 'Cryotheum Dust');
        const one = solveFixed(recipe, 1, {amperage: 1, efficiencyLoss: 0}, 1);
        const three = solveFixed(recipe, 1, {amperage: 1, efficiencyLoss: 0}, 3);
        expect(three.flow.energy[1]).toBeCloseTo(3 * one.flow.energy[1]);
    });

    it('does not treat Large Boiler recipes as generators', () => {
        const model = solveFixed(findRecipe('Large Boiler', 'High Octane Gasoline'), 2, {});
        expect(model.isGenerator).toBe(false);
    });
});
