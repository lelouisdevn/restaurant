const router = require('express').Router();
const Product = require("../models/Product")
const Category = require("../models/Category")

/**Get all products with criteria */
router.get('/products/:hidden', async (req, res) => {
    const criteria = req.params.hidden;
    const methods = [
        {}, 
        {"prod_status":true}, 
        {"prod_status": false},
    ];
    try {
        const document = await Product.find(methods[criteria]);
        res.send({ document })
    }
    catch (e) {
        console.log(e)
    }
});

/**Get all products with category and display criteria */
router.get('/products/category/:id/:criteria', async(req, res) => {
    const categoryId = req.params.id;
    const criteria = req.params.criteria;
    const methods = [
        {},
        true,
        false,
    ]
    
    try {
        if (criteria == 0){
            const products = await Product.find({category: categoryId});
            res.send({products});
        }
        else {
            const products = await Product.find({category: categoryId, prod_status: methods[criteria]});
            res.send({products});
        }
        
    } catch (error) {
        console.log(error);
    }
})

/**Get a single product with provided ID */
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

/**Create a new product */
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

/**Update product with provided ID */
router.put("/product/update/:id", async (req, res) => {
    const id = req.params.id;
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
                    prod_status: data.prod_status,
                }
            }
        );
        res.send(product);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;