import { Component, input } from '@angular/core';
import { BjBadgeComponent } from '@twentyninelab/bj-ui-library/ui/bj-badge';

import { SideMenuComponent } from '../side-menu/side-menu.component';
import { SideMenuAccordionComponent } from '../side-menu-accordion/side-menu-accordion.component';

@Component({
    selector: 'bj-doc-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    imports: [
      BjBadgeComponent,
      SideMenuComponent,
      SideMenuAccordionComponent
    ]
})
export class PageComponent {
  title = input.required<string>();
  infoVersion = input<string>('');
}
