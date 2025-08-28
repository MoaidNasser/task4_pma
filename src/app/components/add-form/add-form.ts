import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextBoxModule, NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { CommonModule } from '@angular/common';
import { Category, Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-add-form',
  imports: [CommonModule, ReactiveFormsModule, DropDownsModule, TextBoxModule, NumericTextBoxModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.css'
})
export class AddForm {


  form!: FormGroup;

  categories: Category[] = ['Electronics', 'Clothing', 'Grocery', 'Other'];

  constructor(private fb: FormBuilder, private crud : ProductService, private route : Router) {

    this.form = this.fb.group({

      id: this.fb.control('', [Validators.required, Validators.min(0)]),
      name: this.fb.control('', [Validators.required]),
      price: this.fb.control(0, [Validators.required, Validators.min(0)]),
      UnitsInStock: this.fb.control(0, [Validators.required, Validators.min(0)]),
      category: this.fb.control<Category | null>(null, [Validators.required]),
      SupplierID: this.fb.control(0, [Validators.required]),
      description: this.fb.control('', [Validators.required, Validators.maxLength(30)]),
    });
  }

  onSubmit() {
   const product = this.form.value;

  this.crud.addProduct(product);

   this.route.navigate(['/products']);
  }

}
