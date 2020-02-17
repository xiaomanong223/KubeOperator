import {CommonItem} from '../ko-common/class/common-item';

export class User extends CommonItem {
  name: string;
  username: string;
  password: string;
  ensurePassword: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
}
