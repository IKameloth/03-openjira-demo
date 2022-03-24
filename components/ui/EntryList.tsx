import { FC, useContext, useMemo, DragEvent } from "react";
import { List, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";
import { EntriesContext } from "../../context/entries";
import { UIContext } from '../../context/ui';
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, toggleDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
    const entry = entries.find( e => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    toggleDragging(false);
  }

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: 1,
        }}
      >
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
