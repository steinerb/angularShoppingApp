import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService 
{
	private productsURL = '/admin/products';
	private getProductURL = '/user/products';


	constructor(private http: Http) { }


	getProduct(name, brand)
	{
		return this.http.get(`${this.getProductURL}/${name}/${brand}`).toPromise()
		.then(response => response.json())
		.catch(this.error);
	}

	addProduct(product): Promise<any>
	{
		return this.http.post(this.productsURL, product).toPromise()
		.then(response => response.json())
		.catch(this.error);
	}

	// Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }
}
