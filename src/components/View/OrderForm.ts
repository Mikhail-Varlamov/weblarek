import { TOrderForm, TPayment } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Form } from './Form';

const PAYMENT_ACTIVE_CLASS = 'button_alt-active';

// Отвечает за первую форму оформления заказа: способ оплаты и адрес доставки
export class OrderForm extends Form<TOrderForm> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', container);
        this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', container);

        this.cardButton.addEventListener('click', () => {
            this.emitChange({ payment: 'card' });
        });
        this.cashButton.addEventListener('click', () => {
            this.emitChange({ payment: 'cash' });
        });
        this.addressInput.addEventListener('input', () => {
            this.emitChange({ address: this.addressInput.value });
        });
    }

    set payment(value: TPayment) {
        this.cardButton.classList.toggle(PAYMENT_ACTIVE_CLASS, value === 'card');
        this.cashButton.classList.toggle(PAYMENT_ACTIVE_CLASS, value === 'cash');
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}
