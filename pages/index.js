import Banner from '@/components/HomeFeature/Banner';
import FeatureExclusive from '@/components/HomeFeature/FeatureExclusive';
import FeatureSell from '@/components/HomeFeature/FeatureSell';
import FeatureResource from '@/components/HomeFeature/FeatureResource';
import FeatureCategory from '@/components/HomeFeature/FeatureCategory';
import FeatureConnect from '@/components/HomeFeature/FeatureConnect';
import styles from '../styles/Home.module.css'
import FeatureTrending from '@/components/HomeFeature/FeatureTrending';
import Footer from '@/components/Footer'
export default function Home() {

  return (
    <>
      <div className={styles.content}>
        <Banner />
        <FeatureExclusive />
        <FeatureTrending />
        <FeatureSell />
        <FeatureResource />
        <FeatureCategory />
        <FeatureConnect />
      </div>
      <Footer />
    </>

  )
}

// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api/articles`)
//   const articles = await res.json()

//   return {
//     props: {
//       articles
//     }
//   }
// }

// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
//   const articles = await res.json()

//   return {
//     props: {
//       articles
//     }
//   }
// }
