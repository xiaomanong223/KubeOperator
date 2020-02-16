import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HostService} from '../host.service';
import {Host} from '../host';
import {CommonAlertService} from '../../base/header/common-alert.service';
import {CommonItem} from '../../ko-common/class/common-item';
import {AlertLevels} from '../../base/header/components/common-alert/alert';

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.css']
})
export class HostListComponent implements OnInit {

  items: Host[] = [];
  loading = false;
  selected: Host[] = [];
  @Output() add = new EventEmitter();
  @Output() detail = new EventEmitter<Host>();
  @Output() delete = new EventEmitter<CommonItem[]>();

  constructor(private hostService: HostService, private alertService: CommonAlertService) {
  }

  ngOnInit() {
    this.listHost();
  }

  onDelete() {
    this.delete.emit(this.selected);
  }

  onAdd() {
    this.add.emit();
  }

  onDetail(item: Host) {
    this.detail.emit(item);
  }


  confirmDelete() {
    const promises: Promise<{}>[] = [];
    this.selected.forEach(host => {
      promises.push(this.hostService.delete(host.id).toPromise());
    });
    Promise.all(promises).then(() => {
      this.refresh();
      this.alertService.showAlert('删除主机成功！', AlertLevels.SUCCESS);
    }, (error) => {
      this.alertService.showAlert('删除主机失败:' + error, AlertLevels.ERROR);
    }).finally(() => {
      this.selected = [];
    });
  }


  refresh() {
    this.listHost();
  }

  listHost() {
    this.loading = true;
    this.hostService.list().subscribe(data => {
      this.items = data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}
