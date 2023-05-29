import { File } from '../../Treeview/slice/types';

export interface EditorState {
  loading: boolean;
  fileEditing: File | null;
  filesOpened: File[];
}
