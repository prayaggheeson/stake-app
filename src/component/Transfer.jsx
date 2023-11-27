import React from "react";
import { Web3Button } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES } from "./Constants";

const Transfer = () => {
  const from = "0x94C1Da4F14178AB9c2eB2f8C8351b0B6f383CF72";
  const to = "0x8441e0d9626a92cc0Fc8fb5b9edB0e605806DEeC";
  const amount = "100000000000000000000";

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-8 rounded-xl text-white">
      <h1 className="text-3xl text-center font-bold mb-6">
        Transfer Token from Wallet 1 To Wallet 2
      </h1>

      <Web3Button
        contractAddress={REWARD_TOKEN_ADDRESSES}
        action={async (contract) =>
          await contract.call("transferFrom", [from, to, amount])
        }
        onSuccess={() => alert("Success! The transfer went through.")}
        onError={(error) => alert(`Error: ${error}`)}
        className="bg-green-500 text-white px-5 py-3 rounded-md hover:bg-green-600 transition duration-300"
      >
        Transfer
      </Web3Button>
    </div>
  );
};

export default Transfer;
