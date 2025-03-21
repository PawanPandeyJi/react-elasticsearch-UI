import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type RequestBooksData = {
  id: string;
  title: string;
  author: string;
  year: string;
  createdAt: string;
  updatedAt: string;
};

type AllBooksProps = {
  updateBookCount: (count: number) => void;
};

const AllBooks = ({ updateBookCount }: AllBooksProps) => {
  const [books, setBooks] = useState<RequestBooksData[]>([]);

  const getAllBooks = async () => {
    try {
      const response = await fetch("http://localhost:8080/books", {
        method: "GET",
      });
      const res_data = await response.json();
      if (response.ok) {
        setBooks(res_data);
        updateBookCount(res_data.length);
      }
    } catch (error) {
      console.log("getAllBooksAPI error", error);
    }
  };

  const handleDelete = async(id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getAllBooks();
      }
    } catch (error) {
      console.log("handleDeleteAPI error", error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);
  return (
    <>
      <div className="booksCard">
        {books?.map((books) => {
          return (
            <Card sx={{ width: 300, m: 2, boxShadow: 2 }} key={books.id}>
              <CardContent>
                <Typography variant="h6">{books.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {books.author}
                </Typography>
                <Typography variant="body2">Published: {books.year}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => handleDelete(books.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default AllBooks;
