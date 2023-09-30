// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const theme = extendTheme({
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },
    components: {
      Button: {
        baseStyle: {
          _hover: {
            bg: 'teal.500', // Set the hover background color to teal
            color: 'white', // Set the text color on hover
          },
        },
      },
    },
  })

export default theme