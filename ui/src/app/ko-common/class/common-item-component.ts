import {ViewChild} from '@angular/core';
import {CommonAlertService} from '../../base/header/common-alert.service';
import {EventResult} from './event-result';
import {AlertLevels} from '../../base/header/components/common-alert/alert';
import {CommonListComponent} from './common-list-component';
import {CommonDeleteComponent} from './common-delete-component';
import {CommonCreateComponent} from './common-create-component';
import {CommonItem} from './common-item';

export abstract class CommonItemComponent<T extends CommonItem> {
  creation: CommonCreateComponent<T>;
  list: CommonListComponent<T>;
  deletion: CommonDeleteComponent<T>;

  protected constructor(protected alert: CommonAlertService) {
  }

  openAdd() {
    this.creation.newItem();
  }


  openDelete(items: T[]) {
    this.deletion.open(items);
  }

  handelMsg(result: EventResult) {
    const level = result.success ? AlertLevels.SUCCESS : AlertLevels.ERROR;
    this.alert.showAlert(result.msg, level);
    this.refresh();
  }


  refresh() {
    this.list.refresh();
  }

}
