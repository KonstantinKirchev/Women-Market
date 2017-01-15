import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2";
import { Observable } from "rxjs/Rx";
import { Store } from "../models/store";
import { Http, Headers } from "@angular/http"
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";
import { firebaseConfig } from "../../../environments/firebase.config";

@Injectable()
export class StoresService {

    constructor(private db:AngularFireDatabase, private http: Http) {
    }

    findAllStores():Observable<Store[]> {
        return this.db.list('stores').map(Store.fromJsonArray);
    }

    addStore(body) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        
        const url = firebaseConfig.databaseURL + '/stores.json';

        return this.http.post(url, body, { headers: headers })
                .map(res => res.json())
    }

    // editStore(body, uid) {
    //     let headers = new Headers()
    //     headers.append('Content-Type', 'application/json')
        
    //     const url = firebaseConfig.databaseURL + '/stores/' + uid + '.json';

    //     return this.http.put(url, body, { headers: headers })
    //             .map(res => res.json())
    // }
}