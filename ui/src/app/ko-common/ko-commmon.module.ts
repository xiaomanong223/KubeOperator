import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertDeleteComponent} from './component/alert-delete/alert-delete.component';
import {CoreModule} from '../core/core.module';


@NgModule({
  declarations: [AlertDeleteComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    AlertDeleteComponent,
  ]
})
export class KoCommonModule {
}
