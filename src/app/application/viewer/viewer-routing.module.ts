import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewerComponent} from './viewer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view/1',
    pathMatch: 'full'
  },
  {
    path: 'view/:id',
    component: ViewerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewerRoutingModule { }
