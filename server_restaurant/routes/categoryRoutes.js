const router = require("express").Router();
const Category = require("../models/Category");

router.post('/category/new', async(req, res) => {
    const { category_name, category_img } = req.body;
    try {
        const category = new Category({
            category_name,
            category_img
        })
        await category.save()
        res.send({category})
    }
    catch(error) {
        console.log(error);
    }
})

router.get('/categories', async(req, res) => {
    try {
        const categories = await Category.find({})
        res.send({categories});
    } catch (error) {
        console.log(error)
    }
})

router.get('/category/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.find({_id:id})
        res.send({category});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;