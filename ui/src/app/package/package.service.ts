import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Package} from './package';
import {CommonService} from '../ko-common/class/common-service';

@Injectable()
export class PackageService extends CommonService<Package> {
  baseUrl = 'api/v1/packages/';

  constructor(http: HttpClient) {
    super(http);
  }
}
