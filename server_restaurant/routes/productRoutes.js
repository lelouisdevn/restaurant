const router = require('express').Router();
const Product = require("../models/Product")
const Category = require("../models/Category")
// import { ObjectId } from "bson";
const { ObjectId } = new require("bson");
/**Get all products with criteria */
router.post('/products', async (req, res) => {
    const { restaurantId, status } = req.body;
    let prod_stt;
    
    if (status == "true") {
        prod_stt = true;
    }else if (status == "false") {
        prod_stt = false;
    }
    try {
        if (status != "") {
            const document = await Product.find(
                {
                    restaurant: restaurantId,
                    prod_status: status,
                },

            );
            res.send({ document })
        }else {
            const document = await Product.find(
                {
                    restaurant: restaurantId,
                },

            );
            res.send({ document })
        }
    }
    catch (e) {
        console.log(e)
    }
});

/**Get all products with category and display criteria */
router.post('/products/category/:id/:criteria', async (req, res) => {
    const categoryId = req.params.id;
    const criteria = req.params.criteria;
    const {restaurant} = req.body;
    // console.log(restaurantId)
    const methods = [
        {},
        true,
        false,
    ]

    try {
        if (criteria == 0) {
            const products = await Product.find(
                { 
                    category: categoryId,
                    restaurant: restaurant,
                }
            );
            res.send({ products });
        }
        else {
            const products = await Product.find(
                { 
                    category: categoryId,
                    prod_status: methods[criteria],
                    restaurant: restaurant,
                }
            );
            res.send({ products });
        }

    } catch (error) {
        console.log(error);
    }
})

/**Get a single product with provided ID */
router.get('/product/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const document = await Product.aggregate([
            {
                $match: { "_id": new ObjectId(productId) },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryInfo",
                }
            }
        ])
        res.send({ document });
    } catch (error) {
        console.log(error);
    }
});

/**Create a new product */
router.post("/product/new", async (req, res) => {
    const { prod_name, prod_img, prod_desc, prod_unit, prod_price, category, restaurant } = req.body;
    try {
        const product = new Product({
            prod_name,
            prod_img,
            prod_desc,
            prod_unit,
            prod_price,
            category,
            restaurant,
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
                    restaurant: data.restaurant,
                }
            }
        );
        res.send(product);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;