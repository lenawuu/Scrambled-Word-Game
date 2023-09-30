import React from 'react';
import { 
    ChakraProvider
 } from '@chakra-ui/react'
import Home from './components/Home'
import theme from './theme'

const App = () => {
    return(
        <ChakraProvider theme={theme}>
            <Home/>
        </ChakraProvider>
    )
}

export default App