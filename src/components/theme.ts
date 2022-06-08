import { createTheme, Theme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#144A6C',
    },
    secondary: {
      main: '#57C4C4',
    },
    grey: {
      '50': '#F9FAFB',
      '100': '#F3FAF6',
      '200': '#E5E7EB',
      '300': '#D1D5DB',
      '400': '#9CA3AF',
      '500': '#6B7280',
      '600': '#4B5563',
      '700': '#374151',
      '800': '#1F2937',
      '900': '#111827',
    },
  },
} as Theme);

export default theme;
