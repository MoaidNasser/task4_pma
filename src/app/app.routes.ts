import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { App } from './app';
import { ProductDetail } from './components/product-detail/product-detail';
import { EditForm } from './components/edit-form/edit-form';
import { AddForm } from './components/add-form/add-form';

export const routes: Routes = [
    {path : '' , component : App},
    {path : 'product/:id' , component : ProductDetail},
    {path : 'products' , component : ProductList},
    {path : 'edit/:id', component : EditForm},
    {path : 'add' , component : AddForm}
];
