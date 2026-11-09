import { afterNextRender, Component, inject, OnDestroy, signal } from '@angular/core';
import { BjAccordionComponent } from '@twentyninelab/bj-ui-library/ui/bj-accordion';
import { MenuItem } from '../../models/menuItem';
import { UiService } from '../../services/ui';

@Component({
  selector: 'bj-doc-side-menu-accordion',
  imports: [BjAccordionComponent],
  templateUrl: './side-menu-accordion.component.html',
  styleUrls: ['./side-menu-accordion.component.scss']
})
export class SideMenuAccordionComponent implements OnDestroy {
  protected readonly _uiService = inject(UiService)

  readonly menuItems = signal<MenuItem[]>([]);
  private scrollListener?: () => void;

  constructor() {
    // Browser only: headings are read from the rendered page
    afterNextRender(() => {
      this.menuItems.set(this._uiService.extractHeadings());
      this.scrollListener = () => this._uiService.updateActiveItem(this.menuItems());
      window.addEventListener('scroll', this.scrollListener, { passive: true });
      this._uiService.updateActiveItem(this.menuItems());
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  scrollToSection(id: string, event: Event): void {
    this._uiService.scrollToSection(id, event);
  }
}
