import React,{useState, useEffect} from 'react';
import styles from './style.module.scss';
import SideFilter from '@/components/SideFilter';
import SideFilterMobile from '@/components/SideFilterMobile';
import {Select, Button} from 'antd'
import ItemSell from '@/components/ItemSell'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {useAsset} from '@/lib/useAsset';
import {useFilterCollection} from '@/lib/useCollection';
import {getListCategory} from '../api/category';
import {getListCollection} from '../api/collection';
import {useRouter} from 'next/router';
import {checkProperties} from '@/utils/index'
import CloseIcon from '@material-ui/icons/Close';
import Head from 'next/head'
const {Option} = Select
import dynamic from 'next/dynamic'

const ListLoading = dynamic(() => import('@/components/ListLoading'))
export async function getServerSideProps() {
    
    const listCategory = await getListCategory();
    const listCollection = await getListCollection();

    return {
        props: {
            listCategory,
            listCollection
        }
    }
}


const Assets = ({listCategory, listCollection}) => {
    const router = useRouter()
    const [filterObj, setFilterObj] = useState({ key: '', min_price: '', max_price: '', collection: '', category: ''})
    const [collectionName, setCollectionName] = useState('')
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    const [isResetPrice, setIsResetPrice] = useState(false)
    const [sort, setSort] = useState(5)
    const {data} = useAsset(`category_id=${filterObj.category?.id || ''}&collection_id=${filterObj.collection?.id || ''}&min_price=${filterObj.min_price}&max_price=${filterObj.max_price}&key=${filterObj.key}&sort=${sort}`)
   
    const {filterCollection} = useFilterCollection(`key=${collectionName}`, listCollection)

    const [collapsed, setCollapsed] = useState(false)
    const [widthAsset, setWidthAsset] = useState()
    useEffect(() => {
      if(router.query.key === undefined) {
        setFilterObj({...filterObj, key: ''})
      }  else setFilterObj({...filterObj, key: router.query.key })
    },[router.query.key])

    useEffect(() => {
        const filterWidth = collapsed ? 60 : 300
        setWidthAsset(window.innerWidth - filterWidth)
        console.log(window.innerWidth)
    },[collapsed, ])

    const onresize = function(e) {
        //note i need to pass the event as an argument to the function
       const width = e.target.outerWidth;
       const height = e.target.outerHeight;
        console.log(width, height)
     }

    //  if (typeof window === "undefined")  {
    //     window.addEventListener("resize", onresize);
    //  }

    const setPrice = (minPrice, maxPrice) => {
        setFilterObj({...filterObj, min_price: minPrice, max_price: maxPrice})
    }

    const setCategory = (item) => {
        if(item == -1) {
            setFilterObj({ ...filterObj, category: {...item} })
        } else {
            if(item.id == filterObj.collection?.category_id) {
                setFilterObj({ ...filterObj, category: {...item} })
            } else setFilterObj({ ...filterObj, category: {...item}, collection: '' })
        }
    }

    const setCollection= (item) => {
        if(item == -1) {
            setFilterObj({ ...filterObj, collection: '' })
        } else {
            if(item.category_id == filterObj.category?.id) {
                setFilterObj({ ...filterObj, collection: item})
            } else setFilterObj({ ...filterObj, collection: item, category: ''})
           
        }
    }

    const handleChangeSortBy = (obj) => {
        setSort(obj.value)
    }

    const listItemResponse = data?.map((item, index) => {
        return (
            <ItemSell item={item} key={index} />
        )
    }) || (<ListLoading />)

    const removeFilter = () => {
        setFilterObj({ key: '', min_price: '', max_price: '', collection: '', category: '', sort: '' })
        router.push('/assets', undefined, {shallow: true})
        setIsResetPrice(true)
    }

    const sortBy = {
        CREATED_SORT: 5,
        PRICE_INCREASE_SORT: 2,
        PRICE_REDUCED_SORT: 3,
        FAVORITE_SORT: 4,
        OLDEST_SORT :  1
    }

    return (
        
        <div className={styles.assets}> 
            <Head>
                <link rel="preload" href="/items" as="fetch" crossOrigin="anonymous" />
            </Head>
            <SideFilter collectionName={collectionName} setCollectionName={setCollectionName} 
                        minPrice={filterObj.min_price} maxPrice={filterObj.max_price} setIsResetPrice={setIsResetPrice}
                        setCollection={setCollection} setCategory={setCategory} isResetPrice={isResetPrice}
                        setPrice={setPrice} listCategory={listCategory} listCollection={filterCollection} 
                        currentCollection={filterObj.collection} currentCategory={filterObj.category} 
                        collapsed={collapsed} setCollapsed={setCollapsed}
                        
                        />
                        
            <SideFilterMobile isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} />
            <div className={styles.showFilter}>
                <Button className={styles.buttonShowFilter} onClick={() =>setIsShowSideBar(true)}>Filter</Button>
            </div>
            <div className={styles.mainAsset}>
                <div className={styles.heading}>
                    <div className={`${styles.totalResult} d-none d-md-block`}>
                        {data?.length > 0 ? `${data.length} results` : '0 result'}
                    </div>
                    <div className={styles.filter}>
                        {/* <Select
                        labelInValue
                        defaultValue={{ value: 'lucy' }}
                        dropdownClassName={styles.selectTypeItem}
                        onChange={handleChangeTypeItem}
                        >
                            <Option value="lucy">All items</Option>
                            <Option value="single">Single Items</Option>
                            <Option value="bundles">Bundles</Option>
                        </Select> */}
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
                </div>
                <ul className={styles.listAttributeFilter}>
                    {filterObj.key !== '' && <li className={styles.attributeFilter}>{filterObj.key} <span onClick={()=>{setFilterObj({ ...filterObj, key: '' });router.push('/assets', undefined, {shallow: true})}}><CloseIcon /></span></li>}

                    {filterObj.category !== '' && <li className={styles.attributeFilter}>{filterObj.category.name} <span onClick={()=>setFilterObj({ ...filterObj, category: '' })}><CloseIcon /></span></li>}

                    {filterObj.collection !== '' && <li className={styles.attributeFilter}>{filterObj.collection.name} <span onClick={()=>setFilterObj({ ...filterObj, collection: '' })}><CloseIcon /></span></li>}

                    {filterObj.min_price !== '' && <li className={styles.attributeFilter}>Min: {filterObj.min_price} ETH <span onClick={()=>setFilterObj({ ...filterObj, min_price: '' })}><CloseIcon /></span></li>}

                    {filterObj.max_price !== '' && <li className={styles.attributeFilter}>Max: {filterObj.max_price} ETH <span onClick={()=>setFilterObj({ ...filterObj, max_price: '' })}><CloseIcon /></span></li>}

                    {!checkProperties(filterObj) && <li className={styles.removeFilter} onClick={removeFilter}>Clear All</li>}
                </ul>
                {/* <div className={refAsset?.current?.clientWidth < 960 ? `${styles.assetsList} ${styles.gridThree}` : 
                                (refAsset?.current?.clientWidth < 1200 ? `${styles.assetsList} ${styles.gridFour}` : 
                                (refAsset?.current?.clientWidth < 1600 ? `${styles.assetsList} ${styles.gridFive}` :  `${styles.assetsList} ${styles.gridSix}`))
                                }
                > */}
                <div  className={widthAsset < 985 ? `${styles.assetsList} ${styles.gridThree}` : 
                                (widthAsset < 1250 ? `${styles.assetsList} ${styles.gridFour}` : 
                                (widthAsset < 1600 ? `${styles.assetsList} ${styles.gridFive}` :  `${styles.assetsList} ${styles.gridSix}`))
                                }
                >
                    {listItemResponse}
                    {data?.length == 0 &&
                    (
                        <div className={styles.emptyResponse}>
                            <h1>Not items found for this search</h1>
                            <Button className={styles.secondaryButton} onClick={removeFilter}>Back to all items</Button>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}
export default Assets;


