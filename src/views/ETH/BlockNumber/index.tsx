import { FC, useState } from 'react'
import { Button, Card, message } from 'antd'
import Web3 from 'web3'
// import {initProvider} from "onto-provider";

// initProvider();

const ETHBlockNumber: FC = () => {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [blockResult, setBlockResult] = useState<string>('');
  // const [block, serBlock] =useState<string>('');
  const handlerGetBlockNumber = async () => {
    // const web3 = new Web3((window as any).onto)
    const web3 = new Web3(Web3.givenProvider)
    try {
      const blockNumber = await web3.eth.getBlockNumber()
      console.log('blockNumber', blockNumber)
      setBlockNumber(blockNumber)
      message.success('Get success')
    } catch (e) {
      message.error('Get fail')
      throw e
    }
  }

  const handlerGetBlock = async () => {
    const web3 = new Web3(Web3.givenProvider)
    // const web3 = new Web3((window as any).onto)
    try {
      // 0x60389667596963e93d8dfa7f5095c29229734f8c0900f74526396ad0eb3d6a26
      // 9766328
      const block = await web3.eth.getBlock(1);
      console.log('block', block)
      setBlockResult(JSON.stringify(block))
      message.success('Get success')
    } catch (e) {
      message.error('Get fail')
      throw e
    }
  }


  return (
    <Card>
      <Card>
        <Button onClick={handlerGetBlockNumber} type="primary">
          getBlockNumber
        </Button>
        <div className={'overflow-y-lay'} style={{ marginTop: '20px' }}>Result: {blockNumber}</div>
      </Card>
      <Card>
        <Button onClick={handlerGetBlock} type="primary">
          getBlock
        </Button>
        <div className={'overflow-y-lay'} style={{ marginTop: '20px', wordBreak: "break-all" }}>Result: {blockResult}</div>
      </Card>
    </Card>
  )
}

export default ETHBlockNumber
