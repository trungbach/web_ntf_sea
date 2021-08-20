import React, {useState, useEffect} from 'react';
import styles from './detail.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import {Tooltip, Button, Collapse, Select, Modal, Input} from 'antd'
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
import noOffer from '@/public/noOffer.svg'
import Listing from '@/components/Listing'
import TradingHistory from '@/components/TradingHistory';
import {getDetailItem, getMoreFromCollection} from '@/pages/api/detail'
import config from '@/config/index'
import Web3Modal from "web3modal"
import { ethers } from 'ethers'
import Market from '@/artifacts/contracts/Market.sol/NFTMarket.json'
import {getDetailNtfBlock, buyItem, reSellItem} from '@/pages/api/detail'
import {createFavorite, deleteFavorite} from '@/pages/api/favorite'
import {useRouter} from 'next/router'
import { connect } from 'react-redux'
import avatarUser from '@/public/avatarUser.png'
import { ToastContainer, toast } from 'react-toastify';
import { getMyCreated } from '@/pages/api/asset'

import NFT from '@/artifacts/contracts/NFT.sol/NFT.json'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/Footer'))
const MoreFromCollection = dynamic(() => import('@/components/MoreFromCollection'))
const { Panel } = Collapse;
const {Option} = Select

export async function getServerSideProps({ params, req, res }) {

    const item = await getDetailItem({ id: params.detail[1], req, res})
    const moreFromCollection = await getMoreFromCollection({ collection_id: item.collection_id });
   
    return {
        props: {
            item,
            moreFromCollection,
        }
    }
    
}

