import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'viewer/view/1',
    pathMatch: 'full'
  },
  {
    path: 'viewer/view/:id',
    loadChildren: () => import('./application/viewer/viewer.module').then((m) => m.ViewerModule)
  },
  {
    path: '**',
    redirectTo: 'viewer/view/1'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
