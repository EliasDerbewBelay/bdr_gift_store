export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  description: string;
  rating?: number;
  reviews?: number;
  sku?: string;
  tags?: string[];
  inStock?: boolean;
  deliveryInfo?: string;
  features?: string[];
  images?: string[];
}
