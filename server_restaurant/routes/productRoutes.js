const router = require('express').Router();
const Product = require("../models/Product")
const Category = require("../models/Category")

router.get('/products', async (req, res) => {
    try {
        const document = await Product.aggregate(
            [
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'cat'
                    }
                }
            ]
        );
        res.send({ document })
    }
    catch (e) {
        console.log(e)
    }
});
router.get('/products/category/:id', async(req, res) => {
    const categoryId = req.params.id;
    try {
        const products = await Product.find({category: categoryId});
        res.send({products});
    } catch (error) {
        console.log(error);
    }
})

router.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const document = await Product.find({ _id: id });
        const category = await Category.find({_id:document[0].category});
        
        const Data = [document[0], category[0]]
        res.send({ Data });
    }
    catch (e) {
        console.log(e);
    }
});

router.post("/product/new", async (req, res) => {
    const { prod_name, prod_img, prod_desc, prod_unit, prod_price, category } = req.body;
    try {
        const product = new Product({
            prod_name,
            prod_img,
            prod_desc,
            prod_unit,
            prod_price,
            category,
        });
        await product.save();
        res.send({ product });
    } catch (e) {
        console.log(e);
    }
});

router.put("/product/update/:id", async (req, res) => {
    const id = req.params.id;
    // const filter = {
    //     _id: ObjectId.isValid(id) ? new ObjectId(id) : null
    // }
    const data = req.body;
    try {
        let product = await Product.updateOne(
            // filter,
            { _id: id },
            {
                $set: {
                    prod_name: data.prod_name,
                    prod_img: data.prod_img,
                    prod_unit: data.prod_unit,
                    prod_price: data.prod_price,
                    prod_desc: data.prod_desc,
                    category: data.category,
                }
            }
        );
        res.send(product);
    } catch (error) {
        console.log(error);
    }
});

// router.post("/product/update/:id", async(req, res) => {
//     const id = req.params.id;
//     const data = req.body;
//     try {

//     }
// })

module.exports = router;