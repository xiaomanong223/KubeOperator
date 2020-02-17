import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cluster, ClusterConfigs, ExtraConfig} from './cluster';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HostService} from '../host/host.service';
import {CommonService} from '../ko-common/class/common-service';


const webKubeCtlUrl = '/api/v1/cluster/{id}/webkubectl/token/';


@Injectable({
  providedIn: 'root'
})
export class ClusterService extends CommonService<Cluster> {
  baseUrl = '/api/v1/clusters/';

  constructor(http: HttpClient) {
    super(http);
  }

}
