import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'categoryFilter'
})

export class CategoryFilterPipe implements PipeTransform{

    transform(products:any[], term:string){
       if(products === undefined || term === undefined || term === 'all') return products
       return products.filter(product => product.category.toLowerCase().includes(term.toLowerCase()))
    }
}