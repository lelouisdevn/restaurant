const router = require("express").Router();
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const TableDetail = require("../models/TableDetail");
const dateFns = require("date-fns");
// import dateFns from "date-fns";
const format = dateFns.format;
const eachDayOfInterval = dateFns.eachDayOfInterval;
const eachWeekOfInterval = dateFns.eachWeekOfInterval;
const eachMonthOfInterval = require("date-fns/eachMonthOfInterval");
const addDays = dateFns.addDays;
const subDays = dateFns.subDays;
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
router.post("/order/all", async (req, res) => {
  const { restaurant } = req.body;
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          restaurant: new ObjectId(restaurant)
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
    if (orderId !== "" && criteria !== "") {
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
    }
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
  try {
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
    res.send({ listTBill });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Thống kê các đơn hàng từ - đến ngày
router.post("/list/bills/bydate", async (req, res) => {
  const { restaurant, arraydate } = req.body;
  console.log(" tu ngay den ngay ", arraydate);
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
        if (format(new Date(element.bill_at), "MM/dd/yyyy") === arraydate[0]) {
          listTBill.push(element);
        }
      });
    } else {
      // Hai ngay khac
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

// Thống kê các đơn hàng từ - đến ngày
router.post("/list/statistical/bydate", async (req, res) => {
  const { staffMana, arraydate } = req.body;
  try {
    let to = 0;
    if (arraydate[0] === arraydate[1]) {
      var bill;
      var listBill = [];
      var listBill2 = [];
      //cac nha hang cua chu do
      let restaurant = await UserRestDetail.find({ user: staffMana })
        .populate("info")
        .exec();
      console.log("dsafaf: ", restaurant.length);

      // So luong nhan vien cua tung nha hang
      let staff = await UserRestDetail.aggregate([
        {
          $group: {
            _id: {
              infoRes: "$info"
            },
            count: { $sum: 1 }
          }
        }
      ]);
      let arrS = [];
      restaurant.forEach((eRes) => {
        staff.forEach((eStaff) => {
          if (eRes.info.equals(eStaff._id.infoRes)) {
            arrS.push({ restaurant: eRes, staff: eStaff.count });
          }
        });
      });

      // Thống kê nhà hàng theo doanh thu hôm nay
      for (let i = 0; i < arrS.length; i++) {
        bill = await Order.aggregate([
          {
            $match: {
              status: "dathanhtoan",
              restaurant: new ObjectId(arrS[i].restaurant.info._id.toString())
            }
          },
          {
            $group: {
              _id: {
                bill: {
                  $dateToString: { format: "%m/%d/%Y", date: "$bill_at" }
                }
              },
              count: { $sum: 1 },
              total: {
                $sum: "$total"
              }
            }
          }
        ]);

        listBill.push({
          restaurant: arrS[i].restaurant,
          staff: arrS[i].staff,
          bill: bill
        });
        console.log("bill: ", listBill);
      }
      for (let x = 0; x < listBill.length; x++) {
        if (listBill[x].bill.length > 0) {
          for (y = 0; y < listBill[x].bill.length; y++) {
            if (listBill[x].bill[y]._id.bill === arraydate[0]) {
              listBill2.push({
                restaurant: listBill[x].restaurant.info,
                staff: listBill[x].staff,
                count: listBill[x].bill[y].count,
                total: listBill[x].bill[y].total
              });
            }
          }
        } else {
          listBill2.push({
            restaurant: listBill[x].restaurant.info,
            staff: listBill[x].staff,
            count: 0,
            total: 0
          });
        }
      }

      for (n = 0; n < listBill2.length; n++) {
        if (listBill2[n].total !== undefined) {
          to += listBill2[n].total;
        }
      }
    } else {
      //  "Hai ngay khac "
      const allDays = eachDayOfInterval({
        start: new Date(arraydate[0]),
        end: new Date(arraydate[1])
      });
      var bill;
      var listBill = [];
      var listBill2 = [];
      var listBill3 = [];
      var make = [];

      //cac nha hang cua chu do
      let restaurant = await UserRestDetail.find({ user: staffMana })
        .populate("info")
        .exec();

      // So luong nhan vien cua tung nha hang
      let staff = await UserRestDetail.aggregate([
        {
          $group: {
            _id: {
              infoRes: "$info"
            },
            count: { $sum: 1 }
          }
        }
      ]);
      let arrS = [];
      restaurant.forEach((eRes) => {
        staff.forEach((eStaff) => {
          if (eRes.info.equals(eStaff._id.infoRes)) {
            arrS.push({ restaurant: eRes, staff: eStaff.count });
          }
        });
      });

      // Thống kê nhà hàng theo doanh thu hôm nay
      for (let i = 0; i < arrS.length; i++) {
        bill = await Order.aggregate([
          {
            $match: {
              status: "dathanhtoan",
              restaurant: new ObjectId(arrS[i].restaurant.info._id.toString())
            }
          },
          {
            $group: {
              _id: {
                bill: {
                  $dateToString: { format: "%m/%d/%Y", date: "$bill_at" }
                }
              },
              count: { $sum: 1 },
              total: {
                $sum: "$total"
              }
            }
          }
        ]);
        listBill.push({
          restaurant: arrS[i].restaurant,
          staff: arrS[i].staff,
          bill: bill
        });
      }
      for (let x = 0; x < listBill.length; x++) {
        if (listBill[x].bill.length > 0) {
          for (y = 0; y < listBill[x].bill.length; y++) {
            for (let z = 0; z < allDays.length; z++) {
              if (
                listBill[x].bill[y]._id.bill ===
                format(allDays[z], "MM/dd/yyyy")
              ) {
                make.push({
                  restaurant: listBill[x].restaurant,
                  staff: listBill[x].staff,
                  bill: listBill[x].bill[y]
                });
              }
            }
          }
        } else {
          make.push({
            restaurant: listBill[x].restaurant,
            staff: listBill[x].staff,
            bill: 0
          });
        }
      }

      const groupByWom = (object) => {
        return {
          restaurant: object.restaurant.info._id,
          objects: [object]
        };
      };
      const groupedObjects = make.map(groupByWom);
      // console.log("so sanh lay duoc gia tri: ", groupedObjects );
      for (let x = 0; x < staff.length; x++) {
        console.log("staff: ", staff[x]);
        let count = 0;
        let total = 0;
        for (let y = 0; y < groupedObjects.length; y++) {
          if (staff[x]._id.infoRes.equals(groupedObjects[y].restaurant)) {
            count +=
              groupedObjects[y].objects[0].bill.count === undefined
                ? 0
                : groupedObjects[y].objects[0].bill.count;
            total +=
              groupedObjects[y].objects[0].bill.total === undefined
                ? 0
                : groupedObjects[y].objects[0].bill.total;
          }
        }
        listBill3.push({
          restaurant: staff[x]._id.infoRes,
          staff: staff[x].count,
          count: count,
          total: total
        });
      }
      for (let q = 0; q < restaurant.length; q++) {
        let newCount = 0;
        let newTotal = 0;
        for (let p = 0; p < listBill3.length; p++) {
          if (restaurant[q].info._id.equals(listBill3[p].restaurant)) {
            newStaff = listBill3[p].staff;
            newCount += listBill3[p].count;
            newTotal += listBill3[p].total;
          }
        }
        listBill2.push({
          restaurant: restaurant[q].info,
          staff: newStaff,
          count: newCount,
          total: newTotal
        });
      }
      // console.log("nhóm cac trungljkjnb: ", listBill2);
      for (n = 0; n < listBill2.length; n++) {
        if (listBill2[n].total !== undefined) {
          to += listBill2[n].total;
        }
      }
    }
    res.send({ listBill2, to });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Loi nhuan theo tuan roi
const dated = eachWeekOfInterval(
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
  let week = dated[0];
  let arrT = [];
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

// Loi nhuan theo tuan nay
const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 0),
    end: addDays(new Date(), 0)
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

router.get("/bill/profit/currentweek/idRes=:id", async (req, res) => {
  let week = dates[0];
  let arrT = [];
  const restrant = req.params.id;

  let o;
  try {
    // Lấy order theo ngày { _id: {bill: 'MM/DD/YYYY'}, count: 1, total: 210000}
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

    for (let m = 0; m < week.length; m++) {
      for (let i = 0; i < o.length; i++) {
        if (format(week[m], "MM/dd/yyyy") === o[i]._id.bill) {
          var day_name = "";
          let thu = week[m].getDay();
          // Lấy tên thứ của ngày hiện tại
          switch (thu) {
            case 0:
              day_name = "Chủ nhật";
              break;
            case 1:
              day_name = "Thứ hai";
              break;
            case 2:
              day_name = "Thứ ba";
              break;
            case 3:
              day_name = "Thứ tư";
              break;
            case 4:
              day_name = "Thứ năm";
              break;
            case 5:
              day_name = "Thứ sáu";
              break;
            case 6:
              day_name = "Thứ bảy";
          }

          arrT.push({
            Thứ: day_name,
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

// Thống kê doanh thu của tháng hiện tại
// Lấy tháng trước
const month = eachMonthOfInterval({
  start: subMonths(new Date(), 0),
  end: addMonths(new Date(), 0)
});

router.get("/bill/profit/bymonth/idRes=:id", async (req, res) => {
  let bill;
  try {
    const result = dateFns.getWeekOfMonth(new Date());
    const currentDate = new Date();
    const startOfMonth = dateFns.startOfMonth(currentDate);
    const endOfMonth = dateFns.endOfMonth(currentDate);

    let wOm = [];
    for (let i = startOfMonth; i <= endOfMonth; i = dateFns.addDays(i, 1)) {
      const weekOfMonth = dateFns.getWeekOfMonth(i);
      const dateOfMonth = dateFns.format(i, "MM/dd/yyyy");
      wOm.push({ wom: weekOfMonth, dom: dateOfMonth });
    }
    // console.log("mmmmmeees: ", wOm);
    const groupByWom = (object) => {
      return {
        wom: object.wom,
        objects: [object]
      };
    };

    const groupedObjects = wOm.map(groupByWom);
    let make = [];
    for (let x = 1; x <= result; x++) {
      let day = [];
      for (let y = 0; y < groupedObjects.length; y++) {
        if (x === groupedObjects[y].wom) {
          day.push(groupedObjects[y].objects[0].dom);
        }
      }
      make.push({ w: x, day: day });
    }

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
            date: { $dateToString: { format: "%m/%d/%Y", date: "$bill_at" } }
          },
          count: { $sum: 1 },
          total: {
            $sum: "$total"
          }
        }
      }
    ]);

    let statistical = [];
    for (let y = 0; y < make.length; y++) {
      let total = 0;
      let count = 0;
      for (let x = 0; x < make[y].day.length; x++) {
        for (let i = 0; i < bill.length; i++) {
          if (make[y].day[x] === bill[i]._id.date) {
            total += bill[i].total;
            count += bill[i].count;
          }
        }
      }
      statistical.push({
        Tuần: make[y].w,
        "Số lượng hóa đơn": count,
        "Doanh thu": total,
        "Số ngày của tuần": make[y].day.length
      });
    }
    // console.log("total: ", statistical);
    res.send({ statistical });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Thống kê danh thu theo tháng của năm
router.get("/bill/profit/byyear/idRes=:id", async (req, res) => {
  let bill;
  let arr = [];
  try {
    const cyear = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];

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
            date: { $dateToString: { format: "%m/%Y", date: "$bill_at" } },
            month: { $dateToString: { format: "%m", date: "$bill_at" } },
            year: { $dateToString: { format: "%Y", date: "$bill_at" } }
          },
          count: { $sum: 1 },
          total: {
            $sum: "$total"
          }
        }
      }
    ]);
    for (let x = 0; x < cyear.length; x++) {
      for (let y = 0; y < bill.length; y++) {
        if (cyear[x] === bill[y]._id.month) {
          arr.push(bill[y]);
        }
      }
    }
    let arrS = [];
    for (let z = 0; z < arr.length; z++) {
      arrS.push({
        Tháng: arr[z]._id.date,
        "Số lượng hóa đơn": arr[z].count,
        "Doanh thu": arr[z].total
      });
    }
    res.send({ arrS });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/statictical/all/today/user=:user", async (req, res) => {
  try {
    var bill;
    var listBill = [];
    var listBill2 = [];
    //cac nha hang cua chu do
    let restaurant = await UserRestDetail.find({ user: req.params.user })
      .populate("info")
      .exec();

    // So luong nhan vien cua tung nha hang
    let staff = await UserRestDetail.aggregate([
      {
        $group: {
          _id: {
            infoRes: "$info"
          },
          count: { $sum: 1 }
        }
      }
    ]);
    let arrS = [];
    restaurant.forEach((eRes) => {
      staff.forEach((eStaff) => {
        if (eRes.info.equals(eStaff._id.infoRes)) {
          arrS.push({ restaurant: eRes, staff: eStaff.count });
        }
      });
    });

    // Thống kê nhà hàng theo doanh thu hôm nay
    for (let i = 0; i < arrS.length; i++) {
      bill = await Order.aggregate([
        {
          $match: {
            status: "dathanhtoan",
            restaurant: new ObjectId(arrS[i].restaurant.info._id.toString())
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

      listBill.push({
        restaurant: arrS[i].restaurant,
        staff: arrS[i].staff,
        bill: bill
      });
    }

    for (let x = 0; x < listBill.length; x++) {
      if (listBill[x].bill.length > 0) {
        for (y = 0; y < listBill[x].bill.length; y++) {
          if (
            listBill[x].bill[y]._id.bill === format(new Date(), "MM/dd/yyyy")
          ) {
            listBill2.push({
              restaurant: listBill[x].restaurant,
              staff: listBill[x].staff,
              bill: listBill[x].bill[y]
            });
          }
        }
      } else {
        listBill2.push({
          restaurant: listBill[x].restaurant,
          staff: listBill[x].staff,
          bill: 0
        });
      }
    }
    let to = 0;
    for (n = 0; n < listBill2.length; n++) {
      if (listBill2[n].bill.total !== undefined) {
        to += listBill2[n].bill.total;
      }
    }
    res.send({ listBill2, to });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/statictical/all/time/user=:user", async (req, res) => {
  try {
    var bill;
    var listBill = [];
    var listBill2 = [];
    //cac nha hang cua chu do
    let restaurant = await UserRestDetail.find({ user: req.params.user })
      .populate("info")
      .exec();

    // So luong nhan vien cua tung nha hang
    let staff = await UserRestDetail.aggregate([
      {
        $group: {
          _id: {
            infoRes: "$info"
          },
          count: { $sum: 1 }
        }
      }
    ]);
    let arrS = [];
    restaurant.forEach((eRes) => {
      staff.forEach((eStaff) => {
        if (eRes.info.equals(eStaff._id.infoRes)) {
          arrS.push({ restaurant: eRes, staff: eStaff.count });
        }
      });
    });

    // Thống kê nhà hàng theo doanh thu hôm nay
    for (let i = 0; i < arrS.length; i++) {
      bill = await Order.aggregate([
        {
          $match: {
            status: "dathanhtoan",
            restaurant: new ObjectId(arrS[i].restaurant.info._id.toString())
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

      listBill.push({
        restaurant: arrS[i].restaurant,
        staff: arrS[i].staff,
        bill: bill
      });
    }

    for (let x = 0; x < listBill.length; x++) {
      if (listBill[x].bill.length > 0) {
        for (y = 0; y < listBill[x].bill.length; y++) {
          if (
            listBill[x].bill[y]._id.bill === format(new Date(), "MM/dd/yyyy")
          ) {
            listBill2.push({
              restaurant: listBill[x].restaurant,
              staff: listBill[x].staff,
              bill: listBill[x].bill[y]
            });
          }
        }
      } else {
        listBill2.push({
          restaurant: listBill[x].restaurant,
          staff: listBill[x].staff,
          bill: 0
        });
      }
    }
    let to = 0;
    for (n = 0; n < listBill2.length; n++) {
      if (listBill2[n].bill.total !== undefined) {
        to += listBill2[n].bill.total;
      }
    }
    // console.log("total: ", to);
    res.send({ listBill2, to });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

module.exports = router;
