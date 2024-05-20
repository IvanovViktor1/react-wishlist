import { FC, useRef } from "react";
import { Layout } from "../../components/layout";
import styles from "./home.module.scss";

const Home: FC = () => {
  // const click = () => {
  //   console.log("1");
  //   setTimeout(() => {
  //     console.log("2");
  //   }, 0);
  //   queueMicrotask(() => console.log("3"));
  //   Promise.resolve().then(() => {
  //     console.log("4");
  //   });
  //   queueMicrotask(() => console.log("5"));
  //   console.log("6");
  // };
  return (
    <Layout>
      <div className={styles.home}>
        {/* <div className={styles.tagsLine} onClick={click}>
          Клик
        </div> */}
        <div className={styles.tagsLine}>Лента по тегам</div>
        <div className={styles.frendNews}>Новости друзей</div>
      </div>
    </Layout>
  );
};

export default Home;
