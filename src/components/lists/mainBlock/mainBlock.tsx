// import React, { FC, useEffect } from "react";
// import styles from "./mainBlock.module.scss";
// import { myBirthdayWishList } from "../../../Lists";
// import { List } from "antd";
// import ListItems from "../listItems";
// import { useAppDispatch } from "../../../redux/store";
// import { addList, getLists } from "../../../redux/lists/asyncActions";
// import { useSelector } from "react-redux";
// import { listsState } from "../../../redux/lists/selectors";

// export type TListItem = {
//   id: number;
//   title: string;
//   text: string | null;
//   price: string | null;
//   link: string | null;
//   hidden: boolean;
//   id_list: number | null;
// };

// export type TList = {
//   id: number;
//   name: string;
//   description: string | null;
//   items: TListItem[] | null;
//   user_uuid: string;
//   hidden: boolean;
// };

// const MainBlock: FC = () => {
//   const dispatch = useAppDispatch();

//   const lists = useSelector(listsState);
//   useEffect(() => {
//     dispatch(getLists());
//   }, []);

//   const addNewList = () => {
//     dispatch(addList());
//   };

//   return (
//     <div className={styles.mainBlock}>
//       <div className={styles.headMainBlock}>
//         <div className={styles.hBtn} onClick={addNewList}>
//           Создать
//         </div>
//         <div className={styles.hBtn}>Последний измененный</div>
//         <div className={styles.hBtn}>Листы друзей</div>
//       </div>

//       <div className={styles.mainBlock}>
//         {lists && lists.length ? (
//           lists.map((list, index) => <ListItems data={list} key={index} />)
//         ) : (
//           <div className={styles.noSheets}>
//             <div> У Вас еще нет листов</div>{" "}
//             <div className={styles.pAddList} onClick={addNewList}>
//               Хотите создать?
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MainBlock;
import React from "react";

const MainBlock = () => {
  return <div>12</div>;
};

export default MainBlock;
