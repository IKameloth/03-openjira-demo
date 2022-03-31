import { ChangeEvent, FC, useContext, useMemo, useState } from "react"
import { GetServerSideProps } from 'next'
import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from "@mui/material";
import { dbEntries } from "../../database";
import { Layout } from "../../components/layouts";
import SaveIcon from "@mui/icons-material/Save";
import { Entry, EntryStatus } from "../../interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry
}

const EntryPage: FC<Props> = ({entry}) => {
  const { updateEntry } = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    }

    updateEntry(updatedEntry, true)
  }

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title="In:"  subheader={`Created ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`} />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New Entry"
                autoFocus
                multiline
                label="New Entry"
                value={ inputValue }
                onBlur={() => setTouched(true)}
                onChange={onInputValueChange}
                helperText={ isNotValid && 'Add new value'}
                error={ isNotValid }
              />

              {/* RADIO */}
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button startIcon={<SaveIcon />} variant="contained" fullWidth onClick={onSave} disabled={inputValue.length <= 0}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{position: 'fixed', bottom: 30, rigth: 30, backgroundColor: 'error.dark'}}>
        <DeleteIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;
