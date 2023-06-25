import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicViewComponent } from './generic/public-view/public-view.component';
import { HomeComponent } from './generic/home/home.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MakeupProductsComponent } from './generic/makeup-products/makeup-products.component';
import { AuthGuardFunction } from './helpers/auth.guard';
import { HumanFacePopupComponent } from './human-face-popup/human-face-popup.component';

const routes: Routes = [ 
  { path: '', component: PublicViewComponent },
  {
    path: 'user/home',
    component: HomeComponent,
    canActivate: [() => inject(AuthGuardFunction).canActivate()]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [() => inject(AuthGuardFunction).canActivate()]
  },
  {
    path: 'favoriteMakeupData',
    component: DashboardComponent,
    canActivate: [() => inject(AuthGuardFunction).canActivate()]
  },
  {
    path: 'makeupProducts',
    component: MakeupProductsComponent,
    canActivate: [() => inject(AuthGuardFunction).canActivate()]
  },
  {
    path: 'favoriteMakeupProducts',
    component: MakeupProductsComponent,
    canActivate: [() => inject(AuthGuardFunction).canActivate()]
  },
  {
    path: 'admin/home',
    component: AdminViewComponent,
    canActivate: [() => inject(AuthGuardFunction).canActivate()]
  }, 
  {
    path: 'selectFacePart',
    component: HumanFacePopupComponent,
    canActivate: [() => inject(AuthGuardFunction).canActivate()]
  }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
