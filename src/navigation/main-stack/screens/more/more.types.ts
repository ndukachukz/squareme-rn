export interface SectionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconContainerBg?: string;
}

export interface Section {
  title: string;
  items: SectionItem[];
}
