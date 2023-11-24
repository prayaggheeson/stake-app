import  { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const Stake = () => {
  const [stakeAmount, setStakeAmount] = useState("0");
  const address = useAddress();
  const { contract: stakeContract } = useContract(
    "0x6A49c2701626e749743483cA8599c46D7069834D",
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    "0xE2678a381543Af153165abC3b3F88622CE315EE8",
    "custom"
  );
  const { contract: stakeTokenContract } = useContract(
    "0x32702946083578B514853528119Ecf2a7f0cd664",
    "token"
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
    const intervalId = setInterval(() => {
      refetchStakeInfo();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  async function handleStake() {
    try {
      await stakeTokenContract?.erc20.setAllowance(stakeContract, stakeAmount);
      await stakeContract.call("stake", [
        ethers.utils.parseEther(stakeAmount),
      ]);
      resetValue();
    } catch (error) {
      console.error("Error while staking:", error);
    }
  }

  function handleClaimRewards() {
    try {
      stakeContract.call("claimRewards");
      resetValue();
    } catch (error) {
      console.error("Error while claiming rewards:", error);
    }
  }

  function resetValue() {
    setStakeAmount("0");
  }

  return (
    <div>
      <div>
        <h2>Stake token balance:</h2>
        {loadingStakeInfo || loadingStakeTokenBalance ? (
          <p>Loading...</p>
        ) : (
          <p>
            {ethers.utils.formatEther(stakeInfo[0])} {stakeTokenBalance?.symbol}
          </p>
        )}
      </div>
      <div>
        <input
          type="number"
          max={stakeTokenBalance?.displayValue}
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
        />
        <button onClick={handleStake}>Stake</button>
      </div>
      <div>
        <h2>Reward token balance:</h2>
        {loadingStakeInfo || loadingRewardTokenBalance ? (
          <p>Loading...</p>
        ) : (
          <p>
            {ethers.utils.formatEther(stakeInfo[1])}{" "}
            {rewardTokenBalance?.symbol}
          </p>
        )}
        <button onClick={handleClaimRewards}>Claim</button>
      </div>
    </div>
  );
};

export default Stake;
