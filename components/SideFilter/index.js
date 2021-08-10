import React, {useState,useEffect, useRef} from 'react';
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
const SideFilter = ({ setPrice, listCategory, listCollection, setCategoryId, setCollectionId }) => {

    const sideRef = useRef()

    const callback = (key) => {
        console.log(key);
    }

    const [widthScreen, setWidthScreen] = useState()
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    // const [categoryId, setCategoryId] = useState('')
    // const [collectionId, setCollectionId] = useState('')
    const [wrongPrice, setWrongPrice] = useState(false)

    const handleKeyPrice = e => {
        if(e.key === '-' || e.key === ',') {
            e.preventDefault()
        }
    }
    useEffect(() => {
        setWidthScreen(window.screen.width)
    },[])

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
         sideRef.current.style.height = collapsed ? '100vh' : 'auto';
         document.getElementsByClassName('ant-layout-sider-children')[0].style.overflowY = collapsed ? 'hidden !important' : 'auto !important'; 
         document.getElementById('collapseDiv').style.display = collapsed ? 'none' : 'block'; 
        setCollapsed(collapsed);
    };

    const listCollectionUI = listCollection.map((item, index) => {
        return (
            <li key={index} onClick={()=>setCollectionId(item.id)} className='justify-content-center'>
                 <Image layout='fill' src={item.logo_url} alt={item.logo_url} /> 
                 {item.name}
            </li>
        )
    })

    const listCategoryUI = listCategory.map((item, index) => {
        return (
            <li key={index} onClick={()=>setCategoryId(item.id)}>
                <Image width={24} height={24} src={item.logo_url} alt={item.logo_url}></Image>
                    {item.name}
            </li>
        )
    })

    const handleChange = () => {}
    const onChangeCollections = () => {}
    const onChangeSale = () => {}

    const setMinMax = (e, type) => {
        if(type === -1) {
            setMinPrice(e.target.value)
            if(e.target.value > maxPrice && maxPrice !== ''  && e.target.value !== '') setWrongPrice(true)
            else setWrongPrice(false)
        }   
        else {
            setMaxPrice(e.target.value);
            if(e.target.value < minPrice && minPrice !== '' && e.target.value !== '') setWrongPrice(true)
            else setWrongPrice(false)
        }

    } 

    const handleSetPrice = () => {
        setPrice(minPrice, maxPrice)
    }

    return (
        <div ref={sideRef} className={styles.sideFilter}>
            <Sider width={widthScreen >= 768 ? '300px' : '100%'} collapsedWidth={widthScreen >= 768 ? '60px' : '0px'} theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div id='collapseDiv'>
                    <Collapse  expandIconPosition="right" defaultActiveKey={['1', '2']} onChange={callback}>
                        <div className={styles.filterTitle}><FilterListIcon /> Filter
                        </div>
                        <Panel header="Price" key="1">
                            <div className={styles.filterPrice}>
                                <div>
                                    <Image objectFit='contain' src={ether} alt='ether ETH' />Ether (ETH)
                                </div>
                                <div className={styles.rangePrice}>
                                    <Input placeholder='Min' type="number" min="0" step="0.01" autoComplete='off' autoCorrect='off' inputMode='decimal' 
                                                onChange={e => setMinMax(e,-1)} onKeyPress={handleKeyPrice}/>

                                        <span>to</span>

                                    <Input placeholder='Max' type="number" min="0" step="0.01" autoComplete='off' autoCorrect='off' inputMode='decimal' 
                                            onChange={e => setMinMax(e, 1)} onKeyPress={handleKeyPrice} />
                                </div>
                                {wrongPrice && <p className={styles.wrongPrice}>Minimum must be less than maximum</p>}
                                <Button disabled={!wrongPrice ? false : true}  onClick={handleSetPrice} className={styles.applyPrice}>Apply</Button>
                            </div>
                        </Panel>
                        <Panel header="Collections" key="2">
                            <div className={styles.filterCollections}>
                                <Input prefix={<SearchOutlined />} placeholder="Filter" allowClear onChange={onChangeCollections} />
                                <ul style={{overflowY: 'auto'}}>
                                    {listCollectionUI}
                                </ul>
                            </div>
                        </Panel>
                        <Panel header="Categories" key="3">
                            <div className={styles.filterCollections}>
                                <ul style={{overflowY: 'auto'}}>
                                   {listCategoryUI}
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
