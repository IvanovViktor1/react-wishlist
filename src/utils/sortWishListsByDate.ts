import { TList } from "../services/ListService";

function sortWishsByDate(items: TList[]): TList[] {
  return items.sort((a, b) => {
    const dateA = new Date(a.date_of_creation);
    const dateB = new Date(b.date_of_creation);
    return dateB.getTime() - dateA.getTime(); // Сортировка по убыванию
  });
}

export default sortWishsByDate;
