import React, {useState, useEffect} from 'react';
import {Input } from 'antd';
import Image from 'next/image'
import {SearchOutlined  } from '@ant-design/icons'
import { Menu, Dropdown } from 'antd';
import opensea from '../../public/opensea.svg'
import styles from './style.module.scss'
import all from '../../public/allnfts-light.svg';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import Wallet from '@/components/Wallet'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {getListCategory} from '@/pages/api/category'
import Cookies  from 'js-cookie'
import avatarUser from '@/public/avatarUser.png'

const Header = () => {

    const router = useRouter()
    const [searchText, setSearchText] =  useState('')
    const [listCategory, setListCategory] = useState([])
    const [user, setUser] = useState(null)
    // useEffect(() => {
    //     const getCategory = async() => {
    //          const listCategory = await getListCategory();
    //          setListCategory(listCategory)
    //     }
    //     getCategory();
    // },[])

    const [isLogined, setIsLogined] = useState(false)

    useEffect(() => {
        console.log(isLogined)
        setIsLogined(Cookies.get('token') !== undefined)
    },[Cookies.get('token')])

    const onChange = (e) => {
        setSearchText(e.target.value)
    }
    const onKeyPress = e => {}
    // const onKeyPress = e => {
    //     console.log(router.pathname)
    //     if(e.key === 'Enter') {
    //         if(router.pathname !== '/assets') {
    //             router.push({ pathname: '/assets', query: { key: e.target.value } })
    //             // router.push({
    //             //     pathname: '/assets?[pid]',
    //             //     query: { pid: e.target.value },
    //             // })
    //         } else router.push({ pathname: '/assets', query: { key: e.target.value }, {shallow: true} })
    //     }
    // }

    const [isShowWallet, setIsShowWallet] = useState(false)

    const logOut = () => {
        Cookies.remove('token')
        setIsLogined(false)
    }

    const categories = listCategory.length > 0 ? listCategory.map((item, index) => {
        return (
            <Menu.Item key={index+1}>
                 <Link href={`/category/${item.id}`}>
                    <a>
                        <Image width={24} height={24} src={item.logo_url} alt={item.logo_url} />
                        {item.name}
                    </a>
                </Link>
            </Menu.Item>
        )
    }) : []


    const menuMarket = (
        <Menu className={styles.menuMarket}>
            <Menu.Item key={0}>
                <Link href="/assets">
                    <a>
                        <Image width={24} height={24} src={all} alt='all'></Image>
                        All NTFs
                    </a>
                </Link>
            </Menu.Item>
            {categories}
        </Menu>
    )

    const menuStats = (
        <Menu className={styles.menuStats}>
            <Menu.Item>
                <Link href='/rankings'>
                    <a>
                    Rankings
                    </a>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href='/rankings'>
                    <a>
                        Activity
                    </a>
                </Link>
            </Menu.Item>
        </Menu>
    )

    const menuResource = (
        <Menu className={styles.menuResource}>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   Help Center
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   Partners
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   Suggestions
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   Discord Community
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   Blog
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   Docs
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   Newsletter
                </a>
            </Menu.Item>
        </Menu>
    )

    const menuUser = (
        <Menu className={styles.menuUser}>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   My Profile
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   My Collection
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   My Favorites
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                   My Account Settings
                </a>
            </Menu.Item>
            {isLogined &&  
                <Menu.Item onClick={logOut}>
                    Log Out
                </Menu.Item>
            }
        </Menu>
    )

    return (

        <nav className={` ${styles.nav} navbar navbar-expand-lg fixed-top`}>
            <div className="container-fluid">
                <Link href='/'>
                    <a className={`navbar-brand ${styles.logo}`} >
                        <div>
                            <Image src={opensea} alt='logo' />
                        </div>
                        <svg className='d-none d-md-block' fill="#04111D" height="58" style={{width: '100px'}} viewBox="0 0 313 58" width="313"><path d="M24.7232 47.4966C20.2031 47.4966 16.0484 46.4837 12.2588 44.4579C8.51498 42.432 5.52447 39.6135 3.28729 36.0023C1.09576 32.347 0 28.2513 0 23.7153C0 19.1792 1.09576 15.1055 3.28729 11.4943C5.52447 7.88307 8.51498 5.06454 12.2588 3.03872C16.0484 1.01291 20.2031 0 24.7232 0C29.2432 0 33.3751 1.01291 37.119 3.03872C40.9085 5.06454 43.8762 7.88307 46.0221 11.4943C48.2136 15.1055 49.3094 19.1792 49.3094 23.7153C49.3094 28.2513 48.2136 32.347 46.0221 36.0023C43.8305 39.6135 40.8628 42.432 37.119 44.4579C33.3751 46.4837 29.2432 47.4966 24.7232 47.4966ZM24.7232 37.1913C28.5583 37.1913 31.6173 35.9582 33.9002 33.492C36.2287 31.0258 37.3929 27.7669 37.3929 23.7153C37.3929 19.6196 36.2287 16.3607 33.9002 13.9385C31.6173 11.4723 28.5583 10.2392 24.7232 10.2392C20.8423 10.2392 17.7377 11.4503 15.4092 13.8724C13.1263 16.2946 11.9849 19.5755 11.9849 23.7153C11.9849 27.8109 13.1263 31.0919 15.4092 33.5581C17.7377 35.9803 20.8423 37.1913 24.7232 37.1913Z"></path><path d="M67.5356 15.3918C68.677 13.6743 70.2521 12.287 72.261 11.2301C74.2699 10.1731 76.6212 9.64465 79.315 9.64465C82.4653 9.64465 85.3189 10.4153 87.8756 11.9567C90.4324 13.4981 92.4413 15.7001 93.9024 18.5626C95.409 21.4252 96.1624 24.7502 96.1624 28.5376C96.1624 32.325 95.409 35.672 93.9024 38.5786C92.4413 41.4412 90.4324 43.6651 87.8756 45.2506C85.3189 46.792 82.4653 47.5626 79.315 47.5626C76.6669 47.5626 74.3156 47.0342 72.261 45.9772C70.2521 44.9203 68.677 43.5551 67.5356 41.8815V58H55.8246V10.1731H67.5356V15.3918ZM84.2459 28.5376C84.2459 25.7191 83.4241 23.5171 81.7805 21.9317C80.1825 20.3022 78.1964 19.4875 75.8223 19.4875C73.4938 19.4875 71.5077 20.3022 69.8641 21.9317C68.2661 23.5611 67.467 25.7851 67.467 28.6036C67.467 31.4222 68.2661 33.6462 69.8641 35.2756C71.5077 36.9051 73.4938 37.7198 75.8223 37.7198C78.1508 37.7198 80.1368 36.9051 81.7805 35.2756C83.4241 33.6021 84.2459 31.3561 84.2459 28.5376Z"></path><path d="M138.329 28.0091C138.329 29.0661 138.261 30.167 138.124 31.3121H111.62C111.803 33.6021 112.556 35.3637 113.88 36.5968C115.25 37.7859 116.916 38.3804 118.88 38.3804C121.802 38.3804 123.833 37.1913 124.975 34.8132H137.439C136.8 37.2354 135.636 39.4153 133.946 41.3531C132.303 43.2908 130.225 44.8102 127.714 45.9112C125.203 47.0121 122.395 47.5626 119.291 47.5626C115.547 47.5626 112.214 46.792 109.292 45.2506C106.37 43.7092 104.087 41.5072 102.443 38.6446C100.8 35.7821 99.9777 32.4351 99.9777 28.6036C99.9777 24.7722 100.777 21.4252 102.375 18.5626C104.018 15.7001 106.301 13.4981 109.223 11.9567C112.145 10.4153 115.501 9.64465 119.291 9.64465C122.989 9.64465 126.276 10.3933 129.152 11.8907C132.029 13.388 134.266 15.5239 135.864 18.2984C137.508 21.0729 138.329 24.3098 138.329 28.0091ZM126.345 25.0364C126.345 23.0987 125.66 21.5573 124.29 20.4123C122.92 19.2673 121.208 18.6948 119.154 18.6948C117.19 18.6948 115.524 19.2453 114.154 20.3462C112.83 21.4472 112.008 23.0106 111.689 25.0364H126.345Z"></path><path d="M167.793 9.77676C172.267 9.77676 175.828 11.186 178.476 14.0046C181.17 16.779 182.517 20.6105 182.517 25.4989V47.0342H170.874V27.0182C170.874 24.552 170.212 22.6363 168.888 21.2711C167.564 19.9058 165.784 19.2232 163.547 19.2232C161.309 19.2232 159.529 19.9058 158.205 21.2711C156.881 22.6363 156.219 24.552 156.219 27.0182V47.0342H144.508V10.1731H156.219V15.0615C157.406 13.432 159.004 12.1549 161.013 11.2301C163.021 10.2612 165.281 9.77676 167.793 9.77676Z"></path><path d="M208.05 47.4966C204.535 47.4966 201.384 46.9461 198.599 45.8451C195.814 44.7441 193.577 43.1147 191.888 40.9567C190.244 38.7988 189.376 36.2005 189.285 33.1617H201.749C201.932 34.8793 202.548 36.2005 203.599 37.1253C204.649 38.0061 206.018 38.4465 207.708 38.4465C209.443 38.4465 210.812 38.0721 211.817 37.3235C212.821 36.5308 213.324 35.4518 213.324 34.0866C213.324 32.9415 212.913 31.9947 212.091 31.246C211.315 30.4973 210.333 29.8808 209.146 29.3964C208.004 28.9119 206.361 28.3614 204.215 27.7449C201.11 26.82 198.576 25.8952 196.613 24.9704C194.65 24.0456 192.961 22.6803 191.545 20.8747C190.13 19.0691 189.422 16.713 189.422 13.8064C189.422 9.49051 191.043 6.12149 194.285 3.69932C197.526 1.23311 201.749 0 206.954 0C212.251 0 216.519 1.23311 219.761 3.69932C223.003 6.12149 224.738 9.51253 224.966 13.8724H212.296C212.205 12.3751 211.634 11.208 210.584 10.3713C209.534 9.49051 208.187 9.05011 206.543 9.05011C205.128 9.05011 203.987 9.42445 203.119 10.1731C202.252 10.8777 201.818 11.9127 201.818 13.2779C201.818 14.7752 202.548 15.9423 204.01 16.779C205.471 17.6158 207.753 18.5186 210.858 19.4875C213.963 20.5004 216.474 21.4692 218.391 22.3941C220.355 23.3189 222.044 24.6621 223.459 26.4237C224.875 28.1853 225.582 30.4533 225.582 33.2278C225.582 35.8702 224.875 38.2703 223.459 40.4282C222.09 42.5862 220.081 44.3037 217.433 45.5809C214.785 46.858 211.657 47.4966 208.05 47.4966Z"></path><path d="M268.813 28.0091C268.813 29.0661 268.744 30.167 268.607 31.3121H242.103C242.286 33.6021 243.039 35.3637 244.363 36.5968C245.733 37.7859 247.4 38.3804 249.363 38.3804C252.285 38.3804 254.317 37.1913 255.458 34.8132H267.922C267.283 37.2354 266.119 39.4153 264.43 41.3531C262.786 43.2908 260.709 44.8102 258.197 45.9112C255.686 47.0121 252.878 47.5626 249.774 47.5626C246.03 47.5626 242.697 46.792 239.775 45.2506C236.853 43.7092 234.57 41.5072 232.926 38.6446C231.283 35.7821 230.461 32.4351 230.461 28.6036C230.461 24.7722 231.26 21.4252 232.858 18.5626C234.501 15.7001 236.784 13.4981 239.706 11.9567C242.628 10.4153 245.984 9.64465 249.774 9.64465C253.472 9.64465 256.759 10.3933 259.636 11.8907C262.512 13.388 264.749 15.5239 266.347 18.2984C267.991 21.0729 268.813 24.3098 268.813 28.0091ZM256.828 25.0364C256.828 23.0987 256.143 21.5573 254.773 20.4123C253.403 19.2673 251.691 18.6948 249.637 18.6948C247.674 18.6948 246.007 19.2453 244.637 20.3462C243.313 21.4472 242.491 23.0106 242.172 25.0364H256.828Z"></path><path d="M272.662 28.5376C272.662 24.7502 273.393 21.4252 274.854 18.5626C276.36 15.7001 278.392 13.4981 280.949 11.9567C283.506 10.4153 286.359 9.64465 289.51 9.64465C292.203 9.64465 294.555 10.1731 296.564 11.2301C298.618 12.287 300.193 13.6743 301.289 15.3918V10.1731H313V47.0342H301.289V41.8155C300.148 43.533 298.55 44.9203 296.495 45.9772C294.486 47.0342 292.135 47.5626 289.441 47.5626C286.336 47.5626 283.506 46.792 280.949 45.2506C278.392 43.6651 276.36 41.4412 274.854 38.5786C273.393 35.672 272.662 32.325 272.662 28.5376ZM301.289 28.6036C301.289 25.7851 300.467 23.5611 298.824 21.9317C297.226 20.3022 295.262 19.4875 292.934 19.4875C290.605 19.4875 288.619 20.3022 286.976 21.9317C285.378 23.5171 284.579 25.7191 284.579 28.5376C284.579 31.3561 285.378 33.6021 286.976 35.2756C288.619 36.9051 290.605 37.7198 292.934 37.7198C295.262 37.7198 297.226 36.9051 298.824 35.2756C300.467 33.6462 301.289 31.4222 301.289 28.6036Z"></path></svg>
                    </a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <form className={`${styles.form} d-flex`}>
                        <Input prefix={<SearchOutlined />} placeholder="Search items, categorys, and accounts" 
                        allowClear onChange={onChange} onKeyPress={onKeyPress} />
                </form>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className={`navbar-nav ${styles.navRight}`}>
                        <Dropdown overlay={menuMarket} placement="bottomLeft">
                            <a className="nav-link" aria-current="page" href="#">Marketplace</a>
                        </Dropdown>
                        <Dropdown overlay={menuStats} placement="bottomLeft">
                            <a className="nav-link" href="#">Stats</a>
                        </Dropdown>
                        <Link href='/create'>Create</Link>
                        {/* <Dropdown overlay={menuResource} placement="bottomLeft">
                            <a className="nav-link" href="#">Resources</a>
                        </Dropdown> */}
                        <Dropdown overlay={menuUser} placement="bottomRight">
                            <a className="nav-link" href="#">{isLogined ? <Image width={40} height={40} src={avatarUser} alt='avatar'/> : <AccountCircleOutlinedIcon />}</a>
                        </Dropdown>

                        <span type='button' title='Wallet' className={`nav-link ${styles.walletBtn}`} onClick={() =>setIsShowWallet(!isShowWallet)}>
                            <AccountBalanceWalletOutlinedIcon />
                        </span>
                    </div>
                </div>
            </div>
            <Wallet isShowWallet={isShowWallet} setIsShowWallet={setIsShowWallet} />
        </nav>
    );
}

export default Header;
