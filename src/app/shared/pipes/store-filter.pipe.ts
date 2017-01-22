import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'storeFilter'
})

export class StoreFilterPipe implements PipeTransform{

    transform(products:any[], term:string){
       if(products === undefined || term === undefined) return products
       return products.filter(product => product.store.toLowerCase().includes(term.toLowerCase()))
    }
}