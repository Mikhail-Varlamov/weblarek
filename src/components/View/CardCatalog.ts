import { TCardCatalog } from '../../types';
import { IEvents } from '../base/Events';
import { ProductCard } from './ProductCard';

// Отвечает за карточку товара в каталоге на главной странице
export class CardCatalog extends ProductCard<TCardCatalog> {
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this.container.addEventListener('click', () => {
            this.emitCardEvent('card:select');
        });
    }
}
