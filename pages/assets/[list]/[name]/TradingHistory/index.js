import React from 'react';
import {Select, Table, Input} from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import styles from './style.module.scss'
import ether from '@/public/ether.png'
import LaunchIcon from '@material-ui/icons/Launch';

const {Option} = Select
const {Checkbox} = Input
const TradingHistory = () => {
    const columns = [
        {
          title: 'Event',
          dataIndex: 'event',
          key: 'event',
          render: text => {
              return {
                    children: <div><Image src={ether} alt='ether'></Image>{text} <span>ETH</span></div> ,
              };
            }
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          render: text => {
              return {
                    props: {
                        className: "textRanking"
                    },
                    children: <div><Image src={ether} alt='ether'></Image>{text} <span>4</span></div>,
              };
            }
        },
        {
          title: 'From',
          dataIndex: 'from',
          key: 'from',
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
                    children: <Link href='/'><a><Image src={ether} alt='ether'></Image>{text} <span>MadMax</span></a></Link>,
              };
            }
        },
        {
          title: 'To',
          dataIndex: 'to',
          key: 'to',
          render: text => {
              return {
                    props: {
                      style: {
                        fontWeight: "400",
                        fontSize: "14px",
                    }
                    },
                    children: <Link href='/'><a><Image src={ether} alt='ether'></Image>{text} <span>MadMax</span></a></Link>,
              };
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: text => {
              return {
                    props: {
                      style: {
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "inherit"
                    },
                    children: <Link>{text}<span><LaunchIcon /></span></Link>,
                }
                }
            }
        },
      ];

      const data = [
        {
            event: 'Sale',
            price: '4',
            from: 'Madmax',
            to: 'OldisGold',
            date: '10 months ago'
        },
        {
          event: 'Sale',
          price: '4',
          from: 'Madmax',
          to: 'OldisGold',
          date: '10 months ago'
        },
        {
          event: 'Sale',
          price: '4',
          from: 'Madmax',
          to: 'OldisGold',
          date: '10 months ago'
        },
        {
            event: 'Sale',
            price: '4',
            from: 'Madmax',
            to: 'OldisGold',
            date: '10 months ago'
        },
        {
          event: 'Sale',
          price: '4',
          from: 'Madmax',
          to: 'OldisGold',
          date: '10 months ago'
        },
        {
          event: 'Sale',
          price: '4',
          from: 'Madmax',
          to: 'OldisGold',
          date: '10 months ago'
        },
        {
          event: 'Sale',
          price: '4',
          from: 'Madmax',
          to: 'OldisGold',
          date: '10 months ago'
      },
    ];
    const handleChange = () => {}

    return (
        <div className={styles.tradingHistory}>
             <Select
            labelInValue
            defaultValue={{ value: 'lucy' }}
            dropdownClassName={styles.selectPrice}
            onChange={handleChange}
            >
                <Option value="jackss"><Checkbox value="A">Listings</Checkbox></Option>
                <Option value="jackss"><Checkbox value="B">Sale</Checkbox></Option>
                <Option value="jackss"><Checkbox value="C">Bids</Checkbox></Option>
                <Option value="jackss"><Checkbox value="D">Transfers</Checkbox></Option>
                <Option value="lucy">Filter</Option>
            </Select> 
            <Table columns={columns} dataSource={data} pagination={false}></Table>
    </div>
    );
}

export default TradingHistory;
