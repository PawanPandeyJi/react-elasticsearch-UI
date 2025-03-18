import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddBookForm = () => {
  const [book, setBook] = useState({ title: "", author: "", year: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      const res_data = response.json();
      if (response.ok) {
        console.log("Book added", res_data);
      }
      console.log("Book added", book);
      setBook({ title: "", author: "", year: "" });
    } catch (error) {
      console.log("Form submit error", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add a New Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={book.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Author"
          name="author"
          fullWidth
          margin="normal"
          value={book.author}
          onChange={handleChange}
          required
        />
        <TextField
          label="Year"
          name="year"
          type="number"
          fullWidth
          margin="normal"
          value={book.year}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Add Book
        </Button>
      </form>
    </Box>
  );
};

export default AddBookForm;
