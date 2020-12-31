# Cyberpunk RED for Foundry VTT

An implementation of **Cyberpunk RED** for Foundry VTT. This is a very early work in progress and not ready for playtesting.

## Development

### Prerequisites

- Foundry VTT 0.7.9
- Node 12+
- pnpm `npm i -g pnpm`

### Setup

- Install all packages with `pnpm i`
- Make a copy of [foundryconfig.template.json](.\foundryconfig.template.json) and rename it to `foundryconfig.json`
- Open `foundryconfig.json` and change the datapath to Foundry VTT's data path. This may be in your appdata folder or somewhere else depending on how you configured Foundry VTT.
- Run `pnpm run build` to compile everything. At this point the cpred system should be visible in FoundryVTT.
- Run `pnpm run build:watch` to have your code redeploy as you make changes. You will need to refresh the page in Foundry VTT to see changes.
  - If you make changes to `system.json` you will also need to restart Foundry VTT completely.

### Commands

```sh
pnpm i               # install packages
pnpm run build       # clean and rebuilds
pnpm run build:watch # watch for changes and build changes
pnpm run update      # bump dependency versions, run pnpm i after to install changes
```
