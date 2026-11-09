import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiButtonSeverity, UiButtonVariant } from '@twentyninelab/bj-ui-library/models/ui';
import { BjButtonComponent } from './bj-button.component';

@Component({
  imports: [BjButtonComponent],
  template: `
    <bj-button
      [variant]="variant()"
      [severity]="severity()"
      [isDisabled]="isDisabled()"
      [icon]="icon()"
      [iconPosition]="iconPosition()"
      [isIconOnly]="isIconOnly()"
      [badge]="badge()"
      [badgePosition]="badgePosition()"
      [ariaLabel]="ariaLabel()"
      [classes]="classes()"
    >
      Save
    </bj-button>
  `,
})
class ButtonHostComponent {
  readonly variant = signal<UiButtonVariant>('solid');
  readonly severity = signal<UiButtonSeverity>('primary');
  readonly isDisabled = signal(false);
  readonly icon = signal('');
  readonly iconPosition = signal<'left' | 'right'>('left');
  readonly isIconOnly = signal(false);
  readonly badge = signal<string | number | null>(null);
  readonly badgePosition = signal<'left' | 'right'>('right');
  readonly ariaLabel = signal('');
  readonly classes = signal('');
}

@Component({
  imports: [BjButtonComponent],
  template: `
    <a
      bjButton
      href="/docs"
      variant="outline"
      severity="danger"
      icon="fas fa-link"
      [isDisabled]="isDisabled()"
    >
      Docs
    </a>
  `,
})
class LinkHostComponent {
  readonly isDisabled = signal(false);
}

describe('BjButtonComponent', () => {
  describe('as <bj-button>', () => {
    let fixture: ComponentFixture<ButtonHostComponent>;
    let host: ButtonHostComponent;

    const button = () => fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const textSpan = () =>
      Array.from(button().querySelectorAll('span')).find((el) =>
        el.textContent?.includes('Save'),
      ) as HTMLSpanElement;
    const contentOrder = () =>
      Array.from(button().children).map((el) =>
        el.tagName === 'BJ-ICON'
          ? 'icon'
          : el.classList.contains('bj-btn-badge')
            ? 'badge'
            : 'text',
      );

    beforeEach(async () => {
      fixture = TestBed.createComponent(ButtonHostComponent);
      host = fixture.componentInstance;
      await fixture.whenStable();
    });

    it('projects the text into a native button that does not submit forms by default', () => {
      expect(button().type).toBe('button');
      expect(button().textContent?.trim()).toBe('Save');
    });

    for (const variant of ['solid', 'outline', 'text'] as const) {
      for (const severity of ['primary', 'secondary', 'contrast', 'danger'] as const) {
        it(`composes the classes of ${variant}/${severity}`, async () => {
          host.variant.set(variant);
          host.severity.set(severity);
          await fixture.whenStable();

          expect(new Set(button().classList)).toEqual(
            new Set(['bj-btn', `bj-btn-${variant}`, `bj-btn-${severity}`]),
          );
        });
      }
    }

    it('adds custom classes to the visible button', async () => {
      host.classes.set('u-w-full');
      await fixture.whenStable();

      expect(button().classList).toContain('u-w-full');
    });

    it('places icon and badge on the requested sides', async () => {
      host.icon.set('fas fa-floppy-disk');
      host.badge.set(3);
      await fixture.whenStable();
      expect(contentOrder()).toEqual(['icon', 'text', 'badge']);

      host.iconPosition.set('right');
      host.badgePosition.set('left');
      await fixture.whenStable();
      expect(contentOrder()).toEqual(['badge', 'text', 'icon']);
    });

    it('keeps the text available to assistive technology in icon-only mode', async () => {
      host.icon.set('fas fa-floppy-disk');
      host.isIconOnly.set(true);
      await fixture.whenStable();

      expect(textSpan().classList).toContain('u-v-hidden');
      expect(textSpan().hasAttribute('aria-hidden')).toBe(false);
      expect(button().classList).toContain('bj-btn-icon');
    });

    it('keeps the text visible when icon-only is set without an icon', async () => {
      host.isIconOnly.set(true);
      await fixture.whenStable();

      expect(button().querySelector('.u-v-hidden')).toBeNull();
      expect(button().classList).not.toContain('bj-btn-icon');
    });

    it('announces only ariaLabel when it is set', async () => {
      expect(button().querySelector('.u-v-hidden')).toBeNull();

      host.ariaLabel.set('Save the document');
      await fixture.whenStable();

      expect(button().querySelector('.u-v-hidden')?.textContent).toBe('Save the document');
      expect(textSpan().getAttribute('aria-hidden')).toBe('true');
    });

    it('renders a badge with value 0 but not an empty one', async () => {
      host.badge.set(0);
      await fixture.whenStable();
      expect(button().querySelector('.bj-btn-badge')?.textContent).toBe('0');

      host.badge.set('');
      await fixture.whenStable();
      expect(button().querySelector('.bj-btn-badge')).toBeNull();
    });

    it('disables the native button and marks the host', async () => {
      host.isDisabled.set(true);
      await fixture.whenStable();

      expect(button().disabled).toBe(true);
      expect(fixture.nativeElement.querySelector('bj-button').classList).toContain(
        'bj-button--disabled',
      );
    });
  });

  describe('as <a bjButton>', () => {
    let fixture: ComponentFixture<LinkHostComponent>;

    const link = () => fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(LinkHostComponent);
      await fixture.whenStable();
    });

    it('styles the anchor itself, without a nested button', () => {
      expect(link().querySelector('button')).toBeNull();
      expect(link().classList).toContain('bj-btn');
      expect(link().classList).toContain('bj-btn-outline');
      expect(link().classList).toContain('bj-btn-danger');
      expect(link().classList).not.toContain('bj-button');
      expect(link().querySelector('bj-icon')).not.toBeNull();
      expect(link().textContent?.trim()).toBe('Docs');
    });

    it('takes a disabled link out of the keyboard flow', async () => {
      expect(link().hasAttribute('aria-disabled')).toBe(false);
      expect(link().hasAttribute('tabindex')).toBe(false);

      fixture.componentInstance.isDisabled.set(true);
      await fixture.whenStable();

      expect(link().getAttribute('aria-disabled')).toBe('true');
      expect(link().getAttribute('tabindex')).toBe('-1');
    });
  });
});
