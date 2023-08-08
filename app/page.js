"use client";
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";
import { NotificationProvider } from "web3uikit";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between lg:flex">
        <MoralisProvider appId="lottery-app" initializeOnMount={false}>
          <NotificationProvider>
            <Header />
            <LotteryEntrance />
          </NotificationProvider>
        </MoralisProvider>
      </div>
    </main>
  );
}
