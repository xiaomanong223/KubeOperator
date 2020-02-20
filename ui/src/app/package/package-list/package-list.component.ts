import {Component, ViewChild} from '@angular/core';
import {Package} from '../package';
import {PackageService} from '../package.service';
import {PackageDetailComponent} from '../package-detail/package-detail.component';
import {CommonListComponent} from '../../ko-common/class/common-list-component';

@Component({
  selector: 'app-offline-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent extends CommonListComponent<Package> {

  loading = true;

  constructor(service: PackageService) {
    super(service);
  }
}
