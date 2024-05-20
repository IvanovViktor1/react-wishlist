import React, { FC, useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { frendsApi } from "../../services/FrendService";
import { TUser, sessionApi } from "../../services/SessionService";
import { useAppSelector } from "../../hooks/redux";
import styles from "./frends.module.scss";
import CustomInput from "../../components/customInput";
import UserBlock from "./UserBlock";
import { useForm } from "react-hook-form";
import SearchForm from "./SearchForm";
import CustomLoader from "../../components/loader/CustomLoader";

const Frends: FC = () => {
  const currentUser = useAppSelector((state) => state.userReducer).session
    ?.user;
  const { data: allUsers } = sessionApi.useGetAllUsersQuery();
  const [searchingUsers, setSearchingUsers] = useState<TUser | null>(null);
  const { data: frends, isLoading } = frendsApi.useGetAllFrendsQuery(
    currentUser?.id as string
  );

  const handleSearch = (result: TUser | null) => {
    if (result && result.name) setSearchingUsers(result);
  };

  const clearSearch = () => {
    setSearchingUsers(null);
  };

  return (
    <Layout>
      {allUsers && frends ? (
        <>
          <SearchForm
            users={allUsers}
            onSearch={handleSearch}
            onClear={clearSearch}
          />

          <div className={styles.allFrends}>
            {searchingUsers ? (
              <UserBlock data={searchingUsers} />
            ) : (
              allUsers
                .filter((user) =>
                  frends.some((frend) => frend.user_id === user.id)
                )
                .map((user, index) => <UserBlock key={index} data={user} />)
            )}
          </div>
        </>
      ) : (
        <CustomLoader text="загрузка пользователей.." />
      )}
    </Layout>
  );
};

export default Frends;
