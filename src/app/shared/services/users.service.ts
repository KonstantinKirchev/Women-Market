import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2";
import {Observable} from "rxjs/Rx";
import {User} from "../models/user";
import { Http, Headers } from "@angular/http"
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";
import {firebaseConfig} from "../../../environments/firebase.config";

@Injectable()
export class UsersService {

    constructor(private db:AngularFireDatabase, private http: Http) {
    }

    findAllUsers():Observable<User[]> {
        return this.db.list('users').map(User.fromJsonArray);
    }

    addUser(body) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        
        const url = firebaseConfig.databaseURL + '/users.json';

        return this.http.post(url, body, { headers: headers })
                .map(res => res.json())
    }

    findUserById(uid:string):Observable<User> {
        return this.db.list('users', {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        })
        .filter(results => results && results.length > 0)
        .map(results => User.fromJson(results[0]))
    }

    editUser(body, uid) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        
        const url = firebaseConfig.databaseURL + '/users/' + uid + '.json';

        return this.http.put(url, body, { headers: headers })
                .map(res => res.json())
    }
}