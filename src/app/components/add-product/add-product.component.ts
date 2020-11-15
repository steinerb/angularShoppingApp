import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit 
{

	addProductForm: FormGroup

 	name: FormControl
 	brand: FormControl
 	price: FormControl
 	imageSrc: FormControl
 	quantity: FormControl


 	error: boolean = false;

 	@Output() createdProduct = new EventEmitter<any>();

	constructor(protected productService: ProductService) { }

	onSubmit()
 	{
 		let product = {};
		product['name'] = this.addProductForm.value['name'];
		product['brand'] = this.addProductForm.value['brand'];
		product['price'] = this.addProductForm.value['price'];
		product['imageSrc'] = this.addProductForm.value['imageSrc'];
		product['quantity'] = this.addProductForm.value['quantity'];
		

 		//get product
 		this.productService.getProduct(product['name'], product['brand']).then((result) => {
			//if product is does not already exist
			if(Object.keys(result).length === 0)
			{
				//add product
				this.productService.addProduct(product).then((result) => {
					if (result === undefined)
						this.error = true;
					else
					{
						//emit to express http server
						this.error = false;
						this.createdProduct.emit(result);
					}
				})
			}
			else
			{
				alert("That product already exists!");
			}
		})
 	}

	ngOnInit(): void {
		this.name = new FormControl('', Validators.required);
		this.brand = new FormControl('', Validators.required);
		this.price = new FormControl('', Validators.required);
		this.imageSrc = new FormControl('', Validators.required);
		this.quantity = new FormControl(1, Validators.required);

		this.addProductForm = new FormGroup({
			name: this.name,
			brand: this.brand,
			price: this.price,
			imageSrc: this.imageSrc,
			quantity: this.quantity
		})
	}

}
