import { Component, signal } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [GridModule, CurrencyPipe, DatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  constructor(private route: ActivatedRoute, private crud: ProductService) { }

  productId: string = '';
  product = signal<Product[]>([]);
  productName: string = '';



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.product.set([]);
      return;
    }
    this.productId = id;

    const p = this.crud.findProduct(id);
    this.product.set(p ? [p] : []);
    this.productName = p ? p?.name : '';
  }


}
