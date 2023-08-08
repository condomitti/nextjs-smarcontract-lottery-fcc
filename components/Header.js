import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="border-b-4 my-4 flex flex-row">
      <h1 className="font-blog text-3xl py-4 px-4">Decentralized Lottery</h1>
      <div className="ml-auto py-2 px-4">
      <ConnectButton moralisAuth={false} />

      </div>
    </div>
  );
}
