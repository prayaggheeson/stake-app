import {
  useTransferBatchToken,
  useContract,
  Web3Button,
  useAddress,
  
} from "@thirdweb-dev/react";
import {
  ACCOUNT2_ADDRESSES,
  ACCOUNT3_ADDRESSES,
  REWARD_TOKEN_ADDRESSES,
} from "./Constants";

const contractAddress = REWARD_TOKEN_ADDRESSES;

function AirDrop() {
  const { contract } = useContract(contractAddress, "token");
  const { mutateAsync: transferBatchToken } = useTransferBatchToken(contract);
  const ownerAddress = useAddress();



  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-xl text-white flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold mb-6">
        AIR DROP TO MULTIPLE ACCOUNTS from Owners Wallet:-{" "}
        <span className="text-blue-500 text-base">{ownerAddress}</span>
      </h1>
      
      <Web3Button
        contractAddress={contractAddress}
        action={() =>
          transferBatchToken([
            {
              to: ACCOUNT2_ADDRESSES,
              amount: 10,
            },
            {
              to: ACCOUNT3_ADDRESSES,
              amount: 20,
            },
          ])
        }
        onSuccess={() => alert(`Success! The transfer ${ACCOUNT2_ADDRESSES} & ${ACCOUNT3_ADDRESSES} went through.`)}
        onError={(error) => alert(`Error: ${error}`)}
        className="bg-purple-500 text-white px-5 py-3 rounded-md hover:bg-purple-600 transition duration-300 mt-auto"
      >
        Air drop to Accounts
      </Web3Button>
     
    </div>
  );
}

export default AirDrop;
