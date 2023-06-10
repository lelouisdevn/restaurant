const router = require('express').Router();
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


router.post('/order/getAll', async(req, res) => {
    const {tableId} = req.body;
    try {
        const tables = await TableDetail.find({table: tableId});
        res.send({tables});
    } catch (error) {
        console.log(error);
    }
})


router.post('/order/get/', async(req, res) => {
    const {orderId} = req.body;
    try {
        const order = await Order.find({_id: orderId});
        res.send({order});
    } catch (error) {
        console.log(error);
    }
})
router.post('/order/payment', async(req, res) => {
    const { orderId } = req.body;
    try {
        // const order = await Order.find({_id: orderId});
        const order = await Order.updateOne(
            {_id: orderId,},
            {
                $set: {
                    status: "dathanhtoan",
                }
            }
        )

        // res.send({order});
        // console.log(orderId);
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