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
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";

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
  const [books, setBooks] = useState<RequestBooksData | null>();
  const [filter, setFilter] = useState({
    ID: false,
    Title: false,
    Author: false,
    Year: false,
  });
  const [allDataVisible, setAllDataVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("")
  const [inputFocus, setInputFocus] = useState(false)
  

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilter((prevValue) => ({
      ...prevValue,
      [name]: checked,
    }));
  };
  
  const auth = btoa("elastic:zuN6vQKTpdYzr5+KI17g");

  const getBooks = async () => {
    try {
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

const handleSearchSubmit = async(e) => {
    e.preventDefault()
    console.log(searchInput)
    try {
        const mustQueries = [];
    
        if (filter.ID) mustQueries.push({ match: { id: searchInput } });
        if (filter.Title) mustQueries.push({ match: { title: searchInput } });
        if (filter.Author) mustQueries.push({ match: { author: searchInput } });
        if (filter.Year) mustQueries.push({ match: { year: searchInput } });
    
        const query = mustQueries.length
          ? { bool: { should: mustQueries, minimum_should_match: 1 } }
          : { match: { title: searchInput } };
    
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
              query: query,
            }),
          }
        );
    
        const res_data = await response.json();
        if (response.ok) {
          setBooks(res_data);
        }
      } catch (error) {
        console.log("handleSearchSubmit error:", error);
      }
  }

  useEffect(() => {
    if (Object.values(filter).some((value) => value === true) || inputFocus) {
      setAllDataVisible(true);
      setBooks(null);
    } else {
      setAllDataVisible(false);
    }
  }, [filter,inputFocus]);

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
          <form onSubmit={handleSearchSubmit} style={{display: "flex", alignItems: "center",gap: "1rem"}}>
            <TextField
              fullWidth
              label="Search..."
              variant="outlined"
              value={searchInput}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
            <Button type="submit" variant="outlined" color="primary" sx={{marginBottom: 2,padding: "0.95rem" }}><Search/></Button>
          </form>
          <Typography variant="subtitle1">Filter By:</Typography>
          <FormControlLabel
            control={<Checkbox />}
            label="Title"
            name="Title"
            onChange={handleFilterChange}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Author"
            name="Author"
            onChange={handleFilterChange}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Year"
            name="Year"
            onChange={handleFilterChange}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="ID"
            name="ID"
            onChange={handleFilterChange}
          />
          <Button
            onClick={getBooks}
            variant="contained"
            disabled={allDataVisible}
          >
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
