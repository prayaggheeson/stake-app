import { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  STAKE_CONTRACT_ADDRESSES,
  STAKE_TOKEN_ADDRESSES,
  REWARD_TOKEN_ADDRESSES,
} from "./Constants";
import { ethers } from "ethers";

const Stake = () => {
  const address = useAddress();

  const { contract: stakeTokenContract } = useContract(
    STAKE_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    REWARD_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: stakeContract } = useContract(
    STAKE_CONTRACT_ADDRESSES,
    "custom"
  );

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
    isLoading: loadingStakeInfo,
  } = useContractRead(stakeContract, "getStakeInfo", [address]);

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 10000);
  }, );

  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");
  const [depositAmount, setDepositAmount] = useState("0");

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
    setDepositAmount("0");
  }

  return (
    <div className="container mx-auto p-4  text-white rounded-xl">
      <h1 className="text-3xl text-center text-yellow-400 font-bold mb-4">
        Stake Your Token
      </h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
        {/* Stake Token Section */}
        <div className="flex-1 border p-4 rounded-md bg-gradient-to-r from-purple-800 to-blue-800">
          <h3 className="text-green-500 text-2xl mb-4 font-semibold">
            Stake Token:
          </h3>
          {loadingStakeInfo || loadingStakeTokenBalance ? (
            <p>Loading...</p>
          ) : (
            <p className="text-lg">
              {ethers.utils.formatEther(stakeInfo[0])}{" "}
              {stakeTokenBalance?.symbol}
            </p>
          )}

          <div className="mt-4 space-y-2">
            <input
              type="number"
              max={stakeTokenBalance?.displayValue}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="border p-3 rounded-md bg-gray-700 text-white"
            />
            <button
              onClick={async () => {
                await stakeTokenContract?.erc20.setAllowance(
                  STAKE_CONTRACT_ADDRESSES,
                  stakeAmount
                );
                await stakeContract.call("stake", [
                  ethers.utils.parseEther(stakeAmount),
                ]);
                resetValue();
                alert("Stake success");
              }}
              className="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Stake Now
            </button>
          </div>
        </div>

        {/* Unstake Token Section */}
        <div className="flex-1 mt-4 md:mt-0 border rounded-lg p-4 bg-gradient-to-r from-red-800 to-pink-800">
          <h3 className="text-rose-500 text-2xl mb-4 font-semibold">
            Unstake Token:
          </h3>
          <div>
            <input
              type="number"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              className="border p-3 rounded-md bg-gray-700 text-white"
            />
            <button
              onClick={async () => {
                await stakeContract.call("withdraw", [
                  ethers.utils.parseEther(unstakeAmount),
                ]);
                resetValue();
                alert("Unstake success");
              }}
              className="bg-red-500 text-white px-5 py-3 rounded-md mt-4 hover:bg-red-600 transition duration-300"
            >
              Unstake Now
            </button>
          </div>
        </div>

        {/* Reward Token Section */}
        <div className="flex-1 mt-4 border p-4 rounded-md bg-gradient-to-r from-yellow-900 to-purple-800">
          <h3 className="text-yellow-500 text-2xl mb-4 font-semibold">
            Reward Token
          </h3>
          {loadingStakeInfo || loadingRewardTokenBalance ? (
            <p>Loading...</p>
          ) : (
            <p className="text-lg">
              {ethers.utils.formatEther(stakeInfo[1])}{" "}
              {rewardTokenBalance?.symbol}
            </p>
          )}

          <div className="mt-4 space-y-2">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="border p-3 rounded-md bg-gray-700 text-white"
            />
            <Web3Button
              contractAddress="0x6A49c2701626e749743483cA8599c46D7069834D"
              action={(contract) => {
                contract.call("depositRewardTokens", [depositAmount]);
              }}
              onSuccess={() => {
                resetValue();
                alert("Deposit success");
              }}
              className="bg-green-500 ml-4 text-white px-5 py-3 rounded-md hover:bg-green-600 transition duration-300"
            >
              Deposit Reward Tokens
            </Web3Button>
            <button
              onClick={async () => {
                await stakeContract.call("claimRewards");
                resetValue();
                alert("Claimed rewards");
              }}
              className="m-4 bg-purple-500 text-white px-5 py-3 rounded-md hover:bg-purple-600 transition duration-300"
            >
              Claim All Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
