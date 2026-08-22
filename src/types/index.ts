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

/* Обработчики действий пользователя, которые карточка товара получает в конструкторе. */
export interface ICardActions {
    onClick: () => void;
}

/* Данные, которые отображает шапка страницы. */
export interface IHeaderData {
    counter: number;
}

/* Данные, которые отображает каталог товаров на главной странице. */
export interface IGalleryData {
    catalog: HTMLElement[];
}

/* Данные, которые отображает модальное окно. */
export interface IModalData {
    content: HTMLElement;
}

/* Данные товара, которые отображают все три вида карточек. */
export type TCardBase = Pick<IProduct, 'title' | 'price'>;

/* Данные карточки товара в каталоге. */
export type TCardCatalog = TCardBase & Pick<IProduct, 'category' | 'image'>;

/* Данные подробной карточки товара. Подпись и доступность кнопки готовит презентер,
потому что они зависят от содержимого корзины. */
export type TCardPreview = TCardCatalog & Pick<IProduct, 'description'> & {
    buttonLabel: string;
    buttonDisabled: boolean;
};

/* Данные карточки товара в корзине, index - порядковый номер товара в списке. */
export type TCardBasket = TCardBase & {
    index: number;
};

/* Данные, которые отображает корзина. Поле valid отвечает за доступность кнопки оформления. */
export interface IBasketData {
    items: HTMLElement[];
    total: number;
    valid: boolean;
}

/* Состояние формы: доступность кнопки отправки и текст сообщения об ошибках. */
export interface IFormState {
    valid: boolean;
    errors: string;
}

/* Данные формы с выбором способа оплаты и адресом доставки. */
export type TOrderForm = IFormState & Pick<IBuyer, 'payment' | 'address'>;

/* Данные формы с контактами покупателя. */
export type TContactsForm = IFormState & Pick<IBuyer, 'email' | 'phone'>;

/* Данные, которые отображает сообщение об успешном оформлении заказа. */
export interface ISuccessData {
    total: number;
}
