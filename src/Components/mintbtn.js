import React, { useState, useEffect } from "react";
import abi from "./abi.json";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
require("dotenv").config();

const REACT_APP_CONTRACT_ADDRESS = "0x8Dd24d6B391576624bc82B5Ef04Cb3B68e4Df6A3";
const SELECTEDNETWORK = "1";
const SELECTEDNETWORKNAME = "Ethereum Mainnet";
const nftquantity = 500;

function Mintbtn() {
  const [errormsg, setErrorMsg] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalSupply, settotalSupply] = useState(0);
  const [walletConnected, setWalletConnected] = useState(0);
  const [whitelistedUser, setWhitelistedUser] = useState(0);

  useEffect(async () => {
    if (await detectEthereumProvider()) {
      // setProvider(true);
      window.web3 = new Web3(window.ethereum);
      const web3 = window.web3;
      if ((await web3.eth.net.getId()) == SELECTEDNETWORK) {
        const contractaddress = REACT_APP_CONTRACT_ADDRESS;
        const ct = new web3.eth.Contract(abi, contractaddress);
        settotalSupply(await ct.methods.totalSupply().call());

        if (nftquantity - (await ct.methods.totalSupply().call()) == 0) {
          setErrorMsg("All NFTs minted, Sale has ended");
        }
      } else {
        // setProvider(false);
        setErrorMsg(
          'Select "' +
            SELECTEDNETWORKNAME +
            '" network in your wallet to buy the nft'
        );
      }
    } else {
      setErrorMsg(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      // setProvider(false);
    }
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener("ethereum#initialized", handleEthereum, {
        once: true,
      });
      setTimeout(handleEthereum, 10000);
    }

    function handleEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        console.log("Ethereum successfully detected!");
        // setProvider(true);
      } else {
        setErrorMsg("Please install MetaMask!");
        // setProvider(false);
      }
    }
  }, []);

  async function loadWeb3() {
    if (await detectEthereumProvider()) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      // Meta Mask Connected Account Address
      let metaMaskAccount = await web3.eth.getAccounts();
      metaMaskAccount = metaMaskAccount[0];

      if ((await web3.eth.net.getId()) == SELECTEDNETWORK) {
        // // creating contract instance
        const contractaddress = REACT_APP_CONTRACT_ADDRESS;
        const ct = new web3.eth.Contract(abi, contractaddress);
        let current = await ct.methods.totalSupply().call();
        if (Number(current) === nftquantity) {
          console.log("Sold out");
          return;
        }

        let price = 25 * 10 ** 15; //await ct.methods.getPrice().call();
        await ct.methods
          .mint(quantity)
          .send({ from: metaMaskAccount, value: price * quantity });
        settotalSupply(await ct.methods.totalSupply().call());
        setQuantity(1);
      } else {
        setErrorMsg(
          'Select "' +
            SELECTEDNETWORKNAME +
            '" network in your wallet to buy the nft'
        );
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert(
      //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
      // );
      {
        setErrorMsg(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }
  }

  async function connectWallet() {
    if (await detectEthereumProvider()) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;

      if ((await web3.eth.net.getId()) == SELECTEDNETWORK) {
        // // creating contract instance
        const contractaddress = REACT_APP_CONTRACT_ADDRESS;
        const ct = new web3.eth.Contract(abi, contractaddress);

        let metaMaskAccount = await web3.eth.getAccounts();
        metaMaskAccount = metaMaskAccount[0];

        let statusone = await ct.methods.getStatus().call();

        if (statusone == 2 || statusone == 1) {
          setWalletConnected(1);
          if (statusone == 1) {
            let wl = await ct.methods.isWhitelisted(metaMaskAccount).call();
            console.log(wl);
            if (wl) setWhitelistedUser(1);
            else setWhitelistedUser(2);
          } else if (statusone == 2) setWhitelistedUser(1);
        } else {
          setWalletConnected(2);
        }
      }
    }
  }

  return (
    <div className="BtnDiv">
      {!errormsg ? (
        <div className="row align-items-center">
          {walletConnected == 0 ? (
            <div className="col-12">
              <button
                onClick={() => {
                  connectWallet();
                }}
                className="connectbtn btn text-white d-block w-100"
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            ""
          )}
          {walletConnected == 1 ? (
            <>
              {whitelistedUser == 1 ? (
                <>
                  <div className="col-sm-5">
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="count btn mx-3 "
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity == 1}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <span className="quantity"> {quantity} </span>
                      <button
                        className="count btn mx-3 "
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={quantity == 5}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-7 pt-3 pt-sm-0">
                    <button
                      type="button"
                      className="connectbtn btn text-white d-block w-100"
                      onClick={() => loadWeb3()}
                    >
                      Mint A Crab
                    </button>
                  </div>
                </>
              ) : (
                <h4 className="text-center text-white teamname w-100">
                  Not Whitelisted, Please wait for public sale
                </h4>
              )}
            </>
          ) : (
            ""
          )}
          {walletConnected == 2 ? (
            <h6 className="text-center text-white teamname w-100">
              Sale Ended
            </h6>
          ) : (
            ""
          )}
          {/* <p className="mt-3 text-white mx-auto mb-0 text-center">{nftquantity-totalSupply}/{nftquantity} Available</p> */}
        </div>
      ) : (
        <h5 className="mt-2 supplytext">
          <b>{errormsg}</b>
        </h5>
      )}
    </div>
  );
}

export default Mintbtn;
