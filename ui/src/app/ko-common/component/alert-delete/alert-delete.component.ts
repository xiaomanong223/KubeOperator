import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonItem} from '../../class/common-item';
import {Items} from '@clr/angular/data/datagrid/providers/items';
import {Item} from '../../../item/item';

@Component({
  selector: 'app-alert-delete',
  templateUrl: './alert-delete.component.html',
  styleUrls: ['./alert-delete.component.css']
})
export class AlertDeleteComponent implements OnInit {

  constructor() {
  }

  opened = false;
  items: CommonItem[] = [];
  @Output() submit = new EventEmitter();

  ngOnInit() {
  }

  clear() {
    this.items = [];
  }

  open(items: CommonItem[]) {
    this.items = items;
    this.opened = true;
  }

  onCancel() {
    this.clear();
    this.opened = false;
  }

  onSubmit() {
    this.submit.emit();
    this.opened = false;
  }
}
