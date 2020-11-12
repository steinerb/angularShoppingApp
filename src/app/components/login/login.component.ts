import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

	loginForm: FormGroup

 	email: FormControl
 	pass: FormControl

	//services initialized here
	constructor() { }

	printFormInfo()
	{
		console.log(`email: ${this.email.value}\npass: ${this.pass.value}`)
	
		//print keys of object
		//Object.keys(this.email).forEach((prop)=> console.log(prop))
	}


	ngOnInit(): void {
		this.email = new FormControl('', Validators.required);
		this.pass = new FormControl('', Validators.required);

		this.loginForm = new FormGroup({
			email: this.email,
			pass: this.pass
		})

	}

}
