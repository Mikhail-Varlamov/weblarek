import { ISuccessData } from '../../types';
import { ensureElement, formatPrice } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

// Отвечает за сообщение об успешном оформлении заказа
export class Success extends Component<ISuccessData> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }

    set total(value: number) {
        this.descriptionElement.textContent = `Списано ${formatPrice(value)}`;
    }
}
