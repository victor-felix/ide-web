import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFileEditing } from './slice/selectors';
import AceEditor from 'react-ace';
import { debounce } from 'lodash';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

import { useEditorSlice } from './slice';
import { File } from '../Treeview/slice/types';
import {
  selectConfigurationEditorTheme,
  selectConfigurationFontSize,
  selectConfigurationShowLineNumbers,
  selectConfigurationTabSize,
} from '../Configurations/slice/selectors';
import { useTranslation } from 'react-i18next';
import { messages } from '../../messages';

export function Editor() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useEditorSlice();
  const fileEditing = useSelector(selectFileEditing);
  const configFontSize = useSelector(selectConfigurationFontSize);
  const configShowLineNumbers = useSelector(selectConfigurationShowLineNumbers);
  const configTabSize = useSelector(selectConfigurationTabSize);
  const configEditorTheme = useSelector(selectConfigurationEditorTheme);

  const debouncedOnChange = debounce((content: string) => {
    dispatch(actions.saveFile({ ...fileEditing, content } as File));
  }, 1000);

  const handleChange = (newContent: string) => {
    debouncedOnChange(newContent);
  };

  return (
    <AceEditor
      placeholder={t(messages.editorPlaceholder())}
      mode="java"
      theme={configEditorTheme}
      onChange={handleChange}
      editorProps={{ $blockScrolling: true }}
      value={(fileEditing && fileEditing.content) || ''}
      setOptions={{
        tabSize: configTabSize,
        showLineNumbers: configShowLineNumbers,
        fontSize: configFontSize,
      }}
      width="100%"
      height="100%"
    />
  );
}
