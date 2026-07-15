export interface SubService {
  title: string;
  description: string;
  features: string[];
}

export interface Service {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  subServices?: SubService[];
}