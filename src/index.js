import React from 'react';
import ReactDOM from 'react-dom';
import 'sweetalert2/dist/sweetalert2.min.css'
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
  components: {
    Container: {
      baseStyle: {
        maxW:'container.md'
      }
    },
    Spinner: {
      baseStyle: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'blue.500',
      },
      defaultProps: {
        size: 'xl',
      }
    }
  }
},
withDefaultColorScheme({ colorScheme: 'blue' }))

ReactDOM.render(
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);