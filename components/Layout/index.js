import React from 'react';
import styles from './styles.module.scss';
import Header from '../Header';
import Meta from '../Meta';
import HeaderMobile from '../HeaderMobile';
const Layout = ({children}) => {
    return (
        <div className={styles.layout}>
            <Meta />
            <Header/>
            <HeaderMobile />
            <div>
                {React.cloneElement(children, {search_text: 'trung'})}
            </div>
        </div>
    );
}

export default Layout;
