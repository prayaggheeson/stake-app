import {
  ConnectWallet,
  useContract,
  useTokenBalance,
  useAddress,
} from "@thirdweb-dev/react";
import Stake from "./component/Stake";

function App() {
  const address = useAddress();

  const { contract: rewardTokenContract } = useContract(
    "0xE2678a381543Af153165abC3b3F88622CE315EE8"
  );
  const { data: rewardtokenBalance, isLoading: isLoadingTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  const { contract: stakeTokenContract } = useContract(
    "0x32702946083578B514853528119Ecf2a7f0cd664"
  );
  const { data: stakeTokenBalance, isLoading: isLoadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  return (
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen p-4">
      <div className="flex flex-col items-center md:items-start md:flex-row justify-between mb-4">
        <h1 className="text-4xl text-white text-center mb-4 md:mb-0 font-bold">
          DeFi <span className="text-yellow-400">Staking App</span>
        </h1>
        <div className="md:right-0">
          <ConnectWallet className="text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-8 text-white mb-4 rounded-md">
          <h2 className="text-2xl font-semibold">{rewardtokenBalance?.name}</h2>
          {isLoadingTokenBalance ? (
            <p>Loading...</p>
          ) : (
            <p>User Balance: {rewardtokenBalance?.displayValue}</p>
          )}
          {isLoadingTokenBalance ? (
            <p>Loading...</p>
          ) : (
            <p>Token Symbol: {rewardtokenBalance?.symbol}</p>
          )}
        </div>

        <div className="bg-gray-800 p-8 text-white mb-4 rounded-md">
          <h2 className="text-2xl font-semibold">{stakeTokenBalance?.name}</h2>
          {isLoadingStakeTokenBalance ? (
            <p>Loading...</p>
          ) : (
            <p>Stake Token Balance: {stakeTokenBalance?.displayValue}</p>
          )}
          {isLoadingStakeTokenBalance ? (
            <p>Loading...</p>
          ) : (
            <p>Token Symbol: {stakeTokenBalance?.symbol}</p>
          )}
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-md">
        <h2 className="text-2xl text-center mb-4 text-white font-semibold">
          Stake your {stakeTokenBalance?.name} and get rewarded with{" "}
          {rewardtokenBalance?.name}
        </h2>
        <Stake />
      </div>
    </div>
  );
}

export default App;
