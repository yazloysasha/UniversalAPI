import {
  SuccessCode,
  RedirectionCode,
  ClientErrorCode,
  ServerErrorCode,
  InformationalCode,
} from "@types";
import { model, Schema } from "mongoose";

const requestLogSchema = new Schema(
  {
    method: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    // Response code
    statusCode: {
      type: Number,
      enum: Object.values({
        ...SuccessCode,
        ...RedirectionCode,
        ...ClientErrorCode,
        ...ServerErrorCode,
        ...InformationalCode,
      }).filter((value) => typeof value === "number"),
      required: true,
    },

    // Request duration (in milliseconds)
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Log of all requests
 */
export const RequestLog = model("RequestLog", requestLogSchema);
