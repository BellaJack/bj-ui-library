import { afterNextRender, Component, inject, OnDestroy, signal } from '@angular/core';
import { MenuItem } from '../../models/menuItem';
import { UiService } from '../../services/ui';

@Component({
  selector: 'bj-doc-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnDestroy {
  private readonly _uiService = inject(UiService);

  readonly menuItems = signal<MenuItem[]>([]);
  readonly activeItemId = signal<string | null>(null);
  private scrollListener?: () => void;

  constructor() {
    // Browser only: headings are read from the rendered page
    afterNextRender(() => {
      this.menuItems.set(this._uiService.extractHeadings());
      this.scrollListener = () => this.updateActiveItem();
      window.addEventListener('scroll', this.scrollListener, { passive: true });
      this.updateActiveItem();
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private updateActiveItem(): void {
    const scrollPosition = window.scrollY + 100; // Offset for better UX
    const allItems = this._uiService.getAllItems(this.menuItems());
    const current = [...allItems].reverse().find((item) => item.element.offsetTop <= scrollPosition);

    this.activeItemId.set(current?.id ?? allItems[0]?.id ?? null);
  }

  scrollToSection(id: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      const offset = 6 * 16; // Offset for the fixed header (6rem)

      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
      this.activeItemId.set(id);
    }
  }
}
