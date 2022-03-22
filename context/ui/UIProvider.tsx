import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
}

const UI_INIT_STATE: UIState = {
  sidemenuOpen: false,
};

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INIT_STATE);

  const openSideMenu = () => dispatch({ type: "UI_OPEN_SIDEBAR" });

  const closeSideMenu = () => dispatch({ type: "UI_CLOSE_SIDEBAR" });

  return (
    <UIContext.Provider
      value={{
        ...state,
        // methods
        openSideMenu,
        closeSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
