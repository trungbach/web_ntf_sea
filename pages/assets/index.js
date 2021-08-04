import React,{useState, useEffect} from 'react';
import styles from './style.module.scss';
import SideFilter from '@/components/SideFilter';
import SideFilterMobile from '@/components/SideFilterMobile';
import {Select, Button} from 'antd'
import ItemSell from '@/components/ItemSell'
import LoadingItem from '@/components/LoadingItem'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const {Option} = Select

const Assets = () => {

    const handleChangeTypeItem = () => {}
    const handleChangeSortBy = () => {}
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    return (
        
        <div className={styles.assets}> 
            <SideFilter />
            <SideFilterMobile isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} />
            <div className={styles.showFilter}>
                <Button className={styles.buttonShowFilter} onClick={() =>setIsShowSideBar(true)}>Filter</Button>
            </div>
            <div className={styles.mainAsset}>
                <div className={styles.heading}>
                    <div className={`${styles.totalResult} d-none d-md-block`}>
                        17.159.512 results
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
                    <LoadingItem />
                    <LoadingItem />
                    {/* <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell />
                    <ItemSell /> */}
                </div>
            </div>
        </div>
    );
}
export default Assets;
