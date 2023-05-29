import { createServer } from 'miragejs';
import filesConfig from './config/files';
import filetreeConfig from './config/filetree';
import filetreeData from './data/filetree.json';
import filesData from './data/files.json';
import { Config } from './config/types';

export function startMockServer() {
  const passThrough = process.env.REACT_APP_API_BASE_URL
    ? process.env.REACT_APP_API_BASE_URL + '/**'
    : '*';

  const server = createServer({
    routes() {
      this.passthrough(passThrough);
      const routesConfig = {
        ...filesConfig,
        ...filetreeConfig,
      };

      for (const route in routesConfig) {
        const routeConfigs: Config[] = routesConfig[route];
        routeConfigs.map(routeConfig => {
          return this[routeConfig.method](route, routeConfig.response);
        });
      }
    },
  });

  server.db.loadData(Object.assign(filetreeData, filesData));

  return server;
}
