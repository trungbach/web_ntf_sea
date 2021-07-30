import React,{useRef}  from 'react';
import styles from './style.module.scss';
import Image from 'next/image'
import Link from 'next/link'
import Slider from "react-slick";
import { Card, Button } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import sellOn from '@/public/sell-on-opensea.png';
const FeatureResource = () => {
    const reference = useRef();
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
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

    const trendingItem = (
        <Link href='/' >
            <a  className={styles.trendingItem}>
                <Card
                    hoverable
                    cover={<Image  alt="hot asset" src={sellOn} />}
                >
                    <div className={styles.trendingItemContent}>
                        <h3>
                            How to safely purchase NFTs on Opensea
                        </h3>
                    </div>
                </Card>
            </a>
        </Link>
    )
    return (
        <div className={styles.featureResource}>
            <div className="container">
                <h2 className={styles.titleHome}>
                    Resource for getting started
                </h2>
                <div className={styles.slider}>
                {renderArrows()}
                <Slider {...settings} ref={reference}>
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                </Slider>
            </div>
            </div>
        </div>
    );
}

export default FeatureResource;
