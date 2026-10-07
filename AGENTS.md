# Agent guidance

This workspace is Quiet Blue, a reusable Electron theme and page starter. When building or editing pages with the Secret Store / Swarm Tools design, read `skills/electron-page-design/SKILL.md` and the relevant design reference.

The root template is canonical. Keep color roles in `theme.css` and shared component rules in `styles.css`. Use the named presets rather than mixing source colors arbitrarily. Business-specific UI and data belong in the consuming application.

After edits, run `npm run check`. For visible changes, verify both presets in light and dark, dashboard and library layouts, navigation, keyboard focus, search, and dialog behavior. Use `npm run package:skill` to refresh the portable skill assets and archive after the final edits.
