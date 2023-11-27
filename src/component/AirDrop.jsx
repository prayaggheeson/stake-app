import React from "react";
import { useTransferBatchToken, useContract, Web3Button } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES } from "./Constants";

// Your smart contract address
const contractAddress = REWARD_TOKEN_ADDRESSES;

function AirDrop() {
  const { contract } = useContract(contractAddress, "token");
  const { mutateAsync: transferBatchToken } = useTransferBatchToken(contract);

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-xl text-white">
      <h1 className="text-3xl text-center font-bold mb-6">
        AIR DROP TO MULTIPLE ACCOUNTS
      </h1>

      <Web3Button
        contractAddress={contractAddress}
        action={() =>
          transferBatchToken([
            {
              to: "0x38426F0265c84D38963286E1232d64cf23696996",
              amount: 10,
            },
            {
              to: "0x8441e0d9626a92cc0Fc8fb5b9edB0e605806DEeC",
              amount: 20,
            },
          ])
        }
        className="bg-purple-500 text-white px-5 py-3 rounded-md hover:bg-purple-600 transition duration-300"
      >
        Transfer Batch Tokens
      </Web3Button>
    </div>
  );
}

export default AirDrop;
