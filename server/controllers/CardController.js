import Card from "../models/Card.js";

//Card get all
export const getAll = async (req, res) => {
  try {
    const cards = await Card.findOne({ user: req.userId })
      .populate("user")
      .exec();
    if (cards) {
      return res.status(201).json({
        allCards: cards.card,
        userId: cards._doc._id,
      });
    }
    res.status(301).json({
      message: "Карточек у вас нет",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при получении карточек",
    });
  }
};

// Create card
export const create = async (req, res) => {
  try {
    const isUsed = await Card.findOne({ user: req.userId });

    const { title, translation, radioValue } = req.body;

    const bool = /true/.test(radioValue);

    const date = Date.now();
    if (!isUsed) {
      const newCard = new Card({
        card: [
          {
            title,
            translation,
            date,
            memorize: bool,
          },
        ],
        user: req.userId,
      });

      await newCard.save();

      res.status(201).json({
        newCard,
      });
    } else {
      const arr = isUsed._doc.card;

      for (const arrKey of arr) {
        if (arrKey.title === title) {
          return res.status(301).json({
            message: "Карточка с таким словом уже есть",
          });
        }
      }

      await Card.updateOne(
        { user: req.userId },
        { $push: { card: { title, translation, date, memorize: bool } } }
      );

      res.status(201).json({
        message: "Новая карточка добавлена",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при создании карточки",
    });
  }
};

// Update card
export const update = async (req, res) => {
  try {
    const { _id, cardId, title, translation } = req.body;
    const date = Date.now();

    await Card.findOneAndUpdate(
      { _id, "card._id": cardId },
      {
        $set: {
          "card.$.title": title,
          "card.$.translation": translation,
          "card.$.date": date,
        },
      }
    );

    res.status(201).json({
      message: "Карточка изменена",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при изменении карточки",
    });
  }
};

// Remove card
export const remove = async (req, res) => {
  try {
    const { userId, cardId, length } = req.body;

    if (length == 1) {
      await Card.deleteMany({ _id: userId });

      res.status(201).json({
        message: "Карточка удалена",
      });
    } else {
      await Card.updateOne(
        { _id: userId },
        { $pull: { card: { _id: cardId } } }
      );

      res.status(201).json({
        message: "Карточка удалена",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при удалении карточки",
    });
  }
};

// Memorize card
export const memorize = async (req, res) => {
  try {
    const { userId, arr, bool } = req.body;
    if (!arr.length) {
      return res.status(301).json({
        message: "Карточки не выбраны",
      });
    }

    for (const item of arr) {
      await Card.findOneAndUpdate(
        { _id: userId, "card._id": item },
        {
          $set: {
            "card.$.memorize": bool,
          },
        }
      );
    }
    res.status(201).json({
      message: "Карточка изменена",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при изменении карточки",
    });
  }
};
