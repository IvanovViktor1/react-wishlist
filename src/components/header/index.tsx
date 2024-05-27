import { FC, useState, useEffect } from "react";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import {
  DownCircleOutlined,
  MenuOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import OptionsDrawer from "../options";
import { sessionApi } from "../../services/SessionService";
import CustomLoader from "../loader/CustomLoader";
import { wishlistApi } from "../../services/ListService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { wishApi } from "../../services/WishService";
import { exitUser } from "../../store/reducers/userSlice";
import { supabase } from "../..";

const Header: FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const visibleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const exit = async () => {
    dispatch(exitUser());
    await supabase.auth.signOut().then(() => navigate(Paths.home));
  };

  const sortLists = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortLists;

  const { data: dataSession, isFetching } =
    sessionApi.useGetCurrentUserInfoQuery();
  const sortWishs = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortWishs;
  const [
    trigerListsData,
    { data: listsData, isFetching: secondFetching, isLoading: secondLoading },
  ] = wishlistApi.useLazyGetListsByUserIdQuery();

  const [
    trigerWhishsData,
    {
      data: wishsData,
      isFetching: thirdFetching,
      isLoading: thirdLoading,
      isUninitialized,
    },
  ] = wishApi.useLazyGetAllWishsInCategoriesQuery();

  useEffect(() => {
    if (dataSession) {
      trigerListsData({
        user_id: dataSession.user.id,
        sortByDate: sortLists.sortByDate,
        sortByHidden: sortLists.sortByHidden,
        sortValue: sortLists.value,
      });
    }
  }, [dataSession]);

  useEffect(() => {
    if (listsData) {
      trigerWhishsData({
        categories: sortWishs.categories.map((c) => c.id),
        listIds: sortWishs.byListId,
        sortByDate: sortWishs.sortByDate,
        sortByHidden: sortWishs.sortByHidden,
        sortByPrice: sortWishs.sortByPrice,
        ascending: sortWishs.ascending,
      });
    }
  }, [listsData]);

  return (
    <div className={styles.mainHeader}>
      <header className={styles.header}>
        <Link to={Paths.home}>
          <h2>Whishlist</h2>
          {dataSession && <h4>{dataSession.user.name}</h4>}
          {/* {isFetching && <CustomLoader text="Загрузка имени..." />} */}
          {dataSession === null && <h4>Не авторизован</h4>}
        </Link>

        <div className={styles.btnForRow}>
          <Link to={Paths.lists}>
            <div className={styles.btn}>Листы</div>
          </Link>
          <Link to={Paths.allWishs}>
            <div className={styles.btn}>Все желания</div>
          </Link>
          <div className={styles.btn}>Друзья</div>
          <Link to={Paths.info}>
            <div className={styles.btn}>О вишлисте</div>
          </Link>
          <div
            className={styles.btn}
            onClick={() => {
              exit();
            }}
          >
            Выход
          </div>
        </div>
        <MenuOutlined
          className={drawerVisible ? styles.btnMenuOpen : styles.btnMenu}
          onClick={visibleDrawer}
        />
        {/* <div className={styles.btnOption} onClick={visibleDrawer}>
          {drawerVisible ? <MenuOutlined /> : <DownCircleOutlined />}
        </div> */}
      </header>
      <div className={styles.optionsDrawer}>
        <OptionsDrawer
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
        />
      </div>
    </div>
  );
};

export default Header;
