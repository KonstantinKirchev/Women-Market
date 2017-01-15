import {Observable} from "rxjs/Rx";

export class Store {

    constructor(
        public $key: string,
        public name: string,
        public picture: string,
        public email: string,
        public address: string,
        public phone: string,
        public description: string) {

    }

    static fromJson({$key, name, picture, email, address, phone, description}) {
        return new Store($key, name, picture, email, address, phone, description);
    }

    static fromJsonArray(json : any[]) : Store[] {
        return json.map(Store.fromJson);
    }
}