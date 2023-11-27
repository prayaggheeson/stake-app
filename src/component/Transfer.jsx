import { Web3Button, useAddress } from "@thirdweb-dev/react";
import { ACCOUNT2_ADDRESSES, REWARD_TOKEN_ADDRESSES } from "./Constants";

const Transfer = () => {
  const from = "0x94C1Da4F14178AB9c2eB2f8C8351b0B6f383CF72";
  const to = ACCOUNT2_ADDRESSES;
  const amount = "100000000000000000000";
  const ownerAddress = useAddress()

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-8 rounded-xl text-white">
      <h1 className="text-3xl text-center font-bold mb-6">
        Transfer Token from Owners Wallet <span className="text-base text-yellow-500"> {ownerAddress} </span>To Wallet 2
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
