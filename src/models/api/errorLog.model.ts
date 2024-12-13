import { model, Schema } from "mongoose";

const errorLogSchema = new Schema(
  {
    // Название ошибки
    name: {
      type: String,
      required: true,
    },

    // Сообщение ошибки
    message: {
      type: String,
    },

    // Стек ошибки
    stack: {
      type: String,
    },

    // Метод запроса
    method: {
      type: String,
    },

    // URL запроса (не маршрут!)
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Лог необработанных ошибок в запросах
 */
export const ErrorLog = model("ErrorLog", errorLogSchema);
