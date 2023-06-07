
const router = require('express').Router();
const User = require("../models/User");
const Info = require("../models/Info");
const UserRestDetail = require("../models/UserRestDetail");

router.post("/login", async (req, res) => {
    
    try {
        let rest = await Info.findOne({rest_name: req.body.restaurant});
        let user = await User.findOne({username: req.body.username});
        if (rest && user){
            let login = await UserRestDetail.find({info: rest._id,user: user._id}).populate("user info").exec();
            console.log(rest._id);
            console.log(login[0].user.username);
            if (login){
                if((req.body.username === login[0].user.username) && (req.body.password === login[0].user.password)){
                    res.send({ login, rest });
                }else{
                    return res.status(422).send({ Error: error.message });
                }
            }else{
                return res.status(422).send({ Error: error.message });
            }
        }else{
            return res.status(422).send({ Error: error.message });
        }
    } catch (error) {
        console.log("Data err: ", error);
        return res.status(422).send({ Error: error.message });

    }
})

module.exports = router;