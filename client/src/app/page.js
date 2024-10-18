"use client";
import Image from "next/image";
import Header from "./components/header/Header";
import styles from "./page.module.css";
import Footer from "./components/footer/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heading}>
            Discover Unique NFT Art Collections!
          </h1>
          <p className={styles.description}>
            Join NFTKART, where every digital creation opens up a new world of possibilities.
          </p>
          <div className={styles.btns}>
            <Link href="/marketplace" className={`${styles.btn} ${styles.buyBtn}`}>
              Explore Marketplace
            </Link>
            <Link href="/sellNFT" className={styles.btn}>
              List Your Art
            </Link>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/pic2.webp"
            alt="NFTs"
            layout="responsive"
            width={1400}  // Increase the width value
            height={800}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h2 className={styles.featureHeading}>Why Choose Us?</h2>
          <p className={styles.featureDescription}>
            NFTKART offers a user-friendly platform for both buyers and sellers, ensuring a smooth and secure trading experience.
          </p>
        </div>
        <div className={styles.feature}>
          <h2 className={styles.featureHeading}>Diverse Collections</h2>
          <p className={styles.featureDescription}>
            Browse through an extensive collection of NFT art from various creators worldwide, with new art being added daily.
          </p>
        </div>
        <div className={styles.feature}>
          <h2 className={styles.featureHeading}>Community Driven</h2>
          <p className={styles.featureDescription}>
            Join a vibrant community of artists, collectors, and enthusiasts. Share your thoughts and experiences with like-minded individuals.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
