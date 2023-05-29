/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const EditorPage = lazyLoad(
  () => import('./index'),
  module => module.EditorPage,
);
