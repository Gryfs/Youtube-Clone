import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SearchComponent } from './pages/search/search.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'register', component: RegisterComponent},
    {path: 'search', component: SearchComponent, canActivate: [authGuard]},
    {path: '**', component: NotFoundComponent}
];
