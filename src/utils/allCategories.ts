import books from "../images/books.webp";
import automotive from "../images/automotive_products.webp";
import cloth from "../images/cloth.webp";
import computers from "../images/computers.webp";
import creativity from "../images/creativity.webp";
import electronics from "../images/electronics.webp";
import flowers from "../images/flowers.webp";
import food from "../images/food.webp";
import for_home from "../images/for_home.webp";
import health from "../images/health.webp";
import jewerly from "../images/jewelry.webp";
import kids from "../images/kids.webp";
import learning from "../images/learning.webp";
import products_for_animals from "../images/products_for_animals.webp";
import repair_and_construction from "../images/repair_and_construction.webp";
import smartphones from "../images/smartphones.webp";
import sport from "../images/sport.webp";

export type TCategory = {
  id: number;
  name: string;
  icon: string;
};
// export const allCategories: TCategory[] = [
//   { id: 9, name: "Автотовары", icon: automotive },
//   {
//     id: 14,
//     name: "Животные и товары для животных",
//     icon: products_for_animals,
//   },
//   { id: 12, name: "Книги", icon: books },
//   { id: 2, name: "Компьютеры и периферия", icon: computers },
//   { id: 6, name: "Красота и здоровье", icon: health },
//   { id: 5, name: "Одежда и обувь", icon: cloth },
//   { id: 11, name: "Продукты питания", icon: food },
//   { id: 17, name: "Саморазвитие и учеба", icon: learning },
//   { id: 3, name: "Смартфоны и гаджеты", icon: smartphones },
//   { id: 8, name: "Спорт и отдых", icon: sport },
//   { id: 10, name: "Строительство и ремонт", icon: repair_and_construction },
//   { id: 7, name: "Товары для детей", icon: kids },
//   { id: 4, name: "Товары для дома", icon: for_home },
//   { id: 13, name: "Хобби и творчество", icon: creativity },
//   { id: 15, name: "Цветы и подарки", icon: flowers },
//   { id: 1, name: "Электроника и бытовая техника", icon: electronics },
//   { id: 16, name: "Ювелирные изделия и аксессуары", icon: jewerly },
// ];

export const allCategories: TCategory[] = [
  {
    id: 1,
    name: "Электроника и бытовая техника",
    icon: electronics,
  },
  {
    id: 2,
    name: "Компьютеры и периферия",
    icon: computers,
  },
  {
    id: 3,
    name: "Смартфоны и гаджеты",
    icon: smartphones,
  },
  {
    id: 4,
    name: "Товары для дома",
    icon: for_home,
  },
  {
    id: 5,
    name: "Одежда и обувь",
    icon: cloth,
  },
  {
    id: 6,
    name: "Красота и здоровье",
    icon: health,
  },
  {
    id: 7,
    name: "Товары для детей",
    icon: kids,
  },
  {
    id: 8,
    name: "Спорт и отдых",
    icon: sport,
  },
  {
    id: 9,
    name: "Автотовары",
    icon: automotive,
  },
  {
    id: 10,
    name: "Строительство и ремонт",
    icon: repair_and_construction,
  },
  {
    id: 11,
    name: "Продукты питания",
    icon: food,
  },
  {
    id: 12,
    name: "Книги",
    icon: books,
  },
  {
    id: 13,
    name: "Хобби и творчество",
    icon: creativity,
  },
  {
    id: 14,
    name: "Животные и товары для животных",
    icon: products_for_animals,
  },
  {
    id: 15,
    name: "Цветы и подарки",
    icon: flowers,
  },
  {
    id: 16,
    name: "Ювелирные изделия и аксессуары",
    icon: jewerly,
  },
  {
    id: 17,
    name: "Саморазвитие и учеба",
    icon: learning,
  },
];

// export const allCategories = [
//     {
//       "id": 1,
//       "name": "Электроника и бытовая техника",
//       "icon_url": "https://cdn-icons-png.flaticon.com/512/448/448836.png"
//     },
//     {
//       "id": 2,
//       "name": "Компьютеры и периферия",
//       "icon_url": "https://s1.iconbird.com/ico/2013/6/276/w256h2561371381624MyComputer.png"
//     },
//     {
//       "id": 3,
//       "name": "Смартфоны и гаджеты",
//       "icon_url": "https://cdn-icons-png.flaticon.com/512/186/186239.png"
//     },
//     {
//       "id": 4,
//       "name": "Товары для дома",
//       "icon_url": "https://cdn.icon-icons.com/icons2/4054/PNG/512/home_sale_store_basket_stock_house_product_item_icon_258335.png"
//     },
//     {
//       "id": 5,
//       "name": "Одежда и обувь",
//       "icon_url": "https://cdn-icons-png.flaticon.com/512/2331/2331716.png"
//     },
//     {
//       "id": 6,
//       "name": "Красота и здоровье",
//       "icon_url": "https://cdn-icons-png.flaticon.com/512/4144/4144832.png"
//     },
//     {
//       "id": 7,
//       "name": "Товары для детей",
//       "icon_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQ94qt9Te01pVCMDPTNNiYjt6eXMPbIGhZw&s"
//     },
//     {
//       "id": 8,
//       "name": "Спорт и отдых",
//       "icon_url": "https://cdn-icons-png.flaticon.com/512/2271/2271062.png"
//     },
//     {
//       "id": 9,
//       "name": "Автотовары",
//       "icon_url": "https://s1.iconbird.com/ico/0512/iconspackbyCem/w512h5121337871612512.png"
//     },
//     {
//       "id": 10,
//       "name": "Строительство и ремонт",
//       "icon_url": "https://w7.pngwing.com/pngs/56/896/png-transparent-computer-icons-home-construction-building-house-building-angle-building-text.png"
//     },
//     {
//       "id": 11,
//       "name": "Продукты питания",
//       "icon_url": "https://w7.pngwing.com/pngs/978/237/png-transparent-the-crown-market-and-cafe-grocery-store-computer-icons-organic-food-shopping-list-bag-food-food-hand-fruit.png"
//     },
//     {
//       "id": 12,
//       "name": "Книги",
//       "icon_url": "https://oprezi.ru/fl/image.raw?view=image&type=img&id=276"
//     },
//     {
//       "id": 13,
//       "name": "Хобби и творчество",
//       "icon_url": "https://cdn-icons-png.flaticon.com/512/5361/5361551.png"
//     },
//     {
//       "id": 14,
//       "name": "Животные и товары для животных",
//       "icon_url": "https://cdn-icons-png.flaticon.com/512/489/489399.png"
//     },
//     {
//       "id": 15,
//       "name": "Цветы и подарки",
//       "icon_url": "https://cdn.icon-icons.com/icons2/564/PNG/512/Bunch_Flowers_icon-icons.com_54206.png"
//     },
//     {
//       "id": 16,
//       "name": "Ювелирные изделия и аксессуары",
//       "icon_url": "https://cdn-icons-png.flaticon.com/512/5959/5959536.png"
//     },
//     {
//       "id": 17,
//       "name": "Саморазвитие и учеба",
//       "icon_url": "https://cdn-icons-png.flaticon.com/512/393/393586.png"
//     }
//   ]
