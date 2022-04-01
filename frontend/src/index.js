import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <ColorModeScript initialColorMode='light' />
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root')
);