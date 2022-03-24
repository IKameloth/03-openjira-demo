import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  // methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  toggleDragging: (isToggleDragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
