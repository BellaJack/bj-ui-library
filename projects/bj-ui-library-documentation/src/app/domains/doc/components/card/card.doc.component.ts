import { Component, Input } from '@angular/core';
import { ExplanationWrapComponent } from '../explanationWrap/explanationWrap.doc.component';
import { UiRadius } from '@twentyninelab/bj-ui-library/models/ui';
import { UICommonService } from '@twentyninelab/bj-ui-library/services/ui';

@Component({
  selector: 'bj-doc-card',
  imports: [ExplanationWrapComponent],
  templateUrl: './card.doc.component.html',
  styleUrl: './card.doc.component.scss'
})
export class CardDocComponent {
  @Input() title: string = 'Overview';
  @Input() titleLevel: 1 | 2 | 3 | 4 = 2;
  @Input() marginClass: string = 'u-mb-sm';
  @Input() marginContentClass: string = 'u-mb-md';
  @Input() backgroundClass: string = 'bj-bg-gray-200';
  @Input() paddingClass: string = 'u-pa-sm';
  @Input() radiusClass: UiRadius = 'medium';

  constructor(private readonly uiCommonService: UICommonService) { }

  getCardClass(additionalClasses: string = ''): string {
    const classArray = [
      additionalClasses,
      this.getBackgroundClass(),
      this.getPaddingClass(),
      this.getRadiusClass()
    ].filter(Boolean);

    return classArray.join(' ').trim();
  }

  getBackgroundClass(): string {
    return this.backgroundClass || '';
  }

  getPaddingClass(): string {
    return this.paddingClass || '';
  }

  getRadiusClass(): string {
    return this.uiCommonService.getRadiusClass(this.radiusClass);
  }
}
