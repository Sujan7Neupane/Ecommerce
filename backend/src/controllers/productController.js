import slugify from "slugify";
import cloudinary from "cloudinary";

import { Category } from "../models/category.models.js";
import { Product } from "../models/product.models.js";
import cloudinaryUpload from "../utils/cloudinary.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      brand,
      price,
      discountPrice,
      countInStock,
    } = req.body;

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product already exists.",
      });
    }

    // console.log(req.file?.path);

    const productImageLocalPath = req.file?.path;
    // console.log(productImageLocalPath);

    if (!productImageLocalPath)
      return res
        .status(404)
        .json({ message: "Product image local path not found!" });

    const productImage = await cloudinaryUpload(productImageLocalPath);
    // console.log(productImage);

    if (!productImage) {
      return res.status(500).json({
        message: "Failed to upload product image.",
      });
    }

    const data = {
      name,
      description,
      category,
      brand,
      price,
      discountPrice,
      countInStock,
      image: productImage.secure_url,
      imagePublicId: productImage.public_id, //used for deleting previous images on updating image
      createdBy: req.user._id,
    };

    const product = await Product.create(data);

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "createdBy",
      "fullName email -_id",
    );

    if (products.length === 0) {
      return res.status(404).json({ message: "Products not found!" });
    }

    res.json({
      message: "Products fethed successfully!",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // console.log(slug);

    const product = await Product.findOne({ slug });
    // console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Products not found!" });
    }

    res.json({ message: "Product fetched successfully!", product });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, brand, price, discountPrice, countInStock } =
      req.body;

    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({
        message: "Product not found!",
      });

    const uploadedImage = await cloudinaryUpload(req.file?.path);
    if (!uploadedImage) {
      return res.status(500).json({
        message: "Failed to upload product image.",
      });
    }

    // console.log(product);

    // Delete old image from Cloudinary aftre update
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    // console.log(product);

    product.name = name || product.name;
    product.slug = slugify("name", { lower: true });
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.countInStock = countInStock ?? product.countInStock;
    product.image = uploadedImage.secure_url;
    product.imagePublicId = uploadedImage.public_id;

    await product.save();

    res.json({
      message: "Product updated successfully!",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);
    if (!existingProduct)
      return res.status(404).json({ error: "Product not found!" });

    const deleteProduct = await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted successfully!", deleteProduct });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  addProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};
