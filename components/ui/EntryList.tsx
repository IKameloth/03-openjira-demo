import { List, Paper } from "@mui/material"
import { EntryCard } from './';


export const EntryList = () => {
  return (
      // TODO: aqui haremos drop
    <div>
        <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: 1 }}>
            {/* Todo: cambiara dependiendo del drag and drop */}
            <List sx={{ opacity: 1 }}>
                <EntryCard />
            </List>            
        </Paper>
    </div>
  )
}
