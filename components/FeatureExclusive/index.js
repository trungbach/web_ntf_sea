import React from 'react';
import styles from './style.module.scss';
import Link from 'next/link'
import {Card, Button} from 'antd';
import Image from 'next/image'
import meeler from '../../public/meeler-promocard.webp'
import blazer from '../../public/Blazers-Promo-Card.webp'
import swoon from '../../public/swoon-promo-card.webp'
const FeatureExclusive = () => {
    return (
        <div className="container" style={{marginTop: '8rem', marginBottom: '12rem'}}>
            <h2 className={styles.titleHome}>
                Exclusive OpenSea drops
            </h2>
            <div className={`row ${styles.listExclusive}`}>
                <div className="col-4">
                    <Link href='/'>
                        <a>
                            <Card
                                hoverable
                                cover={<Image  alt="hot asset" src={meeler} />}
                            >
                                <div className={styles.exclusiveItem}>
                                    <h3>
                                        Meerler&apos;s Creations
                                    </h3>
                                    <p>
                                        A collection of figurative works from Gavin Meeler
                                    </p>
                                    <Button className={styles.liveBtn}>Live</Button>
                                </div>
                            </Card>
                        </a>
                    </Link>
                </div>
                <div className="col-4">
                    <Link href='/'>
                        <a>
                            <Card
                                hoverable
                                cover={<Image  alt="hot asset" src={blazer} />}
                            >
                                <div className={styles.exclusiveItem} style={{background: 'rgb(10, 132, 139)'}}>
                                    <h3>
                                        Trail Blazers: The Art of Basketball
                                    </h3>
                                    <p>
                                        Own a Piece of History
                                    </p>
                                    <Button className={styles.liveBtn}>Live</Button>
                                </div>
                            </Card>
                        </a>
                    </Link>
                </div>
                <div className="col-4">
                    <Link href='/'>
                        <a>
                            <Card
                                hoverable
                                cover={<Image  alt="hot asset" src={swoon} />}
                            >
                                <div className={styles.exclusiveItem} style={{background: ' rgb(0, 0, 0)'}}>
                                    <h3>
                                        Swoon Solo NFT Exhibition
                                    </h3>
                                    <p>
                                        Swoon&apos;s &quot;CICADA  TYMBAL&quot; Curated by Superchief Gallery NFT
                                    </p>
                                    <Button className={styles.liveBtn}>Live</Button>
                                </div>
                            </Card>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FeatureExclusive;
