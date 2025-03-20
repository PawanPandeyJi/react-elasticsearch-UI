import { TextField, FormControlLabel, Checkbox, Grid, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const Elasticsearch = () => {
  return (
    <Grid container spacing={3} sx={{ height: "93vh", padding: 3 }}>
      <Grid item xs={12} md={4} sx={{ height: "100%" }}>
        <Paper sx={{ padding: 3, borderRadius: 2, height: "100%", display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" gutterBottom>Search Elasticsearch</Typography>
          <TextField fullWidth label="Search..." variant="outlined" sx={{ marginBottom: 2 }} />
          <Typography variant="subtitle1">Filter By:</Typography>
          <FormControlLabel control={<Checkbox />} label="Title" />
          <FormControlLabel control={<Checkbox />} label="Author" />
          <FormControlLabel control={<Checkbox />} label="Year" />
          <FormControlLabel control={<Checkbox />} label="ID" />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8} sx={{ height: "100%" }}>
        <Paper sx={{ padding: 3, borderRadius: 2, height: "100%", display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" gutterBottom>Search Results</Typography>
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            <ListItem divider>
              <ListItemText primary="Sample Book" secondary="Author: John Doe | Year: 2021 | ID: 1" />
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Another Book" secondary="Author: Jane Smith | Year: 2020 | ID: 2" />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Elasticsearch;
