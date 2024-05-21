import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchModel("/user/list");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h6">Users</Typography>
      <List component="nav">
        {users.map((user) => (
          <ListItem key={user._id}>
            <Link to={`/users/${user._id}`} style={{ textDecoration: "none" }}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;
