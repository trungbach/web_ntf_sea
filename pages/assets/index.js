import React,{useState, useEffect} from 'react';
import styles from './style.module.scss';
import SideFilter from '@/components/SideFilter';
import SideFilterMobile from '@/components/SideFilterMobile';
import {Select, Button} from 'antd'
import ItemSell from '@/components/ItemSell'
import LoadingItem from '@/components/LoadingItem'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {getListItem} from '@/pages/api/asset'
import {useAsset} from '@/lib/useAsset';
import {useFilterCollection} from '@/lib/useCollection';
import {getListCategory} from '../api/category';
import {getListCollection} from '../api/collection';
import {useRouter} from 'next/router';
import {checkProperties} from '@/utils/index'
import CloseIcon from '@material-ui/icons/Close';

const {Option} = Select

export async function getServerSideProps() {

    const listItem = await getListItem();
    const listCategory = await getListCategory();
    const listCollection = await getListCollection();

    return {
        props: {
            listItem,
            listCategory,
            listCollection
        }
    }
}


const Assets = ({listItem, listCategory, listCollection}) => {
    const router = useRouter()
    const [filterObj, setFilterObj] = useState({ key: '', min_price: '', max_price: '', collection: '', category: ''})
    const [collectionName, setCollectionName] = useState('')
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    const [isResetPrice, setIsResetPrice] = useState(false)
    const [sort, setSort] = useState('')
    const {data} = useAsset(`category_id=${filterObj.category?.id || ''}&collection_id=${filterObj.collection?.id || ''}&min_price=${filterObj.min_price}&max_price=${filterObj.max_price}&key=${filterObj.key}&sort=${sort}`, listItem)
   
    const {filterCollection} = useFilterCollection(`key=${collectionName}`, listCollection)

    useEffect(() => {
      if(router.query.key === undefined) {
        setFilterObj({...filterObj, key: ''})
      }  else setFilterObj({...filterObj, key: router.query.key })
    },[router.query.key])


    const setPrice = (minPrice, maxPrice) => {
        setFilterObj({...filterObj, min_price: minPrice, max_price: maxPrice})
    }

    const setCategory = (item) => {
        if(item == -1) {
            setFilterObj({ ...filterObj, category: {...item} })
        } else {
            setFilterObj({ ...filterObj, category: {...item}, collection: '' })
        }
    }

    const setCollection= (item) => {
        if(item == -1) {
            setFilterObj({ ...filterObj, collection: '' })
        } else {
            setFilterObj({ ...filterObj, collection: item, category: '' })
        }
    }

    const handleChangeSortBy = (obj) => {
        setSort(obj.value)
    }

    const listItemResponse = data.map((item, index) => {
        return (
            <ItemSell item={item} key={index} />
        )
    })

    const removeFilter = () => {
        setFilterObj({ key: '', min_price: '', max_price: '', collection: '', category: '', sort: '' })
        router.push('/assets', undefined, {shallow: true})
        setIsResetPrice(true)
    }

    const sortBy = {
        CREATED_SORT: 1,
        PRICE_INCREASE_SORT: 2,
        PRICE_REDUCED_SORT: 3,
        FAVORITE_SORT: 4,
        OLDEST_SORT :  5
    }

    return (
        
        <div className={styles.assets}> 
            <SideFilter collectionName={collectionName} setCollectionName={setCollectionName} 
                        minPrice={filterObj.min_price} maxPrice={filterObj.max_price} setIsResetPrice={setIsResetPrice}
                        setCollection={setCollection} setCategory={setCategory} isResetPrice={isResetPrice}
                        setPrice={setPrice} listCategory={listCategory} listCollection={filterCollection} 
                        currentCollection={filterObj.collection} currentCategory={filterObj.category} />
                        
            <SideFilterMobile isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} />
            <div className={styles.showFilter}>
                <Button className={styles.buttonShowFilter} onClick={() =>setIsShowSideBar(true)}>Filter</Button>
            </div>
            <div className={styles.mainAsset}>
                <div className={styles.heading}>
                    <div className={`${styles.totalResult} d-none d-md-block`}>
                        {data.length > 0 ? ` ${data.length} results` : '0 result'}
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
                    {filterObj.key !== '' && <li className={styles.attributeFilter}>{filterObj.key} <span onClick={()=>setFilterObj({ ...filterObj, key: '' })}><CloseIcon /></span></li>}

                    {filterObj.category !== '' && <li className={styles.attributeFilter}>{filterObj.category.name} <span onClick={()=>setFilterObj({ ...filterObj, category: '' })}><CloseIcon /></span></li>}

                    {filterObj.collection !== '' && <li className={styles.attributeFilter}>{filterObj.collection.name} <span onClick={()=>setFilterObj({ ...filterObj, collection: '' })}><CloseIcon /></span></li>}

                    {filterObj.min_price !== '' && <li className={styles.attributeFilter}>Min: {filterObj.min_price} ETH <span onClick={()=>setFilterObj({ ...filterObj, min_price: '' })}><CloseIcon /></span></li>}

                    {filterObj.max_price !== '' && <li className={styles.attributeFilter}>Max: {filterObj.max_price} ETH <span onClick={()=>setFilterObj({ ...filterObj, max_price: '' })}><CloseIcon /></span></li>}

                    {!checkProperties(filterObj) && <li className={styles.removeFilter} onClick={removeFilter}>Clear All</li>}
                </ul>
                <div className={styles.assetsList}>
                    {/* <LoadingItem />  */}
                    {data.length ? listItemResponse : (
                        <div className={styles.emptyResponse}>
                            <h1>Not items found for this search</h1>
                            <Button className={styles.secondaryButton} onClick={removeFilter}>Back to all items</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Assets;


