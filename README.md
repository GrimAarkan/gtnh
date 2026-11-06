# GTNH Calculator

[![Tests](https://github.com/ShadowTheAge/gtnh/actions/workflows/deploy.yml/badge.svg)](https://github.com/ShadowTheAge/gtnh/actions/workflows/deploy.yml)

A calculator for GregTech: New Horizons recipes and production chains.
Large parts of this project were written using AI assistance, so code style and quality are all over the place.
I just wanted to quickly put together something I can use to calculate GTNH chains. After this goal is done, it won't be an actively maintained project.

Data building is done using the NESQL Exporter mod and a C# processing tool. See [export/README.md](export/README.md) for detailed instructions.

## Fuel & power generation

Fuel recipes (any recipe with a `fuel_value` in its metadata) are treated as generators. Add one to a page like any recipe, then:

- Set the fuel input rate per machine. Generic generators also let you set efficiency loss.
- Large and XL gas turbines let you select rotor size, material, and fitting. Their base and current efficiencies are shown under the machine; current efficiency reflects the selected fuel rate.
- Turbine power is calculated from fuel value, fuel input rate, and current efficiency. Fuel flow determines machine count automatically, so generators do not use the fixed-machine setting.

Fuel given as filled cells (e.g. "Jet Fuel A Cell") is converted to liters of fluid, so no empty cells are required. Recipes that have a fuel value *and* a duration (Large Boiler) are not treated as generators.

Generated power appears in the POWER column as negative EU/t, and burned fuel appears in inputs, so group and grand totals read as net consumption.
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
