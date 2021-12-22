import { FC, useState } from 'react'
import { Button, Card, message } from 'antd'
import Web3 from 'web3'
// import {initProvider} from "onto-provider";

// initProvider();

type Props = {
  account: string
}

const ETHSign: FC<Props> = ({ account }) => {
  const [signResult, setSignResult] = useState<string>('')
  const [personalSignResult, setPersonalSignResult] = useState<string>('')
  const handlerSignMessage = async () => {
    const web3 = new Web3((window as any).onto)
    // const web3 = new Web3(Web3.givenProvider)
    try {
      const result = await web3.eth.sign('Hello world', account)
      console.log('result', result)
      setSignResult(JSON.stringify(result))
      message.success('Get success')
    } catch (e) {
      message.error('Get fail')
      throw e
    }
  }

  const handlerPersonalSign = async () => {
    // const web3 = new Web3(Web3.givenProvider)
    const web3 = new Web3((window as any).onto)
    const result = await web3.eth.personal.sign('Hello world', account, '')

    console.log('result', result)
    setPersonalSignResult(JSON.stringify(result))
    message.success('Get success')
  }

  return (
    <Card>
      <Card>
        <Button onClick={handlerSignMessage} type="primary">
          Sign
        </Button>
        <div className={'overflow-y-lay'} style={{ marginTop: '20px' }}>
          Result: {signResult}
        </div>
      </Card>
      <Card>
        <Button onClick={handlerPersonalSign} type="primary">
          Personal Sign
        </Button>
        <div
          className={'overflow-y-lay'}
          style={{ marginTop: '20px', wordBreak: 'break-all' }}
        >
          Result: {personalSignResult}
        </div>
      </Card>
    </Card>
  )
}

export default ETHSign
