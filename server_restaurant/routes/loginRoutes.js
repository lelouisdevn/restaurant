const router = require('express').Router();
const User = require("../models/User");
const Info = require("../models/Info");
const UserRestDetail = require("../models/UserRestDetail");

router.post("/login", async (req, res) => {
    
    try {
        let login = await User.find({username: req.body.username,password: req.body.password, staff_status: "1"});
            res.send({ login });
            //console.log(login);
    } catch (error) {
        console.log("Data err: ", error);
        return res.status(422).send({ Error: error.message });

    }
})

module.exports = router;