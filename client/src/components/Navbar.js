import React from "react";
import { Link as RouterLink } from "react-router-dom";
import style from "./style/style.module.css";
import { Container, Typography, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logOut } = useAuth();

  return (
    <>
      <div className={style.wrap}>
        {token && (
          <Container sx={{ padding: "7px 0" }}>
            <div className={style.wrap_link}>
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  fontSize: { xs: "13px", md: "17px" },
                }}
                onClick={logOut}
                className={style.link}
              >
                Выйти
              </Link>
            </div>
            <Typography
              component="h2"
              sx={{ fontSize: { xs: "17px", sm: "20px", md: "25px" } }}
              className={style.header_title}
            >
              Вы вошли как {localStorage.getItem("userName")}
            </Typography>
          </Container>
        )}
      </div>
    </>
  );
}

export default Navbar;
