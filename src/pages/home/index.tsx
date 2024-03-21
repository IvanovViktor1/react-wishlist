import { Layout } from "../../components/layout";
import Lists from "../../components/lists";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <Layout>
      <div className={styles.home}>
        <Lists />
      </div>
    </Layout>
  );
};

export default Home;
