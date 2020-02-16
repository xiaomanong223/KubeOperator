import {Component, OnInit} from '@angular/core';
import {HostService} from '../host.service';
import {Host} from '../host';

@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.css']
})
export class HostDetailComponent implements OnInit {

  item: Host = new Host;
  loading = false;
  opened = false;

  constructor(private hostService: HostService) {
  }

  ngOnInit() {
  }

  clear() {
    this.item = new Host;
  }

  open(item: Host) {
    this.item = item;
    this.opened = true;
  }

  onRefresh() {
    this.loading = true;
    this.hostService.get(this.item.name).subscribe(data => {
      this.loading = false;
      this.item = data;
    });
  }

  onCancel() {
    this.opened = false;
  }


}
