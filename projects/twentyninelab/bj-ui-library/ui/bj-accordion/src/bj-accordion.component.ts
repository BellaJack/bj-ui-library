import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bj-accordion',
  imports: [CommonModule],
  templateUrl: './bj-accordion.component.html',
  styleUrls: ['./bj-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BjAccordionComponent {
  accordionContent = viewChild<ElementRef>('accordionContent');

  readonly disabled = input<boolean>(false);
  readonly open = model<boolean | undefined>(undefined);
  readonly id = input.required<string>();
  readonly classes = input<string>('');
  readonly buttonClasses = input<string>(
    'bj-flex bj-gap-small',
  );
  readonly buttonLabel = input<string>('Toggle accordion');
  readonly contentClasses = input<string>('u-pt-sm');

  readonly statusChanges = output<boolean>();

  protected readonly contentHeight = signal<number>(0);

  constructor() {
    effect(() => {
      const open = this.open();
      if (open === undefined) {
        return;
      }

      if (this.open()) {
        const accordionContentEl = this.accordionContent()?.nativeElement;
        this.contentHeight.set(accordionContentEl?.scrollHeight || 0);
        this.statusChanges.emit(true);
      } else {
        this.open.set(false);
        this.contentHeight.set(0);
        this.statusChanges.emit(false);
      }
    });
  }

  openAccordion() {
     this.open.set(true);
  }

  closeAccordion() {
     this.open.set(false);
  }

  toggleAccordion() {
    this.open.update((open) => !open);
  }

  updateHeight() {
    const accordionContentEl = this.accordionContent()?.nativeElement;
    this.contentHeight.set(accordionContentEl?.scrollHeight || 0);
  }
}
