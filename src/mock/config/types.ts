export interface Config {
  method: 'get' | 'post' | 'put' | 'delete';
  response: () => {};
}
