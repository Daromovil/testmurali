import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './modules/home/home.page';

//{ path: '*', redirectTo: '', pathMatch: 'full' }
const routes: Routes = [
  { path: '', redirectTo: 'te/home', pathMatch: "full" },
  { path: ':languageCode/home', component: HomePage, data: { title: 'Home' } },
  { path: 'home', component: HomePage, data: { title: 'Home' } },
  {
    path: 'te/vedas',
    loadChildren: () => import('./modules/vedas/vedas.module').then(m => m.VedasModule),
    data: { title: 'Veda - ' }
  },
  {
    path: ':languageCode/vedas',
    loadChildren: () => import('./modules/vedas/vedas.module').then(m => m.VedasModule),
    data: { title: 'Veda - ' }
  },
  //{ path: '**', redirectTo: 'en/home', pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
