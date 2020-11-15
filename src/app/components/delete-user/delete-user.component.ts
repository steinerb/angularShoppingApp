import { Component, OnInit, EventEmitter } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit 
{

	deleteUserForm: FormGroup

 	email: FormControl

 	error: boolean = false;

	constructor(protected userService: UserService) { }

	onSubmit()
	{
		var answer = confirm("Confirm Deletion");
		if(answer)
		{
			let email = this.deleteUserForm.value['email']
			//get gets the user
	 		this.userService.getUser(email).then((result) => {
				//if user is exists
				if(Object.keys(result).length !== 0)
				{
					//delete user
					this.userService.deleteUser(email).then((result) => {
						if (result === undefined)
							this.error = true;
						else
							this.error = false;
						
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

		this.deleteUserForm = new FormGroup({
			email: this.email
		})
	}
		

}
