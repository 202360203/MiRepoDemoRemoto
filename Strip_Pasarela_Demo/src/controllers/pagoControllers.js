import Stripe from "stripe";
import { STRIPE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_KEY);

export const procesarPago = async (req, res) => {
    const sesion = await stripe.checkout.sessions.create({
        line_items: [
            {
                //Producto Laptop
                price_data: {
                    product_data: {
                        name: "Laptop",
                        description: "Gamer Laptop"
                    },
                    currency: "mxn",
                    unit_amount: 100000
                },
                quantity: 2
            },
            {
                //Producto Lavadora
                price_data: {
                    product_data: {
                        name: "Lavadora",
                        description: "Lavadora Whirlpool"
                    },
                    currency: "mxn",
                    unit_amount: 2000000
                },
                quantity: 2
            }
        ],
        mode: "payment",
        success_url: "http://localhost:4000/exito",
        cancel_url: "http://localhost:4000/cancelado"
    });
    res.json(sesion);
};



