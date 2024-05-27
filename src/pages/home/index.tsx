import { FC, useRef, useEffect } from "react";
import { Layout } from "../../components/layout";
import styles from "./home.module.scss";
import ListsPage from "../lists";
const Home: FC = () => {
  return (
    <Layout>
      <div className={styles.home}>
        <div className={styles.tagsLine}>Лента по тегам</div>
        <div className={styles.frendNews}>Новости друзей</div>
      </div>
    </Layout>
  );
};

export default Home;
