import {Component, ViewChild} from '@angular/core';
import {CommonItemComponent} from '../ko-common/class/common-item-component';
import {Cluster} from './class/cluster';
import {CommonAlertService} from '../base/header/common-alert.service';
import {ClusterCreateComponent} from './cluster-create/cluster-create.component';
import {ClusterListComponent} from './cluster-list/cluster-list.component';
import {ClusterDeleteComponent} from './cluster-delete/cluster-delete.component';
import {ClusterDetailComponent} from './cluster-detail/cluster-detail.component';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent extends CommonItemComponent<Cluster> {

  @ViewChild(ClusterCreateComponent, {static: true})
  creation: ClusterCreateComponent;
  @ViewChild(ClusterListComponent, {static: true})
  list: ClusterListComponent;
  @ViewChild(ClusterDeleteComponent, {static: true})
  deletion: ClusterDeleteComponent;
  @ViewChild(ClusterDetailComponent, {static: true})
  detail: ClusterDetailComponent;

  constructor(public alert: CommonAlertService) {
    super(alert);
}
}
