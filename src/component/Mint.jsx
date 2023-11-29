import { Web3Button } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES, ACCOUNT3_ADDRESSES } from "./Constants";

const Mint = () => {
  const to = ACCOUNT3_ADDRESSES;
  const amount = "100000000000000000000";
  return (
    <div className="bg-gradient-to-r from-rose-400 to-emerald-500 p-8 rounded-xl text-white flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold mb-6">
        Mint Token From Owners Wallet{" "} to A specific Account
      </h1>
      <Web3Button
        contractAddress={REWARD_TOKEN_ADDRESSES}
        action={(contract) => {
          contract.call("mintTo", [to, amount]);
        }}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-6"
      >
        Mint to Account
      </Web3Button>
    </div>
  );
};

export default Mint;
