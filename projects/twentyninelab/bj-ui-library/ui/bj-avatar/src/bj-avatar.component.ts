import { Component, computed, input } from "@angular/core";
import { CommonModule } from "@angular/common";

export type AvatarSize = 'small' | 'default' | 'large' | 'extra-large';
export type AvatarShape = 'circle' | 'square';

@Component({
  selector: 'bj-avatar',
  imports: [CommonModule],
  templateUrl: './bj-avatar.component.html',
  styleUrls: ['./bj-avatar.component.scss'],
  host: {
    class: 'bj-avatar',
    '[class]': 'avatarClasses()',
  }
})
export class AvatarComponent {
  readonly userName = input.required<string>();
  readonly size = input<AvatarSize>('default');
  readonly shape = input<AvatarShape>('circle');

  protected readonly userNameInitials = computed(() => this.userName().trim().substring(0, 2))

  protected readonly avatarClasses = computed(() => ({
    'bj-avatar--square': this.shape() === 'square',
    'bj-avatar--small': this.size() === 'small',
    'bj-avatar--large': this.size() === 'large',
    'bj-avatar--extra-large': this.size() === 'extra-large'
  }));
}
