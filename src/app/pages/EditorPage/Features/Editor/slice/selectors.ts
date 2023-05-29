import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.editor || initialState;

export const selectEditorFilesOpened = createSelector(
  [selectDomain],
  editorState => editorState.filesOpened,
);

export const selectEditorLoading = createSelector(
  [selectDomain],
  editorState => editorState.loading,
);

export const selectFileEditing = createSelector(
  [selectDomain],
  editorState => editorState.fileEditing,
);
