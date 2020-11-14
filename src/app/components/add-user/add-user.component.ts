import { Component, OnInit } from '@angular/core';
// add these when ready to emit:	 Output, EventEmitter
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
 	pass: FormControl
 	isAdmin: FormControl

 	error: boolean = false;

 	onSubmit()
 	{
 		let user = {};
		user['email'] = this.addUserForm.value['email'];
		user['pass'] = this.addUserForm.value['pass'];
		user['isAdmin'] = this.addUserForm.value['isAdmin'];
		user['wishlist'] = [];

 		console.log("new user:\n", user);
 	}

	constructor(protected userService: UserService) { }

	ngOnInit(): void {
		this.email = new FormControl('', Validators.required);
		this.pass = new FormControl('', Validators.required);
		this.isAdmin = new FormControl(false, Validators.required);

		this.addUserForm = new FormGroup({
			email: this.email,
			pass: this.pass,
			isAdmin: this.isAdmin
		})
	}

}
