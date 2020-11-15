import { Component, OnInit, EventEmitter } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

	deleteProductForm: FormGroup

 	name: FormControl
 	brand: FormControl

 	error: boolean = false;

	constructor(protected productService: ProductService) { }

	onSubmit()
	{
		var answer = confirm("Confirm Deletion");
		if(answer)
		{
			let name = this.deleteProductForm.value['name'];
			let brand = this.deleteProductForm.value['brand'];
			//get gets the product
	 		this.productService.getProduct(name, brand).then((result) => {
				//if product is exists
				if(Object.keys(result).length !== 0)
				{
					//delete product
					this.productService.deleteProduct(name, brand).then((result) => {
						if (result === undefined)
							this.error = true;
						else
							this.error = false;
						
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

		this.deleteProductForm = new FormGroup({
			name: this.name,
			brand: this.brand
		})
	}

}
