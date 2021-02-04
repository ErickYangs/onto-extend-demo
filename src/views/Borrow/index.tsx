import {FC} from "react";
import {Card} from "antd";
import BorrowAction from "./BorrowAction";

const BorrowLay: FC = () => {
  return <Card title="Borrow Action">
    <BorrowAction />
  </Card>
}

export default BorrowLay;
