import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, TextField, Button, Link } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

import style from "./style.module.css";

function LoginPage() {
  const { logIn, getRegisterMessage, registerMessage } = useAuth();

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  
  const [serverMessage, setServerMessage] = useState("");

  const messStyle = {
    display: "block",
    fontSize: { xs: "15px", md: "20px" },
    textAlign: "center",
    color: "red",
  };

  function changeHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    getRegisterMessage("");

    try {
      await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setServerMessage(data.message);
          if (data.token) {
            logIn(data.token, data.userName);
          }
        });
    } catch (e) {
      console.log(`Ошибка запроса: ${e.message}`);
    }
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "25px", sm: "30px", md: "40px" },
          }}
          className={style.title}
        >
          Авторизация
        </Typography>

        <TextField
          className={style.input}
          type="text"
          name="userName"
          label="UserName"
          size="small"
          InputLabelProps={{ style: { fontSize: 13 } }}
          value={form.userName}
          margin="normal"
          onChange={changeHandler}
        />

        <TextField
          className={style.input}
          type="text"
          name="password"
          label="Password"
          size="small"
          InputLabelProps={{ style: { fontSize: 13 } }}
          value={form.password}
          onChange={changeHandler}
        />

        <div className={style.buttons}>
          <Button
            type="submit"
            sx={{
              color: "black",
              fontSize: { xs: "12px", md: "15px" },
              margin: "0 10px",
            }}
          >
            Войти
          </Button>
          <Link
            component={RouterLink}
            to="/register"
            sx={{
              fontSize: { xs: "13px", md: "17px" },
            }}
          >
            Нет аккаунта?
          </Link>
        </div>
      </form>
      <Typography component="strong" sx={messStyle}>
        {serverMessage}
      </Typography>
      <Typography component="strong" sx={messStyle}>
        {registerMessage}
      </Typography>
    </>
  );
}
export default LoginPage;
