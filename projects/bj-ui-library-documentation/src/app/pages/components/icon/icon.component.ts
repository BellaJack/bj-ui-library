import { Component } from '@angular/core';
import { BjIconComponent } from '@twentyninelab/bj-ui-library/ui/bj-icon';
import { PageComponent } from '../../../domains/_ui/components/page/page.component';
import { ExplanationWrapComponent } from '../../../domains/doc/components/explanationWrap/explanationWrap.doc.component';
import { CodeExampleComponent } from '../../../domains/doc/components/code-example/code-example.component';
import { TableDocComponent } from '../../../domains/doc/components/table/table.doc.component';
import { CardDocComponent } from '../../../domains/doc/components/card/card.doc.component';
import { codeExample } from '../../../domains/doc/models/highlights';
import { TableRow } from '../../../domains/doc/models/documentation';

@Component({
  selector: 'app-icon-page',
  imports: [
    BjIconComponent,
    PageComponent,
    ExplanationWrapComponent,
    CodeExampleComponent,
    TableDocComponent,
    CardDocComponent,
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  readonly docTableRow: TableRow[] = [
    {
      property: 'icon',
      type: 'string',
      default: '-',
      required: true,
      description: 'Icon classes, for example <code>fas fa-house</code>.',
    },
    {
      property: 'size',
      type: `'extra-small' | 'small' | 'default' | 'medium' | 'large' | 'extra-large'`,
      default: `'default'`,
      required: false,
      description: 'Icon size, from 12 to 32 pixels. The short forms <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code> and <code>xl</code> work too.',
    },
    {
      property: 'classes',
      type: 'string',
      default: `''`,
      required: false,
      description: 'Extra classes for the icon, for example a color.',
    },
  ];

  readonly overviewCode = codeExample(
    `<bj-icon icon="fas fa-house"></bj-icon>`,
    `<i aria-hidden="true" class="fas fa-house bj-ty-icon"></i>`,
  );

  readonly sizesCode = codeExample(
    `<bj-icon icon="fas fa-star" size="extra-small"></bj-icon>
<bj-icon icon="fas fa-star" size="small"></bj-icon>
<bj-icon icon="fas fa-star"></bj-icon>
<bj-icon icon="fas fa-star" size="medium"></bj-icon>
<bj-icon icon="fas fa-star" size="large"></bj-icon>
<bj-icon icon="fas fa-star" size="extra-large"></bj-icon>`,
    `<i aria-hidden="true" class="fas fa-star bj-ty-icon-xs"></i>
<i aria-hidden="true" class="fas fa-star bj-ty-icon-sm"></i>
<i aria-hidden="true" class="fas fa-star bj-ty-icon"></i>
<i aria-hidden="true" class="fas fa-star bj-ty-icon-md"></i>
<i aria-hidden="true" class="fas fa-star bj-ty-icon-lg"></i>
<i aria-hidden="true" class="fas fa-star bj-ty-icon-xl"></i>`,
  );

  readonly colorCode = codeExample(
    `<bj-icon icon="fas fa-heart" size="large" classes="bj-color-secondary-500"></bj-icon>`,
    `<i aria-hidden="true" class="fas fa-heart bj-color-secondary-500 bj-ty-icon-lg"></i>`,
  );

  readonly meaningCode = codeExample(
    `<span>
  <bj-icon icon="fas fa-lock"></bj-icon>
  <span class="u-v-hidden">Private document</span>
</span>`,
    `<span>
  <i aria-hidden="true" class="fas fa-lock bj-ty-icon"></i>
  <span class="u-v-hidden">Private document</span>
</span>`,
  );
}
