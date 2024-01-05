import styles from '../BizList/style.less';

const ListContent = ({
  data: { id, name, address, phone, photo},
}: {
  data: API.BusinessVO;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>商户id</span>
      <p>{id}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>商户</span>
      <p>{name}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>地址</span>
      <p>{address}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>电话</span>
      <p>{phone}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>店铺图</span>
      <p>
        <img src={photo} alt="店铺图片" className={styles.responsiveImage}/>
      </p>
    </div>
  </div>
);

export default ListContent;
