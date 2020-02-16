import {CommonItem} from '../ko-common/class/common-item';

export class Host extends CommonItem {
  id: string;
  name: string;
  ip: string;
  port: number;
  credential: string;
  connected: string;
  basic: Basic;
  volumes: Volume[] = [];
  gpus: GPU[] = [];
  conditions: Condition[] = [];
}

export class GPU {
  id: string;
  name: string;
}

export class Volume {
  id: string;
  name: string;
  size: string;
}

export class Condition {
  status: boolean;
  reason: string;
  type: string;
  last_time: string;
}

export class Basic {
  hostname: string;
  memory: string;
  cpu_core: number;
  os_distribution: string;
  os_distribution_version: string;
  architecture: string;
  kernel: string;
}
