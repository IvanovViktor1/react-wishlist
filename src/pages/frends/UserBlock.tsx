import React, { FC, useEffect, useState } from "react";
import { TUser, sessionApi } from "../../services/SessionService";
import styles from "./frends.module.scss";
import { frendsApi } from "../../services/FrendService";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import CustomLoader from "../../components/loader/CustomLoader";

interface IUserBlock {
  data: TUser;
}

const UserBlock: FC<IUserBlock> = ({ data }) => {
  const { id, name, phone, user_uuid, email } = data;
  const currentUserUuid = useAppSelector((state) => state.userReducer).session
    ?.user.id;

  const navigate = useNavigate();
  const {
    data: frends,
    isLoading: isLoading3,
    refetch,
  } = frendsApi.useGetAllFrendsQuery(currentUserUuid as string);
  const [add, { isLoading: isLoading1 }] = frendsApi.useAddNewFrendMutation();
  const [remove, { isLoading }] = frendsApi.useRemoveFrendMutation();
  const { isLoading: isLoading2 } = sessionApi.useGetAllUsersQuery();

  const addFrend = async () => {
    await add(id).then(() => refetch());
  };

  const removeFrend = async () => {
    await remove(id).then(() => refetch());
  };

  const openFrendPage = () => {
    navigate(`${Paths.frend}/${id}`);
  };

  return (
    <>
      {isLoading && isLoading1 && isLoading2 && isLoading3 ? (
        <CustomLoader />
      ) : null}
      {currentUserUuid && frends ? (
        <div
          className={
            frends.find((f) => f.user_id === id)
              ? styles.userCardFrend
              : styles.userCard
          }
        >
          <div className={styles.textRow}> Имя: {name}</div>
          <div className={styles.textRow}> Телефон: {phone}</div>
          <div className={styles.textRow}> Почта: {email}</div>
          {/* <hr className={styles.hr} /> */}

          {currentUserUuid === user_uuid ? (
            <div className={styles.itsYou}>Это Вы</div>
          ) : (
            <div className={styles.cardBtns}>
              {frends.find((f) => f.user_id === id) ? (
                <input
                  className={styles.removeBtn}
                  type="submit"
                  value="Отписаться"
                  onClick={removeFrend}
                />
              ) : (
                <input
                  className={styles.addBtn}
                  type="submit"
                  value="Подписаться"
                  onClick={addFrend}
                />
              )}
              <input
                className={styles.openBtn}
                type="submit"
                value="Открыть"
                onClick={openFrendPage}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.userCard}>
          <div className={styles.textRow}> Имя: ---</div>
          <div className={styles.textRow}> Телефон: ---</div>
          <div className={styles.textRow}> Почта: ---</div>
          <hr className={styles.hr} />

          <div className={styles.cardBtns}>
            <input className={styles.addBtn} type="submit" value="Добавить" />

            <input className={styles.openBtn} type="submit" value="Открыть" />
          </div>
        </div>
      )}
    </>
  );
};

export default UserBlock;
