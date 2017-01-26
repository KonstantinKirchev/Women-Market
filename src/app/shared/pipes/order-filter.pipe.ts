import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'orderFilter'
})

export class OrderFilterPipe implements PipeTransform{

    transform(orders:any[], term:string){
       if(orders === undefined || term === undefined) return orders
       return orders.filter(order => order.status.toLowerCase().includes(term.toLowerCase()))
    }
}