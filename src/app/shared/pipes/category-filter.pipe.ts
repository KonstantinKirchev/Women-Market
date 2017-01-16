import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'categoryFilter'
})

export class CategoryFilterPipe implements PipeTransform{

    transform(products:any[]){
       if(products === undefined || localStorage.getItem('category') === 'all') return products
       return products.filter(product => product.category.toLowerCase().includes(localStorage.getItem('category')))
    }
}