import { FC, useEffect, useState } from 'react'
import { Card, Button, message } from 'antd'
import { client, provider } from '@ont-dev/ontology-dapi'

const OntNetwork: FC = () => {
  const [network, setNetwork] = useState<string>('')
  const handlerGetNetwork = async () => {
    try {
      const network = await client.api.network.getNetwork()
      setNetwork(JSON.stringify(network))
      message.success('Get success')
    } catch (e) {
      message.error('Get fail')
      throw e
    }
  }
  useEffect(() => {
    client.registerClient({
      extension: provider.ExtensionType.Cyano,
    })
  }, [])
  return (
    <Card>
      <Button onClick={handlerGetNetwork} type="primary">
        getNetwork
      </Button>
      <div style={{ marginTop: '20px' }}>Result: {network}</div>
    </Card>
  )
}

export default OntNetwork
