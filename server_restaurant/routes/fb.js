const router = require("express").Router();
const Feedback = require("../models/Feedback");

router.post("/feedback", async(req, res) => {
    const { uid, content, phone, email } = req.body;
    const fb = new Feedback({
        content,
        phone,
        email,
        uid,
    });
    await fb.save();
    res.send({fb});
});

module.exports = router;