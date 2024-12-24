import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import AllServices from "@/pages/AllServices";
import AddService from "@/pages/AddService";
import BookedServices from "@/pages/BookedServices";
import ManagedServices from "@/pages/ManagedServices";
import ServiceDetails from "@/pages/ServiceDetails";
import TodoServices from "@/pages/TodoServices";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivateRoute from "@/customComponents/PrivateRoute";
import PublicRoute from "@/customComponents/PublicRoute";
import Layout from "@/layouts/Layout";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/all-services" element={<AllServices />} />
        <Route
          path="/service-details/:serviceId"
          element={
            <PrivateRoute>
              <ServiceDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-service"
          element={
            <PrivateRoute>
              <AddService />
            </PrivateRoute>
          }
        />

        <Route
          path="/booked-services"
          element={
            <PrivateRoute>
              <BookedServices />
            </PrivateRoute>
          }
        />

        <Route
          path="/managed-services"
          element={
            <PrivateRoute>
              <ManagedServices />
            </PrivateRoute>
          }
        />

        <Route
          path="/todo-services"
          element={
            <PrivateRoute>
              <TodoServices />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="/register"
        element={
          
            <Register />
          
        }
      />
      <Route
        path="/login"
        element={
          
            <Login />
          
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
