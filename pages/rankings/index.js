import React, {useState} from 'react';
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
import moment from 'moment'
import {useRanking} from '@/lib/useRanking'
import {getRankingCollection} from '@/pages/api/ranking'
import {getListCategory} from '@/pages/api/category'

const Rankings = ({ rankingCollection, listCategory }) => {
    const [rangeTime, setRangeTime] = useState([moment('2021-08-01 00:00:00').format('YYYY-MM-DD HH:mm:ss'), moment('2021-10-01 23:59:59').format('YYYY-MM-DD HH:mm:ss')])
    const { data } = useRanking(`start_time=${rangeTime[0]}&end_time=${rangeTime[1]}`, rankingCollection)
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

      const dataSource = data.map(item => {
        return {
          collection: item.name,
          volume: '8.821,26',
          hour24: '-31.83%',
          day7: '+98.00%',
          floor_price: '6.35',
          owners: '4.9K',
          assets: '10.0K'
        }
      })

    const listCategoryUI = listCategory.map((item, index) => {
      return (
        <Option key={index} value={item.id}>
          <Image width={24} height={24} src={newlight} alt='new'></Image>
          {item.name}
        </Option>
      )
    })
      
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
                    defaultValue={{ value: '' }}
                    onChange={handleChange}
                    >
                        <Option value="">
                            <Image width={24} height={24} src={all} alt='all'></Image>
                            All NTFs
                        </Option>
                        {listCategoryUI}
                    </Select>
                    </div>
                </div>
                <Table columns={columns} dataSource={dataSource}
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

export async function getStaticProps() {

  const rangeTime= [moment('2021-08-01 00:00:00').format('YYYY-MM-DD HH:mm:ss'), moment('2021-10-01 23:59:59').format('YYYY-MM-DD HH:mm:ss')]
  const rankingCollection = await getRankingCollection(`start_time=${rangeTime[0]}&end_time=${rangeTime[1]}`);

  const listCategory = await getListCategory();

  return {
    props: {
      rankingCollection,
      listCategory
    }
  }
}
