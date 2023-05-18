import { useMemo, useState } from "react";
import Link from "next/link";

import { IWeb3Context, useWeb3Context } from "./Web3ContextProvider";
import useGreeting from "./useGreeting";
import useGreet from "./useGreet";

const BSCTChainID = 1;

export default function SimpleUsage() {
    const [newMessage, setNewMessage] = useState<string>("");
    // hooks
    const {
        connectWallet,
        disconnect,
        state: { isAuthenticated, address, currentChain },
    } = useWeb3Context() as IWeb3Context;
    const { lastGreeter, lastMessage } = useGreeting();
    const { greet, loading } = useGreet();
    // correctNetwork
    const correctNetwork = useMemo(() => {
        return currentChain === BSCTChainID;
    }, [currentChain]);
    // handleSubmit
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (newMessage.trim() !== "") {
            greet(newMessage);
        }
    };
    // return
    return (
        <>
            {isAuthenticated &&
                (correctNetwork ? (
                    <>
                        <p>Last message: {lastMessage ? lastMessage : "Loading..."}</p>
                        <div>
                            <p>Last greeter: </p>
                            <Link
                                href={lastGreeter ? `https://mumbai.polygonscan.com/address/${lastGreeter}` : ""}
                                target="_blank"
                                passHref
                            >
                                <p>
                                    {lastGreeter
                                        ? lastGreeter.toLowerCase() === address?.toLowerCase()
                                            ? "You"
                                            : lastGreeter
                                        : "Loading..."}
                                </p>
                            </Link>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter new message..."
                            name="message"
                            value={newMessage}
                            style={{ background: "white", margin: "20px" }}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </>
                ) : (
                    <p>Please switch to BSC</p>
                ))}
        </>
    );
}
