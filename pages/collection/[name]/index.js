import React, {useEffect, useState, useRef} from 'react';
import styles from './style.module.scss';
import Image from 'next/image'
import bannerCollection from '@/public/bannerCollection.png';
import {ExpandLessIcon, ExpandMoreIcon} from '@material-ui/icons';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Input, Select, Button } from 'antd';
import {SearchOutlined  } from '@ant-design/icons'
import Link from 'next/link'
import ItemSell from '@/components/ItemSell'
import Footer from '@/components/Footer'
const {Option} = Select;

const CollectionName = () => {

    const [isSeeMore, setIsSeeMore] = useState(false);
    const [heightDesc, setHeightDesc] = useState();
    const refDesc = useRef();

    useEffect(() => {
        const height = refDesc.clientHeight
        setHeightDesc(height)
        if(height < 80) { 
            refDesc.current.style.height = 'auto';
        } else refDesc.current.style.height = '8rem';
    },[])

  const seeMore = (e) => {
    refDesc.current.style.height = 'auto';
    setIsSeeMore(true);
  }

  const seeLess = (e) => {
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
                <Image style={{objectFit: 'cover'}} src={bannerCollection} alt="banner-collection" />
            </div>
            <div className={`${styles.content} container`}>
                <div className={styles.heading}>
                    <h1>Explore Art</h1>
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
                    { heightDesc > 80 && (
                        !isSeeMore ? <button className={styles.seeMoreBtn} onClick={seeMore}><ExpandMoreIcon /></button>
                        : <button className={styles.seeMoreBtn} onClick={seeLess}> <ExpandLessIcon /></button>
                    )} 
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
                            <Option value="jackss">Price: High to Low</Option>
                            <Option value="jackss">Highest Last Sale</Option>
                            <Option value="jackss">Most Viewed</Option>
                            <Option value="jackss">Most Favorite</Option>
                            <Option value="jackss">Oldest</Option>
                        </Select>
                    </div>
                    <div>
                        <Button><FilterListIcon />Filter</Button>
                    </div>
                </div>
                <div className='row'>
                    {listCollection}
                </div> 
            </div>
        </div>
        <Footer />
        </>
    );
}

export default CollectionName;
