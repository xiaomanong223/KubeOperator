import {Node} from './node';

export class Cluster {
  name: string;
  package: string;
  date_created: string;
  configs: {} = {};
  nodes: Node[] = [];

  constructor() {
    this.configs['MAX_PODS'] = 110;
    this.configs['DOCKER_ADDR'] = '179.30.0.1/24';
    this.configs['SERVICE_CIDR'] = '179.10.0.0/16';
    this.configs['CLUSTER_CIDR'] = '179.20.0.0/16';
    this.configs['STORAGE_DIR'] = '/var/lib/docker';
    this.configs['PROXY_MODE'] = 'iptables';
    this.configs['PROMETHEUS_RETENTION'] = '7';
  }
}
