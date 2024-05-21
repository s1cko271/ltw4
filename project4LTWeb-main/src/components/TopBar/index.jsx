import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import models from "../../modelData/models"; // Import your models file

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if the current path is the home page
    if (location.pathname === "/") {
      setUserName("Võ Văn Bảo Phúc"); // Set a default user name when on the home page
    } else {
      // Extract the user ID from the URL
      const pathParts = location.pathname.split("/");
      const userId = pathParts[pathParts.length - 1];

      // Fetch user information from the userModel function
      const user = models.userModel(userId);
      if (user) {
        // If user is found, set the user's full name with additional info as the user name
        setUserName(`Info of ${user.first_name} ${user.last_name}`);
      }
    }
  }, [location.pathname]);

  const pathParts = location.pathname.split("/");
  const currentView = pathParts[pathParts.length - 2];

  let title = "PhotoShare";

  if (currentView === "users") {
    const userId = pathParts[pathParts.length - 1];
    const user = models.userModel(userId); // Fetch user information
    if (user) {
      title = `User Details: ${user.occupation}`; 
    }
  } else if (currentView === "photos") {
    const userId = pathParts[pathParts.length - 1];
    const user = models.userModel(userId); // Fetch user information
    if (user) {
      title = `Photos of ${user.first_name} ${user.last_name}`; 
    }
  }
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          {title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <Typography variant="h6" component="div">
          {userName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
