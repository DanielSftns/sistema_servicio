import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  styles: {
    global: {
      'div.chakra-form-control': {
        mb: 2,
        ':nth-last-of-type(1)': {
          mb: 12
        }
      },
      '#chakra-toast-manager-top-right': {
        transform: 'translateY(60px)'
      }
    }
  },
}, withDefaultColorScheme({ colorScheme: 'blue' }),)

ReactDOM.render(
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);