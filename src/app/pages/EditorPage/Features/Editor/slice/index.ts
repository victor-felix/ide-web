import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { EditorState } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { File } from '../../Treeview/slice/types';
import { editorSaga } from './saga';

export const initialState: EditorState = {
  filesOpened: [],
  fileEditing: null,
  loading: false,
};

const slice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    getFile(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    openFile(state, action: PayloadAction<File>) {
      state.loading = false;
      state.filesOpened = [...state.filesOpened, action.payload];
      state.fileEditing = action.payload;
    },
    openFileError(state) {
      state.loading = false;
    },
    closeFile(state, action: PayloadAction<File>) {
      state.filesOpened = state.filesOpened.filter(
        file => file.id !== action.payload.id,
      );
    },
    saveFile(state, action: PayloadAction<File>) {
      state.loading = true;
    },
    fileSaved(state, action: PayloadAction<File>) {
      const fileIndex = state.filesOpened.findIndex(
        file => file.id !== action.payload.id,
      );
      const filesOpened = state.filesOpened;
      filesOpened[fileIndex] = action.payload;

      state.filesOpened = filesOpened;
      state.fileEditing = action.payload;
      state.loading = false;
    },
    saveFileError(state) {
      state.loading = false;
    },
    deleteFile(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    fileDeleted(state) {
      state.loading = false;
      state.fileEditing = null;
    },
    deleteFileError(state) {
      state.loading = false;
    },
  },
});

export const { actions: editorActions, reducer } = slice;

export const useEditorSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: editorSaga });
  return { actions: slice.actions };
};
