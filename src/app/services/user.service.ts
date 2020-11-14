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

	addUser(user): Promise<any>
	{
		return this.http.post(this.usersURL, user).toPromise()
		.then(response => response.json())
		.catch(this.error);
	}

	getUser(email)
	{
		return this.http.get(`${this.getUserURL}/${email}`).toPromise()
		.then(response => response.json())
		.catch(this.error);
	}

	userExists(email)
	{
		return this.getUser(email).then((result) => {
			if(Object.keys(result).length === 0)
				return false;
			else
				return true;
		})
	}


	// Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }
}
