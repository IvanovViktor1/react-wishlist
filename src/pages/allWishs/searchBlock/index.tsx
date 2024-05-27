import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
} from "react";
import styles from "./searchBlock.module.scss";
import { CloseOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { TWish } from "../../../services/WishService";
import Switch from "../../../components/customNewSwitch";
import { TList } from "../../../services/ListService";
import SelectLists from "./selectLists";
import SelectCategories from "./selectCategory";
import SelectSort from "./selectSort";

interface ISearchBlock {
  wishs: TWish[];
  lists: TList[];
  checked: boolean;
  onResults: (res: TWish[]) => void;
  onChecked: () => void;
  onAddWish: () => void;
}

const SearchBlock: FC<ISearchBlock> = memo(
  ({ wishs, lists, onResults, onChecked, checked, onAddWish }) => {
    const [dataListOpen, setDataListOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataListOpen(true);
        setSearchTerm(event.target.value);
      },
      []
    );

    useEffect(() => {
      onResults(wishs);
    }, [wishs]);

    const filteredResults = useMemo(
      () =>
        wishs.filter((wish) =>
          wish.title
            .trim()
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        ),
      [wishs, searchTerm]
    );

    const handleSubmit = useCallback(() => {
      onResults(filteredResults);
    }, [filteredResults, onResults]);

    const handleSearchClear = useCallback(() => {
      setSearchTerm("");
      onResults(wishs);
      setDataListOpen(false);
    }, [wishs, onResults]);

    const handleChangeLists = (lists: TList[]) => {
      console.log(lists);
    };

    return (
      <div className={styles.blockContainer}>
        <div className={styles.rowContainer}>
          <div className={styles.optionBtns}>
            <SelectSort />
            <SelectLists data={lists} onChange={handleChangeLists} />
            <SelectCategories />
          </div>
          <div className={styles.searchBlock}>
            Поиск:
            <div className={styles.searchWindow}>
              <div className={styles.inputElement}>
                <input
                  type="text"
                  value={searchTerm}
                  className={styles.searchInput}
                  onChange={handleInputChange}
                  onBlur={() => {
                    if (searchTerm.trim() === "") {
                      setDataListOpen(false);
                    }
                  }}
                />
                <div
                  className={
                    filteredResults.length !== 0 && dataListOpen
                      ? styles.dataListOpen
                      : styles.dataListClose
                  }
                >
                  {filteredResults.map((wish) => (
                    <p
                      key={wish.id}
                      onClick={() => {
                        setSearchTerm(wish.title);
                        setDataListOpen(false);
                      }}
                      className={styles.item}
                    >
                      {wish.title}
                    </p>
                  ))}
                </div>
              </div>
              <CloseOutlined
                className={styles.btnClear}
                onClick={handleSearchClear}
              />
            </div>
            <SearchOutlined
              className={styles.btnSearch}
              onClick={handleSubmit}
            />
          </div>
        </div>
        <div className={styles.optionsUnderRow}>
          <PlusOutlined className={styles.btnAddWish} onClick={onAddWish} />

          <div className={styles.btnSwitchDetails}>
            <Switch checked={checked} onChange={onChecked} text="описание" />
          </div>
        </div>
      </div>
    );
  }
);

export default SearchBlock;
