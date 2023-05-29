import * as React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import { FaJava } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectFileEditing } from 'app/pages/EditorPage/Features/Editor/slice/selectors';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

export function EditorBar() {
  const { t } = useTranslation();
  const file = useSelector(selectFileEditing);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid
          container
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <FaJava fontSize={30} />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography align="center">
              {file ? file.name : t(messages.applicationName())}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Typography align="right" variant="caption">
              v0.1
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
