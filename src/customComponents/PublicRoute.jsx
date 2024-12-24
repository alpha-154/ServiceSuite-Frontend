import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

const PublicRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  // Check if the "registered" query parameter is set to "true"
  const searchParams = new URLSearchParams(location.search);
  const isRegistered = searchParams.get("registered") === "true";

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  // If the user exists and "registered" is not true, redirect to home
  if (isRegistered) {
    return <Navigate to="/login" />;
  }
  else if(user) {
    return <Navigate to="/" />;
  }else{
    return children;
  }
  
  
};

export default PublicRoute;

