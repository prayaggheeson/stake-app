import { Web3Button, useAddress } from "@thirdweb-dev/react";
import { ACCOUNT1_ADDRESSES, ACCOUNT2_ADDRESSES, REWARD_TOKEN_ADDRESSES } from "./Constants";

const Transfer = () => {
  const from = ACCOUNT1_ADDRESSES;
  const to = ACCOUNT2_ADDRESSES;
  const amount = "100000000000000000000";
  const ownerAddress = useAddress()

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-8 rounded-xl text-white flex flex-col items-center">
    <h1 className="text-3xl text-center font-bold mb-6">
      Transfer Token from Owners Wallet{" "}
      <span className="text-base text-yellow-500">{ownerAddress}</span> To Wallet 2
    </h1>
  
    <Web3Button
      contractAddress={REWARD_TOKEN_ADDRESSES}
      action={async (contract) =>
        await contract.call("transferFrom", [from, to, amount])
      }
      onSuccess={() => alert("Success! The transfer went through.")}
      onError={(error) => alert(`Error: ${error}`)}
      className="bg-green-500 text-white px-5 py-3 rounded-md hover:bg-green-600 transition duration-300 mt-auto"
    >
      Transfer
    </Web3Button>
  </div>
  
  );
};

export default Transfer;
