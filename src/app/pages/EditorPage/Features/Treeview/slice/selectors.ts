import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.treeview || initialState;

export const selectFiletree = createSelector(
  [selectDomain],
  treeviewState => treeviewState.filetree,
);

export const selectFileSelected = createSelector(
  [selectDomain],
  treeviewState => treeviewState.fileSelected,
);

export const selectTreeviewLoading = createSelector(
  [selectDomain],
  treeviewState => treeviewState.loading,
);

export const selectTreeviewLoaded = createSelector(
  [selectDomain],
  treeviewState => treeviewState.loaded,
);

export const selectFoldersOpened = createSelector(
  [selectDomain],
  treeviewState => treeviewState.foldersOpened,
);
