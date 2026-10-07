# Quiet Blue

Quiet Blue is a reusable Electron theme and plain HTML/CSS/JavaScript starter extracted from Secret Store and Swarm Tools. The two presets share semantic tokens and components; each can use either the dashboard or the sidebar/list/detail layout. Choose **Settings → Design preset** and **Appearance** to compare them.

```sh
npm install
npm start
```

Electron is pinned to 44.5.1, the version declared by both source projects at extraction. The template has no runtime dependencies beyond Electron and uses small inline SVG icons without bundled fonts or icon libraries.

For a browser preview without installing dependencies:

```sh
npm run preview
```

Open http://127.0.0.1:4173. Native window dragging and macOS traffic lights are available in Electron. The default Electron window is 1200 × 800 with a 960 × 650 minimum. The browser preview also supports narrower windows.

## Reuse

- `theme.css`: independent semantic tokens for both presets and appearances. Copy with `styles.css` for the shared components, or consume its variables in your own components.
- `index.html`: dashboard, library, settings, and a native dialog.
- `renderer.js`: navigation, search, item selection, add-item dialog, Cmd/Ctrl+K, and persistent appearance preferences. Sample items are in memory and reset when reloaded; connect your own data layer here.
- `main.js` / `preload.js`: isolated Electron host and a narrowly scoped appearance bridge.
- [Design guidelines](docs/design-guidelines.md): source mappings, component dimensions, and adaptation rules.

Replace the product name, sample content, and sidebar footer before shipping. Inter is a preferred font name, not a downloaded font; the system font is the fallback. Status cards are demonstrations, not live diagnostics. No vault, network proxy, credentials, certificates, or source business logic is included.

## Agent skill

The project skill is at `skills/electron-page-design/SKILL.md`. It includes guidelines and a portable starter in `assets/template/`. Root `AGENTS.md` tells future agents when to use it. The ordinary `skills/` folder keeps this deliverable within the writable workspace; installing into a protected agent configuration folder is a separate step.

```sh
npm run check
npm run package:skill
```

The packaging command refreshes the bundled starter from these root files and creates `artifacts/electron-page-design.skill` (a ZIP archive). Extract its `electron-page-design/` folder into another repository’s `.agents/skills/`, or into `~/.codex/skills/` for personal discovery. The package is self-contained and needs neither source project. Re-run packaging after changing the starter or guidelines. Global installation is optional and has not been performed.
