import { UIState } from "./";

type UIActionType =
  | {
      type: "UI_OPEN_SIDEBAR";
    }
  | {
      type: "UI_CLOSE_SIDEBAR";
    }
  | {
      type: "UI_SET_ENTRY";
      payload: boolean;
    }
  | {
      type: "UI_TOGGLE_DRAGGING";
      payload: boolean;
    };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI_OPEN_SIDEBAR":
      return {
        ...state,
        sidemenuOpen: true,
      };
    case "UI_CLOSE_SIDEBAR":
      return {
        ...state,
        sidemenuOpen: false,
      };
    case "UI_SET_ENTRY":
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case "UI_TOGGLE_DRAGGING":
      return {
        ...state,
        isDragging: action.payload
      }
    default:
      return state;
  }
};
