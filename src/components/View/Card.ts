import { ensureElement, formatPrice } from '../../utils/utils';
import { Component } from '../base/Component';

// Общий родитель карточек товара, отвечает за разметку, которая есть во всех шаблонах карточек
export abstract class Card<T> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        this.priceElement.textContent = formatPrice(value);
    }
}
