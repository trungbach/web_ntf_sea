import React, {useState, useEffect} from 'react';
import { Tooltip} from 'antd';
import styles from './style.module.scss';
import Image from 'next/image'
import Link from 'next/link'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import metamask from '@/public/metamask.png'
import Web3 from 'web3'

const Wallet = ({isShowWallet, setIsShowWallet}) => {

    const [widthScreen, setWidthScreen] = useState()

    useEffect(() => {
        setWidthScreen(window.screen.width)
    },[])

    const [metamaskInstalled, setMetamaskInstalled] = useState(false)
    const [account, setAccount] = useState('')
    const [socialNetwork, setSocialNework] = useState()
    const [postCount, setPostCount] = useState(0)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const checkMetamask = async() => {
        const isMetaInstalled = typeof window.web3 !== 'undefined'
        setMetamaskInstalled(isMetaInstalled)
        if(isMetaInstalled) {
          await loadWeb3()
          await loadBlockchainData()
        } else window.open("https://metamask.io/download.html", "_blank")
    }

    const  loadWeb3 = async() => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          // DO NOTHING...
        }
      }
    
      const loadBlockchainData = async() => {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        console.log(web3.eth)
        console.log(accounts)
        setAccount(accounts[0])
        const networkId = await web3.eth.net.getId()
        const publicAddress = await web3.eth.getCoinbase()
        console.log(publicAddress)
        console.log('networkid',networkId)
        // const networkData = SocialNetwork.networks[networkId]
        // if(networkData) {
        //   const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
        //   setSocialNework(socialNetwork)
        //   const postCount = await socialNetwork.methods.postCount().call()
        //   setPostCount(postCount)
        //   // Load posts
        //   for (var i = 1; i <= postCount; i++) {
        //     const post = await socialNetwork.methods.posts(i).call()
        //     setPosts([...posts, post])
        //   }
        //   // Sort posts. Show highest tipped posts first
        //   setPosts([...posts.sort((a,b) => b.tipAmount - a.tipAmount)])
        //   setLoading(false)
        // } else {
        //   window.alert('SocialNetwork contract not deployed to detected network.')
        // }
      }

    return (
        <div className={styles.wallet}>
           {isShowWallet && <div className={styles.overlay} onClick={()=>setIsShowWallet(false)}></div>}
            <div className={styles.sideFilter} style={{right: isShowWallet ? '0' : (widthScreen >= 768 ? '-380px' : '-100%')}}>
                <div className={styles.sideCollapse}>
                    <div className={styles.filterTitle}>
                        <AccountCircleIcon /> My wallet
                    </div>
                    <div className={styles.content}>
                        <p>Connect with one of our available 
                            <Tooltip placement="bottomRight" title={<div>A crypto wallet is an application or hardware device that 
                                                                        allows individuals to store and retrieve digital assets. 
                                                                        <Link href="https://openseahelp.zendesk.com/hc/en-us/articles/1500007978402-Wallets-supported-by-OpenSea" rel="nofollow noopener" target="_blank">Learn more</Link>
                                                                    </div>}>
                                <span className={styles.tooltip}>&nbsp; wallet <InfoOutlinedIcon />&nbsp;</span>
                            </Tooltip>
                            providers or create a new one.
                        </p>
                        <ul className={styles.listWallet}>
                            <li onClick={checkMetamask}>
                                <Image width={24} height={24} src={metamask} alt='meta-mask' /> <span>MetaMask</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallet;
