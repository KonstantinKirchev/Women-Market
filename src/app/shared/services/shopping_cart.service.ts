import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2";
import { Observable } from "rxjs/Rx";
import { ShoppingCart } from "../models/shoppingCart";
import { Http, Headers } from "@angular/http"
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";
import { firebaseConfig } from "../../../environments/firebase.config";

@Injectable()
export class ShoppingCartService {

    constructor(private db:AngularFireDatabase, private http: Http) {
    }

    findAllShoppingCarts():Observable<ShoppingCart[]> {
        return this.db.list('shopping-carts').map(ShoppingCart.fromJsonArray);
    }

    findShoppingCart(ownerId: string): Observable<ShoppingCart> {
        return this.db.list('shopping-carts', {
            query: {
                orderByChild: 'ownerId',
                equalTo: ownerId
            }
        })
        .filter(results => results && results.length > 0)
        .map(results => ShoppingCart.fromJson(results[0]))
    }

    createShoppingCart(body) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        
        const url = firebaseConfig.databaseURL + '/shopping-carts.json';

        return this.http.post(url, body, { headers: headers })
                .map(res => res.json())
    }

    editShoppingCart(body, key) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        
        const url = firebaseConfig.databaseURL + '/shopping-carts/' + key + '.json';

        return this.http.put(url, body, { headers: headers })
                .map(res => res.json())
    }
}