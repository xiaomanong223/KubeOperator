import {Component} from '@angular/core';
import {ClusterService} from '../cluster.service';
import {CommonAlertService} from '../../base/header/common-alert.service';
import {Cluster} from '../class/cluster';
import {CommonListComponent} from '../../ko-common/class/common-list-component';

@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
  styleUrls: ['./cluster-list.component.css']
})
export class ClusterListComponent extends CommonListComponent<Cluster> {

  constructor(clusterService: ClusterService) {
    super(clusterService);
  }
}
