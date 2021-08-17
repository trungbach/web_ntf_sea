import React from 'react';
import styles from './style.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import eth from '@/public/eth.svg'
import { Card } from 'antd';

const ItemSell = ({item}) => {
    return (
        <div className={styles.sellItemContainer}>
            <Link href={`/assets/${item.owner}/${item.item_id || item.id}`} >
                    <a className={styles.sellItem}>
                        <Card
                            hoverable
                        >
                            <div className={styles.itemFavorite}>
                                <FavoriteBorderIcon /> <span>{item.number_favorites}</span>
                            </div>
                            <div className={styles.itemImg}>
                                <Image objectFit='cover' alt={item.image_thumb_url} src={item.image_thumb_url} layout='fill'/>
                            </div>
                            <div className={styles.sellItemContent}>
                                <div>
                                    <div>
                                        {item.collection_name} 
                                        <div className={styles.ownerName}>{item.name}</div>
                                    </div>
                                    <div className={styles.itemPrice}>
                                        <span>Price</span>
                                        <div><Image src={eth} alt='eth'></Image> {item.price}</div>
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
