import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { App } from './app';
import { ProductDetail } from './components/product-detail/product-detail';

export const routes: Routes = [
    {path : '' , component : App},
    {path : 'product/:id' , component : ProductDetail},
    {path : 'products' , component : ProductList},
];
