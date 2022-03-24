import { FC, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4, v4 } from "uuid";
import { NewEntry } from "../../components/ui/NewEntry";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INIT_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "Esto es una descripcion default 1",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "Esto es una descripcion default 2",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: "Esto es una descripcion default 3",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INIT_STATE);

  const addNewEntry = (description: string) => {
    const NewEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "[Entry] Add-Entry", payload: NewEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] ENTRY-UPDATE", payload: entry})
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        // methods
        addNewEntry,
        updateEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
