import React from 'react';
import ReactDOM from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'

import App from './App'
import theme from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} /> 
    <App/>
</>);