import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import RequireAuth from "./hoc/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import { Typography } from "@mui/material";
function App() {
  return (
    <AuthProvider>
      <Typography
        component="h1"
        className="title"
        sx={{
          fontSize: { xs: "25px", sm: "35px", md: "45px" },
        }}
      >
        Учим английские слова
      </Typography>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
          ;
          <Route path={"register"} element={<RegisterPage />} />
          <Route path={"login"} element={<LoginPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
