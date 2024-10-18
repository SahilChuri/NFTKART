"use client";
import { WalletContext } from "@/context/wallet";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";

export default function Header() {
  const {
    isConnected,
    setIsConnected,
    userAddress,
    setUserAddress,
    signer,
    setSigner,
  } = useContext(WalletContext);
  
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("Metamask is not installed");
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      const accounts = await provider.send("eth_requestAccounts", []);
      setIsConnected(true);
      setUserAddress(accounts[0]);
      const network = await provider.getNetwork();
      const chainID = network.chainId;
      const sepoliaNetworkId = "11155111";

      if (chainID.toString() !== sepoliaNetworkId) {
        alert("Please switch your MetaMask to sepolia network");
        return;
      }
    } catch (error) {
      console.error("connection error: ", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.png" width={400} height={50} alt="logo" />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            
            <li>
              <Link href="/profile" className={styles.link}>
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
          </ul>

          <button
            className={`${styles.ctaBtn} ${
              isConnected ? styles.activebtn : styles.inactivebtn
            }`}
            onClick={connectWallet}
          >
            {isConnected ? (
              <>{userAddress?.slice(0, 8)}...</>
            ) : (
              "Connect wallet"
            )}
          </button>

          <div className={styles.hamburgerMenu}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={toggleDropdown}
              className={styles.hamburgerIcon}
            />
            {dropdownVisible && (
              <div className={styles.dropdownMenu}>
                <Link href="/marketplace" className={styles.link}>
                  MarketPlace
                </Link>
                <Link href="/sellNFT" className={styles.link}>
                  List NFT
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
