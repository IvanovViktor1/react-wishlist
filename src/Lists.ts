import { TList, TListItem } from "./components/lists/mainBlock/mainBlock";

export const listItemsOne: TListItem[] = [
  {
    id: 1,
    title: "Мяч",
    text: "Мечтаю о мяче с автографом футболиста",
    price: "возможно дорого обойдется",
    link: null,
    hidden: false,
    id_list: 1,
  },
  {
    id: 2,
    title: "Яндекс Станция",
    text: "Коплю на ЯСтанцию",
    price: "осталось 11 т.р.",
    link: "ссылка на станцию",
    hidden: false,
    id_list: 1,
  },
  {
    id: 3,
    title: "Щенок алабая",
    text: "Планирую взять щенка",
    price: "70 000 р.",
    link: null,
    hidden: false,
    id_list: 1,
  },
  {
    id: 4,
    title: "Телефон",
    text: "Хочу айфон 19 на др",
    price: "хз сколько стоит",
    link: null,
    hidden: false,
    id_list: 1,
  },
];

export const listItemsTwo: TListItem[] = [
  {
    id: 1,
    title: "Мяч",
    text: "Мечтаю о мяче с автографом футболиста",
    price: "возможно дорого обойдется",
    link: null,
    hidden: false,
    id_list: 1,
  },
  {
    id: 2,
    title: "Яндекс Станция",
    text: "Коплю на ЯСтанцию",
    price: "осталось 11 т.р.",
    link: "ссылка на станцию",
    hidden: false,
    id_list: 1,
  },
  {
    id: 3,
    title: "Щенок алабая",
    text: "Планирую взять щенка",
    price: "70 000 р.",
    link: null,
    hidden: false,
    id_list: 1,
  },
  {
    id: 4,
    title: "Телефон",
    text: "Хочу айфон 19 на др",
    price: "хз сколько стоит",
    link: null,
    hidden: false,
    id_list: 1,
  },
];

export const myBirthdayWishList: TList[] = [
  {
    id: 1,
    name: "На день рождение",
    description: "По возможности...",
    items: listItemsOne,
    user_uuid: "123123",
    hidden: false,
  },
  {
    id: 2,
    name: "В течении года",
    description: "По возможности...",
    items: listItemsTwo,
    user_uuid: "123123",
    hidden: false,
  },
];
