import React, { useRef, FC, useEffect, useState } from "react";
import styles from "./options.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { supabase } from "../..";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { exitUser } from "../../store/reducers/userSlice";
import { sessionApi } from "../../services/SessionService";

interface IDrawer {
  open: boolean;
  onClose: () => void;
}

const OptionsDrawer: FC<IDrawer> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const exit = async () => {
    dispatch(exitUser());
    await supabase.auth.signOut().then(() => navigate(Paths.home));
  };

  const { refetch } = sessionApi.useGetUserSessionQuery();
  const outsideRef = useRef<HTMLDivElement>(null);

  const currentUser = useAppSelector((state) => state.userReducer).session
    ?.user;
  const handleClickOutside = (event: MouseEvent) => {
    if (
      outsideRef.current &&
      !outsideRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [open]);

  return (
    <div className={styles.window}>
      <div
        className={styles.block}
        ref={outsideRef}
        style={{ top: open ? "0" : "-500px" }}
      >
        {currentUser ? (
          <>
            <div className={styles.head}>
              <h4>{currentUser?.user_metadata.name}</h4>
            </div>
            <Link to={Paths.lists}>
              <div className={styles.btn}>Листы</div>
            </Link>
            <Link to={Paths.frends}>
              <div className={styles.btn}>Друзья</div>
            </Link>
            <div className={styles.btn}>Настройки профиля</div>
            <div
              className={styles.btn}
              onClick={() => {
                exit();
              }}
            >
              Выход
            </div>
          </>
        ) : (
          <>
            <Link to={Paths.login}>
              <div className={styles.btn}>Войти</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default OptionsDrawer;
