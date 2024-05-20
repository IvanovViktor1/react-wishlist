import { FC, useState, useRef } from "react";
import styles from "./wish.module.scss";
import {
  CloseOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { TWish, wishApi } from "../../services/WishService";
import { EditWishForm } from "../lists/modals/EditWish";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import CustomLoader from "../loader/CustomLoader";
import { allCategories } from "../../utils/allCategories";
import { formatDate } from "../../utils/formatDate";
import { useAppSelector } from "../../hooks/redux";
import LoaderInFullScreen from "../loader/LoaderInFullScreen";

interface IWish {
  data: TWish;
  isOwner: boolean;
}

const Wish: FC<IWish> = ({ data, isOwner }) => {
  const sortWishs = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortWishs;
  const { refetch: refetchList } = wishApi.useGetWishsByListIdQuery({
    id: data.id_list,
    sortByDate: sortWishs.sortByDate,
    sortByHidden: sortWishs.sortByHidden,
    sortValue: sortWishs.ascending,
    categories: sortWishs.categories.map((c) => c.id),
  });

  // const { data: categories, isLoading } = categoryApi.useGetAllCategoryQuery();

  const [openEditWish, setOpenEditWish] = useState(false);
  const editWishRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [removeWish] = wishApi.useRemoveWishMutation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [editVisible, { isLoading: isLoadingSetVisible }] =
    wishApi.useEditWishVisibleMutation();

  const editVisibleWish = async () => {
    try {
      await editVisible({ ...data, hidden: !data.hidden }).then(() => {
        refetchList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openOtherForm = () => {
    // if (editWishRef.current) {
    //   editWishRef.current.style.visibility = "visible";
    // }
    setOpenEditWish(true);
  };

  const closeForm = () => {
    // if (editWishRef.current) {
    //   editWishRef.current.style.visibility = "hidden";
    // }
    setOpenEditWish(false);
  };
  const currentImg = data.image_url;

  const deleteWish = () => {
    removeWish(data.id).then(() => {
      refetchList();
    });
  };

  const handleCloseDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <div className={styles.listItem}>
      {isLoadingSetVisible ? <LoaderInFullScreen /> : null}
      <div className={styles.mainInfo}>
        <details style={{ width: "100%" }}>
          <summary>{data.title}</summary>
          <div className={styles.details}>
            <div className={styles.text}>
              Описание:{" "}
              <span className={styles.description}>{data.description}</span>
              Стоимость:<span className={styles.description}>{data.price}</span>
              Категория:
              <span className={styles.description}>
                {
                  allCategories.find(
                    (category) => category.id === data.category_id
                  )?.name
                }
              </span>
              Дата создания:
              <span className={styles.description}>
                {formatDate(data.date_of_creation)}
              </span>
            </div>

            <div className={styles.image}>
              {currentImg ? (
                <img
                  className={styles.imgIcon}
                  loading="lazy"
                  src={currentImg}
                  alt="Предварительный просмотр"
                />
              ) : allCategories ? (
                <img
                  className={styles.imgIconDefault}
                  loading="lazy"
                  src={
                    allCategories.find(
                      (category) => category.id === data.category_id
                    )?.icon
                  }
                  alt="Предварительный просмотр"
                />
              ) : (
                <CustomLoader />
              )}
            </div>
          </div>
        </details>
        <div className={styles.date}> {formatDate(data.date_of_creation)}</div>

        <div className={styles.buttons}>
          {isOwner ? (
            <>
              <div
                className={
                  data.hidden ? styles.btnWishUnvisible : styles.btnWishVisible
                }
                onClick={editVisibleWish}
              >
                {data.hidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </div>
              <div className={styles.btnSetting} onClick={openOtherForm}>
                <EditOutlined />
              </div>
              <CloseOutlined
                className={styles.btnRemove}
                onClick={deleteWish}
              />
            </>
          ) : null}
          <EditWishForm
            open={openEditWish}
            wish={data}
            ref={editWishRef}
            handleClose={closeForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Wish;
