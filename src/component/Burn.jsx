import { Web3Button } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES, ACCOUNT1_ADDRESSES } from "./Constants";

const Burn = () => {
    const to = ACCOUNT1_ADDRESSES;
    const amount = "100000000000000000000";
  return (
   
      <div className="bg-gradient-to-r from-rose-400 to-lime-500 p-8 rounded-xl text-white flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold mb-6">
        Burn Token From Owners Wallet{" "} to A specific Account
      </h1>
      <Web3Button
        contractAddress={REWARD_TOKEN_ADDRESSES}
        action={(contract) => {
          contract.call("burnFrom", [to, amount]);
        }}
    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mb-6"
      >
        Burn from Account
      </Web3Button>
    </div>

  )
}

export default Burn
