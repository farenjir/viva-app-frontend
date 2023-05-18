import type { NextPage } from "next";
import SimpleUsage from "../web3Provider";

const TestWalletMock: NextPage = () => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "whitesmoke",
                color: "black !important",
                display: "flex",
                flexFlow:"column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SimpleUsage />
        </div>
    );
};

export default TestWalletMock;
