import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";
import { NavLink } from "react-router-dom";

type BookCountProp = {
  bookCount: number;
};

const Navbar = (props: BookCountProp) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Elasticsearch
        </Typography>
        <NavLink to="/">
          <Button sx={{ color: "white", marginRight: "1rem" }}>Add Book</Button>
        </NavLink>
        <NavLink to="/books" style={{position: "relative"}}>
          <Badge
            badgeContent={props.bookCount}
            color="warning"
            sx={{ color: "white", position: "absolute", right: "1.2rem", top: "0.5rem"}}
            max={999}
          >
          </Badge>
            <Button sx={{ color: "white", marginRight: "1rem" }}>All Books</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
