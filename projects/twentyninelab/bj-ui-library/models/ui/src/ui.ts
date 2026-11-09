export type UiSize =
  | 'extra-small'
  | 'xs'
  | 'small'
  | 'sm'
  | 'medium'
  | 'md'
  | 'large'
  | 'lg'
  | 'extra-large'
  | 'xl'
  | 'default';

export type UiRadius =
  | 'default'
  | 'small'
  | 'medium'
  | 'large'
  | 'pills'
  | 'all'
  | 'none';

export type UiBjType =
  | 'alarm'
  | 'default'
  | 'error'
  | 'gray'
  | 'gray-dark'
  | 'gray-light'
  | 'primary'
  | 'primary-dark'
  | 'primary-light'
  | 'success'
  | 'warning';

export type UiIconPosition = 'left' | 'right';
export type UiIconColor = UiBjType;
export type UiIconSize = UiSize;
export type UiIconSquareSize = 'square-small' | 'square-default';

export type UiBadgePosition = 'left' | 'right';

export type UiButtonVariant = 'solid' | 'outline' | 'text';
export type UiButtonSeverity = 'primary' | 'secondary' | 'contrast' | 'danger';
export type UiButtonType = 'button' | 'submit' | 'reset';
