import {Pipe, PipeTransform} from '@angular/core';
import {Host} from '../../host/host';

@Pipe({
  name: 'hostFilter'
})
export class HostFilterPipe implements PipeTransform {

  transform(value: Host, ...args: any[]): any {
    const template = '{N}   [CPU: {C} 内存: {M}]';
    return template.replace('{C}', '' + value.basic.cpu_core)
      .replace('{M}', '' + value.basic.memory)
      .replace('{N}', value.name);
  }

}
