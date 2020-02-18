import {Pipe, PipeTransform} from '@angular/core';
import {Host} from '../../host/host';
import {Node} from '../class/node';

@Pipe({
  name: 'hostPop',
  pure: false
})
export class HostPopPipe implements PipeTransform {

  transform(hosts: Host[], nodes: Node[], node: Node): Host[] {
    if (!(hosts && node && nodes)) {
      return [];
    }
    const result: Host[] = [];
    hosts.forEach(host => {
      const flag = nodes.filter((n) => {
        return host.name === n.host && n !== node;
      });
      if (flag.length === 0) {
        result.push(host);
      }
    });
    return result;
  }
}
