import Stripe from "stripe";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

const getMyOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ user: req.userId }).populate("restaurant").populate("user");

        if(!orders) {
            return res.status(404).json({ message: "Orders not found!" });
        }
        
        res.json(orders);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while getting orders!" });
    }
}

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    }
    restaurantId: string;
}

const stripeWebhookHandler = async (req: Request, res: Response) => {
    let event;

    try {
        const sig = req.headers["stripe-signature"];
        event = STRIPE.webhooks.constructEvent(req.body, sig as string, STRIPE_ENDPOINT_SECRET);
    }
    catch (err: any) {
        console.log(err);
        return res.status(400).send(`WEBHOOK ERROR: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const order = await Order.findById(event.data.object.metadata?.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        order.totalAmount = event.data.object.amount_total;
        order.status = "paid";

        await order.save();
    }

    res.status(200).send();
}

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);

        if (!restaurant) {
            throw new Error("Restaurant not found");
        }

        const newOrder = new Order({
            restaurant,
            user: req.userId,
            status: "placed",
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            createdAt: new Date()
        });

        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);

        const session = await createSession(lineItems, newOrder._id.toString(), restaurant.deliveryPrice, restaurant._id.toString());

        if (!session.url) {
            return res.status(500).json({ message: "Error creating stripe session" });
        }

        await newOrder.save();

        res.json({ url: session.url });
    }
    catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.raw.message });
    }
}

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find(
            (item) => item._id.toString() === cartItem.menuItemId.toString()
        );
        if (!menuItem) {
            throw new Error(`Menu Item not found: ${cartItem.menuItemId}`);
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
                currency: "inr", // Change karne ki zarurat pad sakti hai
                unit_amount: menuItem.price * 50, // Change karne ki zarurat pad sakti hai
                product_data: {
                    name: menuItem.name
                }
            },
            quantity: parseInt(cartItem.quantity)
        }
        return line_items;
    });

    return lineItems;
}

const createSession = async (lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], orderId: string, deliveryPrice: number, restaurantId: string) => {
    const sessionData = await STRIPE.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryPrice * 50, // Change karne ki zarurat pad sakti hai
                        currency: "inr" // Change karne ki zarurat pad sakti hai
                    }
                }
            }
        ],
        mode: "payment",
        metadata: {
            orderId,
            restaurantId
        },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`
    });

    return sessionData;
}

export default {
    createCheckoutSession,
    stripeWebhookHandler,
    getMyOrders
}
