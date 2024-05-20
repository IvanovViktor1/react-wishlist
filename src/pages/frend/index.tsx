import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sessionApi } from "../../services/SessionService";
import { Layout } from "../../components/layout";
import { wishlistApi } from "../../services/ListService";
import WishList from "../../components/lists/wishList";
import { useAppSelector } from "../../hooks/redux";
import CustomLoader from "../../components/loader/CustomLoader";

const Frend: FC = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = sessionApi.useGetUserInfoByIdQuery(
    Number(params.id)
  );
  const sortLists = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortLists;
  const { data: lists, isLoading: isLoading1 } =
    wishlistApi.useGetListsByUserIdQuery({
      user_id: Number(params.id),
      sortByDate: sortLists.sortByDate,
      sortByHidden: sortLists.sortByHidden,
      sortValue: sortLists.value,
    });

  const readableLists = lists?.filter((list) => list.hidden === false);

  return (
    <Layout>
      {isLoading && isLoading1 && <CustomLoader />}
      {data ? (
        <>
          <div>
            <p>{data.id}</p>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p>{data.user_uuid}</p>
          </div>
          <hr />
          {readableLists ? (
            <div>
              {readableLists.map((list, index) => (
                <WishList key={index} data={list} />
              ))}
            </div>
          ) : (
            <div>Нет листов</div>
          )}
          {readableLists?.length === 0 ? <div>нет доступных листов</div> : null}
        </>
      ) : (
        <div>ошибка загрузки</div>
      )}
    </Layout>
  );
};

export default Frend;
