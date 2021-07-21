import React from 'react';
import styles from './styles.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import Meta from '../Meta';
const Layout = ({children}) => {
    return (
        <div>
            <Meta />
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
