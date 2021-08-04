import Banner from '@/components/HomeFeature/Banner';
import FeatureExclusive from '@/components/HomeFeature/FeatureExclusive';
import FeatureSell from '@/components/HomeFeature/FeatureSell';
import FeatureResource from '@/components/HomeFeature/FeatureResource';
import FeatureCategory from '@/components/HomeFeature/FeatureCategory';
import FeatureConnect from '@/components/HomeFeature/FeatureConnect';
import styles from '../styles/Home.module.css'
import FeatureTrending from '@/components/HomeFeature/FeatureTrending';
import Footer from '@/components/Footer'
import {getListCategory, getCategoryById} from '@/pages/api/category'

export default function Home({listCategory}) {
  console.log(listCategory)
  return (
    <>
      <div className={styles.content}>
        <Banner />
        <FeatureExclusive />
        <FeatureTrending />
        <FeatureSell />
        <FeatureResource />
        <FeatureCategory listCategory={listCategory} />
        <FeatureConnect />
      </div>
      <Footer />
    </>

  )
}

export async function getStaticProps({params}) {

  const listCategory = await getListCategory();

  return {
      props: {
         listCategory
      }
  }
}
