const router = require('express').Router();
const Lobby = require("../models/Lobby");

// Them moi 1 khu vuc
router.post("/lobby", async (req, res) => {
    const { lob_name, lob_tbl_num } = req.body;
    try {
        const lobby = new Lobby({
          lob_name,
          lob_tbl_num,
        });
        await lobby.save();
        res.send({lobby})
    } catch (error) {
         console.log("Database err", error);
         return res.status(422).send({ Error: error.message });
    }
})

 // Lấy ra tất cả khu vực
router.get("/lobbies", async (req, res) => {
  try {
    let lobbies = await Lobby.find({lob_status: 1});
    res.send({ lobbies });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
    
  }
})

//Sửa thông tin của 1 khu vực
router.put('/lobby/edit/id=:id', async (req, res) => {
  console.log(req.params);
  try {
    let lobby = await Lobby.updateOne(
      { _id: req.params.id },
      {
        $set: {
          lob_name: req.body.lob_name,
          lob_tbl_num: req.body.lob_tbl_num,
        }
      }
    );
    res.send({ lobby });
    
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
})

// Xoa khu vuc
router.put('/lobby/delete/id=:id', async (req, res) => {
  console.log(req.params);
  try {
    let lobby = await Lobby.updateOne(
      { _id: req.params.id },
      {
        $set: {
          lob_status: 0 ,
        }
      }
    );
    res.send({ lobby });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
})
module.exports = router;
