import React from 'react';
import styles from './name.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import {Tooltip, Button, Collapse, Select, Table, Checkbox} from 'antd'
import RefreshIcon from '@material-ui/icons/Refresh';
import ShareIcon from '@material-ui/icons/Share';
import LaunchIcon from '@material-ui/icons/Launch';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FlagIcon from '@material-ui/icons/Flag';
import GroupIcon from '@material-ui/icons/Group';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import VerticalSplitRoundedIcon from '@material-ui/icons/VerticalSplitRounded';
import TocIcon from '@material-ui/icons/Toc';
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import SwapVertRoundedIcon from '@material-ui/icons/SwapVertRounded';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import ViewModuleRoundedIcon from '@material-ui/icons/ViewModuleRounded';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import imgDetail from '@/public/imgDetail.png';
import ether from '@/public/ether.png'
import noTrading from '@/public/noTrading.svg'
import WebIcon from '@material-ui/icons/Web';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ItemSell from '@/components/ItemSell'
import Footer from '@/components/Footer'
import noOffer from '@/public/noOffer.svg'
import Listing from '@/components/Listing'
import TradingHistory from '@/components/TradingHistory';
const { Panel } = Collapse;
const {Option} = Select
const DetailItem = () => {

    function callback(key) {
         console.log(key);
    }

    const listFromCollection = (
        <>
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
            <ItemSell />
        </>
    )
    const handleChange = () => {}
    return (
    <>
        <div className={`${styles.detail} container-xl`}>

        <div className={styles.detailContainer}>
            <div className={styles.detailLeft}>
                <div className={`${styles.owner} d-block d-md-none mb-5`}>
                    <div>
                        <div>
                            <Link href='/'><a>AIR22</a></Link>
                        </div>
                        <div className={styles.action}>
                            <Tooltip title='Refresh metadata'>
                                <span><RefreshIcon /></span>
                            </Tooltip>
                            <Tooltip title='View on AIR22'>
                                <span><Link href='/'><a style={{color: 'inherit'}}><LaunchIcon /></a></Link></span>
                            </Tooltip>
                            <Tooltip title='Share'>
                                <span><ShareIcon /></span>
                            </Tooltip>
                            <Tooltip title='More'>
                                <span><MoreVertIcon /></span>
                            </Tooltip>
                        </div>
                    </div>
                    <header><h1>Mystic Toten</h1></header>
                </div>
                <div className={styles.imgDetail}>
                    <div className={styles.favorite}>
                        <FavoriteBorderIcon /> <span>5</span>
                    </div>
                    <div>
                        <Image src={imgDetail} alt='imgDetail' />
                    </div> 
                </div>
                <div className={`${styles.about} d-none d-md-block`}>
                    <Collapse  expandIconPosition="right" defaultActiveKey={['1']} onChange={callback}>
                        <Panel header={<div><SubjectOutlinedIcon /> Description</div>} key="1">
                            <div className={styles.description}>
                                <div className={styles.descriptionHead}>
                                    <Image width={30} height={30} src='https://storage.googleapis.com/opensea-static/opensea-profile/25.png' alt='avatar' />
                                    <span>Created by <Link href='/'><a>1B9BB7</a></Link></span>
                                </div>
                                <p>
                                    10,000 unique on-chain avatar NFTs generated using a cellular automaton.
                                </p>
                            </div>
                            
                        </Panel>
                        <Panel header={<div><VerticalSplitRoundedIcon /> About PixelGlyphs</div>} key="2">
                            <div className={styles.aboutPixel}>
                                <div className='d-flex align-items-start'>
                                    <Image  width={60} height={60} src='https://lh3.googleusercontent.com/CVNrW79CrsCsF_oiNHicb7p6dy6uO6suXgNZUvGBniFi2zYC2WPbZ7YEY5Nm99TDE1ph389Sa3ql0_GKWO0OmZpUXr6I8W4MmtG0=w128' alt='des' />
                                    <span>Pixelglyphs are a set of 10,000 unique on-chain avatar NFTs created using a cellular automaton on the Ethereum blockchain.</span>
                                </div>
                                <p>
                                    Your Pixelglyph is created at random during the minting process. The cellular automaton algorithm runs on-chain, an NFT first. Pixel data and colors are stored on-chain. Your Pixelglyph can be re-created at any time using code.
                                </p>
                                <p>
                                    Your Pixelglyph can act as your anonymous avatar across the internet and within your favorite dApps.
                                </p>
                                <p>
                                    Each Pixelglyph you own will allow you to redeem a &quot;.glyph&quot; NFT. Learn more at pixelglyphs.io
                                </p>
                                <div className={styles.social}>
                                    <Tooltip title='Activity'>
                                        <span><PlaylistPlayIcon /></span>
                                    </Tooltip>
                                    <Tooltip title='Website'>
                                        <span><WebIcon /></span>
                                    </Tooltip>
                                    <Tooltip title='Discord'>
                                        <span><i className="fab fa-discord"></i></span>
                                    </Tooltip>
                                    <Tooltip title='Twitter'>
                                        <span><i className="fab fa-twitter"></i></span>
                                    </Tooltip>
                                </div>
                            </div>
                        </Panel>
                        <Panel header={<div><BallotRoundedIcon /> Details</div>}  key="3">
                            <div className={styles.detailsAddress}>
                                <div>
                                    <p>Contract Address</p>
                                    <Link href='/'><a>0xdf38d...4ea6</a></Link>
                                </div>
                                <div>
                                    <p>Token ID</p>
                                    <p>6577</p>
                                </div>
                                <div>
                                    <p>Blockchain</p>
                                    <p>Ethereum</p>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
            <div className={styles.detailRight}>
                <div className={`${styles.owner} d-none d-md-block`}>
                    <div>
                        <div>
                            <Link href='/'><a>AIR22</a></Link>
                        </div>
                        <div className={styles.action}>
                            <Tooltip title='Refresh metadata'>
                                <span><RefreshIcon /></span>
                            </Tooltip>
                            <Tooltip title='View on AIR22'>
                                <span><Link href='/'><a style={{color: 'inherit'}}><LaunchIcon /></a></Link></span>
                            </Tooltip>
                            <Tooltip title='Share'>
                                <span><ShareIcon /></span>
                            </Tooltip>
                            <Tooltip title='More'>
                                <span><MoreVertIcon /></span>
                            </Tooltip>
                        </div>
                    </div>
                    <header><h1>Mystic Toten</h1></header>
                </div>
                <div className={styles.priceDetail}>
                    <div className='d-flex align-items-center'>
                        <div className={styles.imgOwner}>
                            <Image  width={24} height={24} src='https://storage.googleapis.com/opensea-static/opensea-profile/14.png' alt='avatar' />
                            <span>Owner by <Link href='/'>Tagline</Link></span>
                        </div>
                        <div>
                            <VisibilityIcon />
                            <span>1</span> view
                        </div>
                    </div>
                    <div className={styles.currentPrice}>
                        <div>
                            <h3>Current price</h3>
                            <div className={styles.numberPrice}>
                                <Image src={ether} alt='ether' />
                                <span className={styles.hightlightNumber}>0,2</span> <span>($462,81)</span>
                            </div>
                            <div className={styles.buyNow}>
                                <Button><AccountBalanceWalletOutlinedIcon /> Buy now</Button>
                            </div>
                        </div>
                      
                        <Collapse  expandIconPosition="right" defaultActiveKey={['1','3']} onChange={callback}
                                className={styles.customCollapse}
                        >
                            <Panel className={styles.customCollapsePanel} header={<div><TimelineOutlinedIcon /> Price history</div>} key="1">
                                <div className={styles.priceHistory}>
                                    <Select
                                    labelInValue
                                    defaultValue={{ value: 'lucy' }}
                                    dropdownClassName={styles.selectPrice}
                                    onChange={handleChange}
                                    >
                                        <Option value="jackss">Last 7 days</Option>
                                        <Option value="jackss">Last 14 days</Option>
                                        <Option value="jackss">Last 30 days</Option>
                                        <Option value="jackss">Last 60 days</Option>
                                        <Option value="jackss">Last 90 days</Option>
                                        <Option value="jackss">Last Year</Option>
                                        <Option value="lucy">All Time</Option>
                                    </Select>
                                    <div className={styles.noTraffic}>
                                        <Image src={noTrading} alt='no-trading'></Image>
                                    </div>
                                </div>
                            </Panel>
                            <Panel header={<div><LocalOfferIcon /> Listings</div>} key="2">
                                <Listing />
                            </Panel>
                            <Panel header={<div><TocIcon /> Offers</div>}  key="3">
                                <div className={styles.noTraffic}>
                                    <Image src={noOffer} alt='no-offer' />
                                    <div>No offers yet</div>
                                </div>
                                <div className={styles.makeOffer}>
                                    <Button className={styles.primaryButton}>Make Offer</Button>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
                <div className={`${styles.about} d-block d-md-none mt-5`}>
                    <Collapse  expandIconPosition="right" defaultActiveKey={['1']} onChange={callback}>
                        <Panel header={<div><SubjectOutlinedIcon /> Description</div>} key="1">
                            <div className={styles.description}>
                                <div className={styles.descriptionHead}>
                                    <Image width={30} height={30} src='https://storage.googleapis.com/opensea-static/opensea-profile/25.png' alt='avatar' />
                                    <span>Created by <Link href='/'><a>1B9BB7</a></Link></span>
                                </div>
                                <p>
                                    10,000 unique on-chain avatar NFTs generated using a cellular automaton.
                                </p>
                            </div>
                            
                        </Panel>
                        <Panel header={<div><VerticalSplitRoundedIcon /> About PixelGlyphs</div>} key="2">
                            <div className={styles.aboutPixel}>
                                <div className='d-flex align-items-start'>
                                    <Image  width={60} height={60} src='https://lh3.googleusercontent.com/CVNrW79CrsCsF_oiNHicb7p6dy6uO6suXgNZUvGBniFi2zYC2WPbZ7YEY5Nm99TDE1ph389Sa3ql0_GKWO0OmZpUXr6I8W4MmtG0=w128' alt='des' />
                                    <span>Pixelglyphs are a set of 10,000 unique on-chain avatar NFTs created using a cellular automaton on the Ethereum blockchain.</span>
                                </div>
                                <p>
                                    Your Pixelglyph is created at random during the minting process. The cellular automaton algorithm runs on-chain, an NFT first. Pixel data and colors are stored on-chain. Your Pixelglyph can be re-created at any time using code.
                                </p>
                                <p>
                                    Your Pixelglyph can act as your anonymous avatar across the internet and within your favorite dApps.
                                </p>
                                <p>
                                    Each Pixelglyph you own will allow you to redeem a &quot;.glyph&quot; NFT. Learn more at pixelglyphs.io
                                </p>
                                <div className={styles.social}>
                                    <Tooltip title='Activity'>
                                        <span><PlaylistPlayIcon /></span>
                                    </Tooltip>
                                    <Tooltip title='Website'>
                                        <span><WebIcon /></span>
                                    </Tooltip>
                                    <Tooltip title='Discord'>
                                        <span><i className="fab fa-discord"></i></span>
                                    </Tooltip>
                                    <Tooltip title='Twitter'>
                                        <span><i className="fab fa-twitter"></i></span>
                                    </Tooltip>
                                </div>
                            </div>
                        </Panel>
                        <Panel header={<div><BallotRoundedIcon /> Details</div>}  key="3">
                            <div className={styles.detailsAddress}>
                                <div>
                                    <p>Contract Address</p>
                                    <Link href='/'><a>0xdf38d...4ea6</a></Link>
                                </div>
                                <div>
                                    <p>Token ID</p>
                                    <p>6577</p>
                                </div>
                                <div>
                                    <p>Blockchain</p>
                                    <p>Ethereum</p>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
            <div className={styles.history}>
                <Collapse  expandIconPosition="right" defaultActiveKey={['1', '2']} onChange={callback}>
                    <Panel header={<div><SwapVertRoundedIcon /> Trading History</div>} key="1">
                        <TradingHistory />
                    </Panel>
                    <Panel header={<div><ViewModuleRoundedIcon /> More from this collection</div>} key="2">
                        <div className={styles.moreFromCollection}>
                            {listFromCollection}
                        </div>
                    </Panel>
                </Collapse>
            </div>
            <div className={styles.viewCollection}>
                <Link href='/collection/art'>
                    <a className={styles.primaryButton}>
                    View Collection
                    </a>
                </Link>
            </div>
        </div>
       
        <Footer />
    </>
    );
}

export default DetailItem;
