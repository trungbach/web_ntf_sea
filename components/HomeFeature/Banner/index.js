import React from 'react';
import styles from './style.module.scss'
import {Card} from 'antd';
import hotItemExtra from '@/public/30.png';
import Link from 'next/link'
import Image from 'next/image'
const Banner = ({mostFavoriteItem}) => {

    console.log("mostFavoriteItem", mostFavoriteItem)
    return (
        <div className={styles.banner}>
            <div className={styles.bannerBackground} style={{backgroundImage: `url(${mostFavoriteItem?.image_url})`}}></div>
            {mostFavoriteItem &&
            <div className={styles.bannerContent}>
                <div className='container h-100'>
                    <div className='row h-100'> 
                        <div className="col-md-6 col-12 d-flex justify-content-center flex-column position-relative">
                            <div className={styles.bannerTitle}>
                                <h1>
                                    Discover, collect, and sell extraordinary NFTs
                                </h1>
                                <span>
                                    on the world&apos;s first & largest NFT marketplace
                                </span>
                            </div>
                            <div className={styles.cta}>
                                <Link href='/assets'><a className={styles.secondaryButton}>Explore</a></Link>
                                {/* <Link href='/create'><a className={styles.primaryButton}>Create</a></Link> */}
                            </div>
                            {/* <div className={styles.getFeatured}>
                                <span>Get featured on the homepage</span>
                            </div> */}
                        </div>
                        <div className={`col-md-6 col-12 ${styles.bannerRight}`}>
                            <div className={styles.hotItem}>
                                <Link href={`/assets/${mostFavoriteItem.owner}/${mostFavoriteItem.id}`}>
                                    <a>
                                        <Card
                                            hoverable
                                            cover={<Image loading='eager' priority='true' src={mostFavoriteItem.image_url}  width={500} height={420} alt={mostFavoriteItem.image_url}/>}
                                        >
                                            <div><Image quality='50' src={hotItemExtra} alt='avatar' /> <span>{mostFavoriteItem.name}</span></div>
                                        </Card>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default Banner;
