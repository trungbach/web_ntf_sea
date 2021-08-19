import React, {useState} from 'react';
import Image from 'next/image'
import {Select, Table} from 'antd';
import styles from './style.module.scss'
import all from '@/public/allnfts-light.svg';
import LinkIcon from '@material-ui/icons/Link';
import {useRouter} from 'next/router'
import moment from 'moment'
import {useRanking} from '@/lib/useRanking'
import {getRankingCollection} from '@/pages/api/ranking'
import {getListCategory} from '@/pages/api/category'
import {DATE_TIME} from '@/config/constants'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/Footer'))
const {Option} = Select;

export async function getStaticProps() {

  const rangeTime= [ moment().subtract(7, 'day').format(DATE_TIME), moment().format(DATE_TIME) ]
  const rankingCollection = await getRankingCollection(`start_time=${rangeTime[0]}&end_time=${rangeTime[1]}`);

  const listCategory = await getListCategory();

  return {
    props: {
      rankingCollection,
      listCategory
    },
    revalidate: 60
  }
}

const Rankings = ({ rankingCollection, listCategory }) => {
    const [rangeTime, setRangeTime] = useState([ moment().subtract(7, 'day').format(DATE_TIME), moment().format(DATE_TIME) ])
    const [categoryId, setCategoryId] = useState('')
    const { data } = useRanking(`start_time=${rangeTime[0]}&end_time=${rangeTime[1]}&category_id=${categoryId}`, rankingCollection)
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
          owners: item.owner,
          assets: '10.0K',
          url: `/collection/${item.id}`
        }
      })

    const listCategoryUI = listCategory.map((item, index) => {
      return (
        <Option key={index} value={item.id}>
          <Image width={24} height={24} src={item.logo_url} alt={item.logo_url} />
            {item.name}
        </Option>
      )
    })
      
    const handleChangeCategory = (obj) => {
      setCategoryId(obj.value)
    }

    const lastTime = {
      LAST_DAY: 0,
      LAST_WEEK: 1,
      LAST_MONTH: 2
    }

    const handleChangeTime = (obj) => {
      switch (obj.value) {
        case lastTime.LAST_DAY: 
          setRangeTime([ moment().subtract(1, 'day').format(DATE_TIME), moment().format(DATE_TIME) ]) 
          break;
        case lastTime.LAST_WEEK: 
          setRangeTime([ moment().subtract(7, 'day').format(DATE_TIME), moment().format(DATE_TIME) ]) 
          break;
        case lastTime.LAST_MONTH: 
          setRangeTime([ moment().subtract(30, 'day').format(DATE_TIME), moment().format(DATE_TIME) ]) 
          break;
        default: 
          break
      }
    }

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
                          defaultValue={{ value: lastTime.LAST_WEEK }}
                          onChange={handleChangeTime}
                          >
                        <Option value={lastTime.LAST_DAY}>Last 24 hours</Option>
                        <Option value={lastTime.LAST_WEEK}>Last 7 days</Option>
                        <Option value={lastTime.LAST_MONTH}>Last 30 days</Option>
                        {/* <Option value="jackss">All time</Option> */}
                    </Select>
                    </div>
                    <div>
                    <Select
                    labelInValue
                    dropdownClassName={styles.dropdownMarket}
                    defaultValue={{ value: '' }}
                    onChange={handleChangeCategory}
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
                            router.push(record.url);
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


