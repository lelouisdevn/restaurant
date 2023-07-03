const router = require("express").Router();
const User = require("../models/User");
const UserRestDetail = require("../models/UserRestDetail");
const Info = require("../models/Info");

// Them moi 1 nguoi dung
router.post("/user", async (req, res) => {
    //console.log(req.body);
    const { staff_name, staff_dob, staff_phone, staff_addr, staff_gender, username, password, role } = req.body;
    try {
        const user = new User({
            staff_name,
            staff_dob,
            staff_phone,
            staff_addr,
            staff_gender,
            username,
            password,
            role,
        });
        await user.save();
        if(user){
          const userrestdetail = new UserRestDetail({
            user: user._id,
            info: req.body.restaurant,
          });
          await userrestdetail.save();
        }
        res.send({user})
    } catch (error) {
         console.log("Database err", error);
         return res.status(422).send({ Error: error.message });
    }
})

// Lấy ra tất cả nguoi dung
router.get("/users/id=:id", async (req, res) => {
  try {
    let users = await UserRestDetail.find({ info: req.params.id })
      .populate("user")
      .exec();
    let i = 0;
    console.log(users.length);
    while (i < users.length) {
      if (users[i].user.staff_status == "0") {
        users.splice(i, 1);
      }
      i++;
    }
    console.log(users);
    res.send({ users });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
//lay 1 nguoi dung
router.get("/users/id=:id/idUser=:idUser", async (req, res) => {
  try {
    let user = await User.find({ _id: req.params.idUser });
    res.send({ user });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

//check username password khi add ng dung
router.get("/users/check/:username/:password", async (req, res) => {
  try {
    let user = await User.find({ username: req.params.username, password: req.params.password });
    res.send({ isuser });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

//Sửa thông tin của 1 nguoi dung
router.put("/users/edit/idUser=:idUser", async (req, res) => {
  console.log(req.params);
  try {
    let user = await User.updateOne(
      { _id: req.params.idUser },
      {
        $set: {
          staff_name: req.body.staff_name,
          staff_dob: req.body.staff_dob,
          staff_phone: req.body.staff_phone,
          staff_addr: req.body.staff_addr,
          staff_gender: req.body.staff_gender,
          username: req.body.username,
          password: req.body.password,
          role: req.body.role
        }
      }
    );
    res.send({ user });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Xoa nguoi dung
router.put("/users/delete/idUser=:idUser", async (req, res) => {
  console.log(req.params);
  try {
    let user = await User.updateOne(
      { _id: req.params.idUser },
      {
        $set: {
          staff_status: 0
        }
      }
    );
    console.log(user);
    res.send({ user });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Lấy thông tin của nhân viên và nhà hàng
router.get("/restaurant=:idRes/user=:idUser", async (req, res) => {
  const { idRes, idUser } = req.params;
  try {
    let resUser = await UserRestDetail.findOne({ info: idRes, user: idUser })
      .populate("info user")
      .exec();
    res.send({ resUser });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Get restaurant by id user
router.get("/restaurant/byuser=:iduser", async (req, res) => {
  try {
    let restaurant = await UserRestDetail.findOne({ user: req.params.iduser })
      .populate("info")
      .exec();
    let infores = restaurant.info;
    res.send({ infores });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

//Lấy all nhân viên của nhà hàng
// router.get('/all/users/idres=:id', async (req, res) => {
//   try {
//     let all = await UserRestDetail.find({ info: req.params.id }).populate('user').exec();
//     res.send({ all });
    
//   } catch (error) {
//      console.log("Data err: ", error);
//      return res.status(422).send({ Error: error.message });
//   }
// })

module.exports = router;