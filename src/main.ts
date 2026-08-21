import './scss/styles.scss';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { ShopApi } from './components/Communication/ShopApi';
import { Buyer } from './components/Models/Buyer';
import { Cart } from './components/Models/Cart';
import { Catalog } from './components/Models/Catalog';
import { Basket } from './components/View/Basket';
import { CardBasket } from './components/View/CardBasket';
import { CardCatalog } from './components/View/CardCatalog';
import { CardPreview } from './components/View/CardPreview';
import { ContactsForm } from './components/View/ContactsForm';
import { Gallery } from './components/View/Gallery';
import { Header } from './components/View/Header';
import { Modal } from './components/View/Modal';
import { OrderForm } from './components/View/OrderForm';
import { Success } from './components/View/Success';
import { IBuyer, ICardEvent, IOrderRequest, IProduct, TBuyerErrors } from './types';
import { API_URL, cardButtonLabels } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const CARD_CATALOG_TEMPLATE = '#card-catalog';
const CARD_PREVIEW_TEMPLATE = '#card-preview';
const CARD_BASKET_TEMPLATE = '#card-basket';
const BASKET_TEMPLATE = '#basket';
const ORDER_TEMPLATE = '#order';
const CONTACTS_TEMPLATE = '#contacts';
const SUCCESS_TEMPLATE = '#success';

const ERRORS_SEPARATOR = '; ';

const events = new EventEmitter();

const catalog = new Catalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);
const shopApi = new ShopApi(new Api(API_URL));

const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(BASKET_TEMPLATE), events);
const orderForm = new OrderForm(cloneTemplate<HTMLFormElement>(ORDER_TEMPLATE), events);
const contactsForm = new ContactsForm(cloneTemplate<HTMLFormElement>(CONTACTS_TEMPLATE), events);
const success = new Success(cloneTemplate(SUCCESS_TEMPLATE), events);

// Собирает из ошибок покупателя текст, который выводится под кнопкой формы
function joinErrors(errors: TBuyerErrors, fields: (keyof IBuyer)[]): string {
    return fields
        .map((field) => errors[field])
        .filter((message) => Boolean(message))
        .join(ERRORS_SEPARATOR);
}

// Готовит подпись кнопки подробной карточки товара
function getButtonLabel(item: IProduct): string {
    if (item.price === null) {
        return cardButtonLabels.unavailable;
    }
    return cart.hasItem(item.id) ? cardButtonLabels.remove : cardButtonLabels.buy;
}

// Отдаёт разметку корзины с актуальным списком товаров
function renderBasket(): HTMLElement {
    const items = cart.getItems().map((item, position) => {
        const card = new CardBasket(cloneTemplate(CARD_BASKET_TEMPLATE), events);

        return card.render({
            id: item.id,
            index: position + 1,
            title: item.title,
            price: item.price,
        });
    });

    return basket.render({ items, total: cart.getTotalPrice() });
}

events.on('catalog:changed', () => {
    const cards = catalog.getItems().map((item) => {
        const card = new CardCatalog(cloneTemplate(CARD_CATALOG_TEMPLATE), events);

        return card.render({
            id: item.id,
            title: item.title,
            category: item.category,
            image: item.image,
            price: item.price,
        });
    });

    gallery.render({ catalog: cards });
});

events.on('catalog:selected', () => {
    const item = catalog.getSelectedItem();

    if (!item) {
        return;
    }

    const card = new CardPreview(cloneTemplate(CARD_PREVIEW_TEMPLATE), events);
    const content = card.render({
        id: item.id,
        title: item.title,
        category: item.category,
        image: item.image,
        price: item.price,
        description: item.description,
        buttonLabel: getButtonLabel(item),
        buttonDisabled: item.price === null,
    });

    modal.render({ content });
    modal.open();
});

events.on('cart:changed', () => {
    header.render({ counter: cart.getCount() });
    renderBasket();
});

events.on('buyer:changed', () => {
    const errors = buyer.validate();

    orderForm.render({
        payment: buyer.getData().payment,
        valid: !errors.payment && !errors.address,
        errors: joinErrors(errors, ['payment', 'address']),
    });
    contactsForm.render({
        valid: !errors.email && !errors.phone,
        errors: joinErrors(errors, ['email', 'phone']),
    });
});

events.on<ICardEvent>('card:select', ({ id }) => {
    const item = catalog.getItemById(id);

    if (item) {
        catalog.setSelectedItem(item);
    }
});

events.on<ICardEvent>('card:buy', ({ id }) => {
    const item = catalog.getItemById(id);

    if (!item) {
        return;
    }

    if (cart.hasItem(id)) {
        cart.removeItem(item);
    } else {
        cart.addItem(item);
    }

    modal.close();
});

events.on<ICardEvent>('cart:remove', ({ id }) => {
    const item = catalog.getItemById(id);

    if (item) {
        cart.removeItem(item);
    }
});

events.on('basket:open', () => {
    modal.render({ content: renderBasket() });
    modal.open();
});

events.on('order:open', () => {
    const { payment, address } = buyer.getData();
    const errors = buyer.validate();

    const content = orderForm.render({
        payment,
        address,
        valid: !errors.payment && !errors.address,
        errors: joinErrors(errors, ['payment', 'address']),
    });

    modal.render({ content });
    modal.open();
});

events.on<Partial<IBuyer>>('order:change', (data) => {
    buyer.setData(data);
});

events.on('order:submit', () => {
    const { email, phone } = buyer.getData();
    const errors = buyer.validate();

    const content = contactsForm.render({
        email,
        phone,
        valid: !errors.email && !errors.phone,
        errors: joinErrors(errors, ['email', 'phone']),
    });

    modal.render({ content });
    modal.open();
});

events.on<Partial<IBuyer>>('contacts:change', (data) => {
    buyer.setData(data);
});

events.on('contacts:submit', () => {
    const order: IOrderRequest = {
        ...buyer.getData(),
        total: cart.getTotalPrice(),
        items: cart.getItems().map((item) => item.id),
    };

    shopApi
        .createOrder(order)
        .then((result) => {
            cart.clear();
            buyer.clear();

            modal.render({ content: success.render({ total: result.total }) });
            modal.open();
        })
        .catch((error) => {
            console.error('Не удалось оформить заказ:', error);
        });
});

events.on('success:close', () => {
    modal.close();
});

events.on('modal:close', () => {
    modal.close();
});

shopApi
    .getProducts()
    .then((data) => {
        catalog.setItems(data.items);
    })
    .catch((error) => {
        console.error('Не удалось получить товары с сервера:', error);
    });
