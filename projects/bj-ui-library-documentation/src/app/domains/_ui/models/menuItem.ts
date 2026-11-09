export interface MenuItem {
  id: string;
  text: string;
  element: HTMLElement;
  level: 2 | 3;
  children?: MenuItem[];
}
