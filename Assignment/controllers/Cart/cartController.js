import Cart from "../../models/cartSchema.js";
import Product from "../../models/productsSchema.js";

export const createCartItem = async (req, res) => {
  const user = req.user;
  const { incomingPId } = req.params;

  try {
    const product = await Product.findById(incomingPId);
    if (!product) {
      return res.status(400).json({ message: "The product can not be found" });
    }

    let cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      const newCart = new Cart({
        userId: user._id,
        products: [{ productId: incomingPId, quantity: 1 }]
      });
      await newCart.save();
      return res.status(201).json({ message: "Cart created and product added." });
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === incomingPId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ productId: incomingPId, quantity: 1 });
      }

      await cart.save();
      return res.status(200).json({ message: "Product added to existing cart." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
