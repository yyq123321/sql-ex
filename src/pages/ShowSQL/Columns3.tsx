import styles from '../ShowSQL/style.less';

const OrderListContent = ({
  data: { businessName, foodName, totalOrders},
}: {
  data: API.OrderSummaryDTO;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>商家(businessName)</span>
      <p>{businessName}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>菜品(foodName)</span>
      <p>{foodName}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>totalOrders</span>
      <p>{totalOrders}</p>
    </div>
  </div>
);

export default OrderListContent;
