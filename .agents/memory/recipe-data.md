---
name: Recipe data source
description: What the GTNH recipe export contains and where to look for machine calculation rules.
---

The recipe and available-crafter data comes from the `ShadowTheAge/gtnh-data` repository. Its binary export contains recipe types, recipes, and the multiblock names available for each type, but not machine speed, power discounts, parallel limits, or warm-up behavior.

**Why:** A listed multiblock name does not provide enough information to calculate its throughput; treating it as a generic machine silently loses its bonuses.

**How to apply:** Use the data export to audit recipe and crafter coverage, then check GTNH machine references or source code for performance formulas.
