import React, { useState } from "react";
import style from "./style/style.module.css";
import {
  Button,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { BeenhereOutlined, BeenhereRounded } from "@mui/icons-material";

function Interface({
  regimeChange,
  onClickAddCard,
  cardSelection,
  checkboxSelectAll,
  checkbox,
  cardSelectionAll,
  setRegimeChange,
  message,
  setShowMemorize,
  showMemorize,
}) {
  const [labelValue, setLabelValue] = useState(true);

  const btnStyle = {
    backgroundColor: "#333",
    color: "gold",
    ":hover": { color: "white", backgroundColor: "black" },
    fontSize: { xs: "10px", md: "13px" },
  };

  return (
    <div className={style.interface}>
      <Stack spacing={1}>
        {!regimeChange && (
          <Button sx={btnStyle} onClick={onClickAddCard}>
            Создать карточку
          </Button>
        )}
        {cardSelection && (
          <>
            <Button sx={btnStyle} onClick={checkbox}>
              Подтвердить выбор
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={false}
                  size="small"
                  icon={<BeenhereOutlined />}
                  checkedIcon={<BeenhereRounded />}
                  onChange={(e) => {
                    checkboxSelectAll(e);
                    setLabelValue(!labelValue);
                  }}
                />
              }
              label={
                <Typography
                  component="span"
                  color="textSecondary"
                  sx={{
                    fontSize: { xs: "11px", md: "13px" },
                  }}
                >
                  {labelValue ? "Выбрать все" : "Отменить все"}
                </Typography>
              }
            />
          </>
        )}

        {!regimeChange && !cardSelection && (
          <Button sx={btnStyle} onClick={cardSelectionAll}>
            Выбрать карточки для заучивания
          </Button>
        )}
      </Stack>

      {!cardSelection && (
        <Stack direction="column" alignItems="center" spacing={1} mt={2}>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: "17px", sm: "30px", md: "45px" },
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {regimeChange ? "Карточки для заучивания" : "Все карточки"}
          </Typography>

          <Button
            sx={{
              fontSize: { xs: "11px", md: "15px" },
              color: "#000",
              textDecoration: "underline",
              ":hover": { backgroundColor: "transparent" },
            }}
            onClick={() => {
              setRegimeChange(!regimeChange);
              setShowMemorize(!showMemorize);
            }}
          >
            {regimeChange ? "Все карточки" : "Карточки для заучивания"}
          </Button>
        </Stack>
      )}

      <h3 className={style.info}>{message.message}</h3>
    </div>
  );
}

export default Interface;
