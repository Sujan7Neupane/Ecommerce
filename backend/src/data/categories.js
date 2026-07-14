import mongoose from "mongoose";

export const electronicsCategoryId = new mongoose.Types.ObjectId();
export const fashionCategoryId = new mongoose.Types.ObjectId();
export const homeCategoryId = new mongoose.Types.ObjectId();
export const beautyCategoryId = new mongoose.Types.ObjectId();
export const sportsCategoryId = new mongoose.Types.ObjectId();
export const booksCategoryId = new mongoose.Types.ObjectId();
export const toysCategoryId = new mongoose.Types.ObjectId();
export const healthCategoryId = new mongoose.Types.ObjectId();
export const groceriesCategoryId = new mongoose.Types.ObjectId();
export const accessoriesCategoryId = new mongoose.Types.ObjectId();

export const categories = [
  {
    _id: electronicsCategoryId,
    name: "Electronics",
    slug: "electronics",
  },
  {
    _id: fashionCategoryId,
    name: "Fashion",
    slug: "fashion",
  },
  {
    _id: homeCategoryId,
    name: "Home & Kitchen",
    slug: "home-kitchen",
  },
  {
    _id: beautyCategoryId,
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
  },
  {
    _id: sportsCategoryId,
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
  },
  {
    _id: booksCategoryId,
    name: "Books",
    slug: "books",
  },
  {
    _id: toysCategoryId,
    name: "Toys & Games",
    slug: "toys-games",
  },
  {
    _id: healthCategoryId,
    name: "Health",
    slug: "health",
  },
  {
    _id: groceriesCategoryId,
    name: "Groceries",
    slug: "groceries",
  },
  {
    _id: accessoriesCategoryId,
    name: "Accessories",
    slug: "accessories",
  },
];
