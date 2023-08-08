"use client";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function ManualHeader() {
  // const { enableWeb3, account, isWeb3Enabled, Moralis, isWeb3EnableLoading } =
  //   useMoralis();

  // useEffect(() => {
  //   if (isWeb3Enabled) return;
  //   if (typeof window !== "undefined") {
  //     if (window.localStorage.getItem("connected")) {
  //       enableWeb3();
  //     }
  //   }
  //   enableWeb3();
  // }, [isWeb3Enabled]);

  // useEffect(() => {
  //   Moralis.onAccountChanged((account) => {
  //     if (account == null) {
  //       window.localStorage.removeItem("connected");
  //       deactivateWeb3();
  //     }
  //   });
  // }, []);

  return (
    <>
      <h1>Vamos ver o que dá</h1>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}!
        </div>
      ) : (
        <button
          type="button"
          onClick={async () => {
            await enableWeb3();
            window.localStorage.setItem("connected", "injected");
          }}
          disabled={isWeb3EnableLoading}
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Connect
        </button>
      )}
    </>
  );
}
