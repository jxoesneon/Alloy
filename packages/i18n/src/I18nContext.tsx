import { createContext } from "react";
import { I18nContextValue } from "./types.js";

export const I18nContext = createContext<I18nContextValue | undefined>(
  undefined,
);
