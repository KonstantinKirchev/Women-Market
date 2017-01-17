import {Observable} from "rxjs/Rx";

export class ShoppingCart {

    constructor(
        public $key: string,
        public ownerId: string,
        public products: Object[],
        public totalPrice: number,
        public dateOfOrder: Date,
        public isComplete: boolean) {

    }

    static fromJson({$key, ownerId, products, totalPrice, dateOfOrder, isComplete}) {
        return new ShoppingCart($key, ownerId, products, totalPrice, dateOfOrder, isComplete);
    }

    static fromJsonArray(json : any[]) : ShoppingCart[] {
        return json.map(ShoppingCart.fromJson);
    }
}