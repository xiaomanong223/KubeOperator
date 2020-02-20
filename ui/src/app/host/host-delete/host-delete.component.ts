import {Component, OnInit} from '@angular/core';
import {CommonDeleteComponent} from '../../ko-common/class/common-delete-component';
import {Host} from '../host';
import {HostService} from '../host.service';

@Component({
  selector: 'app-host-delete',
  templateUrl: './host-delete.component.html',
  styleUrls: ['./host-delete.component.css']
})
export class HostDeleteComponent extends CommonDeleteComponent<Host> {

  constructor(service: HostService) {
    super(service);
  }
}
