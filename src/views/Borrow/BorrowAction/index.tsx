import {FC, useEffect} from "react";
import {Card} from "antd";
import AbiJson from '../../../utils/CErc20Delegator.json'
import {findAbiParamter} from "../../../utils/tools";
import { Button } from 'antd';
const BorrowAction: FC = () => {
  const findData = () => {
    console.log('AbiJson.abi', AbiJson.abi)
    let result = findAbiParamter(AbiJson.abi, 'type', 'name', 'function', 'redeem')
    console.log('AbiJson.abi result', result)
  }

  return <Card title="Borrow">
    <Button type="primary" onClick={findData}>
      Borrow Action
    </Button>
  </Card>
}

export default BorrowAction;
