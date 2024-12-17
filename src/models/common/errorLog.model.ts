import { model, Schema } from "mongoose";

const errorLogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },

    stack: {
      type: String,
    },

    // Request method
    method: {
      type: String,
    },

    // Request URL
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Log of unhandled errors in requests
 */
export const ErrorLog = model("ErrorLog", errorLogSchema);
