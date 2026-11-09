import { Component, signal } from '@angular/core';
import { BjAccordionComponent } from '@twentyninelab/bj-ui-library/ui/bj-accordion';
import { BjButtonComponent } from '@twentyninelab/bj-ui-library/ui/bj-button';
import { PageComponent } from '../../../domains/_ui/components/page/page.component';
import { ExplanationWrapComponent } from '../../../domains/doc/components/explanationWrap/explanationWrap.doc.component';
import { CodeExampleComponent } from '../../../domains/doc/components/code-example/code-example.component';
import { TableDocComponent } from '../../../domains/doc/components/table/table.doc.component';
import { CardDocComponent } from '../../../domains/doc/components/card/card.doc.component';
import { codeExample } from '../../../domains/doc/models/highlights';
import { TableRow } from '../../../domains/doc/models/documentation';

@Component({
  selector: 'app-accordion-page',
  imports: [
    BjAccordionComponent,
    BjButtonComponent,
    PageComponent,
    ExplanationWrapComponent,
    CodeExampleComponent,
    TableDocComponent,
    CardDocComponent,
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  readonly isOpen = signal(false);
  readonly statusLabel = signal('No change yet');

  readonly docTableRow: TableRow[] = [
    {
      property: 'id',
      type: 'string',
      default: '-',
      required: true,
      description: 'Unique value used to link the button and the content for assistive technology.',
    },
    {
      property: 'open',
      type: 'boolean | undefined',
      default: 'undefined',
      required: false,
      description: 'Open state. Supports two-way binding with <code>[(open)]</code>.',
    },
    {
      property: 'disabled',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'Disables the button. Use the binding form: <code>[disabled]="true"</code>.',
    },
    {
      property: 'buttonLabel',
      type: 'string',
      default: `'Toggle accordion'`,
      required: false,
      description: 'Text of the default button. Ignored when the <code>accordionButton</code> slot is used.',
    },
    {
      property: 'classes',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Extra classes for the accordion wrapper.',
    },
    {
      property: 'buttonClasses',
      type: 'string',
      default: `'bj-flex bj-gap-small'`,
      required: false,
      description: 'Classes of the button. They replace the default ones.',
    },
    {
      property: 'contentClasses',
      type: 'string',
      default: `'u-pt-sm'`,
      required: false,
      description: 'Classes of the element around the content.',
    },
    {
      property: 'statusChanges',
      type: 'output: boolean',
      default: '-',
      required: false,
      description: 'Emits <code>true</code> when the accordion opens and <code>false</code> when it closes.',
    },
  ];

  readonly overviewCode = codeExample(
    `<bj-accordion id="shipping" buttonLabel="Shipping details">
  <ng-container accordionContent>
    <p>Orders ship within two working days.</p>
  </ng-container>
</bj-accordion>`,
    `<!-- The open and close behavior needs your own script -->
<div class="bj-accordion">
  <button
    type="button"
    id="accordion-btn-shipping"
    class="bj-flex bj-gap-small"
    aria-expanded="false"
    aria-controls="accordion-content-shipping">
    <i aria-hidden="true" class="bj-ty-icon-lg fas fa-angle-right"></i>
    <span class="bj-accordion__label">Shipping details</span>
  </button>
  <div
    id="accordion-content-shipping"
    class="bj-accordion__content"
    role="region"
    aria-labelledby="accordion-btn-shipping"
    aria-hidden="true"
    inert>
    <div class="u-pt-sm"><p>Orders ship within two working days.</p></div>
  </div>
</div>`,
  );

  readonly customButtonCode = codeExample(
    `<bj-accordion
  id="faq"
  buttonClasses="bj-btn bj-btn-outline bj-btn-contrast u-w-full bj-justify-between"
  #faq>
  <ng-container accordionButton>
    <span>Frequently asked questions</span>
    <i aria-hidden="true" class="fas" [class]="faq.open() ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
  </ng-container>
  <ng-container accordionContent>
    <p>Write to us if you do not find your answer.</p>
  </ng-container>
</bj-accordion>`,
    `<button
  type="button"
  class="bj-btn bj-btn-outline bj-btn-contrast u-w-full bj-justify-between"
  aria-expanded="false"
  aria-controls="accordion-content-faq">
  <span>Frequently asked questions</span>
  <i aria-hidden="true" class="fas fa-chevron-down"></i>
</button>`,
  );

  readonly openCode = codeExample(
    `<bj-accordion id="details" buttonLabel="Details" [open]="true">
  <ng-container accordionContent>
    <p>This content is visible from the start.</p>
  </ng-container>
</bj-accordion>`,
    `<button type="button" aria-expanded="true" aria-controls="accordion-content-details">
  Details
</button>
<div id="accordion-content-details" class="bj-accordion__content" role="region" aria-hidden="false">
  <p>This content is visible from the start.</p>
</div>`,
  );

  readonly controlledCode = codeExample(
    `<bj-button (click)="isOpen.set(!isOpen())">Toggle from outside</bj-button>

<bj-accordion
  id="controlled"
  buttonLabel="Controlled accordion"
  [(open)]="isOpen"
  (statusChanges)="statusLabel.set($event ? 'Opened' : 'Closed')">
  <ng-container accordionContent>
    <p>Its state lives in the parent component.</p>
  </ng-container>
</bj-accordion>`,
    `<!-- Keep aria-expanded, aria-hidden and inert in sync with your own script -->
<button type="button" aria-expanded="false" aria-controls="accordion-content-controlled">
  Controlled accordion
</button>`,
  );

  readonly disabledCode = codeExample(
    `<bj-accordion id="locked" buttonLabel="Not available" [disabled]="true"></bj-accordion>`,
    `<button type="button" aria-expanded="false" aria-controls="accordion-content-locked" disabled>
  Not available
</button>`,
  );
}
