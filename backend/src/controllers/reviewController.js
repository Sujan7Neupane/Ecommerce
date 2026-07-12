import { Product } from "../models/product.models.js";

const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    // console.log(productId);

    const { rating, comment } = req.body;

    const { isAdmin } = req.user;

    if (isAdmin)
      return res.status(401).json({ error: "Admin can't review products." });

    const existingProduct = await Product.findById(productId);
    // console.log(existingProduct);

    if (!existingProduct)
      return res.status(404).json({ message: "Product not found" });

    const data = {
      user: req.user._id,
      rating,
      comment,
    };

    const alreadyReviewed = await existingProduct.reviews.find(
      (r) => String(r.user) === String(req.user._id),
    );

    if (alreadyReviewed)
      return res
        .status(409)
        .json({ error: "Review already exist for this product!" });

    existingProduct.reviews.push(data);

    existingProduct.numReviews = existingProduct.reviews.length;

    existingProduct.averageRating =
      existingProduct.reviews.reduce(
        (acc, curr) => acc + curr.rating, //curr ma each array aauxa
        0, //acc ko initial value
      ) / existingProduct.numReviews;

    existingProduct.averageRating = await existingProduct.save();

    res.status(201).json({
      message: "Review added successfully!",
      product: existingProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const { productId, reviewId } = req.params;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct)
      return res.status(404).json({ error: "Product not found!" });

    const existingReview = existingProduct.reviews.id(reviewId);

    if (!existingReview)
      return res.status(404).json({ error: "Review not found!" });

    // console.log(typeof existingReview);
    // console.log(existingReview);

    const authUser = String(existingReview.user) === String(req.user._id);

    if (!authUser) return res.status(401).json({ error: "Not authorized!" });

    existingReview.rating = rating;
    existingReview.comment = comment;
    await existingProduct.save();

    res.json({ message: "Review updated successfully!", existingReview });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct)
      return res.status(404).json({ error: "Product not found!" });

    const existingReview = existingProduct.reviews.id(reviewId);

    if (!existingReview)
      return res.status(404).json({ error: "Review not found!" });

    const authUser = existingReview.user === String(req.user._id);
    if (!authUser) return res.status(401).json({ error: "Not authorized!" });

    existingReview.deleteOne();

    await existingProduct.save();

    res.json({ message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export { addReview, updateReview, deleteReview };
