import { authGuardGuard } from './guards/auth-guard.guard';
import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PrivateComponent } from './pages/private/private/private.component';
import { WelcomeComponent } from './pages/private/welcome/welcome.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginPageComponent },
  {path: "", component: PrivateComponent, children:[
    {
      path: 'home',
      loadChildren: ()=> import("./pages/private/welcome/welcome.routes").then(
        (m)=> m.WELCOME_ROUTES
      ),
      canActivate: [authGuardGuard]
    },
    {
      path: 'sale',
      loadChildren: ()=> import("./pages/private/sale/sale.routes").then(
        (m)=>m.SALE_ROUTES
      ),
      canActivate: [authGuardGuard]
    }
  ],  canActivate: [authGuardGuard]},

];
