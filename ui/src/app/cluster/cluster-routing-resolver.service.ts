import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ClusterService} from './cluster.service';
import {map, take, tap} from 'rxjs/operators';
import {Cluster} from './class/cluster';

@Injectable()
export class ClusterRoutingResolverService implements Resolve<Cluster> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cluster> {
    const name = route.params['name'];
    return this.clusterService.get(name).pipe(
      take(1),
      map(cluster => {
        if (cluster) {
          return cluster;
        } else {
          return null;
        }
      })
    );
  }


  constructor(private clusterService: ClusterService) {
  }
}
