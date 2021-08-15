import React, {useState, useEffect} from 'react';
import styles from './style.module.scss';
import { Button, Select, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import { create as ipfsHttpClient } from 'ipfs-http-client';
import {createMyCollection} from '@/pages/api/create'
import Image from 'next/image'
import {getListCategory} from '@/pages/api/category'
import config from '@/config/index'
import superagent from 'superagent'
import ImageIcon from '@material-ui/icons/Image';
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import {getTokenFromServer} from '@/utils/index'

const {Option} = Select

export async function getServerSideProps({req, res}) {
    
    const token = getTokenFromServer(req, res)

    const listCategory = await getListCategory();
  
    return {
        props: {
          listCategory
        }
    }
}

const CreateCollection = ({listCategory, isLoggedIn}) => {
    
    const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [logoUrl, setLogoUrl] = useState(null)
    const [bannerUrl, setBannerUrl] = useState(null)
    const [form] = Form.useForm();
    useEffect(() => {
      if(!isLoggedIn) {
         router.push('/login')
      }
   },[isLoggedIn])
   
    const fileSelectLogo = async (e) => {
        var file = e.target.files[0];
        if (file) {
            superagent
                .post(config.API_DOMAIN + '/upload-file')
                .attach('file', file)
                .end((err, res) => {
                    if (!err) {
                        form.setFieldsValue({logo_url: res.body.data.path})
                        setLogoUrl(res.body.data.path)
                    }
                });
        }
    }

    const fileSelectBanner = async (e) => {
        var file = e.target.files[0];
        if (file) {
            superagent
                .post(config.API_DOMAIN + '/upload-file')
                .attach('file', file)
                .end((err, res) => {
                    if (!err) {
                        form.setFieldsValue({banner_url: res.body.data.path})
                        setBannerUrl(res.body.data.path)
                    }
                });
        }
    }

    const categories = listCategory?.map((item, index) => {
        return (
          <Option key={index} value={item.id}>
            {item.name}
          </Option>
        )
      }) || []

      const createCollection = async(values) => {
        setLoading(true)
        const resCollection = await createMyCollection(values)
        setLoading(false)
        if(resCollection?.status === 200) {
          router.push(router.query.from || '/collections') 
          toast.dark('Add collection Success!', { position: "top-right" })
        }
      }

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
   
    return (
            <div className={styles.collections}>
              <div className="container">
                  <h1>Create your collection</h1>
                  <h3 className="my-5">Create, curate, and manage collections of unique NFTs to share and sell</h3>
                  
                  <Form form={form}  onFinish={createCollection} onFinishFailed={onFinishFailed}  layout='vertical'>
                      <Form.Item className={styles.fileContainer} name='logo_url' label="Logo image" rules={[{ required: true, message: "Please upload your logo !" }]}>
                         
                          <div className={styles.labelForFileLogo}>
                            {logoUrl && <Image src={logoUrl} alt={logoUrl} layout='fill' />}
                            <label  className={logoUrl ? styles.labelHidden : ''} htmlFor="fileLogo"><ImageIcon /></label>
                          </div>
  
                          <input type="file" id="fileLogo" accept="image/*" onChange={fileSelectLogo} />
                      </Form.Item>
  
                      <Form.Item className={styles.fileContainer} name='banner_url' label="Banner image" rules={[{ required: true, message: "Please upload your banner image !" }]}>
                         
                          <div className={styles.labelForFile}>
                            {bannerUrl && <Image src={bannerUrl} alt={bannerUrl} layout='fill' />}
                            <label  className={bannerUrl ? styles.labelHidden : ''}htmlFor="fileBanner">Drag &amp; drop file <br /> or browse media on your device</label>
                          </div>
  
                          <input type="file" id="fileBanner" accept="image/*" onChange={fileSelectBanner} />
                      </Form.Item>
  
                      <Form.Item name='name' label="Name" rules={[{ required: true, message: "Please input item name!" }]} >
                          <Input placeholder='Example: Treasure of the Sea' />
                      </Form.Item>
  
                      <Form.Item label="Description" name='description' rules={[{ required: true, message: "Please input your description" }]}>
                            <Input.TextArea rows={5} placeholder="Provide a detailed description of your collection"/>
                      </Form.Item>
  
                      <Form.Item label="Category" name='category_id' rules={[{ required: true, message: "Please choose your collection" }]}>
                          <Select placeholder='Add category'>
                            {categories}
                          </Select>
                      </Form.Item>
  
                      <Form.Item>
                          <Button htmlType="submit" loading={loading} className={styles.secondaryButton}>
                            Create 
                          </Button>
                      </Form.Item>
                  </Form>
              </div>
              <ToastContainer
                position="top-right"
              />
          </div> )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn
})

export default connect(mapStateToProps)(CreateCollection)
