import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Elasticsearch
        </Typography>
        <NavLink to="/">
          <Button sx={{color: "white", marginRight: "1rem"}}>Add Book</Button>
        </NavLink>
        <NavLink to="/books">
        <Button  sx={{color: "white"}}>All Books</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
