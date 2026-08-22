import { ensureElement } from '../../utils/utils';
import { DEFAULT_CATEGORY, categoryMap } from '../../utils/constants';
import { Card } from './Card';

const CATEGORY_CLASS = 'card__category';

// Общий родитель карточек, в разметке которых есть изображение и категория товара
export abstract class ProductCard<T> extends Card<T> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    protected constructor(container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>(`.${CATEGORY_CLASS}`, container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
    }

    set category(value: string) {
        const modifier = categoryMap[value as keyof typeof categoryMap] ?? categoryMap[DEFAULT_CATEGORY];

        this.categoryElement.textContent = value;
        this.categoryElement.className = `${CATEGORY_CLASS} ${modifier}`;
    }

    set image(value: string) {
        this.setImage(this.imageElement, value);
    }
}
