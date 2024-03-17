import React, { useEffect } from "react";
import { Layout } from "../../components/layout";
import Lists from "../../components/lists";

import styles from "./home.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUsers } from "../../store/reducers/ActionCreators";
import UsersContainer from "../../components/usersContainer";
import { userApi } from "../../services/UserService";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../..";

const Home = () => {
  const { data, isError, isLoading } = userApi.useGetAllUsersQuery();
  // const dispatch = useAppDispatch();
  // const { users, isLoading, error } = useAppSelector(
  //   (state) => state.userReducer
  // );

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  return (
    <div>
      <div>
        {isError ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data && data ? (
          <>
            {data.map((user, index) => (
              <h3 key={index}>{user.name}</h3>
            ))}
          </>
        ) : null}
      </div>
      {/* {isLoading && <p>Идет загрузка...</p>}
      {error && <p>{error}</p>}
      {JSON.stringify(users, null, 2)} */}
    </div>
    // <Layout>
    //   <div className={styles.home}>
    //     <Lists />
    //   </div>
    // </Layout>
  );
};

export default Home;
