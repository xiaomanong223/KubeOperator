import {Component, OnInit, ViewChild} from '@angular/core';
import {HostCreateComponent} from './host-create/host-create.component';
import {HostListComponent} from './host-list/host-list.component';
import {AlertDeleteComponent} from '../ko-common/component/alert-delete/alert-delete.component';
import {Host} from './host';
import {CommonItem} from '../ko-common/class/common-item';
import {HostDetailComponent} from './host-detail/host-detail.component';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  @ViewChild(HostCreateComponent, {static: true})
  creationHost: HostCreateComponent;

  @ViewChild(HostListComponent, {static: true})
  listHost: HostListComponent;

  @ViewChild(AlertDeleteComponent, {static: true})
  deletion: AlertDeleteComponent;

  @ViewChild(HostDetailComponent, {static: true})
  detail: HostDetailComponent;


  constructor() {
  }

  ngOnInit() {
  }

  openAdd() {
    this.creationHost.newHost();
  }

  openDelete(items: CommonItem[]) {
    this.deletion.open(items);
  }

  openDetail(item: Host) {
    this.detail.open(item);
  }

  postAdd() {
    this.refresh();
  }

  postDelete() {
    this.listHost.confirmDelete();
  }

  refresh() {
    this.listHost.refresh();
  }


}
