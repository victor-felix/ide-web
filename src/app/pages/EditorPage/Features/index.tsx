import * as React from 'react';
import { Grid, Tab, Tabs } from '@mui/material';
import { Folder, Settings } from '@mui/icons-material';
import { Treeview } from './Treeview';
import { Editor } from './Editor';
import { Configurations } from './Configurations';
import styled from 'styled-components';

export function Features() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container sx={{ height: 'calc(100vh - 48px)' }}>
      <Grid
        item
        xs="auto"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          sx={{ borderRight: 0, borderColor: 'divider' }}
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ sx: { left: 0, width: '4px' } }}
        >
          <Tab label={<Folder />} id="tab-0" aria-controls="panel-0" />
          <Tab label={<Settings />} id="tab-1" aria-controls="panel-1" />
        </Tabs>
      </Grid>
      <Grid item xs={9} md={3} lg={2} sx={{ overflow: 'auto' }}>
        <DivPanel hidden={value !== 0} id="panel-0" aria-labelledby="tab-0">
          {value === 0 && <Treeview />}
        </DivPanel>
        <DivPanel hidden={value !== 1} id="panel-1" aria-labelledby="tab-1">
          {value === 1 && <Configurations />}
        </DivPanel>
      </Grid>
      <Grid
        item
        xs={12}
        md
        lg
        sx={{ flexGrow: 1, pt: '5px', overflow: 'auto' }}
      >
        <Editor />
      </Grid>
    </Grid>
  );
}

const DivPanel = styled.div`
  padding: 10px;
`;
