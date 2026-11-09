import { Component, Input } from '@angular/core';

import { CodeHighlightComponent } from '../code-highlight/code-highlight.component';
import { CodeToShow } from '../../models/highlights';

@Component({
  selector: 'bj-doc-code-example',
  imports: [
    CodeHighlightComponent
],
  templateUrl: './code-example.component.html',
  styleUrl: './code-example.component.scss'
})
export class CodeExampleComponent {
  @Input() code: CodeToShow[] = [{ code: '', language: 'html' }];
}
