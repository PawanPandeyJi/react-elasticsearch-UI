import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/books/${id}`, {
        method: "DELETE",
      });
      const res_data = await response.json()
      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        updateBookCount(books.length - 1);
        alert(`Book deleted, ES sync time: ${res_data.es_sync_time_ms}ms`);
      }
    } catch (error) {
      console.log("handleDeleteAPI error", error);
    }
  };

  const navigate = useNavigate();

  const handleUpdate = async (book: RequestBooksData) => {
    try {
      navigate("/", { state: { book } });
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(books.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 2 }}
                    onClick={() => handleUpdate(books)}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default AllBooks;
