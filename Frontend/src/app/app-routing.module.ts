import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Profiles } from './core/models/profiles.enum';
import { SigninComponent } from './modules/authentication/signin/signin.component';

const routes: Routes = [
  {
    canLoad: [AuthGuard],
    path: 'employees',
    loadChildren: () => import('./modules/employees/employees.module')
      .then(mod => mod.EmployeesModule),
    data: {
      profile: Profiles.EMPLOYEE,
    }
  },
  {
    canLoad: [AuthGuard],
    path: 'manager',
    loadChildren: () => import('./modules/manager/manager.module')
      .then(mod => mod.ManagerModule),
    data: {
      profile: Profiles.MANAGER,
    }
  },
  {
    canLoad: [AuthGuard],
    path: 'finances',
    loadChildren: () => import('./modules/finances/finances.module')
      .then(mod => mod.FinancesModule),
    data: {
      profile: Profiles.FINANCES,
    }
  },
  {
    canActivate: [AuthGuard],
    path: '',
    component: SigninComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
