import { FC, useState } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import OptionsDrawer from "../options";
import { sessionApi } from "../../services/SessionService";
import CustomLoader from "../loader/CustomLoader";

const Header: FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const visibleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  const { data, isFetching } = sessionApi.useGetCurrentUserInfoQuery();

  return (
    <div className={styles.mainHeader}>
      <header className={styles.header}>
        <Link to={Paths.home}>
          <h2>Whishlist</h2>
          {data && <h4>{data.name}</h4>}
          {/* {isFetching && <CustomLoader text="Загрузка имени..." />} */}
          {data === null && <h4>Не авторизован</h4>}
        </Link>

        <div className={styles.btnOption} onClick={visibleDrawer}>
          {drawerVisible ? <UpCircleOutlined /> : <DownCircleOutlined />}
        </div>
      </header>
      <OptionsDrawer
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </div>
  );
};

export default Header;
