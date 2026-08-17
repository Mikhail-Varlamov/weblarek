import { IProduct } from '../../types';

// Хранит товары, выбранные покупателем для покупки
export class Cart {
    protected items: IProduct[] = [];

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items = [...this.items, item];
    }

    removeItem(item: IProduct): void {
        this.items = this.items.filter((cartItem) => cartItem.id !== item.id);
    }

    clear(): void {
        this.items = [];
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
