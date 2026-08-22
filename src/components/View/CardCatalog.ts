import { ICardActions, TCardCatalog } from '../../types';
import { ProductCard } from './ProductCard';

// Отвечает за карточку товара в каталоге на главной странице
export class CardCatalog extends ProductCard<TCardCatalog> {
    constructor(container: HTMLElement, actions: ICardActions) {
        super(container);

        this.container.addEventListener('click', actions.onClick);
    }
}
