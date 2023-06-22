const router = require("express").Router();
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const TableDetail = require("../models/TableDetail");
const date = require("date-fns");
const format = date.format;
const eachDayOfInterval = date.eachDayOfInterval;
const eachWeekOfInterval = date.eachWeekOfInterval;
const eachMonthOfInterval = require("date-fns/eachMonthOfInterval");
const addDays = date.addDays;
const subDays = date.subDays;
const addMonths = require("date-fns/addMonths");
const subMonths = require("date-fns/subMonths");
const UserRestDetail = require("../models/UserRestDetail");
const Lobby = require("../models/Lobby");
const Product = require("../models/Product");
const Category = require("../models/Category");
/**Create a new order */
router.post("/order/new", async (req, res) => {
  const { order_at, total, user, note, restaurant } = req.body;
  try {
    const order = Order({
      order_at: order_at,
      total: total,
      user: user,
      note: note,
      restaurant: restaurant
    });
    await order.save();
    res.send({ order });
  } catch (error) {
    console.log(error);
  }
});

/**Add a new order detail; */
router.post("/order/detail/new", async (req, res) => {
  const { Product, Order, qty, unit_price } = req.body;
  try {
    const detail = new OrderDetail({
      Product,
      Order,
      qty,
      unit_price
    });
    await detail.save();
    res.send({ detail });
  } catch (error) {
    console.log(error);
  }
});
/**Get orders with filter */
router.post("/order/filter", async (req, res) => {
  const { restaurant, from, to, status } = req.body;
  console.log(from, to);
  const orders = await Order.find({
    restaurant: new ObjectId(restaurant),
    order_at: {
      $gte: new Date(from),
      $lte: new Date(to)
      // status: status,
    }
  });
  res.send({ orders });
});

/**Get all orders */
router.post('/order/all', async (req, res) => {
  const {restaurant, criteria} = req.body;
  const methods = ["dathanhtoan", "dadat", "dahuy", "tatca"];
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  console.log(day, month, year);
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          restaurant: new ObjectId(restaurant),
          order_at: {
            $gte: new Date(+year, +month, +day),
          },
          status: methods[criteria],
        }
      },
      {
        $lookup: {
          from: "orderdetails",
          localField: "_id",
          foreignField: "Order",
          as: "details"
        }
      },
      {
        $lookup: {
          from: "tabledetails",
          localField: "_id",
          foreignField: "order",
          as: "tables"
        }
      }
    ]);
    res.send({ orders });
  } catch (e) {
    console.log(e);
  }
});

router.post("/order/update", async (req, res) => {
  const { orderId, criteria } = req.body;
  const tableMethods = [0, 0, 1];
  const orderMethods = ["dahuy", "dathanhtoan", "capnhat"];
  try {
    await TableDetail.updateMany(
      { order: orderId, status: 1 },
      {
        $set: {
          status: tableMethods[criteria]
        }
      }
    );
    if (criteria === 1) {
      // const current = new Date().toLocaleString("vi-VN", { hour12: false });
      const current = new Date();
      await Order.updateOne(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            status: orderMethods[criteria],
            bill_at: current
          }
        }
      );
    } else {
      await Order.updateOne(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            status: orderMethods[criteria]
          }
        }
      );
    }
    res.send("ok");
  } catch (error) {
    console.log(error);
  }
});
// router.get('/order/:orderId/details/cancel', async(req, res) => {
//   const orderId = req.params.orderId;
//   try {
//     const details = await OrderDetail.find(
//       {Order: orderId, status: "xoa"}
//     );
//     res.send({details});
//   } catch (error) {
//     console.log(error);
//   }
// })
router.get("/order/:orderId/details", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const details = await OrderDetail.aggregate([
      {
        $match: { Order: new ObjectId(orderId) }
      },
      {
        $lookup: {
          from: "products",
          localField: "Product",
          foreignField: "_id",
          as: "product"
        }
      }
    ]);
    res.send({ details });
  } catch (error) {
    console.log(error);
  }
});
router.get("/order/:orderId/tables", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const tables = await TableDetail.aggregate([
      {
        $match: { order: new ObjectId(orderId) }
      },
      {
        $lookup: {
          from: "tables",
          localField: "table",
          foreignField: "_id",
          as: "tables"
        }
      }
    ]);
    res.send({ tables });
  } catch (error) {
    console.log(error);
  }
});
router.get("/order/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.aggregate([
      {
        $match: { _id: new ObjectId(orderId) }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      }
    ]);
    res.send({ order });
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

