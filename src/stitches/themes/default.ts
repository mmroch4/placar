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
import { createTheme } from "../config";

export const theme = createTheme({
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
});
