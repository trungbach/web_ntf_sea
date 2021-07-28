import React from 'react';
import Image from 'next/image'
import {Select, Table} from 'antd';
const {Option} = Select;
import styles from './style.module.scss'
import all from '@/public/allnfts-light.svg';
import art from '@/public/art-light.svg';
import collectibles from '@/public/collectibles-light.svg';
import domain from '@/public/domain-names-light.svg';
import newlight from '@/public/new-light.svg';
import music from '@/public/music-light.svg';
import sports from '@/public/sports-light.svg';
import trading from '@/public/trading-cards-light.svg';
import utility from '@/public/utility-light.svg';
import virtual from '@/public/virtual-worlds-light.svg';
import polygon from '@/public/polygon.svg';
import ethereum from '@/public/ethereum.png';
import klaytn from '@/public/klaytn.png';
import LinkIcon from '@material-ui/icons/Link';
import {useRouter} from 'next/router'
import Footer from '@/components/Footer'
const Rankings = () => {

    const router = useRouter();
    const columns = [
        {
          title: 'Collection',
          dataIndex: 'collection',
          key: 'collection',
          render: text => {
              return {
                    props: {
                      style: {
                        fontWeight: "600",
                        fontSize: "1.6rem",
                        color: 'rgb(4, 17, 29)'}
                    },
                    children: text,
              };
            }
        },
        {
          title: 'Volume',
          dataIndex: 'volume',
          key: 'volume',
          render: text => {
              return {
                    props: {
                        className: "textRanking"
                    },
                    children: text,
              };
            }
        },
        {
          title: '24h %',
          dataIndex: 'hour24',
          key: '24h',
          render: text => {
              return {
                    props: {
                      style: {
                        fontWeight: "400",
                        fontSize: "14px",
                        marginLeft: "8px",
                        position: "relative",
                        color: 'rgb(235, 87, 87)'
                    }
                    },
                    children: text,
              };
            }
        },
        {
            title: '7d %',
            dataIndex: 'day7',
            key: '7d',
            render: text => {
              return {
                    props: {
                      style: {
                        fontWeight: "400",
                        fontSize: "14px",
                        marginLeft: "8px",
                        position: "relative",
                        color: 'rgb(52, 199, 123)'}
                    },
                    children: text,
              };
            }
        },
        {
            title: 'Floor Price',
            dataIndex: 'floor_price',
            key: 'floor_price',
            render: text => {
              return {
                    props: {
                        className: "textRanking"
                    },
                    children: text,
              };
            }
        },
        {
            title: 'Owners',
            dataIndex: 'owners',
            key: 'owners',
            render: text => {
              return {
                    props: {
                        className: "textRanking"
                    },
                    children: text,
              };
            }
        },
        {
            title: 'Assets',
            dataIndex: 'assets',
            key: 'assets',
            render: text => {
              return {
                    props: {
                        className: "textRanking"
                    },
                    children: text,
              };
            }
        },
      ];

      const data = [
        {
          collection: 'Bored Ape Yacht Club',
          volume: '8.821,26',
          hour24: '-31.83%',
          day7: '+98.00%',
          floor_price: '6.35',
          owners: '4.9K',
          assets: '10.0K'
        },
        {
            collection: 'Bored Ape Yacht Club',
            volume: '8.821,26',
            hour24: '-31.83%',
            day7: '+98.00%',
            floor_price: '6.35',
            owners: '4.9K',
            assets: '10.0K'
          },
          {
            collection: 'Bored Ape Yacht Club',
            volume: '8.821,26',
            hour24: '-31.83%',
            day7: '+98.00%',
            floor_price: '6.35',
            owners: '4.9K',
            assets: '10.0K'
          },
          {
            collection: 'Bored Ape Yacht Club',
            volume: '8.821,26',
            hour24: '-31.83%',
            day7: '+98.00%',
            floor_price: '6.35',
            owners: '4.9K',
            assets: '10.0K'
          },
          {
            collection: 'Bored Ape Yacht Club',
            volume: '8.821,26',
            hour24: '-31.83%',
            day7: '+98.00%',
            floor_price: '6.35',
            owners: '4.9K',
            assets: '10.0K'
          },
    ];
      
    const handleChange = () => {}

    return (
      <>
        <div className={styles.rankings}>
            <div className="container">
                <div className={styles.heading}>
                    <h1>Top NFTs</h1>
                    <p>The top NFTs on OpenSea, ranked by volume, floor price and other statistics.</p>
                </div>
                <div className={styles.filter}>
                    <div>
                         <Select
                          labelInValue
                          defaultValue={{ value: 'lucy' }}
                          onChange={handleChange}
                          >
                        <Option value="lucy">Last 24 hours</Option>
                        <Option value="jack">Last 7 days</Option>
                        <Option value="jacks">Last 30 days</Option>
                        <Option value="jackss">All time</Option>
                    </Select>
                    </div>
                    <div>
                    <Select
                    labelInValue
                    dropdownClassName={styles.dropdownMarket}
                    defaultValue={{ value: 'lucy' }}
                    onChange={handleChange}
                    >
                        <Option value="lucy">
                            <Image width={24} height={24} src={all} alt='all'></Image>
                            All NTFs
                        </Option>
                        <Option value="jack">
                            <Image width={24} height={24} src={newlight} alt='new'></Image>
                            New
                        </Option>
                        <Option value="jacks">
                            <Image width={24} height={24} src={art} alt='art'></Image>
                            Art
                        </Option>
                        <Option value="jackss">
                            <Image width={24} height={24} src={music} alt='music'></Image>
                            Music
                        </Option>
                        <Option value="jackss">
                            <Image width={24} height={24} src={domain} alt='domain'></Image>
                            Domain Names
                        </Option>
                        <Option value="jackss">
                            <Image width={24} height={24} src={virtual} alt='virtual'></Image>
                            Virtual Worlds
                        </Option>
                        <Option value="jackss">
                            <Image width={24} height={24} src={trading} alt='trading'></Image>
                            Trading Cards
                        </Option>
                        <Option value="jackss">
                            <Image width={24} height={24} src={collectibles} alt='collectibles'></Image>
                            Collectibles
                        </Option>
                        <Option value="jackss">
                            <Image width={24} height={24} src={sports} alt='sports'></Image>
                            Sports
                        </Option>
                        <Option value="jackss">
                            <Image width={24} height={24} src={utility} alt='utility'></Image>
                            Utility
                        </Option>
                    </Select>
                    </div>
                </div>
                <Table columns={columns} dataSource={data}
                onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {
                        if (event.metaKey || event.ctrlKey){
                            const win = window.open( `/`, "_blank");
                            win?.focus();
                        }
                        else {
                            router.push('/');
                        }
                      }, 
                    };
                  }}
                />
            </div>
           
        </div>
        <Footer />
        </>
    );
}

export default Rankings;