router.put("/orderdetail/update=:id/undo", async (req, res) => {
  try {
    console.log("order:", req.params.id);
    let statusOP = await OrderDetail.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "dadat"
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
        uptotal += product.qty * product.unit_price;
        upNote = await OrderDetail.updateOne(
          { _id: product._id },
          {
            $set: {
              qty: product.qty,
              status: product.status
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

router.put("/order=:id/total/update", async (req, res) => {
  try {
    let uptotal = await Order.updateOne(
      { _id: req.params.id },
      {
        $set: {
          total: req.body.total
        }
      }
    );
    res.send({ uptotal });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Add
// Thống kê đơn hàng theo ngày hôm nay
router.get("/list/bills/today", async (req, res) => {
  const restrant = req.query.resrant;
  let todaybill;
  let listTBill = [];
  try {
    todaybill = await Order.find({
      status: "dathanhtoan",
      restaurant: restrant
    })
      .populate("user")
      .exec();
    todaybill.forEach((element) => {
      if (
        format(element.bill_at, "MM/dd/yyyy") ===
        format(new Date(), "MM/dd/yyyy")
      ) {
        listTBill.push(element);
      }
    });
    // console.log("list bill: ", listTBill);
    res.send({ listTBill });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Thống kê các đơn hàng từ - đến ngày
router.post("/list/bills/bydate", async (req, res) => {
  const { restaurant, arraydate } = req.body;
  try {
    let listTBill = [];
    if (arraydate[0] === arraydate[1]) {
      let todaybill = await Order.find({
        status: "dathanhtoan",
        restaurant: restaurant
      })
        .populate("user")
        .exec();
      todaybill.forEach((element) => {
        if (format(new Date(element.bill_at), "MM-dd-yyyy") === arraydate[0]) {
          listTBill.push(element);
        }
      });
    } else {
      //   // console.log("Hai ngay khac ", new Date(arraydate[0]));
      const allDays = eachDayOfInterval({
        start: new Date(arraydate[0]),
        end: new Date(arraydate[1])
      });
      let bill = await Order.find({
        status: "dathanhtoan",
        restaurant: restaurant
      })
        .populate("user")
        .exec();
      allDays.forEach((eD) => {
        bill.forEach((eB) => {
          if (format(eB.bill_at, "MM/dd/yyyy") === format(eD, "MM/dd/yyyy")) {
            listTBill.push(eB);
          }
        });
      });
    }
    res.send({ listTBill });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Loi nhuan theo tuan roi
const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 7),
    end: addDays(new Date(), -7)
  },
  {
    weekStartsOn: 1
  }
).reduce((acc, cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6)
  });
  acc.push(allDays);
  return acc;
}, []);

// Thống kê doanh thu của tuần trước
router.get("/bill/profit/byweek/idRes=:id", async (req, res) => {
  let week = dates[0];
  let arrT = [];
  const restrant = req.params.id;
  console.log("reatrant: ", restrant);
  let o;
  try {
    o = await Order.aggregate([
      {
        $match: {
          status: "dathanhtoan",
          restaurant: new mongoose.Types.ObjectId("" + req.params.id + "")
        }
      },
      {
        $group: {
          _id: {
            bill: { $dateToString: { format: "%m/%d/%Y", date: "$bill_at" } }
          },
          count: { $sum: 1 },
          total: {
            $sum: "$total"
          }
        }
      }
    ]);
    for (let i = 0; i < o.length; i++) {
      for (let m = 0; m < week.length; m++) {
        if (format(week[m], "MM/dd/yyyy") === o[i]._id.bill) {
          arrT.push({
            Ngày: o[i]._id.bill,
            "Số lượng": o[i].count,
            "Doanh thu": o[i].total
          });
        }
      }
    }
    res.send({ arrT });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Thống kê doanh thu của tháng trước
// Lấy tháng trước
const monthed = eachMonthOfInterval({
  start: subMonths(new Date(), 2),
  end: addMonths(new Date(), 0)
});
router.get("/bill/profit/bymonthed/idRes=:id", async (req, res) => {
  let bill;
  let arr = [];
  try {
    bill = await Order.aggregate([
      {
        $match: {
          status: "dathanhtoan",
          restaurant: new mongoose.Types.ObjectId("" + req.params.id + "")
        }
      },
      {
        $group: {
          _id: {
            bill: { $dateToString: { format: "%m/%Y", date: "$bill_at" } }
          },
          count: { $sum: 1 },
          total: {
            $sum: "$total"
          }
        }
      }
    ]);
    // console.log("dafs:", bill);
    console.log("dafs:", monthed);
    for (let y = 0; y < monthed.length; y++) {
      for (let i = 0; i < bill.length; i++) {
        if (format(subDays(monthed[y], 1), "MM/yyyy") === bill[i]._id.bill) {
          arr.push({
            Tháng: bill[i]._id.bill,
            "Số lượng": bill[i].count,
            "Doanh thu": bill[i].total
          });
        }
      }
    }
    res.send({ arr });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get('/statictical/all/user=:user', async (req, res) => {
  try {
    //cac nha hang cua chu do 
    let restaurant = await UserRestDetail.find({ user: req.params.user });
    console.log("dsafaf: ", restaurant);

    // So luong nhan vien cua tung nha hang
    // restaurant.forEach( async (element) => {
    let staff = await UserRestDetail.aggregate(
     [ {
        $group: {
          _id: {
            infoRes: "$info"
          },
          count: { $sum: 1 },
          
        }
      }]
    );

    // So khu vu cua nha hang
    let lobby = await Lobby.aggregate([{
      $group: {
        _id: {
          infoRes: "$restaurant"
        },
        count: {$sum: 1},
      }
    }]) 
    // So luong product trong nha hang
    let product = await Product.aggregate([
      {
        $group: {
          _id: {
            infoRes: "$restaurant",
            category: "$category"
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // lay ra danh muc
    let category = await Category.find();
    category.forEach(ca => {
      product.forEach(pro => {
        if (ca._id === pro._id.category) {
          con
        }
        
      });
      
    });
      console.log("dsafaf2 : ", category);
     
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
    
  }
})

module.exports = router;
