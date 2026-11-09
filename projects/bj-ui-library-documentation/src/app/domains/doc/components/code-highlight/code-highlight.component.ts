import { Component, Input, signal } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { CodeToShow } from '../../models/highlights';

@Component({
  selector: 'bj-doc-code-highlight',
  templateUrl: './code-highlight.component.html',
  styleUrls: ['./code-highlight.component.scss'],
  imports: [HighlightModule]
})

export class CodeHighlightComponent {
  private static nextId = 0;

  @Input() codesToShow:CodeToShow[] = [];
  @Input() id:string = `code-highlight-${CodeHighlightComponent.nextId++}`;

  readonly selectedTab = signal(0);
  readonly copySuccess = signal(false);

  onTabKeydown(event:KeyboardEvent, index:number) {
    const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;

    if (!direction) {
      return;
    }

    const next = (index + direction + this.codesToShow.length) % this.codesToShow.length;

    event.preventDefault();
    this.selectedTab.set(next);
    ((event.currentTarget as HTMLElement).parentElement?.children[next] as HTMLElement).focus();
  }

  copyToClipboard(code:string) {
    navigator.clipboard.writeText(code);
    this.copySuccess.set(true);

    setTimeout(() => {
      this.copySuccess.set(false);
    }, 2000);
  }

}
