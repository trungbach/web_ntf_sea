import Image from 'next/image';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import FeatureExclusive from '../components/FeatureExclusive';
import FeatureSell from '../components/FeatureSell';
import styles from '../styles/Home.module.css'
import {server} from '../config'
import FeatureTrending from '../components/FeatureTrending';

export default function Home() {

  return (
    <div className={styles.content}>
      <Banner />
      <FeatureExclusive />
      <FeatureTrending />
      <FeatureSell />
    </div>
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
