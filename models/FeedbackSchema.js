import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    question1: {
      type: String,
      required: true,
    },
    question2: {
      type: String,
      required: true,
    },
    question3: {
      type: String,
      required: true,
    },
    question4: {
      type: String,
      required: true,
    },
    question5: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", FeedbackSchema);
