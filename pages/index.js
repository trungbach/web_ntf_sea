import Banner from '@/components/HomeFeature/Banner';
import FeatureExclusive from '@/components/HomeFeature/FeatureExclusive';
import FeatureSell from '@/components/HomeFeature/FeatureSell';
import FeatureResource from '@/components/HomeFeature/FeatureResource';
import FeatureCategory from '@/components/HomeFeature/FeatureCategory';
import FeatureConnect from '@/components/HomeFeature/FeatureConnect';
import styles from '../styles/Home.module.css'
import FeatureTrending from '@/components/HomeFeature/FeatureTrending';
import Footer from '@/components/Footer'
import {getListCategory} from '@/pages/api/category'
import {getMostFavorite} from '@/pages/api/favorite'
import {getRankingCollection} from '@/pages/api/ranking'
import {DATE_TIME} from '@/config/constants'
import moment from 'moment'
import {useRanking} from '@/lib/useRanking'
import {useState} from 'react';

export default function Home({listCategory, mostFavoriteItem, rankingCollection}) {
  const rangeTime= [ moment().subtract(7, 'day').format(DATE_TIME), moment().format(DATE_TIME) ]
  const [categoryId, setCategoryId] = useState('')

  const { data } = useRanking(`start_time=${rangeTime[0]}&end_time=${rangeTime[1]}&category_id=${categoryId}`, rankingCollection)

  return (
    <>
      <div className={styles.content}>
        <Banner mostFavoriteItem={mostFavoriteItem} />
        {/* <FeatureExclusive /> */}
        <FeatureTrending rankingCollection={data} setCategoryId={setCategoryId} listCategory={listCategory}/>
        <FeatureSell />
        {/* <FeatureResource /> */}
        <FeatureCategory listCategory={listCategory} />
        <FeatureConnect />
      </div>
      <Footer />
    </>

  )
}

export async function getStaticProps({params}) {

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