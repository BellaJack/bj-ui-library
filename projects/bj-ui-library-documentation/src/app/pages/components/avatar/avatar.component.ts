import { Component } from '@angular/core';
import { AvatarComponent } from '@twentyninelab/bj-ui-library/ui/bj-avatar';
import { PageComponent } from '../../../domains/_ui/components/page/page.component';
import { ExplanationWrapComponent } from '../../../domains/doc/components/explanationWrap/explanationWrap.doc.component';
import { CodeExampleComponent } from '../../../domains/doc/components/code-example/code-example.component';
import { TableDocComponent } from '../../../domains/doc/components/table/table.doc.component';
import { CardDocComponent } from '../../../domains/doc/components/card/card.doc.component';
import { codeExample } from '../../../domains/doc/models/highlights';
import { TableRow } from '../../../domains/doc/models/documentation';

@Component({
  selector: 'app-avatar-page',
  imports: [
    AvatarComponent,
    PageComponent,
    ExplanationWrapComponent,
    CodeExampleComponent,
    TableDocComponent,
    CardDocComponent,
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarPageComponent {
  readonly docTableRow: TableRow[] = [
    {
      property: 'userName',
      type: 'string',
      default: '-',
      required: true,
      description: 'Name of the person. The avatar shows its first two characters in uppercase.',
    },
    {
      property: 'size',
      type: `'small' | 'default' | 'large' | 'extra-large'`,
      default: `'default'`,
      required: false,
      description: 'Avatar size: 32, 40, 60 or 80 pixels.',
    },
    {
      property: 'shape',
      type: `'circle' | 'square'`,
      default: `'circle'`,
      required: false,
      description: 'Avatar shape.',
    },
  ];

  readonly overviewCode = codeExample(
    `<bj-avatar userName="Ada Lovelace" />`,
    `<!-- These styles live in the Angular component -->
<div class="bj-avatar">AD</div>`,
  );

  readonly sizesCode = codeExample(
    `<bj-avatar userName="Ada Lovelace" size="small" />
<bj-avatar userName="Ada Lovelace" />
<bj-avatar userName="Ada Lovelace" size="large" />
<bj-avatar userName="Ada Lovelace" size="extra-large" />`,
    `<!-- These styles live in the Angular component -->
<div class="bj-avatar bj-avatar--small">AD</div>
<div class="bj-avatar">AD</div>
<div class="bj-avatar bj-avatar--large">AD</div>
<div class="bj-avatar bj-avatar--extra-large">AD</div>`,
  );

  readonly shapeCode = codeExample(
    `<bj-avatar userName="Ada Lovelace" shape="square" />`,
    `<!-- These styles live in the Angular component -->
<div class="bj-avatar bj-avatar--square">AD</div>`,
  );

  readonly customCode = codeExample(
    `<bj-avatar
  userName="Ada Lovelace"
  style="--bj-avatar-background: var(--bj-color-secondary-800); --bj-avatar-color: var(--bj-color-white)"
/>`,
    `<!-- These styles live in the Angular component -->
<div
  class="bj-avatar"
  style="--bj-avatar-background: var(--bj-color-secondary-800); --bj-avatar-color: var(--bj-color-white)">
  AD
</div>`,
  );

  readonly withNameCode = codeExample(
    `<div class="bj-flex bj-gap-medium">
  <bj-avatar userName="Ada Lovelace" aria-hidden="true" />
  <span>Ada Lovelace</span>
</div>`,
    `<!-- These styles live in the Angular component -->
<div class="bj-flex bj-gap-medium">
  <div class="bj-avatar" aria-hidden="true">AD</div>
  <span>Ada Lovelace</span>
</div>`,
  );
}
