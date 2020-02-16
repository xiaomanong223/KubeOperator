import {Injectable} from '@angular/core';
import {Host} from './host';
import {CommonService} from '../ko-common/class/common-service';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HostService extends CommonService<Host> {
  baseUrl = '/api/v1/hosts/';

  constructor(private h: HttpClient) {
    super(h);
  }


}
