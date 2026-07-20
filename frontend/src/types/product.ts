export interface Review {
  rating: number;
  comment: string;
  user: string;
}

export interface Product {
  _id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  discountPrice: number;
  countInStock: number;
  image: string;
  imagePublicId: string;
  averageRating: number;
  numReviews: number;
  reviews: Review[];
  createdBy: string;
}
