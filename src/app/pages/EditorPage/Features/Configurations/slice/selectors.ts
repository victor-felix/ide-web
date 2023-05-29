import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.configuration || initialState;

export const selectConfigurationFontSize = createSelector(
  [selectDomain],
  configurationState => configurationState.fontSize,
);

export const selectConfigurationShowLineNumbers = createSelector(
  [selectDomain],
  configurationState => configurationState.showLineNumbers,
);

export const selectConfigurationTabSize = createSelector(
  [selectDomain],
  configurationState => configurationState.tabSize,
);

export const selectConfigurationEditorTheme = createSelector(
  [selectDomain],
  configurationState => configurationState.editorTheme,
);

export const selectConfigurationIdeTheme = createSelector(
  [selectDomain],
  configurationState => configurationState.ideTheme,
);

export const selectConfigurationLanguage = createSelector(
  [selectDomain],
  configurationState => configurationState.language,
);
