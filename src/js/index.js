import React from 'react';
import { render } from 'react-dom';
import { App } from './App.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { globalStyles } from './globalStyles.js';

// Apply app wide styles here (http://www.material-ui.com/#/customization/themes)
const muiTheme = createMuiTheme(globalStyles);

const StyledApp = () => (
  <MuiThemeProvider theme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

render(<StyledApp />, document.getElementById('root'));
