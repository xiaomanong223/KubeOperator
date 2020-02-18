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
import {StorageClass} from '../class/storage-class';
import {ClusterService} from '../cluster.service';
import {NgForm} from '@angular/forms';
import {Network} from '../class/network';
import {CommonAlertService} from '../../base/header/common-alert.service';
import {AlertLevels} from '../../base/header/components/common-alert/alert';

@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: ['./cluster-create.component.css']
})
export class ClusterCreateComponent implements OnInit {

  constructor(private packageService: PackageService, private hostService: HostService,
              private configService: ConfigFileService,
              private clusterService: ClusterService,
              private alert: CommonAlertService) {
  }

  @ViewChild('wizard', {static: true}) wizard: ClrWizard;
  opened = false;
  isOnSubmitGoing = false;
  packages: Package[] = [];
  hosts: Host[] = [];
  nodes: Node[] = [];
  storageClazz: StorageClass[] = [];
  netWork: Network = new Network();
  networkMetas = [];
  storageMetas = [];
  nodeSize = 0;
  storageSize = 0;
  clusterConfig: ConfigFile = new ConfigFile();
  cluster: Cluster = new Cluster();
  isNameDuplicate = false;

  // forms
  @ViewChild('basicForm', {static: true}) basicForm: NgForm;
  @ViewChild('nodeForm', {static: true}) nodeForm: NgForm;
  @ViewChild('storageForm', {static: true}) storageForm: NgForm;
  @ViewChild('networkForm', {static: true}) networkForm: NgForm;


  ngOnInit() {
  }

  newCluster() {
    this.clear();
    this.opened = true;
  }

  clear() {
    this.resetForms();
    this.wizard.reset();
    this.networkMetas = [];
    this.storageMetas = [];
    this.nodes = [];
    this.storageClazz = [];
    this.netWork = new Network();
    this.cluster = new Cluster();
    this.listPackages();
    this.listHosts();
    this.getClusterConfig();
    this.getNetworkConfig();
    this.getStorageConfig();
    this.generateDefaultStorageClazz();
  }

  roleSum(role: string): number {
    let result = 0;
    this.nodes.forEach(node => {
      if (node.roles[role]) {
        ++result;
      }
    });
    return result;
  }

  onSubmit() {
    if (this.isOnSubmitGoing) {
      return;
    }
    this.isOnSubmitGoing = true;
    this.fullCluster();
    this.clusterService.create(this.cluster).subscribe(() => {
      this.opened = false;
      this.isOnSubmitGoing = false;
      this.alert.showAlert('创建集群成功！', AlertLevels.SUCCESS);
    });
  }

  fullCluster() {
    this.handleNodes();
    this.handleStorageClass();
    this.handleNetwork();
  }

  handleNodes() {
    this.cluster.nodes = this.nodes;
  }

  handleStorageClass() {
    for (const storage of this.storageClazz) {
      const vars = {};
      Object.assign(vars, storage.vars, storage.meta.vars);
      for (const key in vars) {
        if (key) {
          this.cluster.configs['key'] = vars['key'];
        }
      }
    }
  }

  handleNetwork() {
    const vars = {};
    Object.assign(vars, this.netWork.vars, this.netWork.meta.vars);
    for (const key in vars) {
      if (key) {
        this.cluster.configs['key'] = vars['key'];
      }
    }
  }

  resetForms() {
    const forms: NgForm[] = [this.basicForm, this.nodeForm, this.storageForm, this.networkForm];
    forms.forEach(form => {
      form.resetForm();
    });
  }

  nameDuplicateChecker() {
    this.clusterService.get(this.cluster.name).subscribe(() => {
      this.isNameDuplicate = true;
    }, () => {
      this.isNameDuplicate = false;
    });
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

  getClusterConfig() {
    this.configService.get('cluster').subscribe(data => {
      this.clusterConfig = data;
      this.generateDefaultNodes();
    });
  }


}
