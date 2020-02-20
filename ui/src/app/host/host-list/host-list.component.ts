import {Component} from '@angular/core';
import {HostService} from '../host.service';
import {Host} from '../host';
import {CommonListComponent} from '../../ko-common/class/common-list-component';

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.css']
})
export class HostListComponent extends CommonListComponent<Host> {

  constructor(private hostService: HostService) {
    super(hostService);
  }
}
