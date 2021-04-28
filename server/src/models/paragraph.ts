import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SParagraph = new Schema({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: [true, "Paragraph content is required"],
  },
});

const Paragraph = mongoose.model("paragraph", SParagraph);

export default Paragraph;

export type TParagraph = {
  title: string;
  content: string;
};
