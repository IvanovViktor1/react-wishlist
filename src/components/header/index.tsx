import { FC, useEffect, useState, useRef } from "react";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import OptionsDrawer from "../options";
import { sessionApi } from "../../services/SessionService";
import { useAppSelector } from "../../hooks/redux";
import Loader from "../loader";
import { AuthError } from "@supabase/supabase-js";

const Header: FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const visibleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { isLoading, error } = sessionApi.useGetUserSessionQuery();

  const currentUser = useAppSelector((state) => state.userReducer).session
    ?.user;

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (currentUser === undefined) {
  //       navigate(Paths.login);
  //     }
  //   }, 5000);
  // }, []);

  return (
    <div>
      <header className={styles.header}>
        {isLoading ? <Loader /> : null}
        <Link to={Paths.home}>
          <h2>Whishlist</h2>
          <h4>{currentUser?.user_metadata.name}</h4>
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
