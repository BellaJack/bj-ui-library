import { Component, ElementRef, ViewChild, OnDestroy, inject } from '@angular/core';
import { LayoutService } from '@twentyninelab/bj-ui-library/services/layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bj-layout-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnDestroy {
  private readonly _layoutService = inject(LayoutService)

  @ViewChild('mainMenuFocusAnchor') mainMenuFocusAnchor: ElementRef | undefined;
  overlayMenuOpenSubscription: any;

  constructor() {
    this.overlayMenuOpenSubscription = this._layoutService.mainMenuOpen$.subscribe({
      next: (res) => {
        if (res && this.mainMenuFocusAnchor?.nativeElement) {
          this.mainMenuFocusAnchor?.nativeElement.focus();
        }
      },
      error: (err: any) => {
        console.error('Error receiving overlay menu open event:', err);
      }
    });
  }

  ngOnDestroy() {
    this.overlayMenuOpenSubscription?.unsubscribe();
  }

  onCloseSidebar() {
    this._layoutService.onMenuToggle();
  }
}
