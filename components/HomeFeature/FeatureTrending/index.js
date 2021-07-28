import React, {useRef} from 'react';
import styles from './style.module.scss';
import { Menu, Dropdown, Card, Button } from 'antd';
import { DownOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Image from 'next/image'
import Link from 'next/link'
import all from '@/public/allnfts-light.svg';
import art from '@/public/art-light.svg';
import collectibles from '@/public/collectibles-light.svg';
import domain from '@/public/domain-names-light.svg';
import music from '@/public/music-light.svg';
import sports from '@/public/sports-light.svg';
import trading from '@/public/trading-cards-light.svg';
import utility from '@/public/utility-light.svg';
import virtual from '@/public/virtual-worlds-light.svg';
import Slider from "react-slick";
import meeler from '@/public/meeler-promocard.webp'

const FeatureTrending = () => {
    const reference = useRef();
    const menuMarket = (
        <Menu className={styles.menuMarket}>
            <Menu.Item key={1}>
                <Link href="https://www.antgroup.com">
                    <a>
                        <Image width={24} height={24} src={all} alt='all'></Image>
                        All Categories
                    </a>
                </Link>
            </Menu.Item>
            <Menu.Item key={3}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                <Image width={24} height={24} src={art} alt='art'></Image>
                    Art
                </a>
            </Menu.Item>
            <Menu.Item key={4}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                <Image width={24} height={24} src={music} alt='music'></Image>
                    Music
                </a>
            </Menu.Item>
            <Menu.Item key={5}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                <Image width={24} height={24} src={domain} alt='domain'></Image>
                    Domain Names
                </a>
            </Menu.Item>
            <Menu.Item key={6}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                <Image width={24} height={24} src={virtual} alt='virtual'></Image>
                    Virtual Worlds
                </a>
            </Menu.Item>
            <Menu.Item key={7}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                <Image width={24} height={24} src={trading} alt='trading'></Image>
                    Trading Cards
                </a>
            </Menu.Item>
            <Menu.Item key={8}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                <Image width={24} height={24} src={collectibles} alt='collectibles'></Image>
                    Collectibles
                </a>
            </Menu.Item>
            <Menu.Item key={9}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                <Image width={24} height={24} src={sports} alt='sports'></Image>
                    Sports
                </a>
            </Menu.Item>
            <Menu.Item key={10}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                <Image width={24} height={24} src={utility} alt='utility'></Image>
                    Utility
                </a>
            </Menu.Item>
        </Menu>
    )

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

    const trendingItem = (
        <Link href='/' >
            <a  className={styles.trendingItem}>
                <Card
                    hoverable
                    cover={<Image  alt="hot asset" src={meeler} />}
                >
                    <div className={styles.trendingItemContent}>
                        <div className={styles.avatar}>
                            <Image src={meeler} alt='avatar' />
                        </div>
                        <h3>
                            Pulsar79
                        </h3>
                        <p>
                            by <Link href='/'>Gridacity</Link>
                        </p>
                        <p>Explore the Pulsar79 collection</p>
                    </div>
                </Card>
            </a>
        </Link>
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
                        all categories <DownOutlined />
                        </a>
                    </Dropdown>
                </span> 
            </h2>
            <div className={styles.slider}>
                {renderArrows()}
                <Slider {...settings} ref={reference}>
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                    {trendingItem}
                </Slider>
            </div>
        </div>
    );
}

export default FeatureTrending;
