import { Component, OnInit, input, inject } from "@angular/core";
import { UiIconSize } from "@twentyninelab/bj-ui-library/models/ui";
import { UICommonService } from "@twentyninelab/bj-ui-library/services/ui";

@Component({
    selector: 'bj-icon',
    imports: [],
    templateUrl: './bj-icon.component.html',
    styleUrls: ['./bj-icon.component.scss'],
})

export class BjIconComponent implements OnInit {
    private uiCommonService = inject(UICommonService);

    icon = input.required<string>();
    classes = input<string>('');
    size = input<UiIconSize>('default');

    ngOnInit(): void {}

    getIconClass(additionalClasses: string = ''): string {
        const classArray = [
        additionalClasses,
        this.getIcon(),
        this.getStyleClass(),
        this.getSizeClass()
        ].filter(Boolean);

        return classArray.join(' ').trim();
    }

    private getIcon(): string {
        return this.icon() || '';
    }

    private getStyleClass(): string {
        return this.classes() || '';
    }

    private getSizeClass(): string {
        if (this.size() === 'default') return 'bj-ty-icon';

        return `bj-ty-icon-${this.uiCommonService.getSizeAbbreviation(this.size())}`;
    }
}
