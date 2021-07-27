import React, {useState, useRef} from 'react';
import { Layout, Collapse, Button, Select, Input, Checkbox  } from 'antd';
import FilterListIcon from '@material-ui/icons/FilterList';
import styles from './style.module.scss';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {SearchOutlined  } from '@ant-design/icons'
import ether from '@/public/ether.png'
import collectionSider from '@/public/collectionSider.png'
import Image from 'next/image'
import art from '../../public/art-light.svg';
import collectibles from '../../public/collectibles-light.svg';
import domain from '../../public/domain-names-light.svg';
import music from '../../public/music-light.svg';
import sports from '../../public/sports-light.svg';
import trading from '../../public/trading-cards-light.svg';
import utility from '../../public/utility-light.svg';
import virtual from '../../public/virtual-worlds-light.svg';
const {Option} = Select
const { Panel } = Collapse;
const { Sider } = Layout;
const SideFilter = () => {

    const sideRef = useRef()

    const callback = (key) => {
        console.log(key);
    }

    const [collapsed, setCollapsed] = useState(false)

    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

    const onCollapse = collapsed => {
         sideRef.current.style.height = collapsed ? '100vh' : 'auto';
        //  sideRef.current.style.borderRight = '1px solid #ccc';
         document.getElementsByClassName('ant-layout-sider-children')[0].style.overflowY = collapsed ? 'hidden !important' : 'auto !important'; 
         document.getElementById('collapseDiv').style.display = collapsed ? 'none' : 'block'; 
        setCollapsed(collapsed);
    };

    const listCollection = (
        <>
            <li>
                <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
            </li>
            <li>
                <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
            </li>
            <li>
                <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
            </li>
            <li>
                <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
            </li>
            <li>
                <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
            </li>
            <li>
                <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
            </li>
            <li>
                <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
            </li>
            <li>
                <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
            </li>
        </>
    )

    const handleChange = () => {}
    const onChangeCollections = () => {}
    const onChangeSale = () => {}

    return (
        <div ref={sideRef} className={styles.sideFilter}>
            <Sider width={338} collapsedWidth={60} theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div id='collapseDiv'>
                    <Collapse  expandIconPosition="right" defaultActiveKey={['1', '2']} onChange={callback}>
                        <div className={styles.filterTitle}><FilterListIcon /> Filter
                        </div>
                        <Panel header="Status" key="1">
                            <div className={styles.filterList}>
                                <div>Buy Now</div>
                                <div>On Auction</div>
                                <div>New</div>
                                <div>Has Offers</div>
                            </div>
                        </Panel>
                        <Panel header="Price" key="2">
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
                        <Panel header="Collections" key="3">
                            <div className={styles.filterCollections}>
                                <Input prefix={<SearchOutlined />} placeholder="Filter" allowClear onChange={onChangeCollections} />
                                <ul style={{overflowY: 'scroll'}}>
                                    {listCollection}
                                </ul>
                            </div>
                        </Panel>
                        <Panel header="Chains" key="4">
                            <div className={styles.filterCollections} >
                                <ul>
                                    <li>
                                        <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
                                    </li>
                                    <li>
                                        <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
                                    </li>
                                    <li>
                                        <Image src={collectionSider} alt='collection-sider' /> Bored Ape Kennel Club
                                    </li>
                                </ul>
                            </div>
                        </Panel>
                        <Panel header="Categories" key="5">
                            <div className={styles.filterCollections}>
                                <ul style={{overflowY: 'scroll'}}>
                                    <li>
                                        <Image width={24} height={24} src={art} alt='art'></Image>
                                            Art
                                    </li>
                                    <li>
                                        <Image width={24} height={24} src={music} alt='music'></Image>
                                            Music
                                    </li>
                                    <li>
                                        <Image width={24} height={24} src={domain} alt='domain'></Image>
                                            Domain Names
                                    </li>
                                    <li>
                                        <Image width={24} height={24} src={virtual} alt='virtual'></Image>
                                            Virtual Worlds
                                    </li>
                                    <li>
                                        <Image width={24} height={24} src={trading} alt='trading'></Image>
                                            Trading Cards
                                    </li>
                                    <li>
                                        <Image width={24} height={24} src={collectibles} alt='collectibles'></Image>
                                            Collectibles
                                    </li>
                                    <li>
                                        <Image width={24} height={24} src={sports} alt='sports'></Image>
                                            Sports
                                    </li>
                                    <li>
                                        <Image width={24} height={24} src={utility} alt='utility'></Image>
                                            Utility
                                    </li>
                                </ul>
                            </div>
                        </Panel>
                        <Panel header="On Sale In" key="6">
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

            </Sider>
        </div>
    );
}

export default SideFilter;
