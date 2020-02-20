import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {AlertLevels} from '../../base/header/components/common-alert/alert';
import {CommonAlertService} from '../../base/header/common-alert.service';
import {CommonItem} from '../../ko-common/class/common-item';
import {CommonListComponent} from '../../ko-common/class/common-list-component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends CommonListComponent<User> {


  constructor(public service: UserService) {
    super(service);
  }

  toggleActiveUser(user: User) {
    this.service.active(user).subscribe(data => {
      user = data;
    });
  }
}
