import { defineConfig, presetUno } from 'unocss';
import presetTypography from '@unocss/preset-typography';
import transformerDirective from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
  theme: {
    containers: {
      xxs: '(min-width: 16rem)',
    },
    fontFamily: {
      sans: 'Open Sans, "Helvetica Neue", Roboto, Arial, sans-serif',
      landingPage: 'Outfit, Segoe UI,system-ui,-apple-system,sans-serif',
      mono: 'Monaco, SF Mono, Menlo, Consolas, "Courier Prime", Courier, "Courier New", monospace',
    },
    colors: {
      danger: '#eb6f6f',
      blue: {
        100: '#F2F8FD',
        200: '#D3E7F9',
        300: '#B5D6F4',
        400: '#89BDEE',
        500: '#539FE5',
        600: '#0972D3',
        700: '#065299',
        800: '#033160',
      },
      green: {
        100: '#F2FCF3',
        600: '#037F0C',
      },
      gray: {
        100: '#FBFBFB',
        150: '#F4F4F4',
        200: '#E9EBED',
        300: '#D1D5DB',
        400: '#9BA7B6',
        450: '#8D99A8',
        500: '#7D8998',
        550: '#5F6B7A',
        600: '#414D5C',
        750: '#192534',
        800: '#0F1B2A',
        900: '#000716',
      },
    },
  },
  presets: [presetUno(), presetTypography()],
  safelist: [
    // Here we add runtime-class safelist
  ],
  transformers: [transformerDirective(), transformerVariantGroup()],
});
