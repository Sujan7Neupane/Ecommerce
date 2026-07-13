import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";

const addOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, itemsPrice, shippingPrice, taxPrice } =
      req.body;

    if (req.user.isAdmin)
      return res.status(403).json({ message: "Not authorized!" });

    const authUser = req.user._id;
    if (!authUser)
      return res.status(401).json({ message: "Not authenticated!" });

    const existingProduct = await Product.findById(orderItems.product);
    // console.log(existingProduct);

    if (!existingProduct)
      return res.status(404).json({ error: "Product not found!" });

    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const data = {
      orderedBy: req.user._id,
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    const createdOrder = await Order.create(data);

    res.status(201).json({ message: "Order created!", createdOrder });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//NOTE: FOR ADMIN
const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate("orderedBy", "fullName");

    res.json({
      message: "All Orders fetched!",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//NOTE: FOR ADMIN
const getOrdersById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("orderedBy", "fullName");

    res.json({
      message: "Order fetched!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMyorders = async (req, res) => {
  try {
    const authUser = req.user._id;

    const user = await User.findById(authUser);

    // console.log(user);

    if (user.isAdmin)
      return res.status(403).json({ message: "Unauthorized access" });

    const myOrders = await Order.find({ orderedBy: authUser })
      .sort({
        createdAt: -1,
      })
      .populate("orderedBy", "fullName");

    res.json({
      message: "All Order fetched!",
      totalOrders: myOrders.length,
      myOrders,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMyordersById = async (req, res) => {
  try {
    const { id } = req.params;
    const authUser = req.user._id;

    const user = await User.findById(authUser);

    if (!user) return res.status(401).json({ message: "Please Login!" });

    // console.log(user);

    if (user.isAdmin)
      return res.status(403).json({ message: "Unauthorized access" });

    const myOrders = await Order.findById(id);

    res.json({ message: "Order fetched successfully!", myOrders });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const payOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "Order not found!" });

    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();

    res.json({ message: "Order paid successfully!" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deliverOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) return res.status(404).send({ error: "Order not found" });

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();

    res.json({ message: "Order delivered!" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export {
  addOrder,
  getAllOrder,
  getMyorders,
  getOrdersById,
  getMyordersById,
  payOrder,
  deliverOrder,
};
