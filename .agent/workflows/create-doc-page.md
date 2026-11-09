---
description: How to create a new component documentation page for the BJ Design System
---

# Create a Component Documentation Page

## Key Paths

| Item               | Path                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Doc pages root     | `projects/bj-ui-library-documentation/src/app/pages/components/`                                                                 |
| Library components | `projects/twentyninelab/bj-ui-library/ui/`                                                                                               |
| Routes             | `projects/bj-ui-library-documentation/src/app/app.routes.ts`                                                                     |
| Sidebar nav        | `projects/bj-ui-library-documentation/src/app/domains/_layout/components/sidebar/sidebar.html`                                            |
| Models             | `projects/bj-ui-library-documentation/src/app/domains/doc/models/` (see `highlights.ts` for `CodeToShow`, `documentation.ts` for `TableRow`) |

## Step 1 — Read the Source Component

Read only these files from `projects/twentyninelab/bj-ui-library/ui/bj-{name}/src/`:

- `bj-{name}.component.ts` — extract all `input()` and `output()` properties, enums, and types
- `bj-{name}.component.html` — understand the template structure, content projection slots (`ng-content select="[...]"`), and ARIA attributes

Do **not** read the SCSS unless specifically asked — it doesn't affect the doc page.

## Step 2 — Create 3 Files

Create a folder `pages/components/{name}/` with:

### `{name}.component.ts`

Standard Angular standalone component. Use these imports:

```typescript
import { PageComponent } from "../../../domains/_ui/components/page/page.component";
import { ExplanationWrapComponent } from "../../../domains/doc/components/explanationWrap/explanationWrap.doc.component";
import { CodeExampleComponent } from "../../../domains/doc/components/code-example/code-example.component";
import { TableDocComponent } from "../../../domains/doc/components/table/table.doc.component";
import { CardDocComponent } from "../../../domains/doc/components/card/card.doc.component";
import { CodeToShow } from "../../../domains/doc/models/highlights";
import { TableRow } from "../../../domains/doc/models/documentation";
```

Include the actual library component import:

```typescript
import { BjXxxComponent } from "@twentyninelab/bj-ui-library/ui/bj-xxx";
```

Define:

- `docTableRow: TableRow[]` — one entry per `input()` with `{ property, type, default, required, description }`
- One `CodeToShow[]` per scenario — each array has 2 items: `{ code, language: 'html', label: 'Angular' }` and `{ code, language: 'html' }` (plain HTML equivalent)

### `{name}.component.html`

On the root `<bj-doc-page>` element, always set `[infoVersion]` to the current `@twentyninelab/bj-ui-library` version (see the `version` field in `projects/twentyninelab/bj-ui-library/package.json`), phrased as `'Need version {version} or later'`. This renders a `bj-badge` next to the title so users know which library version to install to get the documented component/feature:

```html
<bj-doc-page [title]="'Xxx'" [infoVersion]="'Need version 0.0.0 or later'"></bj-doc-page>
```

Follow this **exact section order** inside `<bj-doc-page>` → `<ng-container bj-ds-example>`:

1. **Overview** — `<bj-doc-explanation-wrap [title]="'Overview'">` + `<bj-doc-code-example>` showing the most basic usage
2. `<hr />`
3. **Anatomy** — `<bj-doc-explanation-wrap [title]="'Anatomy'" [titleLevel]="2">` with an `<ol>` listing the visual parts
4. `<hr />`
5. **Usage** — `<h2>` then a `bj-grid bj-grid--lg-2` with two `<bj-doc-card>` ("When to use" with `[backgroundClass]="'bj-bg-status-success-light'"`, "When NOT to use" with `[backgroundClass]="'bj-bg-status-error-light'"`)
6. **Content Guidelines** — `<bj-doc-card [backgroundClass]="'bj-bg-secondary-100'">` with a `<ul>`
7. **Accessibility** — `<bj-doc-card>` with ARIA / keyboard notes
8. `<hr />`
9. **Component API** — `<bj-doc-explanation-wrap>` + `<bj-doc-table [tableRows]="docTableRow">`
10. `<hr />`
11. **Implementation scenarios** — `<h2>` then one `<div class="bj-grid bj-gap-large">` block per scenario, each containing `<bj-doc-explanation-wrap [titleLevel]="3">` + `<bj-doc-code-example>` with a live demo

### `{name}.component.scss`

Create as an **empty file**.

## Step 3 — Register the Route

In `app.routes.ts`:

1. Add the import at the top
2. Add a route object: `{ path: 'components/{name}', component: XxxComponent }`

Place it alphabetically among the existing component routes.

## Step 4 — Add Sidebar Link

In `sidebar.html`, add inside the **Components UI** `<ul>`:

```html
<li bjDsNavEl class="bj-ds-nav__el" [url]="'/components/{name}'" [label]="'ComponentLabel'"></li>
```

Place it alphabetically among the existing links.

## Checklist

- [ ] Read source `.ts` and `.html` (2 files only)
- [ ] Check `projects/twentyninelab/bj-ui-library/package.json` for the current library version
- [ ] Create `{name}.component.ts` with `docTableRow` + all `CodeToShow[]` arrays
- [ ] Create `{name}.component.html` with `[infoVersion]` set on `<bj-doc-page>` and the full section structure
- [ ] Create `{name}.component.scss` (empty)
- [ ] Add route in `app.routes.ts`
- [ ] Add sidebar link in `sidebar.html`
