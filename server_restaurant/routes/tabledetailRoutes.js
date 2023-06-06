const router = require("express").Router();
const TableDetail = require("../models/TableDetail");
const Table = require('../models/Table');
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
router.get('/table/status=1', async (req, res) => {
    
    try {
        let table = await TableDetail.find({ status: 1 });
        res.send({table});
        
    } catch (error) {
        console.log("Database err", error);
        return res.status(422).send({ Error: error.message });
        
    }
})

// r
router.get("/lobby/:id/detailtable/status=1", async (req, res) => {
  let sit = [];
  try {
    let table = await Table.find({ lobby: req.params.id, tbl_status: 0 });
    for (let i = 0; i < table.length; i++){
      let detailTable = await TableDetail.find({  table: table[i]._id }).populate("table").exec();
      if (detailTable.length === 1) {
        sit.push(detailTable[0])
      } else {
        sit.push(table[i]);
      }
    }
    res.send({sit});
  } catch (error) {
      console.log("Database err", error);
      return res.status(422).send({ Error: error.message });
  }
})

module.exports = router;
