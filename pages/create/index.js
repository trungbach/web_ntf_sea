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
import {Select} from 'antd'
import { getListCollection } from '@/pages/api/collection';
import axios from 'axios'

const {Option} = Select;
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export async function getServerSideProps() {
  const listCollection = await getListCollection();
  return {
    props: {
      listCollection
    }
  }
}

const CreateItem = (props) => {
  const { listCollection} = props;
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', collection_id: '', category_id: '' })
  const router = useRouter()

  const [nfts, setNfts] = useState([])

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(config.nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(config.nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      console.log(meta)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      }
      console.log('item', item)

      return item
    }))

    setNfts(items)

    
  }

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      console.log(url)
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    console.log(signer)
    /* next, create the item */
    let contract = new ethers.Contract(config.nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    console.log('tx', tx)
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(config.nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    
    transaction = await contract.createMarketItem(config.nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    console.log(transaction)

    const payload = {
      ...formInput, 
      image_url: fileUrl,
      symbol: 'ETH',
      block_id: ntfs[ntfs.length-1]?.tokenId,
    }
    const newItem = await createItem(payload);
    console.log('newItem', newItem);

    // router.push('/')
  }

  const collections = listCollection?.map((item, index) => {
    return (
      <Option key={index} value={`${item.id},${item.category_id}`}>
        {item.name}
      </Option>
    )
  }) || []

  const handleCollection = (value) => {
    const arr = value.split(',')
    updateFormInput({ ...formInput, collection_id: arr[0], category_id: arr[1] })
  }

  return (
    <div className={`container ${styles.create}`}>
      <h1>Create new item</h1>
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
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <Select style={{marginTop: '2rem'}} onChange={value => handleCollection(value)} placeholder='Choose collection'>
          {collections}
        </Select>

        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" style={{marginBottom: '2rem'}} width="350" height="350" src={fileUrl} alt='image-item' />
          )
        }
        <button onClick={createMarket} className={styles.secondaryButton}>
          Create 
        </button>
      </div>
    </div>
  )
}

export default CreateItem;
