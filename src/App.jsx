import { ConnectWallet, useContract, useTokenBalance, useAddress } from "@thirdweb-dev/react";
import Stake from "./component/Stake";

function App() {
  const address = useAddress();

  const { contract: rewardTokenContract } = useContract("0xE2678a381543Af153165abC3b3F88622CE315EE8");
  const { data: rewardtokenBalance, isLoading: isLoadingTokenBalance } = useTokenBalance(rewardTokenContract, address);

  const { contract: stakeTokenContract } = useContract("0x32702946083578B514853528119Ecf2a7f0cd664");
  const { data: stakeTokenBalance, isLoading: isLoadingStakeTokenBalance } = useTokenBalance(stakeTokenContract, address);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
    <div className="flex flex-col items-center md:items-start md:flex-row justify-between mb-4">
      <h1 className="text-4xl text-sky-400 text-center mb-4 md:mb-0">DeFi <span className="text-black">Staking App</span></h1>
      <div className="md:right-0">
        <ConnectWallet className="" />
      </div>
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-900 p-8 text-white mb-4 rounded-md">
        <h2 className="text-2xl">{rewardtokenBalance?.name}</h2>
        {isLoadingTokenBalance ? <h5>Loading...</h5> : <h5>User Balance:{"  "} {rewardtokenBalance?.displayValue}</h5>}
        {isLoadingTokenBalance ? <h5>Loading...</h5> : <h5>Token Symbol:{"  "} {rewardtokenBalance?.symbol}</h5>}
      </div>
  
      <div className="bg-gray-900 p-8 text-white mb-4 rounded-md">
        <h2 className="text-2xl">{stakeTokenBalance?.name}</h2>
        {isLoadingStakeTokenBalance ? <h5>Loading...</h5> : <h5>Stake Token Balance:{"  "} {stakeTokenBalance?.displayValue}</h5>}
        {isLoadingStakeTokenBalance ? <h5>Loading...</h5> : <h5>Token Symbol:{"  "} {stakeTokenBalance?.symbol}</h5>}
      </div>
    </div>
  
    <div className="p-8 rounded-md">
      <h2 className="text-2xl text-center mb-4">Stake your {stakeTokenBalance?.name} And Get in Rewards get {rewardtokenBalance?.name} </h2>
      <Stake />
    </div>
  </div>
  
  );
}

export default App;
