export class Cluster {
  name: string;
  package: string;
  date_created: string;
  configs: {} = {};

  constructor() {
    this.configs['MAX_PODS'] = 110;
    this.configs['DOCKER_ADDR'] = '179.30.0.1/24';
    this.configs['STORAGE_DIR'] = '/var/lib/docker';
    this.configs['PROXY_MODE'] = 'iptables';
    this.configs['PROMETHEUS_RETENTION'] = '7';
  }
}
