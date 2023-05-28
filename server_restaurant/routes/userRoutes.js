const router = require('express').Router();
const User = require("../models/User");

// Them moi 1 nguoi dung
router.post("/user", async (req, res) => {
    //console.log(req.body);
    const { staff_name, staff_dob, staff_phone, staff_addr, staff_gender, username, password, restaurant, role } = req.body;
    try {
        const user = new User({
            staff_name,
            staff_dob,
            staff_phone,
            staff_addr,
            staff_gender,
            username,
            password,
            restaurant,
            role,
        });
        await user.save();
        res.send({user})
    } catch (error) {
         console.log("Database err", error);
         return res.status(422).send({ Error: error.message });
    }
})

// Lấy ra tất cả nguoi dung
router.get("/users", async (req, res) => {
  
  try {
    let users = await User.find({staff_status: 1});
    res.send({ users });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
    
  }
})

router.get("/users/id=:id", async (req, res) => {
  
    try {
      let user = await User.find({_id: req.params.id});
      res.send({ user });
    } catch (error) {
      console.log("Data err: ", error);
      return res.status(422).send({ Error: error.message });
      
    }
})

//Sửa thông tin của 1 nguoi dung
router.put('/users/edit/id=:id', async (req, res) => {
  console.log(req.params);
  try {
    let user = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          staff_name: req.body.staff_name,
          staff_dob: req.body.staff_dob,
          staff_phone: req.body.staff_phone,
          staff_addr: req.body.staff_addr,
          staff_gender: req.body.staff_gender,
          username: req.body.username,
          password: req.body.password,
          role: req.body.role,
        }
      }
    );
    res.send({ user });
    
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
})

// Xoa nguoi dung
router.put('/users/delete/id=:id', async (req, res) => {
  console.log(req.params);
  try {
    let lobby = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          staff_status: 0 ,
        }
      }
    );
    res.send({ user });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
})

module.exports = router;