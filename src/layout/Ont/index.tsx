import React, { FC, useState } from 'react'
import { Layout, message, Card, Button } from 'antd'
import HeadInfo from '../../views/HeadInfo'
import { client } from '@ont-dev/ontology-dapi'
import OntNetwork from '../../views/ONT/Network'
import OntProvider from '../../views/ONT/Provider'
import { Route } from 'react-router-dom'
import OntInvoke from '../../views/ONT/Invoke'
import OntInvokeWasm from '../../views/ONT/InvokeWasm'
import { useHistory } from 'react-router-dom'
const { Header, Content } = Layout
const OntLay: FC = () => {
  const [account, setAccount] = useState<string>('')
  const history = useHistory()
  const handlerInitOnt = () => {
    try {
      client.registerClient({})
      message.success('init success')
    } catch (e) {
      message.error('init fail')
      console.error(e)
    }
  }

  const handlerGetAccount = async () => {
    try {
      const account = await client.api.asset.getAccount()
      console.log('account', account)
      setAccount(account)
    } catch (e) {
      message.error('get fail, please init ont')
      throw e
    }
  }
  return (
    <div className="body-content">
      <Layout>
        <Header>
          <HeadInfo account={account} />
        </Header>
        <Content>
          <Card>
            <Button onClick={handlerInitOnt} type="primary">
              initOnt
            </Button>
          </Card>
          <Card>
            <Button onClick={handlerGetAccount} type="primary">
              getAccount
            </Button>
          </Card>
          <OntNetwork />
          <OntProvider />
          <Card>
            <Button
              style={{
                marginRight: '20px',
              }}
              type="primary"
              onClick={() => {
                history.push('/ont/invoke')
              }}
            >
              invoke
            </Button>
            {/*  invokeWasmRead*/}
            <Button
              style={{
                marginRight: '20px',
              }}
              type="primary"
              onClick={() => {
                history.push('/ont/invokeWasm')
              }}
            >
              invokeWasmRead
            </Button>
          </Card>
          <div>
            <Route path="/ont/invoke">
              <OntInvoke />
            </Route>
            <Route path="/ont/invokeWasm">
              <OntInvokeWasm />
            </Route>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default OntLay
