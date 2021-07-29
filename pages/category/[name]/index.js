import React, {useEffect, useState, useRef} from 'react';
import styles from './style.module.scss';
import Image from 'next/image'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Input, Select, Button, Tooltip } from 'antd';
import {SearchOutlined  } from '@ant-design/icons'
import Link from 'next/link'
import ItemSell from '@/components/ItemSell'
import Footer from '@/components/Footer'
import NavBar from '@/components/SideBar';
import bannerCategory from '@/public/bannerCategory.png'
import avatarCategory from '@/public/avatarCategory.png'
import etherSvg from '@/public/etherSvg.svg';
import WebIcon from '@material-ui/icons/Web';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
const {Option} = Select;

const CategoryName = () => {

    const [isSeeMore, setIsSeeMore] = useState(false);
    const [heightDesc, setHeightDesc] = useState(-1);
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    const refDesc = useRef();

    useEffect(() => {
        const height = refDesc.current.clientHeight
        setHeightDesc(height)
        if(height < 80) { 
            refDesc.current.style.height = 'auto';
        } else refDesc.current.style.height = '8rem';
    },[])

  const seeMore = () => {
    refDesc.current.style.height = 'auto';
    setIsSeeMore(true);
  }

  const seeLess = () => {
    refDesc.current.style.height = '8rem';
    setIsSeeMore(false)
  }

  const onChange = () => {}
  const handleChange = () => {}

  const collection = [
      { 
          url: 'url'
      },
      { 
        url: 'url'
        },
        { 
            url: 'url'
        },
        { 
            url: 'url'
        },
        { 
        url: 'url'
        },
        { 
            url: 'url'
        },
        { 
            url: 'url'
        },
        { 
        url: 'url'
        },
        { 
        url: 'url'
        },
        { 
            url: 'url'
        },
        { 
        url: 'url'
        },
        { 
        url: 'url'
        },
  ]

   const listCollection = collection.map((item, index) => {
       return (
            <div key={index} className="col-12 col-md-4 col-lg-3 mb-4">
                <ItemSell />
            </div>
       )
   }) 

    return (
        <>
        <div className={styles.collection}>
            <div className={styles.banner}>
                <Image src={bannerCategory} alt="banner-category" />
            </div>
            <div onClick={()=>setIsShowSideBar(false)} className={styles.overlay} style={{display: isShowSideBar ? 'block' : 'none'}}></div>
            <NavBar isShowSideBar={isShowSideBar} setIsShowSideBar={setIsShowSideBar} />
            <div className={styles.content}>
                <div className="container">
                <div className={styles.heading}>
                    <div className={styles.avatar}>
                        <Image style={{objectFit: 'cover'}} src={avatarCategory} alt="avatar-category" />
                    </div>
                    <h1>Avid Lines</h1>
                    <div className={styles.about}>
                    <div className={styles.aboutContainer}>
                        <div>
                            <Link href='/assets'>
                                <a>
                                    <h3>
                                        454
                                    </h3>
                                    <span>items</span>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href='/assets'>
                                <a>
                                    <h3>
                                        302
                                    </h3>
                                    <span>owners</span>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href='/assets'>
                                <a>
                                    <h3>
                                      <Image width={20} height={20} src={etherSvg} alt='Ether' />  4.75
                                    </h3>
                                    <span>floor price</span>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href='/assets'>
                                <a>
                                    <h3>
                                        <Image width={20} height={20} src={etherSvg} alt='Ether' />  586
                                    </h3>
                                    <span>volume traded</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    </div>
                    
                    <p ref={refDesc}>
                    An online community of makers, developers, and traders is pushing the art world into 
                    new territory. It all started with CryptoPunks, a set of 10,000 randomly generated 
                    punks that proved demand for the digital ownership of non-physical items and 
                    collectibles in 2017, and the market has evolved rapidly ever since.
                    As the underlying technology develops, a growing pool of artists are selling 
                    verified, immutable works to art lovers and speculators, and the space as a whole 
                    is waking up to the power and potential of decentralized networks and currencies. 
                    With creators and collectors generating meaningful revenue through an entirely 
                    digital ecosystem, the tokenization of gifs, memes, and MP4s is emerging as the 
                    most exciting and relevant blockchain use case. From SuperRare to Josie to JOY, 
                    browse and trade NFTs from some of the world&apos;s top crypto artists on OpenSea.
                    </p>
                    {heightDesc > 80 && 
                        !isSeeMore ? <div  type='button' className={styles.seeMoreBtn} onClick={seeMore}><ExpandMoreIcon /></div>
                        : <div type='button' className={styles.seeMoreBtn} onClick={seeLess}> <ExpandLessIcon /></div>}
                </div>
                <div className={styles.social}>
                        <Link href='/'><a>
                            <Tooltip title='Activity'>
                                <span><PlaylistPlayIcon /></span>
                            </Tooltip>
                        </a></Link>
                        <Link href='/'><a>
                            <Tooltip title='Website'>
                                <span><WebIcon /></span>
                            </Tooltip>
                        </a></Link>
                        <Link href='/'><a>
                            <Tooltip title='Discord'>
                            <span><i className="fab fa-discord"></i></span>
                            </Tooltip>
                        </a></Link>
                        <Link href='/'><a>
                            <Tooltip title='Activity'>
                                <span><PlaylistPlayIcon /></span>
                            </Tooltip>
                        </a></Link>
                </div>
                <div className={styles.filter}>
                    <div>
                        <Input prefix={<SearchOutlined />} placeholder="Search" onChange={onChange} />
                    </div>
                    <div className={styles.filterSelect}>
                        <Select
                            labelInValue
                            defaultValue={{ value: 'lucy' }}
                            onChange={handleChange}
                            >
                            <Option value="lucy">Sort by</Option>
                            <Option value="jack">Recently Listed</Option>
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
                <div className='row'>
                    {listCollection}
                </div> 
            </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default CategoryName;
