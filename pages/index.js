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
// import { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import Page from '../components/Page'
// import { addCount } from '../store/count/action'
// import { wrapper } from '../store/store'
// import { serverRenderClock, startClock } from '../store/tick/action'

// const Index = (props) => {
//   useEffect(() => {
//     const timer = props.startClock()

//     return () => {
//       clearInterval(timer)
//     }
//   }, [props])

//   return <Page title="Index Page" linkTo="/other" />
// }

// export const getStaticProps = wrapper.getStaticProps((store) => () => {
//   store.dispatch(serverRenderClock(true))
//   store.dispatch(addCount())
// })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addCount: bindActionCreators(addCount, dispatch),
//     startClock: bindActionCreators(startClock, dispatch),
//   }
// }

// export default connect(null, mapDispatchToProps)(Index)
