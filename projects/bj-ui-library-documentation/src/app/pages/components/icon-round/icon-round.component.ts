import { Component } from '@angular/core';
import { BjIconRoundComponent } from '@twentyninelab/bj-ui-library/ui/bj-icon-round';
import { PageComponent } from '../../../domains/_ui/components/page/page.component';
import { ExplanationWrapComponent } from '../../../domains/doc/components/explanationWrap/explanationWrap.doc.component';
import { CodeExampleComponent } from '../../../domains/doc/components/code-example/code-example.component';
import { TableDocComponent } from '../../../domains/doc/components/table/table.doc.component';
import { CardDocComponent } from '../../../domains/doc/components/card/card.doc.component';
import { codeExample } from '../../../domains/doc/models/highlights';
import { TableRow } from '../../../domains/doc/models/documentation';

@Component({
  selector: 'app-icon-round-page',
  imports: [
    BjIconRoundComponent,
    PageComponent,
    ExplanationWrapComponent,
    CodeExampleComponent,
    TableDocComponent,
    CardDocComponent,
  ],
  templateUrl: './icon-round.component.html',
  styleUrl: './icon-round.component.scss',
})
export class IconRoundComponent {
  readonly docTableRow: TableRow[] = [
    {
      property: 'icon',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Icon classes, for example <code>fas fa-check</code>.',
    },
    {
      property: 'size',
      type: `'extra-small' | 'small' | 'default' | 'medium' | 'large' | 'extra-large'`,
      default: `'default'`,
      required: false,
      description: 'Circle size, from 24 to 80 pixels. <code>default</code> and <code>medium</code> are both 44 pixels.',
    },
    {
      property: 'color',
      type: `'default' | 'success' | 'warning' | 'error' | 'gray-dark'`,
      default: `'default'`,
      required: false,
      description: 'Background color of the circle.',
    },
    {
      property: 'classes',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Extra classes for the circle.',
    },
    {
      property: 'style',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Inline styles for the circle.',
    },
  ];

  readonly overviewCode = codeExample(
    `<bj-icon-round icon="fas fa-check"></bj-icon-round>`,
    `<div aria-hidden="true" class="bj-round-icon bj-bg-gray-600">
  <i aria-hidden="true" class="fas fa-check bj-ty-icon"></i>
</div>`,
  );

  readonly sizesCode = codeExample(
    `<bj-icon-round icon="fas fa-check" size="extra-small"></bj-icon-round>
<bj-icon-round icon="fas fa-check" size="small"></bj-icon-round>
<bj-icon-round icon="fas fa-check" size="medium"></bj-icon-round>
<bj-icon-round icon="fas fa-check" size="large"></bj-icon-round>
<bj-icon-round icon="fas fa-check" size="extra-large"></bj-icon-round>`,
    `<div aria-hidden="true" class="bj-round-icon bj-round-icon--xs bj-bg-gray-600">
  <i aria-hidden="true" class="fas fa-check bj-ty-icon-xs"></i>
</div>
<div aria-hidden="true" class="bj-round-icon bj-round-icon--sm bj-bg-gray-600">
  <i aria-hidden="true" class="fas fa-check bj-ty-icon-xs"></i>
</div>
<div aria-hidden="true" class="bj-round-icon bj-round-icon--md bj-bg-gray-600">
  <i aria-hidden="true" class="fas fa-check bj-ty-icon-md"></i>
</div>
<div aria-hidden="true" class="bj-round-icon bj-round-icon--lg bj-bg-gray-600">
  <i aria-hidden="true" class="fas fa-check bj-ty-icon-lg"></i>
</div>
<div aria-hidden="true" class="bj-round-icon bj-round-icon--xl bj-bg-gray-600">
  <i aria-hidden="true" class="fas fa-check bj-ty-icon-xl"></i>
</div>`,
  );

  readonly colorsCode = codeExample(
    `<bj-icon-round icon="fas fa-user"></bj-icon-round>
<bj-icon-round icon="fas fa-check" color="success"></bj-icon-round>
<bj-icon-round icon="fas fa-triangle-exclamation" color="warning"></bj-icon-round>
<bj-icon-round icon="fas fa-xmark" color="error"></bj-icon-round>
<bj-icon-round icon="fas fa-moon" color="gray-dark"></bj-icon-round>`,
    `<div aria-hidden="true" class="bj-round-icon bj-bg-gray-600">...</div>
<div aria-hidden="true" class="bj-round-icon bj-bg-status-success">...</div>
<div aria-hidden="true" class="bj-round-icon bj-bg-status-warning">...</div>
<div aria-hidden="true" class="bj-round-icon bj-bg-status-error">...</div>
<div aria-hidden="true" class="bj-round-icon bj-bg-gray-800">...</div>`,
  );

  readonly withTextCode = codeExample(
    `<div class="bj-round-icon-text">
  <bj-icon-round icon="fas fa-check" color="success"></bj-icon-round>
  <p>Your changes have been saved.</p>
</div>`,
    `<div class="bj-round-icon-text">
  <div aria-hidden="true" class="bj-round-icon bj-bg-status-success">
    <i aria-hidden="true" class="fas fa-check bj-ty-icon"></i>
  </div>
  <p>Your changes have been saved.</p>
</div>`,
  );
}
