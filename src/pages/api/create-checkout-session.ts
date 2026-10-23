import currency from "currency.js";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { stripeServerSide } from "../../lib/stripe";
import { TApiErrorResp } from "../../types";

const checkoutSession = async (
    req: NextApiRequest,
    res: NextApiResponse<{ id: string } | TApiErrorResp>
) => {
    try {
        const host = req.headers.origin;
        const referer = req.headers.referer;
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }
        const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        if (!body.price || !body.title || !body.image) {
            return res.status(400).json({ message: "Missing required fields: price, title, image" });
        }
        const formatedPrice = currency(body.price, {
            precision: 2,
            symbol: "",
        }).multiply(100);
        const session = await stripeServerSide.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: body?.title,
                            images: [body.image],
                            description: body?.description,
                        },
                        unit_amount_decimal: formatedPrice.toString(),
                    },
                    quantity: 1,
                },
            ],
            success_url: `${host}/thank-you`,
            cancel_url: `${referer}?status=cancel`,
        });
        return res.status(200).json({ id: session.id });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!! Please try again after sometime",
        });
    }
};

const handler = nc({ attachParams: true }).post(checkoutSession);

export default handler;