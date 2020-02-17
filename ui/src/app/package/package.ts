import {CommonItem} from '../ko-common/class/common-item';

export class Package extends CommonItem {
  id: string;
  name: string;
  meta: PackageMeta;
  date_created: string;
  vars: {};
}

export class PackageMeta {
  cni: CniMeta[] = [];
  storage: StorageMeta[] = [];
  cluster: ClusterMeta;
}

export class CniMeta {
  name: string;
  vars: {};
}

export class StorageMeta {
  name: string;
  vars: {} = {};
}

export class ClusterMeta {
  vars: {} = {};
  roles: RoleMeta[] = [];
}

export class RoleMeta {
  name: string;
  vars: {} = {};
  requires: RoleRequire[] = [];
}

export class RoleRequire {
  name: string;
  minimal: number;
  excellent: number;
}
