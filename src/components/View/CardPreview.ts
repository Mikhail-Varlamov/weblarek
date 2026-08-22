import { TCardPreview } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { ProductCard } from './ProductCard';

// Отвечает за подробную карточку товара, которая открывается в модальном окне
export class CardPreview extends ProductCard<TCardPreview> {
    protected descriptionElement: HTMLElement;
    protected buyButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
        this.buyButton = ensureElement<HTMLButtonElement>('.card__button', container);

        this.buyButton.addEventListener('click', () => {
            this.events.emit('preview:toggle');
        });
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set buttonLabel(value: string) {
        this.buyButton.textContent = value;
    }

    set buttonDisabled(value: boolean) {
        this.buyButton.disabled = value;
    }
}
