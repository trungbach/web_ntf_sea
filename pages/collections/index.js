import React from 'react';
import styles from './style.module.scss';
import { Button, Card } from 'antd'
import { useRouter } from 'next/router'
import {getMyCollection} from '@/pages/api/collection'
import Link from 'next/link'
import Image from 'next/image'
export async function getServerSideProps({req}) {

    const tokenCookie = req.headers.cookie.split(";")
    .find(c => c.trim().startsWith("token="));
    const token = tokenCookie && tokenCookie.split('=')[1]
    console.log('tk',token)

    const myCollection = await getMyCollection({token: token});
    return {
        props: {
            myCollection
        }
    }

}

const MyCollections = ({myCollection}) => {
    console.log(myCollection)
    const router = useRouter()

    const goToCreate = () => {
        router.push('/collection/create')
    }

    const listCollection = myCollection.map((item, index) => {
        return (
            <div key={index} className={styles.sellItemContainer}>
                <Link href={`/collection/${item.id}`} >
                    <a  className={styles.trendingItem}>
                        <Card
                            hoverable
                            cover={<Image width={250} height={300} alt="hot asset" src={item.banner_url} />}
                        >
                            <div className={styles.trendingItemContent}>
                                <div className={styles.avatar}>
                                    <Image width={30} height={30} src={item.logo_url} alt='avatar' />
                                </div>
                                <h3>
                                    {item.name}
                                </h3>
                                <p>
                                    by <Link href='/'>{item.owner}</Link>
                                </p>
                                <p>Explore the {item.name} collection</p>
                            </div>
                        </Card>
                    </a>
                </Link>
            </div>
        )
    })

    return (
        <div className={styles.collections}>
            <div className="container">
                <h1>My Collection</h1>
                <h3 className="my-5">Create, curate, and manage collections of unique NFTs to share and sell</h3>
                <div className={styles.btnCreate}>
                    <Button className={styles.secondaryButton} onClick={goToCreate}>Create a collection</Button>
                </div>
                <div className={styles.listCollection}>
                    {listCollection}
                </div>
            </div>
        </div>
    );
}

export default MyCollections;
