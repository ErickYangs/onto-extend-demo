import { FC, useState } from 'react'
import { Button, Card, message } from 'antd'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { initProvider } from 'onto-provider'
import { getAmount } from '../../../utils/count'

BigNumber.set({
  EXPONENTIAL_AT: [-50, 50],
  DECIMAL_PLACES: 30,
})
const ERC20_ABI =
  '[{"inputs":[{"internalType":"address","name":"lockProxyContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'
// const depositAbi = '{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"}';
const supplyAbi =
  '{"constant":false,"inputs":[{"internalType":"uint256","name":"mintAmount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}'

initProvider()
const ETHApprove: FC = () => {
  const [approveResult, setApproveResult] = useState<string>('')
  const [allowance, setAllowance] = useState<string>('')

  const handlerApprove = async () => {
    // const web3 = new Web3((window as any).onto)
    const web3 = new Web3(Web3.givenProvider);
    const account = await web3.eth.getAccounts()
    const underlying_address = '0x58708604BAE3e6133354cef87A042A14DcE9D1C7'
    const lock_address = '0x37A0D74916479a80b8A7eEbfBf610c2B80d40fEA'
    const float = 8
    console.log('underlying_address', underlying_address)
    console.log('lock_address', lock_address)
    try {
      const Coin = new web3.eth.Contract(
        JSON.parse(ERC20_ABI),
        underlying_address,
      )
      const tokenAmountToApprove = new BigNumber(99999999999999999999)
        .shiftedBy(Number(float))
        .toString()
      console.log('tokenAmountToApprove', tokenAmountToApprove)
      const tx = await Coin.methods
        .approve(lock_address, tokenAmountToApprove)
        .send({
          from: account[0],
          gas: 800000,
        })
        .on('transactionHash', (res: any) => {
          console.log('res1', res)
          setApproveResult(JSON.stringify(res))
        })
        .on('error', (err: any) => {
          console.log('err2', err)
        })
      console.log('approveAction tx', tx)
      // message.error('Approve success')
    } catch (e) {
      message.error('Approve fail')
      throw e
    }
  }

  const handlerApproveCheck = async () => {
    // const web3 = new Web3((window as any).onto)
    const web3 = new Web3(Web3.givenProvider);
    const underlying_address = '0x58708604BAE3e6133354cef87A042A14DcE9D1C7'
    const lock_address = '0x37A0D74916479a80b8A7eEbfBf610c2B80d40fEA'
    try {
      const Coin = new web3.eth.Contract(
        JSON.parse(ERC20_ABI),
        underlying_address,
      )
      const account = await web3.eth.getAccounts()
      const balance = await Coin.methods
        .allowance(account[0], lock_address)
        .call()
      console.log('balance', balance)
      setAllowance(balance)
      message.success('Check success')
    } catch (e) {
      message.error('Check fail')
      throw e
    }
  }

  const handlerSendTransaction = async () => {
    // const web3 = new Web3((window as any).onto)
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts()
    const data = await web3.eth.abi.encodeFunctionCall(JSON.parse(supplyAbi), [
      getAmount('0.0000001', 8),
    ])
    const value = '0'
    const gasPrice = await web3.eth.getGasPrice()
    const nonce = await web3.eth.getTransactionCount(accounts[0])
    const contract = '0x37A0D74916479a80b8A7eEbfBf610c2B80d40fEA'
    const signParams = {
      from: accounts[0] || '',
      to: contract,
      value,
      gas: 800000,
      gasPrice,
      data,
      nonce,
    }
    console.log('signParams', signParams)
    // @ts-ignore
    web3.eth
      .sendTransaction(signParams)
      .on('transactionHash', async (res) => {
        console.log('transactionHash', res)
      })
      .on('transactionHash', (hash: string) => {
        console.info('on transactionHash:', hash)
      })
      .on('receipt', (receipt: any) => {
        console.info('on receipt:', receipt)
      })
      .on('error', (err: any) => {
        console.info('on err:', err)
      })
  }
  return (
    <Card>
      <Card>
        <Button onClick={handlerApprove} type="primary">
          Approve
        </Button>
        <div className={'overflow-y-lay'} style={{ marginTop: '20px' }}>
          Result: {approveResult}
        </div>
      </Card>
      <Card>
        <Button onClick={handlerApproveCheck} type="primary">
          ApproveCheck
        </Button>
        <div className={'overflow-y-lay'} style={{ marginTop: '20px' }}>
          Result: {allowance}
        </div>
      </Card>
      <Card>
        <Button onClick={handlerSendTransaction} type="primary">
          SendTransaction
        </Button>
        <div className={'overflow-y-lay'} style={{ marginTop: '20px' }}>
          Result: {allowance}
        </div>
      </Card>
    </Card>
  )
}

export default ETHApprove
