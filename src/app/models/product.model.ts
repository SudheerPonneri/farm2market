export interface Product {
  id: string;
  farmerId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}