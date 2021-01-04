type IntlKey = keyof typeof allContents;

type LocalesData = { [key: string]: { [key: string]: string } };

interface Intl {
  get(key: IntlKey, variables?: any): string;
  getHTML(key: IntlKey, value?: any): string;
}
