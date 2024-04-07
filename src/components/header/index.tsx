import { FC, useEffect, useState, useRef } from "react";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import OptionsDrawer from "../options";
import { sessionApi } from "../../services/SessionService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Loader from "../loader";
import { AuthError } from "@supabase/supabase-js";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/reducers/authSlice";
import { authApi } from "../../services/authApi";

const Header: FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const visibleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  // const { data, isLoading } = authApi.useCurrentQuery();
  // }, [dispatch]);

  // const { data, isLoading } = useCurrentQuery();
  return (
    <div>
      <header className={styles.header}>
        {/* {isLoading ? <Loader /> : null} */}
        <Link to={Paths.home}>
          <h2>Whishlist</h2>
          {user && <p>{user.name}</p>}
          {/* <h4>{currentUser?.user_metadata.name}</h4> */}
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
