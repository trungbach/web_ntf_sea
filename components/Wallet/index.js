import React, {useState, useEffect} from 'react';
import { Tooltip} from 'antd';
import styles from './style.module.scss';
import Image from 'next/image'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import metamask from '@/public/metamask.png'
import Web3 from 'web3'
import { ToastContainer, toast } from 'react-toastify';
import {checkPublicAddress, verifySignature} from '@/pages/api/login'
import Cookies from 'js-cookie'
const Wallet = ({isShowWallet, setIsShowWallet}) => {

    const [widthScreen, setWidthScreen] = useState()

    useEffect(() => {
        setWidthScreen(window.screen.width)
    },[])

    const [metamaskInstalled, setMetamaskInstalled] = useState(false)
    const [account, setAccount] = useState()
    const [publicAddress, setPublicAddress] = useState()
    const [loading, setLoading] = useState(false)
    const [isLogined, setIsLogined] = useState(false)

    const checkMetamask = async() => {
        const isMetaInstalled = typeof window.web3 !== 'undefined'
        setMetamaskInstalled(isMetaInstalled)
        if(isMetaInstalled) {
          await handleLogin()
        } else window.open("https://metamask.io/download.html", "_blank")
    }

    const  handleLogin = async() => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }

        const publicAddress = await web3.eth.getCoinbase()
        const resNonce = await checkPublicAddress({public_address: publicAddress})
        setAccount(JSON.parse(resNonce.text).data)

        const {nonce} = JSON.parse(resNonce.text).data
        console.log(nonce)
        // handleSignMessage
        web3.eth.personal.sign(
            web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
            publicAddress,
            async (err, signature) => {
                console.log(signature)
                const resSignature = await verifySignature({public_address: publicAddress, signature});
                // if(resSignature.status === 200) {
                    Cookies.set('token', resSignature.body.data)
                    console.log(resSignature.body.data)
                    toast.dark('Login Success!')
                    setIsLogined(true)
                    setIsShowWallet(false)
                // }
              }
          )
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
                            <Tooltip placement="bottomRight" 
                                    title={<div>A crypto wallet is an application or hardware device that 
                                                allows individuals to store and retrieve digital assets. 
                                                <a href="https://openseahelp.zendesk.com/hc/en-us/articles/1500007978402-Wallets-supported-by-OpenSea" 
                                                    rel="nofollow noreferrer noopener" target="_blank">Learn more</a>
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
            <ToastContainer
                position="bottom-right"
            />
        </div>
    );
}

export default Wallet;
