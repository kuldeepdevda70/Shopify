const { order } = require('paypal-rest-sdk');
const Order=require('../../models/Order')


const getAllOrdersOfAllUser = async (req, res) => {
  try {
    
   

    const orders = await Order.find({  });
       
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occuredd!",
    });
  }
};

   const updateOrderStatus=async (req,res)=>{
       try {
              const {id}=req.params
              const {orderStatus}=req.body
           
              const orders = await Order.find({  });
       
              if (!orders.length) {
                return res.status(404).json({
                  success: false,
                  message: "No orders found!",
                });
              }

              await Order.findByIdAndUpdate(id, { orderStatus });

              res.status(200).json({
                 success:true,
                 message:'Order status is upadted'
              })

       } catch (e) {
        console.log(e);
        res.status(500).json({
          success: false,
          message: "Some error occureddd!",
        });
       }
   }

 const getOrdersDetailsForAdmin= async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports={getAllOrdersOfAllUser,getOrdersDetailsForAdmin,updateOrderStatus}