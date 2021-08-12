import React, {useState,useEffect, useRef} from 'react';
import { Layout, Collapse, Button, Input  } from 'antd';
import FilterListIcon from '@material-ui/icons/FilterList';
import styles from './style.module.scss';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {SearchOutlined  } from '@ant-design/icons'
import ether from '@/public/ether.png'
import Image from 'next/image'
const { Panel } = Collapse;
const { Sider } = Layout;

const SideFilter = ({ setPrice, currentCategory, currentCollection,  listCategory, isResetPrice, setIsResetPrice,
                      listCollection, setCategory, setCollection, collectionName, setCollectionName
                    }) => {

    const sideRef = useRef()
    const [widthScreen, setWidthScreen] = useState()
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [wrongPrice, setWrongPrice] = useState(false)

    const handleKeyPrice = e => {
        if(e.key === '-' || e.key === ',') {
            e.preventDefault()
        } 
    }
    useEffect(() => {
        setWidthScreen(window.screen.width)
    },[]) 
    
    useEffect(() => {
        console.log('isResetPrice', isResetPrice)
        if(isResetPrice) {
            setMinPrice('')
            setMaxPrice('')
        }
    },[isResetPrice])

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
         sideRef.current.style.height = collapsed ? '100vh' : 'auto';
         document.getElementsByClassName('ant-layout-sider-children')[0].style.overflowY = collapsed ? 'hidden !important' : 'auto !important'; 
         document.getElementById('collapseDiv').style.display = collapsed ? 'none' : 'block'; 
        setCollapsed(collapsed);
    };

   

    const handleSetCategory = (id) => {
        currentCategory?.id == id ? setCategory(-1) : setCategory(id)
    }

    const handleSetCollection = (item) => {            
        currentCollection?.id == item.id ? setCollection(-1) : setCollection(item)
    }

    const listCategoryUI = listCategory.map((item, index) => {
        return (
            <li key={index} onClick={()=>handleSetCategory(item)}>
                <Image width={24} height={24} src={currentCategory?.id == item.id ? 'https://opensea.io/static/images/checkmark.svg' : item.logo_url} alt={item.logo_url} />
                    {item.name}
            </li>
        )
    })

    const listCollectionUI = listCollection.map((item, index) => {
        return (
            <li key={index} onClick={()=>handleSetCollection(item)} className='justify-content-center'>
                 <Image layout='fill' src={currentCollection?.id == item.id ? 'https://opensea.io/static/images/checkmark.svg' : item.logo_url} alt={item.logo_url} /> 
                 {item.name}
            </li>
        )
    })

    const onChangeCollections = (e) => {
        setCollectionName(e.target.value)
    }

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
        setIsResetPrice(false)
    }

    return (
        <div ref={sideRef} className={styles.sideFilter}>
            <Sider width={widthScreen >= 768 ? '300px' : '100%'} collapsedWidth={widthScreen >= 768 ? '60px' : '0px'} theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div id='collapseDiv'>
                    <Collapse  expandIconPosition="right" defaultActiveKey={['1', '2']}>
                        <div className={styles.filterTitle}><FilterListIcon /> Filter
                        </div>
                        <Panel header="Price" key="1">
                            <div className={styles.filterPrice}>
                                <div>
                                    <Image objectFit='contain' src={ether} alt='ether ETH' />Ether (ETH)
                                </div>
                                <div className={styles.rangePrice}>
                                    <Input placeholder='Min' type="number" min="0" step="0.01" autoComplete='off' autoCorrect='off' inputMode='decimal' value={minPrice}
                                                onChange={e => setMinMax(e,-1)} onKeyPress={handleKeyPrice}/>

                                        <span>to</span>

                                    <Input placeholder='Max' type="number" min="0" step="0.01" autoComplete='off' autoCorrect='off' inputMode='decimal' value={maxPrice}
                                            onChange={e => setMinMax(e, 1)} onKeyPress={handleKeyPrice} />
                                </div>
                                {wrongPrice && <p className={styles.wrongPrice}>Minimum must be less than maximum</p>}
                                <Button disabled={!wrongPrice ? false : true}  onClick={handleSetPrice} className={styles.applyPrice}>Apply</Button>
                            </div>
                        </Panel>
                        <Panel header="Collections" key="2">
                            <div className={styles.filterCollections}>
                                <Input value={collectionName} prefix={<SearchOutlined />} placeholder="Filter" allowClear onChange={onChangeCollections} />
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
