import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to retrieve user details");
        }
        return res.json();
      })
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to retrieve user details. Please try again later.",
        });
      });
  }, []);

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {userDetails.name}</p>
      <p>Email: {userDetails.email}</p>
    </div>
  );
};

export default UserDetails;
