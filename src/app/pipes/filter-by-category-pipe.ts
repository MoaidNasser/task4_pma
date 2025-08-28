import { Pipe, PipeTransform } from '@angular/core';
import { Category, Product } from '../models/product';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(list: Product[] | null | undefined, category: Category): Product[] {
    if (!Array.isArray(list) || list.length === 0) return [];
    if (!category) return list;

    const wanted = String(category).toLowerCase();
    return list.filter(p => String(p.category ?? '').toLowerCase() === wanted);
  }

}
