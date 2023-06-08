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
router.get("/all/lobbies", async (req, res) => {
  
  try {
       
      let lobbies = await Lobby.find({lob_status: 1});
      
        return res.send({ lobbies });
      
    } catch (error) {
      console.log("Data err: ", error);
      return res.status(422).send({ Error: error.message });
      
    }
})

router.get("/lobbies/restaurant=:idRes", async (req, res) => {
  console.log("reqq: ", req.params.idRes);

  try {
      if (req.params.idRes !== null) {
      let lobbies = await Lobby.find({lob_status: 1, restaurant: req.params.idRes});
      if (lobbies) {
        return res.send({ lobbies });
      }
    }
    } catch (error) {
      // console.log("Data err: ", error);
      return res.status(422).send({ Error: error.message });
      
    }
})

// Lấy ra khu vực có id
router.get("/lobby/id=:id", async (req, res) => {
  try {
    
    let lobby = await Lobby.findById(req.params.id);
    res.send({ lobby });
  } catch (error) {
     console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
})

router.put("/lobby/id=:id", async (req, res) => {
  try {
    let lobby = await Lobby.updateOne(
      { _id: req.params.id },
      {
      $set: {
        lob_arrange: req.body.lob_arrange,
        lob_num: req.body.lob_num,
      }
    }
    );
    res.send({ lobby });
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
