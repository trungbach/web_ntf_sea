import React, {useState, useEffect} from 'react';
import styles from './detail.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import {Tooltip, Button, Collapse, Select} from 'antd'
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
import ether from '@/public/ether.png'
import noTrading from '@/public/noTrading.svg'
import WebIcon from '@material-ui/icons/Web';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import MoreFromCollection from '@/components/MoreFromCollection'
import Footer from '@/components/Footer'
import noOffer from '@/public/noOffer.svg'
import Listing from '@/components/Listing'
import TradingHistory from '@/components/TradingHistory';
import {getDetailItem, getMoreFromCollection} from '@/pages/api/detail'
import config from '@/config/index'
import Web3Modal from "web3modal"
import { ethers } from 'ethers'
import Market from '@/artifacts/contracts/Market.sol/NFTMarket.json'
import {getDetailNtfBlock, buyItem} from '@/pages/api/detail'
import {createFavorite, deleteFavorite} from '@/pages/api/favorite'
import {useRouter} from 'next/router'
import { connect } from 'react-redux'
import avatarUser from '@/public/avatarUser.png'
const { Panel } = Collapse;
const {Option} = Select

export async function getServerSideProps({ params, req, res }) {
    
    if(!req.headers.cookie) {
        res.writeHead(302, { Location: `/login?${req.url}` })
         res.end();
       
    } else {
        const tokenCookie = req.headers.cookie.split(";")
        .find(c => c.trim().startsWith("token="));
        const token = tokenCookie && tokenCookie.split('=')[1]
        const item = await getDetailItem({ id: params.detail[1], token: token })
    
        const moreFromCollection = await getMoreFromCollection({ collection_id: item.collection_id });
        return {
            props: {
                item,
                moreFromCollection
            }
        }
    }
   
}

