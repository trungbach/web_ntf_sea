import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import { Button, Card } from 'antd'
import { useRouter } from 'next/router'
import {getMyCollection} from '@/pages/api/collection'
import LoginPage from '@/pages/login'
import Link from 'next/link'
import Image from 'next/image'
import { connect } from 'react-redux'

export async function getServerSideProps({req, res}) {

    if(!req.headers.cookie) {
        res.writeHead(302, { Location: `/login?${req.url}` })
        res.end();
    } else {
        const tokenCookie = req.headers.cookie.split(";")
        .find(c => c.trim().startsWith("token="));
        const token = tokenCookie && tokenCookie.split('=')[1]
    
        const rest = await getMyCollection({token: token});
  
      if(rest.status === 401) {
        res.setHeader('Set-Cookie','token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
        res.writeHead(302, { Location: `/login?${req.url}` })
        res.end();
      } else {
          const myCollection = [...rest.res.body.data]
          return {
            props: {
                myCollection,
            }
          }
      }
    }
  
  }

const MyCollections = ({myCollection, search_text, isLoggedIn}) => {
    const router = useRouter()

    useEffect(() => {
        if(!isLoggedIn) {
           router.push('/login')
        }
    },[isLoggedIn])
    
   
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

const mapStateToProps = (state) => ({
    isLoggedIn: state.login.isLoggedIn
})

export default connect(mapStateToProps)(MyCollections)

