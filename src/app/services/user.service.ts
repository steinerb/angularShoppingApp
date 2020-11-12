import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
	private usersURL = '/admin/users';
	private signUpURL = '/sign-up/users';
	private getUserURL = '/finduser'

	constructor(private http: Http) { }

	signUp(user): Promise<any>
	{
		return this.http.post(this.signUpURL, user).toPromise()
		.then(response => response.json())
		.catch(this.error);
	}

	getUser(email)
	{
		return this.http.get(`${this.getUserURL}/${email}`).toPromise()
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
