import React from 'react';
import styles from './style.module.scss'
import {Card} from 'antd';
import hotItem from '@/public/hotItem.png';
import hotItemExtra from '@/public/30.png';
import Link from 'next/link'
import Image from 'next/image'
const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.bannerBackground}>
            </div>
            <div className={styles.bannerContent}>
                <div className='container h-100'>
                    <div className='row h-100'> 
                        <div className="col-6 d-flex justify-content-center flex-column position-relative">
                            <div className={styles.bannerTitle}>
                                <h1>
                                    Discover, collect, and sell extraordinary NFTs
                                </h1>
                                <span>
                                    on the world&apos;s first & largest NFT marketplace
                                </span>
                            </div>
                            <div className={styles.cta}>
                                <Link href='/'>Explore</Link>
                                <Link href='/collections'>Create</Link>
                            </div>
                            <div className={styles.getFeatured}>
                                <span>Get featured on the homepage</span>
                            </div>
                        </div>
                        <div className={`col-6 ${styles.bannerRight}`}>
                            <div className={styles.hotItem}>
                                <Link href={`/assets/1`}>
                                    <a>
                                        <Card
                                            hoverable
                                            cover={<Image width={500} height={420} alt="hot asset" src={hotItem} />}
                                        >
                                            <div><Image src={hotItemExtra} alt='30' /> <span>THOUGHTS</span></div>
                                        </Card>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
