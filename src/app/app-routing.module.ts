import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';

import { AddUserComponent } from './components/add-user/add-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

import { AddProductComponent } from './components/add-product/add-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';



const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: 'login', component: LoginComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'admin', children:
		[
			{ path: '', component: AdminComponent},
			{ path: 'add-user', component: AddUserComponent},
			{ path: 'delete-user', component: DeleteUserComponent},
			{ path: 'update-user', component: UpdateUserComponent},
			{ path: 'add-product', component: AddProductComponent},
			{ path: 'delete-product', component: DeleteProductComponent},
			{ path: 'update-product', component: UpdateProductComponent}
		]
		
	},
	{ path: 'user', component: UserComponent }
];

@NgModule({
  //providers: [ LoginGuard ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
