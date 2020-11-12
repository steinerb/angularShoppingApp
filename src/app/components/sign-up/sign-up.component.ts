import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit 
{

	signUpForm: FormGroup

 	email: FormControl
 	pass: FormControl

 	error: boolean = false;

 	@Output() createdUser = new EventEmitter<any>();

	constructor(protected userService: UserService) { }

	doSomething()
	{
		console.log("something!!!");
	}

	temp()
	{
		this.userService.getUser(this.signUpForm.value['email']).then((result) => {
			if (result === undefined)
				this.error = true;
			else
			{
				this.error = false;
				console.log(result);
			}
		})
	}

	onSubmit() 
	{

		let user = {};
		user['email'] = this.signUpForm.value['email'];
		user['pass'] = this.signUpForm.value['pass'];
		user['isAdmin'] = false;

		this.userService.getUser(this.signUpForm.value['email']).then((result) => {

			if(Object.keys(result).length === 0)
			{
				this.userService.signUp(user).then((result) => {
					if (result === undefined)
						this.error = true;
					else
					{
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

		/*
		this.userService.signUp(user).then((result) => {
			if (result === undefined)
				this.error = true;
			else
			{
				this.error = false;
				this.createdUser.emit(result);
			}

		})
		*/

		//console.log(this.userService.userExists(this.signUpForm.value['email']));
	}

	ngOnInit(): void {
	  	this.email = new FormControl('', Validators.required);
		this.pass = new FormControl('', Validators.required);

		this.signUpForm = new FormGroup({
			email: this.email,
			pass: this.pass
		})
  }

}
