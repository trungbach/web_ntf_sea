import React, {useState, useEffect} from 'react';
import Web3 from 'web3'
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar'
import Main from './Main'
import MetamaskAlert from './MetamaskAlert'

const CheckMetaMask = ()  => {
 
//   async componentWillMount() {
//     // Detect Metamask
//     const metamaskInstalled = typeof window.web3 !== 'undefined'
//     this.setState({ metamaskInstalled })
//     if(metamaskInstalled) {
//       await this.loadWeb3()
//       await this.loadBlockchainData()
//     }
//   }

    const [metamaskInstalled, setMetamaskInstalled] = useState(false)
    const [account, setAccount] = useState('')
    const [socialNetwork, setSocialNework] = useState()
    const [postCount, setPostCount] = useState(0)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    
  useEffect(async() => {
    const isMetaInstalled = typeof window.web3 !== 'undefined'
    setMetamaskInstalled(isMetaInstalled)
    if(isMetaInstalled) {
      await loadWeb3()
      await loadBlockchainData()
    }
  },[])

  const  loadWeb3 = async() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      // DO NOTHING...
    }
  }

  const loadBlockchainData = async() => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    if(networkData) {
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      setSocialNework(socialNetwork)
      const postCount = await socialNetwork.methods.postCount().call()
      setPostCount(postCount)
      // Load posts
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()
        setPosts([...posts, post])
      }
      // Sort posts. Show highest tipped posts first
      setPosts([...posts.sort((a,b) => b.tipAmount - a.tipAmount)])
      setLoading(false)
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
  }

//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '',
//       postCount: 0,
//       posts: [],
//       loading: true
//     }

//     this.createPost = this.createPost.bind(this)
//     this.tipPost = this.tipPost.bind(this)
//   }

  const createPost = (name) => {
    setLoading(true)
    socialNetwork.methods.createPost(name).send({ from: account })
    .once('receipt', (receipt) => {
      setLoading(false)
    })
  }

  const tipPost = (id, tipAmount) =>{
    console.log("tipping post", id, tipAmount)
    setLoading(true)
    socialNetwork.methods.tipPost(id).send({ from: account, value: tipAmount })
    .once('receipt', (receipt) => {
      setLoading(false)
    })
  }

  render() {
    let content
    if(loading) {
      content = <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
    } else {
      content = <Main posts={posts} createPost={createPost} tipPost={tipPost} />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              { metamaskInstalled ? content : <MetamaskAlert />}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckMetaMask;