export interface Color {
  hex: string;
  code?: number;
  name: string;
  class: string;
  oklch: string;
  variable: string;
}

export interface BackgroundColor {
  name: string;
  class: string;
  backgroundVariable: string;
  foregroundVariable: string;
}