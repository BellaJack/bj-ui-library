---
description: How to create a new Angular library component for the Kiwi Design System, based on the bj-example base template
---

# Create a New Library Component

## Key Paths

| Item | Path |
|---|---|
| Base template | `projects/twentyninelab/bj-ui-library/example/bj-example/` |
| UI components root | `projects/twentyninelab/bj-ui-library/ui/` |
| Configurator components root | `projects/twentyninelab/bj-ui-library/configurator/` |
| Path alias | `@twentyninelab/bj-ui-library/{category}/{name}` (see root `tsconfig.json` → `paths`) |
| Doc page workflow | `.agent/workflows/create-doc-page.md` (run **after** the component exists) |

Each component is its own Angular Package Format secondary entry point: a folder containing `index.ts`, `public-api.ts`, `ng-package.json`, and a `src/` folder with the component files. No central file needs to be updated to register a new entry point — it is resolved automatically through the `@twentyninelab/bj-ui-library/*` path mapping in the root `tsconfig.json`.

## Step 1 — Copy the Base Template

Copy the whole `example/bj-example/` folder into `ui/bj-{name}/` (or `configurator/bj-{name}/` if the component is specific to the configurator feature), then:

1. Rename `src/bj-example.component.ts`, `.html` and `.scss` to `src/bj-{name}.component.ts`, `.html`, `.scss`.
2. Update `templateUrl` / `styleUrls` in the `.ts` file to match the renamed files.
3. Rename the selector `bj-example` → `bj-{name}` (use an attribute selector like `a[bj-{name}]` only if the component must render as a native element such as `<a>`).
4. Rename the class `KiwiExampleComponent` → `Kiwi{Name}Component`.
5. Update `public-api.ts` to export from the renamed component file.
6. Keep `ng-package.json` and `index.ts` unchanged (only the relative path depth matters, and it stays the same).

## Step 2 — Define Inputs, Outputs and Behavior

- Use the signal APIs, not decorators: `input()` / `input.required()` for inputs, `output()` for events. Never use `@Input()` / `@Output()`.
- Keep `changeDetection: ChangeDetectionStrategy.OnPush`.
- Remove `ngOnInit` / `ngOnDestroy` from the copied template if they stay empty — only keep lifecycle hooks that do actual work.
- Keep the constructor empty unless a dependency needs to be injected.
- Name boolean inputs `isXxx` (e.g. `isDisabled`, `isCurrentItem`) and keep an optional `classes` input (default `''`) so consumers can append custom classes, mirroring `bj-side-menu-item` and `bj-example`.

## Step 3 — Manage the Host, Not the Template Root

All classes, attributes, ARIA state and DOM events belonging to the component's root element must be declared in the `@Component({ host: {...} })` metadata — never with `@HostBinding` / `@HostListener` decorators, and never by wrapping the content in an extra `<div>` inside the template. Typical bindings:

```typescript
host: {
    '[attr.role]': "'group'",
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
    '[attr.aria-disabled]': 'isDisabled() ? true : null',
    '[class.bj-{name}--disable]': 'isDisabled()',
    '[class]': 'hostClass()',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleClick($event)'
}
```

- `hostClass()` returns the base class plus any consumer-provided classes: `` `bj-{name} ${this.classes()}` ``.
- Conditional/modifier classes use `[class.bj-{name}--modifier]` bindings rather than `ngClass` on the template root.
- The component template (`.html`) should only contain `<ng-content>` (default and/or named via `select="[slotName]"`) and, when needed, the truly internal markup that consumers cannot override (icons, wrappers required for layout, etc.).

## Step 4 — Content Projection

- Prefer projecting consumer content over hardcoding it, using named slots (`ng-content select="[bjXxx]"`) with a sensible default fallback rendered inside the same `@if` block, following the pattern used by `bj-side-menu-item` (`bjMenuItemIcon`, `bjMenuItemLabel`, `bjMenuItemArrow`).
- Import any sub-components used in the template (e.g. `bjIconComponent`) into the `imports` array of the `@Component` decorator — this library only uses standalone components.

## Step 5 — Styling

- Style the component in its own `src/bj-{name}.component.scss`, scoped with `:host.bj-{name} { ... }` (or plain `:host { ... }` if there is only one always-applied class).
- Use design tokens (`var(--bj-*)` custom properties) for colors, spacing, radius, typography — never hardcoded values.
- Do not touch the global framework stylesheets under `assets/styles/bj-design-system/06-components/` unless explicitly asked — those are a separate, framework-agnostic CSS layer maintained independently.

## Step 6 — Build and Verify

Run the library build to confirm the new entry point compiles:

```bash
npm run build:lib
```

Check the output for a line `Building entry point '@twentyninelab/bj-ui-library/{category}/bj-{name}'` followed by `✔ Built ...` and make sure no new warnings/errors reference the component.

## Step 7 — Document the Component

Once the component is implemented and builds cleanly, follow `.agent/workflows/create-doc-page.md` to create its documentation page, register its route in `app.routes.ts`, and add its sidebar link.

## Checklist

- [ ] Folder copied and renamed from `example/bj-example`
- [ ] Selector, class name and file names updated everywhere
- [ ] Inputs/outputs use signal APIs (`input()`, `input.required()`, `output()`)
- [ ] `ChangeDetectionStrategy.OnPush` kept, unused lifecycle hooks removed
- [ ] Classes, attributes and events handled via `host: {}` metadata only
- [ ] Template limited to `<ng-content>` and unavoidable internal markup
- [ ] SCSS scoped under `:host.bj-{name}` using design tokens
- [ ] `npm run build:lib` builds the new entry point with no related warnings
- [ ] Documentation page created via `create-doc-page.md`
