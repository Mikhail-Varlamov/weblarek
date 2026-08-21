import { IBasketData } from '../../types';
import { ensureElement, formatPrice } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

// Отвечает за корзину со списком выбранных товаров и их общей стоимостью
export class Basket extends Component<IBasketData> {
    protected listElement: HTMLElement;
    protected orderButton: HTMLButtonElement;
    protected totalElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', container);
        this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', container);
        this.totalElement = ensureElement<HTMLElement>('.basket__price', container);

        this.orderButton.addEventListener('click', () => {
            this.events.emit('order:open');
        });
    }

    set items(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
        this.orderButton.disabled = value.length === 0;
    }

    set total(value: number) {
        this.totalElement.textContent = formatPrice(value);
    }
}
