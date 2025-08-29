import { Component, computed, effect, signal } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { Category, Product } from '../../models/product';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FilterByCategoryPipe } from '../../pipes/filter-by-category-pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-list',
  imports: [GridModule, ButtonModule, CurrencyPipe, DatePipe, FilterByCategoryPipe, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  selectedCategory: Category = 'All';

  constructor(private router: Router, private crud: ProductService) { }

  products = computed(() => this.crud.products());

  ngOnInit() {
    this.crud.loadProducts();
  }

  addButtonClickEvent() {
    this.router.navigate(['/add']);
  }

  editButtonClickEvent(id: string) {
    this.router.navigate(['/edit', id]);
  }

  onShow(id: string) {
    this.router.navigate(['/product', id]);
  }

  onRemove(id: string) {

    this.crud.removeProduct(id);
  }

}
