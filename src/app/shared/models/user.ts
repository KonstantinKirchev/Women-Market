import {Observable} from "rxjs/Rx";

export class User {

    constructor(
        public $key:string,
        public name:string) {

    }

    static fromJson({$key, name}) {
        return new User($key, name);
    }

    static fromJsonArray(json : any[]) : User[] {
        return json.map(User.fromJson);
    }
}