export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);

  // Форматируем часы и минуты
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Форматируем день, месяц и год
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth возвращает месяц от 0 до 11
  const year = date.getFullYear().toString().slice(2); // Получаем последние две цифры года

  // Конкатенируем все в нужный формат
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
