import { HtmlParser } from '@angular/compiler';

interface Dimensions {
  width: number | null;
  depth: number | null;
  height: number | null;
}

export interface Project {
  _id: string;
  title: string;
  location?: string;
  imageUrls: string[];
  businessType?: string;
  dimensions: Dimensions;
  doorType: string;
  foundation: string;
  roof: string;
  insulation: string;
  floor: string;
  facade: string;
  electricity?: string;
  additionalFeatures?: string[];
  price: number;
  photo: string;
  adminName: string;
  productionTime?: number;
  htmlContent: string;
  inStock?: boolean;
}
