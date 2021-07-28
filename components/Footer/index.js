import React from 'react';
import styles from './style.module.scss';
import {Input, Button} from 'antd';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import Link from 'next/link'
import Image from 'next/image'
import openseaWhite from '../../public/opensea-white.svg'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={`row ${styles.footerTop} `}>
                    <div className="col-12 col-xl-6">
                        <div className={styles.footerTitle}>Stay in the loop</div>
                        <div className={styles.footerText}>Join our mailing list to stay in the loop with our newest feature releases,
                             NFT drops, and tips and tricks for navigating OpenSea.
                        </div>
                        <div className={styles.formSignup}>
                            <Input clearfix={true} type="email" placeholder="Your email address" />
                            <Button>Sign up</Button>
                        </div>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className={styles.footerTitle}>Join the community</div>
                        <ul>
                            <li>
                                <Link href='/'>
                                    <a>
                                        <svg fill="#FFFFFF" viewBox="0 0 18 16" style={{width: '30px'}}><path d="M.09 13.791c1.992.14 3.728-.344 5.327-1.571-.816-.098-1.527-.311-2.127-.786-.584-.466-1.032-1.047-1.272-1.841h1.48c.008-.033.016-.066.024-.107-.816-.237-1.512-.663-2.032-1.342-.52-.67-.775-1.448-.8-2.3.52.148 1.016.295 1.52.434.016-.033.04-.065.056-.098-.72-.606-1.24-1.334-1.431-2.275a3.92 3.92 0 01.391-2.7c2 2.389 4.511 3.715 7.598 3.936-.096-.778-.104-1.498.16-2.202.912-2.463 3.983-3.249 5.894-1.481.216.196.4.229.632.147.632-.229 1.255-.474 1.903-.72-.248.81-.784 1.408-1.415 1.989.615-.164 1.231-.336 1.839-.5.024.025.048.041.072.066-.464.491-.912 1.007-1.415 1.449-.272.237-.36.458-.376.818-.144 4.01-1.752 7.25-5.175 9.289-3.487 2.07-7.077 1.947-10.612-.025-.064-.04-.12-.09-.24-.18z"></path></svg>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/'>
                                    <a>
                                    <svg fill="#FFFFFF" viewBox="0 0 24 24" style={{width: '30px'}}><path d="M15.75 2H8.25C4.79875 2 2 4.79875 2 8.25V15.75C2 19.2012 4.79875 22 8.25 22H15.75C19.2012 22 22 19.2012 22 15.75V8.25C22 4.79875 19.2012 2 15.75 2ZM20.125 15.75C20.125 18.1625 18.1625 20.125 15.75 20.125H8.25C5.8375 20.125 3.875 18.1625 3.875 15.75V8.25C3.875 5.8375 5.8375 3.875 8.25 3.875H15.75C18.1625 3.875 20.125 5.8375 20.125 8.25V15.75Z"></path><path d="M12 7C9.23875 7 7 9.23875 7 12C7 14.7613 9.23875 17 12 17C14.7613 17 17 14.7613 17 12C17 9.23875 14.7613 7 12 7ZM12 15.125C10.2775 15.125 8.875 13.7225 8.875 12C8.875 10.2763 10.2775 8.875 12 8.875C13.7225 8.875 15.125 10.2763 15.125 12C15.125 13.7225 13.7225 15.125 12 15.125Z"></path><path d="M17.375 7.29124C17.743 7.29124 18.0413 6.99295 18.0413 6.62499C18.0413 6.25703 17.743 5.95874 17.375 5.95874C17.0071 5.95874 16.7088 6.25703 16.7088 6.62499C16.7088 6.99295 17.0071 7.29124 17.375 7.29124Z"></path></svg>
                                    </a>
                                </Link>
                            </li>
                                <li>
                                   <Link href='/'>
                                    <a>
                                        <svg  fill="#FFFFFF" viewBox="0 0 22 16" style={{width: '30px'}}><path d="M8.11.5c-.28.002-2.574.067-4.996 1.873 0 0-2.584 4.665-2.584 10.408 0 0 1.507 2.593 5.473 2.719 0 0 .664-.792 1.202-1.477-2.278-.685-3.14-2.108-3.14-2.108s.18.126.502.307c.018 0 .035.019.07.036.055.035.108.054.162.09.448.252.896.45 1.31.611.736.307 1.615.576 2.639.774 1.346.252 2.925.342 4.646.019a12.954 12.954 0 002.603-.774 10.118 10.118 0 002.062-1.063s-.896 1.458-3.247 2.125c.538.666 1.185 1.439 1.185 1.439 3.965-.126 5.473-2.72 5.473-2.7 0-5.746-2.584-10.409-2.584-10.409C16.32.446 13.861.5 13.861.5l-.251.288c3.05.918 4.468 2.27 4.468 2.27a14.856 14.856 0 00-5.4-1.711 15.048 15.048 0 00-3.626.036c-.107 0-.197.019-.306.035-.628.072-2.153.288-4.073 1.135-.663.288-1.059.505-1.059.505S5.088 1.635 8.317.717L8.137.5h-.028zm-.457 6.645c1.022 0 1.849.882 1.83 1.981 0 1.1-.808 1.982-1.83 1.982-1.005 0-1.83-.883-1.83-1.982s.806-1.981 1.83-1.981zm6.55 0c1.004 0 1.83.882 1.83 1.981 0 1.1-.809 1.982-1.83 1.982-1.006 0-1.83-.883-1.83-1.982s.806-1.981 1.83-1.981z"></path></svg>
                                    </a>
                                </Link> 
                                </li>
                                <li>
                                     <Link href='/'>
                                    <a>
                                    <svg fill="#FFFFFF" viewBox="0 0 24 24" style={{width: '30px'}}><path d="m21.325 9.308c-.758 0-1.425.319-1.916.816-1.805-1.268-4.239-2.084-6.936-2.171l1.401-6.406 4.461 1.016c0 1.108.89 2.013 1.982 2.013 1.113 0 2.008-.929 2.008-2.038s-.889-2.038-2.007-2.038c-.779 0-1.451.477-1.786 1.129l-4.927-1.108c-.248-.067-.491.113-.557.365l-1.538 7.062c-2.676.113-5.084.928-6.895 2.197-.491-.518-1.184-.837-1.942-.837-2.812 0-3.733 3.829-1.158 5.138-.091.405-.132.837-.132 1.268 0 4.301 4.775 7.786 10.638 7.786 5.888 0 10.663-3.485 10.663-7.786 0-.431-.045-.883-.156-1.289 2.523-1.314 1.594-5.115-1.203-5.117zm-15.724 5.41c0-1.129.89-2.038 2.008-2.038 1.092 0 1.983.903 1.983 2.038 0 1.109-.89 2.013-1.983 2.013-1.113.005-2.008-.904-2.008-2.013zm10.839 4.798c-1.841 1.868-7.036 1.868-8.878 0-.203-.18-.203-.498 0-.703.177-.18.491-.18.668 0 1.406 1.463 6.07 1.488 7.537 0 .177-.18.491-.18.668 0 .207.206.207.524.005.703zm-.041-2.781c-1.092 0-1.982-.903-1.982-2.011 0-1.129.89-2.038 1.982-2.038 1.113 0 2.008.903 2.008 2.038-.005 1.103-.895 2.011-2.008 2.011z"></path></svg>
                                    </a>
                                </Link>
                                </li>
                               <li>
                                    <Link href='/'>
                                    <a>
                                    <svg fill="#FFFFFF" viewBox="0 0 24 16" style={{width: '30px'}}><path clipRule="evenodd" d="M18.28 15.456c.317.168.725.21 1.09.107.363-.104.631-.337.712-.62.854-3.013 2.928-10.64 3.706-13.38.06-.207-.04-.421-.256-.56A1 1 0 0022.748.9C18.625 2.045 5.921 5.62.729 7.06c-.329.092-.543.33-.532.59.012.262.246.488.583.564 2.329.522 5.385 1.25 5.385 1.25s1.428 3.234 2.173 4.88c.093.206.309.369.593.425.283.055.586-.003.798-.153l3.046-2.157s3.513 1.933 5.506 2.997zM7.45 9.054L9.1 13.14l.367-2.587 10.02-6.778c.106-.072.12-.193.032-.278-.088-.085-.249-.104-.37-.047L7.45 9.054z" fillRule="evenodd"></path></svg>
                                    </a>
                                </Link>
                               </li>
                               <li>
                                   <Link href='/'>
                                    <a>
                                     <MailOutlinedIcon />
                                    </a>
                                </Link>
                               </li>
                        </ul>
                    </div>
                </div>
                <div className={`row ${styles.footerBottom}`}>
                    <div className="col-lg-3 col-12">
                        <Image src={openseaWhite} alt="opensea-white" />
                        <Link href='/'>OpenSea</Link>
                        <p>
                            The world’s first and largest digital marketplace for 
                            crypto collectibles and non-fungible tokens (NFTs). 
                            Buy, sell, and discover exclusive digital assets.
                        </p>
                    </div>
                    <div className={`col-lg-9 col-12 row ${styles.navFooter}`}>
                        <div className='col-6 col-md-3'>
                            <h4>Marketplace</h4>
                            <Link href='/'>All NTFs</Link>
                            <Link href='/'>New</Link>
                            <Link href='/'>Art</Link>
                            <Link href='/'>Music</Link>
                            <Link href='/'>Domain Names</Link>
                            <Link href='/'>Virtual Worlds</Link>
                            <Link href='/'>Trading Cards</Link>
                            <Link href='/'>Collectibles</Link>
                            <Link href='/'>Sports</Link>
                            <Link href='/'>Utility</Link>
                        </div>
                        <div  className='col-6 col-md-3'>
                            <h4>My Account</h4>
                            <Link href='/'>My Profile</Link>
                            <Link href='/'>My Collections</Link>
                            <Link href='/'>My Favorites</Link>
                            <Link href='/'>My Account Settings</Link>
                            <h4 className='mt-5'>Rankings</h4>
                            <Link href='/'>Rankings</Link>
                            <Link href='/'>Activity</Link>
                        </div>
                        <div  className='col-6 col-md-3'>
                            <h4>Resources</h4>
                            <Link href='/'>Help Center</Link>
                            <Link href='/'>Partners</Link>
                            <Link href='/'>Suggestions</Link>
                            <Link href='/'>Discord Community</Link>
                            <Link href='/'>Blog</Link>
                            <Link href='/'>Docs</Link>
                            <Link href='/'>Newsletter</Link>
                        </div>
                        <div  className='col-6 col-md-3'>
                            <h4>Company</h4>
                            <Link href='/'>About</Link>
                            <Link href='/'>Careers</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <div>&#169; 2018 - 2021 Ozone Networks, Inc</div>
                    <div>
                        <Link href='/'>Privacy Policy</Link>
                        <Link href='/'>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
