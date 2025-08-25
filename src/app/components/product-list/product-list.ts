import { Component } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { Product } from '../../models/product';
import { ButtonModule } from '@progress/kendo-angular-buttons';


@Component({
  selector: 'app-product-list',
  imports: [GridModule, ButtonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
 
  products: Product[] = [];
  
}
