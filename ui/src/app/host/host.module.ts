import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HostComponent} from './host.component';

import {CoreModule} from '../core/core.module';
import {HostListComponent} from './host-list/host-list.component';
import {HostCreateComponent} from './host-create/host-create.component';
import {HostDetailComponent} from './host-detail/host-detail.component';
import {SharedModule} from '../shared/shared.module';
import {KoCommonModule} from '../ko-common/ko-commmon.module';

@NgModule({
  declarations: [HostComponent, HostListComponent, HostCreateComponent, HostDetailComponent],
  imports: [
    CommonModule,
    KoCommonModule,
    CoreModule,
    SharedModule
  ]
})
export class HostModule {
}
