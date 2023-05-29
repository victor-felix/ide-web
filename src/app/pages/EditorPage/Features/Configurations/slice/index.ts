import { useInjectReducer } from 'redux-injectors';
import { ConfigurationState } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState: ConfigurationState = {
  editorTheme: 'github',
  ideTheme: 'light',
  fontSize: 16,
  showLineNumbers: true,
  tabSize: 2,
  language: 'en',
};

const slice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setEditorTheme: (state, action: PayloadAction<string>) => {
      state.editorTheme = action.payload;
    },
    setIDETheme: (state, action: PayloadAction<string>) => {
      state.ideTheme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    setShowLineNumbers: (state, action: PayloadAction<boolean>) => {
      state.showLineNumbers = action.payload;
    },
    setTabSize: (state, action: PayloadAction<number>) => {
      state.tabSize = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { actions: configurationActions, reducer } = slice;

export const useConfigurationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
