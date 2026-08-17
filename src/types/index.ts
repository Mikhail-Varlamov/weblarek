export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

/* Способ оплаты заказа. Пустая строка означает, что покупатель ещё не выбрал способ оплаты. */
export type TPayment = 'card' | 'cash' | '';

/* Товар, который продаётся в магазине. Поле price равно null у товаров, которые нельзя купить. */
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

/* Данные покупателя, которые он указывает при оформлении заказа. */
export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

/* Результат проверки данных покупателя. Ключ - название поля, значение - текст ошибки.
Поля, заполненные верно, в объекте отсутствуют. */
export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

/* Ответ сервера на запрос каталога товаров. */
export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

/* Данные заказа, отправляемые на сервер: данные покупателя, сумма заказа
и массив идентификаторов купленных товаров. */
export interface IOrderRequest extends IBuyer {
    total: number;
    items: string[];
}

/* Ответ сервера на оформление заказа: идентификатор заказа и списанная сумма. */
export interface IOrderResponse {
    id: string;
    total: number;
}
