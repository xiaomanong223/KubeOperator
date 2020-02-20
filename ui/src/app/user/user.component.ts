import {Component, OnInit, ViewChild} from '@angular/core';
import {UserCreateComponent} from './user-create/user-create.component';
import {User} from './user';
import {UserDeleteComponent} from './user-delete/user-delete.component';
import {CommonAlertService} from '../base/header/common-alert.service';
import {EventResult} from '../ko-common/class/event-result';
import {AlertLevels} from '../base/header/components/common-alert/alert';
import {CommonItemComponent} from '../ko-common/class/common-item-component';
import {UserListComponent} from './user-list/user-list.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends CommonItemComponent<User> {

  @ViewChild(UserCreateComponent, {static: true})
  creation: UserCreateComponent;
  @ViewChild(UserListComponent, {static: true})
  list: UserListComponent;
  @ViewChild(UserDeleteComponent, {static: true})
  deletion: UserDeleteComponent;

  constructor(public alert: CommonAlertService) {
    super(alert);
  }
}
