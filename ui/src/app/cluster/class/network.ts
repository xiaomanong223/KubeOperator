import {Param} from './param';

export class Network {
  name: string;
  meta: NetworkMeta;
  vars: {} = {};

  constructor() {
    this.vars = {};
  }
}

export class NetworkMeta {
  name: string;
  vars: {} = {};
  params: Param[] = [];
}
