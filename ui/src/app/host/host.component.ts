import {Component, ViewChild} from '@angular/core';
import {HostCreateComponent} from './host-create/host-create.component';
import {HostListComponent} from './host-list/host-list.component';
import {Host} from './host';
import {HostDetailComponent} from './host-detail/host-detail.component';
import {CommonAlertService} from '../base/header/common-alert.service';
import {HostDeleteComponent} from './host-delete/host-delete.component';
import {CommonItemComponent} from '../ko-common/class/common-item-component';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent extends CommonItemComponent<Host> {

  constructor(public alert: CommonAlertService) {
    super(alert);
  }

  @ViewChild(HostCreateComponent, {static: true})
  creation: HostCreateComponent;
  @ViewChild(HostListComponent, {static: true})
  list: HostListComponent;
  @ViewChild(HostDeleteComponent, {static: true})
  deletion: HostDeleteComponent;
  @ViewChild(HostDetailComponent, {static: true})
  detail: HostDetailComponent;

  openDetail(item: Host) {
    this.detail.open(item);
  }
}
