import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ethers } from "ethers";

export interface IWeb3State {
    address: string | null;
    currentChain: number | null;
    provider: any; //BrowserProvider
    isAuthenticated: boolean;
    signer?: any; // JsonRpcSigner
    balanceCalc?: any;
    isConnected: boolean;
}

const useWeb3Provider = () => {
    const initialWeb3State = {
        address: null,
        currentChain: null,
        signer: null,
        provider: null,
        isAuthenticated: false,
        balanceCalc: null,
        isConnected: false,
    };

    const [state, setState] = useState<IWeb3State>(initialWeb3State);

    const connectWallet = useCallback(async () => {
        if (state.isAuthenticated) return;

        try {
            const { ethereum } = window;
            if (!ethereum) {
                return Swal.fire({
                    text: "Plase Install MetaMask Wallet for Using Services...",
                    customClass: "alertset",
                    confirmButtonText: "OK",
                    // description: "No ethereum wallet found",
                });
            }
            const providerEthereum = ethereum;
            const provider = new ethers.BrowserProvider(ethereum);
            const accounts: string[] = await provider.send("eth_requestAccounts", []);

            if (accounts?.length) {
                // balance
                let balance = "";
                let wei = 0;
                let gwei = 0;
                let eth = 0;
                try {
                    balance =
                        (
                            await providerEthereum.send({
                                method: "eth_getBalance",
                                params: [accounts[0], "latest"],
                            })
                        )?.result || "";
                    wei = parseInt(balance, 16);
                    gwei = wei / Math.pow(10, 9);
                    eth = wei / Math.pow(10, 18);
                } catch (error) {
                    balance = "";
                }
                // wallet data method
                const isConnected = await providerEthereum.isConnected();
                const signer = await provider.getSigner();
                const chainId = Number((await provider.getNetwork()).chainId);
                setState({
                    ...state,
                    address: accounts[0],
                    signer,
                    currentChain: chainId,
                    isAuthenticated: true,
                    isConnected,
                    balanceCalc: { balance, eth, wei, gwei },
                });
                // localStorage
                localStorage.setItem("isAuthenticated", "true");
            }
        } catch {}
    }, [state]);

    const disconnect = () => {
        setState(initialWeb3State);
        localStorage.removeItem("isAuthenticated");
    };

    useEffect(() => {
        if (window == null) return;
        if (localStorage.hasOwnProperty("isAuthenticated")) {
            connectWallet();
        }
    }, [connectWallet, state.isAuthenticated]);

    useEffect(() => {
        if (typeof window.ethereum === "undefined") return;

        window.ethereum.on("accountsChanged", (accounts: string[]) => {
            setState({ ...state, address: accounts[0] });
        });

        window.ethereum.on("networkChanged", (network: string) => {
            setState({ ...state, currentChain: Number(network) });
        });

        return () => {
            window.ethereum.removeAllListeners();
        };
    }, [state]);

    return {
        connectWallet,
        disconnect,
        state,
    };
};

export default useWeb3Provider;
