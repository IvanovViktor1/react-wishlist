import { FC, useEffect, useState, useRef } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import OptionsDrawer from "../options";
import { sessionApi } from "../../services/SessionService";
import { useAppSelector } from "../../hooks/redux";
import Loader from "../loader";

const Header: FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const visibleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  const ref = useRef<HTMLDivElement | null>(null);

  const [getSession, { data, isLoading }] =
    sessionApi.useGetUserSessionMutation();

  const currentUser = useAppSelector((state) => state.userReducer).session
    ?.user;

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !event.composedPath().includes(ref.current)) {
      setDrawerVisible(false);
      console.log("нажатие");
      if (currentUser) {
        console.log(currentUser.email as string);
      }
    }
  };

  useEffect(() => {
    getSession();

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // const { currentUser } = useAppSelector((state) => state.userReducer);
  // const currentUser = data

  return (
    <div>
      <header className={styles.header}>
        {isLoading ? <Loader /> : null}
        <Link to={Paths.home}>
          <h2>Whishlist</h2>
          <h4>{currentUser?.email}</h4>
        </Link>

        <div className={styles.btnOption} onClick={visibleDrawer}>
          {drawerVisible ? <UpCircleOutlined /> : <DownCircleOutlined />}
        </div>
      </header>
      <OptionsDrawer visible={drawerVisible} ref={ref} />
    </div>
  );
};

export default Header;
