import React from 'react';
import styles from './style.module.scss';
import {Button} from 'antd'
import metamaskLogo from '@/public/metamaskLogo.svg'
import Image from 'next/image'
import Footer from '@/components/Footer'

const LoginPage = () => {
    return (
        <>
        <div className={styles.login}>
            <h1>Sign in to your wallet.</h1>
            <div className={styles.logo}>
                <Image src={metamaskLogo} width={200} height={200} alt='metamask-logo' />
            </div>
            <Button className={styles.secondaryButton}>Sign In</Button>
        </div>
        <Footer />
        </>
    );
}

export default LoginPage;