const DetailItem = ({item, moreFromCollection, isLoggedIn}) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [nftBlock, setNftBlock] = useState()
    const [isFavorite, setIsFavorite] = useState(item.is_favorite === null ? false : true)
    const [numberFavorite, setNumberFavorite] = useState(item.number_favorites)

    useEffect(() => {
        if(!isLoggedIn) {
           router.push('/login')
      }
    },[isLoggedIn])

    useEffect(() => {
        const getNftBlock = async()=> {
            const nft = await getDetailNtfBlock({id: item.block_id})
            setNftBlock(nft)
        }
        getNftBlock()
    },[])
    
    
    const handleChange = () => {}

    async function buyNft() {
        setLoading(true)
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(config.nftmarketaddress, Market.abi, signer)
        // var currentGasPrice = await provider.getGasPrice();
        // let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
        // console.log(`gas_price: ${ gas_price }`);
        // console.log(`getListingPrice: ${ await contract.getListingPrice() }`);
        /* user will be prompted to pay the asking proces to complete the transaction */
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
        console.log(price)
        const transaction = await contract.createMarketSale(config.nftaddress, nftBlock.tokenId, {
          value: price,
        //   gasLimit: 2100000,
        //   gasPrice: 8000000000
        });
        // console.log(transaction)
        await transaction.wait()
        setLoading(false)
        await buyItem({id: item.id})
        router.push('/assets')
        alert('Buy success!')

    }

    const handleCreateFavorite = () => {
        createFavorite({item_id: item.id})
        setIsFavorite(true)
        setNumberFavorite(numberFavorite+1)
    }

    const handleDeleteFavorite = () => {
        deleteFavorite({item_id: item.id})
        setIsFavorite(false)
        setNumberFavorite(numberFavorite-1)
    }

    return (
    <>
        <div className={`${styles.detail} container-xl`}>

        <div className={styles.detailContainer}>
            <div className={styles.detailLeft}>
                <div className={`${styles.owner} d-block d-md-none mb-5`}>
                    <div>
                        <div>
                            <Link href={`/collection/${item.collection_id}`}><a>{item.collection_name}</a></Link>
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
                    <header><h1>{item.name}</h1></header>
                </div>
                <div className={styles.imgDetail}>
                    <div className={styles.favorite}>
                        {!isFavorite  ? <span onClick={handleCreateFavorite}> <FavoriteBorderIcon /></span> 
                         : <span className={styles.isFavorite} onClick={handleDeleteFavorite}><FavoriteIcon /></span>}
                         <span>{numberFavorite}</span>
                    </div>
                    <div style={{position: 'relative', height: '45rem'}}>
                        <Image layout='fill' src={item.image_url} alt={item.image_url} />
                    </div> 
                </div>
                <div className={`${styles.about} d-none d-md-block`}>
                    <Collapse  expandIconPosition="right" defaultActiveKey={['1']} >
                        <Panel header={<div><SubjectOutlinedIcon /> Description</div>} key="1">
                            <div className={styles.description}>
                                <div className={styles.descriptionHead}>
                                    <Image width={30} height={30} src='https://storage.googleapis.com/opensea-static/opensea-profile/25.png' alt='avatar' />
                                    <span>Created by <Link href={`/address/${item.owner}`}><a>{item.user_name}</a></Link></span>
                                </div>
                                <p>
                                    {nftBlock?.description}
                                </p>
                            </div>
                            
                        </Panel>
                        <Panel header={<div><VerticalSplitRoundedIcon /> About {item.collection_name}</div>} key="2">
                            <div className={styles.aboutPixel}>
                                <div className='d-flex align-items-start'>
                                    <Image  width={60} height={60} src={item.collection_logo} alt={item.collection_logo} />
                                    <span>{item.collection_description}</span>
                                </div>
                                
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
                                    <p style={{fontWeight: 500}}>{nftBlock?.tokenId}</p>
                                </div>
                                <div>
                                    <p>Blockchain</p>
                                    <p style={{fontWeight: 500}}>Ethereum</p>
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
                            <Link href={`/collection/${item.collection_id}`}><a>{item.collection_name}</a></Link>
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
                    <header><h1>{item.name}</h1></header>
                </div>
                <div className={styles.priceDetail}>
                    <div className='d-flex align-items-center'>
                        <div className={styles.imgOwner}>
                            <Image  width={24} height={24} src={avatarUser} alt='avatar' />
                            <span>Owner by <Link href={`/address/${item.owner}`}>{item.user_name}</Link></span>
                        </div>
                    </div>
                    <div className={styles.currentPrice}>
                        <div>
                            <h3>Current price</h3>
                            <div className={styles.numberPrice}>
                                <Image src={ether} alt='ether' />
                                <span className={styles.hightlightNumber}>{item.price}</span>
                            </div>
                            <div className={styles.buyNow} onClick={buyNft}>
                                <Button loading={loading}><AccountBalanceWalletOutlinedIcon /> Buy now</Button>
                            </div>
                        </div>
                      
                        <Collapse  expandIconPosition="right" defaultActiveKey={['1','3']}
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
                                        <Option value="jackss1">Last 7 days</Option>
                                        <Option value="jackss2">Last 14 days</Option>
                                        <Option value="jackss3">Last 30 days</Option>
                                        <Option value="jackss4">Last 60 days</Option>
                                        <Option value="jackss5">Last 90 days</Option>
                                        <Option value="jackss6">Last Year</Option>
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
                    <Collapse  expandIconPosition="right" defaultActiveKey={['1']} >
                        <Panel header={<div><SubjectOutlinedIcon /> Description</div>} key="1">
                            <div className={styles.description}>
                                <div className={styles.descriptionHead}>
                                    <Image width={30} height={30} src={avatarUser} alt='avatar' />
                                    <span>Created by <Link href={`/address/${item.owner}`}><a>{item.user_name}</a></Link></span>
                                </div>
                                <p>{nftBlock?.description}</p>
                            </div>
                            
                        </Panel>
                        <Panel header={<div><VerticalSplitRoundedIcon /> About {item.collection_name}</div>} key="2">
                            <div className={styles.aboutPixel}>
                                <div className='d-flex align-items-start'>
                                    <Image  width={60} height={60} src={item.collection_logo} alt={item.collection_logo} />
                                    <span>{item.collection_description}</span>
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
                                    <p style={{fontWeight: 500}}>{nftBlock?.tokenId}</p>
                                </div>
                                <div>
                                    <p >Blockchain</p>
                                    <p style={{fontWeight: 500}}>Ethereum</p>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
        <div className={styles.history}>
            <Collapse  expandIconPosition="right" defaultActiveKey={['1', '2']} >
                <Panel header={<div><SwapVertRoundedIcon /> Trading History</div>} key="1">
                    <TradingHistory />
                </Panel>
                <Panel header={<div><ViewModuleRoundedIcon /> More from this collection</div>} key="2">
                    <MoreFromCollection moreFromCollection={moreFromCollection.filter(c => c.id !== item.id)} />
                </Panel>
            </Collapse>
        </div>
        <div className={styles.viewCollection}>
            <Link href={`/collection/${item.collection_id}`}>
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

const mapStateToProps = (state) => ({
    isLoggedIn: state.login.isLoggedIn
  })
  
export default connect(mapStateToProps)(DetailItem)
  
