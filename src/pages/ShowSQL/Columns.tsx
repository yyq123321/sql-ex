import styles from '../ShowSQL/style.less';

const ListContent = ({
  data: { businessId, businessName, foodName, totalOrders},
}: {
  data: API.BusinessFoodOrderDTO;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>商户id(businessId)</span>
      <p>{businessId}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>商户(businessName)</span>
      <p>{businessName}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>菜品(foodName)</span>
      <p>{foodName}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>总数(totalOrders)</span>
      <p>{totalOrders}</p>
    </div>
  </div>
);

export default ListContent;
