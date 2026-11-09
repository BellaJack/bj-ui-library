import { Component } from '@angular/core';
import { BjButtonComponent } from '@twentyninelab/bj-ui-library/ui/bj-button';
import { PageComponent } from '../../../domains/_ui/components/page/page.component';
import { ExplanationWrapComponent } from '../../../domains/doc/components/explanationWrap/explanationWrap.doc.component';
import { CodeExampleComponent } from '../../../domains/doc/components/code-example/code-example.component';
import { TableDocComponent } from '../../../domains/doc/components/table/table.doc.component';
import { CardDocComponent } from '../../../domains/doc/components/card/card.doc.component';
import { codeExample } from '../../../domains/doc/models/highlights';
import { TableRow } from '../../../domains/doc/models/documentation';

@Component({
  selector: 'app-button-page',
  imports: [
    BjButtonComponent,
    PageComponent,
    ExplanationWrapComponent,
    CodeExampleComponent,
    TableDocComponent,
    CardDocComponent,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly docTableRow: TableRow[] = [
    {
      property: 'variant',
      type: `'solid' | 'outline' | 'text'`,
      default: `'solid'`,
      required: false,
      description: 'Visual weight of the button.',
    },
    {
      property: 'severity',
      type: `'primary' | 'secondary' | 'contrast' | 'danger'`,
      default: `'primary'`,
      required: false,
      description: 'Color and meaning of the button.',
    },
    {
      property: 'type',
      type: `'button' | 'submit' | 'reset'`,
      default: `'button'`,
      required: false,
      description: 'Native button type. Ignored on links.',
    },
    {
      property: 'isDisabled',
      type: 'boolean',
      default: 'false',
      required: false,
      description:
        'Disables the button. On a link it sets <code>aria-disabled</code> and removes it from the tab order.',
    },
    {
      property: 'icon',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Icon classes, for example <code>fas fa-floppy-disk</code>.',
    },
    {
      property: 'iconPosition',
      type: `'left' | 'right'`,
      default: `'left'`,
      required: false,
      description: 'Side of the text where the icon is shown.',
    },
    {
      property: 'isIconOnly',
      type: 'boolean',
      default: 'false',
      required: false,
      description:
        'Shows only the icon and hides the text with <code>u-v-hidden</code>. Ignored when <code>icon</code> is empty.',
    },
    {
      property: 'badge',
      type: 'string | number | null',
      default: 'null',
      required: false,
      description: 'Badge value. <code>0</code> is shown, <code>null</code> and an empty string are not.',
    },
    {
      property: 'badgePosition',
      type: `'left' | 'right'`,
      default: `'right'`,
      required: false,
      description: 'Side of the text where the badge is shown.',
    },
    {
      property: 'ariaLabel',
      type: 'string',
      default: `''`,
      required: false,
      description:
        'Adds a <code>u-v-hidden</code> span with this text and hides the projected text from assistive technology.',
    },
    {
      property: 'classes',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Extra classes for the element that looks like a button.',
    },
  ];

  readonly overviewCode = codeExample(
    `<bj-button>Save</bj-button>`,
    `<button class="bj-btn bj-btn-solid bj-btn-primary" type="button">
  <span>Save</span>
</button>`,
  );

  readonly variantsCode = codeExample(
    `<bj-button variant="solid">Solid</bj-button>
<bj-button variant="outline">Outline</bj-button>
<bj-button variant="text">Text</bj-button>`,
    `<button class="bj-btn bj-btn-solid bj-btn-primary" type="button"><span>Solid</span></button>
<button class="bj-btn bj-btn-outline bj-btn-primary" type="button"><span>Outline</span></button>
<button class="bj-btn bj-btn-text bj-btn-primary" type="button"><span>Text</span></button>`,
  );

  readonly severitiesCode = codeExample(
    `<bj-button severity="primary">Primary</bj-button>
<bj-button severity="secondary">Secondary</bj-button>
<bj-button severity="contrast">Contrast</bj-button>
<bj-button severity="danger">Danger</bj-button>`,
    `<button class="bj-btn bj-btn-solid bj-btn-primary" type="button"><span>Primary</span></button>
<button class="bj-btn bj-btn-solid bj-btn-secondary" type="button"><span>Secondary</span></button>
<button class="bj-btn bj-btn-solid bj-btn-contrast" type="button"><span>Contrast</span></button>
<button class="bj-btn bj-btn-solid bj-btn-danger" type="button"><span>Danger</span></button>`,
  );

  readonly iconCode = codeExample(
    `<bj-button icon="fas fa-floppy-disk">Save</bj-button>
<bj-button icon="fas fa-arrow-right" iconPosition="right">Next</bj-button>`,
    `<button class="bj-btn bj-btn-solid bj-btn-primary" type="button">
  <i aria-hidden="true" class="fas fa-floppy-disk bj-ty-icon"></i>
  <span>Save</span>
</button>`,
  );

  readonly iconOnlyCode = codeExample(
    `<bj-button icon="fas fa-trash" severity="danger" isIconOnly>Delete</bj-button>`,
    `<button class="bj-btn bj-btn-solid bj-btn-danger bj-btn-icon" type="button">
  <i aria-hidden="true" class="fas fa-trash bj-ty-icon"></i>
  <span class="u-v-hidden">Delete</span>
</button>`,
  );

  readonly badgeCode = codeExample(
    `<bj-button [badge]="3">Messages</bj-button>
<bj-button [badge]="3" badgePosition="left" variant="outline">Messages</bj-button>
<bj-button [badge]="3" icon="fas fa-bell" variant="text" severity="contrast" isIconOnly>
  Notifications
</bj-button>`,
    `<button class="bj-btn bj-btn-solid bj-btn-primary" type="button">
  <span>Messages</span>
  <span class="bj-btn-badge bj-btn-badge-right">3</span>
</button>`,
  );

  readonly ariaLabelCode = codeExample(
    `<bj-button ariaLabel="Open the main menu">Menu</bj-button>`,
    `<button class="bj-btn bj-btn-solid bj-btn-primary" type="button">
  <span aria-hidden="true">Menu</span>
  <span class="u-v-hidden">Open the main menu</span>
</button>`,
  );

  readonly linkCode = codeExample(
    `<a bjButton href="https://github.com/BellaJack/bj-ui-library" variant="outline">GitHub</a>`,
    `<a class="bj-btn bj-btn-outline bj-btn-primary" href="https://github.com/BellaJack/bj-ui-library">
  <span>GitHub</span>
</a>`,
  );

  readonly disabledCode = codeExample(
    `<bj-button isDisabled>Save</bj-button>`,
    `<button class="bj-btn bj-btn-solid bj-btn-primary" type="button" disabled>
  <span>Save</span>
</button>`,
  );
}
