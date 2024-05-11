export interface HeaderModule {
  title: Title;
  hasAction: boolean;
  button?: Button;
}

interface Title {
  title: string;
  icon?: string;
}

interface Button {
  title: string;
  icon?: string;
}
