import {CommonService} from './common-service';
import {EventEmitter, Output} from '@angular/core';
import {EventResult} from './event-result';
import {CommonItem} from './common-item';

export abstract class CommonDeleteComponent<T extends CommonItem> {
  items: T[] = [];
  opened = false;
  @Output() deleted = new EventEmitter<EventResult>();


  protected constructor(protected service: CommonService<T>) {
  }

  private reset() {
    this.items = [];
  }

  onCancel() {
    this.reset();
    this.opened = false;
  }

  open(items: T[]) {
    this.items = items;
    this.opened = true;
  }


  confirmDelete() {
    const promises: Promise<{}>[] = [];
    this.items.forEach(item => {
      promises.push(this.service.delete(item.name).toPromise());
    });
    Promise.all(promises).then(() => {
      const result = new EventResult(true, '删除' + this.items.length + '个资源成功');
      this.deleted.emit(result);
    }, (err) => {
      const result = new EventResult(false, '');
      this.deleted.emit(result);
    }).finally(() => {
      this.opened = false;
    });
  }
}
