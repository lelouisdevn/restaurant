const router = require('express').Router();
const { ObjectId } = require('mongodb');
const Order = require("../models/Order")
const OrderDetail = require("../models/OrderDetail");
const TableDetail = require("../models/TableDetail");
/**Create a new order */
router.post('/order/new', async(req, res) => {
    const {order_at, total, user, note, restaurant } = req.body;
    try {
        const order = Order({
            order_at: order_at,
            total: total,
            user: user,
            note: note,
            restaurant: restaurant,
        });
        await order.save();
        res.send({order});
    } catch (error) {
        console.log(error);
    }    
})

/**Add a new order detail; */
router.post('/order/detail/new', async(req, res) => {
    const { Product, Order, qty, unit_price } = req.body;
    try {
        const detail = new OrderDetail({
            Product,
            Order,
            qty,
            unit_price,
        });
        await detail.save();
        res.send({detail});
    } catch (error) {
        console.log(error);
    }
});

router.post('/order/update', async(req, res) => {
    const { orderId, criteria } = req.body;
    const tableMethods = [0, 0, 1];
    const orderMethods = ["dahuy", "dathanhtoan", "capnhat"];
    try {
        await TableDetail.updateMany(
            { order: orderId, status: 1 },
            {
                $set: {
                    status: tableMethods[criteria],
                }
            }
        )
        if (criteria === 1) {
            const current = new Date().toLocaleString("vi-VN", {hour12: false});
            await Order.updateOne(
                { _id: new ObjectId(orderId) },
                {
                    $set: {
                        status: orderMethods[criteria],
                        bill_at: current,
                    }
                }
            )
        }else {
            await Order.updateOne(
                { _id: new ObjectId(orderId) },
                {
                    $set: {
                        status: orderMethods[criteria],
                    }
                }
            )
        }
        res.send("ok");
    } catch (error) {
        console.log(error);
    }
})
router.get("/order/:orderId/details", async(req, res) => {
    const orderId = req.params.orderId;
    try {
        const details = await OrderDetail.aggregate([
            {
                $match: { "Order": new ObjectId(orderId), "status": { $ne: "xoa" } },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "Product",
                    foreignField: "_id",
                    as: "product",
                }
            }
        ])
        res.send({details});
    } catch (error) {
        console.log(error);
    }
})
router.get("/order/:orderId/tables", async(req, res) => {
    const orderId = req.params.orderId;
    try {
        const tables = await TableDetail.aggregate([
            {
                $match: { "order": new ObjectId(orderId) },
            },
            {
                $lookup: {
                    from: "tables",
                    localField: "table",
                    foreignField: "_id",
                    as: "tables",
                }
            }
        ])
        res.send({tables});
    } catch (error) {
        console.log(error);
    }
})
router.get("/order/:orderId", async(req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.aggregate([
            { 
                $match: { "_id": new ObjectId(orderId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
        ])
        res.send({order});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;