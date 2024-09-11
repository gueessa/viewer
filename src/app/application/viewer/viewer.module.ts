import {NgModule} from '@angular/core';
import {ViewerComponent} from './viewer.component';
import {ViewerRoutingModule} from './viewer-routing.module';
import {PageComponent} from './components/page/page.component';
import {SaveButtonComponent} from './components/save-button/save-button.component';
import {ZoomComponent} from './components/zoom/zoom.component';
import {CommonModule} from '@angular/common';
import {AnnotationComponent} from './components/annotation/annotation.component';
import {ApiModule} from '../../api/api.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedDefinition} from '../../core/shared/shared.definition';

@NgModule({
  imports: [
    ApiModule,
    ViewerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ],

  declarations: [
    ViewerComponent,
    PageComponent,
    SaveButtonComponent,
    AnnotationComponent,
    ZoomComponent,
    ...SharedDefinition.declarations
  ],

  exports: [
    ...SharedDefinition.exports
  ]
})
export class ViewerModule { }
