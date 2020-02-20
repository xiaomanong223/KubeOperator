import {CommonService} from './common-service';
import {EventEmitter, Output} from '@angular/core';
import {EventResult} from './event-result';
import {CommonItem} from './common-item';

export abstract class CommonCreateComponent<T extends CommonItem> {
  isSubmitGoing = false;
  item: T = this.create();
  opened = false;
  loading = false;
  // onFail: false
  @Output() created = new EventEmitter<EventResult>();


  protected constructor(protected service: CommonService<T>) {
  }

  abstract reset(): void;

  abstract create(): T;

  newItem() {
    this.reset();
    this.item = this.create();
    this.opened = true;
  }

  onCancel() {
    this.opened = false;
  }

  onSubmit() {
    if (this.isSubmitGoing) {
      return;
    }
    this.isSubmitGoing = true;
    this.loading = true;
    this.service.create(this.item).toPromise().then(() => {
      const result = this.createSuccessMsg();
      this.created.emit(result);
    }, (err) => {
      const result = this.createErrorMsg();
      this.created.emit(result);
    }).finally(() => {
      this.loading = false;
      this.isSubmitGoing = false;
      this.opened = false;
    });
  }

  createSuccessMsg(msg?: string) {
    if (!msg) {
      return new EventResult(true, '添加资源:' + this.item.name + '成功');
    }
  }

  createErrorMsg(msg?: string) {
    if (!msg) {
      return new EventResult(true, '添加资源:' + this.item.name + '失败');
    }
  }
}
