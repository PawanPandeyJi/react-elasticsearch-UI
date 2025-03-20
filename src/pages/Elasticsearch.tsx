import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import "../App.css";
import { useState } from "react";

type RequestBooksData = {
  took: number;
  hits: {
    hits: [
      {
        _source: {
          id: string;
          title: string;
          author: string;
          year: string;
        };
      }
    ];
    total: {
      value: number;
    };
  };
};

const Elasticsearch = () => {
  const [books, setBooks] = useState<RequestBooksData>();

  const getBooks = async () => {
    try {
      const auth = btoa("elastic:zuN6vQKTpdYzr5+KI17g");
      const response = await fetch(
        "https://localhost:9200/books_index/_search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify({
            size: 1000,
            query: {
              match_all: {},
            },
          }),
        }
      );

      const res_data = await response.json();
      if (response.ok) {
        setBooks(res_data);
      }
    } catch (error) {
      console.log("getBooks by elasticSearch error:", error);
    }
  };
  const allBooks = books?.hits.hits;

  return (
    <Grid container spacing={3} sx={{ height: "93vh", padding: 3 }}>
      <Grid item xs={12} md={4} sx={{ height: "100%" }}>
        <Paper
          sx={{
            padding: 3,
            borderRadius: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Search Elasticsearch
          </Typography>
          <TextField
            fullWidth
            label="Search..."
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="subtitle1">Filter By:</Typography>
          <FormControlLabel control={<Checkbox />} label="Title" />
          <FormControlLabel control={<Checkbox />} label="Author" />
          <FormControlLabel control={<Checkbox />} label="Year" />
          <FormControlLabel control={<Checkbox />} label="ID" />
          <Button onClick={getBooks} variant="contained">
            All Datas
          </Button>
          <Typography variant="h6" mt={2}>
            Time taken for the search:{" "}
            {`${books?.took ? `${books?.took}ms` : ""}`} <br />
            Total data searched: {books?.hits.total.value}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8} sx={{ height: "100%" }}>
        <Paper
          sx={{
            padding: 3,
            borderRadius: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Search Results
          </Typography>
          <List sx={{ flexGrow: 1, overflowY: "auto" }} className="esBooks">
            {allBooks?.map((books, index) => {
              return (
                <ListItem divider key={books._source.id}>
                  <ListItemText
                    primary={`${index + 1}. ${books._source.title}`}
                    secondary={`${books._source.author} | ${books._source.year}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Elasticsearch;
