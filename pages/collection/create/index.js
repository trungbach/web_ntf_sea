import React, {useState} from 'react';
import styles from './style.module.scss';
import { Button, Card, Select } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { create as ipfsHttpClient } from 'ipfs-http-client';
import {createMyCollection} from '@/pages/api/create'
import Image from 'next/image'
import {getListCategory} from '@/pages/api/category'
import config from '@/config/index'
import superagent from 'superagent'
import Cookies from 'js-cookie'

const {Option} = Select

export async function getStaticProps() {

    const listCategory = await getListCategory();
  
    return {
        props: {
           listCategory
        }
    }
  }

const CreateCollection = ({listCategory}) => {
    
    const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

    const router = useRouter()
    const [logo, setLogo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [banner, setBanner] = useState(null)
    const [formInput, updateFormInput] = useState({ name: '', description: '', category_id: '', logo_url: '', banner_url: '' })
    // const fileSelectLogo = async (e) => {
    //     var file = e.target.files[0];
    //     if (file) {
    //         superagent
    //             .post(config.API_DOMAIN + '/collections')
    //             .set('x-access-token', Cookies.get('token'))
    //             .attach('file', file)
    //             .end((err, res) => {
    //                 if (!err) {
    //                     console.log(res)
    //                 }
    //             });
    //     }
    // }

    // const fileSelectBanner = async (e) => {
    //     var file = e.target.files[0];
    //     if (file) {
    //         superagent
    //             .post(config.API_DOMAIN + '/collections')
    //             .set('x-access-token', Cookies.get('token'))
    //             .attach('file', file)
    //             .end((err, res) => {
    //                 if (!err) {
    //                     console.log(res)
    //                 }
    //             });
    //     }
    // }

    async function onChangeLogo(e) {
        const file = e.target.files[0]
        try {
          const added = await client.add(
            file,
            {
              progress: (prog) => console.log(`received: ${prog}`)
            }
          )
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          setLogo(url)
          console.log(url)
          updateFormInput({ ...formInput, logo_url: url })
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }

      async function onChangeBanner(e) {
        const file = e.target.files[0]
        try {
          const added = await client.add(
            file,
            {
              progress: (prog) => console.log(`received: ${prog}`)
            }
          )
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          setBanner(url)
          updateFormInput({ ...formInput, banner_url: url })
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }

    const categories = listCategory?.map((item, index) => {
        return (
          <Option key={index} value={item.id}>
            {item.name}
          </Option>
        )
      }) || []

      const createCollection = async() => {
        setLoading(true)
        const { name, description, category_id, logo_url, banner_url } = formInput
        if (!name || !description || !category_id || !logo_url || ! banner_url) {
            alert('Bạn cần nhập đầy đủ các trường trước khi tạo')
            return
        }
        const resCollection = await createMyCollection(formInput)
        setLoading(false)
        if(resCollection.status === 200) {
            alert('Thêm collection thành công!')
            router.push('/collections')
        }
      }

    return (
        <div className={styles.collections}>
            <div className="container">
                <h1>Create your collection</h1>
                <h3 className="my-5">Create, curate, and manage collections of unique NFTs to share and sell</h3>
                <div className="d-flex flex-column pb-12">
                    <input 
                    placeholder="Asset Name"
                    className="mt-8 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                    />
                    <textarea
                    placeholder="Asset Description"
                    className="my-4 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    />
                
                    <Select style={{marginTop: '2rem'}} onChange={(value) => updateFormInput({ ...formInput, category_id: value })} placeholder='Choose category'>
                        {categories}
                    </Select>
                 
                    <div className='my-5'>
                        <label htmlFor="Logo">Logo: </label>
                        <input
                            type="file"
                            name="Logo"
                            className="my-4"
                            onChange={onChangeLogo}
                        />
                        {
                        logo && (
                            <div className={styles.imageAsset}>
                                <Image className="rounded mt-4"  objectFit='contain' width="350" height="350" src={logo} alt='image-item' />
                            </div>
                        )
                        }
                    </div>
                    <div className='my-5'>
                        <label htmlFor="Banner">Banner:</label>

                        <input
                            type="file"
                            name="Banner"
                            className="my-4"
                            onChange={onChangeBanner}
                        />
                        {
                        banner && (
                            <div className={styles.imageAsset}>
                                <Image className="rounded mt-4"  objectFit='contain' width="350" height="350" src={banner} alt='image-item' />
                            </div>
                        )
                        }
                    </div>
                   
                    <Button loading={loading} onClick={createCollection} className={styles.secondaryButton}>
                        Create 
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateCollection;
