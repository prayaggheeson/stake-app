import { ConnectWallet, useContract, useTokenBalance, useAddress } from "@thirdweb-dev/react"
import Stake from "./component/Stake";


function App() {
  const address = useAddress();

  const { contract: rewardTokenContract } = useContract("0xE2678a381543Af153165abC3b3F88622CE315EE8");
  const { data: rewardtokenBalance, isLoading: isLoadingTokenBalance  } = useTokenBalance(rewardTokenContract, address);

  
 

  const { contract: stakeTokenContract } = useContract("0x32702946083578B514853528119Ecf2a7f0cd664");
  const { data: stakeTokenBalance, isLoading: isLoadingStakeTokenBalance } = useTokenBalance(stakeTokenContract, address);
 
  return (
    <>
     <h1 className='text-4xl text-sky-400 text-center'>DeFi <span className="text-black">Staking App</span></h1>
     <ConnectWallet className="justify-center"/>
     <div className="bg-gray-500 p-8 text-white">
      <h2 className="text-2xl text-white">{rewardtokenBalance?.name}</h2>
      {isLoadingTokenBalance ? <h5>is loading</h5> : <h5>User Balance:{"  "} {rewardtokenBalance?.displayValue}</h5>}
      {isLoadingTokenBalance ? <h5>is loading</h5> : <h5>Token Symbol:{"  "} {rewardtokenBalance?.symbol}</h5>}      
     </div>
    

     <div className="bg-gray-400 p-8 text-white">
      <h2 className="text-2xl text-white">{stakeTokenBalance?.name}</h2>
      
      {isLoadingStakeTokenBalance ? <h5>is loading</h5> : <h5>Stake Token Balance:{"  "} {stakeTokenBalance?.displayValue}</h5>}
      {isLoadingStakeTokenBalance ? <h5>is loading</h5> : <h5>Token Symbol:{"  "} {stakeTokenBalance?.symbol}</h5>}      
      </div>


      <div className="bg-yellow-500">
      <h2 className="text-2xl text-center">Stake your {stakeTokenBalance?.name} And Get in Rewards get {rewardtokenBalance?.name} </h2>

     <Stake/>
     </div>
    </>
  )
}

export default App
