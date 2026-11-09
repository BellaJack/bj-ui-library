export interface CodeToShow {
  code: string;
  language: string;
  label?:string;
}

/** The two tabs of an example: Angular and the plain HTML equivalent. */
export const codeExample = (angular: string, html: string): CodeToShow[] => [
  { code: angular, language: 'html', label: 'Angular' },
  { code: html, language: 'html' },
];
