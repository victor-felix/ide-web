import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
} from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectConfigurationEditorTheme,
  selectConfigurationFontSize,
  selectConfigurationIdeTheme,
  selectConfigurationShowLineNumbers,
  selectConfigurationTabSize,
} from './slice/selectors';
import { useConfigurationSlice } from './slice';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { messages } from '../../messages';

export function Configurations() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useConfigurationSlice();

  const fontSizes = [14, 15, 16, 17, 18, 19, 20, 21, 22];
  const ideThemes = ['light', 'dark'];
  const editorThemes = ['github', 'kuroir', 'dracula', 'monokai'];
  const editorTabSize = [2, 4];

  const selectedFontSize = useSelector(selectConfigurationFontSize);
  const selectedEditorTheme = useSelector(selectConfigurationEditorTheme);
  const selectedTabSize = useSelector(selectConfigurationTabSize);
  const showLineNumbers = useSelector(selectConfigurationShowLineNumbers);
  const selectedIdeTheme = useSelector(selectConfigurationIdeTheme);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <Typography
        variant="caption"
        component="p"
        align="center"
        sx={{ marginTop: '20px' }}
      >
        {t(messages.sectionEditor())}
      </Typography>
      <FormControl fullWidth size="small" margin="normal" variant="standard">
        <InputLabel id="font-size-select-label">
          {t(messages.fontSizeLabel())}
        </InputLabel>
        <Select
          labelId="font-size-select-label"
          id="font-size-select"
          value={String(selectedFontSize)}
          label={t(messages.fontSizeLabel())}
          onChange={(event: SelectChangeEvent) =>
            dispatch(actions.setFontSize(Number(event.target.value)))
          }
        >
          {fontSizes.map(size => (
            <MenuItem value={size} key={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" margin="normal" variant="standard">
        <InputLabel id="editor-theme-select-label">
          {t(messages.textEditorThemeLabel())}
        </InputLabel>
        <Select
          labelId="editor-theme-select-label"
          id="editor-theme-select"
          value={selectedEditorTheme}
          label={t(messages.textEditorThemeLabel())}
          onChange={(event: SelectChangeEvent) =>
            dispatch(actions.setEditorTheme(event.target.value))
          }
        >
          {editorThemes.map(theme => (
            <MenuItem value={theme} key={theme}>
              <StyledTypography>{theme}</StyledTypography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" margin="normal" variant="standard">
        <InputLabel id="tab-size-select-label">
          {t(messages.tabSizeLabel())}
        </InputLabel>
        <Select
          labelId="tab-size-select-label"
          id="tab-size-select"
          value={String(selectedTabSize)}
          label={t(messages.tabSizeLabel())}
          onChange={(event: SelectChangeEvent) =>
            dispatch(actions.setTabSize(Number(event.target.value)))
          }
        >
          {editorTabSize.map(size => (
            <MenuItem value={size} key={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography
        variant="caption"
        component="p"
        align="center"
        sx={{ marginTop: '20px' }}
      >
        {t(messages.sectionIde())}
      </Typography>
      <FormControl fullWidth size="small" margin="normal" variant="standard">
        <InputLabel id="editor-theme-select-label">
          {t(messages.modeLabel())}
        </InputLabel>
        <Select
          labelId="editor-theme-select-label"
          id="editor-theme-select"
          value={selectedIdeTheme}
          label={t(messages.modeLabel())}
          onChange={(event: SelectChangeEvent) =>
            dispatch(actions.setIDETheme(event.target.value))
          }
        >
          {ideThemes.map(theme => (
            <MenuItem value={theme} key={theme}>
              <StyledTypography>
                {t(messages.modeOption(theme))}
              </StyledTypography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" margin="normal" variant="standard">
        <InputLabel id="editor-theme-select-label">
          {t(messages.languageLabel())}
        </InputLabel>
        <Select
          labelId="editor-theme-select-label"
          id="editor-theme-select"
          value={i18n.language}
          label={t(messages.languageLabel())}
          onChange={(event: SelectChangeEvent) => {
            handleLanguageChange(event.target.value);
            dispatch(actions.setLanguage(event.target.value));
          }}
        >
          <MenuItem value="en-US">English</MenuItem>
          <MenuItem value="pt-BR">Português Brasileiro</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={showLineNumbers}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(actions.setShowLineNumbers(event.target.checked))
            }
          />
        }
        label={t(messages.showLineNumbersLabel())}
      />
    </div>
  );
}

const StyledTypography = styled(Typography)`
  text-transform: capitalize;
`;
