import React, { useContext, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = React.createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  const [registerMessage, setRegisterMessage] = useState("");
  const [token, setToken] = useState(false);
  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState("");
  const [mess, setMess] = useState("");

  const getRegisterMessage = (text) => {
    setRegisterMessage(text);
  };

  const logIn = useCallback((jwtToken, userName) => {
    setToken(jwtToken);
    localStorage.setItem("userData", jwtToken);
    if (userName) {
      localStorage.setItem("userName", userName);
    }
    navigate(fromPage, { replace: true });
  }, []);

  const logOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userName");
    setToken(null);
    setCards([]);
    setMess("");
  };

  useEffect(() => {
    const token = localStorage.getItem("userData");
    if (token) {
      logIn(token);
    }
  }, [logIn]);

  const getCards = async () => {
    try {
      await fetch("http://localhost:3002/cards", {
        cache: "no-cache",
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("userData"),
        },
      })
        .then((res) => {
          if (res.status == 403) {
            logOut();
          }
          return res.json();
        })
        .then((res) => {
          setMess(res.message);
          setCards(res.allCards);
          setUserId(res.userId);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getCards,
        logOut,
        getRegisterMessage,
        registerMessage,
        token,
        cards,
        userId,
        logIn,
        mess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
