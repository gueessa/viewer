import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'viewer',
    pathMatch: 'full'
  },
  {
    path: 'viewer',
    loadChildren: () => import('./application/viewer/viewer.module').then((m) => m.ViewerModule)
  },
  {
    path: '**',
    redirectTo: 'viewer'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
