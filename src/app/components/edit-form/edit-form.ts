import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, Product } from '../../models/product';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';


@Component({
  selector: 'app-edit-form',
  imports: [FormsModule, DropDownsModule],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.css'
})
export class EditForm {

  constructor(private router: ActivatedRoute, private crud: ProductService, private route: Router) { }

  product: Partial<Product> = {};
  categories: Category[] = ['Electronics', 'Clothing', 'Grocery', 'Other'];

  onSubmit(form: any) {
    console.log(form.value);
    const id = this.router.snapshot.paramMap.get('id')!;
    this.crud.updateProduct(id, this.product)

    this.route.navigate(['/products']);

  }
}
