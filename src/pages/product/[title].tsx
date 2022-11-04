import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import NextImage from "next/image";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Skelton from "../../components/Skelton";

const stripePromiseclientSide = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const SingleProduct = () => {
    const router = useRouter();

    const getSingleProduct = async () => {
        try {
            const title = router?.query?.title;

            const respJSON = await fetch(`/api/products/${title}`);
            const resp = await respJSON.json();
            return resp;
        } catch (error) {
            throw error;
        }
    };

    const { mutate, isLoading: mutationIsLoading } = useMutation(
        async (body: any) => {
            try {
                const respJSON = await fetch("/api/create-checkout-session", {
                    method: "POST",
                    body: JSON.stringify(body),
                });
                const resp = await respJSON.json();
                const stripe = (await stripePromiseclientSide) as Stripe;
                const result = await stripe.redirectToCheckout({
                    sessionId: resp.id,
                });
                return result;
            } catch (error) {
                throw error;
            }
        }
    );

    const { data, isLoading } = useQuery(
        [`singleProduct, ${router?.query?.title}`],
        getSingleProduct,
        {
            enabled: !!router?.query?.title,
        }
    );

    const product = data?.product;
};