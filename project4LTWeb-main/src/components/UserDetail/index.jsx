import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchModel(`/user/${userId}`);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
    }
    fetchData();
  }, [userId]);

  if (!user) return <p>User not found</p>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{user.first_name} {user.last_name}</Typography>
        <Typography variant="body2">Location: {user.location}</Typography>
        <Typography variant="body2">Description: {user.description}</Typography>
        <Typography variant="body2">Occupation: {user.occupation}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/photos/${userId}`}>
          Photos
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserDetail;
