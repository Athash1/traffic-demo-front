export interface RailwayTitle {
  ja: string;
  en: string;
  [key: string]: string;
}

export interface Railway {
  id: string;
  '@type': string;
  'dc:date': string;
  '@context': string;
  'dc:title': string;
  'owl:sameAs': string;
  'odpt:operator': string;
  'odpt:railwayTitle': RailwayTitle;
}