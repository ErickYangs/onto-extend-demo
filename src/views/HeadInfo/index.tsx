import { FC } from 'react'

type Props = {
  account?: string
}

const HeadInfo: FC<Props> = ({ account }) => {
  return (
    <div>
      当前账号：
      {account}
    </div>
  )
}

export default HeadInfo
