import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiRadius } from '@twentyninelab/bj-ui-library/models/ui';
import { UICommonService } from '@twentyninelab/bj-ui-library/services/ui';

export enum BadgeSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL = 'full'
}

@Component({
  selector: 'bj-badge',
  imports: [CommonModule],
  templateUrl: './bj-badge.component.html',
  styleUrls: ['./bj-badge.component.scss']
})
export class BjBadgeComponent {
  readonly backgroundColor = input<string>('bj-bg-gray-300');
  readonly classes = input<string>('');
  readonly contentClass = input<string>('');
  readonly iconPosition = input<'left' | 'right'>('left');
  readonly radius = input<UiRadius>('small');
  readonly size = input<BadgeSize | string>('');
  readonly style = input<string>('');
  readonly variant = input<string>('');

  constructor(private readonly uiCommonService: UICommonService) { }

  getBadgeClass(additionalClasses: string = ''): string {
    const classArray = [
      additionalClasses,
      this.getStyleClass(),
      this.getRadiusClass(),
      this.getVariantClass(),
      this.getBackgroundClass(),
      this.getContentClass(),
      this.getSizeClass(),
      this.getIconPositionClass()
    ].filter(Boolean);

    return classArray.join(' ').trim();
  }

  getBadgeStyle(): string | null {
    const style = this.style();
    return style !== '' ? style : null;
  }

  private getStyleClass(): string {
    return this.classes() || '';
  }

  private getRadiusClass(): string {
    return this.uiCommonService.getRadiusClass(this.radius());
  }

  private getVariantClass(): string {
    const variant = this.variant();
    return variant ? ` bj-badge--${variant}` : '';
  }

  private getBackgroundClass(): string {
    return this.backgroundColor() || '';
  }

  private getIconPositionClass(): string {
    return this.iconPosition() === 'right' ? 'bj-badge--icon-right' : '';
  }

  private getContentClass(): string {
    return this.contentClass() || '';
  }

  private getSizeClass(): string {
    const size = this.size();
    if (size === BadgeSize.FULL) {
      return 'u-w-full bj-justify-center';
    }

    return size ? ` bj-badge--${size}` : '';
  }

  // Getter for template usage
  get badgeClasses(): string {
    return this.getBadgeClass();
  }
}
