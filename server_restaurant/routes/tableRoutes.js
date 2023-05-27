const router = require('express').Router();
const Table = require("../models/Table");

//Thêm một bàn mới
router.post('/table', async(req,res) => {
    console.log("Thuc hien tao 1 ban moi");
    const { tbl_id, tbl_seat_num, lobby } = req.body;
    try {
        const table = new Table({
          tbl_id,
          tbl_seat_num,
          lobby,
        });
        await table.save();
        res.send({ table });
        
    } catch (error) {
         console.log("Database err", error);
         return res.status(422).send({ Error: error.message });
    }
})

router.get('/lobby/:id/table', async (req, res) => {
  
  console.log(req.params);
  try {
    let table = await Table.find({ lobby: req.params.id, tbl_status: 0 });
    res.send({ table });
    
  } catch (error) {
    console.log("Database err", error);
    return res.status(422).send({ Error: error.message });
    
  }
});
// Sửa thông tin của 1 bàn
router.put('/table/edit/id=:id', async (req, res) => {
  console.log(" in ban: ", req.params.id);
  try {
    let table = await Table.updateOne(
      { _id: req.params.id },
      {
        $set: {
          tbl_id: req.body.code,
          tbl_seat_num: req.body.count
        }
      }
    );
    res.send({ table });
  } catch (error) {}
  
})
// Sửa thông tin của 1 bàn
router.put('/table/delete/id=:id', async (req, res) => {
  console.log("in ban: ", req.params.id);
  try {
    let table = await Table.updateOne(
      { _id: req.params.id },
      {
        $set: {
          tbl_status: -1,
        }
      }
    );
    res.send({ table });
  } catch (error) {}
  
})
module.exports = router;