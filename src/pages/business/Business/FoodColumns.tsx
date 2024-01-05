import styles from '../Business/style.less';

const ListContent = ({
  data: { id, name, photo, price, category, businessId},
}: {
  data: API.FoodsVO;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>菜品id</span>
      <p>{id}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>菜品名</span>
      <p>{name}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>价格</span>
      <p>{price}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>分类</span>
      <p>{category}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>菜品图</span>
      <p>
        <img src={photo} alt="店铺图片" className={styles.responsiveImage}/>
      </p>
    </div>
  </div>
);

export default ListContent;
