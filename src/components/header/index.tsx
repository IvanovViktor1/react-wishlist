import { FC, useEffect, useState, useRef } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import { useAppDispatch } from "../../redux/store";
import { setSessionInfo, userExit } from "../../redux/users/userSlice";
import { useSelector } from "react-redux";
import { getCurrentUser, getUsers } from "../../redux/users/selectors";
import { supabase } from "../..";
import { fetchUsers } from "../../redux/users/asyncActions";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import OptionsDrawer from "../options";
import Login from "../authentication/Login";

const Header: FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useSelector(getCurrentUser);
  const ref = useRef<HTMLDivElement | null>(null);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    try {
      if (data && data.session) {
        dispatch(
          setSessionInfo({
            user_email: data.session.user.email as string,
            user_id: data.session.user.id,
          })
        );
        // console.log(data.session.user);
      }
    } catch (err) {
      console.error(error?.message);
    }
  };

  const visibleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // if (ref.current && !ref.current.contains(event.target)) {
    //   setDrawerVisible(false);
    // }
    if (ref.current && !event.composedPath().includes(ref.current)) {
      setDrawerVisible(false);
      console.log("1");
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
    getSession();
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <Link to={Paths.home}>
          <h2>Whishlist</h2>
          <h4>{currentUser && currentUser.name}</h4>
        </Link>

        <div className={styles.btnOption} onClick={visibleDrawer}>
          {drawerVisible ? <DownCircleOutlined /> : <UpCircleOutlined />}
        </div>
      </header>
      <OptionsDrawer visible={drawerVisible} ref={ref} />
    </div>
  );
};

export default Header;
