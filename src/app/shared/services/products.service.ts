import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2";
import { Observable } from "rxjs/Rx";
import { Product } from "../models/product";
import { Http, Headers } from "@angular/http"
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";
import { firebaseConfig } from "../../../environments/firebase.config";

@Injectable()
export class ProductsService {

    constructor(private db:AngularFireDatabase, private http: Http) {
    }

    findAllProducts():Observable<Product[]> {
        return this.db.list('products').map(Product.fromJsonArray);
    }

    addProduct(body) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        
        const url = firebaseConfig.databaseURL + '/products.json';

        return this.http.post(url, body, { headers: headers })
                .map(res => res.json())
    }

    deleteProduct(key): Observable<any>{
        const url = firebaseConfig.databaseURL + '/products/' + key + '.json';

        return this.http.delete(url);
    }

    findProductById(id: string) {
        return this.db.object('products/' + id);
    }

    editProduct(body, key) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        
        const url = firebaseConfig.databaseURL + '/products/' + key + '.json';

        return this.http.put(url, body, { headers: headers })
                .map(res => res.json())
    }
}