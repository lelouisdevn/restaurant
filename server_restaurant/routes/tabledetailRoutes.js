const router = require("express").Router();
const TableDetail = require("../models/TableDetail");
const Table = require("../models/Table");
const OrderDetail = require("../models/OrderDetail");
const Product = require("../models/Product");

// tạo trang thai cho ban la 1
router.post("/tabledetail", async (req, res) => {
  const { table, order } = req.body;
  try {
    const tabledetail = new TableDetail({
      table,
      order
    });
    await tabledetail.save();
    res.send({ tabledetail });
  } catch (error) {
    console.log("Database err", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Lấy tất cả bàn trạng thái là 1 (tức có người ngồi)
router.get("/table/status=1", async (req, res) => {
  try {
    let table = await TableDetail.find({ status: 1 });
    res.send({ table });
  } catch (error) {
    console.log("Database err", error);
    return res.status(422).send({ Error: error.message });
  }
});

//
router.get("/lobby/:id/detailtable/status=1", async (req, res) => {
  let sit = [];
  try {
    let table = await Table.find({ lobby: req.params.id, tbl_status: 0 });
    for (let i = 0; i < table.length; i++) {
      let detailTable = await TableDetail.find({ table: table[i]._id })
        .populate("table")
        .exec();
      if (detailTable.length === 1) {
        sit.push(detailTable[0]);
      } else {
        sit.push(table[i]);
      }
    }
    // console.log("thong tin", sit);
    res.send({ sit });
  } catch (error) {
    console.log("Database err", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Lay tat ca thong tin ban co nguoi nguoi co danh sach san pham
router.get("/tabledetails", async (req, res) => {
  console.log("Ok lay ca ban lan san pham");
  let personsit;
  let orderdetail;
  let array = [];
  try {
    //Gọp các orderdetail theo order giống nhau
    orderdetail = await OrderDetail.aggregate([
      {
        $match: {
          status: "dadat"
        }
      },
      // {$unwind: "$Product"},
      {
        $group: {
          _id: {
            order: "$Order"
          },
          product: {
            $push: "$Product"
          },
          qty: {
            $push: "$qty"
          }
        }
      }
    ]);
    // console.log("orderdetail: ", orderdetail);
    for (let i = 0; i < orderdetail.length; i++) {
      // console.log("person in: ", orderdetail[i]._id.order);
      //Chạy orderdetail để tìm order giong trong table để lấy ra bàn
      personsit = await TableDetail.find({
        status: 1,
        order: orderdetail[i]._id.order
      })
        .populate("table order")
        .exec();
      
      let arraydetailLGT2 = [];

      for (let x = 0; x < orderdetail[i].product.length; x++) {
        p = await Product.findById(orderdetail[i].product[x]);
        qty = orderdetail[i].qty[i];
        arraydetailLGT2.push({ product: p, qty: qty });
      }
      if (personsit.length > 0) {
        array.push({
          table: personsit[0].table,
          total: personsit[0].order,
          products: arraydetailLGT2
        });
      }
    }
    console.log("de2: ", array);
    res.send({ array });
  } catch (error) {
    console.log("Database err", error);
    return res.status(422).send({ Error: error.message });
  }
});

module.exports = router;
