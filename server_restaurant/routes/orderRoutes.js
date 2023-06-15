const router = require('express').Router();
const { ObjectId } = require('mongodb');
const Order = require("../models/Order")
const OrderDetail = require("../models/OrderDetail");
const TableDetail = require("../models/TableDetail");
/**Create a new order */
router.post('/order/new', async(req, res) => {
    const {order_at, total, user, note, restaurant } = req.body;
    try {
        const order = Order({
            order_at: order_at,
            total: total,
            user: user,
            note: note,
            restaurant: restaurant,
        });
        await order.save();
        res.send({order});
    } catch (error) {
        console.log(error);
    }    
})

/**Add a new order detail; */
router.post('/order/detail/new', async(req, res) => {
    const { Product, Order, qty, unit_price } = req.body;
    try {
        const detail = new OrderDetail({
            Product,
            Order,
            qty,
            unit_price,
        });
        await detail.save();
        res.send({detail});
    } catch (error) {
        console.log(error);
    }
});

router.post('/order/update', async(req, res) => {
    const { orderId, criteria } = req.body;
    const tableMethods = [0, 0, 1];
    const orderMethods = ["dahuy", "dathanhtoan", "capnhat"];
    try {
        await TableDetail.updateMany(
            { order: orderId, status: 1 },
            {
                $set: {
                    status: tableMethods[criteria],
                }
            }
        )
        if (criteria === 1) {
            const current = new Date().toLocaleString("vi-VN", {hour12: false});
            await Order.updateOne(
                { _id: new ObjectId(orderId) },
                {
                    $set: {
                        status: orderMethods[criteria],
                        bill_at: current,
                    }
                }
            )
        }else {
            await Order.updateOne(
                { _id: new ObjectId(orderId) },
                {
                    $set: {
                        status: orderMethods[criteria],
                    }
                }
            )
        }
        res.send("ok");
    } catch (error) {
        console.log(error);
    }
})
router.get('/order/:orderId/details/cancel', async(req, res) => {
  const orderId = req.params.orderId;
  try {
    const details = await OrderDetail.find(
      {Order: orderId, status: "xoa"}
    );
    res.send({details});
  } catch (error) {
    console.log(error);
  }
})
router.get("/order/:orderId/details", async(req, res) => {
    const orderId = req.params.orderId;
    try {
        const details = await OrderDetail.aggregate([
            {
                $match: { "Order": new ObjectId(orderId), "status": { $ne: "xoa" } },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "Product",
                    foreignField: "_id",
                    as: "product",
                }
            }
        ])
        res.send({details});
    } catch (error) {
        console.log(error);
    }
})
router.get("/order/:orderId/tables", async(req, res) => {
    const orderId = req.params.orderId;
    try {
        const tables = await TableDetail.aggregate([
            {
                $match: { "order": new ObjectId(orderId) },
            },
            {
                $lookup: {
                    from: "tables",
                    localField: "table",
                    foreignField: "_id",
                    as: "tables",
                }
            }
        ])
        res.send({tables});
    } catch (error) {
        console.log(error);
    }
})
router.get("/order/:orderId", async(req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.aggregate([
            { 
                $match: { "_id": new ObjectId(orderId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
        ])
        res.send({order});
    } catch (error) {
        console.log(error);
    }
});

/**Undone */
router.put("/order/update/:orderId", async (req, res) => {
  const id = req.params.orderId;
  const { total } = req.body;
  try {
    let order = await Order.updateOne(
      { _id: id },
      {
        $set: {
          total: total
        }
      }
    );
    res.send({ order });
  } catch (error) {
    console.log(error);
  }
});

router.put("/orderdetail/update=:id/cancel", async (req, res) => {
  try {
    console.log("order:", req.params.id);
    let statusOP = await OrderDetail.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "xoa"
        }
      }
    );
    res.send({ statusOP });
  } catch (error) {
    console.log(error);
  }
});

router.put("/order/note/update", async (req, res) => {
  try {
    let upNote = await Order.updateOne(
      { _id: req.body.id },
      {
        $set: {
          note: req.body.note
        }
      }
    );
    res.send({ upNote });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.put("/order/product/update", async (req, res) => {
  const listProducts = req.body.lproducts;
  const idOrder = listProducts[0].Order;
  let uptotal = 0;
  let upNote;
  let updatetotal;
  try {
    // console.log("body: ", listProducts);
    listProducts.forEach(async (product) => {
      if (product.status !== "xoa") {
        uptotal +=   product.qty * product.unit_price;
          upNote = await OrderDetail.updateOne(
          { _id: product._id },
          {
            $set: {
              qty: product.qty
            }
          }
        );
      }
    });
    updatetotal = await Order.updateOne(
      {
        _id: idOrder
      },
      {
        $set: {
          total: uptotal
        }
      }
      );
    res.send({ upNote });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.put('/order=:id/total/update', async (req, res) => {
  try {
    let uptotal = await Order.updateOne({ _id: req.params.id }, {
      $set: {
        total: req.body.total
      }
    })
    res.send({ uptotal });
    
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
    
  }
})

module.exports = router;