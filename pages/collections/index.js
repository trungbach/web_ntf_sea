import React, {useEffect} from 'react';
import styles from './style.module.scss';
import { Button, Card } from 'antd'
import { useRouter } from 'next/router'
import {getMyCollection} from '@/pages/api/collection'
import Link from 'next/link'
import Image from 'next/image'
import { connect } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit';

export async function getServerSideProps({req, res}) {

    const myCollection = await getMyCollection({ req, res });
  
    return {
        props: {
            myCollection,
        }
    }
}

const MyCollections = ({myCollection, isLoggedIn}) => {

    const router = useRouter()

    useEffect(() => {
        if(!isLoggedIn) {
           router.push('/login')
        }
    },[isLoggedIn])
    
   
    const goToCreate = () => {
        router.push('/collection/create')
    }

    const goToEdit = (id) => {
        router.push(`/collection/edit?id=${id}`)
    }

    const listCollection = myCollection.map((item, index) => {
        return (
            <div key={index} className={`${styles.sellItemContainer} col-12 col-md-4 col-lg-3`}>
                <Button className={styles.goToEdit} onClick={()=>goToEdit(item.id)}><EditIcon /> Edit</Button>

                <Link href={`/collection/${item.id}`} >
                    <a  className={styles.trendingItem}>
                        <Card
                            hoverable
                            cover={<Image layout='fill' alt={item.cover_thumb_url} src={item.cover_thumb_url} />}
                        >
                           
                            <div className={styles.trendingItemContent}>
                                <div className={styles.avatar}>
                                    <Image width={30} height={30} src={item.logo_thumb_url} alt='logo_thumb_url' />
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
                <div className={`${styles.listCollection} row`}>
                    {listCollection}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.login.isLoggedIn
})

export default connect(mapStateToProps)(MyCollections)

