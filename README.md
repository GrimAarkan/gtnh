# GTNH Calculator

[![Tests](https://github.com/ShadowTheAge/gtnh/actions/workflows/deploy.yml/badge.svg)](https://github.com/ShadowTheAge/gtnh/actions/workflows/deploy.yml)

A calculator for GregTech: New Horizons recipes and production chains.
Large parts of this project were written using AI assistance, so code style and quality are all over the place.
I just wanted to quickly put together something I can use to calculate GTNH chains. After this goal is done, it won't be an actively maintained project.

Data building is done using the NESQL Exporter mod and a C# processing tool. See [export/README.md](export/README.md) for detailed instructions.

## Fuel & power generation

Fuel recipes (any recipe with a `fuel_value` in its metadata) are treated as generators. Add one to a page like any recipe, then:

- Pick the voltage tier and **Output amperage** to match the generator (output per machine = tier voltage x amperage).
- Set **Efficiency loss (%)**. It defaults to 0 (100% efficient), so enter your generator's real loss to get realistic numbers.
- Tick the "fixed machines" option to say "I have N generators" and the fuel consumption is computed and linked to whatever produces the fuel.

Fuel given as filled cells (e.g. "Jet Fuel A Cell") is converted to liters of fluid, so no empty cells are required. Recipes that have a fuel value *and* a duration (Large Boiler) are not treated as generators.

Generated power shows as negative EU/t, so group and grand totals read as net consumption.
The generator math lives in `src/fuel.ts` (unit tested in `src/tests/fuel.test.ts`).

## Development

To run this project locally:

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```

## License

The code is under the MIT License - see the [LICENSE](LICENSE) file for details.

However, the project contains some assets from Minecraft (Mojang trademark and copyright), the GTNH development team, and respective mod authors. These assets are used under fair use.

Font used: [F77 Minecraft by 123467](https://www.fontspace.com/f77-minecraft-font-f30628)
