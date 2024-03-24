import {Types } from 'mongoose';

interface Dimensions {
  width: number;
  depth: number;
  height: number;
}

export interface Project {
  title: string;
  location?: string;
  imageUrl: string;
  businessType?: string;
  dimensions: Dimensions;
  doorType: string;
  foundation: string;
  roof: string;
  insulation: string;
  floor: string;
  facade: string;
  electricity?: string;
  price: number;
  photo: string;
  adminName: string;
  productionTime?: number;
  inStock?: boolean;
}
