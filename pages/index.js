import styles from '../styles/Home.module.css'
import {getListCategory} from '@/pages/api/category'
import {getMostFavorite} from '@/pages/api/favorite'
import {getRankingCollection} from '@/pages/api/ranking'
import {DATE_TIME} from '@/config/constants'
import moment from 'moment'
import {useRanking} from '@/lib/useRanking'
import {useState} from 'react';
import NextHead from 'next/head'
import dynamic from 'next/dynamic'
import Banner from '@/components/HomeFeature/Banner'
import FeatureTrending from '@/components/HomeFeature/FeatureTrending'

const Footer = dynamic(() => import('@/components/Footer'))
const FeatureConnect = dynamic(() => import('@/components/HomeFeature/FeatureConnect'))
const FeatureCategory = dynamic(() => import('@/components/HomeFeature/FeatureCategory'))
const FeatureSell = dynamic(() => import('@/components/HomeFeature/FeatureSell'))

export default function Home({listCategory, mostFavoriteItem, rankingCollection}) {
  const rangeTime= [ moment().subtract(7, 'day').format(DATE_TIME), moment().format(DATE_TIME) ]
  const [categoryId, setCategoryId] = useState('')
  const { data } = useRanking(`start_time=${rangeTime[0]}&end_time=${rangeTime[1]}&category_id=${categoryId}`, rankingCollection)

  return (
    <>
      {/* <NextHead>
      <link rel="preload" as='style' type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
      <link rel="preload" as='style' type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />  
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </NextHead> */}
      <div className={styles.content}>
        <Banner mostFavoriteItem={mostFavoriteItem} />
        {/* <FeatureExclusive /> */}
        <FeatureTrending rankingCollection={data} setCategoryId={setCategoryId} listCategory={listCategory}/>
        <FeatureSell />
        <FeatureCategory listCategory={listCategory} />
        <FeatureConnect />
      </div>
      <Footer />
    </>

  )
}

export async function getStaticProps() {

  const listCategory = await getListCategory();
  const mostFavoriteItem = await getMostFavorite();

  const rangeTime= [ moment().subtract(7, 'day').format(DATE_TIME), moment().format(DATE_TIME) ]
  const rankingCollection = await getRankingCollection(`start_time=${rangeTime[0]}&end_time=${rangeTime[1]}`);
  return {
      props: {
         listCategory, 
         mostFavoriteItem: mostFavoriteItem || null,
         rankingCollection,
      },
      revalidate: 600
  }
}