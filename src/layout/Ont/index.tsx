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

  const handlerSendAsset = async () => {
    try {
      const result = await client.api.asset.send({
        to: 'AVagaSMzMHdRGDn6HbW7NtTejzpvkYU5o8',
        asset: "ONG",
        amount: '1000000000',
      });
      console.log('result', result)
    } catch (e) {
      message.error('send fail, please try again')
      throw e
    }
  }
  const handlerSignMessage = async () => {
    try {
      let message = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpvbnQ6QUhndFhSb3BDenp6U0J0Y0xodjdZeWRSdUxiNG53Q3VxciNrZXlzLTEifQ==.eyJpc3MiOiJkaWQ6b250OkFIZ3RYUm9wQ3p6elNCdGNMaHY3WXlkUnVMYjRud0N1cXIiLCJqdGkiOiJkaWQ6b250OkFIZ3RYUm9wQ3p6elNCdGNMaHY3WXlkUnVMYjRud0N1cXIiLCJhdWQiOiJkaWQ6b250OkFVb2tnWk45M3ZHZW1Ib290bmVXZnVob2dTaFZaQ3o2blgiLCJuYmYiOjE2MzIyNzg2NTkyMTgsImlhdCI6MTYzMjI3ODY1OTIxOCwiZXhwIjoxNjMyMjgxMjUxMjE4LCJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNkltUnBaRHB2Ym5RNlFWSnlOa0Z3U3pJMFJWVTNiblZtVGtRMGN6RlRWM0IzVlV4SVFtVnlkSEJLWWlOclpYbHpMVEVpTENKMGVYQWlPaUpLVjFRaWZRPT0uZXlKcGMzTWlPaUprYVdRNmIyNTBPa0ZTY2paQmNFc3lORVZWTjI1MVprNUVOSE14VTFkd2QxVk1TRUpsY25Sd1NtSWlMQ0psZUhBaU9qRTJOak0wT0RBMU16QXNJbTVpWmlJNk1UWXpNVGswTkRVek1Dd2lhV0YwSWpveE5qTXhPVFEwTlRNd0xDSnFkR2tpT2lKMWNtNDZkWFZwWkRvMlpUQXpPV0l4TXkwMU16azNMVFEzTVdJdFlqWTVNeTAyWWpSbU16TTVZbVZoWTJJaUxDSjJZeUk2ZXlKQVkyOXVkR1Y0ZENJNld5Sm9kSFJ3Y3pvdkwzZDNkeTUzTXk1dmNtY3ZNakF4T0M5amNtVmtaVzUwYVdGc2N5OTJNU0lzSW1oMGRIQnpPaTh2YjI1MGFXUXViMjUwTG1sdkwyTnlaV1JsYm5ScFlXeHpMM1l4SWl3aVkzSmxaR1Z1ZEdsaGJEcG5hWFJvZFdKZllYVjBhR1Z1ZEdsallYUnBiMjRpWFN3aWRIbHdaU0k2V3lKV1pYSnBabWxoWW14bFEzSmxaR1Z1ZEdsaGJDSmRMQ0pqY21Wa1pXNTBhV0ZzVTNWaWFtVmpkQ0k2ZXlKQmJHbGhjeUk2SWtWeWFXTnJXV0Z1WjNNaUxDSkJkbUYwWVhJaU9pSm9kSFJ3Y3pvdkwyRjJZWFJoY25NdVoybDBhSFZpZFhObGNtTnZiblJsYm5RdVkyOXRMM1V2TXprM09EVTJNamcvZGowMElpd2lRbWx2SWpvaVUyaGhjbVVnZVc5MWNpQm1kVzRoSWl3aVJXMWhhV3dpT2lJeE1URTBNelF4T0RVelFIRnhMbU52YlNJc0lrbGtJam9pTXprM09EVTJNamdpTENKSmMzTjFaWEpPWVcxbElqb2lUMjUwYjJ4dloza2lMQ0oxYzJWeVgyUnBaQ0k2SW1ScFpEcHZiblE2UVdOR1RuazNkbGxWZFRoaFkwNDNZelYwV0ZCYVdsQmlWa1UyY2pGS1ZHZzNJbjBzSW1OeVpXUmxiblJwWVd4VGRHRjBkWE1pT25zaWFXUWlPaUkyTldRek5UYzNZMlZsWm1Vd1pUWTRNREExWm1aaE16VXdOVFk0WXpjMU1tRTRNakk1WlRZd0lpd2lkSGx3WlNJNklrRjBkR1Z6ZEVOdmJuUnlZV04wSW4wc0luQnliMjltSWpwN0ltTnlaV0YwWldRaU9pSXlNREl4TFRBNUxURTRWREExT2pVMU9qTXdXaUlzSW5CeWIyOW1VSFZ5Y0c5elpTSTZJbUZ6YzJWeWRHbHZiazFsZEdodlpDSjlmWDA9LkFXNTV5dzNROXdqVjB4b1EzMDRJWG8rNkZNSDl6VkltTHdxSFNITUJpQXpVWFM0UHpGb0FUTVNVNEp6cmZIWUtIKzJ5L2tBbFNQeGdwV2xMelllNkJSOD0iXX19'
      const result = await client.api.message.signMessage({ message });
      console.log('result', result)
    } catch (e) {
      message.error('send fail, please try again')
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
            <Button style={{
              marginRight: '20px',
            }}  onClick={handlerInitOnt} type="primary">
              initOnt
            </Button>
            <Button onClick={handlerSendAsset} type="primary">
              Send Asset
            </Button>
          </Card>
          <Card>
            <Button onClick={handlerGetAccount} type="primary">
              getAccount
            </Button>
            <Button onClick={handlerSignMessage} type="primary">
              SignMessage
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
