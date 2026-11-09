import { Component, OnInit, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BjIconComponent } from "@twentyninelab/bj-ui-library/ui/bj-icon";
import { UiIconColor, UiIconSize } from "@twentyninelab/bj-ui-library/models/ui";
import { UICommonService } from "@twentyninelab/bj-ui-library/services/ui";

export type BjIconRoundSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'default';

@Component({
    selector: 'bj-icon-round',
    imports: [CommonModule, BjIconComponent],
    templateUrl: './bj-icon-round.component.html',
    styleUrls: ['./bj-icon-round.component.scss'],
})

export class BjIconRoundComponent implements OnInit {

    icon = input<string>('');
    classes = input<string>('');
    size = input<BjIconRoundSize>('default');
    color = input<UiIconColor>('default');
    style = input<string>('');

    constructor(private uiCommonService: UICommonService) {}

    ngOnInit(): void {}

    getIconClass(additionalClasses: string = ''): string {
        const classArray = [
        additionalClasses,
        this.getStyleClass(),
        this.getSizeClass(),
        this.getColorClass()
        ].filter(Boolean);

        return classArray.join(' ').trim();
    }

    getIconSize(): UiIconSize {
        if (this.size() === 'small') {
            return 'extra-small';
        }

        return this.size();
    }

    getIconStyle(): string | null {
        return this.style() !== '' ? this.style() : null;
    }

    private getStyleClass(): string {
        return this.classes() || '';
    }

    private getColorClass(): string {
        return this.uiCommonService.getBackgroundClassByType(this.color());
    }

    private getSizeClass(): string {
        switch (this.size()) {
            case 'extra-small':
                return 'bj-round-icon--xs';
            case 'small':
                return 'bj-round-icon--sm';
            case 'medium':
                return 'bj-round-icon--md';
            case 'large':
                return 'bj-round-icon--lg';
            case 'extra-large':
                return 'bj-round-icon--xl';
            default:
                return '';
        }
    }
}
