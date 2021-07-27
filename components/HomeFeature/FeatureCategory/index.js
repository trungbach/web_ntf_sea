import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import art from '@/public/art.png'
import { Card, Button } from 'antd';
import styles from './style.module.scss'
const FeatureCategory = () => {

    const categoryItem = (
        <Link href='/' >
            <a  className={styles.categoryItem}>
                <Card
                    hoverable
                    cover={<Image  alt="hot asset" src={art} />}
                >
                    <div className={styles.categoryItemContent}>
                        <h3>
                            Art
                        </h3>
                    </div>
                </Card>
            </a>
        </Link>
    )

    return (
        <div className={styles.featureCategory}>
            <div className="container">
                <h2 className={styles.titleHome}>
                    Browse by category
                </h2>
                <div className={styles.listCategory}>
                    {categoryItem}
                    {categoryItem}
                    {categoryItem}
                    {categoryItem}
                    {categoryItem}
                    {categoryItem}
                    {categoryItem}
                    {categoryItem}
                    {categoryItem}
                </div>
            </div>
            <div>
                <Link href='/assets'>
                    <a className={styles.exploreLink}>
                        Explore the marketplace
                    </a>
                </Link>
            </div>
            
        </div>
    );
}

export default FeatureCategory;
