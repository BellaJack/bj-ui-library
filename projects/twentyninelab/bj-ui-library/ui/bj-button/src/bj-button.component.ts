import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import {
  UiBadgePosition,
  UiButtonSeverity,
  UiButtonType,
  UiButtonVariant,
  UiIconPosition,
} from '@twentyninelab/bj-ui-library/models/ui';
import { BjIconComponent } from '@twentyninelab/bj-ui-library/ui/bj-icon';

/**
 * `<bj-button>` renders a native button, `<a bjButton>` styles the anchor itself:
 * both share the same inputs and content.
 */
@Component({
  selector: 'bj-button, a[bjButton]',
  imports: [BjIconComponent, NgTemplateOutlet],
  templateUrl: './bj-button.component.html',
  styleUrls: ['./bj-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-disabled]': "isLink && isDisabled() ? 'true' : null",
    '[attr.tabindex]': 'isLink && isDisabled() ? -1 : null',
  },
})
export class BjButtonComponent {
  protected readonly isLink =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName.toLowerCase() === 'a';

  readonly variant = input<UiButtonVariant>('solid');
  readonly severity = input<UiButtonSeverity>('primary');
  /** Native button type. Ignored on links. */
  readonly type = input<UiButtonType>('button');
  readonly isDisabled = input(false, { transform: booleanAttribute });

  /** Icon classes, e.g. `fas fa-floppy-disk`. */
  readonly icon = input<string>('');
  readonly iconPosition = input<UiIconPosition>('left');
  /** Hides the projected text through `u-v-hidden`. Ignored when there is no icon to show. */
  readonly isIconOnly = input(false, { transform: booleanAttribute });

  readonly badge = input<string | number | null>(null);
  readonly badgePosition = input<UiBadgePosition>('right');

  /** Replaces the projected text for assistive technology, which no longer reads it. */
  readonly ariaLabel = input<string>('');
  /** Extra classes for the element that looks like a button. */
  readonly classes = input<string>('');

  protected readonly isTextHidden = computed(() => this.isIconOnly() && !!this.icon());

  /** `0` is a valid badge value, so only empty values hide it. */
  protected readonly hasBadge = computed(() => {
    const badge = this.badge();
    return badge !== null && badge !== '';
  });

  protected readonly buttonClasses = computed(() =>
    [
      'bj-btn',
      `bj-btn-${this.variant()}`,
      `bj-btn-${this.severity()}`,
      this.isTextHidden() ? 'bj-btn-icon' : '',
      this.classes(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly hostClasses = computed(() => {
    if (this.isLink) {
      return this.buttonClasses();
    }

    return this.isDisabled() ? 'bj-button bj-button--disabled' : 'bj-button';
  });
}
