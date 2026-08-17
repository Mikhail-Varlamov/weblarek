import { IApi, IOrderRequest, IOrderResponse, IProductsResponse } from '../../types';

const PRODUCTS_ENDPOINT = '/product/';
const ORDER_ENDPOINT = '/order/';

// Обменивается данными с сервером магазина через объект с интерфейсом IApi
export class ShopApi {
    protected api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>(PRODUCTS_ENDPOINT);
    }

    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>(ORDER_ENDPOINT, order);
    }
}
