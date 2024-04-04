import { useEffect } from "react";
import { supabase } from "../..";
import { Layout } from "../../components/layout";
import Lists from "../../components/lists";
import styles from "./home.module.scss";

const Home = () => {
  const getFrends = async () => {
    const ss = await supabase.auth.admin.listUsers();
    try {
      if (ss.data) {
        console.log(ss.data);
      }
    } catch (error) {
      console.log(ss.error);
    }
  };

  // useEffect(() => {
  //   getFrends();
  // }, []);
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
