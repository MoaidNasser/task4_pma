import { effect, Injectable, signal, Signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  localKey: string = 'moaid';
  products = signal<Product[]>([{
    id: 'P-1001',
    name: 'Ultrabook 14"',
    price: 999.99,
    discontinued: false,
    UnitsInStock: 12,
    createdAt: '2025-07-10T09:30:00.000Z',
    category: 'Electronics',
    SupplierID: 1,
    description: '14-inch laptop, 16GB RAM, 512GB SSD, Wi-Fi 6',
    updatedAt: '2025-08-15T10:00:00.000Z'
  },
  {
    id: 'P-1002',
    name: 'Graphic T-Shirt',
    price: 19.5,
    discontinued: false,
    UnitsInStock: 120,
    createdAt: '2025-06-21T12:05:00.000Z',
    category: 'Clothing',
    SupplierID: 3,
    description: '100% cotton, unisex, printed front',
    updatedAt: '2025-08-01T08:12:00.000Z'
  },
  {
    id: 'P-1003',
    name: 'Apples (1kg)',
    price: 3.99,
    discontinued: false,
    UnitsInStock: 48,
    createdAt: '2025-08-01T07:00:00.000Z',
    category: 'Grocery',
    SupplierID: 8,
    description: 'Fresh red apples, Class A',
    updatedAt: '2025-08-20T11:22:00.000Z'
  },
  {
    id: 'P-1004',
    name: 'Wireless Headphones',
    price: 149.0,
    discontinued: false,
    UnitsInStock: 25,
    createdAt: '2025-05-02T14:10:00.000Z',
    category: 'Electronics',
    SupplierID: 2,
    description: 'ANC, 30h battery, Bluetooth 5.3',
    updatedAt: '2025-08-16T16:45:00.000Z'
  },
  {
    id: 'P-1005',
    name: 'Winter Jacket',
    price: 89.99,
    discontinued: false,
    UnitsInStock: 8,
    createdAt: '2025-01-12T09:00:00.000Z',
    category: 'Clothing',
    SupplierID: 6,
    description: 'Water-resistant, insulated, hooded',
    updatedAt: '2025-08-10T10:30:00.000Z'
  },
  {
    id: 'P-1006',
    name: 'Coffee Beans 500g',
    price: 11.75,
    discontinued: false,
    UnitsInStock: 64,
    createdAt: '2025-07-28T06:40:00.000Z',
    category: 'Grocery',
    SupplierID: 7,
    description: 'Medium roast Arabica, whole beans',
    updatedAt: '2025-08-18T09:18:00.000Z'
  },
  {
    id: 'P-1007',
    name: 'USB-C 65W Charger',
    price: 29.0,
    discontinued: false,
    UnitsInStock: 0,
    createdAt: '2025-03-08T11:15:00.000Z',
    category: 'Electronics',
    SupplierID: 5,
    description: 'Fast charging PPS/PD, foldable plug',
    updatedAt: '2025-08-14T13:05:00.000Z'
  },
  {
    id: 'P-1008',
    name: 'Desk Organizer Set',
    price: 24.99,
    discontinued: true,
    UnitsInStock: 4,
    createdAt: '2024-11-30T15:50:00.000Z',
    category: 'Other',
    SupplierID: 4,
    description: '5-piece set: tray, pen holder, clips box',
    updatedAt: '2025-08-05T12:00:00.000Z'
  }]);
  loading = signal<boolean>(true);

  constructor() {

    this.loadProducts;

    effect(() => {

      const data = this.products();

      try {
        localStorage.setItem(this.localKey, JSON.stringify(this.products()));
      }

      catch (e: any) {
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

    try {
      const raw = localStorage.getItem(this.localKey);

      if (!raw) {
        this.products.set([]);
        this.loading.set(false);
        return;
      }

      const parsed = JSON.parse(raw);

      this.products.set(parsed);

    }


    catch (e: any) {
      console.error(e);

    }
    finally {
      this.loading.set(false);
    }
  }


  removeProduct(id: string) {

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


  updateProduct(id: string, changes: Partial<Product>) {

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
