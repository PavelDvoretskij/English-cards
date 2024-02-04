import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  card: [
    {
      title: {
        type: String,
        require: true,
      },
      translation: {
        type: String,
        require: true,
      },
      date: {
        type: Date,
        require: true,
      },
      memorize: {
        type: Boolean,
        require: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Card", CardSchema);
