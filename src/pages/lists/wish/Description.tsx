import { FC, memo } from "react";
import styles from "./desc.module.scss";
import { TWish } from "../../../services/WishService";
import { TList } from "../../../services/ListService";
import DescriptionTextForm from "./descriptionTextForm";

interface IDescription {
  descriptionOpen: boolean;
  value: TWish;
  lists: TList[];
}
const Description: FC<IDescription> = memo(
  ({ descriptionOpen, value, lists }) => {
    return (
      <div
        className={
          descriptionOpen
            ? styles.itemDescriptionOpen
            : styles.itemDescriptionClose
        }
      >
        <DescriptionTextForm wish={value} lists={lists} />
      </div>
    );
  }
);

export default Description;
