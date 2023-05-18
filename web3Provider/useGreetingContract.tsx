import { useMemo } from "react";
import { Contract } from "ethers";
import { IWeb3Context, useWeb3Context } from "./Web3ContextProvider";
import VStakeABI from "./stake/VStakeABI.json";

const { result: ABI } = JSON.parse(JSON.stringify(VStakeABI));

const stakeAddress = "0x6F6d1E5Db537203C880A60e77EA0EED99a068e0c";

const useGreetingContract = () => {
    const { state } = useWeb3Context() as IWeb3Context;

    return useMemo(
        () => state?.signer && new Contract(stakeAddress, JSON.parse(ABI), state.signer),
        [state?.signer]
    );
};

export default useGreetingContract;
