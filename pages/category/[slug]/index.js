import React, {useEffect, useState, useRef} from 'react';
import styles from './style.module.scss';
import Image from 'next/image'
import bannerCollection from '@/public/bannerCollection.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Input, Select, Button } from 'antd';
import {SearchOutlined  } from '@ant-design/icons'
import Link from 'next/link'
import ItemSell from '@/components/ItemSell'
import Footer from '@/components/Footer'
import NavBar from '@/components/SideBar';
import {getListCategory, getCategoryBySlug} from '@/pages/api/category'

const {Option} = Select;

const CategoryName = ({category}) => {
    console.log(category)
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [heightDesc, setHeightDesc] = useState(-1);
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    const refDesc = useRef();

    useEffect(() => {
        const height = refDesc.current.clientHeight
        setHeightDesc(height)
        if(height < 80) { 
            refDesc.current.style.height = 'auto';
        } else refDesc.current.style.height = '8rem';
    },[])

  const seeMore = () => {
    refDesc.current.style.height = 'auto';
    setIsSeeMore(true);
  }

  const seeLess = () => {
    refDesc.current.style.height = '8rem';
    setIsSeeMore(false)
  }

  const onChange = () => {}
  const handleChange = () => {}

  const collection = [
      { 
          url: 'url'
      },
      { 
        url: 'url'
        },
        { 
            url: 'url'
        },
        { 
            url: 'url'
        },
        { 
        url: 'url'
        },
        { 
            url: 'url'
        },
        { 
            url: 'url'
        },
        { 
        url: 'url'
        },
        { 
        url: 'url'
        },
        { 
            url: 'url'
        },
        { 
        url: 'url'
        },
        { 
        url: 'url'
        },
  ]

   const listCollection = collection.map((item, index) => {
       return (
            <div key={index} className="col-12 col-md-4 col-lg-3 mb-4">
                <ItemSell />
            </div>
       )
   }) 

    return (
        <>
        <div className={styles.collection}>

            <div className={styles.banner}>
                <Image objectFit layout='fill' src={category.image_url} alt="banner-collection" />
            </div>

            <div onClick={()=>setIsShowSideBar(false)} className={styles.overlay} style={{display: isShowSideBar ? 'block' : 'none'}}></div>

            <NavBar isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} />

            <div className={`${styles.content} container`}>
                <div className={styles.heading}>
                    <h1>Explore {category.name}</h1>
                    <p ref={refDesc} style={{transition: 'height 0.5s linear' }}>
                    An online community of makers, developers, and traders is pushing the art world into 
                    new territory. It all started with CryptoPunks, a set of 10,000 randomly generated 
                    punks that proved demand for the digital ownership of non-physical items and 
                    collectibles in 2017, and the market has evolved rapidly ever since.
                    As the underlying technology develops, a growing pool of artists are selling 
                    verified, immutable works to art lovers and speculators, and the space as a whole 
                    is waking up to the power and potential of decentralized networks and currencies. 
                    With creators and collectors generating meaningful revenue through an entirely 
                    digital ecosystem, the tokenization of gifs, memes, and MP4s is emerging as the 
                    most exciting and relevant blockchain use case. From SuperRare to Josie to JOY, 
                    browse and trade NFTs from some of the world&apos;s top crypto artists on OpenSea.
                    </p>
                    {heightDesc > 80 && 
                        !isSeeMore ? <div  type='button' className={styles.seeMoreBtn} onClick={seeMore}><ExpandMoreIcon /></div>
                        : <div type='button' className={styles.seeMoreBtn} onClick={seeLess}> <ExpandLessIcon /></div>}
                </div>
                <div className={styles.filter}>
                    <div>
                        <Input prefix={<SearchOutlined />} placeholder="Search" onChange={onChange} />
                    </div>
                    <div className={styles.filterSelect}>
                        <Select
                            labelInValue
                            defaultValue={{ value: 'lucy' }}
                            onChange={handleChange}
                            >
                            <Option value="lucy">Sort by</Option>
                            <Option value="jack">Recently Listed</Option>
                            <Option value="jack">Recently Sold</Option>
                            <Option value="jacks">Ending Soon</Option>
                            <Option value="jackss">Price: Low to High</Option>
                            <Option value="jackss1">Price: High to Low</Option>
                            <Option value="jackss2">Highest Last Sale</Option>
                            <Option value="jackss3">Most Viewed</Option>
                            <Option value="jackss4">Most Favorite</Option>
                            <Option value="jackss5">Oldest</Option>
                        </Select>
                    </div>
                    <div>
                        <Button className={styles.buttonShowFilter} onClick={()=>setIsShowSideBar(true)}><FilterListIcon />Filter</Button>
                    </div>
                </div>
                <div className='row'>
                    {listCollection}
                </div> 
            </div>
        </div>
        <Footer />
        </>
    );
}

export default CategoryName;

export async function getStaticPaths() {
    const listCategory = await getListCategory();
    return {
        paths: listCategory?.map(category => ({params: { slug: category.slug }})) || [],
        fallback: true
    }
}

export async function getStaticProps({params}) {

    const listCategory = await getListCategory();
    const {id} = listCategory.find(category => category.slug === params.slug)
    const category = await getCategoryBySlug({id})

    return {
        props: {
            category
        }
    }
}
