import React, {useEffect, useState, useRef} from 'react';
import styles from './style.module.scss';
import Image from 'next/image'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Input, Select, Button } from 'antd';
import {SearchOutlined  } from '@ant-design/icons'
import NavBar from '@/components/SideBar';
import {getListCategory, getCategoryBySlug} from '@/pages/api/category'
import { useRouter } from 'next/router'
import {useCollection} from '@/lib/useCollection'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/Footer'))
const ItemSell = dynamic(() => import('@/components/ItemSell'))
const ListLoading = dynamic(() => import('@/components/ListLoading'))
const {Option} = Select;

const CategoryName = ({category}) => {
    const router = useRouter()
    const [sort, setSort] = useState(5)
    const [filterObj, setFilterObj] = useState({ key: '', min_price: '', max_price: '' })
    const {data} = useCollection(`category_id=${category.id}&min_price=${filterObj.min_price}&max_price=${filterObj.max_price}&key=${filterObj.key}&sort=${sort}`)
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [heightDesc, setHeightDesc] = useState(-1);
    const [searchText, setSearchText] = useState('');
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

   const listItem = data?.map((item, index) => {
       return (
            <div key={index} className="col-12 col-md-4 col-lg-3 mb-4">
                <ItemSell item={item} />
            </div>
       )
   }) || (<ListLoading />)

   const setPrice = (minPrice, maxPrice) => {
    setFilterObj({...filterObj, min_price: minPrice, max_price: maxPrice})
    }

    const onKeyDown = e => {
    if(e.key === "Enter") {
        e.preventDefault()
        setFilterObj({...filterObj, key: searchText})
    }
    }


   if (router.isFallback) {
    return <div>Loading...</div>
    }

    const handleChangeSortBy = (obj) => {
        setSort(obj.value)
    }

    const sortBy = {
        OLDEST_SORT :  1,
        PRICE_INCREASE_SORT: 2,
        PRICE_REDUCED_SORT: 3,
        FAVORITE_SORT: 4,
        CREATED_SORT: 5,
    }

    return (
        <>
        <div className={styles.collection}>

            <div className={styles.banner}>
                <Image objectFit layout='fill' src={category.cover_url} alt="banner-collection" />
            </div>

            <div onClick={()=>setIsShowSideBar(false)} className={styles.overlay} style={{display: isShowSideBar ? 'block' : 'none'}}></div>

            <NavBar setPrice={setPrice} isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} />

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
                        <Input prefix={<SearchOutlined />} placeholder="Search" onChange={e => setSearchText(e.target.value)}  onKeyPress={onKeyDown} />
                    </div>
                    <div className={styles.filterSelect}>
                        <Select
                            labelInValue
                            placeholder="Sort by"
                            onChange={handleChangeSortBy}
                            >
                            <Option value={sortBy.CREATED_SORT}>Recently Created</Option>
                            <Option value={sortBy.PRICE_INCREASE_SORT}>Price: Low to High</Option>
                            <Option value={sortBy.PRICE_REDUCED_SORT}>Price: High to Low</Option>
                            <Option value={sortBy.FAVORITE_SORT}>Most Favorite</Option>
                            <Option value={sortBy.OLDEST_SORT}>Oldest</Option>
                        </Select>
                    </div>
                    <div>
                        <Button className={styles.buttonShowFilter} onClick={()=>setIsShowSideBar(true)}><FilterListIcon />Filter</Button>
                    </div>
                </div>
                <div className='row'>
                    {listItem}
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
    console.log(listCategory?.map(category => ({params: { id: (category.id).toString() }})))
    return {
        paths: listCategory.map(category => ({params: { id: (category.id).toString() }} )) || [],
        fallback: "blocking"
    }
}

export async function getStaticProps({params}) {

    const category = await getCategoryBySlug({id: params.id})

    return {
        props: {
            category
        },
        revalidate: 60
    }
}
