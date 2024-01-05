import styles from '../ShowSQL/style.less';

const FoodListContent = ({
  data: { foodName, totalOrders},
}: {
  data: API.FoodOrderSummaryDTO;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>foodName</span>
      <p>{foodName}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>totalOrders</span>
      <p>{totalOrders}</p>
    </div>
  </div>
);

export default FoodListContent;
