import slugify from "slugify";

import { products } from "./src/data/products.js";
import { connectDB } from "./src/db/dbConnection.js";
import { Product } from "./src/models/product.models.js";
import { Category } from "./src/models/category.models.js";
import { User } from "./src/models/user.models.js";
import { Order } from "./src/models/order.models.js";
import { categories } from "./src/data/categories.js";
import { users } from "./src/data/users.js";

async function loadData() {
  await connectDB();

  // Delete all old data
  await Product.deleteMany();
  await Category.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();

  // Add from dummy data
  const newUsers = await User.insertMany(users);
  await Category.insertMany(categories);

  // Get the admin user id
  const adminId = newUsers[0]._id;

  // Add product with extra field slug and createdBy
  const newProducts = products.map((product) => ({
    ...product,
    createdBy: adminId,
    slug: slugify(product.name, {
      lower: true,
      strict: true,
    }),
  }));

  // Add products
  await Product.insertMany(newProducts);

  console.log("Data Loaded");
  process.exit();
}

async function destroyData() {
  await connectDB();

  await Product.deleteMany();
  await Category.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();

  console.log("Data Cleared");
  process.exit();
}

const mode = process.argv[2];

if (mode === "-D") {
  destroyData();
} else {
  loadData();
}
