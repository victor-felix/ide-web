// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { ConfigurationState } from 'app/pages/EditorPage/Features/Configurations/slice/types';
import { EditorState } from 'app/pages/EditorPage/Features/Editor/slice/types';
import { TreeviewState } from 'app/pages/EditorPage/Features/Treeview/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  treeview?: TreeviewState;
  editor?: EditorState;
  configuration?: ConfigurationState;
}
