import React, {useState, useEffect} from 'react';
import { Tooltip} from 'antd';
import styles from './style.module.scss';
import Image from 'next/image'
import Link from 'next/link'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import metamask from '@/public/metamask.png'

const Wallet = ({isShowWallet, setIsShowWallet}) => {

    const [widthScreen, setWidthScreen] = useState()

    useEffect(() => {
        setWidthScreen(window.screen.width)
    },[])

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
                            <li>
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
