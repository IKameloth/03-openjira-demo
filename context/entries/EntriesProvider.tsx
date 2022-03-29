import { FC, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
// import { v4 as uuidv4, v4 } from "uuid";
import { NewEntry } from "../../components/ui/NewEntry";
import { entriesApi } from "../../apis";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INIT_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INIT_STATE);

  const addNewEntry = async (description: string) => {
    // const NewEntry: Entry = {
    //   _id: uuidv4(),
    //   description,
    //   createdAt: Date.now(),
    //   status: "pending",
    // };
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async({_id, description, status}: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status});
      dispatch({ type: "[Entry] ENTRY-UPDATE", payload: data });
    } catch (err) {
      
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] REFRESH-DATA", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        // methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
