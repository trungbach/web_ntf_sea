import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Image from 'next/image'
import config from '@/config/index'
import {createItem} from '@/pages/api/create'
import NFT from '@/artifacts/contracts/NFT.sol/NFT.json'
import Market from '@/artifacts/contracts/Market.sol/NFTMarket.json'
import styles from './style.module.scss'
import {Select, Button, Form, Input} from 'antd'
import {getMyCollection} from '@/pages/api/collection'
import Link from 'next/link'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import superagent from 'superagent'

const {Option} = Select;
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export async function getServerSideProps({req, res}) {

  if(!req.headers.cookie) {
    res.writeHead(302, { Location: `/login?${req.url}` })
    res.end();
  } else {
    const tokenCookie =  req.headers.cookie.split(";")
    .find(c => c.trim().startsWith("token="));
    const token = tokenCookie && tokenCookie.split('=')[1]
  
    const rest = await getMyCollection({token: token});

    if(rest.status === 401) {
      res.setHeader('Set-Cookie','token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
      res.writeHead(302, { Location: `/login?${req.url}` })
      res.end();
    } else {
        const listCollection = [...rest.res.body.data]
        return {
          props: {
            listCollection
          }
        }
    }
  }

}

const CreateItem = (props) => {
  const { listCollection, isLoggedIn} = props;
  const [fileUrl, setFileUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [form] = Form.useForm();

  useEffect(() => {
    if(!isLoggedIn) {
       router.push('/login')
  }
  },[isLoggedIn])

  async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(config.nftmarketaddress, Market.abi, signer)
    // const tokenContract = new ethers.Contract(config.nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()
    return data;
    
  }

    const fileSelect = async (e) => {
      var file = e.target.files[0];
      if (file) {
          superagent
              .post(config.API_DOMAIN + '/upload-file')
              .attach('file', file)
              .end((err, res) => {
                  if (!err) {
                      console.log(res.body.data.path)
                      form.setFieldsValue({fileUrl: res.body.data.path})
                      setFileUrl(res.body.data.path)
                  }
              })
      }
   }


  async function createMarket(values) {
    setLoading(true)
    const { name, description, price, fileUrl } = values
    // /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url, values)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url, values) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    /* next, create the item */
    let contract = new ethers.Contract(config.nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(values.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(config.nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    
    transaction = await contract.createMarketItem(config.nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    console.log(transaction)

    const data = await loadNFTs();
    setLoading(false)
    console.log('created', data)
    const { name, description, collection_id } = values;
    const payload = {
      name,
      description,
      price: values.price, 
      image_url: fileUrl,
      symbol: 'ETH',
      collection_id: collection_id.split(',')[0],
      category_id: collection_id.split(',')[1],
      block_id: data[data.length-1].itemId.toNumber(),
    }
    const newItem = await createItem(payload);
    console.log('newItem', newItem);

    router.push('/collections')
    toast.dark('Add item Success!', {position: "top-right",})
  }

  const collections = listCollection?.map((item, index) => {
    return (
      <Option key={index} value={`${item.id},${item.category_id}`}>
        {item.name}
      </Option>
    )
  }) || []


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const labelCollection = listCollection.length > 0 ? (
    <div>
      Collection: <Link href='/collection/create?from=/create'><a>Create new one?</a></Link>
    </div>
  ) : (
    <div>
      Collection: <Link href='/collection/create?from=/create'><a>You don&apos;t have any collections yet, click to create a new one first!</a></Link>
    </div>
  )

console.log(listCollection.length)
  return (

    <div className={`container ${styles.create}`}>
      <h1>Create new item {listCollection.length == 0 && <Link href='/collection/create?from=/create' style={{marginLeft: '3rem'}}><a>
                                (You don&apos;t have any collections yet, click to create a new one first!)</a>
                           </Link>}
      </h1>
      <Form form={form}  onFinish={createMarket} onFinishFailed={onFinishFailed}  layout='vertical'>
          <Form.Item className={styles.fileContainer} name='fileUrl' label="Image, Video, Audio, or 3D Model" rules={[{ required: true, message: "Please choose your file!" }]}>

              <div className={styles.labelForFile}>
                {fileUrl && <Image src={fileUrl} alt={fileUrl} layout='fill' objectFit='cover' />}
                <label htmlFor="file">Drag &amp; drop file <br /> or browse media on your device</label>
                <label htmlFor="file">{fileUrl && <Image src={fileUrl} alt={fileUrl} layout='fill' objectFit='cover' />}</label>
              </div>
              <input type="file" id="file" accept="image/*" onChange={fileSelect} />
          </Form.Item>

          <Form.Item name='name' label="Name" rules={[{ required: true, message: "Please input item name!" }]}
          >
              <Input placeholder='Item Name' />
          </Form.Item>

          <Form.Item name='price' label="Price" rules={[{ required: true, message: "Please input item price!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name='description' rules={[{ required: true, message: "Please input your description" }]}>
                <Input.TextArea rows={5} placeholder="Provide a detailed description of your item"/>
          </Form.Item>

          <Form.Item label={labelCollection} name='collection_id' rules={[{ required: true, message: "Please choose your collection" }]}>
              <Select placeholder='Choose collection'>
                {collections}
              </Select>
          </Form.Item>

          <Form.Item>
                <Button htmlType="submit" loading={loading} className={styles.secondaryButton}>
                  Create 
                </Button>
               {loading && <span className={styles.notifyProccess}>Please wait... The process may take a few minutes</span>}
          </Form.Item>

      </Form>
      <ToastContainer
        position="top-right"
      />
    </div>
  )

}

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn
})

export default connect(mapStateToProps)(CreateItem)
