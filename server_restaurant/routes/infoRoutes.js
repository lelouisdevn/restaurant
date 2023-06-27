const router = require('express').Router();
const Info = require("../models/Info");

//Lay thong tin nha hang
router.get("/info", async (req, res) => {
  
    try {
      let info = await Info.find({_id: "64730496807c841ff6a953a3"});
      res.send({ info });
    } catch (error) {
      console.log("Data err: ", error);
      return res.status(422).send({ Error: error.message });
      
    }
})

//Lay thong tin nha hang
router.get("/info/id=:id", async (req, res) => {
  
  try {
    let info = await Info.find({_id: req.params.id});
    res.send({ info });
    
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
    
  }
})

//Sửa thông tin của nha hang
router.put('/info/edit/id=:id', async (req, res) => {
  console.log(req.params);
  try {
    let info = await Info.updateOne(
      { _id: req.params.id },
      {
        $set: {
          rest_name: req.body.rest_name,
          rest_desc: req.body.rest_desc,
          rest_addr: req.body.rest_addr,
          rest_phone: req.body.rest_phone,
        }
      }
    );
    res.send({ info });
    
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
})



module.exports = router;