import React, { FC } from "react";
import { userApi } from "../services/UserService";

const UsersContainer: FC = () => {
  const { data, isError, isLoading } = userApi.useGetAllUsersQuery();

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
              <h3>{user.name}</h3>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UsersContainer;
