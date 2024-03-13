import React, { forwardRef, useEffect } from "react";
import styles from "./options.module.scss";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/users/selectors";
import { supabase } from "../..";
import { useAppDispatch } from "../../redux/store";
import { userExit } from "../../redux/users/userSlice";

interface Props {
  visible: boolean;
}

export type Ref = HTMLDivElement;

const OptionsDrawer = forwardRef<Ref, Props>(({ visible }, myref) => {
  const dispatch = useAppDispatch();
  const exit = async () => {
    await supabase.auth.signOut();
    dispatch(userExit());
  };
  const currentUser = useSelector(getCurrentUser);

  // useEffect(() => {
  //   console.log(visible);
  // }, [visible]);

  return (
    <div className={styles.window} ref={myref}>
      <div className={styles.block} style={{ top: visible ? "0" : "-500px" }}>
        <div className={styles.head}>
          <h4>{currentUser?.name}</h4>
        </div>
        <Link to={Paths.list}>
          <div className={styles.btn}>Листы</div>
        </Link>
        <div className={styles.btn}>Настройки профиля</div>
        {currentUser ? (
          <div
            className={styles.btn}
            onClick={() => {
              exit();
            }}
          >
            Выход
          </div>
        ) : (
          <Link to={Paths.login}>
            <div className={styles.btn}>Войти</div>
          </Link>
        )}
      </div>
    </div>
  );
});

export default OptionsDrawer;
