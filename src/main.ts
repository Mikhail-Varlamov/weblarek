import './scss/styles.scss';
import { Api } from './components/base/Api';
import { ShopApi } from './components/Communication/ShopApi';
import { Buyer } from './components/Models/Buyer';
import { Cart } from './components/Models/Cart';
import { Catalog } from './components/Models/Catalog';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const catalog = new Catalog();
const cart = new Cart();
const buyer = new Buyer();
const shopApi = new ShopApi(new Api(API_URL));

// Проверка модели каталога товаров
catalog.setItems(apiProducts.items);
console.log('Каталог. Массив товаров после сохранения:', catalog.getItems());

const [firstProduct, secondProduct] = catalog.getItems();

console.log('Каталог. Товар по существующему id:', catalog.getItemById(firstProduct.id));
console.log('Каталог. Товар по несуществующему id:', catalog.getItemById('unknown-id'));

catalog.setSelectedItem(firstProduct);
console.log('Каталог. Товар, выбранный для просмотра:', catalog.getSelectedItem());

// Проверка модели корзины
cart.addItem(firstProduct);
cart.addItem(secondProduct);
console.log('Корзина. Товары после добавления двух товаров:', cart.getItems());
console.log('Корзина. Количество товаров:', cart.getCount());
console.log('Корзина. Стоимость товаров:', cart.getTotalPrice());
console.log('Корзина. Первый товар лежит в корзине:', cart.hasItem(firstProduct.id));

cart.removeItem(firstProduct);
console.log('Корзина. Товары после удаления первого товара:', cart.getItems());
console.log('Корзина. Удалённый товар лежит в корзине:', cart.hasItem(firstProduct.id));
console.log('Корзина. Количество и стоимость после удаления:', cart.getCount(), cart.getTotalPrice());

cart.clear();
console.log('Корзина. Товары после очистки:', cart.getItems());
console.log('Корзина. Количество и стоимость после очистки:', cart.getCount(), cart.getTotalPrice());

// Проверка модели покупателя
console.log('Покупатель. Ошибки при пустых данных:', buyer.validate());

buyer.setData({ payment: 'card', address: 'Москва, ул. Пушкина, д. 1' });
console.log('Покупатель. Данные после сохранения оплаты и адреса:', buyer.getData());

buyer.setData({ email: 'test@yandex.ru' });
console.log('Покупатель. Данные после сохранения только почты:', buyer.getData());
console.log('Покупатель. Ошибки, когда не заполнен телефон:', buyer.validate());

buyer.setData({ phone: '+7 900 000-00-00' });
console.log('Покупатель. Все данные заполнены:', buyer.getData());
console.log('Покупатель. Ошибки при заполненных данных:', buyer.validate());

buyer.clear();
console.log('Покупатель. Данные после очистки:', buyer.getData());
console.log('Покупатель. Ошибки после очистки:', buyer.validate());

// Получение каталога товаров с сервера
shopApi
    .getProducts()
    .then((data) => {
        catalog.setItems(data.items);
        console.log('Каталог. Товары, полученные с сервера:', catalog.getItems());
    })
    .catch((error) => {
        console.error('Не удалось получить товары с сервера:', error);
    });
