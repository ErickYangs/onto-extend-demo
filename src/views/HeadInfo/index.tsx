import { FC } from 'react'

type Props = {
  account?: string
}

const HeadInfo: FC<Props> = ({ account }) => {
  return (
    <div>
      Current Account：
      {account}
    </div>
  )
}

export default HeadInfo;
