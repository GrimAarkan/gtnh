import { PageModel, ProductModel, RecipeModel } from '../page';
import { SolvePage } from '../solver';
import { Goods, Item, Recipe, RecipeIoType, Repository } from '../repository';
import { setupRepository } from './setup';

function findRecipe(recipeType: string, inputName: string): Recipe {
    const repo = Repository.current;
    for (const ptr of repo.recipes) {
        const r = repo.GetObject(ptr, Recipe);
        if (r.recipeType.name === recipeType && r.items.some(i => i.goods instanceof Goods && i.goods.name === inputName))
            return r;
    }
    throw new Error(`Recipe not found: ${recipeType} / ${inputName}`);
}

function fuelInputProductId(recipe: Recipe): string {
    const input = recipe.items.find(item =>
        item.type === RecipeIoType.ItemInput ||
        item.type === RecipeIoType.FluidInput ||
        item.type === RecipeIoType.OreDictInput);
    if (!input)
        throw new Error(`Fuel input not found for recipe: ${recipe.id}`);
    return input.goods instanceof Item && input.goods.container
        ? input.goods.container.fluid.id
        : input.goods.id;
}

function solveFuelInput(
    recipe: Recipe,
    tier: number,
    choices: {[key: string]: number},
    fuelPerMinute: number,
    fixedCrafterCount?: number,
): RecipeModel {
    const page = new PageModel();
    const model = new RecipeModel({recipeId: recipe.id, voltageTier: tier, fixedCrafterCount, choices});
    page.rootGroup.elements.push(model);
    page.products.push(new ProductModel({
        goodsId: fuelInputProductId(recipe),
        amount: -fuelPerMinute,
    }));
    SolvePage(page);
    return model;
}

describe('Generators', () => {
    beforeAll(async () => { await setupRepository(); });

    it('burns filled-cell fuel as fluid and derives power from linked fuel input', () => {
        const model = solveFuelInput(
            findRecipe('Combustion Generator Fuels', 'Jet Fuel A Cell'),
            3,
            {fuelInputPerSecond: 2, efficiencyLoss: 0},
            120,
            1,
        );
        expect(model.isGenerator).toBe(true);
        expect(model.flow.energy[3]).toBeCloseTo(-224.8);
        expect(model.crafterCount).toBeCloseTo(1);
        expect(model.fixedCrafterCount).toBeUndefined();
        const fuelPerMinute = Object.entries(model.flow.input).find(([id]) => {
            const goods = Repository.current.GetById(id);
            return goods instanceof Goods && goods.name === 'Jet Fuel A';
        });
        expect(fuelPerMinute?.[1]).toBeCloseTo(120);
        expect(Object.values(model.flow.input).length).toBe(1);
    });

    it('applies efficiency loss to fuel-driven power', () => {
        const model = solveFuelInput(
            findRecipe('Semifluid Generator Fuels', 'Creosote Oil'),
            1,
            {fuelInputPerSecond: 2, efficiencyLoss: 50},
            120,
        );
        expect(model.flow.energy[1]).toBeCloseTo(-2.4);
        expect(Object.values(model.flow.input)[0]).toBeCloseTo(120);
    });

    it('derives machine count from linked fuel inputs', () => {
        const recipe = findRecipe('Thermal Generator Fuels', 'Cryotheum Dust');
        const one = solveFuelInput(recipe, 1, {fuelInputPerSecond: 1, efficiencyLoss: 0}, 60);
        const three = solveFuelInput(recipe, 1, {fuelInputPerSecond: 1, efficiencyLoss: 0}, 180);
        expect(one.crafterCount).toBeCloseTo(1);
        expect(three.crafterCount).toBeCloseTo(3);
        expect(three.flow.energy[1]).toBeCloseTo(3 * one.flow.energy[1]);
    });

    it('does not treat Large Boiler recipes as generators', () => {
        const model = new RecipeModel({
            recipeId: findRecipe('Large Boiler', 'High Octane Gasoline').id,
            voltageTier: 2,
        });
        const page = new PageModel();
        page.rootGroup.elements.push(model);
        SolvePage(page);
        expect(model.isGenerator).toBe(false);
    });
});
