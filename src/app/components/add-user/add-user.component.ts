import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit 
{
	addUserForm: FormGroup

 	email: FormControl
 	fName: FormControl
 	lName: FormControl
 	pass: FormControl
 	isAdmin: FormControl

 	error: boolean = false;

 	@Output() createdUser = new EventEmitter<any>();

 	onSubmit()
 	{
 		let user = {};
		user['email'] = this.addUserForm.value['email'];
		user['fName'] = this.addUserForm.value['fName'];
		user['lName'] = this.addUserForm.value['lName'];
		user['pass'] = this.addUserForm.value['pass'];
		user['isAdmin'] = this.addUserForm.value['isAdmin'];
		user['wishlist'] = [];
		//cart should be stored in local storage instead of db!!!
		user['cart'] = [];

 		//get gets the user
 		this.userService.getUser(this.addUserForm.value['email']).then((result) => {
			//if user is does not already exist
			if(Object.keys(result).length === 0)
			{
				//add user
				this.userService.addUser(user).then((result) => {
					if (result === undefined)
						this.error = true;
					else
					{
						//emit to express http server
						this.error = false;
						this.createdUser.emit(result);
					}
				})
			}
			else
			{
				alert("A user with that email already exists!");
			}
		})
 	}

	constructor(protected userService: UserService) { }

	ngOnInit(): void {
		this.email = new FormControl('', Validators.required);
		this.fName = new FormControl('', Validators.required);
	  	this.lName = new FormControl('', Validators.required);
		this.pass = new FormControl('', Validators.required);
		this.isAdmin = new FormControl(false, Validators.required);

		this.addUserForm = new FormGroup({
			email: this.email,
			fName: this.fName,
			lName: this.lName,
			pass: this.pass,
			isAdmin: this.isAdmin
		})
	}

}
