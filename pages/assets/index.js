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
import {getListCategory} from '../api/category';
import {getListCollection} from '../api/collection';

const {Option} = Select

export async function getStaticProps() {

    const listItem = await getListItem();
    const listCategory = await getListCategory();
    const listCollection = await getListCollection();

    return {
        props: {
            listItem,
            listCategory,
            listCollection
        },
        revalidate: 60
    }
}


const Assets = ({listItem, listCategory, listCollection}) => {
    console.log( listCollection)
    const [filterObj, setFilterObj] = useState({ key: '', min_price: '', max_price: '', collection_id: '', category_id: '' })

    const {data} = useAsset(`category_id=${filterObj.category_id}&collection_id=${filterObj.collection_id}&min_price=${filterObj.min_price}&max_price=${filterObj.max_price}&key=${filterObj.key}`, listItem)
    console.log(data)

    const handleChangeTypeItem = () => {}
    const handleChangeSortBy = () => {}
    const [isShowSideBar, setIsShowSideBar] = useState(false);

    const setPrice = (minPrice, maxPrice) => {
        setFilterObj({...filterObj, min_price: minPrice, max_price: maxPrice})
    }

    const onKeyDown = e => {
        if(e.key === "Enter") {
            setFilterObj({...filterObj, key: searchText})
        }
    }

    const listItemResponse = data.map((item, index) => {
        return (
            <ItemSell item={item} key={index} />
        )
    })

    const setCollectionId = (id) => setFilterObj({...filterObj, collection_id: id})
    const setCategoryId = (id) => setFilterObj({...filterObj, category_id: id})

    return (
        
        <div className={styles.assets}> 
            <SideFilter setCollectionId={setCollectionId} setCategoryId={setCategoryId} 
                        setPrice={setPrice} listCategory={listCategory} listCollection={listCollection} />
            <SideFilterMobile isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} />
            <div className={styles.showFilter}>
                <Button className={styles.buttonShowFilter} onClick={() =>setIsShowSideBar(true)}>Filter</Button>
            </div>
            <div className={styles.mainAsset}>
                <div className={styles.heading}>
                    <div className={`${styles.totalResult} d-none d-md-block`}>
                        {listItem.length} results
                    </div>
                    <div className={styles.filter}>
                        <Select
                        labelInValue
                        defaultValue={{ value: 'lucy' }}
                        dropdownClassName={styles.selectTypeItem}
                        onChange={handleChangeTypeItem}
                        >
                            <Option value="lucy">All items</Option>
                            <Option value="single">Single Items</Option>
                            <Option value="bundles">Bundles</Option>
                        </Select>
                        <Select
                            labelInValue
                            defaultValue={{ value: 'lucy' }}
                            onChange={handleChangeSortBy}
                            >
                            <Option value="lucy">Sort by</Option>
                            <Option value="jack">Recently Listed</Option>
                            <Option value="jack">Recently Sold</Option>
                            <Option value="jacks">Ending Soon</Option>
                            <Option value="jackss">Price: Low to High</Option>
                            <Option value="jackss">Price: High to Low</Option>
                            <Option value="jackss">Highest Last Sale</Option>
                            <Option value="jackss">Most Viewed</Option>
                            <Option value="jackss">Most Favorite</Option>
                            <Option value="jackss">Oldest</Option>
                        </Select>
                    </div>
                </div>
                <div className={styles.assetsList}>
                    {/* <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem />
                    <LoadingItem /> */}
                    {listItemResponse}
                </div>
            </div>
        </div>
    );
}
export default Assets;


