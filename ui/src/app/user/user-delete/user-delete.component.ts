import {Component, OnInit} from '@angular/core';
import {CommonDeleteComponent} from '../../ko-common/class/common-delete-component';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent extends CommonDeleteComponent<User> {

  constructor(userService: UserService) {
    super(userService);
  }
}
