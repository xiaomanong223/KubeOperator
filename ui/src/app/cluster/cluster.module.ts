import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClusterComponent} from './cluster.component';
import {ClusterListComponent} from './cluster-list/cluster-list.component';
import {CoreModule} from '../core/core.module';
import {ClusterService} from './cluster.service';
import {ClusterDetailComponent} from './cluster-detail/cluster-detail.component';
import {ClusterRoutingResolverService} from './cluster-routing-resolver.service';
import {SharedModule} from '../shared/shared.module';
import {ClusterCreateComponent} from './cluster-create/cluster-create.component';
import {HostFilterPipe} from './pipe/host-filter.pipe';
import {HostPopPipe} from './pipe/host-pop.pipe';
import {ClusterDeleteComponent} from './cluster-delete/cluster-delete.component';

@NgModule({
  declarations: [ClusterComponent,
    ClusterListComponent,
    ClusterDetailComponent,
    ClusterCreateComponent, HostFilterPipe, HostPopPipe, ClusterDeleteComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  providers: [ClusterService, ClusterRoutingResolverService]
})
export class ClusterModule {
}
