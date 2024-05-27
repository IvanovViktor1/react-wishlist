import { FC, useCallback, useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import styles from "./lists.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { TList } from "../../services/ListService";
import { formatDate } from "../../utils/formatDate";
import { TWish, wishApi } from "../../services/WishService";
import { allCategories } from "../../utils/allCategories";
import WishContainer from "./wishContainer";
import { useRefetchWishs } from "../../utils/refetchs";
import CreateNewWish from "./wishContainer/CreateNewWish";
const ListsPage: FC = () => {
  const lists = useAppSelector((state) => state.wishReducer).lists;
  const wishs = useAppSelector((state) => state.wishReducer).wishs;
  const [infoListCard, setInfoListCard] = useState<TList | null>(lists[0]);
  const [infoWishCard, setInfoWishCard] = useState<TWish | null>(wishs[0]);
  const [isEditableWish, setIsEditableWish] = useState(false);
  const [newWishContainerOpen, setNewWishContainerOpen] = useState(false);
  const [removeWish] = wishApi.useRemoveWishMutation();
  const handleList = (list: TList) => {
    setInfoListCard(list);
    setInfoWishCard(null);
  };
  const refetchWishs = useRefetchWishs();

  const handleClickWish = useCallback(
    (wish: TWish) => {
      setNewWishContainerOpen(false);
      setInfoWishCard(wish);
      setIsEditableWish(false);
    },
    [wishs, isEditableWish, lists, newWishContainerOpen]
  );

  const handleEditWish = () => {
    setIsEditableWish(!isEditableWish);
  };
  const handleSaveWish = () => {
    setIsEditableWish(false);
    refetchWishs();
  };

  const handleCreateNewWish = () => {
    setInfoWishCard(null);
    setNewWishContainerOpen(!newWishContainerOpen);
  };
  const handleSaveNewWish = () => {
    setNewWishContainerOpen(false);
    refetchWishs();
  };

  const handleRemoveWish = () => {
    if (infoWishCard) {
      removeWish(infoWishCard.id).then(() => {
        refetchWishs();
      });
    }
  };

  const handleCloseForm = () => {
    setIsEditableWish(false);
    setNewWishContainerOpen(false);
    setInfoWishCard(null);
  };

  const handleCreateList = () => {};
  const handleEditList = () => {};
  const handleRemoveList = () => {};

  useEffect(() => {
    // console.log(wishs);
    if (wishs.length > 0) {
      const findedInex = wishs.findIndex((w) => infoWishCard?.id === w.id);
      setInfoWishCard(wishs[findedInex]);
    } else {
      setInfoWishCard(null);
    }
  }, [wishs]);

  return (
    <Layout>
      <div className={styles.filterContainer}>
        <div
          className={
            infoListCard ? styles.listsOptionsSelected : styles.listsOptions
          }
        >
          <div className={styles.btnCreate} onClick={handleCreateList}>
            создать
          </div>
          <div className={styles.btnEdit} onClick={handleEditList}>
            редактировать
          </div>
          <div className={styles.btnRemove} onClick={handleRemoveList}>
            удалить
          </div>
        </div>

        <div
          className={
            infoWishCard ? styles.wishsOptionsSelected : styles.wishsOptions
          }
        >
          <div
            className={
              newWishContainerOpen ? styles.btnCreateOpen : styles.btnCreate
            }
            onClick={handleCreateNewWish}
          >
            создать
          </div>
          <div
            className={!isEditableWish ? styles.btnEdit : styles.btnStopEdit}
            onClick={handleEditWish}
          >
            редактировать
          </div>
          <div className={styles.btnRemove} onClick={handleRemoveWish}>
            удалить
          </div>
        </div>
      </div>
      <div className={styles.listsBlock}>
        <div className={styles.sheetsList}>
          {lists.map((list, index) => (
            <div
              key={list.id}
              className={
                infoListCard?.id === list.id ? styles.listCurrent : styles.list
              }
              onClick={() => handleList(list)}
            >
              {list.name}
              <span className={styles.date_of_creationList}>
                {formatDate(list.date_of_creation)}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.cardWithDescription}>
          <div className={styles.titleRow}>
            <h2>{infoListCard ? infoListCard.name : ""}</h2>
            <span>
              {infoListCard ? formatDate(infoListCard.date_of_creation) : ""}
            </span>
          </div>
          <span className={styles.descriptionText}>
            {infoListCard ? infoListCard.description : ""}
          </span>

          {wishs.filter((w) => w.id_list === infoListCard?.id).length > 0 ? (
            <>
              <div className={styles.wishs}>
                {wishs
                  .filter((w) => w.id_list === infoListCard?.id)
                  .map((wish) => (
                    <div
                      key={wish.id}
                      className={
                        infoWishCard?.id === wish.id
                          ? styles.wishCurrent
                          : styles.wish
                      }
                      onClick={() => handleClickWish(wish)}
                    >
                      {wish.title}
                    </div>
                  ))}
              </div>
              {!newWishContainerOpen && infoWishCard && (
                <WishContainer
                  wish={infoWishCard}
                  isEditable={isEditableWish}
                  lists={lists}
                  onClose={handleCloseForm}
                  onSave={handleSaveWish}
                />
              )}
            </>
          ) : (
            <div>
              У Вас пока что нет ни одного желания. <span>Хотите создать?</span>
            </div>
          )}
          {infoListCard && newWishContainerOpen && (
            <CreateNewWish
              onSave={handleSaveNewWish}
              id_list={infoListCard.id}
              onClose={handleCloseForm}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ListsPage;
