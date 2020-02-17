import {Component, OnInit, ViewChild} from '@angular/core';
import {Package} from '../../package/package';
import {PackageService} from '../../package/package.service';
import {ClrWizard} from '@clr/angular';
import {Cluster} from '../class/cluster';
import {Node} from '../class/node';
import {HostService} from '../../host/host.service';
import {Host} from '../../host/host';
import {ConfigFile} from '../class/config-file';
import {ConfigFileService} from '../service/config-file.service';
import {Role} from '../../node/role';
import {NodeEmitterVisitor} from '@angular/compiler-cli/src/transformers/node_emitter';
import {StorageClass} from '../class/storage-class';
import {Network} from '../class/network';
import {App} from '../class/app';

@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: ['./cluster-create.component.css']
})
export class ClusterCreateComponent implements OnInit {

  constructor(private packageService: PackageService, private hostService: HostService,
              private configService: ConfigFileService) {
  }

  @ViewChild('wizard', {static: true}) wizard: ClrWizard;
  opened = true;
  packages: Package[] = [];
  hosts: Host[] = [];
  nodes: Node[] = [];
  storageClazz: StorageClass[] = [];
  apps: App[] = [];
  netWork = {};
  networkMetas = [];
  storageMetas = [];
  nodeSize = 0;
  storageSize = 0;
  clusterConfig: ConfigFile = new ConfigFile();
  appConfig: ConfigFile = new ConfigFile();
  cluster: Cluster = new Cluster();

  ngOnInit() {
    this.open();
  }

  open() {
    this.clear();
    this.cluster = new Cluster();
  }

  clear() {
    this.wizard.reset();
    this.listPackages();
    this.listHosts();
    this.getClusterConfig();
    this.getNetworkConfig();
    this.getStorageConfig();
    this.getAppConfig();
    this.generateDefaultStorageClazz();
  }

  generateDefaultApps() {
    for (const appMeta of this.appConfig['meta']['items']) {
      const app = new App();
      app.name = appMeta['name'];
      app.describe = appMeta['describe'];
      app.require = appMeta['require'];
      app.install = appMeta['require'];
      app.logo = appMeta['logo'];
      app.vars = appMeta['vars'];
      app.url_key = appMeta['url_key'];
      this.apps.push(app);
    }
  }


  generateDefaultNodes() {
    for (const roleMeta of this.clusterConfig['meta']['roles']) {
      const node = new Node();
      node.name = 'node-' + (this.nodeSize + 1);
      node.roles[roleMeta['name']] = true;
      this.nodes.push(node);
      this.nodeSize++;
    }
  }

  generateDefaultStorageClazz() {
    const storage = new StorageClass();
    storage.name = 'StorageClass-' + (this.storageSize + 1);
    this.storageClazz.push(storage);
    this.storageSize += 1;
  }

  deleteStorageClass(sc: StorageClass) {
    this.storageClazz.splice(this.storageClazz.indexOf(sc), 1);
    this.storageSize--;
    this.reSortStorage();
  }

  addStorageClass() {
    const storage = new StorageClass();
    storage.name = 'StorageClass-' + (this.storageSize + 1);
    this.storageClazz.push(storage);
    this.storageSize++;
  }

  reSortStorage() {
    for (let i = 0; i < this.storageClazz.length; i++) {
      this.storageClazz[i].name = 'StorageClass-' + (i + 1);
    }
  }


  deleteNode(node: Node) {
    this.nodes.splice(this.nodes.indexOf(node), 1);
    this.nodeSize--;
    this.reSortNode();
  }

  addNode() {
    const node = new Node();
    node.name = 'node-' + (this.nodeSize + 1);
    this.nodes.push(node);
    this.nodeSize++;
  }

  reSortNode() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].name = 'node-' + (i + 1);
    }
  }

  listPackages() {
    this.packageService.list().subscribe(data => {
      this.packages = data;
    });
  }

  listHosts() {
    this.hostService.list().subscribe(data => {
      this.hosts = data;
    });
  }

  getNetworkConfig() {
    this.configService.get('network').subscribe(data => {
      data['meta']['items'].forEach(network => {
        this.networkMetas.push(network);
      });
    });
  }

  getStorageConfig() {
    this.configService.get('storage').subscribe(data => {
      data['meta']['items'].forEach(storage => {
        this.storageMetas.push(storage);
      });
    });
  }

  getAppConfig() {
    this.configService.get('application').subscribe(data => {
      this.appConfig = data;
      this.generateDefaultApps();
    });
  }

  getClusterConfig() {
    this.configService.get('cluster').subscribe(data => {
      this.clusterConfig = data;
      this.generateDefaultNodes();
    });
  }


}
