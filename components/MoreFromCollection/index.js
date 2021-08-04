import React from 'react';
import styles from './style.module.scss'
import ItemSell from '@/components/ItemSell'

const MoreFromCollection = () => {

    const listFromCollection = (
        <>
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
        </>
    )
    return (
        <div className={styles.moreFromCollection}>
            {listFromCollection}
        </div>
    );
}

export default MoreFromCollection;
