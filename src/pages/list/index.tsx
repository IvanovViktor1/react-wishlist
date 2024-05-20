import React, { FC, useState, ChangeEvent } from "react";
import { Layout } from "../../components/layout";
import { text } from "stream/consumers";
import { Input } from "antd";
import styles from "./list.module.scss";

type WhishsType = {
  id: number;
  text: string;
};

const List: FC = () => {
  const [items, setItems] = useState<WhishsType[] | null>(null);

  const handleAddItem = () => {
    if (items === null) {
      setItems([{ id: 1, text: "Новое желание" }]);
    }
    if (items && items.length) {
      setItems([...items, { id: items.length, text: "Новое желание" }]);
    }
  };

  return (
    <Layout>
      <div onClick={handleAddItem}>Добавить</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Желания</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.length &&
            items.map((item, index) => (
              <tr>
                <td>
                  <p>{item.id}</p>
                </td>
                <td key={index}>
                  <Input
                    value={item.text}
                    onChange={(e) => {
                      item.text = e.target.value;
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default List;
