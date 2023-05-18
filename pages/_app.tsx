import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Web3ContextProvider from "../web3Provider/Web3ContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class">
            <Web3ContextProvider>
                <Component {...pageProps} />
            </Web3ContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
