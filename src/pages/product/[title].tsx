import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import NextImage from "next/image";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Skelton from "../../components/Skelton";