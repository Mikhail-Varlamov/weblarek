import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

// Хранит товары, выбранные покупателем для покупки
export class Cart {
    protected items: IProduct[] = [];

    constructor(protected events: IEvents) {}

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items = [...this.items, item];
        this.events.emit('cart:changed');
    }

    removeItem(item: IProduct): void {
        this.items = this.items.filter((cartItem) => cartItem.id !== item.id);
        this.events.emit('cart:changed');
    }

    clear(): void {
        this.items = [];
        this.events.emit('cart:changed');
    }

    // Товар без цены считается за ноль
    getTotalPrice(): number {
        return this.items.reduce((total, item) => total + (item.price ?? 0), 0);
    }

    getCount(): number {
        return this.items.length;
    }

    hasItem(id: string): boolean {
        return this.items.some((item) => item.id === id);
    }
}
