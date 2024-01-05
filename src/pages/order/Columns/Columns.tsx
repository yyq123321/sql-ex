import styles from '../OrderList/style.less';
import { Badge } from 'antd';

const ListContent = ({
  data: { orderNum, status, customer, address, id, food, price, remark, rider, business},
}: {
  data: API.OrdersVO;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>订单号</span>
      <p>{orderNum}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>状态</span>
      {(() => {
        switch (status) {
          case 0:
            return (
              <p>
                <Badge status="processing" text="商家已接单" />
              </p>
            );
          case 1:
            return (
              <p>
                <Badge status="processing" text="骑手已接单" />
              </p>
            );
          case 2:
            return (
              <p>
                <Badge status="processing" text="商家已出餐" />
              </p>
            );
          case 3:
            return (
              <p>
                <Badge status="processing" text="骑手已取餐" />
              </p>
            );
          case 4:
            return (
              <p>
                <Badge status="success" text="外卖已送达" />
              </p>
            );
          default:
            return null;
        }
      })()}
    </div>
  </div>
);

export default ListContent;
