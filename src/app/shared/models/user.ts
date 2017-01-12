import {Observable} from "rxjs/Rx";

export class User {

    constructor(
        public $key:string,
        public name:string,
        public isAdmin: boolean,
        public email: string) {

    }

    static fromJson({$key, name, isAdmin, email}) {
        return new User($key, name, isAdmin, email);
    }

    static fromJsonArray(json : any[]) : User[] {
        return json.map(User.fromJson);
    }
}