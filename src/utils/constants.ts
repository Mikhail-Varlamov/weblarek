/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

/* Название валюты магазина и подпись цены товаров, которые не продаются. */
export const CURRENCY_NAME = 'синапсов';
export const PRICELESS_LABEL = 'Бесценно';

/* Категория, модификатор которой используется для товаров с неизвестной категорией. */
export const DEFAULT_CATEGORY = 'другое';

/* Подписи кнопки в подробной карточке товара. */
export const cardButtonLabels = {
  buy: 'Купить',
  remove: 'Удалить из корзины',
  unavailable: 'Недоступно',
};

export const settings = {

};

