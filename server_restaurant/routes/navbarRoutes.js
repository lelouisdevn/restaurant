const router = require('express').Router();
const User = require("../models/User");
const UserRestDetail = require("../models/UserRestDetail");
const Info = require("../models/Info");

// Lay all nha hang thuoc 1 user 
router.get("/getallrestfromone/id=:id", async (req,res) =>{
    try{
        let rest = await UserRestDetail.find({user: req.params.id}).populate("info").exec();
        //console.log(rest);
        res.send({rest});
    }catch(error){
        console.log("Data err: ", error);
        return res.status(422).send({Error: error.message});
    }
})

// router.post("/create/rest/id:=id", async (req,res)=>{
//     const {rest_name, rest_phone, rest_addr, rest_desc} = req.body;
//     try{
//         const rest = new Info({
//             rest_name,
//             rest_phone,
//             rest_addr,
//             rest_desc,
//         })
//         await rest.save();
//         if(rest){
//             const userrestdetail = new UserRestDetail({
//                 info: rest._id,
//                 user: req.body.
//             })
//         }

//     }catch(error){
//         console.log("Data err: ", error);
//         return res.status(422).send({Error: error.message});
//     }
// })
module.exports = router;