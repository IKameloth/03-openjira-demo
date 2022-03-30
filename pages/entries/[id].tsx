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
import { Layout } from "../../components/layouts";
import SaveIcon from "@mui/icons-material/Save";
import { EntryStatus } from "../../interfaces";
import DeleteIcon from "@mui/icons-material/Delete";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

const EntryPage = () => {
  return (
    <Layout title="...">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title="In" subheader={`Created ... ago`} />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New Entry"
                multiline
                label="New Entry"
              />

              {/* RADIO */}
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row>
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
              <Button startIcon={<SaveIcon />} variant="contained" fullWidth>
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

export default EntryPage;
