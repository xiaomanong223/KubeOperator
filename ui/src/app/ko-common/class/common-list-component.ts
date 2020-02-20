import {EventEmitter, OnInit, Output} from '@angular/core';
import {CommonService} from './common-service';

export abstract class CommonListComponent<T> implements OnInit {

  items: T[] = [];
  selected: T[] = [];
  loading = false;
  @Output() add = new EventEmitter();
  @Output() delete = new EventEmitter<T[]>();
  @Output() detail = new EventEmitter<T>();


  protected constructor(protected service: CommonService<T>) {
  }

  ngOnInit(): void {
    this.listItems();
  }

  onAdd() {
    this.add.emit();
  }

  onDelete() {
    this.delete.emit(this.selected);
  }

  onDetail(item: T) {
    this.detail.emit(item);
  }

  refresh() {
    this.selected = [];
    this.listItems();
  }


  listItems() {
    this.loading = true;
    this.service.list().subscribe(data => {
      this.items = data;
      this.loading = false;
    });
  }


}
