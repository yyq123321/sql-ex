import styles from '../OrderList/style.less';
import moment from 'moment';
import { Badge } from 'antd';

const ListContent = ({
  data: { productInfo, createTime, orderNumber, status, addCoins, totalAmount, id },
}: {
  data: API.OrderVO;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>订单名</span>
      <p>{productInfo?.name}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>订单号</span>
      <p>{orderNumber}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>订单详情</span>
      <p>{productInfo?.description}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>状态</span>
      {(() => {
        switch (status) {
          case 0:
            return (
              <p>
                <Badge status="processing" text="未支付" />
              </p>
            );
          case 1:
            return (
              <p>
                <Badge status="success" text="已支付" />
              </p>
            );
          case 2:
            return (
              <p>
                <Badge status="error" text="超时未支付" />
              </p>
            );
          default:
            return null;
        }
      })()}
    </div>
    <div className={styles.listContentItem}>
      <span>只因币</span>
      <p>{addCoins}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>订单金额</span>
      <p>{(totalAmount / 100).toFixed(2)}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{moment(createTime).format('YYYY-MM-DD HH:mm')}</p>
    </div>
  </div>
);

export default ListContent;