const DetailItem = ({item, moreFromCollection, isLoggedIn, user}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isFavorite, setIsFavorite] = useState(item.is_favorite === null ? false : true)
    const [numberFavorite, setNumberFavorite] = useState(item.number_favorites)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalResell, setIsModalResell] = useState(false);
    const [nftBlock, setNftBlock] = useState(null)
    const [currentPrice, setCurrentPrice] = useState(item.price)
    const [isCreated, setIsCreated] = useState(false)
    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModalResell = () => {
        setIsModalResell(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOkResell = () => {
        setIsModalResell(false);
    };

    const handleCancelResell = () => {
        setIsModalResell(false);
    };

    useEffect(() => {
        const getNftBlock = async()=> {
            const nft = await getDetailNtfBlock({id: item.block_id})
            setNftBlock(nft)
        }
        getNftBlock()
    },[])

    useEffect(() => {
        const checkCreated = async()=> {
            const myCreated = await getMyCreated({user_id: user.id})
            setIsCreated(myCreated.length > 0 ? true : false)
        }
        checkCreated()
    }, [])

    useEffect(() => {
        if(!isLoggedIn) {
           router.push('/login')
      }
    },[isLoggedIn])

    const handleChange = () => {}

    async function buyNft() {
        setLoading(true)
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(config.nftmarketaddress, Market.abi, signer)
        /* user will be prompted to pay the asking proces to complete the transaction */

        const price = ethers.utils.parseUnits(item.price.toString(), 'ether') 

        const transaction = await contract.createMarketSale(config.nftaddress, item.block_id, {
          value: price,
        }).catch(function (e) {
            // Transaction rejected or failed
             if(e.code == 'INSUFFICIENT_FUNDS' ) {
                toast.error('INSUFFICIENT FUNDS', {position: 'top-right', autoClose: 2000})
                setLoading(false)
                return
            } else {
                toast.error(e.message, {position: 'top-right', autoClose: 2000})
                setLoading(false)
                return
            }
          });

        if(transaction === undefined){
            return
        } 
      
        await transaction.wait()
        setLoading(false)
        handleOk()
        await buyItem({id: item.id})
        toast.dark('Buy Success!', {position: "top-right", autoClose: 2000,})
        router.push('/assets')

    }

    async function reSell(newPrice) {
        setLoading(true)
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        let contract = new ethers.Contract(config.nftaddress, NFT.abi, signer)
        isCreated && await contract.userApproval()
        contract = new ethers.Contract(config.nftmarketaddress, Market.abi, signer)
        const price = ethers.utils.parseUnits(newPrice, 'ether')
        const fee = ethers.utils.parseUnits((Number(newPrice)/100).toString(), 'ether')
        const transaction = await contract.reCreateMarketItem(config.nftaddress, item.block_id, price,{ value: fee })
                            .catch(function (e) {
                                // Transaction rejected or failed
                                if(e.code == 'INSUFFICIENT_FUNDS' ) {
                                    toast.error('INSUFFICIENT FUNDS', {position: 'top-right', autoClose: 2000})
                                    setLoading(false)
                                    return
                                } else {
                                    toast.error(e.message, {position: 'top-right', autoClose: 2000})
                                    setLoading(false)
                                    return
                                }
                            });
        if(transaction === undefined){
            return
        } 

        await transaction.wait()

        setLoading(false)
        handleOkResell()
        await reSellItem({id: item.id, data: {price: currentPrice}})
        toast.dark('Resell Success!', {position: "top-right", autoClose: 2000,})
        router.push('/assets')
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
    <div className={styles.detail}>
        <div className="container-xl">
       
        <Modal  width={700} centered title="Complete checkout" visible={isModalVisible} 
                onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button style={{padding: '1.5rem 3rem'}} className={styles.secondaryButton} key="submit" loading={loading} onClick={buyNft}>
                      Checkout
                    </Button>,
                    <span key='loading' className={styles.notifyProccess}>{loading &&  `Please wait... The process may take a few minutes`}</span>
                  ]}
        >
            <div className={styles.checkoutForm}>
                <div>
                    <div>Item</div>
                    <div>Subtotal</div> 
                </div>
                <div>
                    <div className={styles.itemCheckout}>
                        <Image src={item.image_url} alt={item.image_url} width={80} height={100} />
                        <div>
                            <Link href={`/collection/${item.collection_id}`}><a>{item.collection_name}</a></Link>
                            <div>{item.name}</div>
                        </div>
                    </div>
                    <div className={styles.price}>
                        <Image src={ether} alt='ether' width={12} height={15} objectFit='contain' />
                        <span>{item.price}</span>
                    </div>
                </div>
                <div>
                    <div>Total</div>
                    <div className={styles.total}>
                        <Image src={ether} alt='ether' width={12} height={15} objectFit='contain' />
                        <span className={styles.totalPrice}>{item.price}</span>
                    </div>
                </div>
            </div>
        </Modal>
        <Modal  width={700} title="Resell" centered visible={isModalResell} onOk={handleOkResell} onCancel={handleCancelResell}
                footer={[
                    <Button style={{padding: '1.5rem 3rem'}} className={styles.secondaryButton} key="submit" loading={loading} onClick={()=>reSell(currentPrice)}>
                        Sell
                    </Button>,
                    <span key='loading' className={styles.notifyProccess}>{loading &&  `Please wait... The process may take a few minutes`}</span>
                ]}
        >
                <div className={styles.changePrice}>
                    <label htmlFor="newprice">New Price:</label>
                    <Input name='newprice' type="number" min="0.01" step="0.01" autoComplete='off' autoCorrect='off' inputMode='decimal' value={currentPrice} onChange={e => setCurrentPrice(e.target.value)}/>
                </div>
         </Modal>
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
                    <div style={{position: 'relative', height: '45rem'}} className={styles.imageItem}>
                        <Image layout='fill' objectFit='contain' unoptimized='true' quality='100'  priority='true' src={item.image_url} alt={item.image_url} />
                    </div> 
                </div>
                <div className={`${styles.about} d-none d-md-block`}>
                    <Collapse  expandIconPosition="right" defaultActiveKey={['1']} >
                        <Panel header={<div><SubjectOutlinedIcon /> Description</div>} key="1">
                            <div className={styles.description}>
                                <div className={styles.descriptionHead}>
                                    <Image quality='50' width={30} height={30} src={item.avatar_url || avatarUser} alt='avatar' />
                                    <span>Created by <Link href={`/account?user_id=${item.user_id}`}><a>{item.user_name}</a></Link></span>
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
                                
                                {/* <div className={styles.social}>
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
                                </div> */}
                            </div>
                        </Panel>
                        <Panel header={<div><BallotRoundedIcon /> Details</div>}  key="3">
                            <div className={styles.detailsAddress}>
                                <div>
                                    <p>Contract Address</p>
                                    <p  style={{fontWeight: 500}}>{config.nftaddress}</p>
                                </div>
                                <div>
                                    <p>Token ID</p>
                                    <p style={{fontWeight: 500}}>{nftBlock?.tokenId}</p>
                                </div>
                                <div>
                                    <p>Seller</p>
                                    <p style={{fontWeight: 500}}>{item.owner}</p>
                                </div>
                                <div>
                                    <p>NFT</p>
                                    <p style={{fontWeight: 500}}>{item.block_id}</p>
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
                            <Image quality='50'  width={24} height={24} src={item.avatar_url || avatarUser} alt='avatar' />
                            {/* <span>Owner by <Link href={`/address/${item.owner}`}>{item.user_name}</Link></span> */}
                            <span>Created by <Link href={`/account?user_id=${item.user_id}`}><a>{item.user_name}</a></Link></span>
                        </div>
                    </div>
                    <div className={styles.currentPrice}>
                        <div>
                            <h3>Current price</h3>
                            <div className={styles.numberPrice}>
                                <Image src={ether} alt='ether' />
                                <span className={styles.hightlightNumber}>{item.price}</span>
                            </div>
                            <div className={styles.buyNow} >
                                {(user?.public_address == item.owner && item.sell == 0) ?  
                                <Button onClick={showModalResell}><AccountBalanceWalletOutlinedIcon /> Resell</Button> :
                                <Button disabled={item.sell == 0 || user?.public_address == item.owner} onClick={showModal}><AccountBalanceWalletOutlinedIcon /> Buy now</Button>
                                }
                                {/* <span className={styles.notifyDisable}>{currentAddress == item.owner ? 'This is your item!' : (item.sell == 0 ? 'This item is no longer for sale!' : (item.owner !== item.created ? 'This item has been sold!' : ''))}</span> */}
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
                                    <Image quality='50' width={30} height={30} src={item.avatar_url || avatarUser} alt='avatar' />
                                    <span>Created by <Link href={`/account?user_id=${item.user_id}`}><a>{item.user_name}</a></Link></span>
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
                                
                                {/* <div className={styles.social}>
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
                                </div> */}
                            </div>
                        </Panel>
                        <Panel header={<div><BallotRoundedIcon /> Details</div>}  key="3">
                            <div className={styles.detailsAddress}>
                                <div>
                                    <p>Contract Address</p>
                                    <p style={{fontWeight: 500}}>{config.nftaddress}</p>
                                </div>
                                <div>
                                    <p>Token ID</p>
                                    <p style={{fontWeight: 500}}>{nftBlock?.tokenId}</p>
                                </div>
                                <div>
                                    <p>Seller</p>
                                    <p style={{fontWeight: 500}}>{item.owner}</p>
                                </div>
                                <div>
                                    <p>NFT</p>
                                    <p style={{fontWeight: 500}}>{item.block_id}</p>
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
                {/* <Panel header={<div><SwapVertRoundedIcon /> Trading History</div>} key="1">
                    <TradingHistory />
                </Panel> */}
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
    </div>
    <ToastContainer
        position="top-right"
        autoClose={2000}
    />
    <Footer />
    </>
    );
   
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.login.isLoggedIn,
    user: state.login.user
  })
  
export default connect(mapStateToProps)(DetailItem)
  
