import { Component, inject, OnDestroy, Renderer2, signal } from '@angular/core';
import { RouterOutlet, Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from '@twentyninelab/bj-ui-library/services/layout';
import { Header } from './domains/_layout/components/header/header';
import { Footer } from './domains/_layout/components/footer/footer';
import { Sidebar } from './domains/_layout/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule, Footer, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnDestroy {

  overlayMenuOpenSubscription: Subscription;
  menuOutsideClickListener: (() => void) | null = null;

  protected readonly title = signal('trailibox-frontend');
  private readonly _layoutService = inject(LayoutService)
  private readonly _renderer = inject(Renderer2)
  private readonly _router = inject(Router)

  constructor() {
    this.overlayMenuOpenSubscription = this._layoutService.overlayOpen$.subscribe({
      next: () => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this._renderer.listen('document', 'click', (event) => {
            if (this.isOutsideClicked(event)) {
              this.hideMenu();
            }
          });
        }

        if (this._layoutService.layoutState().staticMenuMobileActive) {
          this.toggleBlockBodyScroll(true);
        }

        this._router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe(() => {
            this.hideMenu();
          });
      },
      error: (err:any) => {
        console.error('Error receiving overlay menu open event:', err);
      }
    });
  }

  isOutsideClicked(event: MouseEvent) {
    const sidebarEl = document.querySelector('.bj-layout-sidebar');
    const topbarEl = document.querySelector('[bj-ctrl="bj-layout-menu-button"]');
    const eventTarget = event.target as Node;

    return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
  }

  hideMenu() {
    this._layoutService.layoutState.update((prev) => ({
      ...prev,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false
    }));

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }

    this.toggleBlockBodyScroll(false);
  }

  toggleBlockBodyScroll(shouldBlock: boolean) {
    if (shouldBlock) {
      this.blockBodyScroll();
    } else {
      this.unblockBodyScroll();
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('bj-blocked-scroll');
    } else {
      document.body.className += ' bj-blocked-scroll';
    }
  }

  unblockBodyScroll() {
    if (document.body.classList) {
      document.body.classList.remove('bj-blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'bj-blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }

  get containerClass() {
    return {
      'bj-layout-overlay': this._layoutService.layoutConfig().menuMode === 'overlay',
      'bj-layout-static': this._layoutService.layoutConfig().menuMode === 'static',
      'bj-layout-static-inactive': this._layoutService.layoutState().staticMenuDesktopInactive && this._layoutService.layoutConfig().menuMode === 'static',
      'bj-layout-overlay-active': this._layoutService.layoutState().overlayMenuActive,
      'bj-layout-mobile-active': this._layoutService.layoutState().staticMenuMobileActive
    };
  }
}
