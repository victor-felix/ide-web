import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TreeViewNode, TreeviewState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { treeviewSaga } from './saga';

export const initialState: TreeviewState = {
  fileSelected: null,
  loading: false,
  loaded: false,
  filetree: [
    {
      id: 0,
      name: 'editor',
      isDirectory: true,
    },
  ],
  foldersOpened: [],
};

const slice = createSlice({
  name: 'treeview',
  initialState,
  reducers: {
    loadTreeview(state) {
      state.loading = true;
    },
    treeviewLoaded(state, action: PayloadAction<TreeViewNode[]>) {
      state.loading = false;
      state.loaded = true;
      if (action.payload.length > 0) {
        state.filetree = action.payload;
      }
    },
    treeviewLoadError(state) {
      state.loading = false;
    },
    selectFile(state, action: PayloadAction<TreeViewNode>) {
      state.fileSelected = action.payload;
    },
    openFolder(state, action: PayloadAction<string>) {
      state.foldersOpened = [...state.foldersOpened, action.payload];
    },
    closeFolder(state, action: PayloadAction<string>) {
      state.foldersOpened = state.foldersOpened.filter(
        folder => folder !== action.payload,
      );
    },
    deleteChild(state, action: PayloadAction<number>) {
      const deleteNodeById = (treeview: TreeViewNode[], targetId: number) => {
        for (let i = 0; i < treeview.length; i++) {
          const item = treeview[i];
          if (item.id === targetId) {
            treeview.splice(i, 1);
            return true;
          } else if (item.children && item.children.length > 0) {
            if (deleteNodeById(item.children, targetId)) {
              return true;
            }
          }
        }
        return false;
      };

      let newStateFileTree = JSON.parse(JSON.stringify(state.filetree));
      deleteNodeById(newStateFileTree, Number(action.payload));
      state.filetree = newStateFileTree;
      state.fileSelected = null;
    },
  },
});

export const { actions: treeviewActions, reducer } = slice;

export const useTreeviewSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: treeviewSaga });
  return { actions: slice.actions };
};
