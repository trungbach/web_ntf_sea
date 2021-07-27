import React from 'react';
import styles from './style.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import eth from '@/public/eth.svg'
import polygon from '@/public/polygon.svg'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { Card } from 'antd';
import itemThumb from '@/public/itemThumb.png';

const ItemSell = () => {
    return (
        <div className={styles.sellItemContainer}>
            <Link href='/' >
                    <a className={styles.sellItem}>
                        <Card
                            hoverable
                        >
                            <div className={styles.itemFavorite}>
                                <FavoriteBorderIcon /> <span>1</span>
                            </div>
                            <div className={styles.itemImg}>
                                <Image  alt="hot asset" src={itemThumb} />
                            </div>
                            <div className={styles.sellItemContent}>
                                <div>
                                    <div>
                                        Zed Run <VerifiedUserIcon />
                                        <div className={styles.ownerName}>Kirby</div>
                                    </div>
                                    <div className={styles.itemPrice}>
                                        <span>Price</span>
                                        <div><Image src={eth} alt='eth'></Image> 0,089</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.itemType}>
                                        <Image src={polygon} alt='polygon'></Image>
                                    </div>
                                    <div className={styles.itemCoin}>
                                        Offer for <Image src={eth} alt='eth'></Image> <span>0,045</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </a>
                </Link>
        </div>
    );
}
export default ItemSell;
