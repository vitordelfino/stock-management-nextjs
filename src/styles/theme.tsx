import { extendTheme } from '@chakra-ui/react';

const fonts = { mono: `'Menlo', monospace` };

// const breakpoints = createBreakpoints({
//   sm: '40em',
//   md: '52em',
//   lg: '64em',
//   xl: '80em',
// })

const theme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'purple.900',
      },
    },
    Text: {
      baseStyle: {
        color: 'purple.900',
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'purple.800',
      },
    },
    Button: {
      baseStyle: {
        textTransform: 'uppercase',
        borderRadius: 'base',
      },
      variants: {
        outline: {
          border: '2px solid',
          borderColor: 'purple.800',
          color: 'purple.800',
          _hover: {
            borderColor: 'purple.900',
            color: 'purple.900',
            bg: 'transparent',
          },
        },
        solid: {
          bg: 'purple.800',
          color: 'white',
          _hover: {
            bg: 'purple.900',
          },
        },
      },
      // The default size and variant values
      defaultProps: {
        variant: 'solid',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'purple.50',
        color: 'black.50',
        // fontFamily: 'Noto Sans JP, sans-serif',
        fontFamily: 'Montserrat, sans-serif',
      },
    },
  },
  fonts,
  // breakpoints,
});

export default theme;
