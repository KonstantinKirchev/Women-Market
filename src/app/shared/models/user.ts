import {Observable} from "rxjs/Rx";

export class User {

    constructor(
        public $key:string,
        public name:string,
        public isAdmin: boolean,
        public email: string,
        public address: string,
        public phone: string,
        public photoURL: string,
        public uid: string) {

    }

    static fromJson({$key, name, isAdmin, email, address, phone, photoURL, uid}) {
        return new User($key, name, isAdmin, email, address, phone, photoURL, uid);
    }

    static fromJsonArray(json : any[]) : User[] {
        return json.map(User.fromJson);
    }
}