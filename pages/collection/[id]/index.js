import React, {useEffect, useState, useRef} from 'react';
import styles from './style.module.scss';
import Image from 'next/image'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Input, Select, Button, Tooltip } from 'antd';
import {SearchOutlined  } from '@ant-design/icons'
import Link from 'next/link'
import ItemSell from '@/components/ItemSell'
import Footer from '@/components/Footer'
import NavBar from '@/components/SideBar';
import etherSvg from '@/public/etherSvg.svg';
import WebIcon from '@material-ui/icons/Web';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import {getListCollection, getCollectionBySlug} from '@/pages/api/collection'
import {useCollection} from '@/lib/useCollection';
import {useRouter} from 'next/router'

const {Option} = Select;

const CollectionName = ({collection}) => {
    const [filterObj, setFilterObj] = useState({ key: '', min_price: '', max_price: '' })
    const [sort, setSort] = useState('')
    const {data} = useCollection(`collection_id=${collection.id}&min_price=${filterObj.min_price}&max_price=${filterObj.max_price}&key=${filterObj.key}&sort=${sort}`)
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [heightDesc, setHeightDesc] = useState(-1);
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    const refDesc = useRef();
    const router = useRouter()
  

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

    const setPrice = (minPrice, maxPrice) => {
        setFilterObj({...filterObj, min_price: minPrice, max_price: maxPrice})
    }


  const listItem = data?.map((item, index) => {
      return (
        <div key={index} className="col-12 col-md-4 col-lg-3 mb-4">
            <ItemSell item={item}/>
        </div>
      )
  }) || ''
  
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
        CREATED_SORT: 1,
        PRICE_INCREASE_SORT: 2,
        PRICE_REDUCED_SORT: 3,
        FAVORITE_SORT: 4,
        OLDEST_SORT :  5
    }

    return (
        <>
        <div className={styles.collection}>
            <div className={styles.banner}>
                <Image layout='fill' objectFit='cover' src={collection.banner_url} alt="banner-collection" />
            </div>
            <div onClick={()=>setIsShowSideBar(false)} className={styles.overlay} style={{display: isShowSideBar ? 'block' : 'none'}}></div>
            <NavBar setPrice={setPrice} isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} />
            <div className={styles.content}>
                <div className="container">
                <div className={styles.heading}>
                    <div className={styles.avatar}>
                        <Image layout='fill' style={{objectFit: 'cover'}} src={collection.logo_url} alt="logo-collection" />
                    </div>
                    <h1>{collection.name}</h1>
                    <div className={styles.about}>
                    <div className={styles.aboutContainer}>
                        <div>
                            <Link href='/assets'>
                                <a>
                                    <h3>
                                        {collection.created}
                                    </h3>
                                    <span>items</span>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href='/assets'>
                                <a>
                                    <h3>
                                        {collection.owner}
                                    </h3>
                                    <span>owners</span>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href='/assets'>
                                <a>
                                    <h3>
                                      <Image width={20} height={20} src={etherSvg} alt='Ether' />  4.75
                                    </h3>
                                    <span>floor price</span>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href='/assets'>
                                <a>
                                    <h3>
                                        <Image width={20} height={20} src={etherSvg} alt='Ether' />  586
                                    </h3>
                                    <span>volume traded</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    </div>
                    
                    <p ref={refDesc}>
                        {collection.description}
                    </p>
                    {heightDesc > 80 && 
                        (!isSeeMore ? <div  type='button' className={styles.seeMoreBtn} onClick={seeMore}><ExpandMoreIcon /></div>
                        : <div type='button' className={styles.seeMoreBtn} onClick={seeLess}> <ExpandLessIcon /></div>)}
                </div>
                <div className={styles.social}>
                        {/* <Link href='/'><a> */}
                            <Tooltip title='Activity'>
                                <span><PlaylistPlayIcon /></span>
                            </Tooltip>
                        {/* </a></Link> */}
                        {/* <Link href='/'><a> */}
                            <Tooltip title='Website'>
                                <span><WebIcon /></span>
                            </Tooltip>
                        {/* </a></Link> */}
                        {/* <Link href='/'><a> */}
                            <Tooltip title='Discord'>
                            <span><i className="fab fa-discord"></i></span>
                            </Tooltip>
                        {/* </a></Link> */}
                        {/* <Link href='/'><a> */}
                            <Tooltip title='Activity'>
                                <span><PlaylistPlayIcon /></span>
                            </Tooltip>
                        {/* </a></Link> */}
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
        </div>
        <Footer />
        </>
    );
}

export default CollectionName;

export async function getStaticPaths() {

    const listCollection = await getListCollection();
    return {
        paths: listCollection?.map(collection => ({ params: { id: collection.id.toString() } })) || [],
        fallback: "blocking"
    }

}

export async function getStaticProps({params}) {

    const collection = await getCollectionBySlug({id: params.id});
    return {
        props: {
            collection
        },
        revalidate: 10,
    }
}

