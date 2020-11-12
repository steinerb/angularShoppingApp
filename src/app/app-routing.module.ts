import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: 'login', component: LoginComponent },
	{ path: 'sign-up', component: SignUpComponent },
	//TO ADD: children of admin
	{ path: 'admin', component: AdminComponent, canActivate: [ LoginGuard ] },
	{ path: 'user', component: UserComponent }

	//{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  //providers: [ LoginGuard ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
