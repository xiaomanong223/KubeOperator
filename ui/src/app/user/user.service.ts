import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';
import {CommonService} from '../ko-common/class/common-service';

const userUrl = '/api/v1/users/';

@Injectable()
export class UserService extends CommonService<User> {
  baseUrl = '/api/v1/users/';

  constructor(http: HttpClient) {
    super(http);
  }

  active(user: User): Observable<User> {
    return this.http.patch<User>(userUrl + user.id + '/', {is_active: user.is_active});
  }
}
