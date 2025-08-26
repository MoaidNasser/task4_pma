import { Component } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [GridModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  constructor(private route : ActivatedRoute){}

  productId : string = '';
  product : Partial<Product> = {};

  ngOnInit(): void {
   
    this.productId = this.route.snapshot.paramMap.get('id')!;

}


}
