import Head from 'next/head';
import Script from 'next/script'

const Meta = ({title, keywords, description}) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf-8' />
            <link rel='icon' href='/favicon.ico' />
            <title>{title}</title>
        </Head>
    );
}

Meta.defaultProps = {
    title: 'OpenSea: Buy NFTs, Crypto Collectibles, CryptoKitties, Decentraland, and more on Ethereum',
    keywords: 'OpenSea: Buy NFTs, Crypto Collectibles, CryptoKitties, Decentraland, and more on Ethereum',
    description: 'Get the lastes new item in OpenSea'
}

export default Meta;
