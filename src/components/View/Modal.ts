import { IModalData } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

const ACTIVE_CLASS = 'modal_active';

// Отвечает за модальное окно и показывает в нём разметку других компонентов
export class Modal extends Component<IModalData> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        });
        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.events.emit('modal:close');
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add(ACTIVE_CLASS);
    }

    close(): void {
        this.container.classList.remove(ACTIVE_CLASS);
    }
}
