import React, { useState, useEffect } from "react";
import abi from "./abi.json";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

import ConnectW from "./Imgs/Capture.PNG";
import Img3 from "./Imgs/3.webp";
import Img4 from "./Imgs/4.webp";
import Img5 from "./Imgs/5.webp";
import Img6 from "./Imgs/6.webp";
require("dotenv").config();

const REACT_APP_CONTRACT_ADDRESS = "0xf291383B95115F8ee7C504DF162b198BCdE24AC9";
const SELECTEDNETWORK = "4";
const SELECTEDNETWORKNAME = "Ethereum Mainnet";
const nftquantity = 500;

function Mintbtn() {
  const [errormsg, setErrorMsg] = useState(false);
  const [totalSupply, settotalSupply] = useState("n,nnn");
  const [walletConnected, setWalletConnected] = useState(0);

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
        setErrorMsg('Select "' + SELECTEDNETWORKNAME + '" to MINT');
      }
    } else {
      setErrorMsg("Please install MetaMask!");

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

  async function loadWeb3(q) {
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

        let price = await ct.methods.price().call();
        const Status = await ct.methods.status().call();
        let maxa = await ct.methods.maxPerAdd().call();

        if (Status == 1) {
          let alreadyMinted = await ct.methods
            .balanceOf(metaMaskAccount)
            .call();
          if (Number(alreadyMinted) + Number(q) <= maxa) {
            await ct.methods.presaleMint(q).send({
              from: metaMaskAccount,
              value: price * q,
            });
          } else {
            setErrorMsg("Max " + maxa + " mints allowed in whitelist");
          }
        } else if (Status == 2) {
          await ct.methods.mint(q).send({
            from: metaMaskAccount,
            value: price * q,
          });
        }
        // settotalSupply(await ct.methods.totalSupply().call());
        // setQuantity(1);
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
        setErrorMsg("Please install MetaMask!");
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

        const Status = await ct.methods.status().call();

        if (Status == 0) {
          setErrorMsg("Sale Not started");
        } else if (Status == 1) {
          let wl = await ct.methods.isWhitelisted(metaMaskAccount).call();
          if (wl) {
            setWalletConnected(1);
          } else {
            setErrorMsg("You Are Not Whitelisted");
          }
        } else if (Status == 2) {
          setWalletConnected(1);
        }
      }
    }
  }

  return (
    <div className=" ">
      <div className="container mm mt-5">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-md-4">
            <p className="mount gen my-2 my-md-5 text-center">
              Minted: {totalSupply}\7,900
            </p>
          </div>
          <div className="col-md-4">
            <p className="mount gen my-2 my-md-5 text-center">
              Remaining: {7900 - totalSupply}
            </p>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
      {!errormsg ? (
        <div className="row align-items-center">
          {walletConnected == 0 ? (
            <div className=" col-12">
              <h3
                className=" text-white text-center d-block w-100"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  connectWallet();
                }}
              >
                <img className="conntectImg" src={ConnectW}></img>
              </h3>
            </div>
          ) : (
            ""
          )}
          {walletConnected == 1 ? (
            <div className="container mm mt-5">
              <div className="row">
                <div className="col-md-3 col-12">
                  <img
                    className="imghead w-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // setQuantity(1);
                      // console.log(quantity);
                      loadWeb3(1);
                    }}
                    src={Img3}
                  ></img>
                </div>
                <div className="col-md-3 col-12">
                  <img
                    className="imghead w-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      loadWeb3(5);
                    }}
                    src={Img4}
                  ></img>
                </div>
                <div className="col-md-3 col-12">
                  <img
                    className="imghead w-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      loadWeb3(10);
                    }}
                    src={Img5}
                  ></img>
                </div>
                <div className="col-md-3 col-12 mx-auto">
                  <img
                    className="imghead w-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      loadWeb3(20);
                    }}
                    src={Img6}
                  ></img>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* <p className="mt-3 text-white mx-auto mb-0 text-center">{nftquantity-totalSupply}/{nftquantity} Available</p> */}
        </div>
      ) : (
        <h5 className="errormessage gen">{errormsg}</h5>
      )}
    </div>
  );
}

export default Mintbtn;
