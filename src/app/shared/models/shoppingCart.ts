import { Observable } from "rxjs/Rx";
import { Product } from "app/shared/models/product";

export class ShoppingCart {

    constructor(
        public $key: string,
        public ownerId: string,
        public products: Product[],
        public totalPrice: number,
        public dateOfOrder: Date,
        public dateOfDelivery: Date,
        public status: string) {

    }

    static fromJson({$key, ownerId, products, totalPrice, dateOfOrder, dateOfDelivery, status}) {
        return new ShoppingCart($key, ownerId, products, totalPrice, dateOfOrder, dateOfDelivery, status);
    }

    static fromJsonArray(json : any[]) : ShoppingCart[] {
        return json.map(ShoppingCart.fromJson);
    }
}