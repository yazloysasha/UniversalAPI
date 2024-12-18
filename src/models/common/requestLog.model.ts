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
