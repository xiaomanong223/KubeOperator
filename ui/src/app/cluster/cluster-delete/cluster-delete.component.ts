import {Component} from '@angular/core';
import {CommonDeleteComponent} from '../../ko-common/class/common-delete-component';
import {Cluster} from '../class/cluster';
import {ClusterService} from '../cluster.service';

@Component({
  selector: 'app-cluster-delete',
  templateUrl: './cluster-delete.component.html',
  styleUrls: ['./cluster-delete.component.css']
})
export class ClusterDeleteComponent extends CommonDeleteComponent<Cluster> {

  constructor(public service: ClusterService) {
    super(service);
  }
}
