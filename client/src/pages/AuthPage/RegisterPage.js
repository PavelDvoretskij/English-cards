import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Link } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

import style from "./style.module.css";

function RegisterPage() {
  const { getRegisterMessage } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const [serverMessage, setServerMessage] = useState("");

  function changeHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    try {
      await fetch("http://localhost:3002/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      })
        .then((res) => {
          if (res.ok) {
            navigate("/login");
          }
          return res.json();
        })
        .then((res) => {
          if (res.errors) setServerMessage("Введены некорректные данные");
          else if (res.token)
            getRegisterMessage("Вы зарегистрированы. Авторизуйтесь");
          else setServerMessage(res.message);
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
          Регистрация
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
            Подтвердить
          </Button>
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              fontSize: { xs: "13px", md: "17px" },
            }}
          >
            Есть аккаунт?
          </Link>
        </div>
      </form>
      <Typography
        component="strong"
        sx={{
          display: "block",
          fontSize: { xs: "15px", md: "20px" },
          textAlign: "center",
          color: "red",
        }}
      >
        {serverMessage}
      </Typography>
    </>
  );
}
export default RegisterPage;
