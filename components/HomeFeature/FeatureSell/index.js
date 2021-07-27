import React from 'react';
import walletFeature from '@/public/walletFeature.svg';
import collectionFeature from '@/public/collectionFeature.svg';
import nftFeature from '@/public/nftFeature.svg';
import Image from 'next/image'
import Link from 'next/link'
import styles from './style.module.scss';
import saleFeature from '@/public/saleFeature.svg';
const FeatureSell = () => {
    return (
        <div className={`container ${styles.featureSell}`}>
            <h2 className={styles.titleHome}>
                Create and sell your NFTs
            </h2>
            <div className="row">
                <div className="col-3">
                    <div className={styles.sellItems}>
                        <Image src={walletFeature} alt="wallet" />
                        <h4>Set up your wallet</h4>
                        <p>
                            Once you’ve set up your wallet of choice, 
                            connect it to OpenSea by clicking the wallet 
                            icon in the top right corner. Learn about the <Link href='https://support.opensea.io/hc/en-us/articles/1500007978402-Wallets-supported-by-OpenSea'>wallets we support.</Link>
                        </p>
                    </div>
                </div>
                <div className="col-3">
                    <div className={styles.sellItems}>
                        <Image src={collectionFeature} alt="collectionFeature" />
                        <h4>Create your collection</h4>
                        <p>
                            Click <Link href='/collections'>Create</Link>  and set up your collection. Add social links, 
                            a description, profile &amp; banner images, and set a secondary sales fee.
                        </p>
                    </div>
                </div>
                <div className="col-3">
                    <div className={styles.sellItems}>
                        <Image src={nftFeature} alt="nftFeature" />
                        <h4>Add your NFTs</h4>
                        <p>
                            Upload your work (image, video, audio, or 3D art), add a title and description, 
                            and customize your NFTs with properties, stats, and unlockable content.
                        </p>
                    </div>
                </div>
                <div className="col-3">
                    <div className={styles.sellItems}>
                        <Image src={saleFeature} alt="saleFeature" />
                        <h4>List them for sale</h4>
                        <p>
                        Choose between auctions, fixed-price listings, and declining-price listings. 
                        You choose how you want to sell your NFTs, and we help you sell them!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeatureSell;
