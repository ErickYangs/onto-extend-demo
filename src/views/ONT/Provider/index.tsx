import { FC, useEffect, useState } from 'react'
import { Card, Button, message } from 'antd'
import { client } from '@ont-dev/ontology-dapi'

const OntProvider: FC = () => {
  const [provider, setProvider] = useState<string>('')
  const handlerGetNetwork = async () => {
    try {
      const provider = await client.api.provider.getProvider()
      setProvider(JSON.stringify(provider))
      message.success('Get success')
    } catch (e) {
      message.error('No provider installed.')
      throw e
    }
  }
  useEffect(() => {
    client.registerClient({})
  }, [])
  return (
    <Card>
      <Button onClick={handlerGetNetwork} type="primary">
        getProvider
      </Button>
      <div style={{ marginTop: '20px' }}>Result: {provider}</div>
    </Card>
  )
}

export default OntProvider
