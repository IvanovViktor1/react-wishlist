import React, { FC } from "react";
import { Layout } from "../../components/layout";
import { TWish, wishApi } from "../../services/WishService";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import styles from "./wishInfoPage.module.scss";

const WishInfoPage: FC = () => {
  const params = useParams<{ id: string }>();

  const { data: wish, isLoading } = wishApi.useGetWishByIdQuery(
    Number(params.id)
  );

  return (
    <Layout>
      {isLoading ? <Loader /> : null}
      {wish ? (
        <div className={styles.mainPageBlock}>
          <div className={styles.imageBlock}>
            {wish.image_url ? (
              <img
                className={styles.imgIcon}
                loading="lazy"
                src={wish.image_url}
                alt="Предварительный просмотр"
              />
            ) : (
              <img
                className={styles.imgIcon}
                loading="lazy"
                src="https://avatars.mds.yandex.net/i?id=8b60701b34add6db648fe9363a211c1eb9318c0e-4599532-images-thumbs&n=13*/"
                alt="Стандартное изображение"
              />
            )}
          </div>

          <div className={styles.textBlock}>
            <div className={styles.txtRow}>
              <p className={styles.placeholder}>Наименование: </p>
              <p>{wish.title}</p>
            </div>
            <div className={styles.txtRow}>
              <p className={styles.placeholder}>Описание: </p>
              <p>{wish.description}</p>
            </div>
            <div className={styles.txtRow}>
              <p className={styles.placeholder}>Стоимость: </p>
              <p>{wish.price}</p>
            </div>
            <div className={styles.txtRow}>
              <p className={styles.placeholder}>Ссылка: </p>
              <p>{wish.link}</p>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default WishInfoPage;
