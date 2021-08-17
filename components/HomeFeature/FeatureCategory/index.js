import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Card } from 'antd';
import styles from './style.module.scss'
const FeatureCategory = ({listCategory}) => {

    const category = listCategory.map((item, index) => {
        return (
            <div key={index} className='col-12 col-md-6 col-lg-4 mb-4'>
                <Link href={`/category/${item.id}`} >
                    <a  className={styles.categoryItem}>
                        <Card
                            hoverable
                            cover={<Image layout='fill' alt={item.cover_thumb_url} src={item.cover_thumb_url} />}
                        >
                            <div className={styles.categoryItemContent}>
                                <h3>
                                    {item.name}
                                </h3>
                            </div>
                        </Card>
                    </a>
                </Link>
            </div>
        )
    })

    return (
        <div className={styles.featureCategory}>
            <div className="container">
                <h2 className={styles.titleHome}>
                    Browse by category
                </h2>
                <div className={`row ${styles.listCategory}`}>
                    {category}
                </div>
            </div>
            <div className='mt-5'>
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
