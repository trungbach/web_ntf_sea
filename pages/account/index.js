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

export async function getServerSideProps({ req, res }) {
   
    const myAsset = await getMyAsset({ req, res })
    const myCreated = await getMyCreated({ req, res })
    const myFavorited = await getMyFavorited({ req, res })
    return {
        props: {
            myAsset,
            myCreated,
            myFavorited
        }
    }
}

const Account = ({myAsset, myCreated, myFavorited, isLoggedIn, user}) => {
    const router = useRouter()
    const [filterObj, setFilterObj] = useState({ key: '', min_price: '', max_price: '' })
    const [searchText, setSearchText] = useState('');
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState()
    const [coverUrl, setCoverUrl] = useState()
    const [currentTab, setCurrentTab] = useState('collected')
    console.log('user', user)
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

    useEffect(() => {
        if(user !== undefined) {
            setAvatarUrl(user.avatar_url)
            setCoverUrl(user.cover_url)
        }
    }, [user, router])

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
              <Image layout='fill' objectFit='cover' src={coverUrl || bannerCollection} alt="cover" />
            </div>
            <div onClick={()=>setIsShowSideBar(false)} className={styles.overlay} style={{display: isShowSideBar ? 'block' : 'none'}}></div>
            {/* <NavBar setPrice={setPrice} isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} /> */}
            <div className={styles.content}>
                <div className="container" style={{marginBottom: '5rem'}}>
                    <div className={styles.heading}>
                        <div className={styles.avatar}>
                           <Image layout='fill' style={{objectFit: 'cover'}} src={avatarUrl || avatar} alt="avatar" />
                        </div>
                        <h1>{user?.username}</h1>
                        <p>{user?.description}</p>
                        <div className={styles.about}>
                            {user?.public_address}
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
                    {/* <TabPane tab="Hidden" key="4">
                        Hidden
                    </TabPane> */}
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





