import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import Image from 'next/image'
import FilterListIcon from '@material-ui/icons/FilterList';
import {Input, Select, Button, Tooltip } from 'antd';
import {SearchOutlined  } from '@ant-design/icons'
import Link from 'next/link'
import ItemSell from '@/components/ItemSell'
import Footer from '@/components/Footer'
import NavBar from '@/components/SideBar';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import {getMyAsset, getMyCreated, getMyFavorited} from '@/pages/api/asset'
import {useRouter} from 'next/router'
import avatar from '@/public/30.png'
import cover from '@/public/cover.jpg'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import LoginPage from '@/components/LoginPage'

const { TabPane } = Tabs;
const {Option} = Select;

export async function getServerSideProps({ req }) {
    if(req.headers.cookie) {
        const tokenCookie = req.headers.cookie.split(";")
        .find(c => c.trim().startsWith("token="));
        const token = tokenCookie && tokenCookie.split('=')[1]
        const myAsset = await getMyAsset({ token: token })
        const myCreated = await getMyCreated({ token: token })
        const myFavorited = await getMyFavorited({ token: token })
    
        return {
            props: {
                myAsset,
                myCreated,
                myFavorited
            }
        }
    } else {
        return {
            props: {
                myAsset: [],
                myCreated: [],
                myFavorited: []
            }
        }
    }

}

const CollectionName = ({myAsset, myCreated, myFavorited, isLoggedIn}) => {
    console.log('myCreated', myCreated)
    console.log('myFavorited', myFavorited)
    const [filterObj, setFilterObj] = useState({ key: '', min_price: '', max_price: '' })
    const [searchText, setSearchText] = useState('');
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    const router = useRouter()

    const setPrice = (minPrice, maxPrice) => {
        setFilterObj({...filterObj, min_price: minPrice, max_price: maxPrice})
    }

    if(!isLoggedIn) {
        return (
            <LoginPage />
        )
    }

  const handleChange = () => {}

    const listMyCreated = myCreated.length > 0 ? myCreated.map((item, index) => {
      return (
        <div key={index} className="col-12 col-md-4 col-lg-3 mb-4">
            <ItemSell item={item}/>
        </div>
      )
    }) : (<div style={{textAlign: 'center', fontWeigh: 500, fontSize: '2rem'}}>You are not create any item.</div>)
  
    const listMyAsset = myAsset.length > 0 ? myAsset.map((item, index) => {
        return (
          <div key={index} className="col-12 col-md-4 col-lg-3 mb-4">
              <ItemSell item={item}/>
          </div>
        )
      }) : (<div style={{textAlign: 'center', fontWeigh: 500, fontSize: '2rem'}} >You are not buy any item !</div>)

    const listMyFavorited =  myFavorited.length > 0 ? myFavorited.map((item, index) => {
        return (
            <div key={index} className="col-12 col-md-4 col-lg-3 mb-4">
                <ItemSell item={item}/>
            </div>
        )
    }) : (<div style={{textAlign: 'center', fontWeigh: 500, fontSize: '2rem'}}>You have not favorited any item yet !</div>)

    const onKeyDown = e => {
        if(e.key === "Enter") {
            setFilterObj({...filterObj, key: searchText})
        }
    }

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <>
        <div className={styles.collection}>
            <div className={styles.banner}>
                <Image layout='fill' objectFit='cover' src={cover} alt="cover" />
            </div>
            <div onClick={()=>setIsShowSideBar(false)} className={styles.overlay} style={{display: isShowSideBar ? 'block' : 'none'}}></div>
            <NavBar setPrice={setPrice} isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} />
            <div className={styles.content}>
                <div className="container">
                    <div className={styles.heading}>
                        <div className={styles.avatar}>
                            <Image layout='fill' style={{objectFit: 'cover'}} src={avatar} alt="avatar" />
                        </div>
                        {/* <h1>{collection.name}</h1> */}
                        <div className={styles.about}>
                            {/* address */}
                        </div>
                    </div>
                    <div className={styles.social}>
                        <Link href='/'><a>
                            <Tooltip title='Settings'>
                            <span><i className="fab fa-discord"></i></span>
                            </Tooltip>
                        </a></Link>
                        <Link href='/'><a>
                            <Tooltip title='Share'>
                                <span><PlaylistPlayIcon /></span>
                            </Tooltip>
                        </a></Link>
                    </div>
            
                    <div className={styles.filter}>
                        <div>
                            <Input prefix={<SearchOutlined />} placeholder="Search" onChange={e => setSearchText(e.target.value)}  onKeyPress={onKeyDown} />
                        </div>
                        <div className={styles.filterSelect}>
                            <Select
                                labelInValue
                                defaultValue={{ value: 'lucy' }}
                                onChange={handleChange}
                                >
                                <Option value="lucy">Sort by</Option>
                                <Option value="jac1k">Recently Listed</Option>
                                <Option value="jack">Recently Sold</Option>
                                <Option value="jacks">Ending Soon</Option>
                                <Option value="jackss">Price: Low to High</Option>
                                <Option value="jackss1">Price: High to Low</Option>
                                <Option value="jackss2">Highest Last Sale</Option>
                                <Option value="jackss3">Most Viewed</Option>
                                <Option value="jackss4">Most Favorite</Option>
                                <Option value="jackss5">Oldest</Option>
                            </Select>
                        </div>
                        <div>
                            <Button className={styles.buttonShowFilter} onClick={()=>setIsShowSideBar(true)}><FilterListIcon />Filter</Button>
                        </div>
                    </div>
                </div>
                <Tabs tabPosition='left'>
                    <TabPane tab="Collected" key="1">
                        <div className="row">
                            {listMyAsset}
                        </div>
                    </TabPane>
                    <TabPane tab="Created" key="2">
                        <div className="row">
                            {listMyCreated}
                        </div>
                    </TabPane>
                    <TabPane tab="Favorited" key="3">
                        <div className="row">
                            {listMyFavorited}
                        </div>
                    </TabPane>
                    <TabPane tab="Hidden" key="4">
                        Hidden
                    </TabPane>
                </Tabs>
            </div>
        </div>
        <Footer />
        </>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.login.isLoggedIn
})

export default connect(mapStateToProps)(CollectionName)





