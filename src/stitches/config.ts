import {
  amber,
  blackA,
  blue,
  bronze,
  brown,
  crimson,
  gold,
  gray,
  green,
  pink,
  plum,
  purple,
  red,
  yellow,
} from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const {
  styled,
  getCssText,
  createTheme,
  globalCss,
  config,
  css,
  keyframes,
  prefix,
  reset,
  theme,
} = createStitches({
  theme: {
    colors: {
      ...gray,
      ...green,
      ...red,
      ...blue,
      ...blackA,
      ...yellow,
      ...amber,
      ...bronze,
      ...brown,
      ...gold,
      ...crimson,
      ...pink,
      ...plum,
      ...purple,
    },
  },
});
