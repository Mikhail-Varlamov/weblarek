import { IBuyer, TBuyerErrors, TPayment } from '../../types';
import { IEvents } from '../base/Events';

const ERROR_MESSAGES = {
    payment: 'Не выбран вид оплаты',
    address: 'Укажите адрес доставки',
    email: 'Укажите емэйл',
    phone: 'Укажите телефон',
};

// Хранит данные покупателя и проверяет их заполненность
export class Buyer {
    protected payment: TPayment = '';
    protected address = '';
    protected email = '';
    protected phone = '';

    constructor(protected events: IEvents) {}

    // Записывает только переданные поля, остальные сохраняют свои значения
    setData(data: Partial<IBuyer>): void {
        const { payment, address, email, phone } = { ...this.getData(), ...data };

        this.payment = payment;
        this.address = address;
        this.email = email;
        this.phone = phone;

        this.events.emit('buyer:changed');
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone,
        };
    }

    clear(): void {
        this.payment = '';
        this.address = '';
        this.email = '';
        this.phone = '';

        this.events.emit('buyer:changed');
    }

    // Верно заполненные поля в объект ошибок не попадают
    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};

        if (!this.payment) {
            errors.payment = ERROR_MESSAGES.payment;
        }
        if (!this.address.trim()) {
            errors.address = ERROR_MESSAGES.address;
        }
        if (!this.email.trim()) {
            errors.email = ERROR_MESSAGES.email;
        }
        if (!this.phone.trim()) {
            errors.phone = ERROR_MESSAGES.phone;
        }

        return errors;
    }
}
