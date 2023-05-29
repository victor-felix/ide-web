export interface File {
  id: number;
  name: string;
  content: string;
}

export interface TreeViewNode {
  id: number;
  name: string;
  isDirectory: boolean;
  children?: TreeViewNode[];
}

export interface TreeviewState {
  loading: boolean;
  loaded: boolean;
  fileSelected: TreeViewNode | null;
  filetree: TreeViewNode[];
  foldersOpened: string[];
}
