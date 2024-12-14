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
    // Метод запроса
    method: {
      type: String,
      required: true,
    },

    // URL запроса
    url: {
      type: String,
      required: true,
    },

    // Код ответа
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

    // Длительность запроса (в миллисекундах)
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
 * Лог всех запросов
 */
export const RequestLog = model("RequestLog", requestLogSchema);
