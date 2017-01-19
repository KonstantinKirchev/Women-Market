import {Observable} from "rxjs/Rx";

export class Product {

    constructor(
        public $key: string,
        public name: string,
        public picture: string,
        public price: number,
        public quantity: string,
        public units: number,
        public description: string,
        public store: string,
        public category: string) {

    }

    static fromJson({$key, name, picture, price, quantity, units, description, store, category}) {
        return new Product($key, name, picture, price, quantity, units, description, store, category);
    }

    static fromJsonArray(json : any[]) : Product[] {
        return json.map(Product.fromJson);
    }
}