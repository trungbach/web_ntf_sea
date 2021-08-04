import React, {useState, useEffect} from 'react';
import { Collapse,  Select, Input, Checkbox  } from 'antd';
import FilterListIcon from '@material-ui/icons/FilterList';
import styles from './style.module.scss';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {SearchOutlined  } from '@ant-design/icons'
import CloseIcon from '@material-ui/icons/Close';
import ether from '@/public/ether.png'
import collectionSider from '@/public/collectionSider.png'
import Image from 'next/image'
const {Option} = Select
const { Panel } = Collapse;

const SideFilterMobile = ({isShowSideBar, setIsShowSideBar}) => {

    const callback = (key) => {
        console.log(key);
    }

    const handleChange = () => {}
    const onChangeCollections = () => {}
    const onChangeSale = () => {}

    return (
        <div className={styles.sideFilter} style={{right: isShowSideBar ? '0' : '100%'}}>
                <div className={styles.sideCollapse}>
                    <Collapse  expandIconPosition="right" defaultActiveKey={['1', '2']} onChange={callback}>
                        <div className={styles.filterTitle}>
                            <div>
                                <FilterListIcon /> Filter
                            </div> 
                            <div type='button' onClick={()=>setIsShowSideBar(false)}>
                                <CloseIcon />
                            </div>
                        </div>
                        {/* <Panel header="Status" key="1">
                            <div className={styles.filterList}>
                                <div>Buy Now</div>
                                <div>On Auction</div>
                                <div>New</div>
                                <div>Has Offers</div>
                            </div>
                        </Panel> */}
                        <Panel header="Price" key="1">
                            <div className={styles.filterPrice}>
                                <Select
                                labelInValue
                                defaultValue={{ value: 'lucy' }}
                                dropdownClassName={styles.selectPrice}
                                onChange={handleChange}
                                >
                                    <Option value="lucy"><AttachMoneyIcon /> United States Dollar (USD)</Option>
                                    <Option value="jackss"><Image src={ether} alt='ether ETH' />Ether (ETH)</Option>
                                </Select>
                                <div className={styles.rangePrice}>
                                    <Input placeholder='Min' type="number"/>
                                    <span>to</span>
                                    <Input placeholder='Max' type="number"/>
                                </div>
                                <div type="button" className={styles.applyPrice}>Apply</div>
                            </div>
                        </Panel>
                        <Panel header="On Sale In" key="2">
                            <div className={styles.filterCollections}>
                                <Input prefix={<SearchOutlined />} placeholder="Filter" allowClear onChange={onChangeCollections} />
                                <ul style={{overflowY: 'scroll'}}>
                                    <Checkbox.Group style={{ width: '100%' }} onChange={onChangeSale}>
                                        <Checkbox value="A">ETH</Checkbox>
                                        <Checkbox value="B">WETH</Checkbox>
                                        <Checkbox value="C">0xBTC</Checkbox>
                                        <Checkbox value="D">1337</Checkbox>
                                        <Checkbox value="E">1MT</Checkbox>
                                        <Checkbox value="F">1MT</Checkbox>
                                        <Checkbox value="G">1MT</Checkbox>
                                        <Checkbox value="H">1MT</Checkbox>
                                        <Checkbox value="I">1MT</Checkbox>
                                        <Checkbox value="K">1MT</Checkbox>
                                        <Checkbox value="L">1MT</Checkbox>
                                        <Checkbox value="M">1MT</Checkbox>
                                        <Checkbox value="N">1MT</Checkbox>
                                    </Checkbox.Group>
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
        </div>
    </div>
    );
}

export default SideFilterMobile;
