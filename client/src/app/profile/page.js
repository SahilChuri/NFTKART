"use client";
import { WalletContext } from "@/context/wallet";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceJson from "../marketplace.json";
import styles from "./profile.module.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import axios from "axios";
import NFTTile from "../components/nftCard/NFTCard";

export default function Profile() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const { isConnected, userAddress, signer } = useContext(WalletContext);

  async function getNFTitems() {
    let sumPrice = 0;
    const itemsArray = [];
    if (!signer) return;

    let contract = new ethers.Contract(
      MarketplaceJson.address,
      MarketplaceJson.abi,
      signer
    );

    try {
      // Fetch all NFTs from the contract
      let transaction = await contract.getMyNFTs();

      // Loop through each NFT to check ownership
      for (const i of transaction) {
        const tokenId = parseInt(i.tokenId);
        const tokenURI = await contract.tokenURI(tokenId);
        const meta = (await axios.get(tokenURI)).data;
        const price = ethers.formatEther(i.price);

        // Ensure the item is only added if the user is the owner
        if (i.seller.toLowerCase() === userAddress.toLowerCase()) {
          const item = {
            price,
            tokenId,
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          };

          itemsArray.push(item);
          sumPrice += Number(price);
        }
      }
    } catch (error) {
      console.error("Error fetching NFT items:", error);
    }

    return { itemsArray, sumPrice };
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!isConnected) return; // Only fetch if connected

      try {
        const { itemsArray, sumPrice } = await getNFTitems();
        setItems(itemsArray);
        setTotalPrice(sumPrice);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };

    fetchData();
  }, [isConnected, signer]); // Add signer as a dependency

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          {isConnected ? (
            <div className={styles.profileContainer}>
              <div className={styles.profileBox}>
                <h2 className={styles.heading}>Profile Details</h2>
                <div className={styles.userInfo}>
                  <span className={styles.label}>Wallet Address:</span>
                  <span className={styles.address}>{userAddress}</span>
                </div>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.label}>Total Value:</span>
                    <span className={styles.value}>{totalPrice} ETH</span>
                  </div>
                </div>
              </div>
              <div className={styles.nftBox}>
                <h2 className={styles.heading}>Your NFTs</h2>
                {items.length > 0 ? (
                  <div className={styles.nftGrid}>
                    {items.map((value, index) => (
                      <NFTTile item={value} key={index} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noNFT}>Loading NFTs...</div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.notConnected}>Connect to your Metamask ...</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
