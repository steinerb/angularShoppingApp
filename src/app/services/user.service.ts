import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
	private usersURL = '/admin/users';
	private signUpURL = '/signup'

  constructor() { }
}
