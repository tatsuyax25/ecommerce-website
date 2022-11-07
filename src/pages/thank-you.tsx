import Head from "next/head";
import { useRouter } from "next/router";
import { HiCheckCircle } from "react-icons/hi";
import Navbar from "../components/Navbar";

const ThankYou = () => {
    const router = useRouter();
    return(
        <div>
            <Head>
                <title>Thank You</title>
                <meta name="description" content="All Products" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mx-auto">
                <Navbar />
                <div className="rounded-md bg-green-50 p-4 mt-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <HiCheckCircle 
                                className="h-5 w-5 text-green-400" 
                                aria-hidden="true" 
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}