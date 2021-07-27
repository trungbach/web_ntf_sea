import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './style.module.scss'

const DetailItem = () => {
    return (
        <div className={styles.detailContainer}>
            <div className="row">
                <div className="col-5"></div>
                <div className="col-7"></div>
            </div>
        </div>
    );
}

export default DetailItem;
