import React, { useState } from "react";
import style from "./style/modal.module.css";
import {
  Save,
  Close,
  Edit,
  Delete,
  SettingsBackupRestore,
  DriveFileMove,
  HelpOutlineOutlined,
} from "@mui/icons-material";
import {
  Modal,
  Stack,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

function ModalWindow({
  userId,
  cardId,
  inputValue,
  getMessage,
  message,
  open,
  handleClose,
  showEdit,
  showAddCard,
  memorizeCard,
  handleShowEdit,
  changeHandlerTitle,
  cardMemorize,
}) {
  const { cards, getCards } = useAuth();

  const [radioValue, setRadioValue] = useState("false");

  const url = "http://localhost:3002/cards";

  const iconStyle = {
    cursor: "pointer",
    margin: "0 5px",
  };

  function changeValue(e) {
    setRadioValue(e.target.value);
  }

  const addCard = async () => {
    if (inputValue.title.length < 2 || inputValue.translation.length < 2) {
      return getMessage({ messageModal: "Не корректно заполнены поля" });
    }
    let checkingForUniqueness = true;
    if (cards) {
      cards.map((item) => {
        if (item.title == inputValue.title) {
          checkingForUniqueness = false;
        }
      });
    }
    if (checkingForUniqueness) {
      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: window.localStorage.getItem("userData"),
          },
          body: JSON.stringify({
            title: inputValue.title,
            translation: inputValue.translation,
            radioValue,
          }),
        }).then((res) => {
          getCards();
          handleClose();
          getMessage({ message: "Новая карточка добавлена" });
          setRadioValue("false");
          return res.json();
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      getMessage({ messageModal: "Карточка с таким названием уже есть" });
    }
  };

  const removeCard = async () => {
    try {
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: window.localStorage.getItem("userData"),
        },
        body: JSON.stringify({ userId, cardId: cardId, length: cards.length }),
      }).then((res) => {
        getCards();
        handleClose();
        getMessage({ message: "Карточка удалена" });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async () => {
    if (inputValue.title.length < 2 || inputValue.translation.length < 2) {
      return getMessage({ messageModal: "Не корректно заполнены поля" });
    }

    let checkingForUniqueness = true;
    cards.map((item) => {
      if (item.title == inputValue.title) {
        checkingForUniqueness = false;
        if (item._id == cardId) {
          checkingForUniqueness = true;
        }
      }
    });
    if (checkingForUniqueness) {
      try {
        await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: localStorage.getItem("userData"),
          },
          body: JSON.stringify({
            _id: userId,
            cardId: cardId,
            title: inputValue.title,
            translation: inputValue.translation,
          }),
        }).then((res) => {
          getCards();
          handleClose();
          getMessage({ message: "Карточка изменена" });
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      getMessage({ messageModal: "Карточка с таким названием уже есть" });
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modal}>
          {showEdit ? (
            <>
              <TextField
                label="Слово"
                size="small"
                margin="normal"
                variant="outlined"
                color="success"
                value={inputValue.title}
                InputLabelProps={{ style: { fontSize: 13 } }}
                onChange={(e) => changeHandlerTitle(e, "title")}
              />
              <TextField
                label="Перевод"
                size="small"
                value={inputValue.translation}
                InputLabelProps={{ style: { fontSize: 13 } }}
                onChange={(e) => changeHandlerTitle(e, "translation")}
              />

              {showAddCard ? (
                <div className={style.edit}>
                  <RadioGroup value={radioValue} onChange={changeValue}>
                    <FormControlLabel
                      value="false"
                      name="memorize"
                      control={<Radio size="small" />}
                      label={
                        <Typography variant="caption" color="textSecondary">
                          Все карточки
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="true"
                      name="memorize"
                      control={<Radio size="small" />}
                      label={
                        <Typography variant="caption" color="textSecondary">
                          Карточки для заучивания
                        </Typography>
                      }
                    />
                  </RadioGroup>
                  <Save
                    sx={iconStyle}
                    color="primary"
                    titleAccess={"Сохранить"}
                    onClick={addCard}
                  />
                </div>
              ) : (
                <div className={style.icons}>
                  <Save
                    sx={iconStyle}
                    color="primary"
                    titleAccess={"Сохранить"}
                    onClick={updateCard}
                  />
                  <Close
                    sx={iconStyle}
                    color="primary"
                    titleAccess={"Закрыть"}
                    onClick={() => handleShowEdit(false)}
                  />
                  <Delete
                    sx={{ ...iconStyle, color: "red" }}
                    titleAccess={"Удалить"}
                    onClick={removeCard}
                  />
                </div>
              )}
              <strong className={style.textModal}>
                {message.messageModal}
              </strong>
            </>
          ) : (
            <>
              {cardMemorize && <HelpOutlineOutlined sx={iconStyle} />}
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "30px", md: "40px" },
                  fontWeight: "bold",
                }}
                className={style.title}
              >
                {inputValue.title}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "20px", md: "30px" },
                  fontWeight: "bold",
                }}
                className={style.translation}
              >
                {inputValue.translation}
              </Typography>
            </>
          )}
          <Stack direction="row" spacing={2}>
            {!showEdit && (
              <div className={style.icons}>
                <Edit
                  sx={iconStyle}
                  color="primary"
                  titleAccess={"Изменить"}
                  onClick={() => {
                    handleShowEdit(true);
                    getMessage({ message: "" });
                  }}
                />
                <Delete
                  sx={{ ...iconStyle, color: "red" }}
                  titleAccess={"Удалить"}
                  onClick={removeCard}
                />
                {cardMemorize ? (
                  <SettingsBackupRestore
                    sx={iconStyle}
                    titleAccess={"Переместить во «Все карточки»"}
                    onClick={() => memorizeCard([cardId], false)}
                  />
                ) : (
                  <DriveFileMove
                    sx={iconStyle}
                    titleAccess={"Переместить в «Карточки для заучивания»"}
                    onClick={() => memorizeCard([cardId], true)}
                  />
                )}
              </div>
            )}
          </Stack>
        </div>
      </Modal>
    </>
  );
}

export default ModalWindow;
