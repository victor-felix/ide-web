import { Config } from './types';

const filesConfig = {
  '/editor/files/:id': [
    {
      method: 'get',
      response: (schema, { params }) => {
        const { id } = params;
        return schema.db.files.findBy({ id });
      },
    },
    {
      method: 'put',
      response: (schema, { params, requestBody }) => {
        const { id } = params;
        return schema.db.files.update({ id }, JSON.parse(requestBody));
      },
    },
    {
      method: 'delete',
      response: (schema, { params }) => {
        const { id } = params;
        return schema.db.files.remove({ id });
      },
    },
  ] as Config[],
};

export default filesConfig;
