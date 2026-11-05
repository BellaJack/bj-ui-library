import { Component, inject, OnDestroy, OnInit, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LayoutService } from '@twentyninelab/bj-ui-library/services/layout';

@Component({
  selector: 'bj-layout-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header implements OnInit, OnDestroy {
  protected readonly _layoutService = inject(LayoutService)
  private readonly _router = inject(Router)

  mainMenuButton = viewChild<ElementRef | undefined>('mainMenuButton')
  menuLabel = 'Open Menu';
  menuOpened: boolean = false;
  visibleRight: boolean = false;
  overlayMenuOpenSubscription: any;

  ngOnInit() {
    this.menuOpened = (!this._layoutService.layoutState().staticMenuDesktopInactive || this._layoutService.layoutState().staticMenuMobileActive) || false;

    this.overlayMenuOpenSubscription = this._layoutService.mainMenuOpen$.subscribe({
      next: (res) => {
        this.menuOpened = res;

        if (!res) {
          this.focusMenuButton();
        }
      },
      error: (err:any) => {
        console.error('Error receiving overlay menu open event:', err);
      }
    });
  }

  ngOnDestroy() {
    this.overlayMenuOpenSubscription?.unsubscribe();
  }

  toggleDarkMode(): void {
    this._layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }

  toggleSettingsMenu(): void {
    this.visibleRight = !this.visibleRight;
    // Placeholder for future settings menu toggle functionality
  }

  onMenuToggle(): void {
    this._layoutService.onMenuToggle();
  }

  focusMenuButton() {
    const btn = this.mainMenuButton()?.nativeElement;
    btn?.focus();
  }
}
