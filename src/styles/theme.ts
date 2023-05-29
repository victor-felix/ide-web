import { PaletteMode, createTheme } from '@mui/material';

export default function themeDefined(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 1,
          },
        },
      },
    },
  });
}
