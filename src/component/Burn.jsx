import { Web3Button } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES, ACCOUNT3_ADDRESSES } from "./Constants";

const Burn = () => {
    const to = ACCOUNT3_ADDRESSES;
    const amount = "100000000000000000000";
  return (
   
      <div className="bg-gradient-to-r from-rose-400 to-indigo-500 p-8 rounded-xl text-white flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold mb-6">
        Mint to A specific Account
      </h1>
      <Web3Button
        contractAddress={REWARD_TOKEN_ADDRESSES}
        action={(contract) => {
          contract.call("burnFrom", [to, amount]);
        }}
      >
        Burn from Accoun
      </Web3Button>
    </div>

  )
}

export default Burn
