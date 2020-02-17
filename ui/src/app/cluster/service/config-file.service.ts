import {Injectable} from '@angular/core';
import {CommonService} from '../../ko-common/class/common-service';
import {HttpClient} from '@angular/common/http';
import {ConfigFile} from '../class/config-file';

@Injectable({
  providedIn: 'root'
})
export class ConfigFileService extends CommonService<ConfigFile> {
  baseUrl = '/api/v1/config/';

  constructor(http: HttpClient) {
    super(http);
  }
}
