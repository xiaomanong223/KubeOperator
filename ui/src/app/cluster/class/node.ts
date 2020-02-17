export class Node {
  host: string;
  name: string;
  roles: {} = {
    'master': false,
    'worker': false,
    'router': false,
    'loadblancer': false
  };
}
