import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

	updateProductForm: FormGroup

 	name: FormControl
 	brand: FormControl
 	attr: FormControl
 	val: FormControl

 	error: boolean = false;

 	@Output() productToUpdate = new EventEmitter<any>();

	constructor(protected productService: ProductService) { }

	onSubmit()
	{
		var answer = confirm("Confirm Update");
		if(answer)
		{
			let name = this.updateProductForm.value['name'];
			let brand = this.updateProductForm.value['brand'];
			let attr = this.updateProductForm.value['attr'];
			let val = this.updateProductForm.value['val'];
			//gets the product
	 		this.productService.getProduct(name, brand).then((result) => {
				//if product is exists
				if(Object.keys(result).length !== 0)
				{
					//update product
					this.productService.updateProduct(name, brand, attr, val).then((result) => {
						if (result === undefined)
							this.error = true;
						else
						{
							//emit to express http server
							this.error = false;
							this.productToUpdate.emit(result);
						}
					})
				}
				else
				{
					alert("Product does not exist!");
				}
			})
		}
	}

	ngOnInit(): void {
		this.name = new FormControl('', Validators.required);
		this.brand = new FormControl('', Validators.required);
		this.attr = new FormControl('', Validators.required);
		this.val = new FormControl('', Validators.required);

		this.updateProductForm = new FormGroup({
			name: this.name,
			brand: this.brand,
			attr: this.attr,
			val: this.val
		})
	}

}
