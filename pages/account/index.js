import React, {useEffect, useState} from 'react';
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
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import styles from './style.module.scss';
import avatar from '@/public/30.png'
import bannerCollection from '@/public/bannerCollection.png'
const { TabPane } = Tabs;
const {Option} = Select;
import { getProfileById} from '@/pages/api/user'

export async function getServerSideProps({ req, res, query }) {
    const myAsset = await getMyAsset({ user_id: query.user_id })
    const myCreated = await getMyCreated({ user_id: query.user_id })
    const myFavorited = await getMyFavorited({ user_id: query.user_id })
    const infoUser = await getProfileById({ id: query.user_id })
    return {
        props: {
            myAsset,
            myCreated,
            myFavorited,
            infoUser
        }
    }
}

const Account = ({myAsset, myCreated, myFavorited, isLoggedIn, user, infoUser}) => {
    const router = useRouter()
    const [filterObj, setFilterObj] = useState({ key: '', min_price: '', max_price: '' })
    const [searchText, setSearchText] = useState('');
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    const [currentTab, setCurrentTab] = useState('collected')
    const setPrice = (minPrice, maxPrice) => {
        setFilterObj({...filterObj, min_price: minPrice, max_price: maxPrice})
    }

    useEffect(() => {
        setCurrentTab(router.query.tab)
    },[router.query])

    useEffect(() => {
        if(!isLoggedIn) {
           router.push('/login')
      }
    },[isLoggedIn])

    const handleChange = () => {}

    const listMyCreated = myCreated.length > 0 ? myCreated.map((item, index) => {
      return (
        <div key={index} className="col-12 col-md-4 col-xl-3 col-xxl-2 mb-4">
            <ItemSell item={item}/>
        </div>
      )
    }) : (<div style={{textAlign: 'center', fontWeigh: 500, fontSize: '2rem'}}>You are not create any item.</div>)
  
    const listMyAsset = myAsset.length > 0 ? myAsset.map((item, index) => {
        return (
          <div key={index} className="col-12 col-md-4 col-xl-3 col-xxl-2 mb-4 ">
              <ItemSell item={item}/>
          </div>
        )
      }) : (<div style={{textAlign: 'center', fontWeigh: 500, fontSize: '2rem'}} >You are not buy any item !</div>)

    const listMyFavorited =  myFavorited.length > 0 ? myFavorited.map((item, index) => {
        return (
            <div key={index} className="col-12 col-md-4 col-xl-3 col-xxl-2 mb-4">
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
              <Image layout='fill' objectFit='cover' src={infoUser.cover_url || bannerCollection} alt="cover" />
            </div>
            {/* <div onClick={()=>setIsShowSideBar(false)} className={styles.overlay} style={{display: isShowSideBar ? 'block' : 'none'}}></div> */}
            {/* <NavBar setPrice={setPrice} isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} /> */}
            <div className={styles.content}>
                <div className="container" style={{marginBottom: '5rem'}}>
                    <div className={styles.heading}>
                        <div className={styles.avatar}>
                           <Image layout='fill' style={{objectFit: 'cover'}} src={infoUser.avatar_url || avatar} alt="avatar" />
                        </div>
                        <h1>{infoUser.username}</h1>
                        <p>{infoUser.description}</p>
                        <div className={styles.about}>
                            {infoUser.public_address}
                        </div>
                    </div>
                    {/* <div className={styles.social}>
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
                    </div> */}
            
                    {/* <div className={styles.filter}>
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
                    </div> */}
                </div>
                <Tabs tabPosition='left' activeKey={currentTab} onChange={(activeKey)=>setCurrentTab(activeKey)}>
                    <TabPane tab="Collected" key='collected'>
                        <div className={`row ${styles.taList}`}>
                            {listMyAsset}
                        </div>
                    </TabPane>
                    <TabPane tab="Created" key='created'>
                        <div className={`row ${styles.taList}`}>
                            {listMyCreated}
                        </div>
                    </TabPane>
                    <TabPane tab="Favorited" key="favorites">
                        <div className={`row ${styles.taList}`}>
                            {listMyFavorited}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        <Footer />
        </>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.login.isLoggedIn,
    user: state.login.user
})

export default connect(mapStateToProps)(Account)





