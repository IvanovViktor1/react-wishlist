import React, { FC, useState, useCallback } from "react";
import styles from "./desc.module.scss";
import { TWish } from "../../../services/WishService";
import { formatDate } from "../../../utils/formatDate";
import { allCategories } from "../../../utils/allCategories";
import CustomLoader from "../../../components/loader/CustomLoader";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Description from "./Description";
import Options from "./Options";
import { TList } from "../../../services/ListService";

interface IWishDescription {
  value: TWish;
  lists: TList[];
  presentationMethod?: "onlyName" | "withDescription";
  reloadWishs: () => void;
}

const WishDescription: FC<IWishDescription> = ({
  value,
  presentationMethod = "withDescription",
  reloadWishs,
  lists,
}) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const handleDescOpen = useCallback(() => {
    setDescriptionOpen(!descriptionOpen);
  }, [value, descriptionOpen]);

  const info = lists.find((l) => l.id === value.id_list);

  return (
    <div className={styles.item}>
      <div className={styles.title}>
        {presentationMethod === "withDescription" ? (
          <DownOutlined
            className={
              descriptionOpen ? styles.arrowUpVisible : styles.arrowDownVisible
            }
            onClick={handleDescOpen}
          />
        ) : null}

        <div className={styles.titleWish} onClick={handleDescOpen}>
          {value.title}
        </div>

        <Options value={value} lists={lists} reloadWishs={reloadWishs} />
        <p className={styles.date_of_creation}>
          создано: {formatDate(value.date_of_creation)}
        </p>
      </div>

      {presentationMethod === "withDescription" ? (
        <Description
          value={value}
          lists={lists}
          descriptionOpen={descriptionOpen}
        />
      ) : null}
    </div>
  );
};

export default WishDescription;
