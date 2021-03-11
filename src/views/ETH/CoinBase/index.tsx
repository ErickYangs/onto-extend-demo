import { FC, useState } from 'react'
import { Button, Card, message } from 'antd'
import Web3 from 'web3'
import {initProvider} from "onto-provider";

initProvider();

const ETHCoinBase: FC = () => {
  const [coinBase, setCoinBase] = useState<string>('')
  const handlerGetCoinBase = async () => {
    // const web3 = new Web3((window as any).onto)
    const web3 = new Web3(Web3.givenProvider)
    try {
      const coinBase = await web3.eth.getCoinbase();
      console.log('coinBase', coinBase)
      setCoinBase(coinBase)
      message.success('Get success')
    } catch (e) {
      message.error('Get fail')
      throw e
    }
  }
  return (
    <Card>
      <Button onClick={handlerGetCoinBase} type="primary">
        getCoinBase
      </Button>
      <div style={{ marginTop: '20px' }}>Result: {coinBase}</div>
    </Card>
  )
}

export default ETHCoinBase;
