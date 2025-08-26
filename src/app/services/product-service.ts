import { effect, Injectable, signal, Signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   localKey : string = 'moaid';
   products = signal<Product[]>([]);
   loading = signal<boolean>(true);
  
  constructor(){

    this.loadProducts;

    effect(() => {

      const data = this.products();

      try{
        localStorage.setItem(this.localKey , JSON.stringify(this.products));
      }

      catch (e : any){
       console.error(e);
      }
    });

        window.addEventListener('storage', (ev) => {
      if (ev.key === this.localKey) {
        this.loadProducts(); 
      }
    });
  }


  loadProducts() {
   
    try{
      const raw = localStorage.getItem(this.localKey);

      if(!raw){
        this.products.set([]);
        this.loading.set(false);
        return;
      }

      const parsed = JSON.parse(raw);

      this.products.set(parsed);
    }
    

    catch (e : any)
    {
       console.error(e);

    }
  finally{
    this.loading.set(false);
  }
  }


  removeProduct(id : string) {

    this.products.update(list => list.filter(p => p.id !== id));
  }


addProduct(p: Product) {
  const now = new Date().toISOString();
  const prod: Product = {
    ...p,
    createdAt: p.createdAt ?? now,
    updatedAt: now,
  };

  let inserted = false;

  this.products.update(list => {
    if (list.some(x => x.id === prod.id)) {
      return list; 
    }
    inserted = true;
    return [prod, ...list];
  });

  if (!inserted) {
    
    throw new Error(`Product with id "${prod.id}" already exists`);
  }

}


  updateProduct(id : string , changes : Partial<Product>) {
    
    let updated: Product | undefined;

    this.products.update(list => {
      const idx = list.findIndex(p => p.id === id);
      if (idx === -1) return list;

      const merged: Product = {
        ...list[idx],
        ...changes,
        updatedAt: new Date().toISOString(),
      };

      updated = merged;

      const copy = list.slice();
      copy[idx] = merged;
      return copy;
    });

    return updated;
  }
}
