import { Component } from '@angular/core';
import { BjBadgeComponent } from '@twentyninelab/bj-ui-library/ui/bj-badge';
import { BjIconComponent } from '@twentyninelab/bj-ui-library/ui/bj-icon';
import { PageComponent } from '../../../domains/_ui/components/page/page.component';
import { ExplanationWrapComponent } from '../../../domains/doc/components/explanationWrap/explanationWrap.doc.component';
import { CodeExampleComponent } from '../../../domains/doc/components/code-example/code-example.component';
import { TableDocComponent } from '../../../domains/doc/components/table/table.doc.component';
import { CardDocComponent } from '../../../domains/doc/components/card/card.doc.component';
import { codeExample } from '../../../domains/doc/models/highlights';
import { TableRow } from '../../../domains/doc/models/documentation';

const stylesNote = '<!-- These styles live in the Angular component -->';

@Component({
  selector: 'app-badge-page',
  imports: [
    BjBadgeComponent,
    BjIconComponent,
    PageComponent,
    ExplanationWrapComponent,
    CodeExampleComponent,
    TableDocComponent,
    CardDocComponent,
  ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  readonly docTableRow: TableRow[] = [
    {
      property: 'backgroundColor',
      type: 'string',
      default: `'bj-bg-gray-300'`,
      required: false,
      description: 'Background utility class.',
    },
    {
      property: 'size',
      type: `'small' | 'medium' | 'large' | 'full'`,
      default: `''`,
      required: false,
      description: 'Badge size. <code>medium</code> matches the default, <code>full</code> fills the row.',
    },
    {
      property: 'radius',
      type: `'default' | 'small' | 'medium' | 'large' | 'pills' | 'all' | 'none'`,
      default: `'small'`,
      required: false,
      description: 'Corner radius.',
    },
    {
      property: 'iconPosition',
      type: `'left' | 'right'`,
      default: `'left'`,
      required: false,
      description: 'Side of the text where the <code>badgeIcon</code> slot is shown.',
    },
    {
      property: 'variant',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Adds the class <code>bj-badge--{variant}</code>, for your own styles.',
    },
    {
      property: 'classes',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Extra classes for the badge.',
    },
    {
      property: 'contentClass',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Extra classes for the badge, kept apart from <code>classes</code>.',
    },
    {
      property: 'style',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Inline styles for the badge.',
    },
  ];

  readonly overviewCode = codeExample(
    `<bj-badge>New</bj-badge>`,
    `${stylesNote}
<div class="bj-badge bj-radius-xxs bj-bg-gray-300">New</div>`,
  );

  readonly backgroundCode = codeExample(
    `<bj-badge backgroundColor="bj-bg-status-success">Active</bj-badge>
<bj-badge backgroundColor="bj-bg-status-warning">Pending</bj-badge>
<bj-badge backgroundColor="bj-bg-status-error">Failed</bj-badge>`,
    `${stylesNote}
<div class="bj-badge bj-radius-xxs bj-bg-status-success">Active</div>
<div class="bj-badge bj-radius-xxs bj-bg-status-warning">Pending</div>
<div class="bj-badge bj-radius-xxs bj-bg-status-error">Failed</div>`,
  );

  readonly sizesCode = codeExample(
    `<bj-badge size="small">Small</bj-badge>
<bj-badge>Default</bj-badge>
<bj-badge size="large">Large</bj-badge>
<bj-badge size="full">Full</bj-badge>`,
    `${stylesNote}
<div class="bj-badge bj-radius-xxs bj-bg-gray-300 bj-badge--small">Small</div>
<div class="bj-badge bj-radius-xxs bj-bg-gray-300">Default</div>
<div class="bj-badge bj-radius-xxs bj-bg-gray-300 bj-badge--large">Large</div>
<div class="bj-badge bj-radius-xxs bj-bg-gray-300 u-w-full bj-justify-center">Full</div>`,
  );

  readonly radiusCode = codeExample(
    `<bj-badge radius="none">None</bj-badge>
<bj-badge>Small</bj-badge>
<bj-badge radius="medium">Medium</bj-badge>
<bj-badge radius="pills">Pills</bj-badge>`,
    `${stylesNote}
<div class="bj-badge bj-radius-none bj-bg-gray-300">None</div>
<div class="bj-badge bj-radius-xxs bj-bg-gray-300">Small</div>
<div class="bj-badge bj-radius bj-bg-gray-300">Medium</div>
<div class="bj-badge bj-radius-round bj-bg-gray-300">Pills</div>`,
  );

  readonly iconCode = codeExample(
    `<bj-badge>
  <bj-icon badgeIcon icon="fas fa-check" size="small"></bj-icon>
  Verified
</bj-badge>
<bj-badge iconPosition="right">
  <bj-icon badgeIcon icon="fas fa-arrow-right" size="small"></bj-icon>
  Next
</bj-badge>`,
    `${stylesNote}
<div class="bj-badge bj-radius-xxs bj-bg-gray-300">
  <i aria-hidden="true" class="fas fa-check bj-ty-icon-sm"></i>
  Verified
</div>
<div class="bj-badge bj-radius-xxs bj-bg-gray-300 bj-badge--icon-right">
  <i aria-hidden="true" class="fas fa-arrow-right bj-ty-icon-sm"></i>
  Next
</div>`,
  );
}
