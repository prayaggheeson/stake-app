import React, { useEffect, useState } from "react";
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
  }, []);

  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");
  const [depositAmount, setDepositAmount] = useState("0"); // New state for deposit amount

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
    setDepositAmount("0");
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 rounded-xl text-white">
      <h1 className="text-3xl text-center text-blue-500 font-bold mb-4">
        Stake Your Token
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stake and Unstake Token Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Stake Token Section */}
          <div className="border w-full md:w-auto p-4 flex flex-col rounded-md bg-gray-800">
            <div>
              <h3 className="text-green-500 text-xl mb-2">Stake Token:</h3>
              {loadingStakeInfo || loadingStakeTokenBalance ? (
                <p className="text-white">Loading...</p>
              ) : (
                <p className="text-white">
                  {ethers.utils.formatEther(stakeInfo[0])}{" "}
                  {stakeTokenBalance?.symbol}
                </p>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <input
                type="number"
                max={stakeTokenBalance?.displayValue}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="border p-2 rounded-md bg-gray-700 text-white"
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
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Stake
              </button>
            </div>
          </div>

          {/* Unstake token section */}
          <div className="mt-4 w-full md:w-auto space-y-2 border rounded-lg p-4 bg-gray-800">
            <h3 className="text-red-500 text-xl mb-2">Unstake Token:</h3>
            <div>
              <input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="border p-2 rounded-md bg-gray-700 text-white"
              />
              <button
                onClick={async () => {
                  await stakeContract.call("withdraw", [
                    ethers.utils.parseEther(unstakeAmount),
                  ]);
                  resetValue();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Unstake
              </button>
            </div>
          </div>
        </div>

        {/* Reward Token Section */}
        <div className="border p-4 rounded-md bg-gray-800 col-span-2">
          <h3 className="text-yellow-500">Reward Token:</h3>
          {loadingStakeInfo || loadingRewardTokenBalance ? (
            <p>Loading...</p>
          ) : (
            <p>
              {ethers.utils.formatEther(stakeInfo[1])}{" "}
              {rewardTokenBalance?.symbol}
            </p>
          )}

          <div className="mt-4 space-y-2">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="border p-2 rounded-md bg-gray-700 text-white"
            />
            <Web3Button
              contractAddress="0x6A49c2701626e749743483cA8599c46D7069834D"
              action={(contract) => {
                contract.call("depositRewardTokens", [depositAmount]);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Deposit Reward Tokens
            </Web3Button>
          </div>

          <button
            onClick={async () => {
              await stakeContract.call("claimRewards");
              resetValue();
            }}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stake;
