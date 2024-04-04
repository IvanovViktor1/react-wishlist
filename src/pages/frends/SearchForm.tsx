import React, { FC, useEffect } from "react";
import { TUser, sessionApi } from "../../services/SessionService";
import { useForm } from "react-hook-form";
import styles from "./frends.module.scss";

interface ISearchForm {
  users: TUser[];
  onSearch: (results: TUser | null) => void;
  onClear: () => void;
}

interface ISearchUsers {
  email: string;
}

const SearchForm: FC<ISearchForm> = ({ users, onSearch, onClear }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchUsers>();

  const { data: emails } = sessionApi.useGetUserEmailsQuery();
  const onSubmit = handleSubmit(({ email }) => {
    // const searchResult = users.filter(
    //   (user) =>
    //     user.email.toLowerCase().includes(search.toLowerCase())
    // );
    const searchResult = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (email === "" || searchResult === undefined) {
      onClear();
    } else if (searchResult && searchResult.name) {
      onSearch(searchResult);
    }
  });

  return (
    <form onChange={onSubmit} className={styles.searchFrends}>
      <div className={styles.searchIcon}>Поиск</div>
      <input
        type="search"
        className={styles.search}
        placeholder="Поиск по email.."
        {...register("email", {
          pattern: {
            value:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: "Пожалуйста введите корректный Email",
          },
          validate: (value) =>
            emails?.includes(value) ||
            value === "" ||
            "Пользователь с таким email не зарегистрирован",
        })}
      />
      {errors ? <p className={styles.error}>{errors.email?.message}</p> : null}
    </form>
  );
};

export default SearchForm;
