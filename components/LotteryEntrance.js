import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { Button, useNotification } from "web3uikit";
import { ethers } from "ethers";

export default function LotteryEntrance() {
  const { Moralis, chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const dispatch = useNotification();

  /* Getter functions */

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });
  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUIValues() {
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    const numPlayersFromCall = (await getNumberOfPlayers()).toString();
    const recentWinnerFromCall = await getRecentWinner();

    setEntranceFee(entranceFeeFromCall);
    setNumPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      // reads raffle entrance fee
      updateUIValues();
    }
  }, [isWeb3Enabled]);

  const { runContractFunction: enterRaffle, isLoading, isFetching } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // what's the networkId?
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  /* handlers */
  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNewNotification();
    updateUIValues();
  };

  const handleNewNotification = function () {
    dispatch({
      type: "info",
      message: "Transaction complete",
      title: "TX Notification",
      position: "topR",
      icon: "bell",
    });
  };
  return (
    <div className="p-5">
      {raffleAddress ? (
        <div>
          <Button
            onClick={async function () {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.error(error),
              });
            }}
            disabled={isLoading || isFetching}
            type="button"
            theme="primary"
            text="Enter Raffle"
          />
          <div>
            EntranceFee is {ethers.utils.formatUnits(entranceFee, "ether")}
          </div>
          <div>Number of Players: {numPlayers}</div>
          <div>Recent winner {recentWinner}</div>
        </div>
      ) : (
        <div>No Raffle address detected</div>
      )}
    </div>
  );
}
