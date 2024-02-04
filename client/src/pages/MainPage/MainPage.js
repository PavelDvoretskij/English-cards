import React, { useState, useEffect } from "react";
import ModalWindow from "../../components/ModalWindow";
import Interface from "../../components/Interface";
import Cards from "../../components/Cards";
import { Container, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

function MainPage() {
  const { getCards, userId, mess } = useAuth();

  const [regimeChange, setRegimeChange] = useState(false);
  const [cardSelection, setCardSelection] = useState(false);
  const [message, setMessage] = useState({});
  const [cardId, setCardId] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showMemorize, setShowMemorize] = useState(true);
  const [cardMemorize, setCardMemorize] = useState(false);
  const [open, setOpen] = useState(false);

  const onClickAddCard = () => {
    setOpen(true);
    setMessage({});
    setShowEdit(true);
    setShowAddCard(true);
    setInputValue({ title: "", translation: "" });
  };

  const cardSelectionAll = () => {
    setCardSelection(!cardSelection);
    setRegimeChange(!regimeChange);
  };

  const handleClose = () => {
    setOpen(false);
    setShowEdit(false);
    setMessage({});
  };

  const getMessage = (data) => {
    setMessage({ ...message, ...data });
  };

  const handleShowEdit = (bool) => {
    setShowEdit(bool);
  };

  const checkboxSelectAll = (e) => {
    const card = document.querySelectorAll(".not-selected[type=checkbox]");
    card.forEach((item) => {
      item.checked = e.target.checked;
    });
  };

  const checkbox = () => {
    const card = document.querySelectorAll(
      ".not-selected[type=checkbox]:checked"
    );

    let arr = [];
    card.forEach((item) => {
      arr.push(item.parentElement.dataset.id);
    });

    if (arr.length) {
      memorizeCard(arr, true);
    }
    cardSelectionAll();
  };

  const changeHandlerTitle = (e, data) => {
    let validTitle = /^[a-zA-Z\s]{0,30}$/.test(e.target.value);
    let validTranslation = /^[а-яА-яЁё\s]{0,30}$/.test(e.target.value);
    if (validTitle && data == "title") {
      setInputValue({ ...inputValue, title: e.target.value });
    }
    if (validTranslation && data == "translation")
      setInputValue({ ...inputValue, translation: e.target.value });
  };

  const memorizeCard = async (arr, bool) => {
    try {
      await fetch("http://localhost:3002/cards/memorize", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: localStorage.getItem("userData"),
        },
        body: JSON.stringify({
          userId,
          arr,
          bool,
        }),
      });

      setOpen(false);
      getCards();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      <Container>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "25px", md: "40px" },
            textAlign: "center",
            color: "red",
          }}
        >
          {mess}
        </Typography>
        <Interface
          regimeChange={regimeChange}
          onClickAddCard={onClickAddCard}
          cardSelection={cardSelection}
          checkboxSelectAll={checkboxSelectAll}
          checkbox={checkbox}
          cardSelectionAll={cardSelectionAll}
          setRegimeChange={setRegimeChange}
          message={message}
          setShowMemorize={setShowMemorize}
          showMemorize={showMemorize}
        />
        <Cards
          showMemorize={showMemorize}
          cardSelection={cardSelection}
          setInputValue={setInputValue}
          setOpen={setOpen}
          setMessage={setMessage}
          setCardId={setCardId}
          setShowAddCard={setShowAddCard}
          setCardMemorize={setCardMemorize}
        />
        <ModalWindow
          userId={userId}
          cardId={cardId}
          inputValue={inputValue}
          getMessage={getMessage}
          message={message}
          open={open}
          showEdit={showEdit}
          showAddCard={showAddCard}
          handleShowEdit={handleShowEdit}
          handleClose={handleClose}
          changeHandlerTitle={changeHandlerTitle}
          memorizeCard={memorizeCard}
          cardMemorize={cardMemorize}
        />
      </Container>
    </>
  );
}

export default MainPage;
