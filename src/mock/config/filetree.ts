import { Config } from './types';

const filetreeConfig = {
  '/editor/filetree': [
    {
      method: 'get',
      response: schema => schema.db.filetree,
    },
  ] as Config[],
};

export default filetreeConfig;
