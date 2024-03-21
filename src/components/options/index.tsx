import React, { forwardRef, useEffect } from "react";
import styles from "./options.module.scss";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import { supabase } from "../..";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { exitUser } from "../../store/reducers/userSlice";
import { sessionApi } from "../../services/SessionService";

interface Props {
  visible: boolean;
}

export type Ref = HTMLDivElement;

const OptionsDrawer = forwardRef<Ref, Props>(({ visible }, myref) => {
  const dispatch = useAppDispatch();
  const exit = async () => {
    dispatch(exitUser());
    await supabase.auth.signOut();
  };

  const currentUser = useAppSelector((state) => state.userReducer).session
    ?.user;

  return (
    <div className={styles.window} ref={myref}>
      <div className={styles.block} style={{ top: visible ? "0" : "-500px" }}>
        <div className={styles.head}>
          <h4>{"asd"}</h4>
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
