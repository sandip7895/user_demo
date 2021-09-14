import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './include/header/header.component';
import { LoginComponent } from './page/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AuthGuard } from './_guard/auth-guard';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: LoginComponent, data: { title: "Login" } },
            { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard], data: { title: "User List" } },
            { path: 'user-add', component: UserAddComponent, canActivate: [AuthGuard], data: { title: "User Add" } },
            { path: 'user-add/:id', component: UserAddComponent, canActivate: [AuthGuard], data: { title: "Update Add" } },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { title: "profile" } },
        ],
        data: { title: "main" }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }