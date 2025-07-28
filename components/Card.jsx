/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "../styles/Card.module.css";
import Link from "next/link";

const Card = ({ photo }) => {
  return (
    <div className={styles.cardWrap}>
      <Link href={"/cards/" + photo.id} key={photo.id} scroll={false}>
        <a className={styles.a}>
          <div className={styles.imageWrap}>
            <img
              src={photo.thumbnailUrl}
              className={styles.image}
              alt={photo.title}
            />
          </div>
          <div className={styles.cardBody}>
            <p className={styles.title}>{photo.title}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Card;
