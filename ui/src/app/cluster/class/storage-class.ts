import {Param} from './param';

export class StorageClass {
  name: string;
  vars: {} = {};
  meta: StorageMeta;
}

export class StorageMeta {
  name: string;
  vars: {} = {};
  params: Param[] = [];
}

