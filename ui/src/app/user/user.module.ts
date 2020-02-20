import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {UserListComponent} from './user-list/user-list.component';
import {CoreModule} from '../core/core.module';
import {UserService} from './user.service';
import {UserCreateComponent} from './user-create/user-create.component';
import {KoCommonModule} from '../ko-common/ko-commmon.module';
import { UserDeleteComponent } from './user-delete/user-delete.component';

@NgModule({
  declarations: [UserComponent, UserListComponent, UserCreateComponent, UserDeleteComponent],
  imports: [
    CommonModule,
    KoCommonModule,
    CoreModule
  ],
  providers: [UserService]
})
export class UserModule {
}
