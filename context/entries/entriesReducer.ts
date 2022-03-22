import { EntriesState } from "./";

type EntriesActionType = {
  type: "ENTRIES_ACTION";
};

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    // case "ENTRIES_ACTION":
    //     return{
    //         ...state
    //     }
    default:
      return state;
  }
};
