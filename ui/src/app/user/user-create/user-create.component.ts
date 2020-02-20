import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {Host} from '../../host/host';
import {Credential} from '../../credential/credential-list/credential';
import * as globals from '../../globals';
import {AlertLevels} from '../../base/header/components/common-alert/alert';
import {User} from '../user';
import {UserService} from '../user.service';
import {CommonCreateComponent} from '../../ko-common/class/common-create-component';
import {EventResult} from '../../ko-common/class/event-result';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent extends CommonCreateComponent<User> {
  @ViewChild('userForm', {static: true}) userFrom: NgForm;
  isPasswordMatch = true;
  isUserNameDuplicate = false;

  constructor(public service: UserService) {
    super(service);
  }

  reset() {
    this.isPasswordMatch = true;
    this.isUserNameDuplicate = false;
    this.userFrom.resetForm();
  }

  checkPassword() {
    this.isPasswordMatch = this.item.password === this.item.ensurePassword;
  }

  checkUsernameDuplicate() {
    this.service.list().subscribe(data => {
      data.some(u => {
        if (u.username === this.item.username) {
          this.isUserNameDuplicate = true;
          return;
        }
      });
    });
  }

  create(): User {
    return new User();
  }

  createSuccessMsg(msg?: string) {
    if (!msg) {
      return new EventResult(true, '添加资源:' + this.item.username + '成功');
    }
  }

  createErrorMsg(msg?: string) {
    if (!msg) {
      return new EventResult(true, '添加资源:' + this.item.username + '失败');
    }
  }
}
