import { Component, Input } from '@angular/core';


@Component({
  selector: 'bj-doc-explanation-wrap',
  imports: [],
  templateUrl: './explanationWrap.doc.component.html',
  styleUrl: './explanationWrap.doc.component.scss'
})
export class ExplanationWrapComponent {
  @Input() title: string = 'Overview';
  @Input() titleLevel: 1 | 2 | 3 | 4 = 2;
  @Input() marginClass: string = 'u-mb-sm';
  @Input() marginContentClass: string = 'u-mb-md';
}
