
const router = require('express').Router();
const User = require("../models/User");
const Info = require("../models/Info");

router.post("/login", async (req, res) => {
    //console.log(req.body.username)
    try {
        let login = await User.findOne({username: req.body.username});
        if(login){
            let result = req.body.password === login.password;
            if(result){
                res.send({ login });
            }
        }
        
    } catch (error) {
        console.log("Data err: ", error);
        return res.status(422).send({ Error: error.message });

    }
})

module.exports = router;