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
import { TWish, wishApi } from "../../../../services/WishService";
import Loader from "../../../loader";
import { EditWishForm } from "../EditWish";
import { InfoWishForm } from "../infoWishForm";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../../../paths";

interface IWish {
  data: TWish;
  isOwner: boolean;
}

const Wish: FC<IWish> = ({ data, isOwner }) => {
  const {
    register,
    handleSubmit,
    watch, // для отслеживания введенных данных
    reset,
    formState: { errors, isValid },
    getValues, //не обязательно
    getFieldState, //не обязательноб
    setValue,
  } = useForm<TWish>({
    mode: "onChange",
    values: data,
  });
  const { refetch: refetchList } = wishApi.useGetWishsByListIdQuery(
    data.id_list
  );

  const [infoVisible, setInfoVisible] = useState(false);
  const editWishRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [removeWish] = wishApi.useRemoveWishMutation();

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
    if (editWishRef.current) {
      editWishRef.current.style.visibility = "visible";
    }
  };

  const closeForm = () => {
    if (editWishRef.current) {
      editWishRef.current.style.visibility = "hidden";
    }
  };
  const currentImg = watch("image_url");

  const deleteWish = () => {
    removeWish(data.id).then(() => {
      refetchList();
    });
  };

  return (
    <form className={styles.listItem}>
      {isLoadingSetVisible ? <Loader /> : null}
      <div className={styles.imageBlock}>
        {currentImg ? (
          <img
            className={styles.imgIcon}
            loading="lazy"
            src={currentImg}
            alt="Предварительный просмотр"
          />
        ) : (
          <img
            className={styles.imgIcon}
            loading="lazy"
            src="https://avatars.mds.yandex.net/i?id=8b60701b34add6db648fe9363a211c1eb9318c0e-4599532-images-thumbs&n=13*/"
            alt="Стандартное изображение"
          />
        )}
      </div>

      <div className={styles.infoColumn}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.settingsBlock}>
          <div className={styles.buttons}>
            <div
              className={styles.btnOpenInfo}
              onClick={() => navigate(`${Paths.wish}/${data.id}`)}
              onMouseEnter={() => {
                setInfoVisible(true);
              }}
              onMouseLeave={() => {
                setInfoVisible(false);
              }}
            >
              <InfoCircleOutlined />
            </div>
            {isOwner ? (
              <>
                <div
                  className={
                    data.hidden
                      ? styles.btnWishUnvisible
                      : styles.btnWishVisible
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
          </div>
        </div>
      </div>
      <EditWishForm wish={data} ref={editWishRef} handleClose={closeForm} />
      <InfoWishForm wish={data} visible={infoVisible} />
    </form>
  );
};

export default Wish;
