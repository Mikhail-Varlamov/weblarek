import { IBuyer, IFormState } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

// Общий родитель форм оформления заказа. Названия событий формы строятся из её атрибута name,
// поэтому формы order и contacts сообщают о действиях пользователя разными событиями
export abstract class Form<T extends IFormState> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;
    protected formName: string;

    protected constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.formName = container.name;
        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);

        container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit(`${this.formName}:submit`);
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }

    // Сообщает о том, что покупатель изменил данные в полях формы
    protected emitChange(data: Partial<IBuyer>): void {
        this.events.emit<Partial<IBuyer>>(`${this.formName}:change`, data);
    }
}
