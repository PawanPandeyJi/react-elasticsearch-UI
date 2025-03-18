import { Card, CardContent, Typography } from "@mui/material";

const AllBooks = () => {
  return (
    <Card sx={{ maxWidth: 300, m: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6">book.title</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          book.author
        </Typography>
        <Typography variant="body2">Published: book.year</Typography>
      </CardContent>
    </Card>
  );
};

export default AllBooks
