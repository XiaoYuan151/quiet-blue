# Quiet Blue design guidelines

## Origin and scope

Extracted on 2026-10-07 from the root renderer files in:

- `/Users/xiaoyuan/Documents/secret-store`: `styles.css`, `theme.css`, `index.html`, and appearance/window setup in `app.js` and `main.js`.
- `/Users/xiaoyuan/Documents/swarm-tools`: `styles.css`, `index.html`, and appearance/window setup in `renderer.js` and `main.js`.

The sources use literal CSS colors and cascading overrides. This starter converts their final visual conventions into semantic tokens. It is an adaptation, not a byte-for-byte stylesheet copy. The originals stay untouched. The table below records representative source values; tokens are the maintained implementation.

`source-manifest.json` records the source file SHA-256 hashes for this extraction.

## Preset mapping

| Role | Secret Store light / dark | Swarm Tools light / dark |
| --- | --- | --- |
| Canvas | `#f7f9fc` / `#11161e` | `#f7f9fc` / `#101722` |
| Main surface | `#ffffff` / `#19212c` | `#ffffff` / `#192330` |
| Sidebar | `#f5f7fa` / `#151d27` | `#ffffff` / `#192330` |
| Text | `#1b2331` / `#e8edf5` | `#202b3c` / `#e8eef7` |
| Structural border | `#e7ebf1` / `#303c4b` | `#e8edf4` / `#2a394a` |
| Primary button | `#386bd6` / `#527fe0` | `#4285f4` / `#4285f4` |
| Selected navigation | `#e4edfc` / `#294270` | `#eaf2ff` / `#203b60` |
| Selected text | `#2556b7` / `#cce0ff` | `#3172d8` / `#93beff` |
| Input | `#ffffff` / `#202b39` | `#ffffff` / `#14202c` |
| Sidebar width | 248 px | 256 px |

Swarm’s final title bar has its own dark override (`#19232f`, border `#344150`); the starter deliberately unifies it with the surface role. Source-specific entries also differ from navigation selections; the starter uses one selection role for both. Smaller source text such as `#9aa6b6` is raised to the shared muted role for clearer labels. Status pills come from Secret Store; the hero gradient and overview cards come from Swarm Tools. The spacing scale, shared token names, standalone starter icons, and narrow browser layout are additions for reuse.

## Visual character

Use quiet neutral surfaces, restrained blue accents, thin borders, and compact controls. Reserve filled blue for the principal action. Selection uses a soft blue fill and readable blue text. Dark appearance uses layered blue-gray surfaces with light text, rather than inverting the page.

The sources favor Inter with native UI fallbacks. Use the system stack without fetching a font unless the consuming project supplies a licensed local font. Use monospace for technical values. Text scale: 10 px uppercase section captions with about .12em tracking; 11–13 px supporting text and controls; 14 px section headings; 25–28 px page headings. Keep form labels readable; allow larger type when content or accessibility needs it. Long values should wrap or truncate intentionally, with the full value available when needed.

Use 6–8 px control radii, 10–11 px cards/entries, 13 px hero, and 15 px dialogs. Most spacing comes from 8, 12, 16, 24, and 32 px increments. Shadows are subtle on light cards, absent on ordinary dark cards, and stronger for modal overlays. Do not add gradients to ordinary forms; the blue gradient is for the Swarm overview hero.

## Layouts

**Library (Secret Store).** A full-width title bar sits over sidebar, list, and detail. The source has a 248 px sidebar, a 300–400 px list, and flexible detail with a 720 px inner maximum. The starter uses a 350 px list. List rows contain a 40 px emblem, compact title/subtitle, and visible selection. Detail headings are about 26 px, followed by status pills and sections divided with thin rules. Preserve independent list/detail scrolling on desktop. A settings page can replace both content panes without replacing the shell.

**Dashboard (Swarm Tools).** A full-width title bar sits over a 256 px sidebar and an independently scrolling content column. Content is centered with an 1180 px maximum and around 31–39 px inset. Use a hero only where introductory content helps, followed by statistic cards and form surfaces. Source form surfaces use about 24 × 27 px padding. At reduced desktop widths, lower sidebar and content spacing before compressing forms.

The starter defaults to a 1200 × 800 Electron window and enforces a 960 × 650 minimum, matching Swarm’s minimum. Both source defaults are 960 × 720; Secret Store’s minimum is 940 × 650. Its original three-pane CSS can overflow at that size, so the starter uses flexible detail and a narrow browser fallback. Do not treat its 800 px breakpoint as an extracted source rule.

## Desktop chrome and interaction

Use a 48 px title bar on macOS and reserve about 96–98 px on the left for native traffic lights. Keep the title bar draggable and every interactive descendant explicitly `no-drag`. The starter positions traffic lights at (12,17) to center them in 48 px; Swarm uses (12,11), and Secret Store uses `hiddenInset`. Windows/Linux keep their native title bar with the shared toolbar underneath.

Appearance has independent **system**, **light**, and **dark** preferences. Persist the preference, resolve system appearance, apply `data-theme` before first paint, and update when the system changes. Keep Electron window background synchronized through the validated preload bridge. Preset is independently selected with `data-preset`.

Navigation requires a visible current state. Item selection requires a distinct row state. Inputs need focus borders/rings, buttons need visible keyboard focus, and icon-only actions need labels. Forms, empty states, disabled controls, statuses, dialogs, and toasts must work in both appearances. Never encode status only by color. Use native dialog semantics for modal focus handling and Escape dismissal.

The sources include EN/中文 toggles, Font Awesome icons, and decorative click ripples. The starter intentionally supplies English sample content, small inline SVGs, and no ripple. Add localization using a dictionary and keep labels synchronized; do not copy source application translations as a product requirement. Optional ripple motion should respect reduced-motion preferences. Keep selectable technical text and editable fields while avoiding accidental selection of desktop chrome.

## Applying the template

1. Choose the library or dashboard layout according to the task, then choose one named preset. They are independent choices.
2. Copy the starter into a new destination or selectively adapt its files into an existing application. Preserve the target’s data flow and build setup.
3. Replace product name, sample records, status cards, and footer. Treat `renderer.js` as demonstration behavior; it has no durable item storage.
4. Map new surfaces to existing semantic roles. Add a role only when it expresses a recurring visual distinction. Prefer tokens over one-off literal colors.
5. Check light/dark × both presets, at 1200 × 800 and 960 × 650. Exercise long text, empty search, item selection, add/cancel/Escape, keyboard focus, and system appearance changes. Check native drag and traffic-light clearance in Electron separately from browser preview.

The host uses context isolation, a sandboxed renderer, no Node integration, a local-only content security policy, and one validated appearance IPC call. These are starter implementation choices derived from the source hosts. Add only the bridges needed by the consuming application. This design skill grants no authority to copy credentials, vault data, network configuration, certificates, or product backend code.
