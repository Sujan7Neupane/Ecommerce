import {
  electronicsCategoryId,
  fashionCategoryId,
  homeCategoryId,
} from "./categories.js";

export const products = [
  {
    name: "iPhone 15 Pro",
    description:
      "Apple iPhone 15 Pro with A17 Pro chip, 128GB storage, and advanced camera system.",
    category: electronicsCategoryId,
    brand: "Apple",
    price: 1499,
    discountPrice: 1399,
    countInStock: 15,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
    imagePublicId: "seed/iphone15pro",
  },
  {
    name: "Samsung Galaxy S25",
    description:
      "Latest Samsung flagship smartphone with AMOLED display and powerful processor.",
    category: electronicsCategoryId,
    brand: "Samsung",
    price: 1299,
    discountPrice: 1199,
    countInStock: 20,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    imagePublicId: "seed/galaxys25",
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading wireless noise-cancelling headphones with premium sound.",
    category: electronicsCategoryId,
    brand: "Sony",
    price: 499,
    discountPrice: 449,
    countInStock: 30,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    imagePublicId: "seed/sony-xm5",
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable lifestyle sneakers with breathable mesh upper.",
    category: fashionCategoryId,
    brand: "Nike",
    price: 180,
    discountPrice: 150,
    countInStock: 40,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    imagePublicId: "seed/nike-airmax270",
  },
  {
    name: "Levi's 511 Slim Jeans",
    description: "Classic slim-fit denim jeans made with stretch fabric.",
    category: fashionCategoryId,
    brand: "Levi's",
    price: 90,
    discountPrice: 75,
    countInStock: 50,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    imagePublicId: "seed/levis511",
  },
  {
    name: "Dyson V15 Detect Vacuum",
    description:
      "Cordless vacuum cleaner with laser dust detection and powerful suction.",
    category: homeCategoryId,
    brand: "Dyson",
    price: 899,
    discountPrice: 799,
    countInStock: 10,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    imagePublicId: "seed/dyson-v15",
  },
];
