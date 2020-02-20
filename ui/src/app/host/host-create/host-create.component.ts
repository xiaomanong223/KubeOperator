import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Host} from '../host';
import {HostService} from '../host.service';
import {Credential} from '../../credential/credential-list/credential';
import {CredentialService} from '../../credential/credential.service';
import {NgForm} from '@angular/forms';
import {CommonAlertService} from '../../base/header/common-alert.service';
import {AlertLevels} from '../../base/header/components/common-alert/alert';
import * as globals from '../../globals';
import {SettingService} from '../../setting/setting.service';
import {CommonCreateComponent} from '../../ko-common/class/common-create-component';


@Component({
  selector: 'app-host-create',
  templateUrl: './host-create.component.html',
  styleUrls: ['./host-create.component.css']
})
export class HostCreateComponent extends CommonCreateComponent<Host> {


  constructor(service: HostService, private credentialService: CredentialService) {
    super(service);
  }

  credentials: Credential[] = [];
  @ViewChild('hostForm', {static: true}) hostFrom: NgForm;
  name_pattern = globals.host_name_pattern;
  name_pattern_tip = globals.host_name_pattern_tip;


  listCredential() {
    this.credentialService.listCredential().subscribe(data => {
      this.credentials = data;
    });
  }

  reset() {
    this.listCredential();
    this.hostFrom.resetForm();
  }

  create(): Host {
    return new Host();
  }
}
