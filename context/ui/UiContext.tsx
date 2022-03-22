import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
}

export const UiContext = createContext({} as ContextProps);
