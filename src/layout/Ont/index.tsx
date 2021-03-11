import React, {FC, useState} from 'react'
import {Button, Card, Layout, message} from 'antd'
import HeadInfo from '../../views/HeadInfo'
import {client, provider} from '@ont-dev/ontology-dapi'
import OntNetwork from '../../views/ONT/Network'
import OntProvider from '../../views/ONT/Provider'
import {Route, useHistory} from 'react-router-dom'
import OntInvoke from '../../views/ONT/Invoke'
import OntInvokeWasm from '../../views/ONT/InvokeWasm'

const { Header, Content } = Layout
const OntLay: FC = () => {
  const [account, setAccount] = useState<string>('')
  const history = useHistory()
  const handlerInitOnt = () => {
    try {
      client.registerClient({
        extension: provider.ExtensionType.Cyano
      })
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
              invokeWasm
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
