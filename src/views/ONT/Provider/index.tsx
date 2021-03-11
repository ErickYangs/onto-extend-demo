import { FC, useEffect, useState } from 'react'
import { Card, Button, message } from 'antd'
import { client, provider } from '@ont-dev/ontology-dapi'

const OntProvider: FC = () => {
  const [providers, setProviders] = useState<string>('')
  const handlerGetNetwork = async () => {
    try {
      const provider = await client.api.provider.getProvider()
      setProviders(JSON.stringify(provider))
      message.success('Get success')
    } catch (e) {
      message.error('No provider installed.')
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
        getProvider
      </Button>
      <div style={{ marginTop: '20px' }}>Result: {providers}</div>
    </Card>
  )
}

export default OntProvider
