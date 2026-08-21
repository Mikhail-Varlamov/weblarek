import { TCardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Card } from './Card';
import { IEvents } from '../base/Events';

// Отвечает за карточку товара в списке корзины
export class CardBasket extends Card<TCardBasket> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this.deleteButton.addEventListener('click', () => {
            this.emitCardEvent('cart:remove');
        });
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}
