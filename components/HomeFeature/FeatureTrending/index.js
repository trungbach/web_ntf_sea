import React, {useRef, useState} from 'react';
import styles from './style.module.scss';
import { Menu, Dropdown, Card, Button } from 'antd';
import { DownOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Image from 'next/image'
import Link from 'next/link'
import all from '@/public/allnfts-light.svg';
import Slider from "react-slick";

const FeatureTrending = ({rankingCollection, listCategory, setCategoryId}) => {

    const reference = useRef();
    const [currentCategory, setCurrentCategory] = useState('all categories')

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
        ]
      };

    const listTrending = rankingCollection.map((item, index) => {
        if(index < 12) {
            return (
            <Link key={index} href={`/collection/${item.id}`} >
                <a  className={styles.trendingItem}>
                    <Card
                        hoverable
                        cover={<Image layout='fill' alt={item.cover_thumb_url} src={item.cover_thumb_url} />}
                    >
                        <div className={styles.trendingItemContent}>
                            <div className={styles.avatar}>
                                <Image layout='fill' src={item.logo_thumb_url} alt={item.logo_thumb_url} />
                            </div>
                            <h3>
                                {item.name}
                            </h3>
                            <p>{item.description}</p>
                        </div>
                    </Card>
                </a>
            </Link>
            )
        } else return ''
    })  

    const categories = listCategory.length > 0 ? listCategory.map((item, index) => {
        return (
            <Menu.Item key={index+1} onClick={()=>{setCategoryId(item.id); setCurrentCategory(item.name)}}>
                <Image width={24} height={24} src={item.logo_thumb_url} alt={item.logo_thumb_url} />
                {item.name}
            </Menu.Item>
        )
    }) : []

    const menuMarket = (
        <Menu className={styles.menuMarket}>
            <Menu.Item key={0} onClick={()=>{setCategoryId(''); setCurrentCategory('all categories')}}>
                <Image width={24} height={24} src={all} alt='all'></Image>
                 All Categories
            </Menu.Item>
            {categories}
        </Menu>
    )

    const renderArrows = () => {
        return (
          <div className={styles.sliderArrow}>
            <Button
              className={styles.arrowBtn}
              onClick={() => reference.current.slickPrev()}
            >
              <span><LeftCircleOutlined /></span>
            </Button>
            <Button
              className={styles.arrowBtn}
              onClick={() => reference.current.slickNext()}
            >
              <span><RightCircleOutlined /></span>
            </Button>
          </div>
        );
    }
    return (
        <div className={`container ${styles.trendingContainer}`}>
            <h2 className={styles.titleHome}>
                Trending in 
                <span>
                    <Dropdown overlay={menuMarket} trigger={['click']} overlayClassName={styles.dropdown}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {currentCategory} <DownOutlined />
                        </a>
                    </Dropdown>
                </span> 
            </h2>
            <div className={styles.slider}>
                {renderArrows()}
                <Slider {...settings} ref={reference}>
                    {listTrending}
                </Slider>
            </div>
        </div>
    );
}

export default FeatureTrending;
