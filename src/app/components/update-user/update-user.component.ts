import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

	updateUserForm: FormGroup

 	email: FormControl
 	attr: FormControl
 	val: FormControl

 	error: boolean = false;

 	@Output() userToUpdate = new EventEmitter<any>();

	constructor(protected userService: UserService) { }

	onSubmit()
	{
		var answer = confirm("Confirm Update");
		if(answer)
		{
			let email = this.updateUserForm.value['email'];
			let attr = this.updateUserForm.value['attr'];
			let val = this.updateUserForm.value['val'];
			//get gets the user
	 		this.userService.getUser(email).then((result) => {
				//if user is exists
				if(Object.keys(result).length !== 0)
				{
					//update user
					this.userService.updateUser(email, attr, val).then((result) => {
						if (result === undefined)
							this.error = true;
						else
						{
							//emit to express http server
							this.error = false;
							this.userToUpdate.emit(result);
						}
					})
				}
				else
				{
					alert("No user with that email exists!");
				}
			})
		}
	}

	ngOnInit(): void {
		this.email = new FormControl('', Validators.required);
		this.attr = new FormControl('', Validators.required);
		this.val = new FormControl('', Validators.required);

		this.updateUserForm = new FormGroup({
			email: this.email,
			attr: this.attr,
			val: this.val
		})
	}

}
