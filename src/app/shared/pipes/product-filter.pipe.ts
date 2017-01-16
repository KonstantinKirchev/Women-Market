import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'productFilter'
})

export class ProductFilterPipe implements PipeTransform{

    transform(products:any[], term:string){
       if(products === undefined || term === undefined) return products
       return products.filter(product => product.name.toLowerCase().includes(term.toLowerCase()))
    }
}