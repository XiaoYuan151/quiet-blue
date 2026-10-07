---
name: electron-page-design
description: Build or restyle Electron utility pages with the Quiet Blue theme using the Secret Store and Swarm Tools design presets, shared theme tokens, and library or dashboard layouts. Use when this desktop design or its reusable starter is requested.
---

# Quiet Blue Electron Page Design

Read [the design guidelines](references/design-guidelines.md) for palette mappings, source-specific dimensions, layout choices, and deliberate adaptations. The portable [starter](assets/template/) supplies plain HTML/CSS/JavaScript and an isolated Electron host; it needs neither original project.

Choose the layout according to the product: Secret Store’s sidebar/list/detail for collections, Swarm Tools’ sidebar/dashboard for overview and configuration. Choose the color preset separately. Keep `theme.css` as the semantic role layer and `styles.css` as the shared component layer; select with `data-preset="secret-store"` or `data-preset="swarm-tools"` and `data-theme="light"` or `data-theme="dark"`.

When starting a new application, copy `assets/template/` into its destination and replace product copy and sample content. When editing an existing application, adapt only relevant tokens and components to its structure. Do not replace its data layer or package setup merely to match the starter. Preserve user-requested deviations.

Retain compact typography, subtle borders, restrained blue selection and actions, readable dark surfaces, and consistent control radii. On macOS, reserve the traffic-light inset and keep controls outside the drag region. Keep system/light/dark appearance selection, pre-paint application, and native background synchronization when using the supplied Electron host.

Verify both presets and appearances at desktop minimum size, with long text, empty search, selected rows, dialog add/cancel/Escape, keyboard focus, and window dragging. Run `npm run check` in the starter. Browser preview uses `npm run preview`; native chrome still needs an Electron check. Report verification limits honestly.

The starter’s items are transient demo data, and its status cards are samples. Replace them for production. Source copyrights, application icons, translations, credentials, vault data, certificates, and network/proxy behavior are not part of this reusable design. Do not infer authority to copy them from a design request.
