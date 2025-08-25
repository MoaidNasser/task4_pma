import { Component } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { Product } from '../../models/product';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Router} from '@angular/router';


@Component({
  selector: 'app-product-list',
  imports: [GridModule, ButtonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
 
constructor(private router: Router) {}

  products: Product[] = [];

  addButtonClickEvent() {
    this.router.navigate(['/add']);
  }

    editButtonClickEvent() {
    this.router.navigate(['/edit']);
  }
  
}
