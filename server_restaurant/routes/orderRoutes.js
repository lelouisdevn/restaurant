const router = require('express').Router();
const Order = require("../models/Order")
const OrderDetail = require("../models/OrderDetail");
/**Create a new order */
router.post('/order/new', async(req, res) => {
    const {order_at, total, user, table, restaurant } = req.body;
    try {
        const order = Order({
            order_at: order_at,
            total: total,
            user: user,
            table: table,
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
    const { Product, Order, qty, unit_price, note } = req.body;
    try {
        const detail = new OrderDetail({
            Product,
            Order,
            qty,
            unit_price,
            note,
        });
        await detail.save();
        res.send({detail});
    } catch (error) {
        console.log(error);
    }
});


/**Undone */
router.put('/order/update/:orderId', async(req, res) => {
    const id = req.params.orderId;
    const {total} = req.body;
    try {
        let order = await Order.updateOne(
            {_id: id},
            {
                $set: {
                    total: total,
                }
            }
        )
        res.send({order});
    }catch(error) {
        console.log(error);
    }
})



module.exports = router;