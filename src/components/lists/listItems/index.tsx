// import React, { FC, useState, useRef, useEffect } from "react";
// import styles from "./listItems.module.scss";
// // import { TList } from "../mainBlock/mainBlock";
// import ListItem from "./ListItem";
// import {
//   CaretDownOutlined,
//   CaretUpOutlined,
//   DeleteOutlined,
//   EditOutlined,
//   PlusCircleTwoTone,
//   PlusOutlined,
//   SettingOutlined,
//   setTwoToneColor,
// } from "@ant-design/icons";
// import { TList } from "../../../redux/lists/types";
// import { SettingsList } from "../settingsList";
// import { useAppDispatch } from "../../../redux/store";
// import { addWish, getWishs } from "../../../redux/wish/asyncActions";
// import { useSelector } from "react-redux";
// import { getWishsById, wishState } from "../../../redux/wish/selectors";
// import { getLists } from "../../../redux/lists/asyncActions";
// import { Status } from "../../../redux/types";
// import Loader from "../../loader";
// import { TWish } from "../../../redux/wish/types";

// interface IListItems {
//   data: TList;
// }

// const ListItems: FC<IListItems> = ({ data }) => {
//   const { id: id_list, name, description, user_uuid, hidden } = data;
//   setTwoToneColor("green");
//   const status = useSelector(wishState).status;
//   const [open, setOpen] = useState(false);
//   const settingsRef = useRef<HTMLDivElement>(null);
//   const dispatch = useAppDispatch();
//   const wishs = useSelector(getWishsById(id_list)) as TWish[];

//   const handleOpenSettings = () => {
//     // setOpenSettings(true);
//     if (settingsRef.current) {
//       settingsRef.current.style.visibility = "visible";
//     }
//   };

//   const handleCloseSettings = () => {
//     if (settingsRef.current) {
//       settingsRef.current.style.visibility = "hidden";
//     }
//   };

//   const handleAddWish = () => {
//     dispatch(addWish(id_list));
//   };

//   const openWishList = () => {
//     setOpen(true);
//   };

//   useEffect(() => {
//     dispatch(getWishs());
//   }, []);

//   return (
//     <div className={styles.list}>
//       <div className={styles.options}>
//         <div className={styles.btnAddWish}>
//           <PlusCircleTwoTone
//             className={styles.btnAddWish}
//             onClick={handleAddWish}
//           />
//         </div>

//         <div>
//           <SettingOutlined
//             className={styles.btnSettings}
//             onClick={handleOpenSettings}
//           />
//           <DeleteOutlined className={styles.btnDelete} />
//         </div>
//       </div>

//       {!open ? (
//         <div className={styles.hList}>
//           <div>{name}</div>
//           <div>{description}</div>
//         </div>
//       ) : (
//         <div className={styles.bList}>
//           <div className={styles.hList}>
//             <div>{name}</div>
//             <div>{description}</div>
//           </div>
//           {wishs && wishs.length > 0
//             ? wishs.map((wish, index) => <ListItem data={wish} key={index} />)
//             : "ничего не добавлено"}
//         </div>
//       )}
//       {!open ? (
//         <CaretDownOutlined onClick={openWishList} />
//       ) : (
//         <CaretUpOutlined onClick={() => setOpen(false)} />
//       )}

//       <SettingsList
//         data={data}
//         ref={settingsRef}
//         handleClose={handleCloseSettings}
//       />
//     </div>
//   );
// };

// export default ListItems;

import React from "react";

const ListItems = () => {
  return <div>32</div>;
};

export default ListItems;
