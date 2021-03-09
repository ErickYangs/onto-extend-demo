import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Button } from 'antd'
const HomeLay: FC = () => {
  const history = useHistory()
  return (
    <div className={'center-gird'}>
      <div
        style={{
          width: '300px',
          height: '200px',
        }}
        className={'enterLay'}
      >
        <Card>
          <Button
            type="primary"
            onClick={() => {
              history.push('ont')
            }}
          >
            ONT
          </Button>
          <br />
          <Button
            type="primary"
            onClick={() => {
              history.push('eth')
            }}
          >
            ETH
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default HomeLay
