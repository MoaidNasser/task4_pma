import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { App } from './app';

export const routes: Routes = [
    {path : 'home' , component : App},
    {path : 'products' , component : ProductList}
];
