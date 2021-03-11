import { initProvider } from 'onto-provider'
import React, { FC, useEffect, useState } from 'react'
import {Button, Card, Layout, message} from 'antd'
import Web3 from 'web3'
import HeadInfo from '../../views/HeadInfo'
// import { Route } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
import ETHBlockNumber from '../../views/ETH/BlockNumber'
import ETHCoinBase from "../../views/ETH/CoinBase";
import ETHApprove from "../../views/ETH/Approve";

initProvider();
const web3 = new Web3((window as any).onto)
// const web3 = new Web3(Web3.givenProvider);

const { Header, Content } = Layout
const EthLay: FC = () => {
  const [account, setAccount] = useState<string>('')
  const [balance, setBalance] = useState<string>('')
  const [count, setCount] = useState<number>(0)
  const [chainId, setChainId] = useState<number>(0)
  const [receipt, setReceipt] = useState<string>('')
  const [estimateGas, setEstimateGas] = useState<string>('')
  // const history = useHistory()

  const handlerInitETH = async () => {
    console.log('global', web3)
    const accounts = await web3.eth.requestAccounts()
    console.log('accounts', accounts)
    if (accounts.length > 0) {
      setAccount(accounts[0])
    }
  }
  const handlerGetAccount = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('accounts', accounts)
    if (accounts.length > 0) {
      setAccount(accounts[0])
    }
  }

  const handlerGetBalance = async () => {
    if (!account) {
      return message.warn('please get account');
    }
    const balance = await web3.eth.getBalance(account);
    console.log('balance', balance)
    setBalance(balance)
  }

  const handlerGetTransactionCount = async () => {
    if (!account) {
      return message.warn('please get account');
    }
    const count = await web3.eth.getTransactionCount(account);
    console.log('count', count)
    setCount(count)
  }

  const handlerGetChainId = async () => {
    const id = await web3.eth.getChainId();
    console.log('id',id)
    setChainId(id)
  }
  const handlerGetTransactionReceipt = async () =>{
    const receipt = await web3.eth.getTransactionReceipt('0xbcc788bab7ae0d2d175426b3aa0ff7ed578977d41be2b694f9563f95676d9bad');
    console.log(receipt)
    setReceipt(JSON.stringify(receipt))
  }

  const handlerEstimateGas = async () => {
    const estimate = await web3.eth.estimateGas({
      to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
      data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
    })
    setEstimateGas(JSON.stringify(estimate))
  }

  //estimateGas
  useEffect(() => {
    // console.log('OntoProvider', OntoProvider)
  }, [])
  return (
    <div className="body-content">
      <Layout>
        <Header>
          <HeadInfo account={account} />
        </Header>
        <Content>
          <Card>
            <Card>
              <Button type="primary" onClick={handlerInitETH}>
                initETH
              </Button>
            </Card>
            <Card>
              <Button type="primary" onClick={handlerGetChainId}>
                getChainId
              </Button>
              <div>
                Result: {chainId}
              </div>
            </Card>
          </Card>

          <Card>
            <Card>
              <Button type="primary" onClick={handlerGetAccount}>
                getAccount
              </Button>
            </Card>
            <Card>
              <Button type="primary" onClick={handlerGetBalance}>
                getBalance
              </Button>
              <div>
                Result:
                {balance}
              </div>
            </Card>
            <Card>
              <Button type="primary" onClick={handlerGetTransactionCount}>
                getTransactionCount
              </Button>
              <div>
                Result:
                {count}
              </div>
            </Card>
            <Card>
              <Button type="primary" onClick={handlerGetTransactionReceipt}>
                getTransactionReceipt
              </Button>
              <div className={'overflow-y-lay'}>
                Result:
                {receipt}
              </div>
            </Card>
            <Card>
              <Button type="primary" onClick={handlerEstimateGas}>
                estimateGas
              </Button>
              <div className={'overflow-y-lay'}>
                Result:
                {estimateGas}
              </div>
            </Card>
          </Card>

          <ETHBlockNumber />
          <ETHCoinBase />
          <ETHApprove />
        </Content>
      </Layout>
    </div>
  )
}

export default EthLay
