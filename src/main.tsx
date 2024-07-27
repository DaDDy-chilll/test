import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { createTheme } from '@mui/material/styles';
import App from './App';
export const queryClient = new QueryClient();

export const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
      <App/>
    {/* </React.StrictMode> */}
 </QueryClientProvider>
)
