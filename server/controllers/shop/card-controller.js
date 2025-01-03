const Card = require("../../models/Card")

const Product=require("../../models/product")

const addToCard = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      let card = await Card.findOne({ userId });
  
      if (!card) {
        card = new Card({ userId, items: [] });
      }
  
      const findCurrentProductIndex = card.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (findCurrentProductIndex === -1) {
        card.items.push({ productId, quantity });
      } else {
        card.items[findCurrentProductIndex].quantity += quantity;
      }
  
      await card.save();
      res.status(200).json({
        success: true,
        data: card,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };

  const fetchCartItems = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User id is manadatory!",
        });
      }
  
      const card = await Card.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
        
  
      if (!card) {
        return res.status(404).json({
          success: false,
          message: "Cart not found!",
        });
      }
  
      const validItems = card.items.filter(
        (productItem) => productItem.productId
      );
  
      if (validItems.length < card.items.length) {
        cart.items = validItems;
        await card.save();
      }
  
      const populateCardItems = validItems.map((item) => ({
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        salePrice: item.productId.salePrice,
        quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...card._doc,
          items: populateCardItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };

  const updateCartItemQty = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      const card = await Card.findOne({ userId });
      if (!card) {
        return res.status(404).json({
          success: false,
          message: "Card not found!",
        });
      }
  
      const findCurrentProductIndex = card.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (findCurrentProductIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Card item not present !",
        });
      }
  
      card.items[findCurrentProductIndex].quantity = quantity;
      await card.save();
  
      await card.populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      const populateCartItems = card.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,  
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...card._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };

const deleteCartItem = async (req, res) => {

  try {
    const { userId, productId } = req.params;
       
     console.log( "userId",userId, "productId",productId)
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const card = await Card.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    card.items = card.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await card.save();

    await card.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = card.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...card._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports={
    addToCard,deleteCartItem,updateCartItemQty,fetchCartItems
}