import React from "react";
import { Grid, Typography } from "@mui/material";
import style from "./style/style.module.css";
import { HelpOutlineOutlined } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

function Cards({
  showMemorize,
  cardSelection,
  setInputValue,
  setOpen,
  setMessage,
  setCardId,
  setShowAddCard,
  setCardMemorize,
}) {
  const { cards } = useAuth();

  const handleOpen = (title, translation, _id, memorize) => {
    if (!cardSelection) {
      setInputValue({ title: title, translation: translation });
      setOpen(true);
      setMessage({});
      setCardId(_id);
      setShowAddCard(false);
      setCardMemorize(memorize);
    }
  };

  let result;
  let memorize = true;

  if (cards) {
    result = cards.map((item, index) => {
      if (!showMemorize) {
        memorize = item.memorize;
      }
      if (memorize) {
        return (
          <Grid
            item
            xs={6}
            md={3}
            key={index}
            onClick={() => {
              handleOpen(item.title, item.translation, item._id, item.memorize);
            }}
          >
            <div className={style.card} data-id={item._id}>
              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: "21px", sm: "23px", md: "25px" },
                  lineHeight: "0.7",
                  textAlign: "center",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                component="h4"
                sx={{
                  fontSize: { xs: "18px", sm: "19px", md: "21px" },
                  textAlign: "center",
                  color: "blue",
                }}
              >
                {item.translation}
              </Typography>

              {cardSelection && item.memorize && (
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: "11px", md: "13px" },
                  }}
                >
                  Эта карточка уже добавлена
                </Typography>
              )}
              {cardSelection && !item.memorize && (
                <input
                  className={!item.memorize ? "not-selected" : "selected"}
                  type="checkbox"
                />
              )}
              {item.memorize && (
                <HelpOutlineOutlined className={style.question} />
              )}
            </div>
          </Grid>
        );
      }
    });
  }

  return (
    <Grid container spacing={1.5}>
      {result}
    </Grid>
  );
}

export default Cards;
