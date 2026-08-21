import { ICardEvent } from '../../types';
import { ensureElement, formatPrice } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

// Общий родитель карточек товара, отвечает за разметку, которая есть во всех шаблонах карточек
export abstract class Card<T> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    protected constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        this.priceElement.textContent = formatPrice(value);
    }

    // Сообщает о действии пользователя с товаром, разметку которого отображает карточка
    protected emitCardEvent(eventName: string): void {
        this.events.emit<ICardEvent>(eventName, { id: this.container.dataset.id ?? '' });
    }
}
