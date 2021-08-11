import React, {useState, useEffect} from 'react';
import { Tooltip, Button} from 'antd';
import styles from './style.module.scss';
import Image from 'next/image'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import metamask from '@/public/metamask.png'
import Web3 from 'web3'
import { ToastContainer, toast } from 'react-toastify';
import {checkPublicAddress, verifySignature} from '@/pages/api/login'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginAccount } from '@/store/login/action'
import avatarUser from '@/public/avatarUser.png'
const Wallet = ({isShowWallet, setIsShowWallet, loginAccount, isLoggedIn}) => {

    console.log('isLoggedIn', isLoggedIn)
    const [widthScreen, setWidthScreen] = useState()
    const [publicAddress, setPublicAddress] = useState(null)
    const [balance, setBalance] = useState(null)

    useEffect(() => {
        setWidthScreen(window.screen.width)
    },[])

    useEffect(() => {
        const getBalance = async() => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
              }
            else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            }
    
            const publicAddress = await web3.eth.getCoinbase()
            const currentBalance = await web3.eth.getBalance(publicAddress)
            console.log('currentBalance',currentBalance)
            console.log('publicAddress',publicAddress)
            setBalance(currentBalance)
            setPublicAddress(publicAddress)
        }

        getBalance()

    },[])

    const [metamaskInstalled, setMetamaskInstalled] = useState(false)
    const [account, setAccount] = useState()

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
        console.log(account)
        const {nonce} = JSON.parse(resNonce.text).data
        
        // handleSignMessage
        web3.eth.personal.sign(
            web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
            publicAddress,
            async (err, signature) => {
                console.log(signature)
                const resSignature = await verifySignature({public_address: publicAddress, signature});
                // if(resSignature.status === 200) {
                toast.dark('Login Success!')
                loginAccount(resSignature.body.data)
                setIsShowWallet(false)
                // }
              }
          )
      }

    return (
        <div className={styles.wallet}>
           {isShowWallet && <div className={styles.overlay} onClick={()=>setIsShowWallet(false)}></div>}
           {!isLoggedIn ?
            (<div className={styles.sideFilter} style={{right: isShowWallet ? '0' : (widthScreen >= 768 ? '-380px' : '-100%')}}>
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
            </div>)  : 
            
            (<div className={styles.sideFilter} style={{right: isShowWallet ? '0' : (widthScreen >= 768 ? '-380px' : '-100%')}}>
                <div className={styles.sideCollapse}>
                    <div className={styles.infoWallet}>
                        <div>
                            <Image src={avatarUser} alt='avatar' width={30} height={30} /> welcome!
                        </div>
                        <div>{publicAddress}</div>
                    </div>
                    <div className={styles.contentWallet}>
                        <div className={styles.contentInner}>
                            <p>Total balance</p>
                            <h3>$ {balance} Wei</h3>
                            <div className={styles.addFund}>
                                <button className={styles.secondaryButton}>Add Funds</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
            }

            <ToastContainer
                position="bottom-right"
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn
})

const mapDispatchToProps = (dispatch) => {
  return {
    loginAccount: bindActionCreators(loginAccount, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)
