import {Component, OnInit, ViewChild} from '@angular/core';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserListComponent} from './user-list/user-list.component';
import {AlertDeleteComponent} from '../ko-common/component/alert-delete/alert-delete.component';
import {CommonItem} from '../ko-common/class/common-item';
import {User} from './user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(UserCreateComponent, {static: true})
  creation: UserCreateComponent;
  @ViewChild(UserListComponent, {static: true})
  listUser: UserListComponent;
  @ViewChild(AlertDeleteComponent, {static: true})
  deletion: AlertDeleteComponent;

  constructor() {
  }

  openAdd() {
    this.creation.newUser();
  }

  openDelete(items: CommonItem[]) {
    this.deletion.open(items);
  }

  postDelete() {
    this.listUser.confirmDelete();
  }

  postAdd() {
    this.refresh();
  }

  refresh() {
    this.listUser.listUser();
  }

  ngOnInit() {
  }

}
