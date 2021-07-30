import React, {useRef} from 'react';
import styles from './style.module.scss';
import Link from 'next/link'
import {Card, Button} from 'antd';
import Image from 'next/image'
import meeler from '@/public/meeler-promocard.webp'
import blazer from '@/public/Blazers-Promo-Card.webp'
import swoon from '@/public/swoon-promo-card.webp'
import Slider from "react-slick";
import { DownOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

const FeatureExclusive = () => {
    const reference = useRef();

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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

    const exclusiveItem = (
        <div className="p-4">
            <Link href='/category/coca-cola'>
                <a>
                    <Card
                        hoverable
                        cover={<Image  alt="hot asset" src={meeler} />}
                    >
                        <div className={styles.exclusiveItem}>
                            <h3>
                                Meerler&apos;s Creations
                            </h3>
                            <p>
                                A collection of figurative works from Gavin Meeler
                            </p>
                            <Button className={styles.liveBtn}>Live</Button>
                        </div>
                    </Card>
                </a>
            </Link>
        </div>
    )
    return (
        <div className={`container ${styles.featureExclusive}`}>
            <h2 className={styles.titleHome}>
                Exclusive OpenSea drops
            </h2>
            <div className={`${styles.slider} ${styles.listExclusive}`}>
                {renderArrows()}
                <Slider {...settings} ref={reference}>
                    {exclusiveItem}
                    {exclusiveItem}
                    {exclusiveItem}
                    {exclusiveItem}
                    {exclusiveItem}
                    {exclusiveItem}
                    {exclusiveItem}
                    {exclusiveItem}
                    {exclusiveItem}
                </Slider>
            </div>
        </div>
    );
}

export default FeatureExclusive;
