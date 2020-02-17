import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClusterComponent} from './cluster.component';
import {ClusterListComponent} from './cluster-list/cluster-list.component';
import {CoreModule} from '../core/core.module';
import {ClusterService} from './cluster.service';
import {ClusterDetailComponent} from './cluster-detail/cluster-detail.component';
import {ClusterRoutingResolverService} from './cluster-routing-resolver.service';
import {HostsFilterPipe} from './hosts-filter.pipe';
import {SharedModule} from '../shared/shared.module';
import { ClusterCreateComponent } from './cluster-create/cluster-create.component';

@NgModule({
  declarations: [ClusterComponent, ClusterListComponent, ClusterDetailComponent, HostsFilterPipe, ClusterCreateComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  providers: [ClusterService, ClusterRoutingResolverService]
})
export class ClusterModule {
}
