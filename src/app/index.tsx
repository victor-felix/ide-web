/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { EditorPage } from './pages/EditorPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectConfigurationIdeTheme } from './pages/EditorPage/Features/Configurations/slice/selectors';
import themeDefined from 'styles/theme';

export function App() {
  const { i18n } = useTranslation();
  const selectedTheme = useSelector(selectConfigurationIdeTheme);
  return (
    <ThemeProvider theme={themeDefined(selectedTheme as PaletteMode)}>
      <CssBaseline />
      <BrowserRouter>
        <Helmet
          titleTemplate="%s"
          defaultTitle="My Java IDE"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="My Java IDE" />
        </Helmet>

        <Routes>
          <Route path="/" element={<EditorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <GlobalStyle theme={selectedTheme} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
